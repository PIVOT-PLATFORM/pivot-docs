# E03 — Administration

## Objectif
Permettre à un admin de gérer son tenant : activer/désactiver les modules, gérer les utilisateurs, visualiser les logs d'activité.

## Périmètre
- Feature F03.1 : Activation/désactivation de modules
- Feature F03.2 : Gestion des utilisateurs du tenant
- Feature F03.3 : Tableau de bord admin (stats, logs)
- Enabler EN03.1 : RBAC — rôles ROLE_ADMIN / ROLE_USER / ROLE_GUEST

## Hors périmètre
- Gestion des tenants multi-org → ROLE_SUPER_ADMIN (post-MVP)
- OIDC enterprise provisionnement JIT → v1-enterprise

## Modules impactés
- `admin` (pivot-core + pivot-ui)

## Dépendances
- Dépend de : E01 Auth & IAM, E02 système de modules

## Statut global
⬜ À planifier — Sprint 2/3

---

## Suivi d'avancement

| Élément | 🤖 Dev | ✅ PO |
|---------|--------|-------|
| EN03.1 — RBAC roles | ⬜ | ⬜ |
| F03.1 — Activation modules | ⬜ | ⬜ |
| F03.2 — Gestion utilisateurs | ⬜ | ⬜ |
| F03.3 — Dashboard admin | ⬜ | ⬜ |

> US détaillées à créer lors du Sprint 2 planning. Human Gate: needs-human-valid sur tous les items.
