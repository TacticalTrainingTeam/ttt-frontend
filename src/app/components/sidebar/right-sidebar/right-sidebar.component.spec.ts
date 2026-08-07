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

    it('should display the Discord section', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('aside')).toBeTruthy();
        expect(compiled.textContent).toContain('Live Discord');
    });

    it('should embed the custom Discord widget', () => {
        httpMock
            .expectOne((req) => req.url.endsWith('/widget.json'))
            .flush({ id: '1', name: 'TTT', instant_invite: null, presence_count: 0, members: [] });

        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('ttt-discord-widget')).toBeTruthy();
        expect(compiled.querySelector('iframe')).toBeNull();
    });
});
