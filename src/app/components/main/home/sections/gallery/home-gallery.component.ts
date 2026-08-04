import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CarouselModule } from '@openng/optimus-ui/carousel';
import { HomeGalleryImage } from '../../../../../shared/types/home.types';

@Component({
    selector: 'ttt-home-gallery',
    standalone: true,
    imports: [CarouselModule],
    templateUrl: './home-gallery.component.html',
    styleUrl: './home-gallery.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeGalleryComponent {
    galleryImages = input.required<HomeGalleryImage[]>();

    readonly responsiveOptions = [
        { breakpoint: '1024px', numVisible: 2, numScroll: 1 },
        { breakpoint: '640px', numVisible: 1, numScroll: 1 },
    ];
}
