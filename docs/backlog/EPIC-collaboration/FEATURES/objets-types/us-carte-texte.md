# US08.6.1 — Pense-bête texte (TEXT)

**En tant que** utilisateur-final (OWNER ou EDITOR) d'un tableau blanc
**Je veux** créer, déplacer, redimensionner, éditer, recolorer et supprimer des pense-bêtes texte sur le canvas, synchronisés en temps réel
**Afin de** capturer et organiser des idées sous forme de post-it collaboratifs, à parité complète avec le POC PouetPouet

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un tableau où je suis OWNER/EDITOR, when j'envoie `card:create` sur `/app/board/{boardId}/card/create` avec `{content, posX, posY}` sans `type`, then une carte de type `TEXT` est créée avec les défauts exacts `width=192`, `height=128`, `color=#FFEB3B`, `layer=1`, `locked=false`, et `card:created` (objet complet) est diffusé à toute la room `/topic/board/{boardId}` (émetteur inclus) | ⬜ |
| Given un `clientTag` fourni au `card:create`, when la carte est créée, then le `clientTag` est ré-attaché tel quel dans `card:created` mais **jamais persisté** en base (permet au client de réconcilier sa carte optimiste avec l'id serveur) | ⬜ |
| Given une carte TEXT existante non verrouillée, when j'envoie `card:move {id, posX, posY}`, then la mise à jour applique un `UPDATE ... WHERE id=:id AND boardId=:boardId AND locked=false` ; si au moins une ligne est affectée, `card:moved` est diffusé à la room **sauf l'émetteur** ; si aucune ligne (carte verrouillée) rien n'est diffusé (refus silencieux) | ⬜ |
| Given une carte TEXT non verrouillée, when j'envoie `card:resize {id, width, height}`, then même garde verrou dans le `WHERE` ; `card:resized` diffusé à la room **sauf l'émetteur** si au moins une ligne affectée, sinon refus silencieux | ⬜ |
| Given une carte TEXT non verrouillée, when j'envoie `card:update {id, content}`, then le contenu est mis à jour avec la même garde `locked=false` dans le `WHERE`, et `card:updated` (objet complet) est diffusé à **toute la room** (émetteur inclus — asymétrie assumée vs move/resize, cf. spec §3.4/§6.11) si au moins une ligne affectée | ⬜ |
| Given une carte TEXT non verrouillée, when j'envoie `card:recolor {id, color}`, then la couleur est mise à jour avec la garde `locked=false`, et `card:recolored` diffusé à toute la room si au moins une ligne affectée | ⬜ |
| Given une carte TEXT, when j'envoie `card:delete {id}`, then le serveur lit d'abord `locked` (garde **explicite**, hors `WHERE`) : si verrouillée, refus silencieux ; sinon suppression tolérante à l'absence (P2025/`EntityNotFound` ignoré) et `card:deleted` (id brut) diffusé à toute la room | ⬜ |
| Given une carte TEXT dont le `content` contient une URL (regex `https?://[^\s<>"']+`), when la carte est créée ou mise à jour, then un enrichissement OpenGraph asynchrone non bloquant est déclenché (handoff US08.6.5) et, au retour, `card:meta_updated {id, meta}` est diffusé à toute la room ; si un `card:update` ultérieur retire toute URL du texte, `meta` est explicitement remis à `null` et l'event `card:meta_updated` est émis quand même | ⬜ |
| Error : given un `type` fourni au `card:create` hors de `{TEXT,IMAGE,LINK,SHAPE,DRAW,LABEL,TABLE}`, when la carte est créée, then le champ `type` est retiré et la carte retombe sur le défaut `TEXT` — **jamais d'exception ni d'erreur** renvoyée (cohérent EN08.4) | ⬜ |
| Error : given un `card:move`/`resize`/`update`/`recolor`/`delete` ciblant une carte inexistante ou d'un autre board, when la mutation est tentée, then aucune ligne n'est affectée et rien n'est diffusé (refus silencieux, `boardId` toujours dans le `WHERE`) — pas de fuite d'existence cross-board | ⬜ |
| Security : `tenantId`, `userId` et le rôle (OWNER/EDITOR/VIEWER) sont résolus exclusivement depuis le `SecurityContext` (token opaque) — jamais depuis le path, le body ou le payload STOMP | ⬜ |
| Security : toute mutation `card:*` exige `canWrite` (OWNER ou EDITOR) ; un VIEWER (ou un utilisateur sans rôle sur ce board) est refusé silencieusement (aucun `card:*` diffusé, aucune erreur dédiée — comportement attendu §3.12) | ⬜ |
| Security : l'enrichissement OpenGraph est déclenché côté serveur uniquement pour du contenu appartenant au board de l'utilisateur ; le fetch réseau sortant respecte les gardes SSRF/caps de US08.6.5 (aucune requête émise depuis le payload d'un utilisateur non autorisé) | ⬜ |
| A11y : la carte TEXT rendue est un élément focusable au clavier, éditable via double-clic **et** via Entrée/F2 au focus ; le champ d'édition porte un `aria-label` explicite (« Contenu du pense-bête ») ; les poignées de redimensionnement sont atteignables au clavier et masquées quand la carte est verrouillée | ⬜ |
| A11y : la couleur `#FFEB3B` n'est jamais le seul vecteur d'information ; le contraste texte/fond de la carte respecte WCAG 2.1 AA (ratio ≥ 4.5:1 sur le texte du pense-bête, quelle que soit la couleur de fond choisie) | ⬜ |
| Tests TI (`pivot-collaboratif-core`) : create sans type → TEXT + défauts 192×128/#FFEB3B/layer 1 ; create type invalide → TEXT ; move/resize/update/recolor sur carte verrouillée → 0 mutation, aucun broadcast ; VIEWER sur toute mutation → refus silencieux ; delete verrouillée → refus explicite ; portée broadcast (move/resize exclut l'émetteur, update/recolor/delete room entière) | ⬜ |
| Tests Vitest (`pivot-collaboratif-ui`) : rendu carte TEXT + réconciliation `clientTag`→id serveur, application optimiste move/resize, édition de contenu, recoloration, détection d'URL dans le texte déclenchant l'attente de `card:meta_updated`, reset de `meta` à `null` quand l'URL disparaît | ⬜ |

## Hors périmètre

- Aperçu OpenGraph lui-même (fetch serveur, caps HTML, broadcast `card:meta_updated`) — spécifié dans US08.6.5 ; cette US ne fait que **déclencher** l'enrichissement à la détection d'URL
- Types LABEL/SHAPE/IMAGE/LINK/TABLE — US08.6.2 à US08.6.6
- Groupes, connexions, cadres, verrouillage en masse (`card:lock`), calque (`card:layer`) — F08.7/F08.8/F08.9 (le modèle et les contrats sont posés par EN08.4)
- Grille d'aimantation et guides d'alignement au déplacement — F08.9 organisation (mécanique UI §4.2/§4.3)
- Champs personnalisés attachés à une carte — F08.10

## Notes d'implémentation

- **Backend `pivot-collaboratif-core`** : réutilise le modèle `Card` typé et les gardes `canWrite`/`canAccess` posés par **EN08.4**. Mutations exposées en STOMP (destinations applicatives `/app/board/{boardId}/card/{action}`, broadcast `/topic/board/{boardId}`), pas en REST — le CRUD carte est purement temps réel, cohérent EN08.1/EN08.4.
- **Garde verrou** : pour `move`/`resize`/`update`/`recolor`, la condition `locked=false` est **dans la clause `WHERE`** de l'`UPDATE` (Spring Data / JPQL `updateMany`-équivalent) → 0 ligne affectée = refus silencieux. Pour `delete`, lecture préalable explicite de `locked` (cohérent §3.4).
- **Portée de diffusion** : `card:moved`/`card:resized` → room sauf émetteur (le client applique déjà son déplacement en optimiste) ; `card:updated`/`card:recolored`/`card:deleted` → room entière. Asymétrie **reproduite volontairement** (décision EN08.4, spec §6.11).
- **Détection d'URL** : regex exacte `https?://[^\s<>"']+` appliquée au `content` sur `card:create` **et** `card:update` pour un type `TEXT` ; déclenche l'enrichissement OG d'US08.6.5 (fetch non bloquant côté serveur). Sur `card:update`, si plus aucune URL n'est présente, `meta ← null` explicite + émission de `card:meta_updated`.
- **Décision §6 (parité vs correctifs)** : reproduction fidèle du POC (refus silencieux, asymétrie de broadcast, garde verrou par `WHERE`). Aucun défaut §6 spécifique à TEXT n'est corrigé ici (les correctifs `connection:create`/`vote:stop`/`shares` relèvent d'autres features).
- i18n : clés `whiteboard.card.text.*` (fr.json / en.json).

---
Item Type: US · Parent: F08.6 · Module: whiteboard · Phase: Socle · Size: M · Priority: High
Stage: ⬜
Rôle: utilisateur-final
Source: Parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §1.5, §3.4, §7) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08 ; absorbe US30.1.2 (pense-bêtes / sticky-notes)
Dépendances: EN08.4 (modèle Card typé + contrats WebSocket `card:*`) + EN08.1 (isolation WS room, canal STOMP `/topic/board/{boardId}`) + US08.6.5 (enrichissement OpenGraph, handoff à la détection d'URL)
