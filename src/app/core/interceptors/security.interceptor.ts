import { HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';

/**
 * Blocks insecure HTTP requests in HTTPS context.
 */
export const securityInterceptor: HttpInterceptorFn = (req, next) => {
    const isHttpsContext = globalThis.location?.protocol === 'https:';

    if (req.url.startsWith('http://') && isHttpsContext) {
        console.warn('Blocking insecure HTTP request in HTTPS context:', req.url);
        return throwError(() => new Error('Insecure HTTP request blocked'));
    }

    return next(req);
};
