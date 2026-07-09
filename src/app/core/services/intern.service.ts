import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { CatalogService } from './catalog.service';
import { PlatformIds, UserProfile } from '../../shared/types/intern.types';
import { environment } from '../../../environments/environment';

/** Platform ids the user may change; discordId is managed by the OIDC login */
export type EditablePlatformIds = Omit<PlatformIds, 'discordId'>;

/** Member update issued by member managers (platform ids + medal assignment) */
export interface UpdateMemberRequest {
    platformIds: EditablePlatformIds;
    medalIds: string[];
}

/**
 * Profile and member management endpoints of the intern area.
 * With environment.useDummyFallback enabled, local dummy data is served
 * instead of calling the backend.
 */
@Injectable({ providedIn: 'root' })
export class InternService {
    private readonly baseUrl = `${environment.apiBaseUrl}/intern`;
    private readonly api = inject(ApiService);
    private readonly catalog = inject(CatalogService);

    /** Local state for the dummy mode so edits survive navigation */
    private dummyMembers: UserProfile[] = this.createDummyMembers();

    getOwnProfile(): Observable<UserProfile> {
        if (environment.useDummyFallback) {
            return of(this.dummyMembers[0]);
        }
        return this.api.get<UserProfile>(`${this.baseUrl}/profile`);
    }

    updateOwnPlatformIds(platformIds: EditablePlatformIds): Observable<UserProfile> {
        if (environment.useDummyFallback) {
            return of(this.updateDummyMember(this.dummyMembers[0].id, platformIds));
        }
        return this.api.patch<UserProfile>(`${this.baseUrl}/profile/platform-ids`, platformIds);
    }

    getMembers(): Observable<UserProfile[]> {
        if (environment.useDummyFallback) {
            return of([...this.dummyMembers]);
        }
        return this.api.get<UserProfile[]>(`${this.baseUrl}/members`);
    }

    updateMember(memberId: string, request: UpdateMemberRequest): Observable<UserProfile> {
        if (environment.useDummyFallback) {
            return of(this.updateDummyMember(memberId, request.platformIds, request.medalIds));
        }
        return this.api.patch<UserProfile>(`${this.baseUrl}/members/${memberId}`, request);
    }

    private updateDummyMember(memberId: string, platformIds: EditablePlatformIds, medalIds?: string[]): UserProfile {
        this.dummyMembers = this.dummyMembers.map((member) =>
            member.id === memberId
                ? {
                      ...member,
                      platformIds: { ...platformIds, discordId: member.platformIds.discordId },
                      medals: medalIds ? this.catalog.getMedalsByIds(medalIds) : member.medals,
                  }
                : member
        );
        const updated = this.dummyMembers.find((member) => member.id === memberId);
        if (!updated) {
            throw new Error(`Unknown member: ${memberId}`);
        }
        return updated;
    }

