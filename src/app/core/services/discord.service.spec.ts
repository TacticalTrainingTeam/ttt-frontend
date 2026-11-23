import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { DiscordService } from './discord.service';

describe('DiscordService', () => {
    const setup = (platformId: 'browser' | 'server') => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting(), { provide: PLATFORM_ID, useValue: platformId }],
        });
        return { service: TestBed.inject(DiscordService), httpMock: TestBed.inject(HttpTestingController) };
    };

    it('should request the widget in the browser', () => {
        const { service, httpMock } = setup('browser');

        service.getWidgetData().subscribe();

        httpMock.expectOne((req) => req.url.endsWith('/widget.json'));
    });

    it('should skip the request on the server', async () => {
        const { service, httpMock } = setup('server');

        await expect(firstValueFrom(service.getWidgetData())).resolves.toBeNull();
        httpMock.expectNone(() => true);
        httpMock.verify();
    });
});
