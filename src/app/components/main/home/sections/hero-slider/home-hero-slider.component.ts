import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GalleriaModule } from '@openng/optimus-ui/galleria';
import { HomeBannerSlide } from '../../../../../shared/types/home.types';

@Component({
    selector: 'ttt-home-hero-slider',
    standalone: true,
    imports: [GalleriaModule],
    templateUrl: './home-hero-slider.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeHeroSliderComponent {
    bannerSlides = input.required<HomeBannerSlide[]>();
}
