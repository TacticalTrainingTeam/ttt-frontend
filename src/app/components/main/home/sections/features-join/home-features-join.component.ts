import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonDirective } from 'primeng/button';
import { HomeCommunityStat } from '../../../../../shared/types/home.types';
import { SectionHeaderComponent } from '../../../../../shared/components/section-header/section-header.component';
import { TTT_LINKS } from '../../../../../shared/constants/external-links';

@Component({
    selector: 'ttt-home-features-join',
    standalone: true,
    imports: [CommonModule, RouterLink, ButtonDirective, SectionHeaderComponent],
    templateUrl: './home-features-join.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeFeaturesJoinComponent {
    communityStats = input.required<HomeCommunityStat[]>();

    readonly links = TTT_LINKS;
}
