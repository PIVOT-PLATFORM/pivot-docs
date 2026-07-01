# US06.1.4 — Admin désactive un compte utilisateur

**En tant que** admin tenant
**Je veux** désactiver le compte d'un utilisateur de mon organisation
**Afin de** bloquer l'accès sans supprimer les données

## Critères d'acceptation

| Critère | 🤖 Dev | ✅ PO |
|---------|--------|-------|
| PATCH /api/admin/users/{userId}/status accepte `{ status: "INACTIVE" }` | ⬜ | ⬜ |
| Utilisateur désactivé → 401 à la prochaine requête (tokens révoqués) | ⬜ | ⬜ |
| Un admin ne peut pas se désactiver lui-même | ⬜ | ⬜ |
| Audit event `UserDeactivated` enregistré | ⬜ | ⬜ |
| Bouton "Désactiver" dans la liste utilisateurs (US06.1.2) + confirmation | ⬜ | ⬜ |
| Tests TI PATCH /api/admin/users/{id}/status | ⬜ | ⬜ |
| Le endpoint vérifie que userId appartient au tenant courant avant tout traitement. userId d'un autre tenant → 404. Test TI cross-tenant explicite | ⬜ | ⬜ |
| Les seules valeurs acceptées pour "status" via cet endpoint sont ACTIVE et INACTIVE. Toute autre valeur → 400. Validation via enum strict dans le DTO | ⬜ | ⬜ |
| La validation du token dans TokenService vérifie que user.status == ACTIVE (retourne 401 sinon, même si le token n'est pas expiré) | ⬜ | ⬜ |
| Dialog de confirmation mentionne explicitement la conséquence : "L'utilisateur sera déconnecté immédiatement de toutes ses sessions" | ⬜ | ⬜ |
| Après désactivation, toast "Compte désactivé" + badge statut mis à jour en temps réel | ⬜ | ⬜ |
| Option "Réactiver" disponible sur les comptes INACTIVE dans la même liste (appelle PATCH avec status: ACTIVE) | ⬜ | ⬜ |
| En cas d'erreur, toast "error" + statut revient à ACTIVE (rollback optimiste) | ⬜ | ⬜ |
| Bouton "Désactiver" a aria-label="Désactiver le compte de [nom]" pour éviter les boutons identiques dans le tableau | ⬜ | ⬜ |
| Dialog a role="alertdialog" (action destructive), aria-modal="true", focus trap | ⬜ | ⬜ |
| Textes du dialog, toast et statuts internalisés dans admin.users.status.* (fr.json / en.json) | ⬜ | ⬜ |

---
Item Type: US · Parent: F06.1 · Module: admin · Phase: MVP · Size: S · Priority: High
Human Gate: human-validated · Stage: Backlog
