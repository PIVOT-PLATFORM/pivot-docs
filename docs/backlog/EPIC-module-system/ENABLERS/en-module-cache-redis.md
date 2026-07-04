# EN03.3 — Cache Redis statut modules TTL 60s

**Type d'enabler** : performance · infrastructure

**Critères de complétion** :
- [x] Statut modules mis en cache Redis par tenant (clé : `module:status:{tenantId}:{moduleId}`)
- [x] TTL 60 secondes (configurable via `modules.cache.ttl-seconds`)
- [x] Invalidation cache sur changement d'activation (event ApplicationEventPublisher)
- [x] Fallback BDD si Redis indisponible (pas de 500)
- [x] Métrique Micrometer : cache hit/miss ratio

**Implémentation** : `fr.pivot.core.modules.cache.ModuleActivationCacheService` (pivot-core, branche
`feat/en03-3-module-cache-redis`, base `feat/en03-1-module-registry`) — enveloppe cache-aside de
`ModuleActivationService#isEnabled(Long, String)`. Livré en standalone, à raccorder par EN03.2
(status API) lors du rebase.

**Statut** : ✅ Fait (implémentation backend — TU + TI Testcontainers Redis)

---
Item Type: Enabler · Parent: E03 · Type: performance · Module: core · Phase: MVP
Stage: Review · Priority: Critical
