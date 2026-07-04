# E06 — Administration

## Objectif
Permettre aux admins de gérer les utilisateurs de leur tenant et au SUPER_ADMIN de gérer tous les tenants de la plateforme.

## Périmètre GitHub (MVP)
- Feature F06.1 : Gestion utilisateurs tenant (backend + frontend)
- Feature F06.2 : Gestion tenants SUPER_ADMIN (backend + frontend)

## Modules impactés
`admin` (pivot-core + pivot-ui)

## Dépendances
- Dépend de : E01 Auth & IAM (rôles ROLE_ADMIN, ROLE_SUPER_ADMIN)
- Dépend de : E03 Système de modules (activation modules par admin)

## Statut global
⬜ À planifier — Sprint 2/3

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|-------|
| **F06.1 — Gestion utilisateurs tenant** | | |
| [US06.1.1 — Admin liste utilisateurs (backend)](FEATURES/gestion-utilisateurs/us-liste-utilisateurs-backend.md) | ⬜ |
| [US06.1.2 — Admin liste utilisateurs (frontend)](FEATURES/gestion-utilisateurs/us-liste-utilisateurs-frontend.md) | ⬜ |
| [US06.1.3 — Admin modifie rôle d'un utilisateur](FEATURES/gestion-utilisateurs/us-modifier-role.md) | ⬜ |
| [US06.1.4 — Admin désactive un compte utilisateur](FEATURES/gestion-utilisateurs/us-desactiver-compte.md) | ⬜ |
| [US06.1.5 — Admin réactive un compte utilisateur](FEATURES/gestion-utilisateurs/us-reactiver-compte.md) | ⬜ |
| **F06.2 — Gestion tenants SUPER_ADMIN** | | |
| [US06.2.1 — Super admin crée un tenant](FEATURES/gestion-tenants/us-creer-tenant.md) | ⬜ |
| [US06.2.2 — Super admin désactive un tenant](FEATURES/gestion-tenants/us-desactiver-tenant.md) | ⬜ |
| [US06.2.3 — Super admin liste tous les tenants](FEATURES/gestion-tenants/us-liste-tenants.md) | ⬜ |
