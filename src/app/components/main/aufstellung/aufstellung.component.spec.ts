import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AufstellungComponent } from './aufstellung.component';
import { MemberService } from '../../../core/services/member.service';
import { Member } from '../../../shared/types/member.types';

describe('AufstellungComponent', () => {
    let component: AufstellungComponent;
    let fixture: ComponentFixture<AufstellungComponent>;
    let memberServiceSpy: jasmine.SpyObj<MemberService>;

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
            abteilungen: [],
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
        memberServiceSpy = jasmine.createSpyObj<MemberService>('MemberService', ['getAllMembers']);
        memberServiceSpy.getAllMembers.and.returnValue(of(mockMembers));

        await TestBed.configureTestingModule({
            imports: [AufstellungComponent],
            providers: [{ provide: MemberService, useValue: memberServiceSpy }],
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
        expect(component.members.length).toBe(3);
        expect(component.members.every((member) => member.isExpanded === false)).toBeTrue();
        expect(component.totalMembers).toBe(3);
    });

    it('should group members by rank correctly', () => {
        component.ngOnInit();
        const membersByRank = component.membersByRank;

        expect(membersByRank.offizier.length).toBe(1);
        expect(membersByRank.soldat.length).toBe(2);
        expect(membersByRank.unteroffizier.length).toBe(0);
        expect(membersByRank.veteran.length).toBe(0);
        expect(membersByRank.rekrut.length).toBe(0);
        expect(membersByRank.gast.length).toBe(0);
    });

    it('should calculate member stats correctly', () => {
        component.ngOnInit();
        const stats = component.memberStats;
        const totalFromStats = Object.values(stats).reduce((sum, count) => sum + count, 0);

        expect(stats.offizier).toBe(1);
        expect(stats.soldat).toBe(2);
        expect(totalFromStats).toBe(component.totalMembers);
    });

    it('should provide expected static configuration', () => {
        expect(component.pageTitle).toBe('Aufstellung');
        expect(component.pageSubtitle).toContain('Mitglieder');
        expect(component.sections.OVERVIEW.TITLE).toBeTruthy();
        expect(component.sections.ROSTER.TITLE).toBeTruthy();
        expect(component.loadingMessages.LOADING).toBeTruthy();
    });

    it('should expose rank metadata for all ranks', () => {
        expect(component.rankOrder.length).toBe(6);
        expect(component.rankInfo['offizier'].name).toBe('Offizier');
        expect(component.rankInfo['rekrut'].priority).toBe(5);
        expect(component.rankInfo['gast'].shortName).toBe('Gast');
    });

    it('should handle loading errors', () => {
        memberServiceSpy.getAllMembers.and.returnValue(throwError(() => new Error('boom')));

        component.ngOnInit();

        expect(component.isLoading).toBeFalse();
        expect(component.loadingError).toBe('Fehler beim Laden der Mitgliederdaten');
        expect(component.members.length).toBe(0);
    });

    it('should retry loading on retryLoading call', () => {
        component.retryLoading();

        expect(memberServiceSpy.getAllMembers).toHaveBeenCalledTimes(1);
    });
});
