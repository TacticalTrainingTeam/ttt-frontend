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
        component.bannerSlides = [
            { image: '/img/home-banner/home-banner1.webp', title: 'Title', titleText: 'Title', subtitle: 'Subtitle' },
            { image: '/img/home-banner/home-banner2.webp', title: 'Title2', titleText: 'Title2', subtitle: 'Subtitle2' },
        ];
        component.currentImageIndex = 0;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
