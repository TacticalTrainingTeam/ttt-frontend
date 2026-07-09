# Backend Integration

The web server routes `/api`, `/oauth2` and `/logout` to the backend.

## Basics

- All HTTP calls go through `ApiService` (`src/app/core/services/api.service.ts`).
- Base URL: `environment.apiBaseUrl` (currently `/api/v1`) — relative paths, no CORS needed.
- Local development: `proxy.conf.json` forwards `/api` to `http://localhost:8080` during `pnpm start`.
- While `environment.useDummyFallback = true`, the services do **not** call the backend at all
  and serve local dummy data instead (see "Go-live" section below).

## Authentication (AuthService)

OIDC via Authentik (which federates the Discord login), session cookie based
(no token handling in the frontend). Spring Security client registration id: `authentik`.

| Purpose           | Endpoint                              | Response                                    |
| ----------------- | ------------------------------------- | ------------------------------------------- |
| Login entry point | `GET /oauth2/authorization/authentik` | Redirect to Authentik (-> Discord) and back |
| Session lookup    | `GET /api/v1/auth/me`                 | `AuthUser` or `401`                         |
| Logout            | `GET /logout` (or `POST` with CSRF)   | Invalidate session, redirect                |

**Redirect requirements for the backend:**

- After a successful OIDC login: redirect to **`/intern`** (Spring: `defaultSuccessUrl("/intern", true)`).
- After logout: redirect to **`/`** (Spring: `logoutSuccessUrl("/")`).

**`AuthUser`** (`src/app/shared/types/auth.types.ts`):

```typescript
interface AuthUser {
    id: string;
    name: string;
    avatar: string;
    discordId: string;
    roles: UserRole[]; // 'MEMBER' | 'PERSONAL' | 'OFFIZIER' | 'ADMIN'
}
```

Roles are expected as claims in the Authentik token (e.g. mapped from Authentik groups);
the backend translates them into the `roles` array of `/auth/me`. The `discordId` claim
comes from the federated Discord login through Authentik.

The frontend hides UI based on roles (route guards, members tab) — that is convenience only.
**Access control must be enforced by the backend on every endpoint.**

## Kaserne / intern area (InternService)

| Endpoint                                         | Response        | Authorization                 |
| ------------------------------------------------ | --------------- | ----------------------------- |
| `GET /api/v1/intern/profile`                     | `UserProfile`   | authenticated                 |
| `PATCH /api/v1/intern/profile/platform-ids`      | `UserProfile`   | authenticated                 |
| `GET /api/v1/intern/members`                     | `UserProfile[]` | `PERSONAL`/`OFFIZIER`/`ADMIN` |
| `PATCH /api/v1/intern/members/{id}/platform-ids` | `UserProfile`   | `PERSONAL`/`OFFIZIER`/`ADMIN` |

PATCH body (both endpoints):

```typescript
{
    steamId: string;
    xboxId: string;
    playstationId: string;
    armaIngameName: string;
}
```

**Important:** `discordId` is **not** part of the PATCH body — it comes from the OIDC login and
must never be changeable through these endpoints. The frontend does not send it; the backend
must additionally ignore/reject it.

**`UserProfile`** = `Member` + `platformIds` (`src/app/shared/types/intern.types.ts`).

## Aufstellung (MemberService)

| Endpoint                          | Response                                             |
| --------------------------------- | ---------------------------------------------------- |
| `GET /api/v1/members`             | `MemberResponse` (`{ members, total, lastUpdated }`) |
| `GET /api/v1/members/stats`       | `MemberStatsResponse`                                |
| `GET /api/v1/members/{id}`        | `Member`                                             |
| `GET /api/v1/members?rank={rank}` | `MemberResponse`                                     |
| `PATCH /api/v1/members/{id}`      | `Member` (admin)                                     |
| `GET /api/v1/medals`              | `Medal[]`                                            |
| `GET /api/v1/campaign-ribbons`    | `CampaignRibbon[]`                                   |
| `GET /api/v1/abteilungen`         | `Abteilung[]`                                        |

