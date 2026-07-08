# Audit Observabilité — PIVOT Platform

**Statut :** 4.5/10 — v2
**Dernière révision :** 2026-07-08

## Date : 2026-07-08 — v2
## Expert : Expert DevSecOps
## Périmètre : `pivot-core` (référence) + `pivot-pilotage-core` + `pivot-agilite-core` + `pivot-collaboratif-core` — config `application*.yml`, `logback-spring.xml`, code Java (Actuator, `AuditService`/`AuditEvent`, filtres MDC), `pom.xml` (dépendances Micrometer/Actuator), `prometheus.yml`, `docker-compose*.yml`/`compose.yml`, `nginx.conf` (pivot-ui). Frontend (`-ui`) hors périmètre de ce passage (observabilité backend uniquement — logs/métriques/health checks Spring)

---

## Score global : 4.5/10 (premier audit formel)

Premier audit formel du domaine — aucune tendance à comparer. `pivot-core` est un exemple de
référence réellement solide (health groups testés, logs JSON avec MDC, table `audit_events`
riche et bien documentée), mais c'est aujourd'hui le **seul** des quatre backends à implémenter
quoi que ce soit de cette liste : les trois modules `-core` (`pivot-pilotage-core`,
`pivot-agilite-core`, `pivot-collaboratif-core`) n'ont ni health groups dépendant de la BDD/Redis,
ni logs structurés JSON, ni intégration à `audit_events` — pour une raison structurelle
documentée (`fr.pivot:pivot-core-starter` pas encore publié/consommé), pas par négligence. Et
même pour `pivot-core`, qui est le seul backend réellement déployé en production aujourd'hui,
aucun Prometheus/Grafana/Alertmanager n'est branché sur les métriques exposées : c'est de
l'instrumentation pure, sans consommateur en aval.

---

## I. Résumé exécutif

`pivot-core` traite l'observabilité comme une brique de premier ordre : Actuator sur port de
management isolé (EN04.2), groupes `readiness`/`liveness` couvrant réellement `db`/`redis`/
`flyway`, `FlywayHealthIndicator` custom testé, logs JSON via `logstash-logback-encoder` avec
MDC (`requestId`/`tenantId`/`userId`) propagé par `RequestMdcFilter`, et une table `audit_events`
couvrant 33 types d'événements (auth, compte, tenant, module) écrite de façon asynchrone et
résiliente au rollback. C'est un socle de qualité professionnelle.

Mais l'audit portait explicitement sur **pivot-core + tous les modules `-core`**, et sur ce
périmètre élargi le tableau change : aucun des trois modules n'a de logger applicatif
(`pivot-pilotage-core`/`pivot-agilite-core` : zéro occurrence de `LoggerFactory`/`@Slf4j` dans
tout `src/main/java`), aucun n'a de `logback-spring.xml`, aucun n'a de groupe `readiness` incluant
une dépendance externe, et aucun n'écrit dans `audit_events` — la dépendance partagée qui le
permettrait (`pivot-core-starter`) n'est pas encore ajoutée, comme documenté explicitement dans
leurs `pom.xml`. `pivot-collaboratif-core` fait un geste dans cette direction (logs "AUDIT ..."
ad hoc sur les actions du whiteboard) mais via `java.util.logging` brut, hors SLF4J/MDC/JSON, avec
un TODO explicite renvoyant à un enabler dédié (`EN30.9.5`).

Enfin, `prometheus.yml` (scrape config bien documentée) n'est chargé par **aucun** `docker-compose`
(ni dev, ni prod) — il n'existe nulle part sur la plateforme de conteneur Prometheus, Grafana ou
Alertmanager. Les métriques `http.server.requests` avec buckets d'histogramme pensés pour PromQL
(p50/p95/p99) sont exposées mais jamais lues par personne. En cas d'incident aujourd'hui, la seule
détection possible est un poll manuel de `/actuator/health` ou un signalement utilisateur.

---

## II. Analyse par axe

### Axe A — Health checks / Spring Actuator (score : 6.5/10 pour `pivot-core` seul · 2.5/10 sur le périmètre élargi)

