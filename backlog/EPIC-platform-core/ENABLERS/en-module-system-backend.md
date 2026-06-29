# EN02.1 — Système de modules backend (registre)

**Type d'enabler** : architecture

**Objectif technique** : Registre de modules activables par tenant. Interface `PivotModule`, bus d'événements `ApplicationEventPublisher`, endpoint `/api/modules/{id}/status`.

**Justification** : Contrat fondamental PIVOT — tout module doit implémenter `PivotModule` et être activable/désactivable sans redéploiement.

**Critères de complétion** :
- [ ] Interface `PivotModule { getId(), getName(), getVersion(), isEnabled(TenantContext) }`
- [ ] `ModuleRegistry` : registre Spring (@Component), découverte auto via `List<PivotModule>`
- [ ] Endpoint `GET /api/modules` → liste des modules avec statut (activé/désactivé)
- [ ] Endpoint `GET /api/modules/{id}/status` → 200 si activé, 403 si désactivé
- [ ] Table `module_config (tenant_id, module_id, enabled, updated_at)`
- [ ] Migration Flyway `V_modules_config.sql`
- [ ] Bus événements : `ModuleEnabledEvent` / `ModuleDisabledEvent`

**Statut** : ⬜ À faire — Sprint 2

---
Item Type: Enabler · Parent: E02 · Type: architecture · Module: core · Phase: MVP
Human Gate: needs-human-valid · Stage: Backlog
