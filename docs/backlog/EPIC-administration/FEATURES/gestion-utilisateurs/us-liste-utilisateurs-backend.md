# US06.1.1 — Admin liste utilisateurs de son tenant (backend)

**En tant que** admin tenant
**Je veux** récupérer la liste des utilisateurs de mon organisation via l'API
**Afin de** gérer les accès de mon tenant

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|-------|
| GET /api/admin/users retourne la liste paginée des utilisateurs du tenant courant | ⬜ |
| Requiert ROLE_ADMIN | ⬜ |
| Champs : id, email, firstName, lastName, role, status, createdAt | ⬜ |
| Filtres query params : role, status, search (email/nom) | ⬜ |
| Isolation : un admin ne voit que les utilisateurs de son tenant | ⬜ |
| Tests TI GET /api/admin/users (Testcontainers) | ⬜ |
| Réponse JSON conforme à Spring Page : { content: [...], totalElements, totalPages, number, size }. Page size par défaut : 20, max : 100 | ⬜ |
| Paramètres de pagination : page (0-indexed) et size | ⬜ |
| Filtrage scopé au tenant courant (extrait du TenantContext du token porteur) — aucun utilisateur d'un autre tenant retourné | ⬜ |

---
Item Type: US · Parent: F06.1 · Module: admin · Phase: MVP · Size: S · Priority: High
Stage: Backlog
