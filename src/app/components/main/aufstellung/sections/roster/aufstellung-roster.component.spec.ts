import { DOCUMENT } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { AufstellungRosterComponent } from './aufstellung-roster.component';

describe('AufstellungRosterComponent', () => {
    let component: AufstellungRosterComponent;
    let fixture: ComponentFixture<AufstellungRosterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AufstellungRosterComponent],
            providers: [
                { provide: DOCUMENT, useValue: document },
                { provide: PLATFORM_ID, useValue: 'browser' },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AufstellungRosterComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('rankOrder', []);
        fixture.componentRef.setInput('rankInfo', {
            offizier: { name: 'Offizier', shortName: 'Off.', icon: '', color: 'text-yellow-400', priority: 1 },
            unteroffizier: { name: 'Unteroffizier', shortName: 'Uffz.', icon: '', color: 'text-gray-400', priority: 2 },
            veteran: { name: 'Veteran', shortName: 'Vet.', icon: '', color: 'text-green-400', priority: 3 },
            soldat: { name: 'Soldat', shortName: 'Sdt.', icon: '', color: 'text-blue-600', priority: 4 },
            rekrut: { name: 'Rekrut', shortName: 'Rekr.', icon: '', color: 'text-blue-300', priority: 5 },
            gast: { name: 'Gast', shortName: 'Gast', icon: '', color: 'text-gray-300', priority: 6 },
        });
        fixture.componentRef.setInput('membersByRank', { offizier: [], unteroffizier: [], veteran: [], soldat: [], rekrut: [], gast: [] });
        fixture.componentRef.setInput('members', []);
        fixture.componentRef.setInput('title', 'Personalaufstellung');
        fixture.componentRef.setInput('subtitle', 'Unsere Mitglieder');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
