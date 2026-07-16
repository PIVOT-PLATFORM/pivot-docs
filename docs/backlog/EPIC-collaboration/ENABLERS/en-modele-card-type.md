# EN08.4 — Modèle `Card` typé + contrats WebSocket temps réel

**Type d'enabler** : architecture

**Objectif technique** : Remplacer le modèle d'objet canvas générique `CanvasEvent`/`DRAW`
(US08.3.1/US08.3.2a) par un modèle **`Card` typé** aligné sur le tableau blanc de référence (POC
PouetPouet, `Détails tableau blanc backlog.md` §1.5), et normaliser les **contrats WebSocket** de
synchronisation des objets. C'est le **prérequis bloquant** de tout le périmètre de parité objets
(F08.6 objets typés, F08.7 connecteurs, F08.8 cadres, F08.9 organisation, F08.10 champs
personnalisés, F08.12 facilitation).

**Justification** : Le canvas Socle livré (US08.3.1) persiste les mutations de dessin dans une
table `collaboratif.canvas_event` en **log d'événements append-only** : chaque `DRAW` est une ligne
`{id, boardId, tenantId, userId, eventType, payload JSONB, createdAt}` où `payload` est un blob
JSON totalement opaque au serveur (`{type, tool, payload}`, sous-types `stroke`/`shape`/`erase`/
`move`/`resize`/`text` en chaînes libres, non typées). **Il n'existe aujourd'hui aucune table
représentant l'état courant d'un objet** (position, dimensions, couleur interrogeables par
colonne) — seul un flux d'événements existe, sans "dernière valeur connue" persistée par objet.
Ce modèle ne peut pas représenter les cartes typées du tableau blanc de référence (pense-bêtes,
images, liens à aperçu, tableaux, formes, étiquettes), leurs comportements par type (aperçu
OpenGraph sur `LINK`, cellules sur `TABLE`), ni les champs structurés (`layer`, `locked`, `meta`,
`width`/`height`) que les US de parité manipulent par mutation (update d'une ligne, pas ajout d'un
nouvel événement).

**Décision d'architecture (résolution de l'« Ambiguïté ouverte » documentée dans
`CanvasEventRepository.java`)** :
- **Nouvelle entité/table `collaboratif.card`** — état courant, mutable, une ligne par objet
  (contrairement à `canvas_event` qui reste un log immuable). C'est la table de référence pour
  tout objet persistant du canvas, y compris les tracés main levée (`type = DRAW`, `content` =
  données de tracé sérialisées).
- **`canvas_event` est conservé tel quel**, mais son rôle se limite désormais aux événements
  **éphémères** déjà non persistés en pratique (`JOIN`, `LEAVE`, `CURSOR_MOVE`, `UNDO`, `RESET`) —
  **la persistance `DRAW` dans `canvas_event` est arrêtée** au profit de `card` (aucune donnée de
  production concernée, Socle non encore en usage réel ; `CanvasEventType.DRAW` reste utilisé côté
  contrat WS existant pour le broadcast ponctuel d'un tracé en cours avant sa création en `Card`,
  si l'implémentation le juge utile pour le rendu incrémental pendant le geste — décision laissée
  au Dev Agent, non bloquante pour ce Gate 1).
