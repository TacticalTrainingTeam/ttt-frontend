# Security

## HTTP headers

Headers such as `X-Frame-Options`, `X-Content-Type-Options` and `Permissions-Policy` are set by Traefik in front of the container. Caddy or nginx inside the image only serve the static files.

The HTML itself only contains `<meta name="referrer" content="strict-origin-when-cross-origin">`.

## In the frontend

- Templates rely on Angular's sanitization. The only exception is the TeamSpeak viewer URL in the right sidebar, which is trusted as a resource URL for a sandboxed iframe.
- `securityInterceptor` aborts `http://` requests when the page runs on HTTPS.
- External links open with `rel="noopener noreferrer"`.
- ESLint forbids `eval`, `new Function` and `javascript:` URLs and warns on `any`.
