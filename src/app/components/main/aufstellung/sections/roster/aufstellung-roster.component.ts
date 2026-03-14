import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, inject, Input, PLATFORM_ID } from '@angular/core';
import { ActivableDirective } from '../../../../../shared/directives/activable.directive';
import { CampaignRibbon, RankType } from '../../../../../shared/types/member.types';
import { AUFSTELLUNG_SECURITY } from '../../aufstellung.shared';
import { Member, MembersByRank, RankInfoMap } from '../../../../../shared/types/aufstellung.types';

@Component({
    selector: 'ttt-aufstellung-roster',
    standalone: true,
    imports: [CommonModule, ActivableDirective],
    templateUrl: './aufstellung-roster.component.html',
    styleUrl: './aufstellung-roster.component.css',
})
export class AufstellungRosterComponent {
    private readonly document = inject(DOCUMENT);
    private readonly platformId = inject(PLATFORM_ID);

    @Input({ required: true }) members: Member[] = [];
    @Input({ required: true }) membersByRank!: MembersByRank;
    @Input({ required: true }) rankOrder: RankType[] = [];
    @Input({ required: true }) rankInfo!: RankInfoMap;
    @Input({ required: true }) title!: string;
    @Input({ required: true }) subtitle!: string;

    toggleMemberDetails(member: Member): void {
        const isOpening = !member.isExpanded;

        if (isOpening) {
            this.members.forEach((m) => {
                if (m !== member) {
                    m.isExpanded = false;
                }
            });
        }

        member.isExpanded = isOpening;

        if (member.isExpanded && isPlatformBrowser(this.platformId)) {
            setTimeout(() => {
                const element = this.document.getElementById(`member-${member.id}`);
                if (element) {
                    const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
            }, AUFSTELLUNG_SECURITY.MIN_ACTION_INTERVAL);
        }
    }

    handleMemberSpaceKey(member: Member, event: Event): void {
        if (this.hasExpandableContent(member)) {
            event.preventDefault();
            this.toggleMemberDetails(member);
        }
    }

    getRankInfo(rank: RankType) {
        return this.rankInfo[rank];
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

    private getRankBadgeClassesBase(rank: RankType, baseClasses: string): string {
        const colors = this.getRankColorClasses(rank);
        return `${baseClasses} ${colors.text} ${colors.bg}`;
    }

    getRankBadgeClasses(rank: RankType): string {
        return this.getRankBadgeClassesBase(rank, 'text-xs px-1.5 py-0.5 rounded font-medium block mb-1');
    }

    getRankBadgeExpandedClasses(rank: RankType): string {
        return this.getRankBadgeClassesBase(rank, 'text-sm px-2 py-1 rounded font-medium');
    }

    getAvatarBorderClasses(rank: RankType): Record<string, boolean> {
        switch (rank) {
            case 'offizier':
                return { 'border-yellow-400/50': true, 'group-hover:border-yellow-400': true };
            case 'unteroffizier':
                return { 'border-gray-400/50': true, 'group-hover:border-gray-400': true };
            case 'veteran':
                return { 'border-green-400/50': true, 'group-hover:border-green-400': true };
            case 'soldat':
                return { 'border-blue-600/50': true, 'group-hover:border-blue-600': true };
            case 'rekrut':
                return { 'border-blue-300/50': true, 'group-hover:border-blue-300': true };
            case 'gast':
                return { 'border-gray-300/50': true, 'group-hover:border-gray-300': true };
            default:
                return { 'border-gray-400/50': true, 'group-hover:border-gray-400': true };
        }
    }
}
