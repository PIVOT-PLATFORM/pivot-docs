# EN03.1 — PivotModule interface + registre backend

## Contexte

- **Enabler** : `docs/backlog/EPIC-module-system/ENABLERS/en-module-registry-backend.md`
  (E03 — Système de modules, Phase Socle)
- **PR** : `pivot-core` [#119](https://github.com/PIVOT-PLATFORM/pivot-core/pull/119)
  (`feat/en03-1-module-registry`)
- **Dernier commit au moment du figeage** : merge sur `main` le 2026-07-03
- **Gate 2 COVERAGE** : 100 % lignes / 100 % branches sur le code nouveau (JaCoCo)
- **Gate 4 MERGE_CONFIDENCE** : 100/100 — auto-approuvé (2 findings mineurs de la review
  initiale, tous deux corrigés avant merge — voir § Écarts)
- **Dépend de** : rien (contrat fondateur du système de modules — aucun repo module externe
  n'existe encore ; EN03.2/EN03.3/US03.1.x et les futurs `pivot-xxx-core` s'appuient dessus)

---

## Spec fonctionnelle

### `PivotModule` (`fr.pivot.core.modules.PivotModule`)

Interface de contrat implémentée par tout module PIVOT activable :

```java
public interface PivotModule {
    String getId();                       // identifiant technique stable, ex. "whiteboard"
    String getName();                     // nom affiché en UI
    String getVersion();                  // version sémantique
    boolean isEnabled(TenantContext ctx);  // visibilité pour le tenant courant
}
```

Un repo module externe (`pivot-pilotage-core`, `pivot-agilite-core`,
`pivot-collaboratif-core`) implémente cette interface et l'expose comme bean Spring
(`@Bean`/`@Component`) — le `ModuleRegistry` la découvre automatiquement, sans aucune
modification de pivot-core. Tout changement de cette interface est un hard block Gate 4
qui exige la coordination pivot-core ↔ tous les repos modules consommateurs.

### `ModuleRegistry` (`fr.pivot.core.modules.ModuleRegistry`)

Registre immuable construit une seule fois au démarrage, à partir de tous les beans
`PivotModule` présents dans le contexte Spring (auto-découverte via
`ObjectProvider<PivotModule>`) :

- `findById(String moduleId) : Optional<PivotModule>` — lookup par identifiant
- `getModules() : List<PivotModule>` — liste complète, ordre de découverte (priorité des beans)
- `isRegistered(String moduleId) : boolean`
- `count() : int`
- **Fail-fast** : deux modules déclarant le même identifiant lèvent une
  `IllegalStateException` à la construction — l'application ne démarre pas.

Le registre ne porte que la liste des modules *disponibles* dans le binaire déployé ; il ne
porte pas l'état d'activation par tenant, qui est un concept distinct porté par
`ModuleActivationService`.

### Bus d'événements inter-modules

`ModuleLifecycleEvent` (interface scellée — `sealed`) avec deux implémentations record :
`ModuleActivatedEvent(Long tenantId, String moduleId, Instant occurredAt)` et
`ModuleDeactivatedEvent(Long tenantId, String moduleId, Instant occurredAt)`, publiées via
`ApplicationEventPublisher` **uniquement sur transition effective d'état** (idempotence :
réactiver un module déjà activé pour un tenant ne republie pas d'événement — testé en TI).

### Activation par tenant (`ModuleActivationService`, `@Transactional`)

- `activate(Long tenantId, String moduleId)` / `deactivate(...)` — valident d'abord que le
  module cible est enregistré dans le `ModuleRegistry` (sinon `UnknownModuleException`), puis
  upsert la ligne `ModuleActivation` et publient l'événement de transition si l'état a changé.
- `isEnabled(Long tenantId, String moduleId) : boolean` (lecture seule) — **défaut sûr** :
  absence de ligne en BDD = désactivé, rien n'est activé implicitement.
- Logs structurés sur chaque changement d'état effectif
  (`event=MODULE_ACTIVATED|MODULE_DEACTIVATED|MODULE_ACTIVATION_NOOP`).

### Persistance (`ModuleActivation`, schéma `public`)

Entité JPA interne à pivot-core (jamais exposée directement en API — projection via DTO
uniquement) : `id`, `tenant_id`, `module_id`, `enabled`, `created_at`, `updated_at`.
Contrainte unique `(tenant_id, module_id)`, FK `tenants(id)` `ON DELETE CASCADE` — justifiée
car un état d'activation n'a aucun sens sans son tenant. Migration Flyway
`V3__module_activations.sql` (V2 réservé aux seeds de test, namespace Flyway fusionné en
profil test).

### Starter — auto-configuration Spring Boot

`PivotModulesAutoConfiguration` (`@AutoConfiguration`, package
`fr.pivot.core.modules.autoconfigure`), enregistrée via
`META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports` et
exportée par `fr.pivot:pivot-core-starter`. Fournit le bean `ModuleRegistry`
(`@ConditionalOnMissingBean` — une application peut fournir son propre registre pour les
tests ou une composition avancée) construit à partir de tous les beans `PivotModule`
découverts. Un repo module externe n'a donc **aucune configuration à écrire** au-delà de
déclarer son implémentation `PivotModule` comme bean.

### Traitement des erreurs

`UnknownModuleException` levée par `ModuleActivationService` quand l'appelant cible un
module absent du registre — mappée en **404** (`code: MODULE_NOT_FOUND`) dans
`GlobalExceptionHandler` (finding #1 Gate 4, corrigé avant merge, voir § Écarts).

---

## Contrat technique

### Fichiers introduits / modifiés (`pivot-core`)

| Fichier | Rôle |
|---|---|
| `fr.pivot.core.modules.PivotModule` | Contrat de module (déplacé depuis `fr.pivot.modules.registry`) |
| `fr.pivot.core.tenant.TenantContext` | Record `(Long tenantId, String userId, String role)` (déplacé, type `tenantId` unifié — voir § Écarts) |
| `fr.pivot.core.modules.ModuleRegistry` | Registre immuable, auto-découverte, fail-fast id dupliqué |
| `fr.pivot.core.modules.ModuleActivation` | Entité JPA `public.module_activations` |
| `fr.pivot.core.modules.ModuleActivationRepository` | `findByTenantIdAndModuleId`, `findAllByTenantId` |
| `fr.pivot.core.modules.ModuleActivationService` | `activate`/`deactivate`/`isEnabled`, `@Transactional` |
| `fr.pivot.core.modules.UnknownModuleException` | Levée sur module non enregistré, mappée 404 |
| `fr.pivot.core.modules.event.{ModuleLifecycleEvent,ModuleActivatedEvent,ModuleDeactivatedEvent}` | Bus d'événements typés, `sealed` |
| `fr.pivot.core.modules.autoconfigure.PivotModulesAutoConfiguration` | `@AutoConfiguration`, bean `ModuleRegistry` `@ConditionalOnMissingBean` |
| `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports` | Déclare l'auto-configuration pour le starter |
| `V3__module_activations.sql` | Migration Flyway — table, contrainte unique, FK CASCADE |
| `fr.pivot.modules.api.ModuleController`, `fr.pivot.modules.registry.ModuleRegistryService` | Adaptés aux nouveaux packages/imports (contrat API existant inchangé) |
| `fr.pivot.auth.web.GlobalExceptionHandler` | Mapping `UnknownModuleException` → 404 |
| `spotbugs-exclude.xml` | Exclusion documentée pour `fr.pivot.core.modules` (beans singleton injectés, entité JPA) |

### Tests

- **TU** : `ModuleRegistryTest` (6 cas — lookup, liste, fail-fast id dupliqué),
  `ModuleActivationServiceTest` (activate/deactivate/isEnabled, transitions, module inconnu),
  `ModuleActivationTest` (entité), `PivotModulesAutoConfigurationTest`
  (`ApplicationContextRunner` — bean conditionnel, découverte des `PivotModule`).
- **TI Testcontainers** (PostgreSQL 18, `ModuleRegistryIntegrationTest`, 8 tests) :
  auto-découverte réelle, migration V3, contrainte unique, FK `tenants`, publication
  d'événements sur transition effective uniquement (idempotence prouvée).
- Coverage nouveau code : **100 % lignes / 100 % branches** (JaCoCo, confirmé Gate 2).

### Chore associé

Bump Testcontainers `1.21.4` (compatibilité Docker Engine 29, négociation API
`docker-java`) — bénéficie à toute la CI, pas seulement à cette PR.

---

## Écarts vs AC initiaux

Les 7 critères de complétion de l'Enabler sont tous couverts et testés — aucun écart de
fond. Deux points de divergence entre le plan pré-écrit et le livré réel, tous deux résolus
avant merge (traçables dans les commentaires Gate 4 de la PR) :

- **Refactor de code existant plutôt que création ex nihilo.** `PivotModule` et
  `TenantContext` existaient déjà (skeleton) dans `fr.pivot.modules.registry` et étaient
  utilisés par `ModuleController`/`ModuleRegistryService`. La PR les **déplace** vers les
  packages starter `fr.pivot.core.modules` / `fr.pivot.core.tenant` et adapte les
  consommateurs existants, plutôt que d'introduire un contrat entièrement nouveau à côté de
  l'ancien.
- **Finding #1 (Gate 4, mineur)** : à la review initiale, `UnknownModuleException` n'était
  pas encore mappée dans `GlobalExceptionHandler` (aucun endpoint ne l'exposait dans le
  scope initial de cette PR). Corrigé avant merge — mapping 404 (`MODULE_NOT_FOUND`) + test
  dédié ajoutés (commit de correctif du 2026-07-03).
- **Finding #2 (Gate 4, mineur) — dualité de type `TenantContext.tenantId`.** Le
  `TenantContext` déplacé portait initialement `tenantId` en `UUID`, obtenu par une
  conversion déterministe (`longToUuid`/`ByteBuffer`) depuis le `Long` réel stocké en BDD —
  dette héritée de l'existant, non introduite par cette PR mais qu'elle déplaçait telle
  quelle. **Résolu avant merge** : `TenantContext.tenantId` est désormais un `Long` direct,
  cohérent avec le type utilisé partout ailleurs dans la couche persistance
  (`ModuleActivationService`, `ModuleActivation`, `User.getTenant().getId()`). Le hack
  `longToUuid()` est supprimé de `ModuleController`. Aucune coordination cross-repo requise :
  `TenantContext` est introduit dans cette même PR (non encore mergée au moment du fix),
  zéro consommateur externe existant.

---

## Cohérence avec les items adjacents

| Item | Relation |
|---|---|
| EN03.2 / EN03.3 (Sprint 2, système de modules) | S'appuient sur `PivotModule`/`ModuleRegistry` publiés par cette PR |
| US03.1.x (endpoint d'activation admin) | Consommera `ModuleActivationService.activate`/`deactivate` ; le mapping 404 de `UnknownModuleException` (ajouté ici) lui est directement utile |
| EN17.x (`pivot-design-system`, backlog) | Suivi futur pour une éventuelle nouvelle dette de cohérence de type si elle réapparaît ; sans lien direct avec le fix `Long`/`UUID` déjà traité ici |
| Futurs repos `pivot-pilotage-core` / `pivot-agilite-core` / `pivot-collaboratif-core` | Consommeront `PivotModule` + `PivotModulesAutoConfiguration` via `fr.pivot:pivot-core-starter` — aucun n'existe encore au moment du figeage de cette spec |

## Hors périmètre (explicitement exclu)

- Endpoint(s) REST d'activation/désactivation d'un module par un admin (US03.1.x — non livré
  dans cette PR, qui ne fournit que le contrat + registre + service backend).
- Câblage de `ModuleActivatedEvent`/`ModuleDeactivatedEvent` à un consommateur concret
  (notifications, audit log) — le bus existe, aucun listener métier n'est ajouté ici.
- UI Angular de gestion des modules (admin portal) — hors scope backend de cet Enabler.
