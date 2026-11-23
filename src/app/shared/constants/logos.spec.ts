import { isWinterSeason } from './logos';

describe('isWinterSeason', () => {
    it.each([
        ['2026-11-30T23:59:59', false],
        ['2026-12-01T00:00:00', true],
        ['2026-12-31T23:59:59', true],
        ['2027-01-01T00:00:00', false],
        ['2026-07-15T12:00:00', false],
    ])('should return %s -> %s', (date, expected) => {
        expect(isWinterSeason(new Date(date))).toBe(expected);
    });
});