**`pivot-core` (référence)** — `pivot-core/src/main/resources/application.yml:107-176` :
- `management.server.port: 8081`, séparé du port applicatif `8080` (`server.port`), **non publié**
  en prod (`docker-compose.prod.yml` : le service `pivot-core` n'a pas de bloc `ports:` du tout —
  seul `nginx` en a un) — isolation réseau réelle, pas seulement documentée.
- Groupe `readiness` : `readinessState,db,redis,flyway` (ligne 154) — inclut réellement les
  dépendances externes dont l'app a besoin pour servir du trafic, pas seulement l'état interne JVM.
- Groupe `liveness` : `livenessState` seul (ligne 162) — sépare correctement "processus JVM en vie"
  de "dépendances externes disponibles", cohérent avec la sémantique K8s même si l'app ne tourne
  pas encore sur K8s.
- `FlywayHealthIndicator` custom (`pivot-core/src/main/java/fr/pivot/config/FlywayHealthIndicator.java`)
  car Spring Boot 4.1 n'en fournit aucun nativement (documenté en commentaire) — testé par
  `FlywayHealthIndicatorTest.java` et `HealthLivenessReadinessIntegrationTest.java`
  (`pivot-core/src/test/java/fr/pivot/config/`).
- `timeout: 2s` sur Redis (Lettuce) pour que la readiness échoue vite plutôt qu'après le défaut
  60s — découvert et corrigé via test d'intégration (commentaire `application.yml:44-52`).
- `show-details: always` — choix justifié et documenté par l'isolation réseau du port 8081
  (ligne 124-134), pas un défaut non réfléchi.

**Les trois modules `-core`** — `pivot-{pilotage,agilite,collaboratif}-core/src/main/resources/application.yml` :
- **Aucun** ne définit `management.server.port` — Actuator reste sur le même port que l'API REST
  publique (`8081`/`8082`/`8083`), déjà proxyée publiquement par nginx (`pivot-ui/nginx.conf`,
  blocs `location /api/pilotage/`, `/api/agilite/`, `/api/collaboratif/`) **sans exclusion
  explicite d'un préfixe `/actuator`**. `docker-compose.prod.yml` (lignes ~« Port convention »,
  bloc commenté "Module-core services — NOT wired yet") documente déjà l'intention d'un port de
  management dédié (`9081`/`9082`/`9083`) pour ces modules — mais **aucun des trois
  `application.yml` réels ne l'implémente aujourd'hui**. Le jour où ces services seront
  décommentés dans `docker-compose.prod.yml` (actuellement en attente), Actuator serait exposé
  au même titre que l'API publique.
- **Aucun** ne définit de groupe `readiness`/`liveness` custom (`pivot-pilotage-core/application.yml:47-54`,
  `pivot-agilite-core/application.yml:39-46`, `pivot-collaboratif-core/application.yml:55-62`) —
  seuls `management.endpoints.web.exposure.include: health,info,prometheus` et
  `show-details: when_authorized` sont définis. Sans le `include: readinessState,db,redis,flyway`
  que `pivot-core` documente explicitement comme nécessaire (`application.yml:144-154` de
  `pivot-core`), le groupe `readiness` par défaut de Spring Boot reste limité à `readinessState`
  (état applicatif interne) — la readiness resterait `UP` même si Postgres ou Redis est
  injoignable pour ce module. À vérifier par un test d'intégration dédié (aucun n'existe
  aujourd'hui côté modules — voir Axe A, finding OBS-008).
- **Aucun** n'a de `FlywayHealthIndicator` (ou équivalent) — même en ajoutant `flyway` au groupe
  `readiness`, rien n'exposerait cet état.
