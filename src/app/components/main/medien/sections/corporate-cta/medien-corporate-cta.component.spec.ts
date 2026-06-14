import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MedienCorporateCtaComponent } from './medien-corporate-cta.component';

describe('MedienCorporateCtaComponent', () => {
    let component: MedienCorporateCtaComponent;
    let fixture: ComponentFixture<MedienCorporateCtaComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MedienCorporateCtaComponent],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(MedienCorporateCtaComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('wikiUrl', 'https://wiki.tacticalteam.de/de/TTT-PR/Corporate-Identity');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
