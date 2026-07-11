# US06.1.4 — Admin désactive un compte utilisateur

**En tant que** admin tenant
**Je veux** désactiver le compte d'un utilisateur de mon organisation
**Afin de** bloquer l'accès sans supprimer les données

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| PATCH /api/admin/users/{userId}/status accepte `{ status: "INACTIVE" }` | ✅ |
| Utilisateur désactivé → 401 à la prochaine requête (tokens révoqués) | ✅ *(retourne 403, pas 401 — convention existante du repo, voir notes)* |
| Un admin ne peut pas se désactiver lui-même | ✅ |
| Audit event `UserDeactivated` enregistré | ✅ |
| Bouton "Désactiver" dans la liste utilisateurs (US06.1.2) + confirmation | ✅ |
| Tests TI PATCH /api/admin/users/{id}/status | ✅ |
| Le endpoint vérifie que userId appartient au tenant courant avant tout traitement. userId d'un autre tenant → 404. Test TI cross-tenant explicite | ✅ |
| Les seules valeurs acceptées pour "status" via cet endpoint sont ACTIVE et INACTIVE. Toute autre valeur → 400. Validation via enum strict dans le DTO | ✅ |
| La validation du token dans TokenService vérifie que user.status == ACTIVE (retourne 401 sinon, même si le token n'est pas expiré) | ✅ *(403, idem note ci-dessus — vérification par requête ajoutée à `TokenService#validate`, indépendante de la révocation explicite)* |
| Dialog de confirmation mentionne explicitement la conséquence : "L'utilisateur sera déconnecté immédiatement de toutes ses sessions" | ✅ |
| Après désactivation, toast "Compte désactivé" + badge statut mis à jour en temps réel | ✅ |
| Option "Réactiver" disponible sur les comptes INACTIVE dans la même liste (appelle PATCH avec status: ACTIVE) | ✅ |
| En cas d'erreur, toast "error" + statut revient à ACTIVE (rollback optimiste) | ✅ |
| Bouton "Désactiver" a aria-label="Désactiver le compte de [nom]" pour éviter les boutons identiques dans le tableau | ✅ |
| Dialog a role="alertdialog" (action destructive), aria-modal="true", focus trap | ✅ |
| Textes du dialog, toast et statuts internalisés dans admin.users.status.* (fr.json / en.json) | ✅ |

## Notes de livraison

- Implémenté conjointement avec US06.1.5 (même endpoint `PATCH /api/admin/users/{userId}/status`, une seule implémentation pour les deux directions) : `pivot-core` PR [#142](https://github.com/PIVOT-PLATFORM/pivot-core/pull/142) **mergée** (Gate 2 self-évalué : 98/100) · `pivot-ui` PR [#85](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/85) **mergée** (Gate 2 self-évalué : 93/100).
- **Déviation documentée** (cohérente avec US06.1.3) : `403` au lieu de `401`.
- Étaient empilées sur les branches de US06.1.3 (`pivot-core` #141, `pivot-ui` #84) — l'ordre de fusion US06.1.2 → US06.1.3 → US06.1.4/US06.1.5 a bien été respecté.
- **Statut réel vérifié (2026-07-06) :** les deux PR sont mergées sur `main` — resynchronisé de `In progress` à `Review`.
- Point à confirmer par le PO : l'email de réactivation n'est envoyé que sur une vraie transition INACTIVE→ACTIVE, jamais sur un appel idempotent (compte déjà ACTIVE).

---
Item Type: US · Parent: F06.1 · Module: admin · Phase: Socle · Size: S · Priority: High
Stage: ✅
Rôle: administrateur-plateforme
Gate 5 : `pivot-core` PR [#142](https://github.com/PIVOT-PLATFORM/pivot-core/pull/142) (Gate 4 = 100/100) · `pivot-ui` PR [#85](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/85) (Gate 4 = 100/100), spec figée `docs/specs/EPIC-administration/us06-1-4-admin-desactive-compte.md` (rétroactif, 2026-07-08).