- `show-details: when_authorized` (plus prudent que le `always` de `pivot-core`) est cependant une
  configuration **sans effet réel** aujourd'hui : aucun des trois modules n'a de dépendance
  `spring-boot-starter-security` (vérifié dans les trois `pom.xml`), ni de classe
  `SecurityConfig`, ni la dépendance `pivot-core-starter` qui porterait la sécurité partagée —
  documenté explicitement dans `pivot-collaboratif-core/pom.xml:46-55` ("PAS ENCORE AJOUTÉ").
  Sans couche d'authentification, il n'y a aujourd'hui aucun principal à autoriser — l'angle
  sécurité plus large (absence totale d'auth sur ces 3 API) relève de `audit-cyber`, mais l'angle
  observabilité (ce paramètre de santé n'a aucun effet gate aujourd'hui) est noté ici.
- `management.endpoints.web.exposure.include` omet `metrics` (présent chez `pivot-core`) —
  asymétrie mineure (Axe D / OBS-009).

### Axe B — Logs structurés JSON (score : 8/10 pour `pivot-core` seul · 2/10 sur le périmètre élargi)

**`pivot-core`** — `pivot-core/src/main/resources/logback-spring.xml` : `LogstashEncoder` actif
par défaut sur tout profil `!test` (JSON en dev et en prod, pas seulement en prod — choix
documenté en tête de fichier), profil `test` gardé en texte lisible pour la CI/`mvn test`.
`RequestMdcFilter.java` (`pivot-core/src/main/java/fr/pivot/config/RequestMdcFilter.java`) peuple
`requestId`/`tenantId`/`userId` dans le MDC SLF4J, avec :
- Sanitisation CR/LF du `X-Request-Id` entrant (CWE-117 log forging, lignes 108-116) et troncature
  128 caractères ;
- `MDC.clear()` en `finally` (thread-pool safety, lignes 92-96) ;
- Choix documenté de logger `tenantId`/`userId` en clair (clés numériques internes, pas des
  données personnelles) plutôt qu'un hash — cohérence explicite avec le reste du code
  (`TokenService`, `AuditService`, `ModuleActivationService`).
- Convention `LOG.info("event=SUPERADMIN_TENANT_DEACTIVATED tenantId={} actorId={}", ...)`
  observée dans `SuperAdminTenantController.java:184-185` — clé=valeur cohérente avec le JSON
  produit par l'encodeur, bonne pratique reproductible.

**Les trois modules `-core`** :
- `pivot-pilotage-core` et `pivot-agilite-core` : **zéro** occurrence de `LoggerFactory`/`@Slf4j`
  dans tout `src/main/java` (grep confirmé). Aucun `logback-spring.xml`. Il n'existe donc
  aujourd'hui **aucun log applicatif** dans ces deux modules — seuls les logs internes du
  framework Spring Boot apparaissent, en texte brut, sans MDC, sans corrélation `requestId`.
- `pivot-collaboratif-core` : pas de `logback-spring.xml` non plus (donc pas de JSON), mais le
  module émet des lignes "AUDIT ..." pour les actions d'état du whiteboard
  (`BoardService.java:160,184`, `BoardMemberService.java:107,142`, `BoardShareService.java:109,144`,
  `BoardJoinService.java:136`) via une méthode privée `logAuditEvent(...)`
  (`BoardService.java:232-239`) qui appelle **`java.util.logging.Logger`** directement — pas
  SLF4J. Spring Boot ne fait pas de pont JUL→SLF4J actif par défaut sans configuration
  explicite : ces lignes contournent à la fois l'absence de `logback-spring.xml` *et* le futur
  encodeur JSON s'il était ajouté, et n'héritent d'aucun MDC (`requestId`/`tenantId`/`userId`)
  puisque ce module n'a pas non plus de `RequestMdcFilter`. Le code documente lui-même la limite
  (`BoardService.java:224` : `TODO: persist via centralized audit service (EN30.9.5)`).
- Aucune corrélation cross-service possible aujourd'hui : un incident touchant à la fois
  `pivot-core` et `pivot-collaboratif-core` (ex. un flux de partage de tableau) ne peut pas être
  suivi par un même `X-Request-Id` dans les deux jeux de logs, puisque seul `pivot-core` le lit/
  l'écrit.

### Axe C — Couverture `audit_events` (score : 8/10 pour `pivot-core` seul · 3/10 sur le périmètre élargi)

**`pivot-core`** — table `audit_events` (`db/migration/V1__schema_init.sql:278-300`, index sur
`user_id`/`event_type`/`created_at`), entité `AuditEvent.java`, service
`AuditService.java` (`pivot-core/src/main/java/fr/pivot/auth/service/AuditService.java`) : écriture
**asynchrone** dans une transaction `REQUIRES_NEW`, dispatchée après complétion (commit **ou**
rollback) de la transaction appelante — un événement d'échec (`LOGIN_FAILED`,
`CHANGE_PASSWORD_FAILED`...) est donc bien persisté même si la méthode appelante lève une
exception juste après (lignes 62-111, bien documenté).

