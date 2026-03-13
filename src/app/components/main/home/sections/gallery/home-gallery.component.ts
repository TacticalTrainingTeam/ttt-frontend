import { Component, Input } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { HomeGalleryImage } from '../../../../../shared/types/home.types';

@Component({
    selector: 'ttt-home-gallery',
    standalone: true,
    imports: [GalleriaModule],
    templateUrl: './home-gallery.component.html',
    styleUrl: './home-gallery.component.css',
})
export class HomeGalleryComponent {
    @Input({ required: true }) galleryImages: HomeGalleryImage[] = [];
}
