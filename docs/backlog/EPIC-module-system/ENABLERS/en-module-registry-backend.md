# EN03.1 — PivotModule interface + registre backend

**Type d'enabler** : architecture · infrastructure

**Critères de complétion** :
- [ ] Interface `PivotModule` : `getId()`, `getName()`, `getVersion()`, `isEnabled(TenantContext)` — dans package `fr.pivot.core.modules`
- [ ] `ModuleRegistry` : enregistrement, lookup, liste des modules disponibles
- [ ] `ApplicationEventPublisher` comme bus d'événements inter-modules
- [ ] Entité `ModuleActivation` en BDD (tenant_id, module_id, enabled, updated_at) — schéma `public`
- [ ] Migration Flyway `VX__module_activations.sql`
- [ ] Tests TI ModuleRegistry avec Testcontainers
- [ ] **Interface et registre packagés dans `fr.pivot:pivot-core-starter`** — vérification : un repo module externe peut enregistrer son implémentation `PivotModule` via `@Bean` Spring sans modifier pivot-core

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E03 · Type: architecture · Module: core · Phase: MVP
Stage: Backlog · Priority: High
