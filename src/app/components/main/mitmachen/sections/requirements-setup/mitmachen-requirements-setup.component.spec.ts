import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MitmachenRequirementsSetupComponent } from './mitmachen-requirements-setup.component';

describe('MitmachenRequirementsSetupComponent', () => {
    let component: MitmachenRequirementsSetupComponent;
    let fixture: ComponentFixture<MitmachenRequirementsSetupComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MitmachenRequirementsSetupComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MitmachenRequirementsSetupComponent);
        component = fixture.componentInstance;
        component.arma3SyncGuideUrl = 'https://example.com/guide';
        component.arma3SyncVideoUrl = 'https://example.com/video';
        component.arma3SyncTipsUrl = 'https://example.com/tips';
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
