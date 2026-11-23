import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { SEO_DEFAULTS } from '../../shared/constants/seo';

/**
 * Sets title, description, Open Graph tags and canonical link from the route config.
 * Runs during prerendering as well, so crawlers get per-page values without JavaScript.
 */
@Injectable({ providedIn: 'root' })
export class SeoTitleStrategy extends TitleStrategy {
    private readonly title = inject(Title);
    private readonly meta = inject(Meta);
    private readonly document = inject(DOCUMENT);

    override updateTitle(snapshot: RouterStateSnapshot): void {
        const title = this.buildTitle(snapshot) ?? SEO_DEFAULTS.title;
        const description = this.findDescription(snapshot.root) ?? SEO_DEFAULTS.description;
        const url = SEO_DEFAULTS.siteUrl + snapshot.url.split(/[?#]/)[0];

        this.title.setTitle(title);
        this.meta.updateTag({ name: 'description', content: description });
        this.meta.updateTag({ property: 'og:title', content: title });
        this.meta.updateTag({ property: 'og:description', content: description });
        this.meta.updateTag({ property: 'og:url', content: url });
        this.setCanonical(url);
    }

    private findDescription(route: ActivatedRouteSnapshot | null): string | undefined {
        let description: string | undefined;
        for (let current = route; current; current = current.firstChild) {
            const value: unknown = current.data['description'];
            if (typeof value === 'string') {
                description = value;
            }
        }
        return description;
    }

    private setCanonical(url: string): void {
        let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
        if (!link) {
            link = this.document.createElement('link');
            link.rel = 'canonical';
            this.document.head.appendChild(link);
        }
        link.href = url;
    }
}
