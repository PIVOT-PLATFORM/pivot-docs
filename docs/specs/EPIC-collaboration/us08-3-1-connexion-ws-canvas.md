# US08.3.1 — Connexion WebSocket au canvas d'un tableau

## Contexte

- **US** : `docs/backlog/EPIC-collaboration/FEATURES/canvas-ws/us-connexion-ws-canvas.md` (F08.3 — Canvas collaboratif temps réel, EPIC-collaboration E30)
- **PR** : `pivot-collaboratif-core` [#28](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-core/pull/28)
  (`feat/us08-3-1-ws-canvas-connection`)
- **Merge commit** : `7217d8e`
- **Gate 2 COVERAGE** : 81/81 tests verts (`mvn verify`), 7 `WhiteboardCanvasIT` d'intégration
- **Gate 4 MERGE_CONFIDENCE** : 89/100 — auto-approuvé (seuil ≥ 85)
- **Dépend de** : EN08.1 (isolation WebSocket room par board)

---

## Spec fonctionnelle

### Endpoint STOMP `/app/whiteboard/{boardId}/action`

Point d'entrée unique pour toutes les actions temps réel sur un board, avec un handler par type
d'événement du contrat unique posé en Gate 1 : `JOIN`, `LEAVE`, `DRAW`, `CURSOR_MOVE`, `UNDO`.

- **JOIN** : enregistre le participant dans `ParticipantMetaStore` (Redis HASH), assigne une
  couleur déterministe (`ColorPaletteService`, `Math.floorMod(userId.hashCode(), 12)` — corrigé en
  cours de revue pour éviter l'`ArrayIndexOutOfBoundsException` sur `Integer.MIN_VALUE`), diffuse
  `PARTICIPANTS_UPDATE` sur `/topic/whiteboard/{boardId}/presence`
- **LEAVE** : retire le participant du registre de présence (`WhiteboardPresenceRegistry`),
  diffuse `PARTICIPANTS_UPDATE` — corrigé en revue pour être appelé aussi sur déconnexion
  implicite (sans frame LEAVE explicite), pas uniquement sur LEAVE reçu
- **DRAW** : persiste l'événement en base (event-sourcing, voir Contrat technique), diffuse le
  message à tous les abonnés du topic du board
- **CURSOR_MOVE** : diffusion uniquement, **jamais persisté** (haute fréquence, éphémère)
- **UNDO** : garde VIEWER — un utilisateur en rôle `VIEWER` ne peut pas émettre UNDO ; erreur
  délivrée sur `/user/queue/errors` (pas une simple absence de diffusion)

### Bug racine corrigé en revue : `/user/queue/errors` silencieusement perdu

`enableSimpleBroker` ne déclarait que `"/topic"` — sans le préfixe `"/queue"`, Spring ne route pas
les destinations utilisateur (`UserDestinationMessageHandler`) vers le `SimpleBrokerMessageHandler`,
qui les rejette silencieusement. Corrigé : `enableSimpleBroker("/topic", "/queue")`. Sans ce
correctif, aucune erreur applicative (comme le rejet UNDO d'un VIEWER) n'atteignait jamais le
client — échec silencieux, difficile à diagnostiquer sans les tests d'intégration dédiés.

---

## Contrat technique

### Fichiers introduits / modifiés (`pivot-collaboratif-core`)

| Fichier | Rôle |
|---------|------|
| `config/WebSocketConfig.java` (modifié) | `enableSimpleBroker("/topic", "/queue")` |
| `whiteboard/canvas/WhiteboardActionController.java` (nouveau) | `@MessageMapping` unique, dispatch par `CanvasActionType` |
| `whiteboard/canvas/CanvasActionService.java` (nouveau) | Logique métier par type d'action |
| `whiteboard/canvas/CanvasEvent.java` (nouveau) | Entité JPA event-sourcing |
| `whiteboard/canvas/CanvasEventRepository.java` (nouveau) | Spring Data JPA |
| `whiteboard/canvas/CanvasEventType.java` (nouveau) | Enum `JOIN/LEAVE/DRAW/CURSOR_MOVE/UNDO` |
| `whiteboard/canvas/ColorPaletteService.java` (nouveau) | Couleur déterministe par `userId` (mod 12) |
| `whiteboard/canvas/ParticipantMetaStore.java` (nouveau) | Redis HASH — métadonnées participant |
| `whiteboard/ws/WhiteboardChannelInterceptor.java` (modifié) | Autorisation SUBSCRIBE/SEND (EN08.1) |
| `whiteboard/ws/WhiteboardPresenceRegistry.java` (modifié) | Nettoyage sur déconnexion implicite |
| `whiteboard/canvas/dto/{BroadcastCanvasMessage,CanvasActionMessage,ParticipantInfo,ParticipantsUpdatePayload}.java` (nouveaux) | DTOs message entrant/sortant |
| `resources/db/migration/V1__schema_init.sql` (modifié) | Table `canvas_event` |
| `test/.../WhiteboardCanvasIT.java` (nouveau) | 7 tests IT |

### Persistance — event-sourcing

Table `canvas_event` (schéma `collaboratif`) : chaque `DRAW` est persisté individuellement,
payload JSONB (`@JdbcTypeCode(SqlTypes.JSON)`). `CURSOR_MOVE` n'est jamais écrit en base. Le choix
« rejouable événement par événement » (plutôt que snapshot périodique + delta), laissé ouvert au
Gate 1, est tranché ici en faveur de l'event-sourcing pur — la question de la compaction
(snapshot) reste un suivi post-Socle si le volume d'événements par board devient un problème de
performance (non mesuré à ce stade).

### Topics STOMP

| Topic | Contenu |
|-------|---------|
| `/topic/whiteboard/{boardId}` | Diffusion DRAW/CURSOR_MOVE/UNDO à tous les abonnés autorisés |
| `/topic/whiteboard/{boardId}/presence` | `PARTICIPANTS_UPDATE` sur JOIN/LEAVE |
| `/user/queue/errors` | Erreurs applicatives ciblées (ex. UNDO refusé pour VIEWER) |

---

## Suivi post-merge (noté au Gate 4, non bloquant)

- Test d'intégration rate-limit / 3-strike (AC6, mécanisme porté par EN08.1) à ajouter dans
  `WhiteboardWebSocketIT`
- `@Transactional` au niveau classe sur `CanvasActionService` ouvre une transaction même pour
  `CURSOR_MOVE` (jamais persisté) — optimisation différée, pas un bug fonctionnel

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| EN08.1 | Isolation SUBSCRIBE/SEND déjà appliquée par `WhiteboardChannelInterceptor` — cette US ajoute le contenu métier des messages, pas l'autorisation elle-même |
| US08.3.2a | `WhiteboardCanvasComponent` (Angular) expose déjà `applyRemoteAction()` en anticipation de cette US — le contrat de message ci-dessus est ce que US08.3.2b devra consommer côté client |
| US08.3.2b | Consommera ce endpoint + les deux topics de diffusion pour la synchronisation STOMP |
| US08.5.1 | Réutilisera `ParticipantMetaStore`/`PARTICIPANTS_UPDATE` pour le panneau de présence complet |

## Hors périmètre (explicitement exclu)

- Compaction / snapshot périodique des événements DRAW (suivi post-Socle si nécessaire)
- Relai STOMP vers ActiveMQ pour la scalabilité multi-instance (cible production documentée,
  `SimpleBroker` en mémoire suffisant pour le Socle)
- Rate-limit 3-strike testé en intégration (mécanisme EN08.1 déjà en place, test IT à compléter)
