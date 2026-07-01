#!/usr/bin/env bash
# Déploiement depuis GitHub Actions vers Ubuntu (Docker + docker compose).
# Le site est servi par un conteneur nginx (image publiée sur GHCR).
# Variables requises : voir deploy/README.md § GitHub Actions
#
#   SSH_HOST     Hôte cible (IP ou hostname)          [requis]
#   SSH_USER     Utilisateur SSH (ex. ubuntu)         [requis]
#   SSH_PORT     Port SSH                             [défaut 22]
#   SSH_KEY_PATH Chemin de la clé privée              [requis en pratique]
#   DEPLOY_DIR   Répertoire de déploiement distant    [défaut /opt/holotuto]
#   HOST_PORT    Port hôte mappé vers le 8080 du conteneur [défaut 8888]
#   IMAGE        Image sans tag (ghcr.io/<owner>/holotuto-website) [requis]
#   IMAGE_TAG    Tag de l'image (ex. main-a1b2c3d)    [requis]
#   GHCR_USER    Utilisateur pour docker login ghcr.io [requis]
#   GHCR_TOKEN   Jeton pour docker login ghcr.io      [requis]

set -euo pipefail

: "${SSH_HOST:?SSH_HOST requis}"
: "${SSH_USER:?SSH_USER requis}"
: "${IMAGE:?IMAGE requis}"
: "${IMAGE_TAG:?IMAGE_TAG requis}"
: "${GHCR_USER:?GHCR_USER requis}"
: "${GHCR_TOKEN:?GHCR_TOKEN requis}"
: "${SSH_PORT:=22}"
: "${DEPLOY_DIR:=/opt/holotuto}"
: "${HOST_PORT:=8888}"

sanitize() {
  printf '%s' "$1" | tr -d '\r\n\t' | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//' -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//"
}

SSH_HOST=$(sanitize "${SSH_HOST}")
SSH_HOST="${SSH_HOST#http://}"
SSH_HOST="${SSH_HOST#https://}"
SSH_HOST="${SSH_HOST%%/*}"
SSH_USER=$(sanitize "${SSH_USER}")
SSH_PORT=$(sanitize "${SSH_PORT}")
DEPLOY_DIR=$(sanitize "${DEPLOY_DIR}")
HOST_PORT=$(sanitize "${HOST_PORT}")

if [[ ! "$SSH_HOST" =~ ^[0-9a-zA-Z.-]+$ ]]; then
  echo "SSH_HOST invalide après nettoyage — SSH_HOST_UBUNTU2 doit être une IP ou hostname, sans http://" >&2
  exit 1
fi
if [[ ! "$SSH_PORT" =~ ^[0-9]+$ ]]; then
  echo "SSH_PORT invalide — SSH_PORT_UBUNTU2 doit être un nombre (ex. 22)" >&2
  exit 1
fi
if [[ ! "$SSH_USER" =~ ^[a-zA-Z0-9._-]+$ ]]; then
  echo "SSH_USER invalide — SSH_USER_UBUNTU2 (ex. ubuntu)" >&2
  exit 1
fi

FULL_IMAGE="${IMAGE}:${IMAGE_TAG}"
SSH_OPTS=(-p "${SSH_PORT}" -o BatchMode=yes -o StrictHostKeyChecking=yes)
SCP_OPTS=(-P "${SSH_PORT}" -o BatchMode=yes -o StrictHostKeyChecking=yes)
SSH_TARGET="${SSH_USER}@${SSH_HOST}"

if [[ -n "${SSH_KEY_PATH:-}" ]]; then
  SSH_OPTS+=(-i "${SSH_KEY_PATH}")
  SCP_OPTS+=(-i "${SSH_KEY_PATH}")
fi

COMPOSE_FILE="docker-compose.yml"
[[ -f "${COMPOSE_FILE}" ]] || { echo "Fichier ${COMPOSE_FILE} introuvable à la racine du dépôt" >&2; exit 1; }

echo "=== Préparation du répertoire distant ${DEPLOY_DIR} ==="
ssh "${SSH_OPTS[@]}" "${SSH_TARGET}" "sudo mkdir -p '${DEPLOY_DIR}' && sudo chown -R ${SSH_USER}:${SSH_USER} '${DEPLOY_DIR}'"

echo "=== Transfert de docker-compose.yml ==="
scp "${SCP_OPTS[@]}" "${COMPOSE_FILE}" "${SSH_TARGET}:${DEPLOY_DIR}/docker-compose.yml"

echo "=== Déploiement du conteneur (${FULL_IMAGE}) ==="
ssh "${SSH_OPTS[@]}" "${SSH_TARGET}" bash -s <<REMOTE
set -euo pipefail
cd '${DEPLOY_DIR}'

echo 'Connexion à ghcr.io...'
printf '%s' '${GHCR_TOKEN}' | docker login ghcr.io -u '${GHCR_USER}' --password-stdin

echo 'Pull image: ${FULL_IMAGE}'
docker pull '${FULL_IMAGE}'

echo 'Vérification de la disponibilité du port hôte ${HOST_PORT}...'
PORTS_ON_HOST=\$(docker ps --format '{{.Names}}\t{{.Ports}}' | grep ":${HOST_PORT}->" || true)
# Si c'est notre propre conteneur holotuto qui occupe le port, compose le recréera -> OK
HOLO_ON_PORT=\$(printf '%s\n' "\$PORTS_ON_HOST" | grep '^holotuto\b' || true)
# Un AUTRE conteneur sur ce port = vrai conflit
CONFLICT=\$(printf '%s\n' "\$PORTS_ON_HOST" | grep -v '^holotuto\b' | grep -v '^\$' || true)
# Repli : port tenu par un processus non-docker (uniquement si aucun conteneur ne l'utilise)
if [ -z "\$CONFLICT" ] && [ -z "\$HOLO_ON_PORT" ] && command -v ss >/dev/null 2>&1; then
  CONFLICT=\$(sudo ss -ltnp 2>/dev/null | grep -E "[:.]${HOST_PORT}[[:space:]]" || true)
fi
if [ -n "\$CONFLICT" ]; then
  echo "::error::Le port ${HOST_PORT} est déjà utilisé par un autre service :"
  echo "\$CONFLICT"
  echo "Choisissez un port libre en modifiant HOST_PORT_RAW dans .github/workflows/deploy-production.yml."
  docker logout ghcr.io || true
  exit 1
fi

echo 'Démarrage docker compose...'
IMAGE='${IMAGE}' IMAGE_TAG='${IMAGE_TAG}' HOST_PORT='${HOST_PORT}' \\
  docker compose up -d --remove-orphans

echo 'Vérification santé du conteneur...'
for i in \$(seq 1 30); do
  STATUS=\$(docker inspect --format='{{.State.Health.Status}}' holotuto 2>/dev/null || echo 'starting')
  if [ "\$STATUS" = 'healthy' ]; then
    echo "Conteneur healthy après \${i}x2s"
    break
  fi
  if [ \$i -eq 30 ]; then
    echo '::error::conteneur jamais healthy après 60 s'
    docker compose logs --tail=50 || true
    docker logout ghcr.io || true
    exit 1
  fi
  sleep 2
done

echo 'Nettoyage des images obsolètes...'
docker image prune -f --filter 'label=com.holotuto.app=holotuto-website' || true
docker logout ghcr.io || true
echo '=== Déploiement terminé ==='
REMOTE

echo "Déploiement réussi sur ${SSH_HOST} (${FULL_IMAGE})."
