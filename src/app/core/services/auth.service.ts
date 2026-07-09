import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { ApiService } from './api.service';
import { AuthUser } from '../../shared/types/auth.types';
import { environment } from '../../../environments/environment';

/** sessionStorage key that keeps the dev login across reloads */
const DEV_LOGIN_STORAGE_KEY = 'ttt-dev-login';

/** Dev login user while the backend is not available */
const DEV_AUTH_USER: AuthUser = {
    id: 'member-1',
    name: 'Menom',
    avatar: '/img/aufstellung/offizier-kopf.webp',
    discordId: 'menom#0001',
    permissions: ['MANAGE_MEMBERS', 'MANAGE_CATALOG'],
};

/**
 * Session state for the OIDC login (Spring Security, session cookie based).
 * With environment.useDummyFallback enabled, login() performs a local dev login
 * instead of redirecting to the backend.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly api = inject(ApiService);
    private readonly router = inject(Router);

    private readonly currentUserSignal = signal<AuthUser | null>(null);

    readonly currentUser = this.currentUserSignal.asReadonly();
    readonly isAuthenticated = computed(() => this.currentUserSignal() !== null);
    readonly canManageMembers = computed(() => this.currentUserSignal()?.permissions.includes('MANAGE_MEMBERS') ?? false);
    readonly canManageCatalog = computed(() => this.currentUserSignal()?.permissions.includes('MANAGE_CATALOG') ?? false);

    constructor() {
        this.restoreSession();
    }

    login(): void {
        if (environment.useDummyFallback) {
            sessionStorage.setItem(DEV_LOGIN_STORAGE_KEY, '1');
            this.currentUserSignal.set(DEV_AUTH_USER);
            void this.router.navigate(['/intern']);
            return;
        }
        // Spring Security OIDC entry point (login chain: Discord -> Authentik -> website);
        // the backend must redirect back to /intern after a successful login
        globalThis.location.assign('/oauth2/authorization/authentik');
    }

    logout(): void {
        if (environment.useDummyFallback) {
            sessionStorage.removeItem(DEV_LOGIN_STORAGE_KEY);
            this.currentUserSignal.set(null);
            void this.router.navigate(['/']);
            return;
        }
        // Spring Security logout endpoint invalidates the session cookie; the backend must redirect to /
        globalThis.location.assign('/logout');
    }

    /** Restores the session on app start (dev login or backend session cookie) */
    private restoreSession(): void {
        if (environment.useDummyFallback) {
            if (sessionStorage.getItem(DEV_LOGIN_STORAGE_KEY) === '1') {
                this.currentUserSignal.set(DEV_AUTH_USER);
            }
            return;
        }
        this.api
            .get<AuthUser>(`${environment.apiBaseUrl}/auth/me`)
            .pipe(catchError(() => of(null)))
            .subscribe((user) => this.currentUserSignal.set(user));
    }
}
