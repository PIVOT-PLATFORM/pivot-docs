# EN03.1 — PivotModule interface + registre backend

**Type d'enabler** : architecture · infrastructure

**Critères de complétion** :
- [x] Interface `PivotModule` : `getId()`, `getName()`, `getVersion()`, `isEnabled(TenantContext)` — dans package `fr.pivot.core.modules`
- [x] `ModuleRegistry` : enregistrement (auto-découverte des beans Spring), lookup, liste des modules disponibles — `fr.pivot.core.modules.ModuleRegistry`
- [x] `ApplicationEventPublisher` comme bus d'événements inter-modules — événements typés `ModuleActivatedEvent` / `ModuleDeactivatedEvent` (`fr.pivot.core.modules.event`), publiés par `ModuleActivationService` sur transition effective
- [x] Entité `ModuleActivation` en BDD (tenant_id, module_id, enabled, updated_at) — schéma `public`, contrainte unique (tenant_id, module_id), FK `tenants`
- [x] Migration Flyway `V3__module_activations.sql` (V2 réservé aux seeds test)
- [x] Tests TI ModuleRegistry avec Testcontainers (`ModuleRegistryIntegrationTest`) + TU registre/service/entité/auto-configuration
- [x] **Interface et registre packagés dans `fr.pivot:pivot-core-starter`** — auto-configuration Spring Boot `PivotModulesAutoConfiguration` (`AutoConfiguration.imports`) : un repo module externe enregistre son `PivotModule` via `@Bean` sans modifier pivot-core (prouvé par `PivotModulesAutoConfigurationTest` + TI)

**Statut** : 🔄 Review — PR pivot-core `feat/en03-1-module-registry`

---
Item Type: Enabler · Parent: E03 · Type: architecture · Module: core · Phase: MVP
Stage: Review · Priority: High
