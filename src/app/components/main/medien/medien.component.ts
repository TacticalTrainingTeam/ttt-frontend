import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';
import { MediaPlatformCard, SocialPlatformCard } from '../../../shared/types/medien.types';
import { MedienService } from '../../../core/services/medien.service';
import { MedienLiveStreamsComponent } from './sections/live-streams/medien-live-streams.component';
import { MedienMediaPlatformsComponent } from './sections/media-platforms/medien-media-platforms.component';
import { MedienSocialPlatformsComponent } from './sections/social-platforms/medien-social-platforms.component';
import { MedienCorporateCtaComponent } from './sections/corporate-cta/medien-corporate-cta.component';

@Component({
    selector: 'ttt-medien',
    standalone: true,
    imports: [
        CommonModule,
        PageLayoutComponent,
        MedienLiveStreamsComponent,
        MedienMediaPlatformsComponent,
        MedienSocialPlatformsComponent,
        MedienCorporateCtaComponent,
    ],
    templateUrl: './medien.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedienComponent {
    private readonly medienService = inject(MedienService);

    readonly pageTitle = 'Medien';
    readonly pageSubtitle = 'Streams, Videos und Community-Kanäle des Tactical Training Teams';
    readonly liveStreams$ = this.medienService.getTwitchStreams();

    readonly externalLinks = {
        youtube: 'https://www.youtube.com/@tacticalteamde',
        twitch: 'https://www.twitch.tv/tacticaltrainingteam',
        x: 'https://x.com/TTT_ArmA',
        mastodon: 'https://mastodon.social/@tacticaltrainingteam',
        bluesky: 'https://bsky.app/profile/tacticalteam.bsky.social',
        instagram: 'https://www.instagram.com/tacticaltrainingteam/',
        tiktok: 'https://www.tiktok.com/@tacticaltrainingteam',
        steam: 'https://steamcommunity.com/groups/tacticaltrainingteam',
        reddit: 'https://www.reddit.com/user/tacticaltrainingteam/',
        github: 'https://github.com/orgs/TacticalTrainingTeam/',
        wiki: 'https://wiki.tacticalteam.de/de/TTT-PR/Corporate-Identity',
        files: 'https://files.tacticalteam.de/s/36FWSHsGNwaXLHg',
    } as const;

    readonly mediaPlatforms: MediaPlatformCard[] = [
        {
            id: 'youtube',
            name: 'YouTube',
            url: this.externalLinks.youtube,
            description: 'Offizielle Videos, Mission-Highlights und Community-Content',
            displayUrl: 'youtube.com/@tacticalteamde',
            ariaLabel: 'YouTube Kanal öffnen',
            iconClass: 'pi pi-youtube text-2xl text-red-400',
            cardClass: 'ttt-card-interactive',
        },
        {
            id: 'twitch',
            name: 'Twitch',
            url: this.externalLinks.twitch,
            description: 'Live-Streams, Events und Community-Interaktionen',
            displayUrl: 'twitch.tv/tacticaltrainingteam',
            ariaLabel: 'Twitch Kanal öffnen',
            iconClass: 'pi pi-video text-2xl text-purple-400',
            cardClass: 'ttt-card-interactive',
        },
    ];

    readonly socialPlatforms: SocialPlatformCard[] = [
        {
            id: 'x',
            name: 'X (Twitter)',
            url: this.externalLinks.x,
            handle: '@TTT_ArmA',
            ariaLabel: 'Social Media öffnen: X (Twitter)',
            iconClass: 'pi pi-twitter text-xl text-blue-400',
            cardClass: 'ttt-card-interactive',
        },
        {
            id: 'mastodon',
            name: 'Mastodon',
            url: this.externalLinks.mastodon,
            handle: '@tacticaltrainingteam',
            ariaLabel: 'Social Media öffnen: Mastodon',
            iconClass: 'pi pi-share-alt text-xl text-purple-400',
            cardClass: 'ttt-card-interactive',
        },
        {
            id: 'bluesky',
            name: 'Bluesky',
            url: this.externalLinks.bluesky,
            handle: 'tacticalteam.bsky.social',
            ariaLabel: 'Social Media öffnen: Bluesky',
            iconClass: 'pi pi-cloud text-xl text-blue-500',
            cardClass: 'ttt-card-interactive',
        },
        {
            id: 'instagram',
            name: 'Instagram',
            url: this.externalLinks.instagram,
            handle: 'tacticaltrainingteam',
            ariaLabel: 'Social Media öffnen: Instagram',
            iconClass: 'pi pi-camera text-xl text-pink-400',
            cardClass: 'ttt-card-interactive',
        },
        {
            id: 'tiktok',
            name: 'TikTok',
            url: this.externalLinks.tiktok,
            handle: '@tacticaltrainingteam',
            ariaLabel: 'Social Media öffnen: TikTok',
            iconClass: 'pi pi-play text-xl text-tttWhite',
            cardClass: 'ttt-card-interactive',
        },
        {
            id: 'steam',
            name: 'Steam',
            url: this.externalLinks.steam,
            handle: 'Community-Gruppe',
            ariaLabel: 'Steam Gruppe öffnen',
            iconClass: 'pi pi-users text-xl text-blue-400',
            cardClass: 'ttt-card-interactive',
        },
        {
            id: 'reddit',
            name: 'Reddit',
            url: this.externalLinks.reddit,
            handle: 'u/tacticaltrainingteam',
            ariaLabel: 'Reddit Subreddit öffnen',
            iconClass: 'pi pi-reddit text-xl text-orange-500',
            cardClass: 'ttt-card-interactive',
        },
        {
            id: 'github',
            name: 'GitHub',
            url: this.externalLinks.github,
            handle: 'TacticalTrainingTeam',
            ariaLabel: 'GitHub Repository öffnen',
            iconClass: 'pi pi-github text-xl text-gray-400',
            cardClass: 'ttt-card-interactive',
        },
    ];
}