Types: `src/app/shared/types/member.types.ts` (`Member`, `Medal`, `CampaignRibbon`, `Abteilung`, `RankType`).

Currently used by the UI: `GET /members` (Aufstellung) and `GET /members/stats` (Home community stats).
The remaining endpoints are reserved contract definitions and not called by the UI yet.

## Events (EventsService)

| Endpoint                                | Response                     |
| --------------------------------------- | ---------------------------- |
| `GET /api/v1/events/upcoming?limit={n}` | `{ events: SlotbotEvent[] }` |

Type: `src/app/shared/types/events.types.ts`. On backend errors the sidebar shows its empty state.

## Medien (MedienService)

| Endpoint                     | Response         |
| ---------------------------- | ---------------- |
| `GET /api/v1/twitch/streams` | `TwitchStream[]` |

Type: `src/app/shared/types/medien.types.ts`. On backend errors the page shows "Keine Livestreams".

## Error behavior (expected from the backend)

- `401` without a session (especially `/auth/me`, `/intern/*`), `403` for missing roles.
- Errors on `GET /members` surface as an error view with a retry button.
- Events/streams silently degrade to their empty states — no fake data.

---

## Go-live: frontend changes when the backend ships

Checklist for switching from dummy data to the real backend — goal: all dummies removed, project clean.

### 1. Flip the switch

- [ ] Set `useDummyFallback: false` in **both** environments
      (`src/environments/environment.ts` and `environment.prod.ts`).
      All services then call the real API; the dev login in the header disappears automatically
      (the login button starts the OIDC redirect instead).

### 2. Remove dummy code

Once the backend runs stable, delete the dummy branches entirely (search for `useDummyFallback`):

- [ ] `AuthService` (`core/services/auth.service.ts`): `DEV_AUTH_USER`, `DEV_LOGIN_STORAGE_KEY`,
      all `useDummyFallback` branches in `login()`, `logout()`, `restoreSession()`.
- [ ] `InternService`: `createDummyMembers()`, `updateDummyMember()`, the `dummyMembers` state,
      all `useDummyFallback` branches.
- [ ] `MemberService`: `getDummyMembers()`, `createBasicMember()`, the short-circuit in
      `handleApiCall()`, `fallbackStats` in `getMemberStats()`.
- [ ] `EventsService`: `getDummyEvents()` + short-circuit.
- [ ] `MedienService`: `getDummyTwitchStreams()` + short-circuit.
- [ ] Delete the `useDummyFallback` flag from both environment files.
- [ ] Update specs that test dummy behavior (`auth.service.spec`, `intern.service.spec`,
      the guard spec uses the dev login) → switch to service mocks or `provideHttpClientTesting`.

### 3. Infrastructure / deployment

- [ ] nginx: `location /api { proxy_pass http://backend; }` plus route `/oauth2` and `/logout`
      to the backend (same domain, no CORS).
- [ ] Session cookie: `HttpOnly`, `Secure`, `SameSite=Lax` (backend configuration).
- [ ] CSRF: for state-changing requests (PATCH) enable Spring `CookieCsrfTokenRepository` and
      Angular `withXsrfConfiguration()` in `app.config.ts`.
- [ ] Check the dev proxy: `proxy.conf.json` points to `localhost:8080` — adjust if the backend
      runs elsewhere locally.

### 4. Cleanup alongside the integration

- [ ] Fill `AuthUser.avatar` with the real Discord avatar URL (Discord CDN);
      the placeholder avatars (`/img/aufstellung/offizier-kopf.webp`) disappear with the dummies.
- [ ] Decide whether `GET /members/stats` is still needed (the Aufstellung currently computes
      stats client-side from the member list).
- [ ] `docs/backend-overview.md` (this file): delete the go-live section once completed.
