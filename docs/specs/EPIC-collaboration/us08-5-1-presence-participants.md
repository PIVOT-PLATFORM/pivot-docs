# US08.5.1 — Présence des participants sur le canvas (volet backend)

## Contexte

- **US** : `docs/backlog/EPIC-collaboration/FEATURES/presence/us-presence-participants.md`
  (F08.3 — Canvas collaboratif temps réel, EPIC-collaboration E30)
- **Issues** : `pivot-collaboratif-core`
  [#29](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-core/issues/29) (AC backend),
  [#32](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-core/issues/32) (collision de
  présence, sous-tâche bloquante — analyse initiale par @tellebma)
- **PR** : `pivot-collaboratif-core`
  [#33](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-core/pull/33)
  (`feat/us08-5-1-presence-backend`)
- **Gate 2 COVERAGE** : 92/100 — JaCoCo `WhiteboardPresenceRegistry` ~98 %,
  `ParticipantsBroadcastService` 100 %, `CanvasActionService` ~90 %
- **Gate 4 MERGE_CONFIDENCE** : 95/100 — merge documenté (`--admin`, faute de reviewer
  configuré sur ce repo bootstrap, précédent déjà établi sur US08.4.1/US08.3.2b/US08.3.3)
- **Dépend de** : EN08.1 (isolation WebSocket room), US08.3.1 (contrat de messages, endpoint
  STOMP) — toutes deux déjà mergées
- **Périmètre de cette spec** : volet backend uniquement. Le volet frontend
  (`PresencePanelComponent`, `pivot-collaboratif-ui`#22) reste à faire — voir
  [Hors périmètre](#hors-périmètre-explicitement-exclu).

---

## Spec fonctionnelle

### Incident résolu : collision entre deux mécanismes de présence (#32)

Avant cette US, deux systèmes indépendants diffusaient sur le même topic
`/topic/whiteboard/{boardId}/presence` :

1. `WhiteboardPresenceRegistry` (EN08.1) — déclenché par le simple `SessionSubscribeEvent`
   Spring (abonnement STOMP brut au topic principal du board), diffusait un `PresencePayload`
   (liste brute d'`userId`).
2. `CanvasActionService` (US08.3.1) — déclenché par le message applicatif explicite
   `JOIN`/`LEAVE`, diffusait un `ParticipantsUpdatePayload` (liste de `ParticipantInfo` :
   userId/displayName/avatarUrl/color/role).

Conséquences réelles (déjà documentées par les tests IT existants — `WhiteboardCanvasIT`
contournait explicitement le problème en évitant de s'abonner au topic principal) :

- Deux formes de payload incompatibles pouvaient arriver coup sur coup sur le même topic.
- Sur un crash (déconnexion sans LEAVE explicite), seul le système (1) nettoyait, avec le
  mauvais format de payload.
- Le système (1) indexait par `userId → sessionId` unique : un utilisateur multi-onglets
  voyait sa présence entièrement purgée si un seul de ses onglets crashait.

### Résolution

- `WhiteboardPresenceRegistry` devient un **pur tracker de liveness de session** — SET Redis
  `board:sessions:{tenantId}:{boardId}:{userId}` (toutes les sessions actives de cet
  utilisateur sur ce board) + SET inverse `ws:session:{sessionId}` (index de nettoyage). Il
  n'écrit plus dans `ParticipantMetaStore` et ne diffuse plus rien lui-même côté JOIN/SUBSCRIBE.
- La présence (affichage, `ParticipantsUpdatePayload`) reste pilotée **exclusivement** par le
  message applicatif JOIN/LEAVE explicite dans `CanvasActionService`, qui enregistre/désenregistre
  désormais aussi la session dans le registre (`registerSession`/`unregisterSession`).
- Sur `SessionDisconnectEvent` (déconnexion WebSocket, avec ou sans LEAVE préalable),
  `WhiteboardPresenceRegistry.handleDisconnect()` retire la session du SET de l'utilisateur ;
  **seulement si ce SET devient vide** (dernière session active sur ce board) déclenche le
  nettoyage `ParticipantMetaStore.remove()` + diffusion `ParticipantsUpdatePayload` — couvre le
  crash sans LEAVE propre tout en corrigeant le cas multi-onglets.
- `PresencePayload` supprimé (devenu mort). `ParticipantsBroadcastService` extrait comme unique
  point de diffusion `PARTICIPANTS_UPDATE`, partagé entre `CanvasActionService` et
  `WhiteboardPresenceRegistry` — élimine la duplication qui avait causé la collision initiale.

### Clarification Gate 1 : timeout de déconnexion silencieuse 30s

L'AC "participant sans heartbeat depuis 30s marqué comme déconnecté (tâche planifiée serveur)"
est satisfaite par le heartbeat STOMP **natif** déjà configuré dans `WebSocketConfig` pour
US08.3.1 (`setHeartbeatValue(new long[]{25000L, 30000L})` — serveur envoie toutes les 25s,
attend un heartbeat client sous 30s). Spring ferme automatiquement la session WebSocket si ce
heartbeat n'est pas honoré, ce qui déclenche `SessionDisconnectEvent` → le nettoyage décrit
ci-dessus. **Aucune nouvelle tâche `@Scheduled` n'a été ajoutée** — réutilisation d'un mécanisme
déjà en place plutôt que duplication.

### AC déjà satisfaits par le contrat existant (US08.3.1, non modifiés)

- Couleur déterministe par `userId` (`ColorPaletteService`, palette 12 couleurs, hash stable) —
  garantit à la fois "couleur cohérente" et "couleur conservée à la reconnexion" sans état
  serveur supplémentaire à gérer/libérer.
- Dédoublonnage JOIN multi-onglets : `ParticipantMetaStore.put()` est un `HSET` idempotent par
  `userId` — un second JOIN du même utilisateur écrase simplement l'entrée existante (dernière
  connexion active prioritaire), jamais de doublon d'avatar.
- Isolation topic/tenant : `WhiteboardChannelInterceptor` (EN08.1) bloque déjà toute
  souscription non autorisée à `/topic/whiteboard/{boardId}/presence` (le préfixe de
  destination couvre le sous-topic) — non modifié par cette US, seulement re-testé.

---

## Contrat technique

### Fichiers introduits / modifiés (`pivot-collaboratif-core`)

| Fichier | Rôle |
|---------|------|
| `whiteboard/canvas/ParticipantsBroadcastService.java` (nouveau) | Diffuseur unique `PARTICIPANTS_UPDATE`, partagé |
| `whiteboard/ws/WhiteboardPresenceRegistry.java` (réécrit) | Pur tracker de liveness de session (SET par user/board + index inverse par session) |
| `whiteboard/ws/PresencePayload.java` (supprimé) | Format de payload devenu mort |
| `whiteboard/ws/WhiteboardWebSocketEventListener.java` (modifié) | Ne réagit plus à `SessionSubscribeEvent` — seulement `SessionDisconnectEvent` |
| `whiteboard/canvas/CanvasActionService.java` (modifié) | `handleJoin`/`handleLeave` enregistrent/désenregistrent la session dans le registre ; délègue la diffusion à `ParticipantsBroadcastService` |
| `whiteboard/canvas/WhiteboardActionController.java` (modifié) | Transmet le `sessionId` STOMP (`@Header("simpSessionId")`) à `CanvasActionService` |
| `test/.../WhiteboardPresenceRegistryTest.java` (nouveau, TU) | Branches dernière-session / session-restante / entrée malformée |
| `test/.../ParticipantsBroadcastServiceTest.java` (nouveau, TU) | Diffusion liste pleine/vide |
| `test/.../WhiteboardPresenceIT.java` (nouveau, TI) | Crash sans LEAVE, multi-onglets, non-membre refusé sur le sous-topic, liste initiale sur board non vide, dédoublonnage couleur stable, contrat payload (pas d'email exposé) |
| `test/.../WhiteboardWebSocketIT.java` (recentré) | Scope réduit aux préoccupations d'isolation de room (EN08.1) — assertions de présence déplacées |

### Redis — structures de liveness

| Clé | Type | Rôle |
|-----|------|------|
| `board:sessions:{tenantId}:{boardId}:{userId}` | SET | Sessions actives de cet utilisateur sur ce board |
| `ws:session:{sessionId}` | SET | Index inverse — composite keys `{tenantId}:{boardId}:{userId}` que cette session a rejoints, pour nettoyage sans scan |

Les deux SET ont un TTL de sauvegarde de 24h contre les entrées orphelines en cas d'arrêt
serveur anormal.

### Topics STOMP (inchangés depuis US08.3.1)

| Topic | Contenu |
|-------|---------|
| `/topic/whiteboard/{boardId}/presence` | `PARTICIPANTS_UPDATE` — émis désormais uniquement par `ParticipantsBroadcastService`, sur JOIN/LEAVE explicite ou dernière-session-disconnect |

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| EN08.1 | `WhiteboardChannelInterceptor` (isolation SUBSCRIBE/SEND) non modifié — seulement re-testé sur le sous-topic presence |
| US08.3.1 | Contrat `PARTICIPANTS_UPDATE`/`ParticipantInfo`/`ColorPaletteService` réutilisé tel quel, non dupliqué |
| US08.3.2c | Dépend explicitement du **backend** de cette US (couleur déterministe, liste des participants actifs) pour l'overlay de curseurs — **débloquée par ce merge**, pas besoin d'attendre le volet frontend ci-dessous |
| `pivot-collaboratif-ui`#22 (`PresencePanelComponent`) | Consommera ce contrat backend inchangé (`PARTICIPANTS_UPDATE`) — reste à faire, volet frontend séparé |

## Hors périmètre (explicitement exclu)

- `PresencePanelComponent` Angular (affichage panneau, limite 5+N avatars, a11y, i18n, tests
  Vitest) — volet frontend, `pivot-collaboratif-ui`#22, US08.5.1 reste `Stage: In progress`
  tant qu'il n'est pas fait.
- Historique/statistiques de présence, montée en charge > 200 participants (phase-3, déjà
  exclus par la US elle-même).
