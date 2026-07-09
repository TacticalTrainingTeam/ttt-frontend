import { SlotbotEvent } from '../../shared/types/events.types';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EventsService {
    private readonly baseUrl = environment.apiBaseUrl;
    private readonly api = inject(ApiService);

    /**
     * Get dummy events for fallback
     */
    private getDummyEvents(): SlotbotEvent[] {
        const now = Date.now();
        return [
            {
                id: '25350',
                title: 'SGA Medic 3.0 Beta [Training][Beta]',
                date: new Date(now).toISOString(),
                startTime: '19:30',
                durationHours: 4,
                type: 'Training',
                eventUrl: 'https://events.tacticalteam.de/events/25350',
            },
            {
                id: '25351',
                title: 'Operation Hill Jumper Teil 1 [Coop][Beta]',
                date: new Date(now + 86400000).toISOString(),
                startTime: '19:30',
                durationHours: 4,
                type: 'Coop',
                eventUrl: 'https://events.tacticalteam.de/events/25351',
            },
            {
                id: '25352',
                title: 'Übungsunterbrechung [Coop]',
                date: new Date(now + 2 * 86400000).toISOString(),
                startTime: '19:30',
                durationHours: 4,
                type: 'Coop',
                eventUrl: 'https://events.tacticalteam.de/events/25352',
            },
        ];
    }

    /**
     * Get upcoming events with retry strategy
     */
    getUpcomingEvents(limit = 3): Observable<SlotbotEvent[]> {
        if (environment.useDummyFallback) {
            return of(this.getDummyEvents());
        }
        const url = `${this.baseUrl}/events/upcoming?limit=${limit}`;
        return this.api.get<{ events: SlotbotEvent[] }>(url).pipe(
            retry({ count: 2, delay: 1000 }),
            map((res) => res?.events ?? []),
            // Degrade to the sidebar empty state on backend errors
            catchError(() => of([]))
        );
    }
}
