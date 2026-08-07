import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { DiscordWidgetData } from '../../shared/types/discord.types';
import { ApiService } from './api.service';

const DISCORD_GUILD_ID = '121399943393968128';
const DISCORD_WIDGET_URL = `https://discord.com/api/guilds/${DISCORD_GUILD_ID}/widget.json`;

@Injectable({ providedIn: 'root' })
export class DiscordService {
    private readonly api = inject(ApiService);

    /**
     * Get live server info from the public Discord widget API with retry strategy
     */
    getWidgetData(): Observable<DiscordWidgetData | null> {
        return this.api.get<DiscordWidgetData>(DISCORD_WIDGET_URL).pipe(
            retry({ count: 2, delay: 1000 }),
            // Degrade to null so the widget can fall back to a plain invite link
            catchError(() => of(null))
        );
    }
}
