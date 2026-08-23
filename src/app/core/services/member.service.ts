import { Abteilung, CampaignRibbon, Medal, Member, RankType, MemberResponse, MemberStatsResponse } from '../../shared/types/member.types';

import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, timeout, retry, catchError } from 'rxjs/operators';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';

/**
 * Campaign ribbons shared by several dummy members, keyed by campaign.
 */
const CAMPAIGN_RIBBONS = {
    aspis: {
        id: 'campaign-aspis',
        name: 'Aspis Kampagne',
        image: '/img/ribbons/ttt_veteran-kampagne-aspis.png',
        campaign: 'Aspis',
        quarter: 'Q2',
        year: '2014',
    },
    kotirintama: {
        id: 'campaign-kotirintama',
        name: 'Kotirintama Kampagne',
        image: '/img/ribbons/ttt_veretan-kampagne-kotirintama.png',
        campaign: 'Kotirintama',
        quarter: 'Q2',
        year: '2022',
    },
    themisQ1: {
        id: 'campaign-themis-q1',
        name: 'Themis I Kampagne',
        image: '/img/ribbons/ttt_veteran-kampagne-themis-q1-2015.png',
        campaign: 'Themis I',
        quarter: 'Q1',
        year: '2015',
    },
    themisQ2: {
        id: 'campaign-themis-q2',
        name: 'Themis II Kampagne',
        image: '/img/ribbons/ttt_veteran-kampagne-themis-q2-2015.png',
        campaign: 'Themis II',
        quarter: 'Q2',
        year: '2015',
    },
    bethNahrin: {
        id: 'campaign-beth-nahrin',
        name: 'Beth Nahrin Kampagne',
        image: '/img/ribbons/ttt_veteran-kampagne-beth-nahrin.png',
        campaign: 'Beth Nahrin',
        quarter: 'Q4',
        year: '2014',
    },
    solomon: {
        id: 'campaign-solomon',
        name: 'Solomon Kampagne',
        image: '/img/ribbons/ttt_veteran-kampagne-solomon.png',
        campaign: 'Solomon',
        quarter: 'Q4',
        year: '2014',
    },
    nemesis: {
        id: 'campaign-nemesis',
        name: 'Nemesis Kampagne',
        image: '/img/ribbons/ttt_veteran-kampagne-nemesis.png',
        campaign: 'Nemesis',
        quarter: 'Q4',
        year: '2020',
    },
    entzug: {
        id: 'campaign-entzug',
        name: 'Kalter Entzug Kampagne',
        image: '/img/ribbons/ttt_veteran-kampagne-entzug-q4-2015.png',
        campaign: 'Kalter Entzug',
        quarter: 'Q4',
        year: '2015',
    },
    andromeda: {
        id: 'campaign-andromeda',
        name: 'Andromeda Kampagne',
        image: '/img/ribbons/ttt_veteran-kampagne-andromeda.png',
        campaign: 'Andromeda',
        quarter: 'Q1',
        year: '2023',
    },
    eastgate: {
        id: 'campaign-eastgate',
        name: 'Eastgate Kampagne',
        image: '/img/ribbons/ttt_veteran-kampagne-eastgate.png',
        campaign: 'Eastgate',
        quarter: 'Q2',
        year: '2021',
    },
    justitia: {
        id: 'campaign-justitia',
        name: 'Justitia Kampagne',
        image: '/img/ribbons/ttt_veteran-kampagne-justitia.png',
        campaign: 'Justitia',
        quarter: 'Q4',
        year: '2018',
    },
    phoenix: {
        id: 'campaign-phoenix',
        name: 'Phoenix Kampagne',
        image: '/img/ribbons/ttt_veteran-kampagne-phoenix-q2-2016.png',
        campaign: 'Phoenix',
        quarter: 'Q2',
        year: '2016',
    },
    paradiso: {
        id: 'campaign-paradiso',
        name: 'Paradiso Kampagne',
        image: '/img/ribbons/ttt_veteran-kampagne-paradiso.png',
        campaign: 'Paradiso',
        quarter: 'Q4',
        year: '2013',
    },
} satisfies Record<string, CampaignRibbon>;

/**
 * Medals and category ribbons shared by several dummy members, keyed by badge.
 */
