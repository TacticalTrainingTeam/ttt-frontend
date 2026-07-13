import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Avatar } from 'primeng/avatar';
import { Menu } from 'primeng/menu';
import { Menubar } from 'primeng/menubar';
import { ButtonDirective } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { AuthService } from '../../core/services/auth.service';
import { TTT_LINKS } from '../../shared/constants/external-links';

@Component({
    selector: 'ttt-header',
    standalone: true,
    imports: [RouterLink, Avatar, Menu, Menubar, ButtonDirective, Tooltip],
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    readonly auth = inject(AuthService);

    readonly userMenuItems: MenuItem[] = [
        {
            label: 'Kaserne',
            icon: 'pi pi-building',
            styleClass: 'font-heading',
            routerLink: ['/intern'],
        },
        {
            label: 'Abmelden',
            icon: 'pi pi-sign-out',
            styleClass: 'font-heading',
            command: () => this.auth.logout(),
        },
    ];

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
            label: 'TS3',
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
            label: 'Aufstellung',
            icon: 'pi pi-sitemap',
            styleClass: 'font-heading',
            routerLink: ['/aufstellung'],
        },
        {
            label: 'Über uns',
            icon: 'pi pi-info-circle',
            styleClass: 'font-heading',
            items: [
                {
                    label: 'Medien',
                    icon: 'pi pi-images',
                    styleClass: 'font-heading',
                    routerLink: ['/medien'],
                },
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
            ],
        },
    ];
}
