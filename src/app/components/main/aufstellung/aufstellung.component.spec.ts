import type { Mocked } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AufstellungComponent } from './aufstellung.component';
import { MemberService } from '../../../core/services/member.service';
import { Member } from '../../../shared/types/member.types';

describe('AufstellungComponent', () => {
    let component: AufstellungComponent;
    let fixture: ComponentFixture<AufstellungComponent>;
    let memberServiceSpy: Mocked<Pick<MemberService, 'getAllMembers'>>;

    const mockMembers: Member[] = [
        {
            id: 'member-1',
            name: 'Alpha',
            rank: 'offizier',
            avatar: '',
            memberSince: '2020-01-01',
            medals: [],
            campaignRibbons: [],
            abteilungen: [],
        },
        {
            id: 'member-2',
            name: 'Bravo',
            rank: 'soldat',
            avatar: '',
            memberSince: '2021-01-01',
            medals: [],
            campaignRibbons: [],
            abteilungen: [{ id: 'missionsbau', name: 'Missionsbau', icon: '', description: '' }],
        },
        {
            id: 'member-3',
            name: 'Charlie',
            rank: 'soldat',
            avatar: '',
            memberSince: '2022-01-01',
            medals: [],
            campaignRibbons: [],
            abteilungen: [],
        },
    ];

    beforeEach(async () => {
        memberServiceSpy = {
            getAllMembers: vi.fn().mockName('MemberService.getAllMembers'),
        };
        memberServiceSpy.getAllMembers.mockReturnValue(of(mockMembers));

        await TestBed.configureTestingModule({
            imports: [AufstellungComponent],
            providers: [{ provide: MemberService, useValue: memberServiceSpy }, provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(AufstellungComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load dummy members', () => {
        component.ngOnInit();
        expect(memberServiceSpy.getAllMembers).toHaveBeenCalled();
        expect(component.members()).toHaveLength(3);
    });

    it('should group members by rank correctly', () => {
        component.ngOnInit();
        const membersByRank = component.membersByRank();

        expect(membersByRank.offizier).toHaveLength(1);
        expect(membersByRank.soldat).toHaveLength(2);
        expect(membersByRank.unteroffizier).toHaveLength(0);
        expect(membersByRank.veteran).toHaveLength(0);
        expect(membersByRank.rekrut).toHaveLength(0);
        expect(membersByRank.gast).toHaveLength(0);
    });

    it('should calculate member stats correctly', () => {
        component.ngOnInit();
        const stats = component.memberStats();
        const totalFromStats = Object.values(stats).reduce((sum, count) => sum + count, 0);

        expect(stats.offizier).toBe(1);
        expect(stats.soldat).toBe(2);
        expect(totalFromStats).toBe(component.members().length);
    });

    it('should provide expected static configuration', () => {
        expect(component.pageTitle).toBe('Aufstellung');
        expect(component.pageSubtitle).toContain('Mitglieder');
        expect(component.sections.OVERVIEW.TITLE).toBeTruthy();
        expect(component.sections.ROSTER.TITLE).toBeTruthy();
        expect(component.loadingMessages.LOADING).toBeTruthy();
    });

    it('should expose rank metadata for all ranks', () => {
        expect(component.rankOrder).toHaveLength(6);
        expect(component.rankInfo['offizier'].name).toBe('Offizier');
        expect(component.rankInfo['rekrut'].priority).toBe(5);
        expect(component.rankInfo['gast'].shortName).toBe('Gast');
    });

    it('should derive abteilung options from the loaded members', () => {
        component.ngOnInit();

        expect(component.abteilungOptions()).toHaveLength(1);
        expect(component.abteilungOptions()[0].name).toBe('Missionsbau');
    });

    it('should filter the roster by abteilung while keeping overview stats global', () => {
        component.ngOnInit();

        component.selectedAbteilungId.set('missionsbau');

        expect(component.membersByRank().soldat).toHaveLength(1);
        expect(component.membersByRank().soldat[0].name).toBe('Bravo');
        expect(component.membersByRank().offizier).toHaveLength(0);
        expect(component.memberStats().soldat).toBe(2);
        expect(component.members()).toHaveLength(3);
    });

    it('should show all members again when the filter is cleared', () => {
        component.ngOnInit();
        component.selectedAbteilungId.set('missionsbau');

        component.selectedAbteilungId.set(null);

        expect(component.membersByRank().soldat).toHaveLength(2);
        expect(component.membersByRank().offizier).toHaveLength(1);
    });

    it('should resolve the deep-linked member from the ?mitglied= query param by id', () => {
        component.ngOnInit();
        fixture.componentRef.setInput('mitglied', 'member-2');

        expect(component.deepLinkedMember()?.name).toBe('Bravo');
    });

    it('should have no deep-linked member without a matching query param', () => {
        component.ngOnInit();
        fixture.componentRef.setInput('mitglied', 'unbekannt');

        expect(component.deepLinkedMember()).toBeNull();
    });

    it('should handle loading errors', () => {
        memberServiceSpy.getAllMembers.mockReturnValue(throwError(() => new Error('boom')));

        component.ngOnInit();

        expect(component.isLoading()).toBe(false);
        expect(component.loadingError()).toBe('Fehler beim Laden der Mitgliederdaten');
        expect(component.members()).toHaveLength(0);
    });

    it('should retry loading on retryLoading call', () => {
        component.retryLoading();

        expect(memberServiceSpy.getAllMembers).toHaveBeenCalledTimes(1);
    });
});
