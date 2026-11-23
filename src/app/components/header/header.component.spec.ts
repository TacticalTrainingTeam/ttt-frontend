import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeaderComponent } from './header.component';
import { TTT_LOGOS } from '../../shared/constants/logos';

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    enumerable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    const render = async (now: string) => {
        vi.useFakeTimers({ toFake: ['Date'] });
        vi.setSystemTime(new Date(now));

        await TestBed.configureTestingModule({
            imports: [HeaderComponent],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    };

    const logoSrc = () => (fixture.nativeElement as HTMLElement).querySelector('img')?.getAttribute('src');

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should create', async () => {
        await render('2026-07-15T12:00:00');
        expect(component).toBeTruthy();
    });

    it('should show the default logo outside December', async () => {
        await render('2026-11-30T12:00:00');
        expect(logoSrc()).toBe(TTT_LOGOS.default);
    });

    it('should show the winter logo in December', async () => {
        await render('2026-12-01T12:00:00');
        expect(logoSrc()).toBe(TTT_LOGOS.winter);
    });
});
