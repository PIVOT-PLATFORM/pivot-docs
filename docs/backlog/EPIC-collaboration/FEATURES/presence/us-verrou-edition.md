# US08.5.3 — Verrou doux d'édition

**En tant que** utilisateur-final éditant une carte
**Je veux** signaler aux autres participants qu'une carte est en cours d'édition
**Afin de** limiter les collisions d'édition sans pour autant bloquer qui que ce soit

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given je commence à éditer une carte (focus/double-clic), when l'édition démarre, then `card:editing {cardId, boardId, editing:true}` est envoyé au serveur et rediffusé aux **autres participants** (room sauf émetteur) avec `{cardId, userId, name, editing:true}` — la carte apparaît "en cours d'édition par [name]" chez eux | ⬜ |
| Given le verrou est **doux/informatif**, when un second participant déclare `editing:true` sur la **même** carte simultanément, then aucune garde serveur ne l'en empêche — **deux utilisateurs peuvent porter le flag d'édition sur la même carte en même temps** (verrou informatif, pas exclusif) | ⬜ |
| Given un flag d'édition est posé, when le serveur le traite, then **aucune écriture en base** n'a lieu — l'état est purement en mémoire côté serveur (`socket.data.editingCards`), et le flag d'un participant n'empêche techniquement pas l'autre de muter la carte | ⬜ |
| Given je termine mon édition (blur explicite du champ), when le focus est perdu, then `card:editing {editing:false}` est diffusé aux autres (room sauf émetteur, **avec** `name`) et l'indicateur "en cours d'édition" disparaît de leur côté | ⬜ |
| Given je quitte le board (`board:leave`), when je pars proprement, then toute édition en cours par mon socket est **libérée** et diffusée (`editing:false`) — pas de flag d'édition résiduel après un départ propre | ⬜ |
| Given je me déconnecte brutalement (`disconnect`, crash/perte réseau), when le socket tombe, then toute mon édition en cours est libérée et diffusée à **toute la room** (room entière, pas "sauf émetteur") avec un événement `card:editing {cardId, userId, editing:false}` **sans `name`** — pas de verrou fantôme persistant | ⬜ |
| Given je rejoins un board (`board:join`) où des éditions sont en cours, when je reçois l'état initial, then les `card:editing` en cours me sont **rejoués** afin que je voie immédiatement quelles cartes sont éditées par d'autres | ⬜ |
| Given un `card:editing` reçu, when l'émetteur a un rôle sur le board (tout rôle, `canAccess`, **pas** `canWrite`), then il est accepté ; when l'émetteur n'a aucun rôle, then il est ignoré silencieusement (return) — un non-membre ne peut pas poser de flag | ⬜ |
| Error : given un `disconnect` d'un socket qui n'éditait aucune carte, when le nettoyage s'exécute, then aucun `card:editing` n'est émis inutilement (pas d'événement vide, pas d'exception) | ⬜ |
| Security : `name` rendu **échappé** (`textContent`, jamais `innerHTML`) dans l'indicateur d'édition — prévention XSS via le nom du participant ; isolation room héritée d'EN08.1 (un `card:editing` ne fuit jamais vers un autre board/tenant) | ⬜ |
| Security : le flag d'édition n'accorde **aucun** privilège — il ne verrouille pas la carte, ne modifie pas les gardes `canWrite` des mutations `card:*`, et ne peut pas être utilisé pour empêcher un OWNER/EDITOR légitime de muter une carte (pas de déni de service par flag) | ⬜ |
| A11y : l'indicateur "en cours d'édition par [name]" est annoncé de façon accessible (texte visible + `aria-label`/`aria-live` discret), pas signalé uniquement par la couleur ; il n'empêche pas la navigation clavier vers la carte | ⬜ |
| Tests TI : deux `card:editing:true` concurrents sur la même carte → les deux acceptés (pas de garde exclusive, aucune écriture DB) ; `board:leave` libère le flag ; `disconnect` diffuse `editing:false` **sans name** à toute la room ; `board:join` rejoue les éditions en cours ; émetteur sans rôle → ignoré | ⬜ |
| Tests Vitest : affichage/masquage de l'indicateur d'édition sur `editing:true/false`, échappement XSS du `name`, rejeu au join, disparition au disconnect distant, a11y (axe-core) | ⬜ |

## Hors périmètre

- **Verrou dur d'édition** (`card.locked`, empêchant réellement déplacement/redimensionnement/suppression) : mécanisme **distinct** porté par EN08.4/§4.6 — ce verrou-ci est **doux et informatif**, il ne bloque aucune mutation. Les deux ne doivent pas être confondus (§4.6 : le verrou doux bloque au plus l'ouverture en édition côté client, jamais le drag).
- Résolution de conflit / merge d'édition concurrente (OT/CRDT) : hors Socle — le module reste "dernier écrivain gagne", le flag n'est qu'un signal social.
- Curseurs nommés et panneau de présence : US08.5.2 / US08.5.1.
- Verrouillage exclusif optionnel (empêcher réellement la co-édition) : non demandé — le POC de référence est explicitement non exclusif (§3.3).

## Notes d'implémentation

- **Contrat WS (§3.3)** : entrant `card:editing {cardId, boardId, editing:boolean}` — requiert **un rôle** (tout rôle, `canAccess`, pas `canWrite`), **aucune écriture DB** (état en mémoire `socket.data.editingCards`). Sortant `card:editing {cardId, userId, name, editing}` room **sauf émetteur**. Libéré au blur explicite, à `board:leave`, ou au `disconnect` — dans ce **dernier** cas, événement **sans `name`**, diffusé à la **room entière** (pas "sauf émetteur").
- **Non exclusif (§3.3/§6)** : aucune garde serveur n'empêche deux utilisateurs de déclarer `editing:true` sur la même carte — verrou purement informatif, pas un lock. Il n'affecte pas les gardes de mutation `card:*` (celles-ci restent sous `canWrite` + `locked` d'EN08.4).
- **Rejeu au join** : `board:join` rejoue chaque `card:editing` en cours à l'arrivant (cf. §3.1 — même mécanisme que le rejeu du timer).
- **Traduction stack** : backend Spring — état d'édition en mémoire par session STOMP (pas de table), diffusé sur `/topic/board/{boardId}` ; `name`/`userId` résolus depuis le `SecurityContext` ; nettoyage sur `SessionDisconnectEvent` (diffusion `editing:false` sans `name`, room entière) et sur `board:leave`. Côté `pivot-collaboratif-ui`, indicateur d'édition rendu avec `name` **échappé** (`textContent`). Isolation room héritée d'EN08.1.
- Dépend d'EN08.4/EN08.1 (contrat WS `card:*`, isolation room, distinction avec le verrou dur `locked`) et d'US08.5.1 (présence backend, résolution `name`/`userId`).

---
Item Type: US · Parent: F08.5 · Module: whiteboard · Phase: Socle · Size: S · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §3.1, §3.3, §7) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08
Dépendances: EN08.4 (modèle Card typé, verrou dur `locked` distinct §4.6) + EN08.1 (isolation WS room) + US08.5.1 (présence backend, résolution name/userId)
