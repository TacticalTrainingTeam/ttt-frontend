import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SocialPlatformCard } from '../../../../../shared/types/medien.types';
import { SectionHeaderComponent } from '../../../../../shared/components/section-header/section-header.component';

@Component({
    selector: 'ttt-medien-social-platforms',
    standalone: true,
    imports: [CommonModule, SectionHeaderComponent],
    templateUrl: './medien-social-platforms.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedienSocialPlatformsComponent {
    socialPlatforms = input.required<SocialPlatformCard[]>();
}
