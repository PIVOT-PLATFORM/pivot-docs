# US08.3.2b — Angular : canvas whiteboard — synchronisation STOMP & états connexion

## Contexte

- **US** : `docs/backlog/EPIC-collaboration/FEATURES/canvas-ws/us-canvas-angular-08-3-2b.md`
  (F08.3 — Canvas collaboratif temps réel, EPIC-collaboration E30)
- **PR** : `pivot-collaboratif-ui` [#31](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-ui/pull/31)
  (`feat/us08-3-2b-stomp-sync`) — ferme l'issue #26
- **Merge commit** : `2857d1d`
- **Gate 2 COVERAGE** : 233/233 tests Vitest, 85.74 % statements / 89.32 % lines (branches
  76.94 % / functions 82.45 %, tirés vers le bas essentiellement par des fichiers préexistants,
  ex. `whiteboard-canvas.component` à 67 % branches depuis PR #24)
- **Gate 4 MERGE_CONFIDENCE** : 92/100 — auto-approuvé (seuil ≥ 85), merge via `--admin` faute de
  reviewer configuré sur ce repo bootstrap (précédent déjà établi, voir note US08.4.1 dans
  `sprints/sprint-5.md`)
- **Dépend de** : US08.3.2a (composant canvas local, `applyRemoteAction()`), EN08.1 (isolation WS
  room), US08.3.1 (contrat de messages STOMP, endpoint `/app/whiteboard/{boardId}/action`)

---

## Spec fonctionnelle

### WhiteboardSyncService

Service Angular (`@stomp/rx-stomp`) qui connecte le composant canvas local (US08.3.2a) au contrat
STOMP posé côté backend par US08.3.1 :

- Connexion à `/topic/whiteboard/{boardId}`, publication des actions locales sur
  `/app/whiteboard/{boardId}/action` comme un unique message `DRAW` avec sous-champ `type`
  (jamais un type STOMP distinct par action de canvas).
- Application des actions `DRAW` distantes validées sans perturber l'état de dessin local en
  cours (délègue à `applyRemoteAction()`, exposée par `WhiteboardCanvasComponent` depuis
  US08.3.2a).
- Reconnexion : backoff exponentiel natif de `stompjs` (base 1s, plafond 30s), abandon après 3
  tentatives de connexion (voir clarification 4) avec bouton "Réessayer" manuel.
- `publish(type, data)` générique — US08.3.3 (undo/redo) pourra relayer un message `UNDO` plus
  tard sans refactor ; **n'inclut jamais** `userId`/`tenantId` côté client (règle sécurité
  CLAUDE.md — résolus côté serveur depuis le principal STOMP).

### WhiteboardBoardComponent

Nouveau conteneur de route pour `/whiteboard/{boardId}` :

- Possède le cycle de vie de `WhiteboardSyncService` (connect à l'init, disconnect au destroy —
  réinitialise aussi la pile d'`UndoRedoService` selon son propre contrat d'intégration
  US08.3.2b).
- Relie la sortie `drawAction` locale de `WhiteboardCanvasComponent` à la publication STOMP, et
  applique les actions distantes validées via `applyRemoteAction`.
- Affiche les bannières "connexion en cours" / "connexion perdue" / "échec" / "hors ligne"
  (`role="status"`, sauf l'état "échec" en `role="alert"` car il exige une action utilisateur) et
  le toast "Reconnecté" (3s).
- `WhiteboardCanvasComponent` reste STOMP-agnostique, comme prévu par US08.3.2a.
- Routes `/whiteboard/:boardId` pointent désormais vers ce conteneur plutôt que directement vers
  `WhiteboardCanvasComponent`.

---

## Clarifications Gate 1 (documentées, jamais d'interprétation unilatérale)

1. **AC2 — libellé "DRAW … avec boardId + userId + …"** : le contrat backend réel (US08.3.1,
   déjà mergé) est `CanvasActionMessage{type, data}` sur `/app/whiteboard/{boardId}/action` —
   `boardId` vient de la destination STOMP, `userId` est résolu côté serveur depuis le principal
   STOMP et n'est **jamais** approuvé depuis le payload client. Conforme à la règle explicite de
   CLAUDE.md ("pas de … `userId` en … body côté Angular"). L'implémentation suit le contrat
   backend réel + cette règle de sécurité plutôt que le libellé large de l'AC.
2. **AC6 — "user révoqué → STOMP ERROR 1008"** : `WhiteboardChannelInterceptor` (déjà mergé) rejette
   un SUBSCRIBE en envoyant une erreur applicative sur `/user/queue/errors` **sans fermer** la
   session WebSocket (documenté dans son propre Javadoc) — il n'émet pas de close 1008 réel,
   malgré le texte AC d'EN08.1/US08.3.1. Le client réagit **aux deux** : une véritable frame STOMP
   `ERROR` et ce canal concret, pour rester correct vis-à-vis du backend réellement déployé plutôt
   que du seul texte de l'AC.
3. **AC5 — cible de redirection** : `boardAccessGuard` (EN08.2, déjà mergé/testé) redirigeait vers
   `/home`. Mis à jour vers `/whiteboard` pour respecter le texte explicite de cette US ;
   `/whiteboard` existe garanti dans l'arbre de routes de ce module.
4. **AC10 — interprétation "3 tentatives"** : lu comme 3 tentatives de connexion au total
   (initiale incluse), conforme au texte littéral de l'AC. La courbe de backoff exponentiel elle-
   même (1s/2s/4s/max 30s, AC4) est configurée et testée indépendamment via
   `reconnectDelay`/`maxReconnectDelay`/`reconnectTimeMode` ; avec un plafond à 3 tentatives, les
   paliers 4s/30s ne sont atteints que si une nouvelle tentative manuelle échoue à son tour.
5. **Gap plateforme connu** : le backend lit l'identité WS depuis les en-têtes HTTP de handshake
   `X-Pivot-User-Id`/`X-Pivot-Tenant-Id`, que les navigateurs ne peuvent pas positionner sur un
   upgrade WebSocket natif. Il s'agit du même gap "Auth différée" déjà accepté sur le reste de ce
   repo bootstrap (bloqué sur EN17), pas d'une tentative de contournement par cette US.

---

## Contrat technique

### Fichiers introduits / modifiés (`pivot-collaboratif-ui`)

| Fichier | Rôle |
|---------|------|
| `core/whiteboard/whiteboard-sync.service.ts` (nouveau) | Service STOMP (`@stomp/rx-stomp`) — connect/publish/apply/reconnect |
| `core/whiteboard/whiteboard-sync.service.spec.ts` (nouveau) | 411 lignes de tests — STOMP entièrement mocké |
| `whiteboard/board/whiteboard-board.component.ts` (nouveau) | Conteneur de route `/whiteboard/{boardId}` |
| `whiteboard/board/whiteboard-board.component.html` (nouveau) | Bannières états connexion + toast |
| `whiteboard/board/whiteboard-board.component.scss` (nouveau) | BEM |
| `whiteboard/board/whiteboard-board.component.spec.ts` (nouveau) | Tests conteneur (201 lignes) |
| `core/whiteboard/board-access.guard.ts` (modifié) | Redirect `/home` → `/whiteboard` (clarification 3) |
| `core/whiteboard/board-access.guard.spec.ts` (modifié) | Tests ajustés |
| `whiteboard/whiteboard.routes.ts` (modifié) | Route pointe vers `WhiteboardBoardComponent` |
| `public/assets/i18n/{fr,en}.json` (modifiés) | Clés `whiteboard.ws.*` |
| `angular.json` (modifié) | `allowedCommonJsDependencies: ["@stomp/stompjs"]` (voir Notes CI) |

### Modèle d'événements WebSocket (contrat partagé F08.3, cf. US08.3.1)

Publication client → serveur sur `/app/whiteboard/{boardId}/action`, souscription
`/topic/whiteboard/{boardId}`. Toute mutation locale reste encodée comme un message `DRAW` unique
avec sous-champ `type`, jamais de type STOMP distinct par action — cohérent avec US08.3.1 et
US08.3.2a. `boardId` porté par la destination, jamais par le payload ; `userId` jamais inclus
côté client (clarification 1).

### Reconnexion — backoff et canaux de révocation

| Aspect | Comportement |
|--------|--------------|
| Backoff | Natif `stompjs` — base 1s, plafond 30s (`reconnectDelay`/`maxReconnectDelay`/`reconnectTimeMode`) |
| Abandon | Après 3 tentatives de connexion au total (clarification 4) — bouton "Réessayer" manuel |
| Révocation | Frame STOMP `ERROR` **et** canal applicatif `/user/queue/errors` (clarification 2) — redirection `/whiteboard` + toast |

### Notes CI

`@stomp/stompjs` (dépendance transitive de `@stomp/rx-stomp`, présente depuis le bootstrap du
repo mais inutilisée jusqu'à cette US) résout la condition `exports.browser` de son `package.json`
vers son bundle UMD quelle que soit la condition ESM `import` également présente — choix de
packaging amont, non adressable côté code applicatif. `allowedCommonJsDependencies` est le
mécanisme documenté d'Angular pour acquitter ce cas plutôt que de laisser un warning de build
production.

---

## Vérification (rapportée par la PR)

- `npx tsc --noEmit` — 0 erreur
- `npm run lint` — 0 warning
- `npm run test:ci` — 233/233 tests verts, 85.74 % statements / 89.32 % lines
- `npm run build -- --configuration production` — build propre
- E2E (Playwright) différé — pas de backend actif dans cet environnement (gap infra préexistant,
  déjà confirmé identique sur `pivot-collaboratif-ui` PR #29/#30, non lié à ce changement ; admis
  par CLAUDE.md, "E2E différable")

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US08.3.2a | `applyRemoteAction()` (exposée par anticipation) est le point d'attache utilisé par cette US pour appliquer les actions distantes sans écho |
| US08.3.1 | Contrat de messages, endpoint STOMP et rate limiting côté serveur déjà en place — cette US consomme, ne redéfinit pas |
| US08.3.2c | Overlay de curseurs — se greffera sur `WhiteboardBoardComponent`/`WhiteboardSyncService` une fois la présence temps réel branchée (US08.5.1) |
| US08.3.3 | `publish(type, data)` déjà générique côté client, prêt à relayer un message `UNDO` — cette US ne câble pas cette diffusion (hors périmètre explicite) |
| EN08.2 | `boardAccessGuard` existant réutilisé, seule sa cible de redirection est corrigée (clarification 3) |

## Hors périmètre (explicitement exclu)

- Curseurs et présence des autres participants (US08.3.2c).
- Logique de la stack undo/redo (application, limite) et sa diffusion réseau (US08.3.3) —
  `publish()` reste générique et prêt, sans câblage.
- Vérification serveur d'appartenance à la souscription STOMP elle-même (EN08.1 + US08.3.1) —
  cette US ne fait que réagir à un rejet.
- Résolution de conflits avancée (OT/CRDT) — Last-Write-Wins côté serveur (US08.3.1), ce service
  applique ce que le serveur diffuse.
- Contournement du gap "Auth différée" (en-têtes HTTP de handshake WS) — bloqué sur EN17,
  clarification 5.
