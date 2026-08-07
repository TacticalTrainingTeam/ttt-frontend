import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { DiscordWidgetComponent } from './discord-widget/discord-widget.component';
import { TTT_LINKS } from '../../../shared/constants/external-links';

@Component({
    selector: 'ttt-right-sidebar',
    standalone: true,
    imports: [SectionHeaderComponent, DiscordWidgetComponent],
    templateUrl: './right-sidebar.component.html',
    styleUrl: './right-sidebar.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightSidebarComponent {
    private readonly sanitizer = inject(DomSanitizer);

    readonly teamspeakUrl = TTT_LINKS.teamspeak;
    readonly teamspeakStatusUrl = this.sanitizer.bypassSecurityTrustResourceUrl(TTT_LINKS.teamspeakStatusViewer);
}
