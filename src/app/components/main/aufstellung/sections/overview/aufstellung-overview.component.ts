import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MemberStats, RankInfoMap } from '../../../../../shared/types/aufstellung.types';
import { RankType } from '../../../../../shared/types/member.types';

@Component({
    selector: 'ttt-aufstellung-overview',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './aufstellung-overview.component.html',
    styleUrl: './aufstellung-overview.component.css',
})
export class AufstellungOverviewComponent {
    @Input({ required: true }) rankOrder: RankType[] = [];
    @Input({ required: true }) rankInfo!: RankInfoMap;
    @Input({ required: true }) memberStats!: MemberStats;
    @Input({ required: true }) totalMembers = 0;
    @Input({ required: true }) title!: string;
    @Input({ required: true }) subtitle!: string;

    getRankInfo(rank: RankType) {
        return this.rankInfo[rank];
    }
}
