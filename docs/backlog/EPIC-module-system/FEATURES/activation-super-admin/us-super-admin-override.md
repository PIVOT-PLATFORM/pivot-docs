# US03.3.2 — SUPER_ADMIN active/désactive un module par tenant (override)

**En tant que** SUPER_ADMIN
**Je veux** forcer l'activation ou désactivation d'un module pour un tenant spécifique (hors plan)
**Afin de** gérer des cas particuliers (test, support, contractuel)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|-------|
| POST /api/superadmin/tenants/{tenantId}/modules/{moduleId}/override active ou désactive en override | ⬜ |
| Requiert ROLE_SUPER_ADMIN | ⬜ |
| Override enregistré en BDD (priorité sur le plan) | ⬜ |
| Audit event `ModuleOverrideSet` avec superAdminId | ⬜ |
| Body de la requête POST spécifié : { enabled: boolean } | ⬜ |
| DELETE /api/superadmin/tenants/{tenantId}/modules/{moduleId}/override supprime l'override (le module revient au comportement du plan) | ⬜ |
| Audit event ModuleOverrideRemoved enregistré lors de la suppression d'un override | ⬜ |

---
Item Type: US · Parent: F03.3 · Module: core · Phase: MVP · Size: S · Priority: High
Stage: Backlog
