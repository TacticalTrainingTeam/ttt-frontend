import { Member as BackendMember, RankType } from './member.types';

export interface RankInfo {
    name: string;
    shortName: string;
    icon: string;
    color: string;
    priority: number;
}

export interface AufstellungSections {
    OVERVIEW: {
        TITLE: string;
        SUBTITLE: string;
    };
    ROSTER: {
        TITLE: string;
        SUBTITLE: string;
    };
}

export interface AufstellungLoadingMessages {
    LOADING: string;
    ERROR_TITLE: string;
    RETRY_TEXT: string;
    RETRY_ARIA: string;
}

export type Member = BackendMember & { isExpanded?: boolean };

export interface MembersByRank {
    [key: string]: Member[];
    offizier: Member[];
    unteroffizier: Member[];
    veteran: Member[];
    soldat: Member[];
    rekrut: Member[];
    gast: Member[];
}

export interface MemberStats {
    [key: string]: number;
    offizier: number;
    unteroffizier: number;
    veteran: number;
    soldat: number;
    rekrut: number;
    gast: number;
}

export type RankInfoMap = Record<RankType, RankInfo>;
