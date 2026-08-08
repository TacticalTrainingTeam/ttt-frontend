import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from '@openng/optimus-ui/api';
import { Menubar } from '@openng/optimus-ui/menubar';
import { ButtonDirective } from '@openng/optimus-ui/button';
import { TTT_LINKS } from '../../shared/constants/external-links';

@Component({
    selector: 'ttt-header',
    standalone: true,
    imports: [RouterLink, Menubar, ButtonDirective],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    readonly items: MenuItem[] = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            styleClass: 'font-heading',
            routerLink: ['/'],
        },
        {
            label: 'Events',
            icon: 'pi pi-calendar',
            styleClass: 'font-heading',
            url: TTT_LINKS.events,
            target: '_blank',
            rel: 'noopener noreferrer',
        },
        {
            label: 'Discord',
            icon: 'pi pi-discord',
            styleClass: 'font-heading',
            url: TTT_LINKS.discord,
            target: '_blank',
            rel: 'noopener noreferrer',
        },
        {
            label: 'TeamSpeak',
            icon: 'pi pi-microphone',
            styleClass: 'font-heading',
            url: TTT_LINKS.teamspeak,
        },
        {
            label: 'Wiki',
            icon: 'pi pi-book',
            styleClass: 'font-heading',
            url: TTT_LINKS.wiki,
            target: '_blank',
            rel: 'noopener noreferrer',
        },
        {
            label: 'Medien',
            icon: 'pi pi-images',
            styleClass: 'font-heading',
            routerLink: ['/medien'],
        },
        // Temporaer deaktiviert bis die Member-API live ist
        // {
        //     label: 'Aufstellung',
        //     icon: 'pi pi-sitemap',
        //     styleClass: 'font-heading',
        //     routerLink: ['/aufstellung'],
        // },
        {
            label: 'Über uns',
            icon: 'pi pi-info-circle',
            styleClass: 'font-heading',
            items: [
                {
                    label: 'Chronik',
                    icon: 'pi pi-history',
                    styleClass: 'font-heading',
                    routerLink: ['/chronik'],
                },
                {
                    label: 'Event-Replay',
                    icon: 'pi pi-play',
                    styleClass: 'font-heading',
                    url: TTT_LINKS.replay,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                },
                {
                    label: 'Shop',
                    icon: 'pi pi-shopping-bag',
                    styleClass: 'font-heading',
                    url: TTT_LINKS.shop,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                },
                {
                    label: 'Unit Profile',
                    icon: 'pi pi-book',
                    styleClass: 'font-heading',
                    url: TTT_LINKS.unitProfile,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                },
            ],
        },
    ];
}
