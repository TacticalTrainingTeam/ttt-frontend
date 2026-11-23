import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors, withXhr } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { TitleStrategy, provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { SeoTitleStrategy } from './core/strategies/seo-title.strategy';
import { provideOptimus } from '@openng/optimus-ui/config';
import { tttOptimusTheme } from './themes.config';
import { securityInterceptor } from './core/interceptors/security.interceptor';
import { provideMatomo, withRouter } from 'ngx-matomo-client';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes, withComponentInputBinding(), withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
        { provide: TitleStrategy, useClass: SeoTitleStrategy },
        provideClientHydration(withEventReplay()),
        provideOptimus({
            theme: tttOptimusTheme,
        }),
        provideHttpClient(withXhr(), withInterceptors([securityInterceptor])),
        provideMatomo({ trackerUrl: 'https://analytics.tacticalteam.de', siteId: '4', disabled: !environment.production }, withRouter()),
    ],
};
