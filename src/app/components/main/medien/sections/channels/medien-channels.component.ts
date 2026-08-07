import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaPlatformCard, TwitchStream } from '../../../../../shared/types/medien.types';
import { SectionHeaderComponent } from '../../../../../shared/components/section-header/section-header.component';
import { ExternalLinkTileComponent } from '../../../../../shared/components/external-link-tile/external-link-tile.component';

@Component({
    selector: 'ttt-medien-channels',
    standalone: true,
    imports: [AsyncPipe, SectionHeaderComponent, ExternalLinkTileComponent],
    templateUrl: './medien-channels.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedienChannelsComponent {
    mediaPlatforms = input.required<MediaPlatformCard[]>();
    liveStreams$ = input.required<Observable<TwitchStream[]>>();
}
