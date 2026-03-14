import { CanActivateFn } from '@angular/router';

/**
 * Route guard placeholder.
 *
 * Angular already sanitizes template bindings, and client-side route throttling
 * with web storage is not a reliable security control.
 */
export const securityGuard: CanActivateFn = () => true;
