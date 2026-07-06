# EN07.1 — Docker Compose production complet

## Contexte

- **US/Enabler source** : [EN07.1](pathname:///pivot-docs/backlog/EPIC-infrastructure/ENABLERS/en-docker-compose-prod) — `docs/backlog/EPIC-infrastructure/ENABLERS/en-docker-compose-prod.md`
- **PR** : [pivot-core#149](https://github.com/PIVOT-PLATFORM/pivot-core/pull/149)
- **Dernier commit au figeage (Gate 4 = 100/100)** : `627a2fd578221360f5ab10fa0ef75c17036e2bc4` — `feat(infra): add docker-compose.prod.yml (EN07.1)`
- **Repo** : `pivot-core` (fichier `docker-compose.prod.yml`, racine du repo)

## Spec fonctionnelle

`docker-compose.prod.yml` décrit la stack de production PIVOT telle qu'elle existe aujourd'hui —
uniquement les services réellement implémentés dans l'organisation à la date du figeage :

1. **Un opérateur** clone/dispose de `pivot-core`, prépare 3 fichiers de secrets locaux
   (`secrets/postgres_password.txt`, `secrets/mail_password.txt`, `secrets/otp_secret.txt` — jamais
   committés) et exporte 5 variables d'environnement obligatoires (`SMTP_HOST`, `SMTP_USERNAME`,
   `PIVOT_MAIL_FROM`, `PIVOT_APP_URL`, `CORS_ALLOWED_ORIGINS`).
2. `docker compose -f docker-compose.prod.yml up -d` tire deux images depuis GHCR
   (`ghcr.io/pivot-platform/pivot-core`, `ghcr.io/pivot-platform/pivot-ui`) et démarre 4 conteneurs :
   `nginx` (gateway + SPA), `pivot-core`, `postgres`, `redis`.
3. Si une variable obligatoire manque, **le démarrage échoue immédiatement** (interpolation Compose
   avec `${VAR:?message}`) — pas de valeur par défaut silencieuse pour un identifiant qui doit être
   choisi consciemment en production.
4. `pivot-core` attend que `postgres` et `redis` soient `healthy` avant de démarrer réellement (Spring
   Boot ne boot qu'une fois les deux dépendances prêtes, via `depends_on: condition: service_healthy`).
   `nginx` attend que `pivot-core` soit `healthy` avant de router du trafic vers lui.
5. Un utilisateur final accède à l'application uniquement via `nginx:80` — la SPA Angular est servie
   directement, et toute requête `/api/**` est relayée en interne vers `pivot-core:8080`. Aucun autre
   point d'entrée réseau n'existe : `pivot-core`, `postgres` et `redis` ne publient aucun port sur
   l'hôte.
6. Si `pivot-core` tombe (health check échoue), `nginx` continue de servir la SPA statique mais les
   appels `/api/**` échouent côté proxy (502/503) — comportement standard nginx `proxy_pass` sans
   configuration de fallback dédiée (non spécifiée par cet Enabler).
7. Les données `postgres` (schéma `public`) et `redis` (cache module registry) survivent à un
   redémarrage de conteneur grâce aux volumes nommés `postgres_data`/`redis_data` — un
   `docker compose down` (sans `-v`) ne perd aucune donnée.
8. Tout conteneur qui crashe redémarre automatiquement (`restart: unless-stopped`), sauf arrêt
   explicite par l'opérateur.

## Contrat technique final

### Services

| Service | Image | Ports publiés | Réseaux | Volumes |
|---------|-------|----------------|---------|---------|
| `nginx` | `ghcr.io/pivot-platform/pivot-ui:${PIVOT_UI_VERSION:-latest}` | `80:80` | `pivot-net-app` | — |
| `pivot-core` | `ghcr.io/pivot-platform/pivot-core:${PIVOT_CORE_VERSION:-latest}` | aucun | `pivot-net-app` (alias `backend`), `pivot-net-data` | — |
| `postgres` | `postgres:18-alpine` | aucun | `pivot-net-data` | `postgres_data:/var/lib/postgresql` |
| `redis` | `redis:7-alpine` | aucun | `pivot-net-data` | `redis_data:/data` |

### Réseaux

- `pivot-net-app` (bridge, route de sortie disponible) — `nginx` ↔ `pivot-core`. `pivot-core` y
  porte un alias `backend` (pour compat avec `proxy_pass http://backend:8080/api/;` dans le
  `nginx.conf` du repo `pivot-ui`, sans modification cross-repo).
- `pivot-net-data` (bridge, `internal: true` — aucune route de sortie) — `pivot-core` ↔
  `postgres`/`redis`.

### Health checks

| Service | Commande | Intervalle / timeout / retries |
|---------|----------|-------------------------------|
| `nginx` | `wget -q -O /dev/null http://localhost:80/` | 10s / 5s / 5 |
| `pivot-core` | `wget -q -O /dev/null http://localhost:8080/api/actuator/health` | 15s / 5s / 5, `start_period: 30s` |
| `postgres` | `pg_isready -U pivot -d pivot` | 10s / 5s / 5 |
| `redis` | `redis-cli ping` | 10s / 5s / 5 |

`pivot-core`'s health check cible `/api/actuator/health` (pas `/actuator/health`) car
`server.servlet.context-path=/api` s'applique aussi à Actuator — aucun `management.server.port`
séparé configuré à ce jour (ce changera avec EN04.2, encore non implémenté au moment du figeage).

### Secrets (Docker secrets, pas de `.env`)

| Secret (`file:`) | Cible montée | Consommateur | Propriété/placeholder Spring résolu |
|---|---|---|---|
| `secrets/postgres_password.txt` | `postgres_password` (défaut) | `postgres` | `POSTGRES_PASSWORD_FILE` (convention native de l'image officielle) |
| `secrets/postgres_password.txt` | `SPRING_DATASOURCE_PASSWORD` | `pivot-core` | `application.yml` : `password: ${SPRING_DATASOURCE_PASSWORD:pivot}` |
| `secrets/mail_password.txt` | `SPRING_MAIL_PASSWORD` | `pivot-core` | `application.yml` : `password: ${SPRING_MAIL_PASSWORD:}` |
| `secrets/otp_secret.txt` | `pivot.auth.otp-secret` | `pivot-core` | `@Value("${pivot.auth.otp-secret:}")` (`CryptoUtils`, `SessionService`, `AccountDeletionService`) |

Mécanisme : `pivot-core` déclare `SPRING_CONFIG_IMPORT=optional:configtree:/run/secrets/` —
chaque fichier sous `/run/secrets/` devient une propriété Spring dont la clé est le nom exact du
fichier (pas de relaxed-binding automatique pour cette source de configuration). Les noms de cible
ci-dessus sont donc choisis pour correspondre **exactement** aux placeholders/clés déjà lus par le
code, sans aucune modification de `pivot-core` (Java) nécessaire pour ce câblage.

### Variables d'environnement requises (fail-fast)

`SMTP_HOST`, `SMTP_USERNAME`, `PIVOT_MAIL_FROM`, `PIVOT_APP_URL`, `CORS_ALLOWED_ORIGINS` — absence
→ `docker compose config`/`up` refuse de démarrer (`${VAR:?message}`). Vérifié en CI
(`compose-validate`) et localement.

### Variables d'environnement optionnelles

`SMTP_PORT` (défaut `587`), `PIVOT_SUPPORT_EMAIL` (défaut `support@pivot.app`), `PIVOT_OWNER_MAIL`
(défaut vide), `OIDC_ISSUER_URI` (défaut vide — non un secret, valeur publique), `PIVOT_CORE_VERSION`
/ `PIVOT_UI_VERSION` (défaut `latest`).

### Validation CI (`ci.yml`, job `compose-validate`)

1. `docker compose -f docker-compose.prod.yml config` avec secrets/variables factices — doit réussir.
2. Script Python : assertion que `nginx`/`pivot-core`/`postgres`/`redis` ont chacun un `healthcheck`,
   et que `pivot-core`/`postgres`/`redis` ne publient aucun `ports:`.

## Écarts vs ACs initiaux

L'AC d'origine de l'Enabler liste des services qui n'existent pas dans l'organisation à la date du
figeage — écart assumé et documenté (Gate 1 self-challenge, voir aussi
`docs/backlog/sprints/sprint-4.md`), pas un oubli :

| AC initial | Statut | Justification |
|---|---|---|
| `pivot-pilotage-core` :8081 | Non implémenté | Repo pas encore créé (« à créer avec le repo », `pivot-platform/CLAUDE.md`) |
| `pivot-agilite-core` :8082 | Non implémenté | Idem |
| `pivot-collaboratif-core` :8083 | Non implémenté | Idem |
| `postgres` — 4 schémas (public/pilotage/agilite/collaboratif) | Partiel — schéma `public` uniquement | Les 3 autres schémas arriveront avec leurs repos respectifs |
| `activemq` :61613/:61617 | Non implémenté | Aucune dépendance ActiveMQ/STOMP-broker dans `pivot-core` aujourd'hui (vérifié `pom.xml`/`application*.yml`/`src/`) — suivi par [EN07.3](pathname:///pivot-docs/backlog/EPIC-infrastructure/ENABLERS/en-activemq) |
| `pgbouncer` :5432 | Non implémenté | Aucune dépendance pgbouncer aujourd'hui — suivi par [EN07.4](pathname:///pivot-docs/backlog/EPIC-infrastructure/ENABLERS/en-pgbouncer) |
| `nginx` — `:443`/TLS | Non implémenté | `nginx.conf` (repo `pivot-ui`) n'a pas de bloc `listen 443 ssl` — nécessite une PR distincte dans `pivot-ui` |

Tous les autres AC (health checks, volumes, `restart: unless-stopped`, réseaux isolés, aucun port
backend exposé, secrets Docker, documentation déploiement) sont implémentés intégralement — voir
table de traçabilité dans la review Gate 4 de la PR.

**Gap connu, hors périmètre AC mais signalé** : Redis tourne sans authentification (aucun
`spring.data.redis.password` configuré côté `pivot-core` à ce jour) — l'isolation réseau
(`pivot-net-data internal: true`, aucun port hôte) est le seul contrôle en place.

**Chevauchement avec un Enabler concurrent** : [EN07.2 — Secret management Docker secrets](pathname:///pivot-docs/backlog/EPIC-infrastructure/ENABLERS/en-secret-management)
était en cours en parallèle au moment du figeage et couvre un terrain proche sur ce même fichier
(rotation des secrets, audit `.env.example`) — à réconcilier entre les deux PRs après coup si
nécessaire (cette spec reflète l'état au commit figé ci-dessus, pas un état futur post-réconciliation).

## Scores

- **Gate 2 (coverage)** : non applicable au sens strict — pas de code Java touché. Couverture
  fonctionnelle assurée par le job CI `compose-validate` (parsing + assertions healthcheck/ports) et
  la procédure de vérification manuelle documentée dans
  [`docs/cicd/docker-compose-prod.md`](pathname:///pivot-docs/cicd/docker-compose-prod).
- **Gate 4 (merge confidence)** : **100/100** — `MERGE_AUTONOMOUS` (voir le commentaire de review sur
  [pivot-core#149](https://github.com/PIVOT-PLATFORM/pivot-core/pull/149) pour le détail du
  breakdown).

## Statut

Figé le 2026-07-06.
