import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { TwitchStream } from '../../../../../shared/types/medien.types';

@Component({
    selector: 'ttt-medien-live-streams',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './medien-live-streams.component.html',
    styleUrl: './medien-live-streams.component.css',
})
export class MedienLiveStreamsComponent {
    @Input({ required: true }) liveStreams$!: Observable<TwitchStream[]>;
}
