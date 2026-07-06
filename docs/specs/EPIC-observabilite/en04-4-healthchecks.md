# EN04.4 — Health checks Docker liveness + readiness

## Contexte

- **Enabler** : `docs/backlog/EPIC-observabilite/ENABLERS/en-health-checks.md` (E04 — Observabilité)
- **PR** : `pivot-core` [#162](https://github.com/PIVOT-PLATFORM/pivot-core/pull/162)
  (`feat/en04-4-healthchecks`) + `pivot-ui`
  [#104](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/104)
  (`feat/en04-4-nginx-upstream-healthcheck`)
- **Base non standard (`pivot-core#162`)** : construite dans un worktree fusionnant
  localement (jamais poussé ainsi) les branches non mergées d'EN07.1
  ([#149](https://github.com/PIVOT-PLATFORM/pivot-core/pull/149)) et EN04.2
  ([#158](https://github.com/PIVOT-PLATFORM/pivot-core/pull/158)) — toutes deux Gate 4 =
  100/100 au moment du figeage, mais pas encore fusionnées dans `main`. `docker-compose.prod.yml`
  (EN07.1) et le port de management Actuator (EN04.2) sont des prérequis directs de cet
  Enabler et n'existent pas sur `main` sans elles.
- **Gate 4 MERGE_CONFIDENCE** : convergée en autoloop (voir commentaires de PR pour le détail
  et le breakdown)

## Spec fonctionnelle

Chaque service backend Spring Boot de `docker-compose.prod.yml` est surveillé par un
`HEALTHCHECK` Docker ciblant l'endpoint de santé agrégé, et expose en plus deux endpoints
Actuator dédiés distinguant *liveness* (le processus JVM répond-il ?) de *readiness*
(l'instance peut-elle réellement servir du trafic ?) — distinction canonique dont l'intérêt
est d'éviter qu'une panne **transitoire** d'une dépendance externe (Redis, DB) ne déclenche un
redémarrage de conteneur qui ne réparerait rien.

Comportement observable (port de management `:8081`, EN04.2) :

- `GET /actuator/health` (racine, ciblé par le `HEALTHCHECK` Docker) → agrège tous les
  contributeurs standards (`db`, `redis`, `diskSpace`, `ping`, `ssl`…) plus le contributeur
  custom `flyway` de cet Enabler. `200` (`UP`) ou `503` (`DOWN`) selon l'état réel.
- `GET /actuator/health/liveness` → `livenessState` uniquement. **Toujours `UP` (`200`) tant
  que la JVM répond**, y compris si `db`/`redis`/`flyway` sont en panne — ces derniers n'y
  apparaissent jamais (groupe distinct de la racine).
- `GET /actuator/health/readiness` → `readinessState` + `db` + `redis` + `flyway`. `DOWN`
  (`503`) dès qu'un de ces composants est en panne — reflète la capacité réelle à servir du
  trafic, contrairement à `readinessState` seul (comportement Spring Boot par défaut) qui ne
  réagit qu'à l'état applicatif interne, jamais aux dépendances externes de lui-même.
- nginx (`pivot-ui/nginx.conf`) retourne `503` sur le préfixe `/api/` dès que `pivot-core` est
  injoignable ou ne répond pas dans les 5s (timeouts proxy courts, alignés sur le timing des
  healthchecks) — indépendamment de l'état exact des groupes de santé ci-dessus, par simple
  échec de connexion/réponse HTTP.

## Contrat technique

### Fichiers introduits / modifiés (`pivot-core`)

| Fichier | Rôle |
|---|---|
| `Dockerfile` | `HEALTHCHECK` : `interval=10s`, `retries=3` (était `15s`/`5`, hérité d'un état antérieur à cet Enabler) |
| `docker-compose.prod.yml` | Healthcheck du service `pivot-core` corrigé : `curl` (pas `wget`) sur `http://localhost:8081/actuator/health` (pas `:8080/api/...`, hérité d'un état antérieur à EN04.2), timing `10s`/`5s`/`30s`/`3` |
| `src/main/resources/application.yml` | `management.endpoint.health.probes.enabled=true` (déjà le défaut Spring Boot hors Kubernetes — explicite pour documenter l'intention) ; `management.endpoint.health.group.readiness.include=readinessState,db,redis,flyway` ; `management.endpoint.health.group.liveness.include=livenessState` |
| `src/main/resources/application-test.yml` | Même bloc `group.*`, profil `test` |
| `src/main/java/fr/pivot/config/FlywayHealthIndicator.java` (nouveau) | `HealthIndicator` custom — `DOWN` sur migration `FAILED` ou `PENDING`, `UP` avec le numéro de version schéma sinon |
| `src/main/java/fr/pivot/config/SecurityConfig.java` | Ajoute `/actuator/health/readiness`, `/actuator/health/liveness` à la liste `permitAll` — sous-chemins de `/actuator/health`, non couverts par le pattern exact déjà présent (EN04.2) |
| `README.md` | Mention des deux endpoints dédiés |

### Fichiers modifiés (`pivot-ui`)

| Fichier | Rôle |
|---|---|
| `nginx.conf` | `proxy_pass http://backend:8080/api/;` encapsulé dans un bloc `upstream pivot_core_backend` (`zone` + `max_fails=3 fail_timeout=30s`) ; timeouts proxy 5s ; `proxy_intercept_errors on` + `error_page 502 504 @api_unavailable` → `return 503` |

### Pourquoi les groupes natifs Spring Boot (pas d'endpoint custom)

Vérifié par inspection directe des jars `spring-boot-health`/`spring-boot-jdbc`/
`spring-boot-data-redis` 4.1.0 (pas supposé) :

- `AvailabilityProbesAutoConfiguration` active les groupes `liveness`/`readiness` **par
  défaut, y compris hors Kubernetes** — `@ConditionalOnBooleanProperty(name =
  "management.endpoint.health.probes.enabled", matchIfMissing = true)`, aucune condition
  `@ConditionalOnCloudPlatform` trouvée. Docker Compose (pas d'orchestrateur) est donc déjà
  couvert par le comportement par défaut ; `probes.enabled: true` explicite dans
  `application.yml` ne change rien, documente l'intention.
- `management.endpoint.health.group.<nom>.include` (préfixe confirmé via
  `HealthEndpointProperties`, `@ConfigurationProperties("management.endpoint.health")`)
  étend un groupe déjà créé par les probes plutôt que de l'écraser — `readiness` peut donc
  ajouter `db,redis,flyway` à son seul contributeur par défaut (`readinessState`).
- Noms de clé JSON confirmés par lecture directe des classes : `db`
  (`DataSourceHealthContributorAutoConfiguration`, package
  `org.springframework.boot.jdbc.autoconfigure.health`) et `redis`
  (`DataRedisHealthContributorAutoConfiguration`, package
  `org.springframework.boot.data.redis.autoconfigure.health` — pas de renommage malgré le
  déplacement de package en Spring Boot 4).
- **Aucun contributeur Flyway natif** : `unzip -l` sur `spring-boot-flyway-4.1.0.jar`,
  `spring-boot-actuator-autoconfigure-4.1.0.jar` et `spring-boot-autoconfigure-4.1.0.jar` ne
  contient aucune entrée liée à un health package Flyway. `FlywayHealthIndicator` (bean
  `@Component`, interface `org.springframework.boot.health.contributor.HealthIndicator` —
  package déplacé en Spring Boot 4, API `Health`/`Health.Builder` inchangée) comble ce vide,
  auto-détecté sous la clé `flyway` (nom du bean moins le suffixe conventionnel
  `HealthIndicator`, comportement inchangé du `HealthContributorNameGenerator`).

### Docker `HEALTHCHECK` — pourquoi la racine, pas les groupes dédiés

Le `HEALTHCHECK` Docker (`Dockerfile` + `docker-compose.prod.yml`) cible
`/actuator/health` (racine, agrégat `db`+`redis`+`flyway`+`diskSpace`+…), pas
`/actuator/health/readiness`, bien que ce dernier semble plus proche sémantiquement d'un
healthcheck applicatif. Choix documenté plutôt qu'oubli : Docker Compose (hors Swarm) ne fait
que (1) conditionner `depends_on: condition: service_healthy` et (2) afficher le statut dans
`docker ps` — il ne redémarre jamais un conteneur sur seul échec de healthcheck. Le signal le
plus utile pour ces deux usages est donc le plus englobant (racine), qui correspond aussi au
texte exact de l'AC. Les groupes `liveness`/`readiness` restent exposés séparément pour les
consommateurs qui en ont explicitement besoin (tests de cet Enabler, ops manuel, migration
future vers un orchestrateur type Kubernetes).

### nginx — `max_fails`/`fail_timeout` inertes avec un seul serveur (documenté, pas un bug)

Confirmé via la documentation nginx officielle (recherche, pas supposition) : *"if there is
only a single server in a group, max_fails, fail_timeout and slow_start parameters are
ignored, and such a server will never be considered unavailable"*
([nginx.org](https://nginx.org/en/docs/http/ngx_http_upstream_module.html)). L'upstream
`pivot_core_backend` n'a aujourd'hui qu'un seul serveur (`pivot-core`, aucun module-core
n'existe) — la directive est donc présente (AC) mais sans effet observable tant qu'un
deuxième serveur ne rejoint pas le pool. Le comportement "503 sur panne" **fonctionne dès
aujourd'hui** malgré cela, via un mécanisme indépendant : `proxy_intercept_errors` +
`error_page 502 504` remappe les codes natifs nginx pour un backend mort/injoignable vers
`503`, quel que soit le nombre de réplicas.

## Écarts vs AC initiaux / interprétations documentées

- **"Test : simulation module KO → nginx retourne 503 sur son préfixe · health check global
  dégradé mais pas DOWN"** — AC ambigu à l'implémentation (pas d'US pour clarifier de façon
  synchrone ; décision PO Agent autonome, documentée ici plutôt qu'une interprétation
  silencieuse) :
  - "Simulation module KO" testée avec le seul backend qui existe réellement aujourd'hui
    (`pivot-core`) — la scène multi-module (plusieurs `pivot-xxx-core`, un seul tombe, les
    autres restent up) n'est **pas fabriquée par anticipation**, les repos module-core
    n'existant pas encore (même constat qu'EN07.1/EN04.2/EN04.3).
  - "Health check global dégradé mais pas DOWN" interprété comme *readiness DOWN pendant que
    liveness reste UP* : c'est la distinction canonique liveness/readiness elle-même — une
    panne Redis transitoire fait sortir l'instance du trafic (readiness) sans jamais
    déclencher de redémarrage (liveness), qui ne réparerait pas une panne externe.
- **nginx `max_fails`/`fail_timeout`** — voir § dédié ci-dessus : présent conformément à l'AC,
  effet différé à l'existence d'un second serveur dans le pool, non fabriqué comme
  pleinement actif aujourd'hui.

## Points de coordination ouverts (non résolus au moment du figeage)

- **Rebase post-merge EN07.1/EN04.2** : `pivot-core#162` étant construite sur les commits non
  mergés de #149 et #158, un rebase sera nécessaire dès que l'une des deux atterrit dans
  `main` — attendu sans conflit (fichiers disjoints, à l'exception de `Dockerfile` et
  `docker-compose.prod.yml` que cette PR corrige par-dessus leur contenu, déjà réconcilié
  dans cette branche), à vérifier au moment venu.
- **EN07.5 (`pivot-core` [#155](https://github.com/PIVOT-PLATFORM/pivot-core/pull/155),
  `deploy.yml`)** : sa vérification post-déploiement cible `localhost/api/actuator/health`
  (chemin pré-EN04.2) — cassera une fois #158 mergée (Actuator déplacé sur `:8081`, non
  routé nginx). Commentaire de coordination posté sur #155 ; hors périmètre de cette PR
  (branche/Enabler différents).

## Tests

`FlywayHealthIndicatorTest` (`fr.pivot.config`) — unitaire, `Flyway` mocké :

| Test | Comportement vérifié |
|---|---|
| `health_allMigrationsApplied_returnsUpWithSchemaVersion` | Toutes migrations `SUCCESS` → `UP`, détail `schemaVersion` |
| `health_pendingMigration_returnsDownWithPendingCount` | Une migration `PENDING` → `DOWN`, détail `pendingMigrations` |
| `health_failedMigration_returnsDownWithFailedCount_evenIfAlsoPendingElsewhere` | Une migration `FAILED` (+ une `PENDING`) → `DOWN`, détail `failedMigrations` prioritaire |
| `health_noMigrationsAtAll_returnsUpWithNoneSchemaVersion` | Aucune migration connue → `UP`, `schemaVersion: "none"` |

`HealthLivenessReadinessIntegrationTest` (`fr.pivot.config`) — contexte Spring complet, port
de management aléatoire (même pattern qu'`ActuatorManagementEndpointIntegrationTest`,
EN04.2), Redis dédié via Testcontainers (pas le Redis CI/local partagé — voir
`AbstractIntegrationTest`) :

| Test (ordre imposé, `@Order`) | Comportement vérifié |
|---|---|
| `liveness_isJvmOnly_neverIncludesDependencyComponents` | `/actuator/health/liveness` → `200`/`UP`, ne contient jamais `db`/`redis`/`flyway` |
| `readiness_withDependenciesUp_includesDbRedisFlywayAllUp` | `/actuator/health/readiness` → `200`/`UP`, `db`/`redis`/`flyway` tous `UP` |
| `readiness_goesDown_whenRedisIsKilled_butLivenessStaysUp` | Redis (Testcontainers) arrêté en cours de test → readiness `503`/`DOWN` (composant `redis` `DOWN`), liveness reste `200`/`UP` — le scénario "module KO" de l'AC |

**Limitation d'environnement (transparence)** : Docker indisponible dans le sandbox de
développement (`permission denied`, `sudo` refusé par la politique de permissions) —
`HealthLivenessReadinessIntegrationTest` n'a pu être vérifié que par compilation
(`test-compile`, réussie) localement, son exécution réelle contre Postgres/Redis Testcontainers
est laissée à la CI GitHub Actions (Docker disponible). `FlywayHealthIndicatorTest`
(100% unitaire, pas de Docker) a été exécuté avec succès localement (4/4).

Côté `pivot-ui` : aucun test automatisé pour `nginx.conf` (pas de suite dédiée dans ce repo) —
`nginx -t` n'a pas pu être exécuté localement non plus (pas de Docker, pas de binaire nginx
dans le sandbox) ; syntaxe vérifiée manuellement contre la documentation nginx officielle. Le
job CI "Docker preview image (PR)" confirme que l'image se construit toujours avec ce fichier,
sans valider la syntaxe nginx en tant que telle.
