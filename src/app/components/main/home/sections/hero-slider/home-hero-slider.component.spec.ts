import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeHeroSliderComponent } from './home-hero-slider.component';

describe('HomeHeroSliderComponent', () => {
    let component: HomeHeroSliderComponent;
    let fixture: ComponentFixture<HomeHeroSliderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HomeHeroSliderComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(HomeHeroSliderComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('bannerSlides', [
            { image: '/img/home-banner/home-banner1.webp', title: 'Title', titleAccent: 'Accent', subtitle: 'Subtitle' },
            { image: '/img/home-banner/home-banner2.webp', title: 'Title2', titleAccent: 'Accent2', subtitle: 'Subtitle2' },
        ]);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render title, accent and subtitle of the active slide', () => {
        const heading: HTMLElement | null = fixture.nativeElement.querySelector('h2.ttt-hero-title');
        expect(heading?.textContent).toContain('Title');
        expect(heading?.querySelector('span.ttt-hero-accent')?.textContent).toContain('Accent');
        expect(fixture.nativeElement.textContent).toContain('Subtitle');
    });

    it('should render a single sr-only h1 with the site heading', () => {
        const headings: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('h1');
        expect(headings).toHaveLength(1);
        expect(headings[0].textContent).toContain('Tactical Training Team');
    });
});
