# EN17.4 — Convention BDD multi-schéma

**Type d'enabler** : architecture

**Objectif technique** : Définir et implémenter la convention PostgreSQL multi-schéma dans laquelle
chaque module-core gère ses migrations Flyway dans un schéma dédié (`collaboratif`, `pilotage`,
`agilite`) avec FK croisées uniquement vers `public`, et exposer un `FlywayConfigurer` via
`pivot-core-starter` permettant à chaque module d'enregistrer ses propres migrations de façon
autonome.

**Justification** : Sans cette convention, chaque repo module-core créerait ses tables dans `public`
de façon non coordonnée, rendant l'isolation des domaines et la migration multi-tenant impossibles.
C'est le prérequis de toutes les migrations Flyway des modules backend (EN18.1, `pivot-pilotage-core`,
`pivot-agilite-core`, `pivot-collaboratif-core`).

**Critères de complétion** :
- [ ] ADR-006 accepté — stratégie schémas PostgreSQL documentée
- [ ] Flyway pivot-core : migrations schéma `public` stabilisées (V1__→VN__ sans rupture)
- [ ] `pivot-core-starter` expose `ModuleFlywayConfigurer` (factory) permettant à un module de créer un `Flyway` dédié par schéma via `createFlyway(DataSource)` — isolé du Flyway partagé de Spring Boot
- [ ] Convention FK cross-schéma documentée : `{schema}.table → public.teams(id)` / `public.tenants(id)` uniquement
- [ ] Script SQL de bootstrap multi-schéma disponible dans `pivot-docs/docs/architecture/`
- [ ] Test Testcontainers dans pivot-core-starter validant l'isolation schéma (un module ne peut pas écrire dans le schéma `public` directement)

**Statut** : 🔄 In progress — pivot-core PR #167 (ModuleFlywayConfigurer factory + TI Testcontainers schema isolation)

---
Item Type: Enabler · Parent: E17 · Type: architecture · Module: core · Phase: Socle (reséquencé 2026-07-07, ex-phase-3)
Stage: In progress · Priority: Critical
