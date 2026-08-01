import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { TwitchStream } from '../../shared/types/medien.types';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MedienService {
    private readonly baseUrl = environment.apiBaseUrl;
    private readonly api = inject(ApiService);

    /**
     * Get current Twitch livestreams with retry strategy
     */
    getTwitchStreams(): Observable<TwitchStream[]> {
        return this.api.get<TwitchStream[]>(`${this.baseUrl}/twitch/streams`).pipe(
            retry({ count: 2, delay: 1000 }),
            // Degrade to the empty state instead of showing stale streams
            catchError(() => of([]))
        );
    }
}