- **Contrat WebSocket** : ce Gate 1 **corrige** la terminologie `card:*`/`board:join`/`board:state`
  du spec de référence brut (calquée sur le POC Node/Socket.io) pour l'aligner sur le contrat STOMP
  **déjà établi et testé** de ce repo — pas de nouveau canal parallèle :
  - Topic de diffusion existant réutilisé : **`/topic/whiteboard/{boardId}`** (pas
    `/topic/board/{boardId}`).
  - Destination d'action existante réutilisée : **`/app/whiteboard/{boardId}/action`**, dispatch
    par le champ `type` d'un `CanvasActionMessage` existant, matché **insensible à la casse** contre
    l'enum étendu ci-dessous (même mécanisme que `CanvasActionService.handle`, pas de nouveau
    endpoint STOMP).
  - **`CanvasEventType` étendu** avec 7 nouvelles valeurs persistées : `CARD_CREATE`,
    `CARD_MOVE`, `CARD_RESIZE`, `CARD_UPDATE`, `CARD_RECOLOR`, `CARD_DELETE`, `CARD_LAYER` —
    dispatchées dans le même `switch` que `JOIN`/`DRAW`/`CURSOR_MOVE`/`UNDO` existant.
  - **Rejeu d'état à la connexion** (ex-`board:join`→`board:state`) : sur `JOIN`, en plus du
    broadcast existant (inchangé), le serveur envoie **en plus, à l'émetteur seul**, la liste des
    `Card` du board via `messagingTemplate.convertAndSendToUser(principal.getName(),
    "/queue/board-state", ...)` — réutilisation du mécanisme `convertAndSendToUser` déjà en place
    pour le refus ciblé d'UNDO (`CanvasActionService` ligne 133), pas un nouveau mécanisme.
    **⚠️ Décision également invalidée en recette, voir correctif ci-dessous — le mécanisme
    `convertAndSendToUser` lui-même est correct côté serveur, mais `StompBoardTransport` (front)
    ne s'abonne qu'au topic principal, jamais à une queue par utilisateur : ce reply ciblé n'a
    jamais pu atteindre le client, même une fois le nommage corrigé.**

  > **⚠️ Correctif post-recette (2026-07-14)** — cette décision Gate 1 s'est révélée **fausse à la
  > vérification réelle** (recette manuelle bout-en-bout, `pivot-collaboratif-core#68` : symptôme
  > « impossible d'ajouter un post-it »). Le front (`pivot-collaboratif-ui`, `board.store.ts`)
  > parle déjà, en pratique, le vocabulaire `card:*`/`board:join`/`board:cursor` (calqué sur
  > PouetPouet) — ce n'est **pas** un vestige à « corriger » vers l'enum Java, c'est le contrat réel
  > que le backend doit accepter. `CanvasEventType.valueOf(type.toUpperCase())` rejetait
  > silencieusement `card:create`/`board:join`/`board:cursor` (warning « Unknown … dropped »),
  > et même une fois l'entrant corrigé, le front écoute des échos **au participe passé**
  > (`card:created`, pas `CARD_CREATE`) — deux vocabulaires distincts, entrant et sortant.
  > **Contrat corrigé, réellement implémenté et testé** (`CanvasEventType#fromWire`/`#wireOut`,
  > 3 tests IT rejouant le vocabulaire front sur un vrai serveur STOMP) :
  > - Entrant : `board:join`→`JOIN`, `board:leave`→`LEAVE`, `board:cursor`→`CURSOR_MOVE`,
  >   `card:create`→`CARD_CREATE`, `card:move`→`CARD_MOVE`, `card:resize`→`CARD_RESIZE`,
  >   `card:update`→`CARD_UPDATE`, `card:recolor`→`CARD_RECOLOR`, `card:delete`→`CARD_DELETE`,
  >   `card:layer`→`CARD_LAYER` (repli sur le nom d'enum brut en majuscules conservé, pour tout
  >   autre appelant qui l'enverrait directement).
  > - Sortant : les 7 `CARD_*` diffusent au **participe passé** (`card:created`, `card:moved`,
  >   `card:resized`, `card:updated`, `card:recolored`, `card:deleted`, `card:layered`) —
  >   **différent** de l'entrant. `JOIN`/`LEAVE`/`CURSOR_MOVE` gardent leur nom de sortie inchangé
  >   (`"JOIN"`/`"LEAVE"`/`"CURSOR_MOVE"`, aucun consommateur front ne les attend renommés).
  > - `data` est polymorphe (`Object`, pas `Map<String,Object>`) — `board:join`/`board:leave`
  >   envoient un **`data` scalaire** (le `boardId` en chaîne brute), pas un objet ; l'ancien
  >   contrat forçait un objet et levait une `MessageConversionException` avant tout traitement.
  > - **`board:state` diffuse désormais sur `/topic/whiteboard/{boardId}` (toute la room)**, pas
  >   `/queue/board-state` (par utilisateur) — voir l'avertissement ci-dessus : le front ne
  >   s'abonne qu'au topic principal. `role` en est délibérément absent (valeur par-destinataire,
  >   non pertinente en broadcast room-wide — reste autoritatif via le `GET` REST du board).
  >
  > **Piste durable non traitée** (suggérée en recette, à faire séparément si souhaité) : un test
  > de contrat partagé front/back, avec ce fichier comme source de vérité vivante plutôt qu'une
  > définition redondante de chaque côté — évite qu'une future US (F08.7 connecteurs, F08.8
  > cadres…) réintroduise le même désync en étendant naïvement l'enum Java sans vérifier le
  > vocabulaire réel émis par `board.store.ts`.

  - **Portée de broadcast** : **tous** les événements `CARD_*` sont diffusés à **toute la room**
    (`messagingTemplate.convertAndSend`, comme l'unique méthode `broadcast()` existante — celle-ci
    n'a **aucun mécanisme d'exclusion de l'émetteur** aujourd'hui). Décision explicite : **on ne
    reproduit pas** l'asymétrie "room sauf émetteur" du POC pour move/resize — tout part en room
    entière, cohérent avec le seul helper `broadcast()` existant, sans complexité serveur
    supplémentaire. Le client applique son propre changement en optimiste et **doit tolérer de
    recevoir son propre écho** (ré-application idempotente de la même valeur, sans jank) plutôt que
    de dépendre d'une exclusion serveur.

**Modèle de données cible** (table `collaboratif.card`, source §1.5/§1.6/§1.8/§1.10) :

- Entité **`Card`** : `id` (UUID, généré serveur), `boardId` (UUID, FK `collaboratif.board.id`,
  `ON DELETE CASCADE`), `tenantId` (Long, FK `public.tenants.id`, même convention que `CanvasEvent`),
  `type` (enum `CardType`), `content` (`TEXT`), `meta` (JSONB, nullable), `posX`/`posY` (`DOUBLE
  PRECISION`, défaut **0**), `width` (défaut **192**), `height` (défaut **128**), `color`
  (`VARCHAR`, défaut **`#FFEB3B`**), `groupId` (UUID, nullable), `groupColor` (`VARCHAR`,
  nullable), `locked` (`BOOLEAN`, défaut **false**), `layer` (`INT`, défaut **1**), `createdAt`/
  `updatedAt` (`OffsetDateTime`).
- Enum **`CardType`** exhaustif : `TEXT · IMAGE · LINK · SHAPE · DRAW · LABEL · TABLE` (§1.10) —
  un `type` inconnu à la création est **retiré et retombe sur le défaut `TEXT`** (§3.4), jamais une
  erreur ni une exception.
- `meta` (JSONB) : cache OpenGraph (`title`/`description`/`image`/`siteName`), rempli en asynchrone
  après création/mise à jour (voir US08.6.5, hors périmètre de ce Gate 1).
- **Alignement avec le frontend existant** : `pivot-collaboratif-ui` définit déjà une interface
  `Card`/`CardType` quasi identique dans `board.types.ts` (non branchée sur le canvas actuel,
  probablement scaffoldée par anticipation) — **manque `'LINK'`** dans son union de types actuelle
  (`'TEXT' | 'LABEL' | 'IMAGE' | 'DRAW' | 'TABLE' | 'SHAPE'`) : ce Gate 1 acte l'ajout de `'LINK'`
  pour couvrir les 7 types dès ce socle, même si le comportement OpenGraph associé n'arrive qu'en
  US08.6.5.

**Critères de complétion** :
- [ ] Migration Flyway (`V1__schema_init.sql`, règle "V1 unique avant BETA" de ce repo — pas de
      nouveau fichier numéroté) : table `collaboratif.card` créée avec tous les champs et valeurs
      par défaut exacts ci-dessus (dimensions **192 × 128**, couleur **`#FFEB3B`**, `layer` **1**,
      `locked` **false**), index sur `(board_id)`
- [ ] Enum Java `CardType` = `{TEXT, IMAGE, LINK, SHAPE, DRAW, LABEL, TABLE}`, stocké `VARCHAR` via
      `@Enumerated(EnumType.STRING)` (même convention que `CanvasEventType`)
- [ ] `CARD_CREATE` : DTO accepte `{content, posX, posY, color?, type?, width?, height?, layer?,
      clientTag?}` ; `type` hors enum → retiré (parse tolérant, jamais `IllegalArgumentException`
      propagée) → défaut `TEXT` ; `clientTag` ré-attaché dans le message de broadcast mais **jamais
      persisté** en base
- [ ] `CARD_MOVE` / `CARD_RESIZE` : mutation via une requête `@Modifying @Query` JPQL de la forme
      `UPDATE Card c SET ... WHERE c.id = :id AND c.boardId = :boardId AND c.locked = false` — la
      garde verrou est **dans la clause WHERE** (pas une lecture préalable séparée), `0` ligne
      affectée → refus silencieux (log `DEBUG`, pas de broadcast)
- [ ] `CARD_UPDATE` (contenu) : même garde verrou dans le WHERE ; broadcast si `> 0` ligne affectée
      (asymétrie de portée avec move/resize **non reproduite**, cf. décision ci-dessus — tout part
      en room entière de toute façon)
- [ ] `CARD_RECOLOR` : même garde verrou dans le WHERE, broadcast si `> 0`
- [ ] `CARD_DELETE` : suppression via `@Modifying @Query DELETE FROM Card c WHERE c.id = :id AND
      c.boardId = :boardId` (pas de lecture préalable de `locked` — **la suppression n'est PAS
      bloquée par `locked`** dans ce socle : décision explicite, à confirmer/raffiner par une US de
      parité ultérieure si le comportement doit changer) ; `0` ligne affectée (déjà supprimée) →
      no-op silencieux, jamais d'exception
- [ ] `CARD_LAYER` : `UPDATE` sans garde `locked` dans le WHERE (le calque n'est pas protégé par le
      verrou, cohérent avec §4.6 du spec de référence)
- [ ] Rejeu d'état à la connexion : sur `JOIN`, en plus du broadcast `JOIN` existant (inchangé),
      diffusion (`convertAndSend`, destination `/topic/whiteboard/{boardId}`, **pas**
      `/queue/board-state` — voir le correctif post-recette ci-dessus) de la liste des `Card`
      du board à toute la room, résolue via `CardRepository`
- [ ] Toute mutation `CARD_*` requiert la garde `canWrite` (OWNER ou EDITOR, même méthode
      `isViewer`/`resolveRoleName` que l'existant) ; VIEWER → refus silencieux (log `WARN`, pas de
      broadcast, pas d'erreur dédiée — cohérent avec le refus UNDO existant qui, lui, envoie une
      erreur ciblée : **ici pas d'erreur ciblée**, juste un log, à trancher explicitement dans le
      code par un commentaire renvoyant à cette AC)
- [ ] `tenantId` de chaque `Card` résolu exclusivement depuis `StompPrincipal` (jamais du payload
      client) — même garantie que le reste du repo (règle transversale "Isolation tenant")
- [ ] Security : toute requête de mutation `Card` scope explicitement par `boardId` en plus de
      `id` dans la clause WHERE (pas seulement `id`) — empêche qu'un `id` de carte d'un autre board/
      tenant soit mutable par une requête forgée
- [ ] Tests TI (Testcontainers, dans le même commit que le code par convention de ce repo) :
      création avec `type` invalide → carte `TEXT` ; move sur carte verrouillée → 0 ligne affectée,
      pas de broadcast ; delete sur carte déjà supprimée → no-op sans exception ; VIEWER tente une
      mutation → refus, aucune ligne modifiée ; JOIN → réception du broadcast `board:state` sur
      `/topic/whiteboard/{boardId}` contenant les cartes du board ; carte d'un autre `boardId` non
      mutable via un `id` deviné. **Complété (`pivot-collaboratif-core#68`)** par 3 tests
      rejouant le vocabulaire wire réel du front (`board:join` avec `data` scalaire, `card:create`,
      `board:cursor`) sur une vraie connexion STOMP — la couverture initiale, qui appelait les
      handlers avec les noms d'enum bruts, n'exerçait jamais le vrai chemin de désérialisation/
      dispatch qui a cassé en recette.

**Statut** : ⬜ Backlog

---
Item Type: Enabler · Parent: E08 · Type: architecture · Module: whiteboard · Phase: Socle · Size: L
Stage: ⬜ · Priority: Critical
Dépendances: EN08.1 (isolation WS room, réutilisée), US08.3.1 (`CanvasActionService`/`CanvasEventType`
existants, étendus — pas remplacés), US08.3.2a (canvas local existant, modèle `DRAW` remplacé côté
persistance serveur uniquement, le rendu client main-levée n'est pas dans le périmètre de ce Gate 1)
Source: Parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §1.5/§3.1/§3.4) —
décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08. AC réalignées le
2026-07-14 (Gate 1 PO Agent) contre le code réel de `pivot-collaboratif-core`
(`CanvasEvent`/`CanvasEventType`/`CanvasActionService`) — la version précédente de ce fichier
utilisait une syntaxe Prisma (`updateMany`, code d'erreur `P2025`) et des noms de topic
(`card:*`, `board:join`) hérités tels quels du POC Node/Socket.io de référence, incompatibles avec
la stack Spring/JPA/STOMP réellement utilisée ici.

**Correctif post-recette (2026-07-14)** : ce réalignement Gate 1 avait lui-même tort sur un point —
il présumait que `card:*`/`board:join` étaient des vestiges Node/Socket.io à remplacer par l'enum
Java, sans vérifier ce que le front réel (`pivot-collaboratif-ui`, déjà écrit, déjà en attente de
ce contrat) envoie effectivement. La recette manuelle bout-en-bout (symptôme : impossible d'ajouter
un post-it, `pivot-collaboratif-core#68`) a prouvé l'inverse : `card:*`/`board:join`/`board:cursor`
sont le contrat réel côté entrant, distinct du contrat sortant (participe passé pour les `CARD_*`).
Voir le détail dans la section « Contrat WebSocket » ci-dessus. Leçon pour les Gate 1 futurs
(F08.7+) : vérifier le vocabulaire wire contre le code front réel (`board.store.ts`), pas contre
une supposition sur ce que « devrait » envoyer un client bien élevé.
