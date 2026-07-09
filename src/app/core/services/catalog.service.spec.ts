import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { CatalogService } from './catalog.service';

describe('CatalogService (dummy mode)', () => {
    let service: CatalogService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient()],
        });
        service = TestBed.inject(CatalogService);
    });

    it('should provide both catalogs', (done) => {
        service.getMedals().subscribe((medals) => {
            expect(medals.length).toBeGreaterThan(0);
            service.getCampaignRibbons().subscribe((ribbons) => {
                expect(ribbons.length).toBeGreaterThan(0);
                done();
            });
        });
    });

    it('should create and delete a medal', (done) => {
        service.createMedal({ name: 'Testorden', description: 'Test', image: '' }).subscribe((created) => {
            expect(created.id).toBeTruthy();
            service.getMedals().subscribe((medals) => {
                expect(medals.some((medal) => medal.id === created.id)).toBeTrue();
                service.deleteMedal(created.id).subscribe(() => {
                    service.getMedals().subscribe((after) => {
                        expect(after.some((medal) => medal.id === created.id)).toBeFalse();
                        done();
                    });
                });
            });
        });
    });

    it('should create a campaign ribbon', (done) => {
        service.createCampaignRibbon({ campaign: 'Test', year: '2026', image: '' }).subscribe((ribbon) => {
            expect(ribbon.id).toBeTruthy();
            done();
        });
    });

    it('should resolve medals by ids for the dummy member update', () => {
        expect(service.getMedalsByIds(['medal-1']).map((medal) => medal.id)).toEqual(['medal-1']);
    });
});
