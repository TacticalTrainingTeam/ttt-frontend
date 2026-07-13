import { Member } from './member.types';

/** Linked gaming platform accounts; discordId is managed via OIDC login and read-only */
export interface PlatformIds {
    steamId: string;
    xboxId: string;
    playstationId: string;
    armaIngameName: string;
    discordId: string;
}

export type UserProfile = Member & { platformIds: PlatformIds };
