import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HomeBannerSlide } from '../../../../../shared/types/home.types';

@Component({
    selector: 'ttt-home-hero-slider',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './home-hero-slider.component.html',
})
export class HomeHeroSliderComponent {
    @Input({ required: true }) bannerSlides: HomeBannerSlide[] = [];
    @Input({ required: true }) currentImageIndex = 0;
    @Output() readonly imageSelected = new EventEmitter<number>();

    get currentSlide(): HomeBannerSlide | undefined {
        return this.bannerSlides[this.currentImageIndex] ?? this.bannerSlides[0];
    }

    selectImage(index: number): void {
        this.imageSelected.emit(index);
    }
}
