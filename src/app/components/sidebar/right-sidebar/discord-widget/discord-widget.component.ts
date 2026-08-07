import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DiscordService } from '../../../../core/services/discord.service';
import { DiscordMemberStatus } from '../../../../shared/types/discord.types';
import { TTT_LINKS } from '../../../../shared/constants/external-links';

@Component({
    selector: 'ttt-discord-widget',
    standalone: true,
    templateUrl: './discord-widget.component.html',
    styleUrl: './discord-widget.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscordWidgetComponent {
    private readonly discord = inject(DiscordService);

    readonly discordUrl = TTT_LINKS.discord;
    readonly widget = toSignal(this.discord.getWidgetData());

    readonly statusDotClass: Record<DiscordMemberStatus, string> = {
        online: 'bg-green-500',
        idle: 'bg-yellow-500',
        dnd: 'bg-red-500',
    };
}
