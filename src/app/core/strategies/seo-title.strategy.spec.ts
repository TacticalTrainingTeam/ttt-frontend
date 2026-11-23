import { Component, DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { TitleStrategy, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { SeoTitleStrategy } from './seo-title.strategy';
import { SEO_DEFAULTS } from '../../shared/constants/seo';

@Component({ template: '' })
class DummyComponent {}

describe('SeoTitleStrategy', () => {
    let harness: RouterTestingHarness;
    let meta: Meta;
    let document: Document;

    const canonicalHref = () => document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            providers: [
                provideRouter([
                    { path: '', component: DummyComponent },
                    {
                        path: 'chronik',
                        component: DummyComponent,
                        title: 'Chronik | Tactical Training Team',
                        data: { description: 'Chronik description' },
                    },
                    {
                        path: 'parent',
                        data: { description: 'Parent description' },
                        children: [{ path: 'child', component: DummyComponent, title: 'Child' }],
                    },
                ]),
                { provide: TitleStrategy, useClass: SeoTitleStrategy },
            ],
        });
        meta = TestBed.inject(Meta);
        document = TestBed.inject(DOCUMENT);
        harness = await RouterTestingHarness.create();
    });

    afterEach(() => {
        document.head.querySelector('link[rel="canonical"]')?.remove();
    });

    it('should set title, description, Open Graph tags and canonical from the route', async () => {
        await harness.navigateByUrl('/chronik');

        expect(TestBed.inject(Title).getTitle()).toBe('Chronik | Tactical Training Team');
        expect(meta.getTag('name="description"')?.content).toBe('Chronik description');
        expect(meta.getTag('property="og:title"')?.content).toBe('Chronik | Tactical Training Team');
        expect(meta.getTag('property="og:description"')?.content).toBe('Chronik description');
        expect(meta.getTag('property="og:url"')?.content).toBe(`${SEO_DEFAULTS.siteUrl}/chronik`);
        expect(canonicalHref()).toBe(`${SEO_DEFAULTS.siteUrl}/chronik`);
    });

    it('should fall back to the site defaults when the route has no title or description', async () => {
        await harness.navigateByUrl('/');

        expect(TestBed.inject(Title).getTitle()).toBe(SEO_DEFAULTS.title);
        expect(meta.getTag('name="description"')?.content).toBe(SEO_DEFAULTS.description);
        expect(canonicalHref()).toBe(`${SEO_DEFAULTS.siteUrl}/`);
    });

    it('should inherit the description from a parent route', async () => {
        await harness.navigateByUrl('/parent/child');

        expect(meta.getTag('name="description"')?.content).toBe('Parent description');
    });

    it('should strip query params and fragments from the canonical URL', async () => {
        await harness.navigateByUrl('/chronik?ref=discord#2015');

        expect(canonicalHref()).toBe(`${SEO_DEFAULTS.siteUrl}/chronik`);
        expect(meta.getTag('property="og:url"')?.content).toBe(`${SEO_DEFAULTS.siteUrl}/chronik`);
    });

    it('should reuse a single canonical link across navigations', async () => {
        await harness.navigateByUrl('/chronik');
        await harness.navigateByUrl('/');

        expect(document.head.querySelectorAll('link[rel="canonical"]').length).toBe(1);
        expect(canonicalHref()).toBe(`${SEO_DEFAULTS.siteUrl}/`);
    });
});
