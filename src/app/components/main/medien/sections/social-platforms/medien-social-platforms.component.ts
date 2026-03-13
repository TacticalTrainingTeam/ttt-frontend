import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SocialPlatformCard } from '../../../../../shared/types/medien.types';

@Component({
    selector: 'ttt-medien-social-platforms',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './medien-social-platforms.component.html',
    styleUrl: './medien-social-platforms.component.css',
})
export class MedienSocialPlatformsComponent {
    @Input({ required: true }) socialPlatforms!: SocialPlatformCard[];
}
