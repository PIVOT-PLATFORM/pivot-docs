# US08.9.2 — Verrouiller / déverrouiller des cartes (matrice complète)

**En tant que** utilisateur d'un tableau blanc
**Je veux** verrouiller ou déverrouiller en masse une sélection de cartes
**Afin de** protéger des cartes structurantes contre toute modification accidentelle (déplacement, redimensionnement, suppression, recoloration, édition), tout en gardant la maîtrise du z-order

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given je suis OWNER ou EDITOR et j'ai sélectionné une ou plusieurs cartes, when j'active « Verrouiller » (`card:lock {ids, locked:true}`), then le champ `locked` passe à `true` sur toutes les cartes ciblées (`updateMany({id in ids, boardId})`, **sans** filtre `locked:false`) et un message STOMP `cards:locked {ids, locked}` est diffusé **inconditionnellement** à toute la room (même si 0 ligne réellement modifiée) | ⬜ |
| Given une sélection contenant des cartes déjà verrouillées, when je « Verrouiller » à nouveau, then l'opération réussit quand même sur toutes les cartes (verrouiller doit marcher même sur du déjà-verrouillé — pas de garde `locked:false` sur ce handler) | ⬜ |
| Given des cartes verrouillées, when j'active « Déverrouiller » (`card:lock {ids, locked:false}`), then `locked` repasse à `false` sur les cartes ciblées et `cards:locked {ids, locked:false}` est diffusé inconditionnellement à toute la room | ⬜ |
| Given une carte verrouillée, when une tentative de **déplacement** individuel ou de **suivi en groupe/sélection déplacée** la concerne, then la carte reste immobile : le déplacement individuel est refusé et la carte est exclue des `followIds` du déplacement de groupe (§4.6) | ⬜ |
| Given une carte verrouillée, when une tentative de **redimensionnement** individuel **ou** multi-sélection la concerne, then elle est exclue du calcul (poignées masquées + garde handler ; exclue du cadre englobant homothétique) et garde sa taille/position d'origine (§4.6, §5.8) | ⬜ |
| Given une carte verrouillée, when une tentative de **suppression**, de **recoloration** ou d'**édition/ouverture détail (double-clic)** la concerne, then l'action est bloquée (boutons/color-picker masqués ; `deleteSelected`/`recolorSelected` filtrent via les seuls ids non verrouillés) (§4.6) | ⬜ |
| Given une carte verrouillée incluse dans une sélection, when je change le **calque (z-order)** de la sélection, then le calque de la carte verrouillée change aussi — le z-order est **la seule mutation NON bloquée** par `locked` (§4.6, cf. US08.9.3) ; de même, la **couleur de contour de groupe** n'est pas bloquée par le verrou individuel | ⬜ |
| Given une carte de type `DRAW` dans la sélection, when j'active « Verrouiller », then la carte `DRAW` est exclue de l'opération et reste non verrouillée — un dessin est **structurellement non verrouillable** (« Drawings can't be locked », §4.6) | ⬜ |
| Error : given un `boardId` inexistant ou cross-tenant, when `card:lock` est reçu, then le serveur refuse silencieusement (aucune mutation, aucun broadcast) — convention « rien ne se passe » du canal temps réel (§3.12) | ⬜ |
| Security : le rôle est résolu depuis le SecurityContext / la room STOMP (`canWrite` = OWNER ou EDITOR) — un VIEWER émettant `card:lock` est refusé silencieusement ; `boardId`/`tenantId`/`userId` ne sont jamais lus du payload pour l'autorisation ; `ids` scopés par `boardId` (`where:{id in ids, boardId}`) pour empêcher un verrouillage cross-board | ⬜ |
| Security : le verrou dur (`locked`) est un état persisté distinct du verrou doux d'édition distante (`remoteEditor`, §3.3) — le verrou doux bloque seulement l'ouverture en édition, jamais le drag ; les deux mécanismes ne doivent pas être confondus dans l'implémentation | ⬜ |
| A11y : les commandes « Verrouiller » / « Déverrouiller » sont des boutons natifs focusables (Tab, Enter/Espace), avec `aria-pressed` reflétant l'état de la sélection et `aria-label` explicite ; une carte verrouillée expose visuellement **et** via ARIA (`aria-disabled` / cadenas décrit) son état, sans dépendre uniquement de la couleur | ⬜ |
| Tests TI : lock en masse (OWNER/EDITOR → `locked=true` + broadcast inconditionnel ; VIEWER → refus silencieux) ; re-lock d'une carte déjà verrouillée → succès ; unlock ; `DRAW` exclu du lock ; move/resize/delete/recolor sur carte verrouillée → 0 mutation ; `card:layer` sur carte verrouillée → mutation appliquée (non bloquée) ; cross-tenant → refus silencieux | ⬜ |
| Tests Vitest : bouton verrouiller/déverrouiller émet `card:lock` ; réception `cards:locked` bascule l'état + masque poignées/boutons d'édition ; sélection mixte (dont `DRAW`) → `DRAW` non verrouillé ; guard UI empêche move/resize/delete/recolor localement sur carte verrouillée | ⬜ |

## Hors périmètre

- Verrouillage d'un cadre (`Frame`) — le modèle `Frame` n'a **aucun** champ `locked` (§1.6) : un cadre n'est jamais verrouillable, hors scope
- Verrou exclusif d'édition collaborative (un seul éditeur à la fois) — c'est le verrou doux informatif `card:editing` (§3.3), distinct de cette US
- Verrouillage partiel (verrouiller seulement le déplacement mais pas la recoloration) — le verrou est tout-ou-rien selon la matrice §4.6, pas de granularité par action
- Permission de verrouillage réservée à l'OWNER — un EDITOR peut verrouiller/déverrouiller (`canWrite`), pas de restriction OWNER-only ici

## Notes d'implémentation

- Backend `pivot-collaboratif-core` : champ `locked` (booléen, défaut `false`) sur l'entité `Card` (EN08.4). Handler STOMP `card:lock {ids:string[], locked:boolean}` :
  - `updateMany({id in ids, boardId})` set `locked` — **pas** de filtre `locked:false` (verrouiller doit marcher sur du déjà-verrouillé)
  - broadcast `cards:locked {ids, locked}` **inconditionnel** (`io.to(room)`, émetteur inclus), même si 0 ligne affectée
  - exclusion `DRAW` : filtrer les cartes de type `DRAW` hors des `ids` avant l'`updateMany` (elles restent non verrouillables)
- **Matrice §4.6** portée par les handlers de mutation existants (EN08.4 / US08.6.x) : `card:move`/`card:resize`/`card:update`/`card:recolor` filtrent `locked:false` **dans le `where`** (`count=0` → refus silencieux, broadcast si `count>0`) ; `card:delete` lit `locked` en garde explicite préalable ; `card:layer` n'a **aucune** garde `locked` (z-order non protégé) ; le redimensionnement multi-sélection exclut les cartes verrouillées du cadre englobant côté UI
- Le verrou dur `locked` est indépendant du verrou doux `card:editing` (§3.3) : ce dernier est en mémoire, purement informatif, et ne bloque que l'ouverture en édition
- Garde `canWrite` (OWNER+EDITOR) sur `card:lock` ; refus silencieux pour VIEWER et board non résolu (§3.12)
- i18n : clés `whiteboard.board.lock.*` (verrouiller, déverrouiller, carte verrouillée) — fr.json / en.json
- Source : parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §3.4 `card:lock`, §4.6 matrice, §5.2) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08

---
Item Type: US · Parent: F08.9 · Module: whiteboard · Phase: Socle · Size: M · Priority: High
Stage: ⬜
Rôle: utilisateur-final
Source: Parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §3.4, §4.6, §5.2) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08
Dépendances: EN08.4 (modèle Card typé + contrats WebSocket, handlers de mutation portant la matrice de verrou) + EN08.1 (isolation WS room)
