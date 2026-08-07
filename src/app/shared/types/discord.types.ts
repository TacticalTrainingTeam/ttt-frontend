export type DiscordMemberStatus = 'online' | 'idle' | 'dnd';

export interface DiscordWidgetMember {
    id: string;
    username: string;
    status: DiscordMemberStatus;
    avatar_url: string;
}

export interface DiscordWidgetData {
    id: string;
    name: string;
    instant_invite: string | null;
    presence_count: number;
    members: DiscordWidgetMember[];
}
