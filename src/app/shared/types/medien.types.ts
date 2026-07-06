// Types for media/Twitch integration

export interface TwitchStream {
    id: string;
    userName: string;
    title: string;
    viewerCount: number;
    startedAt: string; // ISO date
    thumbnailUrl: string;
    isLive: boolean;
    url: string;
}

export interface MediaPlatformCard {
    id: string;
    name: string;
    url: string;
    description: string;
    displayUrl: string;
    ariaLabel: string;
    iconClass: string;
    cardClass: string;
}

export interface SocialPlatformCard {
    id: string;
    name: string;
    url: string;
    handle: string;
    ariaLabel: string;
    iconClass: string;
    cardClass: string;
}
