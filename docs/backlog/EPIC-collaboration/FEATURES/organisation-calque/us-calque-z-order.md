# US08.9.3 — Calque / z-order (premier plan / arrière-plan)

**En tant que** utilisateur d'un tableau blanc
**Je veux** placer une carte ou un cadre au premier plan ou à l'arrière-plan (changer son calque)
**Afin de** contrôler l'ordre de superposition des éléments qui se chevauchent sur le canvas

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given je suis OWNER ou EDITOR et une carte est sélectionnée, when j'active « Passer au premier plan » (`card:layer {id, layer}`), then le champ `layer` de la carte est mis à jour (`update`, pas `updateMany`) et un message STOMP `card:layered {id, layer}` est diffusé à toute la room `/topic/board/{boardId}` (émetteur inclus) en cas de succès | ⬜ |
| Given une carte sélectionnée, when j'active « Envoyer à l'arrière-plan », then le `layer` de la carte est ajusté sous celui des autres éléments et `card:layered` est diffusé à toute la room | ⬜ |
| Given un cadre (`Frame`) sélectionné, when j'active « Premier plan » / « Arrière-plan » (`frame:layer {id, layer}`), then le `layer` du cadre est mis à jour et `frame:layered {id, layer}` est diffusé à toute la room | ⬜ |
| Given une carte **verrouillée** incluse dans une sélection, when je change le calque de la sélection (`setLayerSelected`), then le calque de la carte verrouillée change **aussi** — le z-order est la **seule** mutation qui n'est **pas** bloquée par `locked` (`card:layer` n'a aucune garde `locked`, §4.6) | ⬜ |
| Given plusieurs éléments qui se chevauchent avec des `layer` distincts, when le canvas est rendu, then l'ordre de superposition visuel respecte le champ `layer` (valeur haute = au-dessus), de façon cohérente entre tous les participants après réception des broadcasts | ⬜ |
| Error : given un `id` de carte/cadre inexistant, when `card:layer` / `frame:layer` est reçu, then aucun broadcast n'est émis (mutation sans effet tolérée, pas d'exception remontée au client) | ⬜ |
| Error : given un `boardId` inexistant ou cross-tenant, when `card:layer` / `frame:layer` est reçu, then le serveur refuse silencieusement (aucune mutation, aucun broadcast) — convention « rien ne se passe » du canal temps réel (§3.12) | ⬜ |
| Security : le rôle est résolu depuis le SecurityContext / la room STOMP (`canWrite` = OWNER ou EDITOR) — un VIEWER émettant `card:layer` / `frame:layer` est refusé silencieusement ; `boardId`/`tenantId`/`userId` ne sont jamais lus du payload pour l'autorisation ; l'`id` est scopé par `boardId` pour empêcher un changement de calque cross-board | ⬜ |
| A11y : les commandes « Premier plan » / « Arrière-plan » sont des boutons natifs focusables (Tab, Enter/Espace), avec `aria-label` explicite ; l'ordre de superposition ne doit pas être la seule information distinguant deux éléments (le contenu reste accessible indépendamment du z-order) | ⬜ |
| Tests TI : `card:layer` (OWNER/EDITOR → `layer` mis à jour + broadcast ; VIEWER → refus silencieux) ; `card:layer` sur carte **verrouillée** → mutation appliquée (non bloquée par `locked`) ; `frame:layer` idem ; id inexistant → pas de broadcast ; cross-tenant → refus silencieux | ⬜ |
| Tests Vitest : boutons premier plan / arrière-plan émettent `card:layer` / `frame:layer` ; réception `card:layered` / `frame:layered` réordonne le rendu ; changement de calque d'une sélection incluant une carte verrouillée applique bien le nouveau calque à cette carte | ⬜ |

## Hors périmètre

- Réordonnancement fin par glisser-déposer d'une pile de calques (panneau « couches ») — hors scope, seules les actions premier/arrière-plan sont couvertes
- Calque partagé/nommé (groupes de calques type Photoshop) — `layer` est un simple entier par élément, pas de notion de couche nommée
- Protection du z-order par le verrou — au contraire, le z-order est explicitement **non** protégé par `locked` (c'est l'objet d'un AC ci-dessus)
- Ordre de superposition inter-types garanti (une carte toujours au-dessus d'un cadre) — l'ordre dérive uniquement du champ `layer`, sans priorité par type

## Notes d'implémentation

- Backend `pivot-collaboratif-core` : champ `layer` (entier, défaut `1`) sur les entités `Card` et `Frame` (EN08.4 pour `Card` ; cadres en F08.8). Handlers STOMP :
  - `card:layer {id, layer}` → `update` (pas `updateMany`), **aucune garde `locked`** (§4.6 : le z-order est la seule mutation non protégée par le verrou) ; broadcast `card:layered {id, layer}` à toute la room (`io.to(room)`) en cas de succès
  - `frame:layer {id, layer}` → `update` ; broadcast `frame:layered {id, layer}` à toute la room
- Côté UI, `setLayerSelected` **ne filtre pas** les cartes verrouillées (cohérence avec la matrice §4.6) — contrairement à `deleteSelected`/`recolorSelected`/redimensionnement qui, eux, excluent les verrouillées
- Le rendu applique `layer` comme z-index visuel (valeur haute au-dessus)
- Garde `canWrite` (OWNER+EDITOR) sur les deux handlers ; refus silencieux pour VIEWER et board non résolu (§3.12)
- i18n : clés `whiteboard.board.layer.*` (premier plan, arrière-plan) — fr.json / en.json
- Source : parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §3.4 `card:layer`, §3.7 `frame:layer`, §4.6) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08

---
Item Type: US · Parent: F08.9 · Module: whiteboard · Phase: Socle · Size: S · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §3.4, §3.7, §4.6) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08
Dépendances: EN08.4 (modèle Card typé + contrats WebSocket) + EN08.1 (isolation WS room)
