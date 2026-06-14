import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeGalleryComponent } from './home-gallery.component';

describe('HomeGalleryComponent', () => {
    let component: HomeGalleryComponent;
    let fixture: ComponentFixture<HomeGalleryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HomeGalleryComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(HomeGalleryComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('galleryImages', [
            { itemImageSrc: '/img/home-gallery/gallery-img1.webp', alt: 'Image 1' },
            { itemImageSrc: '/img/home-gallery/gallery-img2.webp', alt: 'Image 2' },
        ]);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
