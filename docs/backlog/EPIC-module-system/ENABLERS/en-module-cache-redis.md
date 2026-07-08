# EN03.3 — Cache Redis statut modules TTL 60s

**Type d'enabler** : performance · infrastructure

**Critères de complétion** :
- [x] Statut modules mis en cache Redis par tenant (clé : `module:status:{tenantId}:{moduleId}`)
- [x] TTL 60 secondes (configurable via `modules.cache.ttl-seconds`)
- [x] Invalidation cache sur changement d'activation (event ApplicationEventPublisher)
- [x] Fallback BDD si Redis indisponible (pas de 500)
- [x] Métrique Micrometer : cache hit/miss ratio

**Implémentation** : `fr.pivot.core.modules.cache.ModuleActivationCacheService` (pivot-core, mergé
sur `main` via PR #121, `feat/en03-3-module-cache-redis`, base `feat/en03-1-module-registry`) —
enveloppe cache-aside de `ModuleActivationService#isEnabled(Long, String)`.

**Non raccordé** : le endpoint `GET /api/modules/{id}/status` livré par EN03.2 (PR pivot-core #123)
n'utilise pas ce cache — la description de la PR #123 le confirme explicitement (« le cache Redis
EN03.3 est un sujet séparé, non traité ici »), et ce endpoint répond `Cache-Control: no-store`
sans passer par Redis. Le service de cache existe et est testé en standalone, mais son branchement
sur le chemin de lecture réel du statut module reste un gap technique à traiter (item de suivi
technique, hors périmètre de re-synchronisation de ce fichier).

**Statut** : ✅ Fait (implémentation backend standalone — TU + TI Testcontainers Redis) — ⚠️ non
consommé par l'API status en production

---
Item Type: Enabler · Parent: E03 · Type: performance · Module: core · Phase: Socle
Stage: Done · Priority: Critical
Gate 5 : `pivot-core` PR [#121](https://github.com/PIVOT-PLATFORM/pivot-core/pull/121) (Gate 4 =
98/100), spec figée `docs/specs/EPIC-module-system/en03-3-cache-redis-modules-ttl.md` (rétroactif,
2026-07-08) — spec documente explicitement le non-raccordement au endpoint de statut réel (PR
pivot-core #123)
