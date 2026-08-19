import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MemberStats, RankInfoMap } from '../../../../../shared/types/aufstellung.types';
import { RankType } from '../../../../../shared/types/member.types';
import { SectionHeaderComponent } from '../../../../../shared/components/section-header/section-header.component';

@Component({
    selector: 'ttt-aufstellung-overview',
    standalone: true,
    imports: [NgClass, SectionHeaderComponent],
    templateUrl: './aufstellung-overview.component.html',
    styleUrl: './aufstellung-overview.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AufstellungOverviewComponent {
    rankOrder = input.required<RankType[]>();
    rankInfo = input.required<RankInfoMap>();
    memberStats = input.required<MemberStats>();
    title = input.required<string>();
    subtitle = input.required<string>();

    getRankInfo(rank: RankType) {
        return this.rankInfo()[rank];
    }
}
