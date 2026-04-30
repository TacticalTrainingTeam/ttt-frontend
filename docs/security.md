# Security

## Security Headers

Server-side HTTP headers (must be configured in nginx/Apache/CDN, not in HTML):

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

Notes:

- `X-XSS-Protection` is obsolete and should not be used.
- `Referrer-Policy` can be set as HTTP header or as HTML meta tag.

Browser-side meta configuration in `src/index.html`:

- `<meta name="referrer" content="strict-origin-when-cross-origin">`

## Route Protection

**Guard:** `securityGuard` (`src/app/core/guards/security.guard.ts`)

- Lightweight route guard placeholder (no client-side XSS pattern matching / rate limiting)
- Application uses Angular's built-in template sanitization

## HTTP Security

**Interceptor:** `securityInterceptor` (`src/app/core/interceptors/security.interceptor.ts`)

- Blocks insecure `http://` requests when app runs in HTTPS context
- Security headers injection

## ESLint Security Rules

- No eval, implied-eval, new Function
- No script URLs
- No explicit any types
