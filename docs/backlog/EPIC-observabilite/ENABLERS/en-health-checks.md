# EN04.4 — Health checks Docker liveness + readiness

**Type d'enabler** : observabilité · déploiement

**Critères de complétion** :
- [ ] Chaque service backend dans `docker-compose.prod.yml` : `HEALTHCHECK CMD curl -f http://localhost:8081/actuator/health || exit 1`
- [ ] `start_period: 30s` · `interval: 10s` · `timeout: 5s` · `retries: 3`
- [ ] nginx `upstream` configuré avec `max_fails=3 fail_timeout=30s` — module KO retiré du pool automatiquement
- [ ] Endpoint `/actuator/health/readiness` séparé de `/actuator/health/liveness`
  - liveness : JVM up
  - readiness : DB connectée + Redis connecté + Flyway migrations OK
- [ ] Test : simulation module KO → nginx retourne 503 sur son préfixe · health check global dégradé mais pas DOWN

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E04 · Type: observabilité · Module: core · Phase: MVP
Stage: Backlog · Priority: Critical