    private createDummyMembers(): UserProfile[] {
        return [
            {
                id: 'member-1',
                name: 'Menom',
                rank: 'veteran',
                avatar: '/img/aufstellung/offizier-kopf.webp',
                memberSince: '2019-03-12',
                medals: [
                    {
                        id: 'medal-1',
                        name: 'Medal of Honor',
                        image: '/img/aufstellung/medals/medal-mdh.png',
                        description: 'Für herausragende Verdienste um das TTT',
                    },
                    {
                        id: 'medal-2',
                        name: 'Goldene Ausbildungsmedaille',
                        image: '/img/aufstellung/medals/medal-gold-training.png',
                        description: 'Für langjährige Ausbildungstätigkeit',
                    },
                ],
                campaignRibbons: [
                    {
                        id: 'ribbon-1',
                        image: '/img/aufstellung/ribbons/ttt_veteran-kampagne-aspis.png',
                        campaign: 'Aspis',
                        year: '2022',
                    },
                    {
                        id: 'ribbon-2',
                        image: '/img/aufstellung/ribbons/ttt_veteran-kampagne-paradiso.png',
                        campaign: 'Paradiso',
                        year: '2023',
                    },
                ],
                abteilungen: [
                    {
                        id: 'missionsbau',
                        name: 'Missionsbau',
                        icon: '/img/aufstellung/group/group-missionsbau-icon.png',
                        description: 'Erstellung von Missionen und Kampagnen',
                    },
                ],
                platformIds: {
                    steamId: '76561198000000000',
                    xboxId: '',
                    playstationId: '',
                    armaIngameName: 'Menom',
                    discordId: 'menom#0001',
                },
            },
            {
                id: 'member-2',
                name: 'TheConen',
                rank: 'offizier',
                avatar: '/img/aufstellung/offizier-kopf.webp',
                memberSince: '2015-01-01',
                medals: [],
                campaignRibbons: [],
                abteilungen: [
                    {
                        id: 'abt-1',
                        name: 'Missionsbau',
                        icon: '/img/aufstellung/group/group-missionsbau-icon.png',
                        description: 'Wissensvermittlung & Multiplikation im Missionsbau',
                    },
                ],
                platformIds: {
                    steamId: '76561198000000001',
                    xboxId: '',
                    playstationId: '',
                    armaIngameName: 'TheConen',
                    discordId: 'theconen#0002',
                },
            },
            {
                id: 'member-3',
                name: 'SpecOp0',
                rank: 'offizier',
                avatar: '/img/aufstellung/offizier-kopf.webp',
                memberSince: '2016-01-01',
                medals: [],
                campaignRibbons: [],
                abteilungen: [
                    {
                        id: 'abt-2',
                        name: 'PR',
                        icon: '/img/aufstellung/group/group-pr-icon.png',
                        description: 'Social Media und Öffentlichkeitsarbeit',
                    },
                    {
                        id: 'abt-3',
                        name: 'Technik',
                        icon: '/img/aufstellung/group/group-technik-icon.png',
                        description: 'Server-Administration und technische Wartung',
                    },
                ],
                platformIds: {
                    steamId: '76561198000000002',
                    xboxId: 'SpecOp0',
                    playstationId: '',
                    armaIngameName: 'SpecOp0',
                    discordId: 'specop0#0003',
                },
            },
            {
                id: 'member-4',
                name: 'Reimchen',
                rank: 'unteroffizier',
                avatar: '',
                memberSince: '2018-01-01',
                medals: [],
                campaignRibbons: [],
                abteilungen: [],
                platformIds: {
                    steamId: '76561198000000004',
                    xboxId: '',
                    playstationId: '',
                    armaIngameName: 'Reimchen',
                    discordId: 'reimchen#0004',
                },
            },
            {
                id: 'member-5',
                name: 'GSG9_abzocker',
                rank: 'veteran',
                avatar: '',
                memberSince: '2017-01-01',
                medals: [],
                campaignRibbons: [],
                abteilungen: [],
                platformIds: {
                    steamId: '76561198000000005',
                    xboxId: '',
                    playstationId: 'GSG9_abzocker',
                    armaIngameName: 'GSG9_abzocker',
                    discordId: 'gsg9abzocker#0005',
                },
            },
            {
                id: 'member-6',
                name: 'Corben',
                rank: 'soldat',
                avatar: '',
                memberSince: '2022-01-01',
                medals: [],
                campaignRibbons: [],
                abteilungen: [],
                platformIds: {
                    steamId: '76561198000000006',
                    xboxId: '',
                    playstationId: '',
                    armaIngameName: 'Corben',
                    discordId: 'corben#0006',
                },
            },
            {
                id: 'member-7',
                name: 'Epsilon',
                rank: 'rekrut',
                avatar: '',
                memberSince: '2024-01-01',
                medals: [],
                campaignRibbons: [],
                abteilungen: [],
                platformIds: {
                    steamId: '',
                    xboxId: '',
                    playstationId: '',
                    armaIngameName: 'Epsilon',
                    discordId: 'epsilon#0007',
                },
            },
        ];
    }
}
