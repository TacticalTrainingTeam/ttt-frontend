import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ButtonDirective } from '@openng/optimus-ui/button';
import { Timeline } from '@openng/optimus-ui/timeline';
import { TimelineEvent } from '../../../../../shared/types/chronik.types';
import { SectionHeaderComponent } from '../../../../../shared/components/section-header/section-header.component';

@Component({
    selector: 'ttt-chronik-timeline',
    standalone: true,
    imports: [CommonModule, ButtonDirective, Timeline, SectionHeaderComponent],
    templateUrl: './chronik-timeline.component.html',
    styleUrl: './chronik-timeline.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChronikTimelineComponent {
    timelineEvents = input.required<TimelineEvent[]>();

    toggleEventDetails(event: TimelineEvent): void {
        if (event.expanded) {
            event.expanded = false;
            return;
        }

        for (const e of this.timelineEvents()) {
            e.expanded = false;
        }
        event.expanded = true;
    }
}
