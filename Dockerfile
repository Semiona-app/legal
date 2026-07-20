# ── build: Next.js static export (basePath empty → served at the domain root) ──
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# No NEXT_PUBLIC_BASE_PATH → the site lives at the root of legal.semiona.com
RUN npm run build

# ── serve: tiny nginx serving the static export ──
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out /usr/share/nginx/html
EXPOSE 80
