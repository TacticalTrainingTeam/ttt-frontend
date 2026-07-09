import { Injectable, inject } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { ApiService } from './api.service';
import { CampaignRibbon, Medal } from '../../shared/types/member.types';
import { environment } from '../../../environments/environment';

export type MedalRequest = Omit<Medal, 'id'>;
export type CampaignRibbonRequest = Omit<CampaignRibbon, 'id'>;

/**
 * Catalog administration (medals, campaign ribbons).
 * Abteilungen are managed in Discord/Authentik and arrive as member data via the backend.
 * With environment.useDummyFallback enabled, local dummy catalogs are served
 * instead of calling the backend. Image/icon values are URLs; uploads follow
 * with the backend integration.
 */
@Injectable({ providedIn: 'root' })
export class CatalogService {
    private readonly baseUrl = environment.apiBaseUrl;
    private readonly api = inject(ApiService);

    /** Local state for the dummy mode so edits survive navigation */
    private dummyMedals: Medal[] = [
        {
            id: 'medal-1',
            name: 'Medal of Honor',
            image: '/img/aufstellung/medals/medal-mdh.png',
            description: 'Für herausragende Verdienste um das TTT',
        },
        {
            id: 'medal-2',
            name: 'Goldene Ausbildungsmedaille',
            image: '/img/aufstellung/medals/medal-gold-training.png',
            description: 'Für langjährige Ausbildungstätigkeit',
        },
        {
            id: 'medal-3',
            name: 'Training Gold',
            image: '/img/aufstellung/medals/medal-gold-training.png',
            description: 'Abzeichen für Trainingsleistungen (Gold)',
        },
    ];

    private dummyRibbons: CampaignRibbon[] = [
        {
            id: 'ribbon-1',
            image: '/img/aufstellung/ribbons/ttt_veteran-kampagne-aspis.png',
            campaign: 'Aspis',
            year: '2022',
        },
        {
            id: 'ribbon-2',
            image: '/img/aufstellung/ribbons/ttt_veteran-kampagne-paradiso.png',
            campaign: 'Paradiso',
            year: '2023',
        },
    ];

    /**
     * Uploads a catalog image and returns its URL.
     * Dummy mode uses a session-local object URL until the backend exists.
     */
    uploadImage(file: File): Observable<string> {
        if (environment.useDummyFallback) {
            return of(URL.createObjectURL(file));
        }
        const formData = new FormData();
        formData.append('file', file);
        return this.api.post<{ url: string }>(`${this.baseUrl}/assets`, formData).pipe(map((response) => response.url));
    }

    // --- Medals ---

    getMedals(): Observable<Medal[]> {
        if (environment.useDummyFallback) {
            return of([...this.dummyMedals]);
        }
        return this.api.get<Medal[]>(`${this.baseUrl}/medals`);
    }

    createMedal(request: MedalRequest): Observable<Medal> {
        if (environment.useDummyFallback) {
            const medal: Medal = { id: `medal-${Date.now()}`, ...request };
            this.dummyMedals = [...this.dummyMedals, medal];
            return of(medal);
        }
        return this.api.post<Medal>(`${this.baseUrl}/medals`, request);
    }

    updateMedal(medalId: string, request: MedalRequest): Observable<Medal> {
        if (environment.useDummyFallback) {
            const updated: Medal = { id: medalId, ...request };
            this.dummyMedals = this.dummyMedals.map((medal) => (medal.id === medalId ? updated : medal));
            return of(updated);
        }
        return this.api.put<Medal>(`${this.baseUrl}/medals/${medalId}`, request);
    }

    deleteMedal(medalId: string): Observable<void> {
        if (environment.useDummyFallback) {
            this.dummyMedals = this.dummyMedals.filter((medal) => medal.id !== medalId);
            return of(void 0);
        }
        return this.api.delete<void>(`${this.baseUrl}/medals/${medalId}`);
    }

    /** Dummy-mode helper: resolves medal ids to catalog entries (backend does this in real mode) */
    getMedalsByIds(medalIds: string[]): Medal[] {
        return this.dummyMedals.filter((medal) => medalIds.includes(medal.id));
    }

    // --- Campaign ribbons ---

    getCampaignRibbons(): Observable<CampaignRibbon[]> {
        if (environment.useDummyFallback) {
            return of([...this.dummyRibbons]);
        }
        return this.api.get<CampaignRibbon[]>(`${this.baseUrl}/campaign-ribbons`);
    }

    createCampaignRibbon(request: CampaignRibbonRequest): Observable<CampaignRibbon> {
        if (environment.useDummyFallback) {
            const ribbon: CampaignRibbon = { id: `ribbon-${Date.now()}`, ...request };
            this.dummyRibbons = [...this.dummyRibbons, ribbon];
            return of(ribbon);
        }
        return this.api.post<CampaignRibbon>(`${this.baseUrl}/campaign-ribbons`, request);
    }

    updateCampaignRibbon(ribbonId: string, request: CampaignRibbonRequest): Observable<CampaignRibbon> {
        if (environment.useDummyFallback) {
            const updated: CampaignRibbon = { id: ribbonId, ...request };
            this.dummyRibbons = this.dummyRibbons.map((ribbon) => (ribbon.id === ribbonId ? updated : ribbon));
            return of(updated);
        }
        return this.api.put<CampaignRibbon>(`${this.baseUrl}/campaign-ribbons/${ribbonId}`, request);
    }

    deleteCampaignRibbon(ribbonId: string): Observable<void> {
        if (environment.useDummyFallback) {
            this.dummyRibbons = this.dummyRibbons.filter((ribbon) => ribbon.id !== ribbonId);
            return of(void 0);
        }
        return this.api.delete<void>(`${this.baseUrl}/campaign-ribbons/${ribbonId}`);
    }
}
