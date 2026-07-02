# EN03.3 — Cache Redis statut modules TTL 60s

**Type d'enabler** : performance · infrastructure

**Critères de complétion** :
- [ ] Statut modules mis en cache Redis par tenant (clé : `module:status:{tenantId}:{moduleId}`)
- [ ] TTL 60 secondes (configurable via `modules.cache.ttl-seconds`)
- [ ] Invalidation cache sur changement d'activation (event ApplicationEventPublisher)
- [ ] Fallback BDD si Redis indisponible (pas de 500)
- [ ] Métrique Micrometer : cache hit/miss ratio

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E03 · Type: performance · Module: core · Phase: MVP
Stage: Backlog · Priority: Medium
