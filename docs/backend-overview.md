# Backend Integration

## Overview

All backend communication goes through `ApiService` (`src/app/core/services/api.service.ts`).

Base API URL: `environment.apiBaseUrl`

## Services

### ApiService

Central HTTP client wrapper with consistent request/response handling.

### MemberService

**Endpoints:**

- `GET /members` → `MemberResponse`
- `GET /members/stats` → `MemberStatsResponse`
- `GET /members/:id` → `Member`
- `GET /members?rank=:rank` → `MemberResponse`
- `GET /medals` → `Medal[]`
- `GET /campaign-ribbons` → `CampaignRibbon[]`
- `GET /abteilungen` → `Abteilung[]`

Fallback: Dummy data if backend unavailable.

### EventsService

**Endpoint:**

- `GET /events/upcoming?limit=:n` → `{ events: SlotbotEvent[] }`

Fallback: Dummy data if backend unavailable.

### MedienService

**Endpoint:**

- `GET /twitch/streams` → `TwitchStream[]`

Fallback: Dummy data if backend unavailable.

## Data Types

See `src/app/shared/types/member.types.ts` for interfaces.

**Member:**

```typescript
interface Member {
    id: string;
    name: string;
    rank: RankType;
    avatar: string;
    memberSince: string;
    medals: Medal[];
    campaignRibbons: CampaignRibbon[];
    abteilungen: Abteilung[];
}
```

**MemberResponse:**

```typescript
interface MemberResponse {
    members: Member[];
    total: number;
    lastUpdated: string;
}
```
