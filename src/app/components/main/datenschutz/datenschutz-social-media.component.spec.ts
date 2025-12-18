import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DatenschutzSocialMediaComponent } from './datenschutz-social-media.component';

describe('DatenschutzSocialMediaComponent', () => {
    let component: DatenschutzSocialMediaComponent;
    let fixture: ComponentFixture<DatenschutzSocialMediaComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DatenschutzSocialMediaComponent],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(DatenschutzSocialMediaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have correct page title', () => {
        expect(component.pageTitle).toBe('Datenschutzerklärung für Social Media');
    });

    it('should have external links for social media platforms', () => {
        expect(component.externalLinks).toBeDefined();
        expect(component.externalLinks.google).toBeDefined();
        expect(component.externalLinks.twitch).toBeDefined();
        expect(component.externalLinks.twitter).toBeDefined();
        expect(component.externalLinks.tiktok).toBeDefined();
    });
});
