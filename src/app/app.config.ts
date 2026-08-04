import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { tttPrimeNgTheme } from './themes.config';
import { securityInterceptor } from './core/interceptors/security.interceptor';

/**
 * Application configuration
 *
 * CSP: Content Security Policy should be configured via server headers (nginx/Apache).
 * Angular supports CSP nonces via CSP_NONCE injection token for SSR.
 */
export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes, withComponentInputBinding(), withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
        providePrimeNG({
            theme: tttPrimeNgTheme,
        }),
        provideHttpClient(withInterceptors([securityInterceptor])),
    ],
};
