# Setup — Environnement de développement PIVOT

## Prérequis

- Docker Desktop (avec Compose v2)
- Git
- GitHub CLI (`gh`) — recommandé pour les PR/reviews en autonomie agentique
- Les repos clonés **côte à côte** dans le même répertoire parent (`pivot-core/` et `pivot-ui/` doivent être adjacents — requis par `compose.yml`)

## WSL (Windows)

Sur Windows, le développement se fait **dans WSL2**, jamais directement en PowerShell/CMD pour
les commandes Git/Docker/build — évite les problèmes de fins de ligne, permissions et perf I/O.

```powershell
# PowerShell administrateur — installation WSL2 + Ubuntu (une fois)
wsl --install -d Ubuntu
```

Redémarrer, puis dans le terminal Ubuntu (WSL) :

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl build-essential
```

**Docker** : installer Docker Desktop côté Windows avec l'intégration WSL2 activée
(Settings → Resources → WSL Integration → cocher la distro Ubuntu) — le daemon Docker est alors
utilisable directement depuis le terminal WSL, pas besoin de Docker séparé dans WSL.

**Travailler dans le filesystem Linux**, pas `/mnt/c/...` — clone les repos sous `~/` (ex.
`~/pivot-platform/`), jamais sous `/mnt/c/Users/...` (perf I/O très dégradée + problèmes de
permissions Git).

## Clonage

Dépôts socle (toujours nécessaires) :

```bash
mkdir -p pivot-platform && cd pivot-platform
git clone https://github.com/PIVOT-PLATFORM/pivot-core.git
git clone https://github.com/PIVOT-PLATFORM/pivot-ui.git
git clone https://github.com/PIVOT-PLATFORM/pivot-docs.git
git clone https://github.com/PIVOT-PLATFORM/pivot-design-system.git
```

Dépôts modules (selon le(s) domaine(s) sur lequel vous travaillez) :

```bash
# Pilotage
git clone https://github.com/PIVOT-PLATFORM/pivot-pilotage-core.git
git clone https://github.com/PIVOT-PLATFORM/pivot-pilotage-ui.git

# Agilité
git clone https://github.com/PIVOT-PLATFORM/pivot-agilite-core.git
git clone https://github.com/PIVOT-PLATFORM/pivot-agilite-ui.git

# Collaboratif
git clone https://github.com/PIVOT-PLATFORM/pivot-collaboratif-core.git
git clone https://github.com/PIVOT-PLATFORM/pivot-collaboratif-ui.git
```

`pivot-platform/` lui-même **n'est pas un repo** — c'est un simple dossier de travail qui
regroupe les clones ci-dessus. Chaque sous-dossier est versionné indépendamment sur son propre
remote GitHub.

## Commits signés

Chaque commit doit être signé (badge "Verified" sur GitHub). Signature SSH (plus simple que GPG,
supportée nativement par Git ≥ 2.34) :

```bash
# 1. Générer une clé SSH dédiée à la signature (ou réutiliser une clé d'authentification existante)
ssh-keygen -t ed25519 -C "signing key" -f ~/.ssh/id_ed25519_signing

# 2. Configurer Git pour signer avec SSH
git config --global gpg.format ssh
git config --global user.signingkey ~/.ssh/id_ed25519_signing.pub
git config --global commit.gpgsign true
git config --global tag.gpgsign true
```

Ajouter la **clé publique** (`~/.ssh/id_ed25519_signing.pub`) sur GitHub :
**Settings → SSH and GPG keys → New SSH key → type "Signing Key"** (distinct du type
"Authentication Key" si une clé d'auth SSH séparée existe déjà).

Vérifier :
```bash
git commit --allow-empty -m "test: signature" && git log --show-signature -1
```

## CLAUDE.md racine (optionnel)

`pivot-platform/` n'étant pas un repo, un `CLAUDE.md` placé à sa racine n'est **jamais
versionné** — c'est une commodité locale, pas une source de vérité. La source de vérité vit dans
le `CLAUDE.md` de chaque repo (`pivot-core/CLAUDE.md`, `pivot-ui/CLAUDE.md`,
`pivot-docs/CLAUDE.md`), qui reste complet et autonome même en ouvrant le repo seul, hors du
dossier `pivot-platform/`.

Un `CLAUDE.md` racine reste utile pour donner une vue d'ensemble multi-repo à un agent qui
travaille depuis `pivot-platform/` — mais toute règle qui doit être fiable et partagée par
l'équipe doit vivre dans le `CLAUDE.md` du repo concerné, jamais uniquement à la racine.

## Démarrage full stack

```bash
cd pivot-core
docker compose up --build
```

| Service | URL |
|---------|-----|
| Frontend (Angular) | <http://localhost> |
| Backend (API REST) | <http://localhost:8080/api> |
| Mailpit (emails dev) | <http://localhost:8025> |
| PostgreSQL | localhost:5432 |
| Redis | localhost:6379 |

## Variables d'environnement (optionnel)

Créer un fichier `.env` dans `pivot-core/` :

```env
POSTGRES_PASSWORD=pivot_dev
MAIL_USERNAME=pivot@localhost
MAIL_FROM=pivot@localhost
APP_URL=http://localhost
CORS_ALLOWED_ORIGINS=http://localhost
OIDC_ISSUER_URI=
SPRING_PROFILES_ACTIVE=dev
```

Les valeurs par défaut du `compose.yml` suffisent pour le dev local.

## Arrêt

```bash
# Arrêt simple (conserve les données)
docker compose down

# Arrêt + suppression des volumes (repart de zéro)
docker compose down -v
```

## Développement natif (sans Docker pour les apps)

Prérequis supplémentaires : **JDK 25** (backend) · **Node.js 24+** (frontend).

Pour travailler sur le backend ou le frontend sans rebuilder les images à chaque changement :

```bash
# 1. Démarrer uniquement l'infra
docker run -d --name pivot-postgres -e POSTGRES_DB=pivot_dev -e POSTGRES_USER=pivot -e POSTGRES_PASSWORD=pivot_dev -p 5432:5432 postgres:18-alpine
docker run -d --name pivot-redis -p 6379:6379 redis:7-alpine
docker run -d --name pivot-mailpit -p 1025:1025 -p 8025:8025 axllent/mailpit:latest

# 2. Backend
cd pivot-core
./mvnw spring-boot:run

# 3. Frontend (dans un autre terminal)
cd pivot-ui
npm start   # proxy vers localhost:8080 via proxy.conf.json
```

## Rebuild après changement

```bash
# Rebuild une image spécifique
docker compose build backend
docker compose build frontend

# Restart un service
docker compose restart backend
```
