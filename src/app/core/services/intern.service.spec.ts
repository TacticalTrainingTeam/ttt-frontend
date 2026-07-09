import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { InternService } from './intern.service';

describe('InternService (dummy mode)', () => {
    let service: InternService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient()],
        });
        service = TestBed.inject(InternService);
    });

    it('should return the own profile', (done) => {
        service.getOwnProfile().subscribe((profile) => {
            expect(profile.name).toBe('Menom');
            done();
        });
    });

    it('should return the member list', (done) => {
        service.getMembers().subscribe((members) => {
            expect(members.length).toBeGreaterThan(1);
            done();
        });
    });

    it('should update platform ids but keep the discord id', (done) => {
        service
            .updateOwnPlatformIds({ steamId: 'new-steam', xboxId: '', playstationId: '', armaIngameName: 'Menom' })
            .subscribe((profile) => {
                expect(profile.platformIds.steamId).toBe('new-steam');
                expect(profile.platformIds.discordId).toBe('menom#0001');
                done();
            });
    });

    it('should update a member including medal assignment', (done) => {
        service
            .updateMember('member-4', {
                platformIds: { steamId: '', xboxId: 'ReimchenX', playstationId: '', armaIngameName: 'Reimchen' },
                medalIds: ['medal-1'],
            })
            .subscribe((member) => {
                expect(member.id).toBe('member-4');
                expect(member.platformIds.xboxId).toBe('ReimchenX');
                expect(member.medals.map((medal) => medal.id)).toEqual(['medal-1']);
                done();
            });
    });
});
