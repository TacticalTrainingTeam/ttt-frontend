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
     * Get upcoming events with retry strategy
     */
    getUpcomingEvents(limit = 3): Observable<SlotbotEvent[]> {
        const url = `${this.baseUrl}/events/upcoming?limit=${limit}`;
        return this.api.get<{ events: SlotbotEvent[] }>(url).pipe(
            retry({ count: 2, delay: 1000 }),
            map((res) => res?.events ?? []),
            // Degrade to the sidebar empty state on backend errors
            catchError(() => of([]))
        );
    }
}
