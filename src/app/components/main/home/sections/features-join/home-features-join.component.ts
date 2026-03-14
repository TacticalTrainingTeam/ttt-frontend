import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonDirective } from 'primeng/button';
import { HomeCommunityStat } from '../../../../../shared/types/home.types';
import { SectionHeaderComponent } from '../../../../../shared/components/section-header/section-header.component';

@Component({
    selector: 'ttt-home-features-join',
    standalone: true,
    imports: [CommonModule, RouterLink, ButtonDirective, SectionHeaderComponent],
    templateUrl: './home-features-join.component.html',
})
export class HomeFeaturesJoinComponent {
    @Input({ required: true }) communityStats: HomeCommunityStat[] = [];
}
