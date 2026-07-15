# US08.7.1 — Créer / supprimer un connecteur

**En tant que** utilisateur-final (owner ou éditeur d'un tableau)
**Je veux** relier deux cartes du canvas par un connecteur, et supprimer un connecteur existant
**Afin de** matérialiser des liens de dépendance ou de causalité entre les cartes du tableau blanc, en temps réel avec les autres participants

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given je suis OWNER ou EDITOR sur un board avec deux cartes distinctes A et B, when j'émets `connection:create {boardId, fromId, toId}` via STOMP, then une `CardConnection` est créée avec les défauts `shape="curved"`, `arrow="none"`, `dashed=false`, `width=2` (label/color null) et l'objet complet est diffusé à toute la room (émetteur inclus) sur `/topic/whiteboard/{boardId}` en `connection:created` | ✅ |
| Given je crée un connecteur, when `fromId === toId` (auto-lien sur la même carte), then aucune connexion n'est créée et rien n'est diffusé (refus silencieux, cohérent avec la convention « rien ne se passe » du POC — pas de message d'erreur STOMP dédié) | ✅ |
| Given un connecteur existe déjà entre A et B, when j'émets `connection:create` pour la même paire dans un sens **ou** dans l'autre (`{fromId:A,toId:B}` ou `{fromId:B,toId:A}`), then aucun doublon n'est créé et rien n'est diffusé (anti-doublon bidirectionnel : `findFirst` sur `{fromId,toId} OU {toId,fromId}` → refus silencieux) | ✅ |
| Given je crée un connecteur, when `fromId` **ou** `toId` ne référence aucune carte existante de ce board, then la création est refusée proprement (aucune connexion créée, aucun broadcast, aucune exception non gérée remontée au handler) — **correction du défaut §6.5** : les deux extrémités sont validées comme cartes existantes du board avant l'écriture, au lieu de laisser Prisma lever une erreur FK non catchée | ✅ |
| Given un connecteur existant d'id C, when j'émets `connection:delete {id:C, boardId}`, then la connexion est supprimée et son id brut est diffusé à toute la room en `connection:deleted` | ✅ |
| Given un id de connecteur inexistant ou déjà supprimé (ex. supprimé en cascade par la suppression d'une carte extrémité), when j'émets `connection:delete`, then l'opération est tolérante (pas d'exception, comportement P2025 absorbé) et aucun `connection:deleted` n'est diffusé pour un id qui n'existait pas | ✅ |
| Error : given un `fromId`/`toId` inexistant sur le board (défaut §6.5), when `connection:create` est traité, then le handler ne plante pas — refus silencieux propre, cohérent avec le reste des mutations qui tolèrent les entités manquantes | ✅ |
| Error : given un boardId inexistant ou dont l'utilisateur n'est pas membre, when un événement `connection:*` est reçu, then aucune mutation n'est effectuée (garde de rôle échoue → refus silencieux, pas de fuite d'existence de board — cohérent anti-énumération 404 des routes REST) | ✅ |
| Security : tenantId et userId résolus exclusivement depuis le SecurityContext (token opaque) — jamais depuis le payload ; le board et les cartes ciblés sont scopés par tenant, un connecteur ne peut relier que des cartes d'un board accessible à l'utilisateur (pas de lien cross-tenant ni cross-board) | ✅ |
| Security : seul `canWrite` (OWNER ou EDITOR) peut créer ou supprimer un connecteur ; un VIEWER émettant `connection:create`/`connection:delete` est refusé silencieusement (aucune mutation, aucun broadcast) | ✅ |
| A11y : le connecteur rendu sur le canvas SVG porte un libellé accessible (`aria-label` décrivant le lien entre les deux cartes), et l'action de suppression est déclenchable au clavier (connecteur focusable, `Delete`/`Backspace` sur connecteur sélectionné) sans dépendre du survol souris | ✅ |
| Tests TI (backend) : create nominal (défauts corrects + broadcast room entière) ; auto-lien `from==to` → 0 création ; doublon bidirectionnel dans les deux sens → 0 création ; `fromId`/`toId` inexistant → 0 création sans exception (fix §6.5) ; delete tolérant d'un id absent ; VIEWER → refus ; cross-tenant → refus | ✅ |
| Tests Vitest (frontend) : émission `connection:create`/`connection:delete`, application optimiste puis réconciliation sur `connection:created`/`connection:deleted`, rendu du connecteur avec défauts, sélection + suppression clavier | ✅ |

## Hors périmètre

- Stylisation d'un connecteur (label, couleur, forme, flèche, pointillés, épaisseur) — couverte par US08.7.2 (`connection:update`)
- Contrainte `@@unique` en base sur la paire de cartes — l'anti-doublon reste garanti en code applicatif (comme le POC, §1.8/§3.6) ; pas de contrainte SQL bidirectionnelle
- Connecteur reliant autre chose que deux cartes (vers un cadre, vers le vide) — hors scope, un connecteur relie strictement deux `Card`
- Repositionnement/routage manuel des points de courbe du connecteur — hors scope Socle

## Notes d'implémentation

- **Traduction de stack** : le POC Node/Prisma/Socket.io (`connection:create`/`connection:delete` sur `board.sockets.ts`, §3.6) est porté sur Spring Boot + Angular + STOMP. Realtime sur `/topic/board/{boardId}` ; garde `canWrite` = rôles OWNER+EDITOR résolus depuis le SecurityContext ; aucune route REST dédiée (mutations connecteurs uniquement via STOMP, comme le POC).
- Backend `pivot-collaboratif-core` : entité `card_connection` (schéma `collaboratif`) — colonnes `board_id`, `from_id`, `to_id`, `label` (null), `color` (null), `shape` (défaut `curved`), `arrow` (défaut `none`), `dashed` (défaut `false`), `width` (défaut `2`), `created_at`. FK `from_id`/`to_id` → `card` avec `onDelete: Cascade` (la suppression d'une carte extrémité supprime le connecteur ; le handler `connection:delete` doit donc tolérer un id déjà cascadé).
- **Fix défaut §6.5** : avant l'insertion, valider que `from_id` **et** `to_id` correspondent à des cartes existantes **du board `board_id`** (une seule requête `count` ou `findMany` sur les deux ids scopés par board) → si l'une manque, refus silencieux sans exception. Contrairement au POC qui laisse Prisma lever une erreur FK non catchée sur ce handler précis.
- Anti auto-lien : `fromId === toId` → return avant toute écriture. Anti-doublon bidirectionnel : rechercher une connexion existante `(fromId,toId)` OU `(toId,fromId)` sur ce board → si trouvée, return silencieux.
- Constantes exactes (§7) figées côté défauts entité, pas re-choisies : `shape="curved"`, `arrow="none"`, `dashed=false`, `width=2`.
- Absorbe la partie connecteur de US30.1.3 (dépendances entre cartes) dans le Socle E08.
- i18n : clés `whiteboard.connector.*` (fr.json / en.json).
- Source : parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §1.8, §3.6, §6.5) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08.

## Notes de mise en œuvre effective (Dev, à date d'implémentation)

Écarts constatés entre les notes ci-dessus (rédigées avant code) et l'implémentation réelle,
documentés ici pour traçabilité — aucun n'est une réinterprétation d'un critère d'acceptation :

- **Topic STOMP réel : `/topic/whiteboard/{boardId}`, pas `/topic/board/{boardId}`.** Le canal
  `/topic/board/*` n'existe pas dans ce repo — EN08.1 a câblé `SimpleBroker` sur le préfixe
  `/topic/whiteboard/*` exclusivement (`WebSocketConfig`, `WhiteboardChannelInterceptor`), et
  toutes les mutations `CARD_*` déjà mergées (EN08.4) diffusent sur `/topic/whiteboard/{boardId}`
  via l'unique endpoint `/app/whiteboard/{boardId}/action` (`WhiteboardActionController` +
  `CanvasActionService`, dispatch par `type` sur l'énumération `CanvasEventType`).
  `connection:create`/`connection:delete` sont branchés sur ce pipeline existant
  (`CONNECTION_CREATE`/`CONNECTION_DELETE` ajoutés à `CanvasEventType`) plutôt que d'ouvrir un
  nouveau canal parallèle `/topic/board/*` — le libellé `/topic/board/{boardId}` de la note
  ci-dessus et des AC était une généralisation reprise de la traduction du POC (rooms Socket.io),
  pas un chemin STOMP Spring littéral.
- **Frontend : la majorité de l'interface existait déjà**, sous le nom **`Connection`** (pas
  `Connector`) — un port antérieur du POC PouetPouet (`BoardStore`, `StompBoardTransport`,
  `StructuredCanvasComponent`, `ConnectionLineComponent`, route en production
  `/whiteboard/:boardId`) parlait déjà exactement le contrat `connection:create`/
  `connection:delete`/`connection:created`/`connection:deleted` avant cette US. Le vrai travail
  frontend restant était : (1) le bug `deleteSelected()` qui ignorait une sélection de connecteur
  seul (Delete/Backspace ne faisait rien) — corrigé dans `board.store.ts` ; (2) l'absence totale
  de tests Vitest sur ce chemin — ajoutés (`board.store.spec.ts`,
  `connection-line.component.spec.ts`, cas clavier dans `board-page.component.spec.ts`). La clé
  i18n `whiteboard.connection.ariaLabel` existait déjà et est utilisée telle quelle (pas de
  nouvelle clé `whiteboard.connector.*` — le domaine s'appelle `connection` dans tout le code
  existant, cartes y compris `board.types.ts`).
- **Migration Flyway : `V3__card_connection.sql`, pas un ajout à V1.**
  `V2__whiteboard_parity.sql` existe déjà (précédent similaire, voir son propre en-tête) et a
  très probablement déjà tourné sur l'instance Cloud SQL recette-managée réelle (déploiement
  continu actif depuis la fusion de V2) — l'éditer sur place risquerait le même problème de
  somme de contrôle Flyway que V2 a été créé pour éviter sur V1. V3 est purement additif.
- Colonne `tenant_id` ajoutée à `card_connection` bien que non listée explicitement ci-dessus —
  convention systématique de ce repo sur toute table liée à un board (`card`, `canvas_event`),
  pour permettre une requête directe filtrée par tenant sans jointure ; pas un défaut
  fonctionnel modifié.

---
Item Type: US · Parent: F08.7 · Module: whiteboard · Phase: Socle · Size: M · Priority: High
Stage: ⬜
Rôle: utilisateur-final
Source: Parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §1.8/§3.6/§6.5) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08
Dépendances: EN08.4 (modèle Card typé + contrats WebSocket) + EN08.1 (isolation WS room, canal STOMP `/topic/board/{boardId}`)
