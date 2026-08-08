import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideOptimus } from '@openng/optimus-ui/config';
import { tttOptimusTheme } from './themes.config';
import { securityInterceptor } from './core/interceptors/security.interceptor';
import { provideMatomo, withRouter } from 'ngx-matomo-client';
import { environment } from '../environments/environment';

/**
 * Application configuration
 *
 * CSP: Content Security Policy should be configured via server headers (nginx/Apache).
 * Angular supports CSP nonces via CSP_NONCE injection token for SSR.
 */
export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes, withComponentInputBinding(), withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
        provideOptimus({
            theme: tttOptimusTheme,
        }),
        provideHttpClient(withInterceptors([securityInterceptor])),
        provideMatomo({ trackerUrl: 'https://analytics.tacticalteam.de', siteId: '4', disabled: !environment.production }, withRouter()),
    ],
};
