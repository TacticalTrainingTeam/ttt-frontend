import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';

@Component({
    selector: 'ttt-datenschutz',
    standalone: true,
    imports: [RouterModule, PageLayoutComponent],
    templateUrl: './datenschutz.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatenschutzComponent {
    readonly pageTitle = 'Datenschutzerklärung';

    readonly externalLinks = {
        slotbot: {
            url: 'https://docs.slotbot.de/policies/datenschutzerkl%C3%A4rung',
            label: 'slotbot.de',
        },
        mailchimp: {
            url: 'https://mailchimp.com/legal/privacy/',
            label: 'https://mailchimp.com/legal/privacy/',
        },
        hetzner: {
            url: 'https://www.hetzner.com/de/legal/privacy-policy/',
            label: 'https://www.hetzner.com/de/legal/privacy-policy/',
        },
        cloudflare: {
            url: 'https://www.cloudflare.com/privacypolicy/',
            label: 'https://www.cloudflare.com/privacypolicy/',
        },
        discord: {
            url: 'https://discord.com/privacy',
            label: 'https://discord.com/privacy',
        },
        bunny: {
            url: 'https://bunny.net/privacy/',
            label: 'https://bunny.net/privacy/',
        },
        twitch: {
            url: 'https://www.twitch.tv/p/de-de/legal/privacy-notice/',
            label: 'https://www.twitch.tv/p/de-de/legal/privacy-notice/',
        },
    } as const;
}