33 types d'événements réellement émis (constantes `AuditService.java:114-196`, tous confirmés
appelés par au moins un site dans le code — voir grep `auditService.log(...)`) :
- **Auth** : `REGISTER`, `LOGIN`, `LOGIN_FAILED`, `LOGOUT`* (constante déclarée, pas de site
  d'appel trouvé — voir note ci-dessous), `EMAIL_VERIFIED`, `PASSWORD_RESET_REQUEST`,
  `PASSWORD_RESET`, `CHANGE_PASSWORD`, `CHANGE_PASSWORD_FAILED`, `GOOGLE_LINKED`,
  `DEVICE_OTP_SENT`, `DEVICE_VERIFIED`, `DEVICE_OTP_FAILED`, `OIDC_LOGIN`,
  `EMAIL_CHANGE_REQUESTED`, `EMAIL_CHANGE_DUPLICATE_ATTEMPT`, `EMAIL_CHANGE_CONFIRMED`,
  `EMAIL_CHANGE_TARGET_TAKEN`, `SUSPICIOUS_LOGIN_DETECTED`, `SUSPICIOUS_LOGIN_NOT_ME_FAILED`,
  `SUSPICIOUS_LOGIN_NOT_ME_CONFIRMED`.
- **Modules** (admin) : `MODULE_ACTIVATED`, `MODULE_DEACTIVATED`, `MODULE_OVERRIDE_SET`,
  `MODULE_OVERRIDE_REMOVED` — couvre exactement le point d'attention initial ("activation/
  désactivation module").
- **Compte** : `PROFILE_UPDATED`, `AVATAR_UPDATED`, `DATA_EXPORT_REQUESTED`, `ACCOUNT_DELETED`,
  `ACCOUNT_DELETION_OTP_SENT`, `ACCOUNT_DELETION_CANCELLED`, `ACCOUNT_ANONYMIZED`.
- **Tenant/rôles** (admin) : `TENANT_CREATED`, `TENANT_CREATION_RATE_LIMIT_EXCEEDED`,
  `TENANT_DEACTIVATED`, `USER_ROLE_CHANGED`, `USER_DEACTIVATED`, `USER_REACTIVATED` — couvre
  également "changement de rôle" cité dans le contexte initial de cet audit.

  \* Note : `LOGOUT` est déclarée (`AuditService.java:117`) mais aucun appel `auditService.log(...,
  AuditService.LOGOUT, ...)` n'a été trouvé dans le code actuel — événement défini mais non câblé
  (à vérifier/corriger, impact mineur).

**Ce qui n'est PAS couvert** :
- Aucun des trois modules `-core` n'écrit dans `audit_events` — techniquement impossible
  aujourd'hui : `pivot-core-starter` (qui exporterait `AuditService`/l'accès au schéma `public`)
  n'est pas encore une dépendance ajoutée dans leurs `pom.xml` (confirmé absent dans les trois,
  raison documentée dans `pivot-collaboratif-core/pom.xml:46-55`). Ce n'est donc pas un oubli
  ponctuel mais une dépendance de séquencement multi-repo (`EN17.x`) déjà identifiée par l'équipe.
- `pivot-collaboratif-core` a, en attendant, ses propres événements "audit-shaped" côté whiteboard
  (`BoardRenamed`, `BoardDeleted`, `BoardShared`, `BoardShareRevoked`, `MemberRoleUpdated`,
  `MemberRemoved`, `BoardJoined`) — non persistés, seulement loggés (voir Axe B) — avec un enabler
  de centralisation déjà tracé (`EN30.9.5`, référencé dans
  `pivot-docs/docs/backlog/EPIC-collaboration/FEATURES/crud-tableaux/us-renommer-tableau.md:38`).
  C'est un signal positif (le gap est connu et planifié) mais un gap réel aujourd'hui.
- Aucune configuration OIDC tenant (`TenantOidcConfig`, cité dans `pivot-core/CLAUDE.md`) ne
  semble avoir d'événement d'audit dédié dans la liste de constantes actuelle — à confirmer/
  combler si une US de gestion OIDC par tenant existe déjà côté admin.
