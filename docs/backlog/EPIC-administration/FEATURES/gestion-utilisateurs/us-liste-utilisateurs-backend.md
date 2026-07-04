# US06.1.1 — Admin liste utilisateurs de son tenant (backend)

**En tant que** admin tenant
**Je veux** récupérer la liste des utilisateurs de mon organisation via l'API
**Afin de** gérer les accès de mon tenant

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| GET /api/admin/users retourne la liste paginée des utilisateurs du tenant courant | ✅ |
| Requiert ROLE_ADMIN | ✅ |
| Champs : id, email, firstName, lastName, role, status, createdAt | ✅ |
| Filtres query params : role, status, search (email/nom) | ✅ |
| Isolation : un admin ne voit que les utilisateurs de son tenant | ✅ |
| Tests TI GET /api/admin/users (Testcontainers) | ✅ |
| Réponse JSON conforme à Spring Page : { content: [...], totalElements, totalPages, number, size }. Page size par défaut : 20, max : 100 | ✅ |
| Paramètres de pagination : page (0-indexed) et size | ✅ |
| Filtrage scopé au tenant courant (extrait du TenantContext du token porteur) — aucun utilisateur d'un autre tenant retourné | ✅ |

## Notes de livraison

- Implémenté : `pivot-core` PR [#127](https://github.com/PIVOT-PLATFORM/pivot-core/pull/127) (Gate 2 self-évalué : 92/100 — CI verte, détail dans la PR).
- **Contrat API final (à respecter par US06.1.2 / Angular)** : `GET /api/admin/users?page=0&size=20&role=ROLE_USER&status=ACTIVE&search=alice`, réponse en forme `Page` Spring Data standard (pas de DTO enveloppe custom), `AdminUserDto{id, email, firstName, lastName, role, status, createdAt}`.
- **`status` est un champ dérivé, pas une colonne unique** : `User` n'a pas de colonne `status` — deux booléens indépendants (`is_active`, `is_blocked`) sont combinés en un statut synthétique `UserStatus` (`ACTIVE` | `INACTIVE` | `BLOCKED`, `BLOCKED` prioritaire). **US06.1.2 doit utiliser ces 3 valeurs exactes**, pas des booléens séparés.
- `size` hors bornes est clampé silencieusement (jamais 400) ; `status` invalide **est** rejeté en 400 `{error: "INVALID_FILTER", field: "status", ...}` — asymétrie intentionnelle à gérer côté FE.
- Tri par défaut `createdAt DESC, id ASC` — non paramétrable dans cette US.
- Comptes soft-deleted (RGPD Art.17) toujours exclus de la liste.

---
Item Type: US · Parent: F06.1 · Module: admin · Phase: MVP · Size: S · Priority: High
Stage: Review
