/**
 * Permissions the UI acts on. The backend maps Authentik groups/roles
 * (Personal, Offizier, Admin, ...) to these - the frontend never sees role names.
 */
export type Permission = 'MANAGE_MEMBERS' | 'MANAGE_CATALOG';

/** Authenticated user as returned by GET /api/v1/auth/me */
export interface AuthUser {
    id: string;
    name: string;
    avatar: string;
    discordId: string;
    permissions: Permission[];
}
