# Setup — Environnement de développement PIVOT

## Prérequis

- Docker Desktop (avec Compose v2)
- Git
- Les trois repos clonés **côte à côte** dans le même répertoire parent (`pivot-core/` et `pivot-ui/` doivent être adjacents — requis par `compose.yml`)

## Clonage

```bash
mkdir pivot-platform && cd pivot-platform
git clone https://github.com/PIVOT-PLATFORM/pivot-core.git
git clone https://github.com/PIVOT-PLATFORM/pivot-ui.git
git clone https://github.com/PIVOT-PLATFORM/pivot-docs.git
```

## Démarrage full stack

```bash
cd pivot-core
docker compose up --build
```

| Service | URL |
|---------|-----|
| Frontend (Angular) | http://localhost |
| Backend (API REST) | http://localhost:8080/api |
| Mailpit (emails dev) | http://localhost:8025 |
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
