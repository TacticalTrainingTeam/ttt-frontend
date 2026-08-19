import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { Dialog } from '@openng/optimus-ui/dialog';
import { Tooltip } from '@openng/optimus-ui/tooltip';
import { ActivableDirective } from '../../../../../shared/directives/activable.directive';
import { CampaignRibbon, RankType } from '../../../../../shared/types/member.types';
import { Member, MembersByRank, RankInfoMap } from '../../../../../shared/types/aufstellung.types';
import { SectionHeaderComponent } from '../../../../../shared/components/section-header/section-header.component';
import { AufstellungDienstanzugComponent, UniformBadge } from '../dienstanzug/aufstellung-dienstanzug.component';

/** Merit ribbon or campaign ribbon prepared for display, in both the ribbon bar and the side list */
interface RibbonItem extends UniformBadge {
    /** Short caption shown under the tile in the side list */
    caption: string;
    /** Worn on the ribbon bar; hanging medals (isRibbon: false) are listed but not racked */
    isRacked: boolean;
}

@Component({
    selector: 'ttt-aufstellung-roster',
    standalone: true,
    imports: [NgClass, Dialog, Tooltip, ActivableDirective, SectionHeaderComponent, AufstellungDienstanzugComponent],
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

    /**
     * Medals and campaign ribbons of the selected member, merits first and campaigns sorted by date.
     * Single source for both the ribbon bar on the uniform and the side list next to it.
     */
    readonly ribbonItems = computed<RibbonItem[]>(() => {
        const member = this.selectedMember();
        if (!member) {
            return [];
        }

        const merits = member.medals.map((medal) => ({
            id: medal.id,
            image: medal.image,
            caption: medal.name,
            label: medal.description || medal.name,
            isRacked: medal.isRibbon !== false,
        }));

        const campaigns = this.getSortedCampaignRibbons(member.campaignRibbons).map((ribbon) => ({
            id: ribbon.id,
            image: ribbon.image,
            caption: ribbon.campaign,
            label: `${ribbon.campaign} · ${ribbon.quarter} ${ribbon.year}`,
            isRacked: true,
        }));

        return [...merits, ...campaigns];
    });

    /** Ribbon bar of the selected member; hanging medals are worn on the pocket flap instead */
    readonly rackRibbons = computed<UniformBadge[]>(() =>
        this.ribbonItems()
            .filter((item) => item.isRacked)
            .map(({ id, image, label }) => ({ id, image, label }))
    );

    /** Departments hang on the left pocket button; the uniform shows the first three */
    readonly uniformDepartments = computed<UniformBadge[]>(
        () =>
            this.selectedMember()?.abteilungen.map((abteilung) => ({ id: abteilung.id, image: abteilung.icon, label: abteilung.name })) ??
            []
    );

    /** Hanging medals are worn on the pocket flap instead of the ribbon bar */
    readonly uniformMedal = computed<UniformBadge | null>(() => {
        const medal = this.selectedMember()?.medals.find((candidate) => candidate.isRibbon === false);
        return medal ? { id: medal.id, image: medal.image, label: medal.name } : null;
    });

    openMemberDetails(member: Member): void {
        this.selectedMember.set(member);
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

    /** The uniform is always shown; this only decides whether the list beside it has anything to list */
    hasListedDetails(member: Member): boolean {
        return member.medals.length > 0 || member.campaignRibbons.length > 0 || member.abteilungen.length > 0;
    }

    getSortedCampaignRibbons(ribbons: CampaignRibbon[]): CampaignRibbon[] {
        const sortKey = (ribbon: CampaignRibbon) =>
            Number.parseInt(ribbon.year, 10) * 10 + Number.parseInt(ribbon.quarter.replace('Q', ''), 10);
        return [...ribbons].sort((a, b) => sortKey(b) - sortKey(a));
    }
}
