import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/** Blocks the intern area for anonymous visitors */
export const authGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    return auth.isAuthenticated() ? true : router.createUrlTree(['/']);
};

/** Restricts member management to Personal, Offiziere and Admins */
export const memberAdminGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    return auth.canManageMembers() ? true : router.createUrlTree(['/intern']);
};
