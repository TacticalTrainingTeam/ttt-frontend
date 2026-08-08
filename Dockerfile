FROM node:24-alpine AS build

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@11 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts

COPY . .
RUN pnpm run build

FROM caddy:2-alpine

COPY caddy/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist/ttt-frontend/browser /usr/share/caddy

EXPOSE 80
