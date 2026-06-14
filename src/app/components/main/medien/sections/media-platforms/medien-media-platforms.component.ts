import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MediaPlatformCard } from '../../../../../shared/types/medien.types';
import { SectionHeaderComponent } from '../../../../../shared/components/section-header/section-header.component';
import { ExternalLinkTileComponent } from '../../../../../shared/components/external-link-tile/external-link-tile.component';

@Component({
    selector: 'ttt-medien-media-platforms',
    standalone: true,
    imports: [CommonModule, SectionHeaderComponent, ExternalLinkTileComponent],
    templateUrl: './medien-media-platforms.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedienMediaPlatformsComponent {
    mediaPlatforms = input.required<MediaPlatformCard[]>();
}
