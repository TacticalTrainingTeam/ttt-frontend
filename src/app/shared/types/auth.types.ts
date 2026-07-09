/** Roles provided by the backend via OIDC claims */
export type UserRole = 'MEMBER' | 'PERSONAL' | 'OFFIZIER' | 'ADMIN';

/** Authenticated user as returned by GET /api/v1/auth/me */
export interface AuthUser {
    id: string;
    name: string;
    avatar: string;
    discordId: string;
    roles: UserRole[];
}
