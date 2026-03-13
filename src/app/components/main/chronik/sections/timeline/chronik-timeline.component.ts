import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TimelineEvent } from '../../../../../shared/types/chronik.types';

@Component({
    selector: 'ttt-chronik-timeline',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './chronik-timeline.component.html',
    styleUrl: './chronik-timeline.component.css',
})
export class ChronikTimelineComponent {
    @Input({ required: true }) timelineEvents: TimelineEvent[] = [];

    private readonly eventTypeConfig = {
        anniversary: { color: 'border-tttRed bg-tttRed text-tttWhite', label: 'Jubilaeum' },
        milestone: { color: 'border-blue-500 bg-blue-500/20 text-blue-300', label: 'Meilenstein' },
        system: { color: 'border-orange-500 bg-orange-500/20 text-orange-300', label: 'System' },
        default: { color: 'border-tttGray-500 bg-tttGray-500/20 text-tttGray-300', label: 'Event' },
    } as const;

    toggleEventDetails(event: TimelineEvent): void {
        if (event.expanded) {
            event.expanded = false;
            return;
        }

        for (const e of this.timelineEvents) {
            e.expanded = false;
        }
        event.expanded = true;
    }

    handleEventKeyboard(eventObj: TimelineEvent, event: KeyboardEvent): void {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.toggleEventDetails(eventObj);
        }
    }

    getEventTypeLabel(type: string): string {
        const config = this.eventTypeConfig[type as keyof typeof this.eventTypeConfig];
        return config?.label || this.eventTypeConfig.default.label;
    }
}
