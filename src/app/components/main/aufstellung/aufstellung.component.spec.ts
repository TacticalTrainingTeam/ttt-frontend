import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AufstellungComponent } from './aufstellung.component';
import { MemberService } from '../../../core/services/member.service';
import { DOCUMENT } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

describe('AufstellungComponent', () => {
    let component: AufstellungComponent;
    let fixture: ComponentFixture<AufstellungComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AufstellungComponent, HttpClientTestingModule],
            providers: [MemberService, { provide: DOCUMENT, useValue: document }, { provide: PLATFORM_ID, useValue: 'browser' }],
        }).compileComponents();

        fixture = TestBed.createComponent(AufstellungComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load dummy members', () => {
        component.ngOnInit();
        expect(component.members).toBeDefined();
        expect(component.members.length).toBeGreaterThanOrEqual(0);
        expect(component.totalMembers).toBeGreaterThanOrEqual(0);
    });

    it('should group members by rank correctly', () => {
        component.ngOnInit();
        const membersByRank = component.membersByRank;

        expect(membersByRank.offizier).toBeDefined();
        expect(membersByRank.unteroffizier).toBeDefined();
        expect(membersByRank.veteran).toBeDefined();
        expect(membersByRank.soldat).toBeDefined();
        expect(membersByRank.rekrut).toBeDefined();
        expect(membersByRank.gast).toBeDefined();
    });

    it('should calculate member stats correctly', () => {
        component.ngOnInit();
        const stats = component.memberStats;
        const totalFromStats = Object.values(stats).reduce((sum, count) => sum + count, 0);

        expect(totalFromStats).toBe(component.totalMembers);
    });

    it('should toggle member details', () => {
        component.ngOnInit();
        if (component.members && component.members.length > 0) {
            const member = component.members[0];
            const initialExpanded = member.isExpanded || false;

            component.toggleMemberDetails(member);
            expect(member.isExpanded).toBe(!initialExpanded);

            component.toggleMemberDetails(member);
            expect(member.isExpanded).toBe(initialExpanded);
        }
    });

    it('should detect expandable content correctly', () => {
        component.ngOnInit();
        const memberWithContent = component.members.find(
            (m) => m.medals.length > 0 || m.campaignRibbons.length > 0 || m.abteilungen.length > 0
        );
        const memberWithoutContent = component.members.find(
            (m) => m.medals.length === 0 && m.campaignRibbons.length === 0 && m.abteilungen.length === 0
        );

        if (memberWithContent) {
            expect(component.hasExpandableContent(memberWithContent)).toBe(true);
        }
        if (memberWithoutContent) {
            expect(component.hasExpandableContent(memberWithoutContent)).toBe(false);
        }
    });

    it('should format member since date correctly', () => {
        component.ngOnInit();
        const testDate = '2020-03-15';
        const formatted = component.getFormattedMemberSince(testDate);

        expect(formatted).toBeTruthy();
        expect(typeof formatted).toBe('string');
    });

    it('should return correct rank info', () => {
        const offizierInfo = component.getRankInfo('offizier');
        expect(offizierInfo.name).toBe('Offizier');
        expect(offizierInfo.priority).toBe(1);

        const rekrutInfo = component.getRankInfo('rekrut');
        expect(rekrutInfo.name).toBe('Rekrut');
        expect(rekrutInfo.priority).toBe(5);
    });
});
