# EN03.3 — Cache Redis statut modules TTL 60s

## Contexte

- **Enabler** : `docs/backlog/EPIC-module-system/ENABLERS/en-module-cache-redis.md` (Parent `E03`
  — Module System)
- **PR** : `pivot-core` [#121](https://github.com/PIVOT-PLATFORM/pivot-core/pull/121)
  (`feat/en03-3-module-cache-redis`, base `feat/en03-1-module-registry` (#119))
- **Dernier commit au moment du figeage** : PR mergée sur `main` le 2026-07-03T18:07:05Z
- **Gate 4 MERGE_CONFIDENCE** : 98/100 — `MERGE_AUTONOMOUS`
- **Dépend de** : `EN03.1` — Module Registry (`ModuleActivationService`, événements de cycle de vie
  `ModuleActivatedEvent`/`ModuleDeactivatedEvent`), mergée avant celle-ci

---

## Spec fonctionnelle

### `ModuleActivationCacheService`

Service standalone (`fr.pivot.core.modules.cache`) qui enveloppe
`ModuleActivationService#isEnabled(Long, String)` en cache-aside Redis :

- **Clé** : `module:status:{tenantId}:{moduleId}`.
- **Lecture** : hit → valeur Redis retournée directement, `ModuleActivationService` jamais
  consulté ; miss → délégation à `ModuleActivationService.isEnabled(...)`, résultat écrit en Redis
  avec le TTL configuré avant d'être retourné.
- **TTL** : 60 secondes par défaut, configurable via `modules.cache.ttl-seconds`
  (`application.yml`, variable d'env `MODULES_CACHE_TTL_SECONDS`).
- **Invalidation / write-through** : `@EventListener` sur `ModuleActivatedEvent` et
  `ModuleDeactivatedEvent` — écriture immédiate en cache de la nouvelle valeur (`true`/`false`),
  pas une simple éviction suivie d'un re-calcul paresseux.
- **Fallback Redis indisponible** : toute `DataAccessException` (lecture ou écriture, y compris
  sur le chemin d'écriture déclenché par un événement) est interceptée — délégation silencieuse à
  `ModuleActivationService.isEnabled(...)`, jamais de propagation en 500.
- **Métriques Micrometer** : compteurs `pivot.modules.cache.hit` / `pivot.modules.cache.miss`
  incrémentés à chaque lecture.

### Périmètre volontairement standalone — non branché sur l'API

Cette PR n'ajoute et ne modifie **aucun endpoint REST** : `ModuleController` n'est pas touché. Le
service est livré entièrement testé en isolation (TU + TI Testcontainers), avec sa signature
publique (`isEnabled(Long tenantId, String moduleId): boolean`) exposée dans la description de PR
pour un raccordement en fast-follow par `EN03.2`.

**Ce raccordement n'a pas eu lieu.** Le endpoint `GET /api/modules/{id}/status`, livré
séparément par `EN03.2`/`US03.2.2` (`pivot-core` PR
[#123](https://github.com/PIVOT-PLATFORM/pivot-core/pull/123), mergée le
2026-07-03T19:35:17Z — soit environ 1h30 après #121), n'injecte pas
`ModuleActivationCacheService` : il appelle directement `ModuleActivationService` et répond
`Cache-Control: no-store`. La description de la PR #123 le confirme explicitement : *« le cache
Redis EN03.3 est un sujet séparé, non traité ici »*. Aucune des deux PR ne référence de ticket de
suivi pour ce raccordement au moment du figeage.

**Conséquence fonctionnelle** : le cache Redis existe, est correct et testé, mais **aucun trafic
de production ne le traverse aujourd'hui** — le chemin de lecture réel du statut module
(`GET /api/modules/{id}/status`) continue de solliciter `ModuleActivationService`/la BDD à chaque
appel, sans bénéfice de latence ni de réduction de charge. L'objectif de performance sous-jacent à
cet Enabler (réduire la charge sur `ModuleActivationService` par un TTL de 60s) n'est donc pas
atteint en l'état, malgré les 5 critères de complétion de l'Enabler cochés côté implémentation
standalone.

---

## Contrat technique

### Fichiers introduits / modifiés (PR #121)

| Fichier | Rôle |
|---|---|
| `src/main/java/fr/pivot/core/modules/cache/ModuleActivationCacheService.java` | Service cache-aside — lecture/écriture Redis, fallback, événements, métriques |
| `src/main/resources/application.yml` | Propriété `modules.cache.ttl-seconds` (défaut 60) |
| `spotbugs-exclude.xml` | Extension de l'exclusion `EI_EXPOSE_REP2` à `fr.pivot.core.modules.cache` (bean singleton constructor-injected, même rationale que `fr.pivot.core.modules`) |
| `src/test/java/fr/pivot/core/modules/cache/ModuleActivationCacheServiceTest.java` | TU Mockito : hit, miss + peuplement TTL, fallback lecture/écriture, write-through événements, compteurs |
| `src/test/java/fr/pivot/core/modules/cache/ModuleActivationCacheServiceIntegrationTest.java` | TI Testcontainers (`redis:7-alpine` + Postgres réel) : priorité cache, TTL réel, expiration → re-lecture BDD, write-through, métriques en contexte Spring réel |
| `src/test/java/fr/pivot/core/modules/cache/ModuleActivationCacheServiceRedisDownIntegrationTest.java` | TI dédié Redis injoignable (port fermé), contexte Spring séparé — fallback sans exception propagée |
| `PATCH_NOTES.md` | Entrée utilisateur : réactivité de l'activation des modules |

### Signature exposée

```java
package fr.pivot.core.modules.cache;

@Service
public class ModuleActivationCacheService {
    public boolean isEnabled(Long tenantId, String moduleId) { ... }
}
```

Injectable en remplacement (ou en complément) de `ModuleActivationService` — non fait à date, voir
« Périmètre volontairement standalone » ci-dessus.

### Configuration

| Propriété | Défaut | Variable d'env |
|---|---|---|
| `modules.cache.ttl-seconds` | `60` | `MODULES_CACHE_TTL_SECONDS` |

### Clé de cache

`module:status:{tenantId}:{moduleId}` — `tenantId`/`moduleId` uniquement en paramètres de méthode
internes, jamais désérialisés depuis une requête HTTP dans cette PR (aucun endpoint ajouté).

---

## Traçabilité AC (Gate 4, PR #121)

| AC | Implémentation | Test | Statut |
|----|----------------|------|--------|
| Cache Redis par tenant, clé `module:status:{tenantId}:{moduleId}` | `ModuleActivationCacheService.isEnabled` (lecture Redis prioritaire) | `ModuleActivationCacheServiceTest#isEnabled_returnsCachedTrue_onHit_withoutCallingActivationService`, `ModuleActivationCacheServiceIntegrationTest#isEnabled_returnsCachedValue_ignoringBdd_onCacheHit` | ✅ testé (service standalone) |
| TTL 60s configurable (`modules.cache.ttl-seconds`) | Constructeur `@Value("${modules.cache.ttl-seconds:60}")` + `application.yml` | `isEnabled_fallsBackToActivationService_andPopulatesCache_onMiss`, `ModuleActivationCacheServiceIntegrationTest#isEnabled_populatesCache_withConfiguredTtl_onMiss`, `#isEnabled_reFetchesFromBdd_afterCacheExpires` | ✅ testé (service standalone) |
| Invalidation cache sur changement d'activation (event `ApplicationEventPublisher`) | `@EventListener onModuleActivated`/`onModuleDeactivated` — write-through immédiat | `onModuleActivated_writesThroughCache_withTrue`, `onModuleDeactivated_writesThroughCache_withFalse`, `ModuleActivationCacheServiceIntegrationTest#activate_writesThroughCache_immediately`, `#deactivate_writesThroughCache_immediately` | ✅ testé (service standalone) |
| Fallback BDD si Redis indisponible (pas de 500) | `catch (DataAccessException)` sur lecture et écriture → délégation à `ModuleActivationService.isEnabled` | `isEnabled_fallsBackToActivationService_whenRedisReadFails`, `isEnabled_doesNotThrow_whenRedisWriteFailsAfterMiss`, `onModuleActivated_doesNotThrow_whenRedisUnavailable`, `ModuleActivationCacheServiceRedisDownIntegrationTest` (2 tests, port fermé réel) | ✅ testé (service standalone) |
| Métrique Micrometer : cache hit/miss ratio | `MeterRegistry.counter("pivot.modules.cache.hit"/"miss")` | TU (assertions `SimpleMeterRegistry`), `ModuleActivationCacheServiceIntegrationTest#isEnabled_incrementsHitAndMissCounters` (contexte Spring réel) | ✅ testé (service standalone) |

**Important** : les 5 AC ci-dessus valident le service `ModuleActivationCacheService`
*en isolation*. Aucune n'atteste que ce cache est effectivement sollicité par un chemin de lecture
HTTP réel — voir « Périmètre volontairement standalone » ci-dessus.

---

## Écarts vs AC initiaux

- **Non-raccordement au endpoint de statut réel** (`GET /api/modules/{id}/status`, EN03.2/PR #123)
  — écart le plus significatif. Ni la PR #121 ni la #123 ne le traitent : #121 le documente comme
  fast-follow attendu côté EN03.2, #123 le documente explicitement comme hors périmètre. Ce
  raccordement reste un gap technique ouvert, non repris à ce jour par un item de backlog
  identifié.
- Les 5 autres critères de complétion de l'Enabler sont implémentés et testés conformément à leur
  formulation d'origine, sans divergence de mécanisme (Redis, TTL, événements, fallback, métriques
  — tous conformes à la conception initiale).

---

## Cohérence avec les items adjacents

| Item | Relation |
|----|----------|
| `EN03.1` — Module Registry | Fournit `ModuleActivationService`, `ModuleActivatedEvent`/`ModuleDeactivatedEvent` consommés par ce cache. Base de branche de la PR #121. |
| `EN03.2` / `US03.2.2` — Guard Angular + `GET /api/modules/{id}/status` | Chemin de lecture réel du statut module en production — **n'utilise pas** `ModuleActivationCacheService` (voir « Périmètre volontairement standalone »). Raccordement resté en fast-follow non exécuté. |

## Hors périmètre (explicitement exclu)

- Toute modification de `ModuleController` ou ajout d'endpoint REST.
- Le raccordement effectif du cache sur un chemin de lecture HTTP (délégué, non repris).
- Invalidation cross-instance/cluster au-delà du TTL et du write-through applicatif (pas de
  pub/sub Redis dédié à l'invalidation — chaque instance écrit directement en cache sur événement
  local).
