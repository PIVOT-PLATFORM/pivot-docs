---
sidebar_label: "Déploiement Docker Compose (prod)"
---

# Déploiement production — Docker Compose

**Enabler** : [EN07.1 — Docker Compose production complet](pathname:///pivot-docs/backlog/EPIC-infrastructure/ENABLERS/en-docker-compose-prod)
**Fichier** : [`docker-compose.prod.yml`](https://github.com/PIVOT-PLATFORM/pivot-core/blob/main/docker-compose.prod.yml) (racine `pivot-core`)

## Périmètre couvert aujourd'hui

L'AC d'origine de l'Enabler liste `pivot-pilotage-core`, `pivot-agilite-core`,
`pivot-collaboratif-core`, `activemq` et `pgbouncer`. Aucun de ces éléments n'existe
réellement dans l'organisation à ce jour :

- Les trois repos module-core sont **« à créer avec le repo »** (`pivot-platform/CLAUDE.md`,
  colonne « Règles détaillées ») — aucun code, aucune image à construire ou tirer.
- `pivot-core` n'a **aucune dépendance ActiveMQ / RabbitMQ / Kafka / pgbouncer** aujourd'hui —
  vérifié (`pom.xml`, `application*.yml`, `src/`). Le seul point commun est
  `spring-boot-starter-websocket`, qui alimente le broker STOMP **interne** de Spring (pas de
  broker externe).
- ActiveMQ et PgBouncer sont d'ailleurs déjà suivis comme des Enablers à part entière :
  [EN07.3 — ActiveMQ persistence KahaDB](pathname:///pivot-docs/backlog/EPIC-infrastructure/ENABLERS/en-activemq)
  et
  [EN07.4 — PgBouncer session mode](pathname:///pivot-docs/backlog/EPIC-infrastructure/ENABLERS/en-pgbouncer).

`docker-compose.prod.yml` couvre donc ce qui existe réellement :

| Service | Rôle | Port publié |
|---------|------|-------------|
| `nginx` | Image `pivot-ui` — gateway API (reverse proxy `/api/` → `pivot-core`) + SPA Angular statique | `:80` (hôte) |
| `pivot-core` | Backend Spring Boot — auth, tenant, équipes, registre modules | aucun (accessible uniquement via `nginx`) |
| `postgres` | Instance unique, schéma `public` uniquement (pas encore de `pilotage`/`agilite`/`collaboratif`) | aucun |
| `redis` | Cache + registre modules | aucun |

Des blocs commentaires dans le fichier marquent précisément où `pivot-pilotage-core`,
`pivot-agilite-core`, `pivot-collaboratif-core`, `activemq` et `pgbouncer` s'intégreront une
fois réels — l'intention de l'AC d'origine n'est pas perdue, seulement non fabriquée par
anticipation.

## Réseaux

Deux réseaux Docker isolés :

- **`pivot-net-app`** — `nginx` ↔ `pivot-core` (et futurs module-cores). Route de sortie
  disponible (nécessaire pour que `pivot-core` atteigne un relai SMTP externe ou un
  fournisseur OIDC).
- **`pivot-net-data`** — `pivot-core` ↔ `postgres`/`redis`. Déclaré `internal: true` : aucune
  route vers l'extérieur, `postgres` et `redis` ne sont joignables que depuis les conteneurs
  attachés à ce réseau.

Aucun port backend ou donnée n'est publié sur l'hôte — tout passe par `nginx:80`. Le compose
de dev (`compose.yml`) publie `5432`/`6379` pour la commodité `psql`/`redis-cli` en local ; la
prod n'en a pas besoin.

**Point d'intégration cross-repo** : `nginx.conf` (repo `pivot-ui`) fait
`proxy_pass http://backend:8080/api/;` — un nom d'hôte **littéral** `backend`. Plutôt que de
renommer le service `pivot-core` en `backend` (perte de clarté partout ailleurs — nom de
conteneur, image, documentation), `docker-compose.prod.yml` déclare un **alias réseau**
`backend` sur `pivot-net-app` pour le service `pivot-core`. Résolution DNS cohérente avec
`nginx.conf` sans modifier le repo `pivot-ui`.

## Health checks

| Service | Vérification | Détail |
|---------|-------------|--------|
| `nginx` | `wget` sur `/` | sert le SPA Angular |
| `pivot-core` | `wget` sur `http://localhost:8080/api/actuator/health` | `server.servlet.context-path=/api` s'applique aussi à Actuator (pas de `management.server.port` séparé aujourd'hui) — **pas** `/actuator/health` |
| `postgres` | `pg_isready -U pivot -d pivot` | image officielle |
| `redis` | `redis-cli ping` | image officielle |

> À noter : [EN04.2](pathname:///pivot-docs/backlog/sprints/sprint-4) (Sprint 4, encore ⬜) déplacera Actuator
> sur un port de management dédié (`:8081`, non routé par `nginx`) — le healthcheck
> `pivot-core` changera de cible à ce moment-là.

## Volumes persistants

- `postgres_data` → `/var/lib/postgresql` (même point de montage que `compose.yml` dev)
- `redis_data` → `/data` (persistance RDB par défaut de l'image `redis:7-alpine` — absente du
  compose de dev, qui n'en a pas besoin)

## Secrets — pas de `.env` en prod

Aucun identifiant en clair dans `docker-compose.prod.yml` ni dans un `.env` committé. Deux
mécanismes selon le service :

### `postgres`

Utilise la convention Docker secrets native de l'image officielle :
`POSTGRES_PASSWORD_FILE=/run/secrets/postgres_password`.

### `pivot-core`

`pivot-core` n'a pas de convention native `_FILE`. Le fichier compose active le support
« config tree » de Spring Boot :

```yaml
environment:
  SPRING_CONFIG_IMPORT: optional:configtree:/run/secrets/
```

Chaque fichier sous `/run/secrets/` devient une propriété Spring, **avec pour clé le nom
exact du fichier** (pas de conversion relaxed-binding automatique pour cette source). Les
noms de cible (`target:`) dans le compose sont donc calés **exactement** sur la clé/placeholder
déjà lu par `pivot-core` :

| Secret (source) | `target:` (nom de fichier monté) | Où c'est lu côté `pivot-core` |
|---|---|---|
| `postgres_password` | `SPRING_DATASOURCE_PASSWORD` | `application.yml` — `password: ${SPRING_DATASOURCE_PASSWORD:pivot}` |
| `mail_password` | `SPRING_MAIL_PASSWORD` | `application.yml` — `password: ${SPRING_MAIL_PASSWORD:}` |
| `otp_secret` | `pivot.auth.otp-secret` | `@Value("${pivot.auth.otp-secret:}")` (`CryptoUtils`, `SessionService`, `AccountDeletionService`) |

Le même secret `postgres_password` est monté deux fois avec des noms de cible différents
(`postgres_password` pour l'image Postgres, `SPRING_DATASOURCE_PASSWORD` pour `pivot-core`) —
une seule valeur, deux points de montage.

Valeurs non sensibles (URL, booléens, `OIDC_ISSUER_URI`...) : variables d'environnement
classiques, pas de secret Docker — un secret ne se justifie que pour un identifiant
confidentiel.

### Générer les fichiers de secrets

```bash
cd pivot-core
mkdir -p secrets
openssl rand -base64 32 > secrets/postgres_password.txt
openssl rand -base64 32 > secrets/otp_secret.txt   # min. 32 caractères, cf. .env.example
echo -n "<mot-de-passe-relai-smtp>" > secrets/mail_password.txt
chmod 600 secrets/*.txt
```

`secrets/*.txt` est ignoré par Git (`.gitignore`) — seuls les gabarits `secrets/*.txt.example`
sont committés.

## Variables d'environnement requises

Le fichier échoue rapidement (`docker compose config` / `up` refuse de démarrer) si l'une de
ces variables n'est pas positionnée — pas de valeur par défaut silencieuse pour un identifiant
qui doit être choisi consciemment en prod :

| Variable | Rôle |
|----------|------|
| `SMTP_HOST` | Relai SMTP réel — **mailpit (dev) n'existe pas en prod** |
| `SMTP_USERNAME` | Identifiant SMTP |
| `PIVOT_MAIL_FROM` | Adresse expéditeur des emails transactionnels |
| `PIVOT_APP_URL` | URL publique du frontend (liens dans les emails) |
| `CORS_ALLOWED_ORIGINS` | Origine(s) autorisée(s) — doit correspondre à `PIVOT_APP_URL` |

Variables optionnelles (valeur par défaut ou vide accepté) : `SMTP_PORT` (587),
`PIVOT_SUPPORT_EMAIL`, `PIVOT_OWNER_MAIL`, `OIDC_ISSUER_URI`, `PIVOT_CORE_VERSION`,
`PIVOT_UI_VERSION` (défaut `latest` — **épingler un tag de release pour un vrai déploiement**,
`latest` ne convient qu'à une première mise en route).

## Déploiement

```bash
cd pivot-core
cp secrets/postgres_password.txt.example secrets/postgres_password.txt   # puis remplacer par une vraie valeur
cp secrets/mail_password.txt.example secrets/mail_password.txt
cp secrets/otp_secret.txt.example secrets/otp_secret.txt

export SMTP_HOST=smtp.exemple.fr
export SMTP_USERNAME=pivot@exemple.fr
export PIVOT_MAIL_FROM=noreply@pivot.exemple.fr
export PIVOT_APP_URL=https://pivot.exemple.fr
export CORS_ALLOWED_ORIGINS=https://pivot.exemple.fr
export PIVOT_CORE_VERSION=1.4.0   # tag de release GHCR, pas "latest" en vrai déploiement
export PIVOT_UI_VERSION=1.2.0

docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
docker compose -f docker-compose.prod.yml ps          # tous les services "healthy"
```

Images tirées de GHCR (`ghcr.io/pivot-platform/pivot-core`, `ghcr.io/pivot-platform/pivot-ui`)
— construites et poussées par le `release.yml` de chaque repo (Semantic Release), pas
construites localement.

## Vérification manuelle post-déploiement

```bash
# Tous les conteneurs "healthy"
docker compose -f docker-compose.prod.yml ps

# SPA servie par nginx
curl -I http://<host>/

# API accessible via nginx (jamais directement sur pivot-core)
curl -I http://<host>/api/auth/password-policy

# Health check pivot-core, depuis l'intérieur du conteneur (pas de port publié)
docker compose -f docker-compose.prod.yml exec pivot-core \
  wget -q -O - http://localhost:8080/api/actuator/health
```

## Limites connues / suites prévues

- **TLS `:443`** — non câblé. `nginx.conf` (repo `pivot-ui`) n'a pas de bloc `listen 443 ssl`
  ni de montage de certificat aujourd'hui ; câbler le TLS nécessite un changement dans
  `pivot-ui` (repo distinct, PR séparée). En attendant, placer un point de terminaison TLS
  (LB cloud, Caddy, autre nginx) devant cette stack.
- **Redis non authentifié** — aucun `spring.data.redis.password` configuré côté `pivot-core`
  aujourd'hui. L'isolation réseau (`pivot-net-data`, aucun port hôte, non joignable depuis
  `nginx`) est le seul contrôle en place. Signalé comme piste de durcissement future, hors
  périmètre EN07.1.
- **[EN07.2 — Secret management Docker secrets](pathname:///pivot-docs/backlog/EPIC-infrastructure/ENABLERS/en-secret-management)**
  — Enabler distinct, en cours en parallèle, qui couvre un terrain proche (rotation des
  secrets, audit `.env.example`) sur le même bloc `secrets:` de `docker-compose.prod.yml`. À
  réconcilier au fil des deux PRs.
- **[EN07.5 — deploy.yml GitHub Actions CI/CD vers prod](pathname:///pivot-docs/backlog/EPIC-infrastructure/ENABLERS/en-deploy-ci)**
  — encore `Stage: Backlog`. Le déploiement automatisé (`docker compose pull && up -d` déclenché
  par CI) n'est pas câblé ; `deploy.yml` reste un `TODO` volontaire tant que cet Enabler n'est
  pas pris.
- **Module-cores** (`pivot-pilotage-core`, `pivot-agilite-core`, `pivot-collaboratif-core`) —
  pas encore de repo. Voir les blocs commentaires dans `docker-compose.prod.yml` pour le
  patron à suivre une fois créés.
