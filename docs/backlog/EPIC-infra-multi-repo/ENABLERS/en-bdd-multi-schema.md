# EN17.4 — Convention BDD multi-schéma

**Type d'enabler** : architecture

**Critères de complétion** :
- [ ] ADR-006 accepté — stratégie schémas PostgreSQL documentée
- [ ] Flyway pivot-core : migrations schéma `public` stabilisées (V1__→VN__ sans rupture)
- [ ] `pivot-core-starter` expose un `FlywayConfigurer` permettant à un module d'enregistrer ses propres migrations dans un schéma dédié
- [ ] Convention FK cross-schéma documentée : `{schema}.table → public.teams(id)` / `public.tenants(id)` uniquement
- [ ] Script SQL de bootstrap multi-schéma disponible dans `pivot-docs/docs/architecture/`
- [ ] Test Testcontainers dans pivot-core-starter validant l'isolation schéma (un module ne peut pas écrire dans le schéma `public` directement)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E17 · Type: architecture · Module: core · Phase: phase-3
Stage: Backlog · Priority: Critical
