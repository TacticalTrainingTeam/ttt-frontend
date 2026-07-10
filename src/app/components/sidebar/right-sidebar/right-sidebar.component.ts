import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { TTT_LINKS } from '../../../shared/constants/external-links';

@Component({
    selector: 'ttt-right-sidebar',
    standalone: true,
    imports: [CommonModule, SectionHeaderComponent],
    templateUrl: './right-sidebar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightSidebarComponent {
    readonly discordUrl = TTT_LINKS.discord;
}
