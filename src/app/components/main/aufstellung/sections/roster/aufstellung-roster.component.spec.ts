import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { AufstellungRosterComponent } from './aufstellung-roster.component';
import { Member } from '../../../../../shared/types/aufstellung.types';

const createMember = (overrides: Partial<Member> = {}): Member => ({
    id: '1',
    name: 'Testmember',
    rank: 'soldat',
    avatar: '',
    memberSince: '2020-01-01',
    medals: [],
    campaignRibbons: [],
    abteilungen: [],
    ...overrides,
});

describe('AufstellungRosterComponent', () => {
    let component: AufstellungRosterComponent;
    let fixture: ComponentFixture<AufstellungRosterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AufstellungRosterComponent],
            providers: [provideNoopAnimations()],
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

    it('should open the details dialog for a member with expandable content', () => {
        const member = createMember({ medals: [{ id: 'm1', name: 'Medal', description: '', image: '' }] });

        component.openMemberDetails(member);

        expect(component.selectedMember()).toBe(member);
    });

    it('should not open the details dialog for a member without expandable content', () => {
        const member = createMember();

        component.openMemberDetails(member);

        expect(component.selectedMember()).toBeNull();
    });

    it('should clear the selected member when the dialog is closed', () => {
        const member = createMember({ medals: [{ id: 'm1', name: 'Medal', description: '', image: '' }] });
        component.openMemberDetails(member);

        component.onDetailsVisibleChange(false);

        expect(component.selectedMember()).toBeNull();
    });
});
