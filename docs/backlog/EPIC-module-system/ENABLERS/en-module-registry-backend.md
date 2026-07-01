# EN03.1 — PivotModule interface + registre backend

**Type d'enabler** : architecture · infrastructure

**Critères de complétion** :
- [ ] Interface `PivotModule` : `getId()`, `getName()`, `getVersion()`, `isEnabled(TenantContext)`
- [ ] `ModuleRegistry` : enregistrement, lookup, liste des modules disponibles
- [ ] `ApplicationEventPublisher` comme bus d'événements inter-modules
- [ ] Entité `ModuleActivation` en BDD (tenant_id, module_id, enabled, updated_at)
- [ ] Migration Flyway `VX__module_activations.sql`
- [ ] Tests TI ModuleRegistry avec Testcontainers

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E03 · Type: architecture · Module: core · Phase: MVP
Human Gate: human-validated · Stage: Backlog · Priority: High
