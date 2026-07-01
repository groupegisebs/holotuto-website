# Serveur UBUNTU2 — configuration GitHub

Dépôt : **https://github.com/groupegisebs/holotuto-website**

Convention : **`SSH_*_UBUNTU2`** (accès SSH, partageable au niveau organisation),
**`UBUNTU2_*`** (paramètres propres à cette app).

| Serveur | ID | IP |
|---------|-----|-----|
| Ubuntu secondaire | `ubuntu2` | `<IP_UBUNTU2>` |

---

## Secrets d'accès SSH (`SSH_*_UBUNTU2`)

À définir soit au niveau **organisation** (`groupegisebs`) avec *Repository access → holotuto-website*,
soit directement dans le **dépôt** (Settings → Secrets and variables → Actions).

| Type | Nom | Valeur |
|------|-----|--------|
| Secret | `SSH_PRIVATE_KEY_UBUNTU2` | Clé privée SSH (multiligne, `-----BEGIN OPENSSH PRIVATE KEY-----` … `END`) |
| Secret | `SSH_HOST_UBUNTU2` | IP ou hostname d'ubuntu2 *(une seule ligne, sans `http://`)* |
| Secret | `SSH_USER_UBUNTU2` | `ubuntu` |
| Variable | `SSH_PORT_UBUNTU2` | `22` *(secret ou variable ; défaut `22`)* |

> `SSH_HOST_UBUNTU2` / `SSH_USER_UBUNTU2` / `SSH_PORT_UBUNTU2` acceptent aussi bien
> une **variable** (`vars.*`) qu'un **secret** (`secrets.*`) — la variable est prioritaire.

---

## Paramètres de l'app (`UBUNTU2_*`)

Optionnels : des valeurs par défaut raisonnables s'appliquent. Définir en **variable** de dépôt.

| Type | Nom | Valeur | Défaut |
|------|-----|--------|--------|
| Variable | `UBUNTU2_DEPLOY_DIR` | Répertoire distant contenant `docker-compose.yml` | `/opt/holotuto` |
| Variable | `UBUNTU2_HOST_PORT` | Port hôte mappé vers le `8080` du conteneur | `8082` |

L'image est publiée automatiquement sur `ghcr.io/groupegisebs/holotuto-website`
via le `GITHUB_TOKEN` du workflow — aucun PAT à configurer.

---

## Lancer le déploiement

- **Automatique** : push sur `main` / `master`.
- **Manuel** : *Actions → Deploy Production → Run workflow → ubuntu2*.

---

## Prérequis serveur ubuntu2 (une seule fois)

```bash
ssh ubuntu@<IP_UBUNTU2>

# Docker + plugin compose
docker --version
docker compose version

# Répertoire de déploiement
sudo mkdir -p /opt/holotuto
sudo chown ubuntu:ubuntu /opt/holotuto

# Autoriser la clé publique de déploiement
#   (déjà fait si SSH_PRIVATE_KEY_UBUNTU2 correspond à une clé présente
#    dans ~/.ssh/authorized_keys de l'utilisateur ubuntu)
```

Le workflow se charge de `docker login ghcr.io`, `docker pull`, puis
`docker compose up -d` — aucune action manuelle par déploiement.

---

## Reverse proxy (Nginx Proxy Manager)

Le conteneur écoute en interne sur `8080` et est mappé sur `HOST_PORT` (défaut `8082`).

| Champ | Valeur |
|-------|--------|
| Scheme | **`http`** (le SSL est géré par NPM) |
| Forward Host | `172.17.0.1` |
| Forward Port | `8082` *(= `UBUNTU2_HOST_PORT`)* |

Endpoint de santé : `GET /healthz` → `ok`.
