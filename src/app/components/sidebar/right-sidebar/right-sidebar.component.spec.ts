import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { RightSidebarComponent } from './right-sidebar.component';

describe('RightSidebarComponent', () => {
    let component: RightSidebarComponent;
    let fixture: ComponentFixture<RightSidebarComponent>;
    let httpMock: HttpTestingController;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RightSidebarComponent],
            providers: [provideHttpClient(), provideHttpClientTesting()],
        }).compileComponents();

        fixture = TestBed.createComponent(RightSidebarComponent);
        component = fixture.componentInstance;
        httpMock = TestBed.inject(HttpTestingController);
        fixture.detectChanges();
    });

    afterEach(() => {
        httpMock.match(() => true);
        httpMock.verify();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the Discord and TeamSpeak sections', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('aside')).toBeTruthy();
        expect(compiled.textContent).toContain('Live Discord');
        expect(compiled.textContent).toContain('Live TeamSpeak');
    });

    it('should embed the custom Discord widget instead of an iframe', () => {
        httpMock
            .expectOne((req) => req.url.endsWith('/widget.json'))
            .flush({ id: '1', name: 'TTT', instant_invite: null, presence_count: 0, members: [] });

        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('ttt-discord-widget')).toBeTruthy();
    });

    it('should embed the TeamSpeak status viewer as an iframe with a connect fallback', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const iframe = compiled.querySelector('iframe');

        expect(iframe).toBeTruthy();
        expect(iframe?.getAttribute('title')).toBe('TTT TeamSpeak Server');
        expect(compiled.querySelector('a[href^="ts3server://"]')).toBeTruthy();
    });
});
