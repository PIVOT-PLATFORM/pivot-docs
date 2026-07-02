# EN04.3 — Micrometer → export Prometheus

**Type d'enabler** : observabilité · métriques

**Critères de complétion** :
- [ ] `micrometer-registry-prometheus` dans chaque backend
- [ ] `/actuator/prometheus` expose métriques au format Prometheus scraping
- [ ] Tags communs sur toutes les métriques : `application` (nom du service), `instance` (hostname)
- [ ] Métriques custom : `pivot_module_activations_total` (counter par module + tenant)
- [ ] Métriques JVM : heap, GC, threads, classloader
- [ ] Métriques HTTP : latence p50/p95/p99 par endpoint + code HTTP
- [ ] Métriques JDBC : pool connections (HikariCP metrics)
- [ ] Prometheus scrape config (`prometheus.yml`) dans compose.yml prod (EN07.1)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E04 · Type: observabilité · Module: core · Phase: MVP
Stage: Backlog · Priority: Medium
