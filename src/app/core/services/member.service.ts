import { Member, RankType, MemberResponse, MemberStatsResponse } from '../../shared/types/member.types';

import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map, timeout, retry } from 'rxjs/operators';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';

/**
 * Service for managing TTT member data
 */
@Injectable({
    providedIn: 'root',
})
export class MemberService {
    private readonly baseUrl = environment.apiBaseUrl;
    private readonly api = inject(ApiService);

    /**
     * Helper method to handle API calls with retry and timeout strategy
     */
    private handleApiCall<T, R>(
        url: string,
        mapFn: (response: T) => R,
        options: { timeout?: number; retries?: number; retryDelay?: number } = {}
    ): Observable<R> {
        const { timeout: timeoutMs = 5000, retries = 2, retryDelay = 1000 } = options;

        // Errors propagate to the caller so the UI can show its error state
        return this.api.get<T>(url).pipe(timeout(timeoutMs), retry({ count: retries, delay: retryDelay }), map(mapFn));
    }

    /**
     * Get all active members with retry and timeout strategy
     */
    getAllMembers(): Observable<Member[]> {
        return this.handleApiCall<MemberResponse, Member[]>(`${this.baseUrl}/members`, (response) => response.members);
    }

    /**
     * Get member statistics by rank with retry strategy
     */
    getMemberStats(): Observable<Record<RankType, number>> {
        return this.handleApiCall<MemberStatsResponse, Record<RankType, number>>(
            `${this.baseUrl}/members/stats`,
            (response) => response.stats
        );
    }
}
