# EN08.1 — Isolation WebSocket room par board

## Contexte

- **Enabler** : `docs/backlog/EPIC-collaboration/ENABLERS/en-ws-room-isolation.md`
- **PR** : `pivot-collaboratif-core` [#27](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-core/pull/27)
  (`feat/en08-1-ws-room-isolation`)
- **Dernier commit au moment du figeage** : `809c057` — `feat(ws): EN08.1 — WebSocket STOMP room isolation per board`
- **Gate 2 COVERAGE** : 617/718 lignes = 85,9 % (seuil ≥ 80 %)
- **Gate 4 MERGE_CONFIDENCE** : 91/100 — auto-approuvé (seuil ≥ 85)
- **Prérequis bloquant pour** : US08.3.1 (connexion WebSocket canvas), US08.5.1 (présence participants)

---

## Spec technique

### Endpoint WebSocket

| Paramètre | Valeur |
|-----------|--------|
| Endpoint STOMP | `/ws/whiteboard` (relatif au context-path `/api/collaboratif`) |
| URL complète | `ws://{host}/api/collaboratif/ws/whiteboard` |
| Broker | `SimpleBroker` en mémoire (cible production : relay ActiveMQ `:61613`) |
| Destination broker | `/topic` |
| Préfixe application | `/app` |
| Taille max frame | 64 Ko |
| Heartbeat | SimpleBroker par défaut |

### Destinations STOMP

| Destination | Direction | Rôle |
|-------------|-----------|------|
| `/topic/whiteboard/{boardId}` | Server → Client | Canal principal du board (dessins, événements) |
| `/topic/whiteboard/{boardId}/presence` | Server → Client | Broadcast liste des participants (PresencePayload) |
| `/app/whiteboard/{boardId}/*` | Client → Server | Messages entrants du client (US08.3.1) |
| `/user/queue/errors` | Server → Client | Notifications d'erreur d'autorisation |

### Fichiers introduits (`pivot-collaboratif-core`)

| Fichier | Rôle |
|---------|------|
| `config/WebSocketConfig.java` (nouveau) | `@EnableWebSocketMessageBroker` — endpoint, broker, intercepteur, limite 64 Ko |
| `whiteboard/ws/StompPrincipal.java` (nouveau) | Record `(userId, tenantId)` implémentant `Principal` |
| `whiteboard/ws/StompHandshakeInterceptor.java` (nouveau) | HTTP HandshakeInterceptor — rejette sans `X-Pivot-User-Id`/`X-Pivot-Tenant-Id` (HTTP 401) |
| `whiteboard/ws/StompHandshakeHandler.java` (nouveau) | `DefaultHandshakeHandler` — construit `StompPrincipal` depuis attributs de session |
| `whiteboard/ws/MembershipCacheService.java` (nouveau) | Cache Redis TTL 5 s → DB pour décisions d'autorisation SUBSCRIBE/SEND |
| `whiteboard/ws/WhiteboardPresenceRegistry.java` (nouveau) | Registre Redis `board:presence:{tenantId}:{boardId}` + broadcast présence |
| `whiteboard/ws/WhiteboardChannelInterceptor.java` (nouveau) | `ChannelInterceptor` — autorise SUBSCRIBE et SEND par vérification membership + rate limit |
| `whiteboard/ws/WhiteboardWebSocketEventListener.java` (nouveau) | Listener `SessionSubscribeEvent` (JOIN) + `SessionDisconnectEvent` (LEAVE) |
| `whiteboard/ws/PresencePayload.java` (nouveau) | Record DTO — liste des userIds présents sur un board |
| `whiteboard/ws/ErrorPayload.java` (nouveau) | Record DTO — message d'erreur envoyé sur `/user/queue/errors` |
| `whiteboard/ws/WhiteboardWebSocketIT.java` (nouveau) | 6 tests TI Testcontainers (PostgreSQL 18 + Redis 7) |
| `spotbugs-exclude.xml` (modifié) | Package `fr.pivot.collaboratif.whiteboard.ws` ajouté aux exclusions EI_EXPOSE_REP |
| `pom.xml` (modifié) | `spring-boot-starter-websocket` ajouté |

### Stratégie d'authentification (état actuel)

Auth via headers HTTP `X-Pivot-User-Id` / `X-Pivot-Tenant-Id` — même pattern que les contrôleurs REST (`RequestPrincipalResolver`). Les headers sont lus par `StompHandshakeInterceptor` lors du handshake HTTP (upgrade WebSocket) et convertis en `StompPrincipal` par `StompHandshakeHandler`.

**TODO EN17** : remplacer par validation de token opaque `Authorization: Bearer` une fois `fr.pivot:pivot-core-starter` publié.

### Cache membership (MembershipCacheService)

| Cache | Clé Redis | TTL | Usage |
|-------|-----------|-----|-------|
| Auth | `ws:auth:{tenantId}:{boardId}:{userId}` | 5 s | Décision SUBSCRIBE/SEND — SLA révocation ≤ 5 s |
| Heartbeat | `ws:heartbeat:{tenantId}:{boardId}:{userId}` | 5 min | Liveness presence uniquement |

La vérification DB vérifie l'isolation tenant : `board.tenantId == principal.tenantId` avant la vérification de membership. Toute collision de `boardId` entre tenants est traitée comme un refus (404-equivalent).

### Registre de présence (WhiteboardPresenceRegistry)

| Structure Redis | Clé | Valeur |
|----------------|-----|--------|
| HASH présence | `board:presence:{tenantId}:{boardId}` | userId → sessionId |
| SET session | `ws:session:{sessionId}` | Set de `{tenantId}:{boardId}:{userId}` (TTL 24 h) |

Le SET de session permet un nettoyage O(1) sur disconnect sans scan Redis.

### Rate limit (WhiteboardChannelInterceptor)

Compteur Redis INCR par `ws:rate:{tenantId}:{boardId}:{userId}`, fenêtre fixe 1 s, seuil 30 msg/s. Au-delà : frame droppée, notification sur `/user/queue/errors`.

### Tests TI couverts

| Test | AC couvert |
|------|-----------|
| `handshake_without_identity_headers_is_rejected` | Token absent → 401 |
| `board_member_receives_presence_on_subscribe` | Membre → souscrit → apparaît dans présence |
| `non_member_subscribe_is_denied_and_user_absent_from_presence` | Non-membre → SUBSCRIBE droppé → absent de la présence |
| `cross_tenant_subscribe_is_denied` | Cross-tenant : board T1, user T2 → refusé |
| `denied_subscribe_does_not_close_session` | Session non fermée après refus SUBSCRIBE |
| `presence_removed_on_disconnect` | Disconnect → présence nettoyée |

---

## Limitations intentionnelles (hors périmètre EN08.1)

- **Relay ActiveMQ** : `SimpleBroker` utilisé. Le relay vers ActiveMQ (`:61613`) est requis pour la scalabilité multi-instance — sera activé séparément une fois l'infrastructure déployée.
- **Bearer token** : auth via headers X-Pivot-* (cohérent avec le reste du module). Remplacement par opaque token : EN17.
- **Rate limit sliding window** : fenêtre fixe 1 s implémentée. Fenêtre glissante possible dans US08.3.1 si nécessaire.
- **Gestionnaire `@MessageMapping`** : aucun handler `/app/whiteboard/*` dans cet enabler — définis dans US08.3.1 (connexion WebSocket canvas).

---

## Cohérence avec les enablers adjacents

| Enabler/US | Relation |
|------------|----------|
| EN08.2 | `boardAccessGuard` Angular (HTTP GET) — isolation orthogonale mais complémentaire à EN08.1 (WebSocket) |
| US08.3.1 | Définit les `@MessageMapping` qui consomment `/app/whiteboard/{boardId}/*` — dépend de EN08.1 |
| US08.5.1 | Présence participants canvas — s'appuie sur `/topic/whiteboard/{boardId}/presence` défini ici |