- Aucune surface applicative pour **consulter** `audit_events` en cas d'incident : le seul
  consommateur trouvé dans le code est `DataExportService`/`ExportAuditEventDto`
  (`pivot-core/src/main/java/fr/pivot/account/service/DataExportService.java`), qui inclut les
  événements d'un utilisateur dans **son propre** export RGPD (Art. 20) — un usage côté droits de
  la personne, pas un outil d'investigation pour l'équipe DevSecOps. Aucun `AuditController` ni
  écran admin (`pivot-ui`) trouvé pour parcourir la table en cas d'incident : accès SQL direct
  uniquement.

### Axe D — Dashboards / alerting réellement branchés (score : 1.5/10, tous repos confondus)

- `pivot-core/prometheus.yml` est une config de scrape **bien pensée et bien commentée**
  (`scrape_interval: 15s`, cible `pivot-core:8081/actuator/prometheus`, blocs commentés prêts à
  décommenter pour les 3 modules) — mais elle n'est chargée par **aucun** fichier compose du
  dépôt : ni `compose.yml` (dev), ni `docker-compose.prod.yml` (prod) ne déclarent de service
  `prometheus`. Le fichier documente lui-même cet état ("EN04.3... deliberately does NOT include
  a Prometheus server container... out of scope for that Enabler").
- Aucune trace de Grafana ni d'Alertmanager nulle part sur la plateforme (recherche exhaustive
  sur les 8 repos : aucun fichier `*grafana*`, aucun `alertmanager*`).
- Les blocs de scrape pour les modules dans `prometheus.yml` sont désormais **obsolètes dans leur
  prémisse** : ils sont commentés au motif que "pivot-pilotage-core, pivot-agilite-core,
  pivot-collaboratif-core don't exist as repos yet" — or les trois existent maintenant
  (bootstrappés), donc ce commentaire n'a pas été mis à jour depuis leur création.
- `management.metrics.distribution.percentiles-histogram.http.server.requests: true`
  (`pivot-core/application.yml:163-170`) est une configuration réfléchie pour des requêtes PromQL
  `histogram_quantile` — mais sans serveur Prometheus, cette configuration ne produit
  aujourd'hui aucune valeur exploitable pour qui que ce soit.
