import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonDirective } from '@openng/optimus-ui/button';
import { HomeBranch, HomeCommunityStat } from '../../../../../shared/types/home.types';
import { SectionHeaderComponent } from '../../../../../shared/components/section-header/section-header.component';
import { TTT_LINKS } from '../../../../../shared/constants/external-links';

@Component({
    selector: 'ttt-home-branches',
    standalone: true,
    imports: [RouterLink, ButtonDirective, SectionHeaderComponent],
    templateUrl: './home-branches.component.html',
    styleUrl: './home-branches.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeBranchesComponent {
    branches = input.required<HomeBranch[]>();
    communityStats = input.required<HomeCommunityStat[]>();

    readonly links = TTT_LINKS;
}