const MEDALS = {
    medalOfHonor: {
        id: 'medal-mdh',
        name: 'Medal of Honor',
        image: '/img/ribbons/ttt-medal-of-honor.svg',
        description: '',
        isRibbon: false,
    },
    medienGold: {
        id: 'ribbon-medien-gold',
        name: 'Medien Gold',
        image: '/img/ribbons/ttt-ribbon-medien-gold.svg',
        description: '',
    },
    medienBronze: {
        id: 'ribbon-medien-bronze',
        name: 'Medien Bronze',
        image: '/img/ribbons/ttt-ribbon-medien-bronze.svg',
        description: '',
    },
    missionsbauPlatin: {
        id: 'ribbon-missionsbau-platin',
        name: 'Missionsbau Platin',
        image: '/img/ribbons/ttt-ribbon-missionsbau-platin.svg',
        description: '',
    },
    missionsbauSilber: {
        id: 'ribbon-missionsbau-silber',
        name: 'Missionsbau Silber',
        image: '/img/ribbons/ttt-ribbon-missionsbau-silber.svg',
        description: '',
    },
    trainingSilber: {
        id: 'ribbon-training-silber',
        name: 'Training Silber',
        image: '/img/ribbons/ttt-ribbon-training-silber.svg',
        description: '',
    },
} satisfies Record<string, Medal>;

/**
 * Departments shared by several dummy members, keyed by department.
 */
const DEPARTMENTS = {
    esports: {
        id: 'abt-esports',
        name: 'E-Sports',
        icon: '/img/departments/ttt-abt-esports-plakette.svg',
        description: 'Wettkampforientiertes Spielen und Teilnahme an Turnieren',
    },
    eventmanagement: {
        id: 'abt-eventmanagement',
        name: 'Eventmanagement',
        icon: '/img/departments/ttt-abt-eventmanagement-plakette.svg',
        description: 'Planung und Organisation von Events',
    },
    finanzenVerwaltung: {
        id: 'abt-finanzen-verwaltung',
        name: 'Finanzen & Verwaltung',
        icon: '/img/departments/ttt-abt-finanzen-verwaltung-plakette.svg',
        description: 'Administrative Verwaltung der Community',
    },
    missionsbau: {
        id: 'abt-missionsbau',
        name: 'Missionsbau',
        icon: '/img/departments/ttt-abt-missionsbau-plakette.svg',
        description: 'Wissensvermittlung & Multiplikation im Missionsbau',
    },
    personal: {
        id: 'abt-personal',
        name: 'Personal',
        icon: '/img/departments/ttt-abt-personal-plakette.svg',
        description: 'Rekrutierung und Betreuung neuer Mitglieder',
    },
    pr: {
        id: 'abt-pr',
        name: 'PR',
        icon: '/img/departments/ttt-abt-pr-plakette.svg',
        description: 'Social Media und Öffentlichkeitsarbeit',
    },
    qualitaetsmanagement: {
        id: 'abt-qualitaetsmanagement',
        name: 'Qualitätsmanagement',
        icon: '/img/departments/ttt-abt-qualitaetsmanagement-plakette.svg',
        description: 'Qualitätssicherung der Missionen',
    },
    technik: {
        id: 'abt-technik',
        name: 'Technik',
        icon: '/img/departments/ttt-abt-technik-plakette.svg',
        description: 'Technische Verwaltung der Community',
    },
    trainings: {
        id: 'abt-trainings',
        name: 'Trainings',
        icon: '/img/departments/ttt-abt-trainings-plakette.svg',
        description: 'Verwaltung und Durchführung von Trainings',
    },
    verbindungExtern: {
        id: 'abt-verbindung-extern',
        name: 'Verbindung Extern',
        icon: '/img/departments/ttt-abt-verbindung-extern-plakette.svg',
        description: 'Kontaktpflege zu externen Communities und Partnern',
    },
    verbindungIntern: {
        id: 'abt-verbindung-intern',
        name: 'Verbindung Intern',
        icon: '/img/departments/ttt-abt-verbindung-intern-plakette.svg',
        description: 'Community-Management',
    },
} satisfies Record<string, Abteilung>;

/**
 * Service for managing TTT member data
 */
@Injectable({
    providedIn: 'root',
})
export class MemberService {
    private readonly baseUrl = environment.apiBaseUrl;
    private readonly api = inject(ApiService);

    /**
     * Helper method to handle API calls with retry and timeout strategy
     */
    private handleApiCall<T, R>(
        url: string,
        mapFn: (response: T) => R,
        options: { timeout?: number; retries?: number; retryDelay?: number } = {}
    ): Observable<R> {
        const { timeout: timeoutMs = 5000, retries = 2, retryDelay = 1000 } = options;

        // Errors propagate to the caller so the UI can show its error state
        return this.api.get<T>(url).pipe(timeout(timeoutMs), retry({ count: retries, delay: retryDelay }), map(mapFn));
    }

