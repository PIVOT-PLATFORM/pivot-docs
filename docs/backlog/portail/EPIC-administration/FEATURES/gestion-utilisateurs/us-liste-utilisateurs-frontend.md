# US06.1.2 — Admin liste utilisateurs de son tenant (frontend)

**En tant que** admin tenant
**Je veux** voir la liste des utilisateurs dans l'interface d'administration Angular
**Afin de** visualiser et gérer les membres de mon organisation

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|-------|
| Page `/admin/users` accessible uniquement aux ROLE_ADMIN | ⬜ |
| Tableau des utilisateurs : nom, email, rôle (badge), statut, date création | ⬜ |
| Recherche et filtres (rôle, statut) | ⬜ |
| Pagination (20 par page) | ⬜ |
| Tests Vitest AdminUsersComponent | ⬜ |
| Consomme GET /api/admin/users défini dans US06.1.1 (contrat pagination Spring Page) | ⬜ |
| État "loading" : skeleton de tableau affiché pendant le chargement | ⬜ |
| État "empty state" : message "Aucun utilisateur correspondant à vos filtres" + bouton "Réinitialiser les filtres" | ⬜ |
| État "error" réseau : message + bouton "Réessayer" | ⬜ |
| La pagination affiche le total ("Utilisateurs 1-20 sur 47") ; boutons Précédent/Suivant désactivés aux bornes | ⬜ |
| Tableau a <caption> ou aria-label="Liste des utilisateurs du tenant" | ⬜ |
| Badges de rôle et de statut ne sont pas uniquement différenciés par couleur — texte du statut/rôle inclus dans le badge | ⬜ |
| Champ de recherche a label associé via for/id ou aria-label ; résultat de filtrage annoncé via aria-live="polite" ("X utilisateurs affichés") | ⬜ |
| Pagination : nav avec aria-label="Pagination" ; boutons Précédent/Suivant ont aria-label explicites | ⬜ |
| En-têtes de colonnes, labels de filtres, statuts, badges internalisés dans admin.users.list.* (fr.json / en.json) | ⬜ |
| Sur mobile (< 768px), tableau affiche uniquement nom + statut + action ; colonnes secondaires accessibles via ligne expandable | ⬜ |

---
Item Type: US · Parent: F06.1 · Module: admin · Phase: MVP · Size: S · Priority: High
Stage: Backlog
