import { RankType } from '../types/member.types';
import { RankInfoMap } from '../types/aufstellung.types';

/** Ranks in hierarchy order, highest first */
export const RANK_ORDER: RankType[] = ['offizier', 'unteroffizier', 'veteran', 'soldat', 'rekrut', 'gast'];

const RANK_ICON_BASE_PATH = '/img/aufstellung/ranks/';

/** Single source for rank display metadata (Aufstellung, Kaserne, ...) */
export const RANK_INFO: RankInfoMap = {
    offizier: {
        name: 'Offizier',
        shortName: 'Off.',
        icon: `${RANK_ICON_BASE_PATH}TTT-Icon_Offizier.png`,
        color: 'text-yellow-400',
        priority: 1,
    },
    unteroffizier: {
        name: 'Unteroffizier',
        shortName: 'Uffz.',
        icon: `${RANK_ICON_BASE_PATH}TTT-Icon_Unteroffizier.png`,
        color: 'text-gray-400',
        priority: 2,
    },
    veteran: {
        name: 'Veteran',
        shortName: 'Vet.',
        icon: `${RANK_ICON_BASE_PATH}TTT-Icon_Soldat-Veteran.png`,
        color: 'text-green-400',
        priority: 3,
    },
    soldat: {
        name: 'Soldat',
        shortName: 'Sdt.',
        icon: `${RANK_ICON_BASE_PATH}TTT-Icon_Soldat-Veteran.png`,
        color: 'text-blue-600',
        priority: 4,
    },
    rekrut: {
        name: 'Rekrut',
        shortName: 'Rekr.',
        icon: `${RANK_ICON_BASE_PATH}TTT-Icon_Rekrut.png`,
        color: 'text-blue-300',
        priority: 5,
    },
    gast: {
        name: 'Gast',
        shortName: 'Gast',
        icon: `${RANK_ICON_BASE_PATH}TTT-Icon_Gast.png`,
        color: 'text-gray-300',
        priority: 6,
    },
};
