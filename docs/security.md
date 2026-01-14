# Security

## Security Headers

Configured in `src/index.html`:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

## Route Protection

**Guard:** `SecurityGuard` (`src/app/core/guards/security.guard.ts`)

- XSS pattern detection in route parameters
- Rate limiting (100ms minimum between route changes)
- Applied to all routes via `canActivate`

## HTTP Security

**Interceptor:** `SecurityInterceptor` (`src/app/core/interceptors/security.interceptor.ts`)

- HTTPS enforcement
- Security headers injection

## ESLint Security Rules

- No eval, implied-eval, new Function
- No script URLs
- No explicit any types
