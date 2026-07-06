# EN04.2 — Spring Actuator endpoints

## Contexte

- **Enabler** : `docs/backlog/EPIC-observabilite/ENABLERS/en-actuator.md` (E04 — Observabilité)
- **PR** : `pivot-core` [#158](https://github.com/PIVOT-PLATFORM/pivot-core/pull/158)
  (`feat/en04-2-actuator`)
- **Dernier commit au moment du figeage** : `62e3542` — `feat(backend): EN04.2 - endpoints
  Spring Actuator sur port de management séparé` (commit unique, squash des itérations
  correctives de développement avant passage en Ready)
- **Gate 2 COVERAGE** : 90/100 (7/7 AC couverts — 5 automatiquement par
  `ActuatorManagementEndpointIntegrationTest`, 2 par vérification CI non-JUnit documentée :
  présence de la dépendance dans `pom.xml`, build + healthcheck Docker via le job CI "Docker
  preview image")
- **Gate 4 MERGE_CONFIDENCE** : 100/100 (Autoloop — revue de code multi-agent indépendante,
  effort high, 5 findings réels corrigés avant convergence)

## Spec fonctionnelle

`pivot-core` expose Spring Actuator (`health`, `info`, `metrics`) sur un port de management
strictement séparé du port applicatif, avec une posture de sécurité "réseau uniquement" (pas
d'authentification applicative sur ce port) et une exposition minimale (jamais de wildcard).

Comportement observable :

- **Port applicatif (`:8080`, `context-path=/api`)** : plus aucun endpoint Actuator mappé, quel
  que soit le chemin testé (`/api/actuator/health`, avec ou sans le préfixe `/api`) — `404`.
- **Port de management (`management.server.port`, `:8081` par défaut, sans `context-path`)** :
  - `GET /actuator/health` → `200` (`UP`) ou `503` (`DOWN`) selon l'état réel des dépendances,
    avec le détail par composant toujours visible (`show-details: always`) — pas
    d'authentification requise pour le voir, l'isolation réseau étant le contrôle d'accès
    voulu. Composants standards Spring Boot (`db`, `redis`, `diskSpace`, `ping`, `ssl`, et tout
    autre auto-configuré selon les dépendances présentes, ex. `mail`) — pas de composant dédié
    "broker STOMP" : le WebSocket de PIVOT utilise le broker simple in-process de Spring
    (`spring-boot-starter-websocket`), sans processus externe à surveiller (confirmé par
    `docker-compose.prod.yml`, EN07.1 — aucune dépendance ActiveMQ/RabbitMQ).
  - `GET /actuator/info` → `200`, avec `build.version` (version applicative du `pom.xml`),
    `git.branch` + `git.commit.id` (SHA abrégé) + `git.commit.time`, et `profile.active`
    (profil(s) Spring actif(s), tableau — jamais vide, retombe sur `["default"]` si aucun
    profil n'est explicitement activé).
  - `GET /actuator/metrics` → `200`, liste des métriques disponibles (JVM — ex.
    `jvm.memory.used` — et HTTP — `http.server.requests`, alimentée par les requêtes sur le
    port applicatif *et* le port de management, Micrometer étant partagé entre les deux
    contextes). `GET /actuator/metrics/{nom}` → détail d'une métrique nommée, y compris les
    métriques métier custom déjà enregistrées ailleurs dans le code (ex.
    `pivot.modules.cache.miss`).
  - Tout autre endpoint Actuator auto-configuré mais non listé dans
    `management.endpoints.web.exposure.include` (ex. `/actuator/env`, `/actuator/beans`) →
    `403` — refusé au niveau sécurité, avant même toute tentative de résolution de mapping.

## Contrat technique

### Fichiers introduits / modifiés (`pivot-core`)

| Fichier | Rôle |
|---|---|
| `pom.xml` | Exécution `build-info` sur `spring-boot-maven-plugin` (déjà présent) ; nouveau plugin `git-commit-id-maven-plugin` (`initialize`, génère `git.properties`) |
| `src/main/resources/application.yml` | `management.server.port`, `management.endpoints.web.exposure.include=health,info,metrics`, `management.endpoint.health.show-details=always` |
| `src/main/resources/application-test.yml` | Même bloc `management.*`, profil `test` |
| `src/main/java/fr/pivot/config/ActuatorConfig.java` (nouveau) | `InfoContributor` exposant `profile.active` — seul contributeur custom nécessaire ; version et SHA Git viennent des contributeurs Spring Boot standards une fois les plugins Maven en place |
| `src/main/java/fr/pivot/config/SecurityConfig.java` | Ajoute `/actuator/health`, `/actuator/info`, `/actuator/metrics`, `/actuator/metrics/**` à la liste `permitAll` du filtre principal — voir § Mécanisme ci-dessous pour la raison |
| `Dockerfile` | `EXPOSE 8081`, `curl` (installé avant `USER pivot`), `HEALTHCHECK CMD curl -f http://localhost:8081/actuator/health`, `COPY .git/ .git/` dans le stage builder |
| `compose.yml` (dev) | Publie `8081` (confort développeur) |
| `README.md` | Corrige la ligne "Healthcheck" (chemin + port) |

### Mécanisme — pourquoi la règle de sécurité vit dans `SecurityConfig` (contexte principal)

`management.server.port` distinct de `server.port` fait démarrer Actuator dans un **second
contexte Spring enfant**, avec son propre serveur embarqué (`ManagementContextFactory` /
`ChildManagementContextInitializer`, Spring Boot). Une tentative initiale de sécuriser ce
contexte enfant via son propre bean `SecurityFilterChain` (mécanisme
`@ManagementContextConfiguration`, chargé via
`META-INF/spring/....ManagementContextConfiguration.imports`) s'est révélée être le mauvais
levier : Spring Boot **réutilise verbatim** le `SecurityFilterChain` déjà assemblé du contexte
principal comme filtre du contexte enfant, dès qu'il en détecte un
(`ServletManagementChildContextConfiguration`,
`@ConditionalOnBean(name = "springSecurityFilterChain", search = ANCESTORS)`) — comportement
Spring Boot volontaire, pour qu'un endpoint de management sur un port séparé ne devienne jamais
un contournement accidentel de la sécurité applicative. Un `SecurityFilterChain` dédié au
contexte enfant n'est donc **jamais** le filtre effectivement invoqué par Tomcat pour ce
contexte.

Conséquence : la règle `permitAll` pour `/actuator/health|info|metrics(/**)`  vit dans
`SecurityConfig.filterChain()` (contexte principal), et s'applique de fait aux deux ports —
sans effet sur le port applicatif (plus aucun mapping Actuator là-bas, `404` malgré le
`permitAll`), et c'est la règle qui gouverne réellement le port de management. Liste explicite
plutôt qu'un wildcard `/actuator/**`, pour fermer par défaut tout endpoint qu'une évolution
future ajouterait à `management.endpoints.web.exposure.include` sans mise à jour délibérée ici.

### Isolation réseau — répartition des responsabilités

L'AC "accès restreint au réseau Docker interne" est appliquée à deux niveaux distincts :

- **Niveau Spring (cet Enabler)** : `management.endpoints.web.exposure.include=health,info,metrics`
  (jamais `*`) — principe de moindre exposition côté endpoints réellement exposables.
- **Niveau réseau (EN07.1, `docker-compose.prod.yml`)** : aucun port de management publié côté
  hôte en production. Hors du périmètre de cet Enabler — voir § coordination.

### `/actuator/info` — moindre exposition délibérée sur les métadonnées Git

`management.info.git.mode` reste au défaut Spring Boot (`simple`) plutôt que `full` —
volontairement pas surchargé. `full` republierait l'intégralité brute de `git.properties` sous
`/actuator/info`, y compris `git.build.user.email`, `git.commit.user.email` et
`git.commit.message.full` (adresses email de commit/build, message de commit complet). Le mode
`simple` (branche + SHA abrégé + date de commit) satisfait déjà l'AC "git commit sha" sans ces
champs.

## Écarts vs AC initiaux

- **"`spring-boot-starter-actuator` ajouté dans chaque backend (pivot-core + module-cores)"** —
  portée réduite à `pivot-core` uniquement : les repos `pivot-pilotage-core` /
  `pivot-agilite-core` / `pivot-collaboratif-core` n'existent pas encore
  (`pivot-platform/CLAUDE.md` : "à créer avec le repo"). La dépendance était en réalité **déjà
  présente** dans le `pom.xml` de `pivot-core` avant cet Enabler — seule la configuration
  (port séparé, exposition, sécurité, `/actuator/info`) manquait. Le pattern documenté ici
  (port de management, `permitAll` explicite miroir de l'exposition, `InfoContributor` de
  profil, plugins `build-info` + `git-commit-id-maven-plugin`, `COPY .git/` Dockerfile) est
  directement réutilisable lors de la création des repos module-cores.
- **"`/actuator/health` : composants DB, Redis, STOMP broker (si applicable)"** — pas de
  composant STOMP : confirmé qu'aucun broker externe n'est en jeu (broker simple in-process),
  donc "si applicable" ne s'applique pas aujourd'hui à `pivot-core`.
- **"Accès actuator restreint au réseau Docker interne"** — split en deux couches (Spring +
  réseau), voir § Contrat technique. Le "restreint" effectif (aucun port publié) reste la
  responsabilité d'EN07.1, non mergée au moment du figeage de cette spec.

## Point de coordination ouvert (non résolu au moment du figeage)

`docker-compose.prod.yml` sur `pivot-core` PR [#149](https://github.com/PIVOT-PLATFORM/pivot-core/pull/149)
(EN07.1, toujours ouverte au moment du figeage) cible actuellement
`http://localhost:8080/api/actuator/health` pour son healthcheck du service `pivot-core` — un
chemin qui n'existe plus une fois ce port déplacé (cet Enabler). Chemin correct une fois les
deux PR mergées : `http://localhost:8081/actuator/health` (pas de préfixe `/api` :
`management.server.port` différent n'hérite pas de `server.servlet.context-path`) — valeur déjà
anticipée par le commentaire présent dans PR #149 elle-même. Commentaire de coordination avec
recommandation concrète posté sur PR #149 — à traiter avant que les deux ne soient mergées sur
`main`. Ne remet pas en cause le contrat figé ci-dessus côté `pivot-core` (application Spring) :
seul le câblage `docker-compose.prod.yml` reste à aligner.

## Tests

`ActuatorManagementEndpointIntegrationTest` (`fr.pivot.config`) — contexte Spring complet,
serveurs réels sur ports aléatoires (`@SpringBootTest(webEnvironment = RANDOM_PORT)`, requis
ici : `MockMvc`, utilisé par la majorité des autres tests d'intégration du repo, ne peut pas
atteindre le contexte enfant de management) :

| Test | Comportement vérifié |
|---|---|
| `healthEndpoint_onManagementPort_returnsUpWithComponentBreakdown` | `/actuator/health` sur le port de management → `200`/`503` selon l'état réel (composant `mail` légitimement `DOWN` en CI, pas de mailpit disponible — accepté), `db` et `redis` toujours strictement `UP` |
| `healthEndpoint_isNotExposedOnTheMainApplicationPort` | Port de management ≠ port applicatif ; `/api/actuator/health` sur le port applicatif → `404` |
| `infoEndpoint_onManagementPort_exposesVersionGitShaAndActiveProfile` | `build.version` non vide, `git.commit.id` correspond à un SHA (7 à 40 caractères hexadécimaux), `profile.active` contient `"test"` |
| `metricsEndpoint_onManagementPort_exposesJvmHttpAndCustomMetrics` | `jvm.memory.used` listé, `/actuator/metrics/http.server.requests` et `/actuator/metrics/pivot.modules.cache.miss` (compteur métier existant, déclenché explicitement par le test) → `200` |
| `onlyHealthInfoMetricsAreExposed_envEndpointIsNotReachable` | `/actuator/env` et `/actuator/beans` (auto-configurés mais non exposés) → `403`, refusés avant toute résolution de mapping |

Vérifications manuelles/CI (non couvertes par ce test JUnit) : présence de
`spring-boot-starter-actuator` dans `pom.xml` (revue de diff — déjà présent, non dupliqué) ;
build + `HEALTHCHECK` Docker (job CI "Docker preview image" — construit l'image avec le
`Dockerfile` modifié, ne démarre pas de conteneur réel pour exercer le `curl` du healthcheck).
