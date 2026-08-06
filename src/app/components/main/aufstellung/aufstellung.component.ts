import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from '@openng/optimus-ui/select';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';
import { Abteilung, Member as BackendMember, RankType } from '../../../shared/types/member.types';
import { MemberService } from '../../../core/services/member.service';
import {
    AufstellungLoadingMessages,
    AufstellungSections,
    Member,
    MembersByRank,
    MemberStats,
    RankInfoMap,
} from '../../../shared/types/aufstellung.types';
import { AufstellungLoadingStateComponent } from './sections/loading-state/aufstellung-loading-state.component';
import { AufstellungOverviewComponent } from './sections/overview/aufstellung-overview.component';
import { AufstellungRosterComponent } from './sections/roster/aufstellung-roster.component';

// Configuration constants
const AUFSTELLUNG_CONFIG = {
    PAGE_TITLE: 'Aufstellung',
    PAGE_SUBTITLE: 'Mitglieder und Struktur des Tactical Training Teams',
    SECTIONS: {
        OVERVIEW: {
            TITLE: 'Mitgliederübersicht',
            SUBTITLE: 'Aktuelle Personalstärke nach Rängen',
        },
        ROSTER: {
            TITLE: 'Personalaufstellung',
            SUBTITLE: 'Unsere Mitglieder',
        },
    },
    LOADING_MESSAGES: {
        LOADING: 'Mitgliederdaten werden geladen...',
        ERROR_TITLE: 'Fehler',
        RETRY_TEXT: 'Erneut versuchen',
        RETRY_ARIA: 'Mitgliederdaten erneut laden',
    },
    ASSETS: {
        RANKS: {
            BASE_PATH: '/img/ranks/',
            OFFIZIER: 'TTT-Icon_Offizier.png',
            UNTEROFFIZIER: 'TTT-Icon_Unteroffizier.png',
            VETERAN: 'TTT-Icon_Soldat-Veteran.png',
            SOLDAT: 'TTT-Icon_Soldat-Veteran.png',
            REKRUT: 'TTT-Icon_Rekrut.png',
            GAST: 'TTT-Icon_Gast.png',
        },
    },
} as const;

@Component({
    selector: 'ttt-aufstellung',
    standalone: true,
    imports: [
        FormsModule,
        Select,
        PageLayoutComponent,
        AufstellungLoadingStateComponent,
        AufstellungOverviewComponent,
        AufstellungRosterComponent,
    ],
    templateUrl: './aufstellung.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AufstellungComponent implements OnInit {
    private readonly memberService = inject(MemberService);

    readonly pageTitle = AUFSTELLUNG_CONFIG.PAGE_TITLE;
    readonly heroImage = '/img/banner/banner-img4.webp';
    readonly pageSubtitle = AUFSTELLUNG_CONFIG.PAGE_SUBTITLE;
    readonly sections: AufstellungSections = AUFSTELLUNG_CONFIG.SECTIONS;
    readonly loadingMessages: AufstellungLoadingMessages = AUFSTELLUNG_CONFIG.LOADING_MESSAGES;

    readonly isLoading = signal(false);
    readonly loadingError = signal<string | null>(null);

    ngOnInit(): void {
        this.loadMembers();
    }

    readonly rankInfo: RankInfoMap = {
        offizier: {
            name: 'Offizier',
            shortName: 'Off.',
            icon: `${AUFSTELLUNG_CONFIG.ASSETS.RANKS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RANKS.OFFIZIER}`,
            color: 'text-yellow-400',
            priority: 1,
        },
        unteroffizier: {
            name: 'Unteroffizier',
            shortName: 'Uffz.',
            icon: `${AUFSTELLUNG_CONFIG.ASSETS.RANKS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RANKS.UNTEROFFIZIER}`,
            color: 'text-gray-400',
            priority: 2,
        },
        veteran: {
            name: 'Veteran',
            shortName: 'Vet.',
            icon: `${AUFSTELLUNG_CONFIG.ASSETS.RANKS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RANKS.VETERAN}`,
            color: 'text-green-400',
            priority: 3,
        },
        soldat: {
            name: 'Soldat',
            shortName: 'Sdt.',
            icon: `${AUFSTELLUNG_CONFIG.ASSETS.RANKS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RANKS.SOLDAT}`,
            color: 'text-blue-600',
            priority: 4,
        },
        rekrut: {
            name: 'Rekrut',
            shortName: 'Rekr.',
            icon: `${AUFSTELLUNG_CONFIG.ASSETS.RANKS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RANKS.REKRUT}`,
            color: 'text-blue-300',
            priority: 5,
        },
        gast: {
            name: 'Gast',
            shortName: 'Gast',
            icon: `${AUFSTELLUNG_CONFIG.ASSETS.RANKS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RANKS.GAST}`,
            color: 'text-gray-300',
            priority: 6,
        },
    } as const;

    readonly rankOrder: RankType[] = ['offizier', 'unteroffizier', 'veteran', 'soldat', 'rekrut', 'gast'] as const;

    readonly members = signal<Member[]>([]);

    /** Selected Abteilung id; null shows all members */
    readonly selectedAbteilungId = signal<string | null>(null);

    /** Unique Abteilungen derived from the loaded members */
    readonly abteilungOptions = computed<Abteilung[]>(() => {
        const unique = new Map<string, Abteilung>();
        for (const member of this.members()) {
            for (const abteilung of member.abteilungen) {
                unique.set(abteilung.id, abteilung);
            }
        }
        return [...unique.values()].sort((a, b) => a.name.localeCompare(b.name));
    });

    private readonly filteredMembers = computed<Member[]>(() => {
        const abteilungId = this.selectedAbteilungId();
        const members = this.members();
        if (!abteilungId) {
            return members;
        }
        return members.filter((member) => member.abteilungen.some((abteilung) => abteilung.id === abteilungId));
    });

    /** Roster grouping honors the Abteilung filter */
    readonly membersByRank = computed<MembersByRank>(() => {
        const byRank = this.createEmptyRankRecord<Member[]>(() => []);
        for (const member of this.filteredMembers()) {
            byRank[member.rank].push(member);
        }
        for (const rank of this.rankOrder) {
            byRank[rank].sort((a, b) => a.name.localeCompare(b.name));
        }
        return byRank;
    });

    /** Overview stats always show the full roster, independent of the filter */
    readonly memberStats = computed<MemberStats>(() => {
        const stats = this.createEmptyRankRecord<number>(() => 0);
        for (const member of this.members()) {
            stats[member.rank]++;
        }
        return stats;
    });

    readonly totalMembers = computed(() => this.members().length);

    private createEmptyRankRecord<T>(factory: () => T): Record<RankType, T> {
        return this.rankOrder.reduce(
            (acc, rank) => {
                acc[rank] = factory();
                return acc;
            },
            {} as Record<RankType, T>
        );
    }

    retryLoading(): void {
        this.loadMembers();
    }

    private loadMembers(): void {
        this.isLoading.set(true);
        this.loadingError.set(null);
        this.memberService.getAllMembers().subscribe({
            next: (members: BackendMember[]) => {
                this.members.set(members);
                this.isLoading.set(false);
            },
            error: () => {
                this.loadingError.set('Fehler beim Laden der Mitgliederdaten');
                this.isLoading.set(false);
            },
        });
    }
}
