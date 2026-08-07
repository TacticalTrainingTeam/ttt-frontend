import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Dialog } from '@openng/optimus-ui/dialog';
import { Tooltip } from '@openng/optimus-ui/tooltip';
import { ActivableDirective } from '../../../../../shared/directives/activable.directive';
import { CampaignRibbon, RankType } from '../../../../../shared/types/member.types';
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

    hasExpandableContent(member: Member): boolean {
        return member.medals.length > 0 || member.campaignRibbons.length > 0 || member.abteilungen.length > 0;
    }

    getSortedCampaignRibbons(ribbons: CampaignRibbon[]): CampaignRibbon[] {
        return [...ribbons].sort((a, b) => Number.parseInt(b.year, 10) - Number.parseInt(a.year, 10));
    }
}
