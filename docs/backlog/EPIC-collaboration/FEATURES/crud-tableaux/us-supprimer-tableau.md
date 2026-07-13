# US08.1.5 — Supprimer un tableau

**En tant que** owner d'un tableau
**Je veux** supprimer définitivement un tableau
**Afin de** nettoyer mes espaces de travail obsolètes

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| DELETE /api/whiteboard/boards/{boardId} supprime le tableau et toutes ses données | ⬜ |
| Vérification que boardId appartient au tenant courant. Cross-tenant → 404 | ⬜ |
| boardId existant, même tenant, mais utilisateur non membre du board → 404 (même traitement que cross-tenant, anti-énumération/IDOR, cohérent avec US08.1.4) | ⬜ |
| Seul l'OWNER peut supprimer (EDITOR/VIEWER → 403, ces rôles étant déjà membres du board) | ⬜ |
| tenantId résolu exclusivement depuis le SecurityContext (token opaque) — jamais depuis le path ou le body | ⬜ |
| Suppression en cascade : board_members, canvas events, thumbnails, tokens d'invitation | ⬜ |
| Audit event BoardDeleted enregistré avec boardId, title, actorId | ⬜ |
| Les participants actuellement connectés au board reçoivent un message STOMP BOARD_DELETED et sont redirigés vers /whiteboard | ⬜ |
| Tests TI DELETE (owner → 200, editor → 403, cross-tenant → 404, board inexistant → 404) | ⬜ |
| Dialog de confirmation obligatoire : role="alertdialog", aria-modal="true", focus trap | ⬜ |
| Texte du dialog : "Supprimer '[titre]' ? Cette action est irréversible. Tous les éléments du tableau seront perdus." | ⬜ |
| Bouton de confirmation libellé "Supprimer définitivement" (rouge, pas "Confirmer") | ⬜ |
| Après suppression réussie, toast "Tableau supprimé" + la card disparaît de la grille | ⬜ |
| En cas d'erreur réseau, toast "error" + la card reste dans la grille | ⬜ |
| Pendant la suppression, bouton disabled + spinner | ⬜ |
| Tous textes internalisés dans whiteboard.board.delete.* (fr.json / en.json) | ⬜ |

## Hors périmètre
- Corbeille / restauration d'un tableau supprimé : **couvert désormais par US08.1.7** (parité
  visible PouetPouet, 2026-07-13) — la décision hard-delete ci-dessous est révisée par cette US
  ultérieure, voir Notes d'implémentation
- Suppression en masse (bulk delete) : hors scope
- Export automatique avant suppression : hors scope (l'export est couvert par US30.8.3, non dépendant de cette US)

## Notes d'implémentation
- Backend `pivot-collaboratif-core`, endpoint `DELETE /api/whiteboard/boards/{boardId}` → `BoardController.delete()` → `BoardService.delete()`
- **Décision hard-delete initiale (2026-07-09), révisée par US08.1.7 (2026-07-13, parité visible
  PouetPouet)** : cette US décrivait à l'origine une suppression physique en cascade de `board`,
  `board_member`, `canvas_event`, `board_thumbnail`, `board_invitation_token`, la corbeille étant
  jugée hors besoin produit du Socle. Le mainteneur a depuis décidé d'étendre le périmètre Socle à
  la parité visible du POC PouetPouet, qui inclut une corbeille + restauration — **US08.1.7 remplace
  ce comportement par un soft-delete** (colonne `deleted_at`). Le texte de confirmation UI de cette
  US ("action irréversible") doit être révisé par US08.1.7 en conséquence (la suppression n'est plus
  irréversible tant que le tableau reste en corbeille). La traçabilité reste par ailleurs couverte
  par l'événement d'audit `BoardDeleted`, persisté hors table `board`
- tenantId résolu exclusivement depuis le SecurityContext (token opaque) — cohérent avec US08.1.1/US08.1.2/US08.1.4
- **Convention transverse d'accès** (cohérente avec US08.1.1/US08.1.4) : board inexistant, cross-tenant, ou utilisateur non membre → 404 ; membre existant avec rôle EDITOR/VIEWER → 403
- Notification temps réel : broadcast STOMP sur `/topic/board/{boardId}` avec message `BOARD_DELETED`, déclenche la redirection côté Angular (dépend d'EN08.1 — isolation WS room par board)
- Frontend : dialog `role="alertdialog"` déclenché depuis `BoardCardComponent` (menu ⋯), composant `@pivot/design-system` ConfirmDialog
- i18n : clés `whiteboard.board.delete.*`

**Implémentation** : `pivot-collaboratif-core#19` (API CRUD, couvre US08.1.1–US08.1.5) +
`pivot-collaboratif-ui#20` — mergées. `Stage: Done` positionné le 2026-07-09 (recette métier
différée) après constat que le frontmatter était resté à `In progress` malgré le merge.

---
Item Type: US · Parent: F08.1 · Module: whiteboard · Phase: Socle · Size: S · Priority: Critical
Stage: ✅
Rôle: utilisateur-final
Dépendances: US08.1.1
