import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';
import { MediaPlatformCard, SocialPlatformCard, TwitchStream } from '../../../shared/types/medien.types';
// Temporaer deaktiviert bis die Twitch-API live ist
// import { inject } from '@angular/core';
// import { MedienService } from '../../../core/services/medien.service';
import { TTT_LINKS, TTT_SOCIAL_LINKS } from '../../../shared/constants/external-links';
import { MedienChannelsComponent } from './sections/channels/medien-channels.component';
import { MedienSocialPlatformsComponent } from './sections/social-platforms/medien-social-platforms.component';
import { MedienCorporateCtaComponent } from './sections/corporate-cta/medien-corporate-cta.component';

@Component({
    selector: 'ttt-medien',
    standalone: true,
    imports: [CommonModule, PageLayoutComponent, MedienChannelsComponent, MedienSocialPlatformsComponent, MedienCorporateCtaComponent],
    templateUrl: './medien.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedienComponent {
    // Temporaer deaktiviert bis die Twitch-API live ist
    // private readonly medienService = inject(MedienService);

    readonly pageTitle = 'Medien';
    readonly pageSubtitle = 'Streams, Videos und Community-Kanäle des Tactical Training Teams';
    // Temporaer deaktiviert bis die Twitch-API live ist - zeigt solange den Leerzustand
    // readonly liveStreams$ = this.medienService.getTwitchStreams();
    readonly liveStreams$: Observable<TwitchStream[]> = of([]);

    readonly socialLinks = TTT_SOCIAL_LINKS;
    readonly corporateDesignWikiUrl = TTT_LINKS.wikiCorporateDesign;

    readonly mediaPlatforms: MediaPlatformCard[] = [
        {
            id: 'youtube',
            name: 'YouTube',
            url: this.socialLinks.youtube,
            description: 'Offizielle Videos, Mission-Highlights und Community-Content',
            displayUrl: 'youtube.com/@tacticalteamde',
            ariaLabel: 'YouTube Kanal öffnen',
            iconClass: 'pi pi-youtube text-2xl text-red-400',
            cardClass: 'ttt-card-interactive',
        },
        {
            id: 'twitch',
            name: 'Twitch',
            url: this.socialLinks.twitch,
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
            url: this.socialLinks.x,
            handle: '@TTT_ArmA',
            ariaLabel: 'Social Media öffnen: X (Twitter)',
            iconClass: 'pi pi-twitter text-xl text-blue-400',
            cardClass: 'ttt-card-interactive',
        },
        {
            id: 'mastodon',
            name: 'Mastodon',
            url: this.socialLinks.mastodon,
            handle: '@tacticaltrainingteam',
            ariaLabel: 'Social Media öffnen: Mastodon',
            iconClass: 'pi pi-share-alt text-xl text-purple-400',
            cardClass: 'ttt-card-interactive',
        },
        {
            id: 'bluesky',
            name: 'Bluesky',
            url: this.socialLinks.bluesky,
            handle: 'tacticalteam.bsky.social',
            ariaLabel: 'Social Media öffnen: Bluesky',
            iconClass: 'pi pi-cloud text-xl text-blue-500',
            cardClass: 'ttt-card-interactive',
        },
        {
            id: 'instagram',
            name: 'Instagram',
            url: this.socialLinks.instagram,
            handle: 'tacticaltrainingteam',
            ariaLabel: 'Social Media öffnen: Instagram',
            iconClass: 'pi pi-camera text-xl text-pink-400',
            cardClass: 'ttt-card-interactive',
        },
        {
            id: 'tiktok',
            name: 'TikTok',
            url: this.socialLinks.tiktok,
            handle: '@tacticaltrainingteam',
            ariaLabel: 'Social Media öffnen: TikTok',
            iconClass: 'pi pi-play text-xl text-tttWhite',
            cardClass: 'ttt-card-interactive',
        },
        {
            id: 'steam',
            name: 'Steam',
            url: this.socialLinks.steam,
            handle: 'Community-Gruppe',
            ariaLabel: 'Steam Gruppe öffnen',
            iconClass: 'pi pi-users text-xl text-blue-400',
            cardClass: 'ttt-card-interactive',
        },
        {
            id: 'reddit',
            name: 'Reddit',
            url: this.socialLinks.reddit,
            handle: 'u/tacticaltrainingteam',
            ariaLabel: 'Reddit Subreddit öffnen',
            iconClass: 'pi pi-reddit text-xl text-orange-500',
            cardClass: 'ttt-card-interactive',
        },
        {
            id: 'github',
            name: 'GitHub',
            url: this.socialLinks.github,
            handle: 'TacticalTrainingTeam',
            ariaLabel: 'GitHub Repository öffnen',
            iconClass: 'pi pi-github text-xl text-gray-400',
            cardClass: 'ttt-card-interactive',
        },
    ];
}
