import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { ButtonDirective } from '@openng/optimus-ui/button';
import { Timeline } from '@openng/optimus-ui/timeline';
import { TimelineEvent } from '../../../../../shared/types/chronik.types';
import { SectionHeaderComponent } from '../../../../../shared/components/section-header/section-header.component';

@Component({
    selector: 'ttt-chronik-timeline',
    standalone: true,
    imports: [NgClass, ButtonDirective, Timeline, SectionHeaderComponent],
    templateUrl: './chronik-timeline.component.html',
    styleUrl: './chronik-timeline.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChronikTimelineComponent {
    timelineEvents = input.required<TimelineEvent[]>();

    /** Id of the event whose details are open; null when all are collapsed */
    readonly expandedId = signal<string | null>(null);

    toggleEventDetails(event: TimelineEvent): void {
        this.expandedId.update((id) => (id === event.id ? null : event.id));
    }
}
