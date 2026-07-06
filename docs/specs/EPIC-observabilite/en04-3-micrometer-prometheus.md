# EN04.3 — Micrometer → export Prometheus (spec figée)

**Gate 5 — SPEC FREEZE.** Figé à Gate 4 = 100/100, avant merge — voir règle d'immutabilité
(`docs/specs/README.md`) : ce document n'est plus réécrit ; tout changement de comportement
ultérieur ajoute un `## Addendum` en fin de fichier plutôt qu'une édition silencieuse.

## Contexte

| Champ | Valeur |
|-------|--------|
| Enabler | [EN04.3](../../backlog/EPIC-observabilite/ENABLERS/en-micrometer-prometheus.md) — Micrometer → export Prometheus |
| Parent | E04 (Observabilité) |
| Repo | `pivot-core` |
| PR | [PIVOT-PLATFORM/pivot-core#157](https://github.com/PIVOT-PLATFORM/pivot-core/pull/157) |
| Branche | `feat/en04-3-micrometer-prometheus` |
| Commit figé | `3d2619ae0961c99728339b1720e2c750853bf909` |
| Gate 4 | 100/100 — `MERGE_AUTONOMOUS` (voir commentaire de PR) |
| PR backlog associée | [PIVOT-PLATFORM/pivot-docs#86](https://github.com/PIVOT-PLATFORM/pivot-docs/pull/86) |

## Spec fonctionnelle

`pivot-core` expose désormais ses métriques applicatives au format Prometheus sur
`/actuator/prometheus`, sur un port de management dédié (`:8081`), séparé du port applicatif
principal (`:8080`). Toute métrique exportée (JVM, HTTP, JDBC, métier) porte deux tags communs
— `application` (nom du service, `spring.application.name`) et `instance` (hostname du
conteneur/host) — permettant de distinguer plusieurs services et plusieurs répliques du même
service dans un même serveur Prometheus centralisé.

Une métrique métier custom, `pivot_module_activations_total`, compte chaque appel réussi
d'activation de module (`ModuleActivationService#activate`), tagué par `module` et `tenant`
(identifiant technique du tenant — jamais de nom/email, cohérent avec la règle du repo :
aucune PII dans un tag de métrique, car Prometheus persiste les séries en clair, sans contrôle
d'accès aussi fin qu'une base applicative).

Les latences HTTP sont exportées sous forme d'histogrammes Prometheus
(`http_server_requests_seconds_bucket`, tagués `uri`/`method`/`status`/`outcome`) plutôt que des
percentiles calculés côté client Micrometer — un choix déterminant pour la fiabilité de
l'agrégation multi-instances : les percentiles client-side ne s'agrègent pas correctement
quand plusieurs répliques du même service sont scrapées séparément, alors que les histogrammes
s'agrègent nativement via `histogram_quantile()` côté PromQL.

Les métriques JVM (heap, GC, threads, classloader) et JDBC (pool HikariCP) sont exportées sans
code applicatif dédié — autoconfiguration Spring Boot/Micrometer dès que le registre Prometheus
(`micrometer-registry-prometheus`) est sur le classpath.

Un fichier `prometheus.yml` (scrape config) est fourni à la racine du repo, prêt à être monté
dans un serveur Prometheus — voir « Écarts vs ACs initiaux » pour le détail de son statut
(aucun conteneur Prometheus n'existe encore dans la stack de déploiement).

## Contrat technique final

### Endpoint

| Endpoint | Port | Path | Format |
|----------|------|------|--------|
| Scrape Prometheus | `8081` (management, séparé du port applicatif `8080`) | `/actuator/prometheus` | texte Prometheus (`text/plain; version=0.0.4`) |

`server.servlet.context-path=/api` ne s'applique **pas** à ce endpoint : le serveur de
management, sur un port distinct, n'hérite pas du context-path du serveur applicatif principal.

### Tags communs (toutes métriques)

| Tag | Valeur | Source |
|-----|--------|--------|
| `application` | `spring.application.name` (`pivot-backend`) | `MetricsConfig#commonTagsCustomizer` (`fr.pivot.config.MetricsConfig`) |
| `instance` | hostname local (fallback `"unknown"` si non résolvable) | `InetAddress.getLocalHost().getHostName()` |

### Métrique custom

| Nom Micrometer | Nom Prometheus exporté | Type | Tags | Émise par |
|----------------|------------------------|------|------|-----------|
| `pivot.module.activations` | `pivot_module_activations_total` | Counter | `module` (id technique du module), `tenant` (id technique, jamais nom/email) | `ModuleActivationService#activate` — à **chaque appel réussi**, y compris un appel redondant sur un module déjà actif (ce n'est **pas** conditionné à une transition d'état réelle, contrairement à `ModuleActivatedEvent` qui reste transition-only) |

Rendu Prometheus vérifié empiriquement (scrape réel d'un `PrometheusMeterRegistry`, hors CI) :

```text
# HELP pivot_module_activations_total
# TYPE pivot_module_activations_total counter
pivot_module_activations_total{application="pivot-backend",instance="...",module="whiteboard",tenant="42"} 2.0
```

### Métriques HTTP

`management.metrics.distribution.percentiles-histogram.http.server.requests=true` — buckets
Prometheus sur `http_server_requests_seconds_bucket`, tags par défaut Spring Boot
(`uri` templatée, `method`, `status`, `outcome`). p50/p95/p99 par endpoint calculés côté
PromQL :

```promql
histogram_quantile(0.95, sum(rate(http_server_requests_seconds_bucket[5m])) by (le, uri))
```

### Métriques JVM / JDBC

Autoconfiguration Spring Boot (`JvmMetricsAutoConfiguration`,
`DataSourcePoolMetricsAutoConfiguration` pour HikariCP) — aucune classe applicative dédiée,
actives dès que le `MeterRegistry` bean existe (apporté par `micrometer-registry-prometheus`).

### Configuration (`application.yml`)

```yaml
management:
  server:
    port: ${MANAGEMENT_SERVER_PORT:8081}
  endpoints:
    web:
      exposure:
        include: health,info,prometheus
  metrics:
    distribution:
      percentiles-histogram:
        http.server.requests: true
```

### Fichiers touchés

| Fichier | Rôle |
|---------|------|
| `pom.xml` | dépendance `io.micrometer:micrometer-registry-prometheus` |
| `src/main/resources/application.yml` | `management.server.port`, `percentiles-histogram` |
| `src/main/java/fr/pivot/config/MetricsConfig.java` | tags communs `application`/`instance` |
| `src/main/java/fr/pivot/core/modules/ModuleActivationService.java` | compteur `pivot.module.activations` sur `activate()` |
| `prometheus.yml` (racine du repo) | scrape config, cible `pivot-core:8081` |
| `README.md` | healthcheck dev pointe désormais `:8081` |

## Écarts vs ACs initiaux

| AC initial | Statut | Écart / note |
|------------|--------|---------------|
| `management.server.port` séparé (:8081) | Livré **par cet Enabler**, pas par EN04.2 | EN04.2 (Spring Actuator) n'avait pas de PR ouverte au moment de l'implémentation d'EN04.3 — le port a été posé directement ici (valeur déjà actée par l'AC d'EN04.2 lui-même), avec une note de réconciliation explicite. EN04.2 devra retrouver cette valeur déjà en place et ne portera que ses concerns propres (base-path, HEALTHCHECK Docker, restriction réseau). |
| Healthcheck Docker EN07.1 | Non résolu par cette PR | EN07.1 (`docker-compose.prod.yml`, PR #149) vérifie aujourd'hui `http://localhost:8080/api/actuator/health` — cible à faire évoluer vers `http://localhost:8081/actuator/health` une fois les deux PR fusionnées. Documenté dans les deux PR et dans `sprints/sprint-4.md`, pas corrigé directement ici (hors branche EN07.1, cross-branche interdit). |
| `prometheus.yml` dans `docker-compose.prod.yml` (EN07.1) | Partiel | EN07.1 ne définit aucun conteneur Prometheus/Grafana (vérifié sur sa diff) — hors périmètre de cet Enabler. `prometheus.yml` livré à la racine du repo, prêt pour un futur serveur Prometheus (Enabler dédié ou stack de supervision plateforme), pas encore intégré dans `docker-compose.prod.yml`. |
| Métriques JVM/HTTP/JDBC | Conformes | Autoconfiguration Spring Boot/Micrometer — aucun écart. |

## Scores

| Gate | Score | Décision |
|------|-------|----------|
| Gate 2 (Coverage) | SonarCloud `new_coverage` 83.3 % (seuil interne 85 → "compléter tests" ; seuil CI/Sonar 80 → `OK`) — écart isolé à la branche `catch (UnknownHostException)` de `MetricsConfig#resolveInstanceId` (fallback défensif non testé, jugé acceptable : reproduire une résolution DNS locale en échec en test unitaire ajouterait de la fragilité pour un bénéfice marginal) | Continuer |
| Gate 4 (Merge confidence) | 100/100 | `MERGE_AUTONOMOUS` |
