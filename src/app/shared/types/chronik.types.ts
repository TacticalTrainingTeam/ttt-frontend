export type TimelineEventType = 'anniversary' | 'milestone' | 'system';

export interface TimelineEvent {
    id: string;
    title: string;
    date: string;
    type: TimelineEventType;
    description: string;
    details: string[];
}
