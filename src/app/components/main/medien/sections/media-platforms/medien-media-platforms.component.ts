import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MediaPlatformCard } from '../../../../../shared/types/medien.types';

@Component({
    selector: 'ttt-medien-media-platforms',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './medien-media-platforms.component.html',
    styleUrl: './medien-media-platforms.component.css',
})
export class MedienMediaPlatformsComponent {
    @Input({ required: true }) mediaPlatforms!: MediaPlatformCard[];
}
