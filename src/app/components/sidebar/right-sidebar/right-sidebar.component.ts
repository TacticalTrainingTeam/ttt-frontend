import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { DiscordWidgetComponent } from './discord-widget/discord-widget.component';

@Component({
    selector: 'ttt-right-sidebar',
    standalone: true,
    imports: [SectionHeaderComponent, DiscordWidgetComponent],
    templateUrl: './right-sidebar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightSidebarComponent {}
