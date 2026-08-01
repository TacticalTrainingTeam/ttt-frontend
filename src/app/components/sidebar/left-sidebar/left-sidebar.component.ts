import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { SlotbotEvent } from '../../../shared/types/events.types';
import { EventsService } from '../../../core/services/events.service';
// Temporaer deaktiviert bis die Events-API live ist
// import { DatePipe, AsyncPipe } from '@angular/common';
// import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';

@Component({
    selector: 'ttt-left-sidebar',
    standalone: true,
    // imports: [DatePipe, AsyncPipe, SectionHeaderComponent],
    templateUrl: './left-sidebar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftSidebarComponent {
    private readonly eventsService = inject(EventsService);
    readonly events$: Observable<SlotbotEvent[]> = this.eventsService.getUpcomingEvents(3);
}
