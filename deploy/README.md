# Déploiement — holotuto-website

Site statique React/Vite servi par **nginx dans un conteneur Docker**.
Deux pipelines coexistent :

| Pipeline | Cible | Mécanisme |
|----------|-------|-----------|
| **Jenkins** (`Jenkinsfile`) | `holotuto.com` | build → GHCR → SSH `docker compose` |
| **GitHub Actions** (`.github/workflows/deploy-production.yml`) | **`ubuntu2`** | build → GHCR → SSH `docker compose` |

Ce dossier documente le déploiement **GitHub Actions** vers un serveur nommé.

## Modèle par serveur

Chaque serveur suit la convention : secrets d'accès `SSH_*_<ID>` + paramètres app `<ID>_*`.

| Serveur | ID | Guide |
|---------|-----|-------|
| Ubuntu secondaire | `ubuntu2` | [`servers/ubuntu2.md`](servers/ubuntu2.md) |

## Workflow GitHub Actions

Fichier : [`.github/workflows/deploy-production.yml`](../.github/workflows/deploy-production.yml)

Étapes :

1. `npm ci` → `npm test` → `npm run build` (validation).
2. **Build & push** de l'image Docker (cible `production` du `Dockerfile`)
   vers `ghcr.io/<owner>/holotuto-website` via le `GITHUB_TOKEN`.
3. **Déploiement SSH** vers le serveur cible ([`deploy-gha.sh`](deploy-gha.sh)) :
   copie de `docker-compose.yml`, `docker login`, `docker pull`,
   `docker compose up -d`, attente du healthcheck, purge des images obsolètes.

Déclenchement : push sur `main`/`master`, ou *Actions → Deploy Production → Run workflow*.

## Secrets & variables requis

Voir [`servers/ubuntu2.md`](servers/ubuntu2.md) pour la liste complète. Résumé :

| Portée | Nom | Rôle |
|--------|-----|------|
| Secret | `SSH_PRIVATE_KEY_UBUNTU2` | Clé privée SSH |
| Secret/Var | `SSH_HOST_UBUNTU2` | IP / hostname |
| Secret/Var | `SSH_USER_UBUNTU2` | Utilisateur SSH |
| Var | `SSH_PORT_UBUNTU2` | Port SSH (défaut `22`) |
| Var | `UBUNTU2_DEPLOY_DIR` | Répertoire distant (défaut `/opt/holotuto`) |

> Port hôte figé à `8083` dans le workflow (`HOST_PORT_RAW`). `8082` est occupé par `cadvisor`.

## Fichiers du dossier `deploy/`

| Fichier | Rôle |
|---------|------|
| `gha-env.sh` | Helpers de nettoyage/écriture des variables GHA |
| `deploy-gha.sh` | Déploiement Docker via SSH (`docker compose`) |
| `servers/ubuntu2.md` | Guide de configuration du serveur `ubuntu2` |

## Variables d'env de `docker-compose.yml`

| Variable | Description | Défaut |
|----------|-------------|--------|
| `IMAGE` | Image sans tag | `ghcr.io/negspace2001/holotuto-website` |
| `IMAGE_TAG` | Tag de l'image | `latest` |
| `HOST_PORT` | Port hôte → `8080` conteneur | `3000` |

## Dépannage

```bash
ssh ubuntu@<IP_UBUNTU2>
cd /opt/holotuto
docker compose ps
docker compose logs --tail=100
curl -sf http://localhost:8083/healthz    # -> ok
```
