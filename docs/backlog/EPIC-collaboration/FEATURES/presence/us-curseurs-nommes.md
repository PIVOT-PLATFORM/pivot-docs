# US08.5.2 — Curseurs nommés throttlés

**En tant que** utilisateur-final collaborant en temps réel
**Je veux** voir les curseurs nommés des autres participants se déplacer de façon fluide sur le canvas
**Afin de** suivre où chacun travaille sans surcharger le réseau ni le rendu

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given plusieurs participants sur un board, when un participant déplace sa souris, then sa position est envoyée au serveur via `board:cursor {boardId, x, y}` et rediffusée aux autres sous forme de curseur nommé (label = `displayName` du participant) | ⬜ |
| Given le serveur reçoit plusieurs `board:cursor` d'un même `(board, user)` entre deux flushs, when il agrège, then il **écrase** la position précédente dans son buffer (dernier arrivé gagne, `last-writer-wins` par `(board, user)`) — pas de file d'attente, seule la dernière position est retenue | ⬜ |
| Given des positions bufferisées, when le serveur flush, then il émet `board:cursors` (tableau `CursorUpdate[]`) à **toute la room** (émetteur inclus) toutes les **50 ms (20 Hz)**, via un timer partagé entre tous les boards | ⬜ |
| Given aucun curseur reçu, when un tick de flush ne trouve aucun buffer non vide, then le timer **s'auto-arrête** (pas de tourne-à-vide permanent) et redémarre au premier `board:cursor` suivant | ⬜ |
| Given un `board:cursor` reçu, when l'émetteur n'a **pas** de rôle résolu sur ce board (ou pas d'`userInfo`), then le serveur **ignore silencieusement** l'événement (return, pas d'erreur) — un non-membre ne peut pas diffuser de curseur | ⬜ |
| Given un participant `VIEWER` (lecture seule), when il déplace sa souris, then son curseur nommé est **diffusé** (le curseur relève de la présence, garde `canAccess` incluant VIEWER — pas `canWrite`) | ⬜ |
| Error : given un `board:cursors` reçu pour un `userId` sans `board:join`/présence préalable (message tardif après reconnexion), when le client le traite, then il l'ignore (log `console.warn`), pas de curseur fantôme créé — cohérent avec le repli d'US08.3.2c | ⬜ |
| Security : `displayName` rendu **échappé** (texte SVG `<text>`/`textContent`, jamais `innerHTML`) dans l'overlay curseurs — prévention XSS via le nom du participant | ⬜ |
| Security : isolation héritée d'EN08.1 — un client abonné à `/topic/board/{boardId}` ne reçoit jamais les `board:cursor(s)` d'un autre board ni d'un autre tenant ; `board:cursor` sans rôle sur le board → rejeté serveur (aucune fuite de position cross-board) | ⬜ |
| A11y : overlay curseurs `aria-hidden="true"` (purement décoratif, comme US08.3.2c) — les curseurs distants n'interfèrent pas avec la navigation clavier ni l'ordre de tabulation des cartes | ⬜ |
| Tests TI : deux `board:cursor` successifs du même user avant un flush → un seul `CursorUpdate` (dernière position) ; flush cadencé à 50 ms ; auto-arrêt du timer sans buffer ; `board:cursor` sans rôle → ignoré | ⬜ |
| Tests Vitest : throttle/flush 50 ms, écrasement last-writer-wins par `(board, user)`, échappement XSS du `displayName`, ignore d'un `board:cursors` sans présence préalable, VIEWER diffusé (canAccess) | ⬜ |

## Hors périmètre

- **Rendu de l'overlay SVG des curseurs et attribution de couleur** : déjà portés par **US08.3.2c** (overlay SVG, couleur déterministe par `userId` consommée du backend, timeout 5 s d'inactivité). Cette US **complète** US08.3.2c/US08.5.1 en spécifiant précisément le **throttle serveur 50 ms (20 Hz)** et l'agrégation **last-writer-wins par (board, user)** côté backend Spring/STOMP — elle ne redéfinit ni le composant d'overlay ni la palette de couleurs.
- **Panneau/liste des participants** (avatars, "+N", rôles) : porté exclusivement par **US08.5.1** — cette US ne concerne que le flux de positions de curseurs.
- Attribution de la couleur elle-même (algorithme déterministe par `userId`) : US08.5.1 (présence backend) — consommée telle quelle.
- Historique/replay des trajectoires de curseurs, laser pointer, statut "en train d'écrire" : non Socle (US30.x).

## Notes d'implémentation

- **Contrat WS (§3.2)** : entrant `board:cursor {boardId, x, y}` (écrit dans un buffer serveur par `(boardId, userId)`, **écrase** la position précédente — dernier arrivé gagne, pas de queue ; requiert `userInfo` + un rôle sur le board, sinon return silencieux). Sortant `board:cursors` (`CursorUpdate[]`) : flush **toutes les 50 ms (20 Hz)** via un `setInterval` **global partagé entre tous les boards**, diffusé à toute la room (émetteur inclus). Le timer démarre au premier curseur reçu et **s'auto-arrête** si un tick ne trouve aucun buffer non vide.
- **Constante (§7)** : flush curseurs (throttle) = **50 ms** (20 Hz).
- **Garde de rôle** : `board:cursor` exige un rôle résolu (`canAccess`, VIEWER inclus — le curseur est de la présence, pas une mutation). Sans rôle/userInfo → ignoré silencieusement.
- **Traduction stack** : côté backend Spring, le buffer `(boardId, userId) → dernière position` est agrégé et flushé par un ordonnanceur unique à 50 ms sur `/topic/board/{boardId}` ; tenant/user résolus depuis le `SecurityContext` (jamais du payload). Côté `pivot-collaboratif-ui`, consommé par l'overlay SVG d'US08.3.2c (échappement `displayName` inchangé). Isolation room héritée d'EN08.1.
- Dépend d'EN08.4/EN08.1 (contrat WS, isolation room), d'US08.5.1 (présence backend, couleur) et d'US08.3.2c (overlay curseurs — complété, non dupliqué).

---
Item Type: US · Parent: F08.5 · Module: whiteboard · Phase: Socle · Size: S · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §3.1, §3.2, §7) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08
Dépendances: EN08.4 (modèle Card typé) + EN08.1 (isolation WS room) + US08.5.1 (présence backend, couleur) + US08.3.2c (overlay curseurs, throttle 50 ms + nommage complétés non dupliqués)
