# ==============================================================================
# HoloTuto Homepage — Dockerfile
# Repo   : https://github.com/negspace2001/holotuto-website
# Domain : https://holotuto.com
# ==============================================================================

# ==============================================================================
# Stage 1 — Build (Node 22 Alpine)
# ==============================================================================
FROM node:22-alpine3.21 AS builder

LABEL org.opencontainers.image.source="https://github.com/negspace2001/holotuto-website" \
      org.opencontainers.image.url="https://holotuto.com" \
      org.opencontainers.image.vendor="negspace2001" \
      org.opencontainers.image.title="holotuto-website" \
      org.opencontainers.image.description="Site vitrine HoloTuto — React + Vite + Tailwind CSS"

WORKDIR /app

# Copier les manifestes en premier pour bénéficier du cache layer Docker
COPY package.json package-lock.json ./

# Installation reproductible (npm ci respecte le lock file exactement)
RUN npm ci --ignore-scripts

# Copier les sources et lancer le build Vite
COPY . .
RUN npm run build

# Vérification minimale que le build a produit un index.html
RUN test -f dist/index.html || (echo "BUILD FAILED: dist/index.html absent" && exit 1)

# ==============================================================================
# Stage 2 — Serve (nginx-unprivileged, non-root, port 8080)
# ==============================================================================
FROM nginxinc/nginx-unprivileged:stable-alpine AS production

LABEL org.opencontainers.image.source="https://github.com/negspace2001/holotuto-website" \
      org.opencontainers.image.url="https://holotuto.com" \
      org.opencontainers.image.vendor="negspace2001" \
      org.opencontainers.image.title="holotuto-website"

# Remplacer la config Nginx par défaut
RUN rm /etc/nginx/conf.d/default.conf

# Config personnalisée : SPA fallback, gzip, cache long terme, sécurité, holotuto.com
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Fichiers statiques générés par Vite
COPY --from=builder /app/dist /usr/share/nginx/html

# Vérification syntaxique de la config Nginx au moment du build
RUN nginx -t

# nginx-unprivileged écoute sur 8080 (non-root)
EXPOSE 8080

# Healthcheck natif Docker (endpoint /healthz défini dans nginx.conf)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -qO- http://localhost:8080/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
