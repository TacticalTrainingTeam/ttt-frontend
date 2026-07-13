import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/** Blocks the intern area for anonymous visitors */
export const authGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    return auth.isAuthenticated() ? true : router.createUrlTree(['/']);
};

/** Restricts member management to users with the MANAGE_MEMBERS permission */
export const memberAdminGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    return auth.canManageMembers() ? true : router.createUrlTree(['/intern']);
};

/** Restricts catalog administration to users with the MANAGE_CATALOG permission */
export const catalogAdminGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    return auth.canManageCatalog() ? true : router.createUrlTree(['/intern']);
};
