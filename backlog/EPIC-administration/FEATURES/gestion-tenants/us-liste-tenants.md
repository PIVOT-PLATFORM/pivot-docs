# US06.2.3 — Super admin liste tous les tenants

**En tant que** SUPER_ADMIN
**Je veux** voir la liste de tous les tenants de la plateforme
**Afin de** avoir une vue d'ensemble de tous les clients

## Critères d'acceptation

| Critère | 🤖 Dev | ✅ PO |
|---------|--------|-------|
| GET /api/superadmin/tenants retourne la liste paginée des tenants | ⬜ | ⬜ |
| Requiert ROLE_SUPER_ADMIN | ⬜ | ⬜ |
| Champs : id, slug, name, plan, auth_mode, is_active, userCount, createdAt | ⬜ | ⬜ |
| Page Angular `/superadmin/tenants` avec tableau et filtres | ⬜ | ⬜ |
| Tests TI GET /api/superadmin/tenants | ⬜ | ⬜ |
| Réponse JSON conforme à Spring Page : { content: [...], totalElements, totalPages, number, size }. Page size par défaut : 20 | ⬜ | ⬜ |
| Paramètres de pagination : page (0-indexed) et size | ⬜ | ⬜ |
| Colonnes du tableau : nom, slug, plan, auth_mode, is_active, createdAt | ⬜ | ⬜ |
| Filtres disponibles : name (search), is_active (boolean), plan, auth_mode | ⬜ | ⬜ |
| Tri par défaut : createdAt DESC | ⬜ | ⬜ |
| Tests Vitest TenantsListComponent (loading, empty state, error state) | ⬜ | ⬜ |

---
Item Type: US · Parent: F06.2 · Module: admin · Phase: MVP · Size: S · Priority: Medium
Human Gate: human-validated · Stage: Backlog
