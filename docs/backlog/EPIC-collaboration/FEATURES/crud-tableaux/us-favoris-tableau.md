# US08.1.6 — Favoris de tableaux

**En tant que** utilisateur
**Je veux** épingler un tableau en favori depuis une étoile sur sa carte
**Afin de** retrouver rapidement mes tableaux les plus utilisés en tête de la liste

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un tableau dont je suis membre (owner/editor/viewer), when je clique l'étoile de sa carte dans la grille, then le tableau est marqué favori et l'étoile passe à l'état plein (persistant après rechargement) | ⬜ |
| Given un tableau déjà favori, when je clique à nouveau l'étoile, then le favori est retiré (toggle) et l'étoile revient à l'état vide | ⬜ |
| Given au moins un tableau favori, when la liste des tableaux est affichée, then les tableaux favoris apparaissent en tête (tri stable : favoris d'abord par `updatedAt DESC`, puis non-favoris par `updatedAt DESC`) | ⬜ |
| Given un tri favoris déjà appliqué côté client, when je bascule le favori d'une carte, then la liste est immédiatement réordonnée sans rechargement serveur (tri optimiste côté Angular sur la page déjà chargée) | ⬜ |
| Given le favori est propre à chaque utilisateur, when deux utilisateurs différents consultent le même tableau partagé, then chacun voit son propre état favori indépendant de l'autre | ⬜ |
| Error : given un échec réseau ou 5xx lors du toggle, when la requête échoue, then l'étoile revient à son état précédent + toast `role="alert"` — pas de mise à jour optimiste non confirmée | ⬜ |
| Error : given un boardId inexistant ou dont l'utilisateur n'est plus membre, when POST/DELETE favori est appelé, then 404 (cohérent avec la convention anti-énumération des autres endpoints CRUD tableaux) | ⬜ |
| Security : tenantId et userId résolus exclusivement depuis le SecurityContext (token opaque) — jamais depuis le path ou le body ; un favori ne peut être posé/retiré que sur un board dont l'utilisateur est membre (pas de favori cross-tenant ni sur un board non accessible) | ⬜ |
| Security : l'endpoint de toggle favori ne modifie que la ligne `(board, user)` du user courant — aucun paramètre ne permet de cibler le favori d'un autre utilisateur (IDOR) | ⬜ |
| A11y : étoile = bouton natif `aria-pressed="true\|false"` selon l'état, `aria-label="Ajouter [titre] aux favoris"` / `"Retirer [titre] des favoris"` selon l'état courant, focusable au clavier (Tab, Enter/Espace pour activer), sans dépendre du survol souris | ⬜ |
| Tests TI toggle favori (owner/editor/viewer → 200 chacun, non-membre → 404, cross-tenant → 404) | ⬜ |
| Tests Vitest tri client (favoris en tête, ordre stable) et bascule optimiste de l'étoile | ⬜ |

## Hors périmètre

- Réordonnancement manuel des favoris (drag & drop) — hors scope, ordre dérivé de `updatedAt`
- Favoris partagés/visibles par les autres membres du tableau — le favori reste strictement personnel
- Dossiers ou catégories de favoris — hors scope, simple liste triée en tête

## Notes d'implémentation

- Backend `pivot-collaboratif-core` : nouvelle entité `board_favorite` (colonnes `board_id`, `user_id`, `created_at`), contrainte unique `(board_id, user_id)`. Endpoints `PUT /api/collaboratif/whiteboard/boards/{boardId}/favorite` (ajoute) et `DELETE /api/collaboratif/whiteboard/boards/{boardId}/favorite` (retire), ou endpoint toggle unique — à trancher en implémentation, les deux formes satisfont les AC
- `GET /api/collaboratif/whiteboard/boards` (US08.1.2) enrichi d'un champ `isFavorite: boolean` par board pour permettre le tri favoris-d'abord côté client sans appel supplémentaire
- Frontend : étoile sur `BoardCardComponent` (grille whiteboard, US08.1.3), tri appliqué dans `BoardListComponent` sur les boards déjà chargés en page — cohérent avec la pagination "Charger plus" existante (US08.1.3)
- i18n : clés `whiteboard.board.favorite.*` (fr.json / en.json)
- Source : parité visible vs POC PouetPouet (étoile favoris sur la liste de tableaux) — décision mainteneur d'extension du Socle noyau F08.x, suite à `docs/audits/audit-recette-fonctionnelle.md`

---
Item Type: US · Parent: F08.1 · Module: whiteboard · Phase: Socle · Size: S · Priority: Medium
Stage: ✅
Rôle: utilisateur-final
Source: Parité visible PouetPouet (audit recette fonctionnelle Socle, 2026-07-13) — décision mainteneur d'extension du périmètre F08.x « noyau + parité visible »
Dépendances: US08.1.2 (liste tableaux backend), US08.1.3 (liste tableaux Angular)
