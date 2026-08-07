import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TTT_LINKS, TTT_SOCIAL_LINKS } from '../../shared/constants/external-links';

@Component({
    selector: 'ttt-footer',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './footer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
    readonly currentYear = new Date().getFullYear();
    readonly links = TTT_LINKS;

    readonly socialIcons = [
        { href: TTT_LINKS.discord, label: 'Discord', icon: 'pi pi-discord' },
        { href: TTT_SOCIAL_LINKS.youtube, label: 'YouTube', icon: 'pi pi-youtube' },
        { href: TTT_SOCIAL_LINKS.x, label: 'X (Twitter)', icon: 'pi pi-twitter' },
        { href: TTT_SOCIAL_LINKS.mastodon, label: 'Mastodon', icon: 'pi pi-at' },
    ];

    readonly partners = [
        { href: 'https://www.gruppe-w.de/', name: 'Gruppe W' },
        { href: 'https://gruppe-adler.de/', name: 'Gruppe Adler' },
        { href: 'https://prae-garde.de/', name: 'Praetorianische Garde™' },
        { href: 'https://discord.gg/GxH7C4VWhf', name: 'Special Tactical Service' },
    ];
}
