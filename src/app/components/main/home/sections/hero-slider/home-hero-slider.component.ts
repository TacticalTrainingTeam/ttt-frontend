import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { HomeBannerSlide } from '../../../../../shared/types/home.types';

@Component({
    selector: 'ttt-home-hero-slider',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './home-hero-slider.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeHeroSliderComponent {
    bannerSlides = input.required<HomeBannerSlide[]>();
    currentImageIndex = input.required<number>();
    readonly imageSelected = output<number>();

    readonly currentSlide = computed<HomeBannerSlide | undefined>(
        () => this.bannerSlides()[this.currentImageIndex()] ?? this.bannerSlides()[0]
    );

    selectImage(index: number): void {
        this.imageSelected.emit(index);
    }
}
