// Central types for the TTT frontend

export type RankType = 'offizier' | 'unteroffizier' | 'veteran' | 'soldat' | 'rekrut' | 'gast';

export interface Member {
    id: string;
    name: string;
    rank: RankType;
    avatar: string;
    memberSince: string;
    medals: Medal[];
    campaignRibbons: CampaignRibbon[];
    abteilungen: Abteilung[];
}

export interface Medal {
    id: string;
    name: string;
    image: string;
    description: string;
    /** false for hanging medals, which are not worn on the ribbon bar */
    isRibbon?: boolean;
}

export interface CampaignRibbon {
    id: string;
    name: string;
    image: string;
    campaign: string;
    quarter: string;
    year: string;
}

export interface Abteilung {
    id: string;
    name: string;
    icon: string;
    description: string;
}

export interface MemberResponse {
    members: Member[];
    total: number;
    lastUpdated: string;
}

export interface MemberStatsResponse {
    stats: Record<RankType, number>;
    totalMembers: number;
    activeMembers: number;
}