- **Conclusion de l'axe** : 100% instrumentation, 0% exploitation. `pivot-core` est le seul
  service réellement déployé en production actuellement (`docker-compose.prod.yml`), et même
  celui-ci n'a aujourd'hui aucune alerte configurée sur une dégradation (readiness `DOWN`,
  latence `p95` en hausse, taux d'erreur 5xx) — la détection d'incident repose entièrement sur
  `healthcheck` Docker (redémarrage de dépendance seulement, pas d'alerte humaine) ou sur un
  signalement utilisateur.

---

## Statut des findings/dettes historiques

N/A — premier audit formel du domaine observabilité (aucun rapport antérieur avec score réel à
confronter ; le "v1" du fichier était une initialisation de scaffolding, pas un audit publié, cf.
`skill-audit-format.yaml`, `principes_generaux.regle_historique`).

| # | Item | Statut | Preuve |
|---|------|--------|--------|
| — | N/A | N/A | Aucun historique antérieur — ce rapport est le premier passage formel |

---

## Bonnes pratiques confirmées / Points forts

| # | Pratique | Preuve |
|---|----------|--------|
| 1 | Health groups `readiness`/`liveness` correctement séparés sémantiquement (dépendances externes vs process JVM), documentation inline expliquant *pourquoi*, pas seulement *quoi* | `pivot-core/application.yml:143-162` |
| 2 | `FlywayHealthIndicator` custom écrit pour combler un vrai manque Spring Boot 4.1, et testé | `pivot-core/src/main/java/fr/pivot/config/FlywayHealthIndicator.java` + `FlywayHealthIndicatorTest.java` |
| 3 | Timeout Redis réduit (2s) découvert et corrigé via test d'intégration dédié plutôt que laissé au défaut Lettuce (60s) | `pivot-core/application.yml:44-52`, `HealthLivenessReadinessIntegrationTest.java` |
| 4 | Port de management isolé et **non publié** en prod — isolation réseau réelle, pas juste un `show-details` défensif | `docker-compose.prod.yml` (service `pivot-core`, absence de bloc `ports:`) |
| 5 | Logs JSON par défaut y compris en dev (pas seulement une bascule "prod"), MDC avec anti-log-forging (CWE-117) et purge systématique en `finally` | `pivot-core/logback-spring.xml`, `RequestMdcFilter.java:108-116,92-96` |
| 6 | `AuditService` résilient au rollback (dispatch en `afterCompletion`, pas `afterCommit`) — les échecs de sécurité (mot de passe erroné, OTP invalide) restent audités même si la transaction appelante échoue | `AuditService.java:62-111` |
| 7 | Couverture `audit_events` déjà large et alignée sur les besoins RGPD/sécurité réels (module toggle, changement de rôle, désactivation compte/tenant, connexions suspectes) | `AuditService.java:114-196`, sites d'appel confirmés par grep |
| 8 | Gap de centralisation de l'audit whiteboard **déjà connu et tracé** par l'équipe (pas une découverte de cet audit) — signe de maturité process malgré le gap technique | `EN30.9.5`, `us-renommer-tableau.md:38`, TODO explicite `BoardService.java:224` |
| 9 | `prometheus.yml` anticipe déjà la convention de port de management par module et documente honnêtement ce qui n'est pas encore câblé, plutôt que de fabriquer une config qui semblerait fonctionner | `pivot-core/prometheus.yml` (en-tête + blocs commentés) |

---

## Score par grille (couverture logs structurés/métriques/health checks, exploitabilité en incident)

| Catégorie | Score | Findings/dette actifs |
|-----------|-------|------------------------|
| Health checks / Actuator (readiness, liveness, isolation réseau) | 2.5/10 (périmètre élargi) · 6.5/10 (`pivot-core` seul) | OBS-001, OBS-002 |
| Logs structurés JSON + corrélation (MDC/`requestId`) | 2/10 (périmètre élargi) · 8/10 (`pivot-core` seul) | OBS-003 |
| Couverture `audit_events` (événements métier sensibles) | 3/10 (périmètre élargi) · 8/10 (`pivot-core` seul) | OBS-004, OBS-007 |
| Dashboards/alerting réellement branchés | 1.5/10 (tous repos) | OBS-005, OBS-006, OBS-009 |
| Testabilité de la config observabilité (CI) | 2/10 (périmètre élargi) · 9/10 (`pivot-core` seul) | OBS-008 |

---

## Plan d'action

### P0 — bloquant opérabilité prod (aucune détection d'incident automatisée aujourd'hui)

- **OBS-005** — Déployer a minima un serveur Prometheus scrapant `pivot-core:8081/actuator/prometheus`
  (config déjà prête, `prometheus.yml`) sur le réseau Docker `pivot-net-app`/dédié monitoring, +
  une alerte basique (ex. `up == 0` ou `/actuator/health` `DOWN`) vers un canal humain (email/Slack).
  `pivot-core` est le seul service en prod aujourd'hui — c'est le gap qui affecte réellement la
  prod actuelle, contrairement aux findings modules ci-dessous (services pas encore déployés).

### P1 — avant le prochain déploiement des modules `-core` (dette majeure, pas encore live)

- **OBS-001** — Ajouter `management.endpoint.health.group.readiness.include: readinessState,db,redis`
  (+ `flyway` une fois l'indicateur custom porté) et `group.liveness.include: livenessState` dans
  les trois `application.yml` modules, alignés sur `pivot-core`. Écrire un test d'intégration
  équivalent à `HealthLivenessReadinessIntegrationTest` par module.
- **OBS-002** — Ajouter `management.server.port` dédié (`9081`/`9082`/`9083`, déjà la convention
  documentée dans `docker-compose.prod.yml`) dans les trois `application.yml`, et **ne pas
  publier** ce port dans `docker-compose.prod.yml` au moment où ces services y seront décommentés
  — répliquer l'isolation réseau de `pivot-core`. Vérifier concrètement (test manuel ou TI) que
  `/actuator/**` n'est pas atteignable via un préfixe nginx `/api/{module}/actuator/...` une fois
  ce changement fait.
- **OBS-003** — Porter `logback-spring.xml` + `logstash-logback-encoder` + un `RequestMdcFilter`
  équivalent dans les trois modules — priorité `pivot-collaboratif-core` (remplacer les appels
  `java.util.logging.Logger` de `logAuditEvent` par un logger SLF4J structuré).
- **OBS-004** — Prioriser la publication de `fr.pivot:pivot-core-starter` (`EN17.x`) qui débloque
  l'intégration `AuditService`/`audit_events` pour les modules ; en attendant, faire persister les
  événements `BoardRenamed`/`BoardDeleted`/`BoardShared`/`BoardShareRevoked`/`MemberRoleUpdated`/
  `MemberRemoved`/`BoardJoined` de `pivot-collaboratif-core` dans une table d'audit locale au
  schéma `collaboratif` plutôt que de les laisser en logs uniquement, si `EN30.9.5` doit attendre
  le starter.

### P2 — sprint suivant / planifiable

- **OBS-006** — Ajouter `micrometer-registry-prometheus` au `pom.xml` des trois modules (actuellement
  absent alors que `prometheus` figure déjà dans `management.endpoints.web.exposure.include`) —
  sans cette dépendance, `/actuator/prometheus` ne s'active pas malgré la config ; à confirmer par
  un appel réel une fois un module démarré.
- **OBS-007** — Exposer un endpoint admin (`/api/superadmin/audit-events` ou équivalent, filtré par
  tenant/type/date) pour que l'équipe puisse investiguer un incident sans accès SQL direct.
- **OBS-008** — Ajouter des tests santé/readiness dédiés dans les trois modules (0 aujourd'hui,
  vs 2 classes dans `pivot-core`).
- Câbler un événement `AuditService.LOGOUT` réel (constante déclarée mais aucun site d'appel
  trouvé) ou la retirer si le flux logout ne le justifie pas.

### P3 — qualité continue

- **OBS-009** — Ajouter `metrics` à `management.endpoints.web.exposure.include` des trois modules
  (actuellement `health,info,prometheus` seulement, vs `health,info,metrics,prometheus` chez
  `pivot-core`) pour la parité de surface de debug.
- Mettre à jour le commentaire d'en-tête de `prometheus.yml` (le "don't exist as repos yet" sur
  les modules est obsolète depuis leur bootstrap) une fois OBS-002 traité et les jobs décommentés.

### Externe

Aucun — l'ensemble des findings est sous contrôle direct de l'équipe (pas de dépendance à un
prestataire externe pour ce domaine).

---

## Conclusion

**Verdict : dette maîtrisée mais réelle, pas bloquant absolu.** `pivot-core`, seul service
réellement en production, dispose d'une base d'observabilité solide et testée — le principal
manque le concernant est l'absence de tout consommateur (Prometheus/Grafana/Alertmanager) pour
les métriques déjà bien exposées (P0). Les trois modules `-core`, encore non déployés en
production (absents de `docker-compose.prod.yml`, blocs commentés), n'ont aujourd'hui aucune des
briques d'observabilité de `pivot-core` — mais ce n'est pas un oubli silencieux : la cause
(dépendance `pivot-core-starter` non encore publiée) et au moins un des gaps (`audit_events`
whiteboard) sont déjà documentés et tracés par l'équipe elle-même. La réserve principale : si ces
trois modules étaient décommentés dans `docker-compose.prod.yml` **sans** traiter P1 au préalable,
la plateforme gagnerait trois nouveaux backends de production sans health check dépendant de la
BDD, sans logs exploitables, sans piste d'audit — le sujet doit être traité avant ce moment, pas
après.

---

*Expert DevSecOps — 2026-07-08 — indépendant — distribution restreinte*

---

## Historique des révisions

| Version | Date | Score | Évolutions principales |
|---|---|---|---|
| v1 | 2026-07-08 | — | Initialisation |
| v2 | 2026-07-08 | 4.5/10 | Premier audit formel réel. `pivot-core` confirmé comme référence solide et testée (health groups, logs JSON+MDC, `audit_events` 33 types) mais seul backend à implémenter quoi que ce soit de ce domaine — les 3 modules `-core` n'ont ni health groups dépendants (OBS-001), ni isolation du port management (OBS-002), ni logs structurés (OBS-003), ni intégration `audit_events` (OBS-004), pour une raison structurelle documentée (`pivot-core-starter` non publié). Aucun Prometheus/Grafana/Alertmanager déployé nulle part (OBS-005) — instrumentation sans consommateur, y compris pour `pivot-core` en prod. 5 findings HIGH, 3 MEDIUM, 1 LOW, 0 CRITIQUE. |
