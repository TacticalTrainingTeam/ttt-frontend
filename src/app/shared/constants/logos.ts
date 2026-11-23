export const TTT_LOGOS = {
    default: '/img/logos/logo.webp',
    winter: '/img/logos/logo-winter.webp',
} as const;

/**
 * Winter logo season: December 1st to December 31st.
 */
export function isWinterSeason(date: Date = new Date()): boolean {
    return date.getMonth() === 11;
}
