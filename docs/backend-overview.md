# Backend integration

All requests go through `ApiService` (`src/app/core/services/api.service.ts`). The base URL is `environment.apiBaseUrl` (`/api/v1`); the dev server proxies it to `localhost:8080` via `proxy.conf.json`.

## Endpoints

| Service        | Endpoint                      | Response                     |
| -------------- | ----------------------------- | ---------------------------- |
| MemberService  | `GET /members`                | `MemberResponse`             |
| MemberService  | `GET /members/stats`          | `MemberStatsResponse`        |
| EventsService  | `GET /events/upcoming?limit=` | `{ events: SlotbotEvent[] }` |
| MedienService  | `GET /twitch/streams`         | `TwitchStream[]`             |
| DiscordService | Discord widget API (external) | `DiscordWidgetData`          |

Types live in `src/app/shared/types/`.

## Error handling

Events, Twitch and Discord fall back to an empty state on errors. `MemberService` propagates errors, and the Aufstellung page shows its error state with a retry button.

## Status

Until the member, events and Twitch APIs are live, the Aufstellung page, the events sidebar and the livestreams are commented out. Only the Discord widget is active.
