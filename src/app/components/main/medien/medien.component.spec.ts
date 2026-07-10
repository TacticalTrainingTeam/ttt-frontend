import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { MedienComponent } from './medien.component';
import { MedienService } from '../../../core/services/medien.service';
import { TTT_LINKS, TTT_SOCIAL_LINKS } from '../../../shared/constants/external-links';

describe('MedienComponent', () => {
    let component: MedienComponent;
    let fixture: ComponentFixture<MedienComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MedienComponent],
            providers: [provideRouter([]), MedienService, provideHttpClient(), provideHttpClientTesting()],
        }).compileComponents();

        fixture = TestBed.createComponent(MedienComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have correct page title', () => {
        expect(component.pageTitle).toBe('Medien');
    });

    it('should source platform urls from the shared link registry', () => {
        expect(component.socialLinks).toBe(TTT_SOCIAL_LINKS);
        expect(component.corporateDesignWikiUrl).toBe(TTT_LINKS.wikiCorporateDesign);
        expect(component.mediaPlatforms[0].url).toBe(TTT_SOCIAL_LINKS.youtube);
        expect(component.socialPlatforms.every((platform) => platform.url.startsWith('https://'))).toBeTrue();
    });

    it('should expose media and social platform cards', () => {
        expect(component.mediaPlatforms).toHaveSize(2);
        expect(component.socialPlatforms).toHaveSize(8);

        expect(component.mediaPlatforms[0].id).toBe('youtube');
        expect(component.socialPlatforms.find((item) => item.id === 'github')?.handle).toBe('TacticalTrainingTeam');
    });

    it('should have live streams as observable', () => {
        expect(component.liveStreams$).toBeDefined();
    });
});