    private getDummyMembers(): Member[] {
        return [
            {
                id: 'dummy-1',
                name: 'TheConen',
                rank: 'offizier',
                avatar: '',
                memberSince: '2015-01-01',
                medals: [MEDALS.medalOfHonor, MEDALS.medienGold, MEDALS.missionsbauPlatin, MEDALS.trainingSilber],
                campaignRibbons: [
                    CAMPAIGN_RIBBONS.aspis,
                    CAMPAIGN_RIBBONS.kotirintama,
                    CAMPAIGN_RIBBONS.themisQ1,
                    CAMPAIGN_RIBBONS.themisQ2,
                    CAMPAIGN_RIBBONS.bethNahrin,
                    CAMPAIGN_RIBBONS.solomon,
                    CAMPAIGN_RIBBONS.nemesis,
                    CAMPAIGN_RIBBONS.entzug,
                    CAMPAIGN_RIBBONS.andromeda,
                    CAMPAIGN_RIBBONS.eastgate,
                    CAMPAIGN_RIBBONS.justitia,
                    CAMPAIGN_RIBBONS.phoenix,
                    CAMPAIGN_RIBBONS.paradiso,
                ],
                abteilungen: [
                    DEPARTMENTS.esports,
                    DEPARTMENTS.eventmanagement,
                    DEPARTMENTS.finanzenVerwaltung,
                    DEPARTMENTS.missionsbau,
                    DEPARTMENTS.personal,
                    DEPARTMENTS.pr,
                    DEPARTMENTS.qualitaetsmanagement,
                    DEPARTMENTS.technik,
                    DEPARTMENTS.trainings,
                    DEPARTMENTS.verbindungExtern,
                    DEPARTMENTS.verbindungIntern,
                ],
            },
            {
                id: 'dummy-2',
                name: 'Menom',
                rank: 'veteran',
                avatar: '',
                memberSince: '2019-07-14',
                medals: [MEDALS.medalOfHonor, MEDALS.medienBronze, MEDALS.missionsbauSilber],
                campaignRibbons: [
                    CAMPAIGN_RIBBONS.nemesis,
                    CAMPAIGN_RIBBONS.eastgate,
                    CAMPAIGN_RIBBONS.kotirintama,
                    CAMPAIGN_RIBBONS.andromeda,
                ],
                abteilungen: [DEPARTMENTS.technik],
            },
            {
                id: 'dummy-3',
                name: 'GSG9_abzocker',
                rank: 'offizier',
                avatar: '',
                memberSince: '2014-01-01',
                medals: [MEDALS.medalOfHonor, MEDALS.medienBronze],
                campaignRibbons: [
                    CAMPAIGN_RIBBONS.aspis,
                    CAMPAIGN_RIBBONS.bethNahrin,
                    CAMPAIGN_RIBBONS.themisQ1,
                    CAMPAIGN_RIBBONS.themisQ2,
                    CAMPAIGN_RIBBONS.entzug,
                    CAMPAIGN_RIBBONS.phoenix,
                    CAMPAIGN_RIBBONS.solomon,
                    CAMPAIGN_RIBBONS.justitia,
                    CAMPAIGN_RIBBONS.nemesis,
                    CAMPAIGN_RIBBONS.eastgate,
                    CAMPAIGN_RIBBONS.kotirintama,
                    CAMPAIGN_RIBBONS.andromeda,
                ],
                abteilungen: [DEPARTMENTS.finanzenVerwaltung, DEPARTMENTS.technik],
            },
            {
                id: 'dummy-4',
                name: 'Bad Destiny',
                rank: 'unteroffizier',
                avatar: '',
                memberSince: '2016-04-01',
                medals: [],
                campaignRibbons: [CAMPAIGN_RIBBONS.phoenix, CAMPAIGN_RIBBONS.kotirintama, CAMPAIGN_RIBBONS.andromeda],
                abteilungen: [DEPARTMENTS.technik],
            },
        ];
    }

    /**
     * Get all active members with retry and timeout strategy
     */
    getAllMembers(): Observable<Member[]> {
        return this.handleApiCall<MemberResponse, Member[]>(`${this.baseUrl}/members`, (response) => response.members).pipe(
            // Backend not live yet: fall back to dummy members instead of the error state
            catchError(() => of(this.getDummyMembers()))
        );
    }

    /**
     * Get member statistics by rank with retry strategy
     */
    getMemberStats(): Observable<Record<RankType, number>> {
        return this.handleApiCall<MemberStatsResponse, Record<RankType, number>>(
            `${this.baseUrl}/members/stats`,
            (response) => response.stats
        );
    }
}
