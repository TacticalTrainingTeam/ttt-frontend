export type TimelineEventType = 'anniversary' | 'milestone' | 'system';

export interface TimelineEvent {
    id: string;
    title: string;
    date: string;
    type: TimelineEventType;
    icon: string;
    color: string;
    description: string;
    details: string[];
    expanded?: boolean;
}
