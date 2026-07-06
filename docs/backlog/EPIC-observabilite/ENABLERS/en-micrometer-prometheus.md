# EN04.3 — Micrometer → export Prometheus

**Type d'enabler** : observabilité · métriques

**Critères de complétion** :
- [x] `micrometer-registry-prometheus` dans chaque backend — `pivot-core` (autres backends
      inexistants à ce jour, cf. `pivot-platform/CLAUDE.md` : "à créer avec le repo")
- [x] `/actuator/prometheus` expose métriques au format Prometheus scraping
- [x] Tags communs sur toutes les métriques : `application` (nom du service), `instance` (hostname)
- [x] Métriques custom : `pivot_module_activations_total` (counter par module + tenant)
- [x] Métriques JVM : heap, GC, threads, classloader (autoconfiguration Spring Boot/Micrometer)
- [x] Métriques HTTP : latence p50/p95/p99 par endpoint + code HTTP (histogrammes Prometheus,
      `histogram_quantile()` — voir note d'implémentation)
- [x] Métriques JDBC : pool connections (HikariCP metrics, autoconfiguration Spring Boot)
- [x] Prometheus scrape config (`prometheus.yml`) — voir note d'implémentation (emplacement)

**Note d'implémentation — `pivot-core`** (PR `feat/en04-3-micrometer-prometheus`) :

- **Dépendance EN04.2 non résolue au moment de l'implémentation** : EN04.2 (Spring Actuator,
  même sprint) n'avait pas encore de PR ouverte. `management.server.port: 8081` a donc été
  posé directement par cette PR (valeur déjà actée par l'AC d'EN04.2) plutôt que par EN04.2 —
  **à réconcilier** dès qu'EN04.2 est implémenté : un second `management.server.port` différent
  ferait échouer le démarrage Spring Boot. Voir coordination dans `sprints/sprint-4.md`.
- **Impact sur EN07.1** (`docker-compose.prod.yml`, pivot-core PR #149 au moment de
  l'écriture) : ce changement déplace Actuator du port principal (`:8080`, sous `/api`) vers
  `:8081` (racine, sans `/api`) — le healthcheck Docker de `pivot-core` dans EN07.1
  (`http://localhost:8080/api/actuator/health`) doit être mis à jour vers
  `http://localhost:8081/actuator/health` une fois les deux PR fusionnées.
- **`pivot_module_activations_total`** : compté à chaque appel réussi de
  `ModuleActivationService#activate` (pas seulement les transitions d'état réelles —
  contrairement à l'événement `ModuleActivatedEvent`), tag `tenant` = identifiant technique du
  tenant (jamais nom/email — pas de PII dans les tags de métrique).
- **p50/p95/p99 HTTP** : `management.metrics.distribution.percentiles-histogram.http.server.requests`
  plutôt que des percentiles côté client Micrometer — ces derniers ne s'agrègent pas
  correctement entre instances/scrapes ; Prometheus calcule les quantiles via
  `histogram_quantile()` sur les buckets exportés.
- **`prometheus.yml`** : à la racine du repo `pivot-core` (à côté de
  `docker-compose.prod.yml`/`docker-compose.yml`) — EN07.1 ne définit aucun conteneur
  Prometheus (vérifié sur sa diff), donc pas d'intégration dans `docker-compose.prod.yml` à ce
  stade ; ce fichier est prêt à être monté dans un futur serveur Prometheus (Enabler dédié ou
  stack de supervision plateforme).

**Statut** : 🔄 En cours — implémentation complète côté `pivot-core`, PR en cours d'Autoloop

---
Item Type: Enabler · Parent: E04 · Type: observabilité · Module: core · Phase: Socle
Stage: In progress · Priority: Medium
