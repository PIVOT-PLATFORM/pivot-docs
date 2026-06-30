# EN02.3 — Infrastructure Multi-tenant

**Type d'enabler** : architecture

**Objectif technique** : Fondation multi-tenant : entité `Tenant`, `TenantContext` runtime, configuration OIDC par tenant (`TenantOidcConfig`). Isolation stricte des données inter-tenants.

**Critères de complétion** :
- [x] Entité `Tenant` : `id`, `slug`, `name`, `plan`, `auth_mode`, `is_active`
- [x] Entité `TenantOidcConfig` : `tenant_id`, `issuerUri`, `clientId`, `scopes`, `claimsMapping`, `jitEnabled`, `azureTenantId`, `jwksOverride`
- [x] `TenantRepository` + `TenantOidcConfigRepository`
- [x] `TenantContext` : context runtime (tenantId, userId, role) propagé via `@RequestScope` ou ThreadLocal
- [x] `V1__schema_init.sql` : tables `tenants` + `tenant_oidc_configs`
- [x] Isolation : toutes les requêtes filtrées par `tenant_id` implicitement

**Statut** : ✅ Fait (infra) — Stage: Done

---
Item Type: Enabler · Parent: E02 · Type: architecture · Module: core · Phase: MVP
Human Gate: human-validated · Stage: Done
