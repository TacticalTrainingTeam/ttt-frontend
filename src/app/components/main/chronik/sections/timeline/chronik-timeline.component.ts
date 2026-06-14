import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TimelineEvent } from '../../../../../shared/types/chronik.types';
import { SectionHeaderComponent } from '../../../../../shared/components/section-header/section-header.component';

@Component({
    selector: 'ttt-chronik-timeline',
    standalone: true,
    imports: [CommonModule, SectionHeaderComponent],
    templateUrl: './chronik-timeline.component.html',
    styleUrl: './chronik-timeline.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChronikTimelineComponent {
    timelineEvents = input.required<TimelineEvent[]>();

    private readonly eventTypeConfig = {
        anniversary: { color: 'text-tttWhite', label: 'Jubiläum' },
        milestone: { color: 'text-blue-300', label: 'Meilenstein' },
        system: { color: 'text-orange-300', label: 'System' },
        default: { color: 'text-tttGray-300', label: 'Event' },
    } as const;

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

    getEventTypeLabel(type: string): string {
        const config = this.eventTypeConfig[type as keyof typeof this.eventTypeConfig];
        return config?.label || this.eventTypeConfig.default.label;
    }
}
