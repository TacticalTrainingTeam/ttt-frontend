export type TimelineEventType = 'anniversary' | 'milestone' | 'system';

export interface TimelineEvent {
    id: string;
    title: string;
    date: string;
    type: TimelineEventType;
    color: string;
    description: string;
    details: string[];
    expanded?: boolean;
}
