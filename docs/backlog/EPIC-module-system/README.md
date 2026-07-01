# E03 — Système de modules

## Objectif
Infrastructure d'activation/désactivation de modules par tenant : registre backend, guard Angular, cache Redis, contrat TypeScript, interface admin.

## Périmètre GitHub (MVP)

### Enablers
- EN03.1 : PivotModule interface + registre backend
- EN03.2 : Guard Angular moduleGuard + status API
- EN03.3 : Cache Redis statut modules TTL 60s
- EN03.4 : Contrat de module frontend (TypeScript)

### Features
- F03.1 : Activation modules par admin tenant (enterprise self-hosted)
- F03.2 : Interface admin activation modules — Angular
- F03.3 : Activation modules par SUPER_ADMIN (SaaS plateforme)

## Modules impactés
`core` (pivot-core + pivot-ui)

## Dépendances
- Dépend de : E01 Auth & IAM (ROLE_ADMIN, ROLE_SUPER_ADMIN)
- Bloque : E08–E15 (tous les modules collaboratifs)

## Statut global
⬜ À planifier — Sprint 2

---

## Suivi d'avancement

| Élément | 🤖 Dev | ✅ PO |
|---------|--------|-------|
| **Enablers** | | |
| [EN03.1 — PivotModule interface + registre backend](ENABLERS/en-module-registry-backend.md) | ⬜ | ⬜ |
| [EN03.2 — Guard Angular moduleGuard + status API](ENABLERS/en-module-guard-angular.md) | ⬜ | ⬜ |
| [EN03.3 — Cache Redis statut modules TTL 60s](ENABLERS/en-module-cache-redis.md) | ⬜ | ⬜ |
| [EN03.4 — Contrat de module frontend (TypeScript)](ENABLERS/en-module-contrat-frontend.md) | ⬜ | ⬜ |
| [EN-NOTIF — Infrastructure notifications in-app](ENABLERS/en-notifications.md) *(transversal, prérequis US16.1.3)* | ⬜ | ⬜ |
| **F03.1 — Activation modules admin tenant** | | |
| [US03.1.1 — Admin active un module pour son tenant](FEATURES/activation-admin/us-admin-active-module.md) | ⬜ | ⬜ |
| [US03.1.2 — Admin désactive un module pour son tenant](FEATURES/activation-admin/us-admin-desactive-module.md) | ⬜ | ⬜ |
| **F03.2 — Interface admin Angular** | | |
| [US03.2.1 — UI liste modules disponibles avec statut](FEATURES/interface-admin-angular/us-liste-modules.md) | ⬜ | ⬜ |
| [US03.2.2 — Guard Angular bloque accès module désactivé](FEATURES/interface-admin-angular/us-guard-module-desactive.md) | ⬜ | ⬜ |
| **F03.3 — Activation SUPER_ADMIN (SaaS)** | | |
| [US03.3.1 — SUPER_ADMIN définit modules disponibles par plan](FEATURES/activation-super-admin/us-super-admin-modules-plan.md) | ⬜ | ⬜ |
| [US03.3.2 — SUPER_ADMIN active/désactive un module par tenant (override)](FEATURES/activation-super-admin/us-super-admin-override.md) | ⬜ | ⬜ |
| [US03.3.3 — Admin tenant voit uniquement modules de son plan](FEATURES/activation-super-admin/us-admin-voit-modules-plan.md) | ⬜ | ⬜ |
