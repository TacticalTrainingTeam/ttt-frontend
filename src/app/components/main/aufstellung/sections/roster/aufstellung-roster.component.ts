import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { Tooltip } from 'primeng/tooltip';
import { ActivableDirective } from '../../../../../shared/directives/activable.directive';
import { CampaignRibbon, RankType } from '../../../../../shared/types/member.types';
import { AUFSTELLUNG_SECURITY } from '../../aufstellung.shared';
import { Member, MembersByRank, RankInfoMap } from '../../../../../shared/types/aufstellung.types';
import { SectionHeaderComponent } from '../../../../../shared/components/section-header/section-header.component';

@Component({
    selector: 'ttt-aufstellung-roster',
    standalone: true,
    imports: [CommonModule, Dialog, Tooltip, ActivableDirective, SectionHeaderComponent],
    templateUrl: './aufstellung-roster.component.html',
    styleUrl: './aufstellung-roster.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AufstellungRosterComponent {
    members = input.required<Member[]>();
    membersByRank = input.required<MembersByRank>();
    rankOrder = input.required<RankType[]>();
    rankInfo = input.required<RankInfoMap>();
    title = input.required<string>();
    subtitle = input.required<string>();

    /** Member shown in the details dialog; null while the dialog is closed */
    readonly selectedMember = signal<Member | null>(null);

    openMemberDetails(member: Member): void {
        if (this.hasExpandableContent(member)) {
            this.selectedMember.set(member);
        }
    }

    onDetailsVisibleChange(visible: boolean): void {
        if (!visible) {
            this.selectedMember.set(null);
        }
    }

    getRankInfo(rank: RankType) {
        return this.rankInfo()[rank];
    }

    getFormattedMemberSince(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString('de-DE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    getMemberYear(dateString: string): string {
        const date = new Date(dateString);
        return date.getFullYear().toString();
    }

    hasExpandableContent(member: Member): boolean {
        return member.medals.length > 0 || member.campaignRibbons.length > 0 || member.abteilungen.length > 0;
    }

    getSortedCampaignRibbons(ribbons: CampaignRibbon[]): CampaignRibbon[] {
        return [...ribbons].sort((a, b) => {
            const yearA = Number.parseInt(a.year, AUFSTELLUNG_SECURITY.RADIX);
            const yearB = Number.parseInt(b.year, AUFSTELLUNG_SECURITY.RADIX);
            return yearB - yearA;
        });
    }

    private getRankColorClasses(rank: RankType): { text: string; bg: string } {
        switch (rank) {
            case 'offizier':
                return { text: 'text-yellow-400', bg: 'bg-yellow-400/10' };
            case 'unteroffizier':
                return { text: 'text-gray-400', bg: 'bg-gray-400/10' };
            case 'veteran':
                return { text: 'text-green-400', bg: 'bg-green-400/10' };
            case 'soldat':
                return { text: 'text-blue-600', bg: 'bg-blue-600/10' };
            case 'rekrut':
                return { text: 'text-blue-300', bg: 'bg-blue-300/10' };
            case 'gast':
                return { text: 'text-gray-300', bg: 'bg-gray-300/10' };
            default:
                return { text: 'text-gray-400', bg: 'bg-gray-400/10' };
        }
    }

    getRankTagClasses(rank: RankType): string {
        return this.getRankColorClasses(rank).text;
    }
}
