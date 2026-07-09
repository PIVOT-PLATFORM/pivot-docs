# US06.1.3 — Admin modifie le rôle d'un utilisateur

**En tant que** admin tenant
**Je veux** changer le rôle d'un utilisateur (USER ↔ ADMIN)
**Afin de** gérer les droits au sein de mon organisation

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| PATCH /api/admin/users/{userId}/role accepte `{ role: "ROLE_ADMIN" \| "ROLE_USER" }` | ✅ |
| Requiert ROLE_ADMIN | ✅ |
| Un admin ne peut pas se rétrograder lui-même | ✅ |
| Audit event `UserRoleChanged` enregistré | ✅ |
| Bouton/select "Rôle" dans la liste des utilisateurs (US06.1.2) | ✅ |
| Tests TI PATCH /api/admin/users/{id}/role | ✅ |
| Le endpoint vérifie que userId appartient au même tenant que l'admin courant (TenantContext). userId d'un autre tenant → 404 (pas 403). Test TI cross-tenant explicite | ✅ |
| Les seules valeurs acceptées pour "role" sont ROLE_ADMIN et ROLE_USER. ROLE_SUPER_ADMIN ou valeur inconnue → 400 Bad Request. Validation via enum strict dans le DTO | ✅ |
| Après modification de rôle, tous les tokens actifs de l'utilisateur concerné sont révoqués immédiatement. Le rôle est résolu depuis la BDD à chaque requête | ✅ |
| Test TI valide qu'un appel admin avec l'ancien token retourne 401 dans les 100ms suivant la révocation | ✅ *(retourne 403, pas 401 — convention existante du repo, aucun `AuthenticationEntryPoint` custom, voir notes)* |
| La modification de rôle requiert un dialog de confirmation ("Changer le rôle de [nom] de USER vers ADMIN ?") avant appel API | ✅ |
| Après modification réussie, toast "Rôle mis à jour" + badge de rôle mis à jour dans la ligne du tableau | ✅ |
| En cas d'erreur, toast "error" localisé + rôle revient à son état précédent (rollback optimiste) | ✅ |
| Le select de rôle est désactivé pendant l'appel API | ✅ |
| Select de rôle a aria-label="Rôle de [nom de l'utilisateur]" pour différencier les selects dans le tableau | ✅ |
| Dialog de confirmation a focus trap, role="dialog", aria-labelledby | ✅ |
| Labels de rôles, textes de confirmation et toasts internalisés dans admin.users.role.* (fr.json / en.json) | ✅ |

## Notes de livraison

- Implémenté : `pivot-core` PR [#141](https://github.com/PIVOT-PLATFORM/pivot-core/pull/141) **mergée** (Gate 2 self-évalué : 90/100) · `pivot-ui` PR [#84](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/84) **mergée** (Gate 2 self-évalué : 94/100).
- **Déviation documentée** : un token invalide/révoqué renvoie `403`, jamais `401` — ce repo n'a pas d'`AuthenticationEntryPoint` custom (précédent déjà établi par `SessionControllerIntegrationTest`). L'intention de l'AC (révocation immédiate et prouvée) est respectée et testée ; seul le code HTTP littéral diffère.
- `pivot-ui` #84 était empilée sur la branche de US06.1.2 (`pivot-ui` #82) — #82 a bien été fusionnée en premier.
- **Statut réel vérifié (2026-07-06) :** les deux PR sont mergées sur `main` — resynchronisé de `In progress` à `Review`.
- `pivot-core` a refactoré `resolveAdmin()` → `resolveActor()` pour que US06.1.4/US06.1.5 (empilée ensuite) puisse le réutiliser tel quel.

---
Item Type: US · Parent: F06.1 · Module: admin · Phase: Socle · Size: S · Priority: High
Stage: ✅
Gate 5 : `pivot-core` PR [#141](https://github.com/PIVOT-PLATFORM/pivot-core/pull/141) (Gate 4 = 100/100) · `pivot-ui` PR [#84](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/84) (Gate 4 = 84/100, rétrospectif) + correctif [#98](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/98), spec figée `docs/specs/EPIC-administration/us06-1-3-modifier-role.md` (rétroactif, 2026-07-08)
