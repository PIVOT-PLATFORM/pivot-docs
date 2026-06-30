# US08.1.5 — Supprimer un tableau

**En tant que** owner d'un tableau
**Je veux** supprimer définitivement un tableau
**Afin de** nettoyer mes espaces de travail obsolètes

## Critères d'acceptation

| Critère | 🤖 Dev | ✅ PO |
|---------|--------|-------|
| DELETE /api/whiteboard/boards/{boardId} supprime le tableau et toutes ses données | ⬜ | ⬜ |
| Vérification que boardId appartient au tenant courant. Cross-tenant → 404 | ⬜ | ⬜ |
| Seul l'OWNER peut supprimer (EDITOR/VIEWER → 403) | ⬜ | ⬜ |
| Suppression en cascade : board_members, canvas events, thumbnails, tokens d'invitation | ⬜ | ⬜ |
| Audit event BoardDeleted enregistré avec boardId, title, actorId | ⬜ | ⬜ |
| Les participants actuellement connectés au board reçoivent un message STOMP BOARD_DELETED et sont redirigés vers /whiteboard | ⬜ | ⬜ |
| Tests TI DELETE (owner → 200, editor → 403, cross-tenant → 404, board inexistant → 404) | ⬜ | ⬜ |
| Dialog de confirmation obligatoire : role="alertdialog", aria-modal="true", focus trap | ⬜ | ⬜ |
| Texte du dialog : "Supprimer '[titre]' ? Cette action est irréversible. Tous les éléments du tableau seront perdus." | ⬜ | ⬜ |
| Bouton de confirmation libellé "Supprimer définitivement" (rouge, pas "Confirmer") | ⬜ | ⬜ |
| Après suppression réussie, toast "Tableau supprimé" + la card disparaît de la grille | ⬜ | ⬜ |
| En cas d'erreur réseau, toast "error" + la card reste dans la grille | ⬜ | ⬜ |
| Pendant la suppression, bouton disabled + spinner | ⬜ | ⬜ |
| Tous textes internalisés dans whiteboard.board.delete.* (fr.json / en.json) | ⬜ | ⬜ |

---
Item Type: US · Parent: F08.1 · Module: whiteboard · Phase: MVP · Size: S · Priority: Critical
Human Gate: needs-human-valid · Stage: Backlog
