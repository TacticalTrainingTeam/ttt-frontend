import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AufstellungOverviewComponent } from './aufstellung-overview.component';

describe('AufstellungOverviewComponent', () => {
    let component: AufstellungOverviewComponent;
    let fixture: ComponentFixture<AufstellungOverviewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AufstellungOverviewComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AufstellungOverviewComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('rankOrder', ['offizier']);
        fixture.componentRef.setInput('rankInfo', {
            offizier: { name: 'Offizier', shortName: 'Off.', icon: '/img/rank.png', color: 'text-yellow-400', priority: 1 },
            unteroffizier: { name: 'Unteroffizier', shortName: 'Uffz.', icon: '/img/rank.png', color: 'text-gray-400', priority: 2 },
            veteran: { name: 'Veteran', shortName: 'Vet.', icon: '/img/rank.png', color: 'text-green-400', priority: 3 },
            soldat: { name: 'Soldat', shortName: 'Sdt.', icon: '/img/rank.png', color: 'text-blue-600', priority: 4 },
            rekrut: { name: 'Rekrut', shortName: 'Rekr.', icon: '/img/rank.png', color: 'text-blue-300', priority: 5 },
            gast: { name: 'Gast', shortName: 'Gast', icon: '/img/rank.png', color: 'text-gray-300', priority: 6 },
        });
        fixture.componentRef.setInput('memberStats', { offizier: 1, unteroffizier: 0, veteran: 0, soldat: 0, rekrut: 0, gast: 0 });
        fixture.componentRef.setInput('title', 'Mitgliederübersicht');
        fixture.componentRef.setInput('subtitle', 'Subtitle');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render compact rank cards with a combined icon and label row', () => {
        const cards = fixture.nativeElement.querySelectorAll('img[alt*="Abzeichen"]');
        const labels = fixture.nativeElement.querySelectorAll('h3');

        expect(cards.length).toBeGreaterThan(0);
        expect(labels.length).toBeGreaterThan(0);
    });
});
