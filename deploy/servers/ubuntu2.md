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

> **Port hôte figé à `8888`** (codé en dur dans le workflow). `8082`/`8083` sont
> déjà utilisés sur ce serveur. Pour changer, modifier `HOST_PORT_RAW` dans
> `.github/workflows/deploy-production.yml`.

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

Le conteneur écoute en interne sur `8080` (mappé sur `8888` de l'hôte). Le routage
le plus fiable est **conteneur‑à‑conteneur** : on connecte NPM au réseau `holotuto-net`
et on forwarde vers le **nom du conteneur** (évite la gateway hôte `172.17.0.1`, fragile
avec les iptables de k3s).

```bash
# Une seule fois : rattacher NPM au réseau de holotuto
docker network connect holotuto-net nginx-proxy-manager
docker exec nginx-proxy-manager sh -c 'getent hosts holotuto'   # doit résoudre
```

Proxy Host NPM :

| Champ | Valeur |
|-------|--------|
| Domain Names | `www.holotuto.com` (+ `holotuto.com` si besoin) |
| Scheme | **`http`** (le SSL est géré par NPM) |
| Forward Hostname / IP | `holotuto` *(nom du conteneur, sans espace)* |
| Forward Port | `8080` *(port interne, **pas** 8888)* |
| SSL | Request a new certificate + Force SSL + HTTP/2 |

Endpoint de santé : `GET /healthz` → `ok`.

> ⚠️ **Conflit de ports 80/443 avec k3s.** Ce serveur fait tourner k3s dont l'ingress
> **Traefik** (via `svclb`/klipper) accapare 80/443 par iptables et court‑circuite NPM
> (symptôme : `404 page not found` en `text/plain`). Pour laisser NPM gérer 80/443 :
> ```bash
> sudo tee /etc/rancher/k3s/config.yaml >/dev/null <<'EOF'
> disable:
>   - traefik
>   - servicelb
> EOF
> sudo k3s kubectl -n kube-system delete helmchart traefik traefik-crd 2>/dev/null || true
> sudo systemctl restart k3s
> ```
>
> ⚠️ Le rattachement `docker network connect` de NPM est **perdu si le conteneur NPM
> est recréé**. Pour le rendre permanent, ajouter `holotuto-net` (en réseau externe)
> au `docker-compose.yml` de NPM.
