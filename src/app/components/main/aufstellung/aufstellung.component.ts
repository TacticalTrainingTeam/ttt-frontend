import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';
import { Abteilung, Member as BackendMember, RankType } from '../../../shared/types/member.types';
import { MemberService } from '../../../core/services/member.service';
import {
    AufstellungLoadingMessages,
    AufstellungSections,
    Member,
    MembersByRank,
    MemberStats,
} from '../../../shared/types/aufstellung.types';
import { RANK_INFO, RANK_ORDER } from '../../../shared/constants/rank-display';
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
} as const;

@Component({
    selector: 'ttt-aufstellung',
    standalone: true,
    imports: [
        CommonModule,
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
    readonly pageSubtitle = AUFSTELLUNG_CONFIG.PAGE_SUBTITLE;
    readonly sections: AufstellungSections = AUFSTELLUNG_CONFIG.SECTIONS;
    readonly loadingMessages: AufstellungLoadingMessages = AUFSTELLUNG_CONFIG.LOADING_MESSAGES;

    readonly isLoading = signal(false);
    readonly loadingError = signal<string | null>(null);

    ngOnInit(): void {
        this.loadMembers();
    }

    readonly rankInfo = RANK_INFO;
    readonly rankOrder = RANK_ORDER;

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
