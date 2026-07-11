# US08.3.1 — Connexion WebSocket au canvas d'un tableau

**En tant que** utilisateur
**Je veux** me connecter en temps réel au canvas d'un tableau via WebSocket
**Afin de** collaborer simultanément avec d'autres participants

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Endpoint STOMP : `/ws/whiteboard/{boardId}` avec isolation room (EN08.1) | ⬜ |
| Authentification token opaque sur le handshake WS | ⬜ |
| Messages : JOIN, LEAVE, DRAW, CURSOR_MOVE, UNDO | ⬜ |
| Broadcast aux participants du même tableau uniquement | ⬜ |
| Tests TI WebSocket board session (Testcontainers + WS client) | ⬜ |
| À la souscription STOMP sur /topic/whiteboard/{boardId} (et /presence), backend vérifie que l'user est membre actif (owner/editor/viewer) ET board.tenantId == token.tenantId. Souscription non autorisée → souscription rejetée (frame droppée, jamais établie) + erreur délivrée sur /user/queue/errors ; la session WS n'est pas fermée (les autres souscriptions valides de la même session restent actives) | ⬜ |
| Handler STOMP rejette tout message dont le type n'est pas dans la whitelist {JOIN, LEAVE, DRAW, CURSOR_MOVE, UNDO} avec log WARN | ⬜ |
| Payload DRAW limité à 64 Ko. Payload > limite → STOMP ERROR frame sans déconnecter les autres participants | ⬜ |
| Rate limit par connexion WS : maximum 30 messages DRAW/seconde par user par board. Dépassement → STOMP ERROR + fermeture après 3 violations consécutives | ⬜ |
| Token opaque transmis au handshake WS via header HTTP Authorization: Bearer {token} — jamais via cookie, query param ou header personnalisé | ⬜ |
| Contrat JSON des messages : JOIN { userId, displayName, avatarUrl, color } · LEAVE { userId } · CURSOR_MOVE { userId, x, y } · DRAW { type, tool, payload } · UNDO { userId, eventId } | ⬜ |
| Message PARTICIPANTS_UPDATE émis à chaque JOIN/LEAVE contenant la liste complète des participants connectés | ⬜ |
| Heartbeat STOMP : serveur envoie ping toutes les 25s. Client sans heartbeat pendant 30s = connexion perdue → reconnexion | ⬜ |
| Les événements DRAW sont persistés en BDD pour qu'un utilisateur rejoignant plus tard voie le canvas existant (à valider : persistance complète ou snapshot périodique) | ⬜ |
| UNDO : hors scope de cette US — délégué à US08.3.3 (US dédiée à créer) | ⬜ |
| Stratégie de conflit en cas de modification simultanée : Last-Write-Wins (Socle) | ⬜ |
| Métrique messages_throttled_total exposée via Micrometer | ⬜ |

## Hors périmètre

- Logique undo/redo (stack, application de l'annulation) : déléguée à US08.3.3 — cette US ne fait
  que transporter le message `UNDO` sur la room.
- Décision définitive de la stratégie de persistance des événements `DRAW` (historique complet
  vs snapshot périodique) : voir ambiguïté documentée ci-dessous, à trancher par l'Architect Agent
  avant Gate 2.
- Résolution de conflits avancée (OT/CRDT) : Socle reste en Last-Write-Wins, toute stratégie plus
  fine est hors périmètre Socle.
- Montée en charge horizontale multi-instance des sessions WS (sticky sessions / broker externe) :
  couverte par EN30.7 (phase-3), pas ici.

## Notes d'implémentation

- **Endpoint & topics** : handshake STOMP sur `/ws/whiteboard/{boardId}` (token opaque en header
  `Authorization: Bearer`) · publication client→serveur sur `/app/whiteboard/{boardId}/action`
  (convention Spring `@MessageMapping`) · diffusion serveur→clients via souscription
  `/topic/whiteboard/{boardId}`.
- **Modèle d'événements WebSocket (contrat partagé F08.3, cf. US08.3.2a/b/c et US08.3.3)** : types
  whitelistés `JOIN`, `LEAVE`, `DRAW`, `CURSOR_MOVE`, `UNDO`. Toute mutation de contenu (trait,
  forme, effacement, déplacement, redimensionnement) transite en `DRAW` avec un sous-champ `type`
  (`stroke`/`shape`/`erase`/`move`/`resize`/`text`), jamais comme type STOMP distinct. Granularité :
  un message `DRAW` par action complète (fin de tracé/geste), pas de streaming point par point —
  cohérent avec la limite payload 64 Ko et le rate limit 30 msg/s. `CURSOR_MOVE` suit une cadence
  différente (throttle 50 ms côté client, US08.3.2c). `PARTICIPANTS_UPDATE` émis par le serveur à
  chaque `JOIN`/`LEAVE` avec la liste complète des participants.
- **Dépend de EN08.1** (isolation WebSocket room par board) pour la vérification d'appartenance à
  la souscription.
- **Comportement sur souscription non autorisée (AC alignée sur le livré, 2026-07-12)** : l'AC
  demandait initialement « déconnexion WS code 1008 ». Le design livré et testé **rejette** la
  souscription refusée (frame droppée, jamais établie) et notifie le client sur
  `/user/queue/errors`, **sans fermer la session WS** — un membre légitime de plusieurs boards ne
  perd pas ses souscriptions valides parce qu'une souscription à un board dont il n'est pas membre
  a été refusée. Comportement couvert par l'IT `denied_subscribe_does_not_close_session`
  (`pivot-collaboratif-core`, `WhiteboardWebSocketIT`). L'AC ci-dessus est alignée sur ce choix
  (décision mainteneur 2026-07-12, US déjà `Stage: ✅`). La fermeture forcée
  (`CloseStatus.POLICY_VIOLATION`, code 1008) reste réservée à l'abus caractérisé : 3 violations
  consécutives du rate limit (voir AC dédiée).
- Le champ `payload` de `DRAW` reste **opaque et spécifique à l'outil** pour le transport (pas de
  schéma STOMP rigide par type) : il porte notamment les attributs de style ajoutés côté canvas
  (`strokeColor`/`fillColor`/`groupId`, cf. US08.3.2a) sans qu'aucune évolution du contrat
  WebSocket ci-dessus ne soit nécessaire — seule la validation de schéma JSON côté serveur (whitelist
  des champs acceptés par `type`) doit suivre les évolutions de payload décidées par les US
  consommatrices.
- **Ambiguïté ouverte (non tranchée ici)** : persistance des événements `DRAW` — historique complet
  rejouable événement par événement, ou snapshot périodique + delta ? Impacte le modèle de données
  du schéma `collaboratif` (table d'événements vs table de snapshots). À arbitrer par l'Architect
  Agent avant l'implémentation (Gate 2), sans bloquer le Gate 1 de cette US.

---
Item Type: US · Parent: F08.3 · Module: whiteboard · Phase: Socle · Size: M · Priority: High
Stage: ✅
Rôle: utilisateur-final
Dépendances: EN08.1 (isolation WS room) — `pivot-collaboratif-core` PR [#28](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-core/pull/28), Gate 4 = 89/100, spec figée `docs/specs/EPIC-collaboration/us08-3-1-connexion-ws-canvas.md`
