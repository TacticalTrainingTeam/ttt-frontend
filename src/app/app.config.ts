import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // NOSONAR typescript:S1874 - required by PrimeNG, see https://github.com/primefaces/primeng/issues/18863
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
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes, withComponentInputBinding(), withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
        // PrimeNG overlays (dialog, tooltip, menubar) still require the deprecated animations
        // provider; removal is blocked until PrimeNG supports the new animate.enter/leave APIs.
        // See: https://github.com/primefaces/primeng/issues/18863
        provideAnimationsAsync(), // NOSONAR typescript:S1874
        providePrimeNG({
            theme: tttPrimeNgTheme,
        }),
        provideHttpClient(withInterceptors([securityInterceptor])),
    ],
};
