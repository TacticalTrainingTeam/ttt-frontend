import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonDirective } from 'primeng/button';
import { HomeCommunityStat } from '../../../../../shared/types/home.types';

@Component({
    selector: 'ttt-home-features-join',
    standalone: true,
    imports: [CommonModule, RouterLink, ButtonDirective],
    templateUrl: './home-features-join.component.html',
    styleUrl: './home-features-join.component.css',
})
export class HomeFeaturesJoinComponent {
    @Input({ required: true }) communityStats: HomeCommunityStat[] = [];
}
