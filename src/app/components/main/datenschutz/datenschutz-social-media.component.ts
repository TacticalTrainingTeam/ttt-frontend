import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';

@Component({
    selector: 'ttt-datenschutz-social-media',
    standalone: true,
    imports: [CommonModule, RouterModule, PageLayoutComponent],
    templateUrl: './datenschutz-social-media.component.html',
    styleUrl: './datenschutz-social-media.component.css',
})
export class DatenschutzSocialMediaComponent {
    readonly pageTitle = 'Datenschutzerklärung für Social Media';

    readonly externalLinks = {
        google: {
            url: 'https://policies.google.com/privacy',
            label: 'https://policies.google.com/privacy',
        },
        twitch: {
            url: 'https://www.twitch.tv/p/de-de/legal/privacy-notice/',
            label: 'https://www.twitch.tv/p/de-de/legal/privacy-notice/',
        },
        kick: {
            url: 'https://kick.com/privacy',
            label: 'https://kick.com/privacy',
        },
        trovo: {
            url: 'https://www.trovo.live/privacy-policy',
            label: 'https://www.trovo.live/privacy-policy',
        },
        twitter: {
            url: 'https://twitter.com/privacy',
            label: 'https://twitter.com/privacy',
        },
        meta: {
            url: 'https://www.instagram.com/about/legal/privacy/',
            label: 'https://www.instagram.com/about/legal/privacy/',
        },
        tiktok: {
            url: 'https://www.tiktok.com/legal/page/eea/privacy-policy',
            label: 'https://www.tiktok.com/legal/page/eea/privacy-policy',
        },
        reddit: {
            url: 'https://www.reddit.com/privacy-policy',
            label: 'https://www.reddit.com/privacy-policy',
        },
        bluesky: {
            url: 'https://bsky.social/about/privacy',
            label: 'https://bsky.social/about/privacy',
        },
        mastodon: {
            url: 'https://docs.joinmastodon.org/user/privacy/',
            label: 'https://docs.joinmastodon.org/user/privacy/',
        },
    } as const;
}
