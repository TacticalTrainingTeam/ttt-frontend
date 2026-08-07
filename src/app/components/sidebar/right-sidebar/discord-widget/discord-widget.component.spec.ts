import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { DiscordWidgetComponent } from './discord-widget.component';
import { DiscordWidgetData } from '../../../../shared/types/discord.types';
import { TTT_LINKS } from '../../../../shared/constants/external-links';

const widgetData: DiscordWidgetData = {
    id: '121399943393968128',
    name: 'Tactical Training Team',
    instant_invite: TTT_LINKS.discord,
    presence_count: 12,
    members: Array.from({ length: 10 }, (_, i) => ({
        id: `${i}`,
        username: `Member ${i}`,
        status: 'online' as const,
        avatar_url: `https://cdn.discordapp.com/widget-avatars/${i}`,
    })),
};

describe('DiscordWidgetComponent', () => {
    let component: DiscordWidgetComponent;
    let fixture: ComponentFixture<DiscordWidgetComponent>;
    let httpMock: HttpTestingController;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DiscordWidgetComponent],
            providers: [provideHttpClient(), provideHttpClientTesting()],
        }).compileComponents();

        fixture = TestBed.createComponent(DiscordWidgetComponent);
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

    it('should render presence count and all online members after load', () => {
        httpMock.expectOne((req) => req.url.endsWith('/widget.json')).flush(widgetData);
        fixture.detectChanges();

        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.textContent).toContain('12 online');
        expect(compiled.querySelectorAll('li').length).toBe(widgetData.members.length);
    });

    it('should always render the invite link', () => {
        httpMock.expectOne((req) => req.url.endsWith('/widget.json')).flush(widgetData);
        fixture.detectChanges();

        const link = (fixture.nativeElement as HTMLElement).querySelector(`a[href="${TTT_LINKS.discord}"]`);
        expect(link).toBeTruthy();
        expect(link?.getAttribute('rel')).toContain('noopener');
    });
});
