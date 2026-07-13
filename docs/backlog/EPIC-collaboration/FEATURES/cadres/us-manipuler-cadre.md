# US08.8.2 — Déplacer / redimensionner / renommer / calque d'un cadre

**En tant que** utilisateur-final (owner ou éditeur d'un tableau)
**Je veux** déplacer, redimensionner, renommer, activer/désactiver et changer le calque d'un cadre existant
**Afin de** ajuster l'organisation visuelle du tableau blanc, en temps réel avec les autres participants

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given je suis OWNER ou EDITOR et qu'un cadre d'id F existe sur le board, when j'émets `frame:move {id:F, boardId, posX, posY}`, then la position du cadre est mise à jour et diffusée à la room **sauf l'émetteur** en `frame:moved` (l'émetteur applique déjà son propre déplacement en optimiste) | ⬜ |
| Given un cadre d'id F, when j'émets `frame:resize {id:F, boardId, width, height}`, then les dimensions du cadre sont mises à jour et diffusées à la room **sauf l'émetteur** en `frame:resized` | ⬜ |
| Given un cadre existe sur le board A et un cadre homonyme sur le board B, when j'émets `frame:move`/`frame:resize` pour l'id du cadre de A avec `boardId=A`, then la mutation est scopée par `boardId` (clause `where` incluant `board_id`) et ne peut affecter que le cadre du board ciblé — **correction du défaut §6.15** : `boardId` est inclus dans le `where` de move/resize (le POC ne scopait que par `id`) | ⬜ |
| Given un cadre d'id F, when j'émets `frame:update {id:F, boardId, title?, active?}` (patch partiel), then les champs `title` et/ou `active` fournis sont mis à jour et l'objet cadre est diffusé à **toute la room** (émetteur inclus) en `frame:updated` — asymétrie de portée assumée vs move/resize, reproduite du POC (§3.7) | ⬜ |
| Given un cadre avec `active=false`, when j'émets `frame:update {id, boardId, active:true}`, then le drapeau `active` passe à true et le changement est diffusé à toute la room (bascule d'état du cadre visible par tous) | ⬜ |
| Given un cadre d'id F, when j'émets `frame:layer {id:F, boardId, layer}`, then le calque (z-order) du cadre est mis à jour et diffusé à toute la room en `frame:layered` | ⬜ |
| Given un cadre (le modèle `Frame` n'a aucun champ `locked`), when une mutation move/resize/update/layer est appliquée, then aucune garde de verrou n'est évaluée (un cadre n'est jamais verrouillable, §1.6) — contrairement aux cartes, il n'y a pas de filtre `locked:false` | ⬜ |
| Error : given un id de cadre inexistant ou déjà supprimé, when une mutation `frame:move`/`resize`/`update`/`layer` est reçue, then l'opération est tolérante (pas d'exception non gérée) et aucun broadcast n'est émis pour un cadre qui n'existait pas | ⬜ |
| Error : given un boardId inexistant ou dont l'utilisateur n'est pas membre, when une mutation `frame:*` est reçue, then aucune mutation n'est effectuée (garde de rôle échoue → refus silencieux, pas de fuite d'existence — cohérent anti-énumération) | ⬜ |
| Security : tenantId et userId résolus exclusivement depuis le SecurityContext (token opaque) — jamais depuis le payload ; toute mutation de cadre est scopée par tenant et par `boardId` (fix §6.15) — un cadre d'un autre tenant/board ne peut être déplacé/redimensionné via un id deviné | ⬜ |
| Security : seul `canWrite` (OWNER ou EDITOR) peut manipuler un cadre ; un VIEWER émettant une mutation `frame:*` est refusé silencieusement (aucune mutation, aucun broadcast) | ⬜ |
| A11y : le cadre est focusable au clavier ; déplacement/redimensionnement possibles au clavier (flèches pour déplacer, poignées focusables pour redimensionner) sans dépendre du survol souris ; le champ de renommage porte un `<label>` explicite et le bouton d'activation expose son état (`aria-pressed` ou `role="switch"` avec `aria-checked`) | ⬜ |
| Tests TI (backend) : move/resize diffusés room **sauf émetteur** ; scoping par `boardId` dans le `where` (fix §6.15 — un id d'un autre board avec le mauvais `boardId` → 0 mutation) ; update `title`/`active` diffusé **room entière** ; layer diffusé room entière ; aucune garde `locked` (pas de champ) ; id inexistant tolérant ; VIEWER → refus ; cross-tenant → refus | ⬜ |
| Tests Vitest (frontend) : émission move/resize (optimiste local, réconciliation `frame:moved`/`frame:resized` pour les autres), renommage + bascule `active` via `frame:update`, changement de calque, déplacement/redimensionnement clavier | ⬜ |

## Hors périmètre

- Création et suppression d'un cadre — couvertes par US08.8.1 (`frame:create`/`frame:delete`)
- Verrouillage d'un cadre — le modèle `Frame` n'a aucun champ `locked` (§1.6), un cadre n'est jamais verrouillable ; hors scope par construction
- Aimantation à la grille / guides d'alignement lors du déplacement d'un cadre — mécaniques UI canvas traitées dans une US canvas-ux dédiée (§4.2/§4.3), pas dans cette US de mutation temps réel
- Historique undo/redo du déplacement/renommage de cadre — le POC couvre `commitDragFrame`/`commitResizeFrame`/`updateFrame`/`setFrameActive`/`setFrameLayer` dans son historique client (§4.5) ; mécanique undo/redo générale hors de cette US

## Notes d'implémentation

- **Traduction de stack** : le POC Node/Prisma/Socket.io (`frame:move`/`frame:resize`/`frame:update`/`frame:layer` sur `board.sockets.ts`, §3.7) est porté sur Spring Boot + Angular + STOMP. Realtime sur `/topic/board/{boardId}` ; garde `canWrite` = OWNER+EDITOR depuis le SecurityContext ; mutations via STOMP uniquement (pas de route REST dédiée, comme le POC).
- Backend `pivot-collaboratif-core` : mutations partielles de l'entité `frame` (US08.8.1).
- **Fix défaut §6.15** : `frame:move` et `frame:resize` doivent inclure `board_id` dans la clause `where` de l'`UPDATE` (`where {id, board_id}`), au lieu du POC qui ne scopait que par `id` (défensif, cohérent avec les mutations de carte équivalentes). Broadcast uniquement si la mise à jour a effectivement touché une ligne.
- **Portées de broadcast (reproduites du POC, §3.7)** : `frame:move`/`frame:resize` → room **sauf émetteur** (`socket.to`) ; `frame:update` (title/active) et `frame:layer` → **room entière** (`io.to`, émetteur inclus). Asymétrie assumée et documentée (§6.11), pas un bug à corriger.
- `frame:update` : patch partiel sur `title` et/ou `active`. Le POC ne pose pas de garde patch-vide sur `frame:update` (contrairement à `connection:update`) — reproduire ce comportement (title toujours réécrit si présent, active si présent).
- Aucune garde `locked` sur aucune mutation de cadre (le modèle `Frame` n'a pas ce champ, §1.6).
- i18n : clés `whiteboard.frame.*` (renommage, activation) — fr.json / en.json.
- Source : parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §1.6, §3.7, §6.15) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08.

---
Item Type: US · Parent: F08.8 · Module: whiteboard · Phase: Socle · Size: M · Priority: High
Stage: ⬜
Rôle: utilisateur-final
Source: Parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §1.6/§3.7/§6.15) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08
Dépendances: EN08.4 (modèle Card typé + contrats WebSocket) + US08.8.1 (création du cadre, entité `frame`)
