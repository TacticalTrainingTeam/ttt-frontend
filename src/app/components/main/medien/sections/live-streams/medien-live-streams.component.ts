import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { TwitchStream } from '../../../../../shared/types/medien.types';
import { SectionHeaderComponent } from '../../../../../shared/components/section-header/section-header.component';

@Component({
    selector: 'ttt-medien-live-streams',
    standalone: true,
    imports: [CommonModule, SectionHeaderComponent],
    templateUrl: './medien-live-streams.component.html',
})
export class MedienLiveStreamsComponent {
    @Input({ required: true }) liveStreams$!: Observable<TwitchStream[]>;
}
