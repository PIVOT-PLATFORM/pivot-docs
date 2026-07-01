# US06.1.3 — Admin modifie le rôle d'un utilisateur

**En tant que** admin tenant
**Je veux** changer le rôle d'un utilisateur (USER ↔ ADMIN)
**Afin de** gérer les droits au sein de mon organisation

## Critères d'acceptation

| Critère | 🤖 Dev | ✅ PO |
|---------|--------|-------|
| PATCH /api/admin/users/{userId}/role accepte `{ role: "ROLE_ADMIN" \| "ROLE_USER" }` | ⬜ | ⬜ |
| Requiert ROLE_ADMIN | ⬜ | ⬜ |
| Un admin ne peut pas se rétrograder lui-même | ⬜ | ⬜ |
| Audit event `UserRoleChanged` enregistré | ⬜ | ⬜ |
| Bouton/select "Rôle" dans la liste des utilisateurs (US06.1.2) | ⬜ | ⬜ |
| Tests TI PATCH /api/admin/users/{id}/role | ⬜ | ⬜ |
| Le endpoint vérifie que userId appartient au même tenant que l'admin courant (TenantContext). userId d'un autre tenant → 404 (pas 403). Test TI cross-tenant explicite | ⬜ | ⬜ |
| Les seules valeurs acceptées pour "role" sont ROLE_ADMIN et ROLE_USER. ROLE_SUPER_ADMIN ou valeur inconnue → 400 Bad Request. Validation via enum strict dans le DTO | ⬜ | ⬜ |
| Après modification de rôle, tous les tokens actifs de l'utilisateur concerné sont révoqués immédiatement. Le rôle est résolu depuis la BDD à chaque requête | ⬜ | ⬜ |
| Test TI valide qu'un appel admin avec l'ancien token retourne 401 dans les 100ms suivant la révocation | ⬜ | ⬜ |
| La modification de rôle requiert un dialog de confirmation ("Changer le rôle de [nom] de USER vers ADMIN ?") avant appel API | ⬜ | ⬜ |
| Après modification réussie, toast "Rôle mis à jour" + badge de rôle mis à jour dans la ligne du tableau | ⬜ | ⬜ |
| En cas d'erreur, toast "error" localisé + rôle revient à son état précédent (rollback optimiste) | ⬜ | ⬜ |
| Le select de rôle est désactivé pendant l'appel API | ⬜ | ⬜ |
| Select de rôle a aria-label="Rôle de [nom de l'utilisateur]" pour différencier les selects dans le tableau | ⬜ | ⬜ |
| Dialog de confirmation a focus trap, role="dialog", aria-labelledby | ⬜ | ⬜ |
| Labels de rôles, textes de confirmation et toasts internalisés dans admin.users.role.* (fr.json / en.json) | ⬜ | ⬜ |

---
Item Type: US · Parent: F06.1 · Module: admin · Phase: MVP · Size: S · Priority: High
Human Gate: human-validated · Stage: Backlog
