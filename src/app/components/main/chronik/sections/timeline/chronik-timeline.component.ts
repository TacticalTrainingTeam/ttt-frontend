import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { Timeline } from 'primeng/timeline';
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

    private readonly eventTypeConfig = {
        anniversary: { label: 'Jubiläum', icon: 'pi-star' },
        milestone: { label: 'Meilenstein', icon: 'pi-flag' },
        system: { label: 'System', icon: 'pi-cog' },
        default: { label: 'Event', icon: 'pi-calendar' },
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
        return this.getEventTypeConfig(type).label;
    }

    getEventTypeIcon(type: string): string {
        return this.getEventTypeConfig(type).icon;
    }

    private getEventTypeConfig(type: string) {
        return this.eventTypeConfig[type as keyof typeof this.eventTypeConfig] ?? this.eventTypeConfig.default;
    }
}
