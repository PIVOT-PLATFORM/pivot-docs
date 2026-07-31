# US12.2.1 — Animer la réunion en temps réel (point courant + timer)

**En tant que** animateur de réunion
**Je veux** dérouler l'agenda en temps réel avec timer et point courant partagé
**Afin de** tenir les délais et garder tous les participants synchronisés

Prolonge US12.1.1 (création de réunion + agenda structuré : chaque `agenda_item` porte
`title`, `type` ∈ `INFO`/`DISCUSSION`/`DECISION`, un `animateur` et une durée prévue). Cette US
ajoute le **cycle de vie temps réel** de la réunion : démarrage, point courant partagé, timer
par point diffusé, passage au point suivant, dépassement de temps (overtime) et clôture — le tout
sur la room STOMP `/topic/collaboratif/meeting/{meetingId}` définie par EN12.2. Le compte-rendu
(US12.3.1) consomme telles quelles les données de timing réel produites ici (`agenda_items.started_at`/
`ended_at`, `meetings.started_at`/`ended_at`).

**Cadrage — cible modulith (sprint-23, ADR-030).** Contrairement au README d'E12 (rédigé avant la
bascule modulith), la cible d'implémentation est le **modulith `pivot-core`**, module
`fr.pivot.collaboratif.meeting`, schéma Flyway `collaboratif`, + `pivot-ui`. Aucun repo
`pivot-collaboratif-core`/`-ui` séparé. Le socle temps réel STOMP et l'isolation multi-tenant sont
supposés livrés par les sprints Collaboration précédents.

**Décision Gate 1 — un seul ticker serveur autoritatif à 1 Hz, source unique du temps.** Le stub
demande à la fois « `TIMER_TICK` chaque seconde », « passage au point suivant automatique à
expiration » et « indicateur overtime ». Ces trois exigences sont servies par **un unique
mécanisme** : au démarrage de la réunion, le serveur enregistre une tâche planifiée par réunion
active, cadencée à 1 Hz. Le **temps de référence est toujours celui du serveur** (`Clock` injecté) :
`elapsedSeconds = now − currentItemStartedAt`, `remainingSeconds = plannedDurationSeconds −
elapsedSeconds`, `overtime = remainingSeconds < 0`. Chaque tick diffuse `TIMER_TICK`. Le client
n'est jamais autoritatif sur le décompte : il interpole entre deux ticks avec son horloge locale
recalée sur le champ `serverTime` de chaque événement (pas de dérive inter-participants).

**Décision Gate 1 — manuel par défaut, overtime ; auto-advance opt-in, jamais d'overtime.**
« Manuel ou automatique à expiration » se règle par le drapeau `meetings.auto_advance` (défaut
`false`). En **mode manuel** (`auto_advance = false`) : à expiration le point courant entre en
**overtime** (le décompte continue en négatif) et n'avance **que** sur action explicite de
l'animateur (`POST .../next`). En **mode auto** (`auto_advance = true`) : au premier tick où
`remainingSeconds ≤ 0`, le ticker déclenche lui-même l'avance (même transition que `POST .../next`,
`trigger: "TIMER_EXPIRED"`) et **l'overtime ne survient donc jamais** pour ce point. Les deux modes
sont mutuellement exclusifs sur un même point — pas de « overtime puis auto-avance après X »
(hors périmètre).

**Décision Gate 1 — avancer au-delà du dernier point clôt la réunion.** `POST .../next` sur le
dernier point de l'agenda ne crée pas de « point suivant » : il clôt la réunion
(`status = ENDED`, `ended_at` posé, `current_agenda_item_id = null`, `MEETING_ENDED` diffusé). Il
n'existe **pas** d'endpoint de terminaison anticipée séparé dans cette US (hors périmètre) — la
seule sortie est d'avancer jusqu'au bout.

## Critères d'acceptation

### Démarrage de la réunion (backend `pivot-core` — `fr.pivot.collaboratif.meeting`)

| Critère | 🤖 Dev |
|---------|--------|
| Given une réunion `CONFIRMED` du tenant de l'appelant, dont l'appelant est l'organisateur, avec au moins un `agenda_item`, when `POST /api/collaboratif/meetings/{id}/start`, then la réponse est **200 OK** avec un `MeetingLiveStateResponse` : `{ meetingId, status: "IN_PROGRESS", startedAt, endedAt: null, currentAgendaItemId, currentItemStartedAt, currentItemPlannedDurationSeconds, elapsedSeconds: 0, remainingSeconds, overtime: false, serverTime, agenda: [...] }` — `currentAgendaItemId` = premier point de l'agenda (par `position` croissante) | ⬜ |
| Given le démarrage ci-dessus, when il a lieu, then la transition est **persistée avant tout broadcast** : `meetings.status = 'IN_PROGRESS'`, `meetings.started_at = now`, `meetings.current_agenda_item_id` = id du premier point, et ce premier `agenda_items.started_at = now` (`Clock` serveur injecté, jamais `Instant.now()` en dur) | ⬜ |
| Given le démarrage ci-dessus, when il a lieu, then un événement `MEETING_STARTED` est diffusé à **tous** les abonnés de `/topic/collaboratif/meeting/{meetingId}` : `{ type: "MEETING_STARTED", meetingId, status: "IN_PROGRESS", startedAt, currentAgendaItemId, currentItemStartedAt, currentItemPlannedDurationSeconds, serverTime }` | ⬜ |
| Given le démarrage ci-dessus, when il a lieu, then le serveur enregistre pour cette réunion un **ticker planifié à 1 Hz** (une seule tâche par réunion, idempotent : un second démarrage ne crée jamais un doublon de ticker) | ⬜ |

### Timer par point (backend — ticker 1 Hz)

| Critère | 🤖 Dev |
|---------|--------|
| Given une réunion `IN_PROGRESS` avec un point courant, when chaque seconde s'écoule, then le ticker diffuse `TIMER_TICK` sur la room : `{ type: "TIMER_TICK", meetingId, agendaItemId, elapsedSeconds, remainingSeconds, overtime, serverTime }` — `elapsedSeconds`/`remainingSeconds` recalculés à partir de `currentItemStartedAt` et `plannedDurationSeconds` au regard de l'horloge serveur, jamais un compteur incrémenté à l'aveugle | ⬜ |
| Given le point courant dont la durée prévue est écoulée en **mode manuel** (`auto_advance = false`), when le ticker évalue `remainingSeconds ≤ 0`, then `overtime = true` et `remainingSeconds` devient négatif (décompte à rebours), le ticker continue et **aucune avance automatique n'a lieu** | ⬜ |
| Given le point courant dont la durée prévue est écoulée en **mode auto** (`auto_advance = true`), when le ticker évalue `remainingSeconds ≤ 0`, then il déclenche immédiatement l'avance (transition identique à `POST .../next`, `trigger: "TIMER_EXPIRED"`) et `overtime` **reste `false`** pour ce point (jamais de tick overtime émis avant l'avance auto) | ⬜ |
| Given une réunion qui n'est pas `IN_PROGRESS` (jamais démarrée, ou déjà `ENDED`), when le temps s'écoule, then **aucun** `TIMER_TICK` n'est diffusé (aucun ticker actif ; `TIMER_TICK` n'est jamais persisté — événement transitoire uniquement) | ⬜ |

### Progression de l'agenda & clôture (backend)

| Critère | 🤖 Dev |
|---------|--------|
| Given une réunion `IN_PROGRESS` dont l'appelant est l'organisateur, un point courant qui **n'est pas** le dernier, when `POST /api/collaboratif/meetings/{id}/next`, then la réponse est **200 OK** (`MeetingLiveStateResponse` à jour) ; en base : le point courant reçoit `ended_at = now`, le point suivant (par `position`) reçoit `started_at = now`, `meetings.current_agenda_item_id` = id du point suivant — persistance **avant** broadcast | ⬜ |
| Given l'avance ci-dessus, when elle a lieu (déclenchée manuellement **ou** par le ticker en mode auto), then `AGENDA_ITEM_CHANGED` est diffusé à tous : `{ type: "AGENDA_ITEM_CHANGED", meetingId, previousAgendaItemId, currentAgendaItemId, currentItemStartedAt, currentItemPlannedDurationSeconds, trigger: "MANUAL" \| "TIMER_EXPIRED", serverTime }` — le décompte du nouveau point repart de sa `plannedDurationSeconds` pleine | ⬜ |
| Given une réunion `IN_PROGRESS` dont l'appelant est l'organisateur et dont le point courant **est le dernier** de l'agenda, when `POST /api/collaboratif/meetings/{id}/next`, then la réunion est clôturée : `agenda_items.ended_at = now` sur le dernier point, `meetings.status = 'ENDED'`, `meetings.ended_at = now`, `meetings.current_agenda_item_id = null` (persisté avant broadcast) ; `MEETING_ENDED` est diffusé : `{ type: "MEETING_ENDED", meetingId, status: "ENDED", endedAt, serverTime }` ; le ticker de la réunion est **arrêté et retiré du registre** (plus aucun `TIMER_TICK`) | ⬜ |
| Given un participant qui rejoint ou se reconnecte en cours de réunion, when il appelle `GET /api/collaboratif/meetings/{id}/live-state`, then il reçoit le `MeetingLiveStateResponse` complet reflétant l'état courant (point courant, `elapsedSeconds`/`remainingSeconds`/`overtime` recalculés à l'instant de l'appel, agenda avec `state` ∈ `DONE`/`CURRENT`/`UPCOMING` par point) — permet à un arrivant tardif de se resynchroniser sans attendre le prochain tick | ⬜ |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| Error : given un `id` de réunion inexistant **ou** appartenant à un autre tenant, when `POST .../start`, `POST .../next` ou `GET .../live-state`, then **404** avec `MeetingNotFoundException` (code `MEETING_NOT_FOUND`) — même discipline anti-énumération que le reste du module, jamais 403 pour un cross-tenant | ⬜ |
| Error : given une réunion sans **aucun** `agenda_item`, when `POST .../start`, then **409** `MeetingHasNoAgendaException` (code `MEETING_HAS_NO_AGENDA`) — impossible d'animer un agenda vide ; l'état de la réunion reste inchangé (`CONFIRMED`, `started_at == null`) | ⬜ |
| Error : given une réunion déjà `IN_PROGRESS`, when `POST .../start`, then **409** `MeetingAlreadyStartedException` (code `MEETING_ALREADY_STARTED`) ; given une réunion déjà `ENDED`, when `POST .../start`, then **409** `MeetingAlreadyEndedException` (code `MEETING_ALREADY_ENDED`) — le démarrage n'est ni répétable ni réversible | ⬜ |
| Error : given une réunion qui n'est **pas** `IN_PROGRESS` (statut `CONFIRMED`/`PRE_RESERVED`/`ENDED`), when `POST .../next`, then **409** `MeetingNotInProgressException` (code `MEETING_NOT_IN_PROGRESS`) — on ne peut avancer que dans une réunion en cours | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : `tenantId` et `userId` sont résolus **exclusivement** depuis le `RequestPrincipal`/`TenantContext` (token porteur), jamais depuis le corps, un paramètre de requête ou un header custom — règle transversale, aucune exception pour ces endpoints | ⬜ |
| Security : given un appelant authentifié, même tenant, mais **pas** l'organisateur de la réunion, when `POST .../start` ou `POST .../next`, then **403** `MeetingFacilitatorOnlyException` (code `MEETING_FACILITATOR_ONLY`) et l'état de la réunion reste strictement inchangé après la tentative rejetée — seul l'organisateur pilote l'animation ; les participants ne font que consulter (`GET .../live-state`) et s'abonner | ⬜ |
| Security : l'abonnement STOMP à `/topic/collaboratif/meeting/{meetingId}` est **autorisé côté serveur** (intercepteur `SUBSCRIBE`) : seul un principal authentifié appartenant au tenant propriétaire de la réunion peut s'abonner ; un abonnement cross-tenant est rejeté et ne reçoit **jamais** `MEETING_STARTED`/`TIMER_TICK`/`AGENDA_ITEM_CHANGED`/`MEETING_ENDED` — pas d'écoute passive inter-tenant sur la room | ⬜ |
| Security : test d'intégration obligatoire prouvant (a) le 403 organisateur-only sur `POST .../start` et `POST .../next` avec état inchangé, et (b) qu'un abonné d'un autre tenant à la room ne reçoit aucun événement diffusé | ⬜ |

### Frontend (`pivot-ui`)

| Critère | 🤖 Dev |
|---------|--------|
| Given un participant sur la vue d'animation d'une réunion `IN_PROGRESS`, when la vue s'affiche, then elle appelle d'abord `GET .../live-state` (état initial) **puis** s'abonne à `/topic/collaboratif/meeting/{meetingId}` — pas d'affichage vide en attendant le premier tick ; les événements STOMP mettent ensuite l'affichage à jour de façon incrémentale | ⬜ |
| Given le point courant affiché, when le timer tourne, then l'UI montre : le **titre + type** du point courant, un **décompte** (mm:ss) recalé sur `serverTime` et **interpolé localement** entre deux `TIMER_TICK` (pas de saut d'1 s ni de gel entre ticks), et la **progression de l'agenda** (liste ordonnée des points avec état passé/courant/à venir) | ⬜ |
| Given le point courant qui dépasse sa durée prévue (`overtime = true`, mode manuel), when l'UI le reçoit, then le décompte bascule en **compte à rebours négatif** et un indicateur « En dépassement » s'affiche — signalé par **texte + icône**, jamais par la couleur seule | ⬜ |
| Given l'appelant est l'organisateur d'une réunion `IN_PROGRESS`, when la vue s'affiche, then il voit les contrôles « Point suivant » (et « Terminer » sur le dernier point) ; les participants non-organisateurs ne voient **jamais** ces contrôles. Given le clic sur « Point suivant », when la requête est en cours, then le bouton est désactivé (`aria-busy`) le temps de la réponse — pas de double-soumission | ⬜ |
| Given la réception de `MEETING_ENDED`, when l'UI la traite, then le timer s'arrête, l'agenda s'affiche entièrement « traité », et un état de clôture s'affiche (les contrôles d'animation disparaissent) sans rechargement de page | ⬜ |
| Given une erreur HTTP sur `start`/`next` (403/404/409/générique) ou une perte de connexion STOMP, when elle survient, then un message d'erreur non bloquant s'affiche (conventions i18n du module) et l'affichage reste sur le dernier état serveur confirmé ; à la reconnexion STOMP, l'UI re-appelle `GET .../live-state` pour se resynchroniser (pas de transition locale optimiste avant confirmation serveur) | ⬜ |

### A11y (WCAG 2.1 AA)

| Critère | 🤖 Dev |
|---------|--------|
| A11y : le décompte du timer, qui change chaque seconde, est dans une région `aria-live="off"` (les secondes ne sont **jamais** annoncées à chaque tick — cela inonderait le lecteur d'écran) ; **seules les transitions signifiantes** sont annoncées via une région `aria-live="polite"` distincte : changement de point courant (« Point courant : {titre} »), entrée en dépassement (« Point en dépassement »), clôture (« Réunion terminée ») | ⬜ |
| A11y : la progression de l'agenda est une liste ordonnée dont le point courant porte `aria-current="step"` ; l'état de chaque point (traité/courant/à venir) est exposé par texte ou `aria-label`, jamais par la couleur seule | ⬜ |
| A11y : les contrôles d'animation (« Point suivant », « Terminer ») sont des `<button>` natifs, navigables au clavier et focus visible ; tous les libellés (contrôles, états timer/overtime/clôture, messages d'erreur) sont externalisés via Transloco (`fr.json`/`en.json`) — aucune chaîne littérale dans les templates | ⬜ |

## Hors périmètre

- **Terminaison anticipée dédiée** (arrêter une réunion avant le dernier point via un endpoint séparé) — la seule clôture est `POST .../next` au-delà du dernier point (décision Gate 1). US ultérieure si besoin.
- **Revenir en arrière** (repasser au point précédent), **réordonner** ou **modifier** l'agenda en cours de réunion — l'agenda est figé pour la durée de l'animation ; modification = US de préparation (F12.1).
- **Pause / reprise du timer** (mettre le décompte en pause) — non demandé par le stub ; le temps réel court en continu.
- **Saisie des décisions et actions pendant la réunion** — couverte par US12.2.2, non traitée ici.
- **Compte-rendu et durées réelles agrégées** — cette US **produit** les données de timing (`agenda_items.started_at`/`ended_at`, `meetings.started_at`/`ended_at`) mais leur restitution est US12.3.1.
- **Présence / liste des participants connectés en temps réel** (« qui est dans la réunion ») — non demandé par le stub ; hors périmètre.
- **Résilience du ticker à un redémarrage applicatif** (reconstruction du registre de tickers pour les réunions `IN_PROGRESS` au boot) — voir Notes d'implémentation ; à confirmer par l'Architect Agent, non érigé en AC bloquante ici.

## Notes d'implémentation

- **Cible** : modulith `pivot-core`, module `fr.pivot.collaboratif.meeting` (schéma Flyway `collaboratif`) + `pivot-ui` (ADR-030). Réutilise le socle STOMP et l'isolation multi-tenant du domaine Collaboration.
- **Schéma (migration Flyway forward-additive — ne jamais muter le `V1` existant, cf. règle « V1-mutable → table manquante »)** :
  - `meetings` : ajouter `started_at TIMESTAMPTZ NULL`, `ended_at TIMESTAMPTZ NULL`, `current_agenda_item_id UUID NULL` (FK → `agenda_items(id)`), `auto_advance BOOLEAN NOT NULL DEFAULT false` ; étendre le domaine de `status` avec `IN_PROGRESS` et `ENDED` (jeu complet : `PRE_RESERVED`, `CONFIRMED`, `IN_PROGRESS`, `ENDED`).
  - `agenda_items` : ajouter `started_at TIMESTAMPTZ NULL`, `ended_at TIMESTAMPTZ NULL` ; s'appuyer sur la colonne d'ordre existante de US12.1.1 (`position`, entier croissant) pour la séquence « point 1 → suivant → dernier ». La durée prévue par point est `plannedDurationSeconds` (colonne `duration` de US12.1.1, exprimée/convertie en secondes).
- **Endpoints** (base `/api/collaboratif/meetings`) : `POST /{id}/start`, `POST /{id}/next`, `GET /{id}/live-state` — tous rendent `MeetingLiveStateResponse`.
- **DTOs** (`fr.pivot.collaboratif.meeting.dto`) : `MeetingLiveStateResponse{ meetingId, status, startedAt, endedAt, currentAgendaItemId, currentItemStartedAt, currentItemPlannedDurationSeconds, elapsedSeconds, remainingSeconds, overtime, serverTime, agenda: List<AgendaItemState> }`, `AgendaItemState{ id, title, type, position, plannedDurationSeconds, state["DONE"|"CURRENT"|"UPCOMING"], startedAt, endedAt }`, et les événements `MeetingStartedEvent`, `TimerTickEvent`, `AgendaItemChangedEvent`, `MeetingEndedEvent` avec constante `TYPE` et fabrique statique (même style que les événements STOMP du poker/whiteboard).
- **Ticker 1 Hz** : registre en mémoire `Map<meetingId, ScheduledFuture>` alimenté par un `TaskScheduler` Spring (`scheduleAtFixedRate`, période 1 s) — enregistré au `start`, annulé/retiré au `MEETING_ENDED`. Le calcul `elapsed`/`remaining`/`overtime` est **dérivé** de `currentItemStartedAt` + `plannedDurationSeconds` vs `Clock` injecté (jamais un compteur mutable). En mode auto, la branche `remaining ≤ 0` réutilise la **même** méthode de service `advance(...)` que `POST .../next` (`trigger = TIMER_EXPIRED`). Résilience redémarrage (reconstruire le registre depuis les réunions `IN_PROGRESS` au boot) : à cadrer avec l'Architect Agent (hors périmètre AC, cf. Hors périmètre).
- **Broadcast** : `SimpMessagingTemplate.convertAndSend("/topic/collaboratif/meeting/" + meetingId, event)`. **Persistance systématiquement avant broadcast** (cohérence lecture `GET .../live-state`).
- **Sécurité STOMP** : intercepteur de canal sur les frames `SUBSCRIBE` (`ChannelInterceptor`) validant tenant + appartenance de la réunion avant d'autoriser l'abonnement à la room — même mécanisme d'isolation que les autres rooms Collaboration.
- **Exceptions** (mappées `GlobalExceptionHandler`) : `MeetingNotFoundException`→404, `MeetingHasNoAgendaException`/`MeetingAlreadyStartedException`/`MeetingAlreadyEndedException`/`MeetingNotInProgressException`→409, `MeetingFacilitatorOnlyException`→403.
- **Organisateur = animateur de la réunion** : l'appelant autorisé au pilotage est l'organisateur (`created_by`) de la réunion (US12.1.1), distinct de l'`animateur` porté par chaque `agenda_item` (purement informatif pour l'affichage, sans effet sur l'autorisation des contrôles).
- **Frontend** `pivot-ui` : composant d'animation consommant `GET .../live-state` + abonnement STOMP ; décompte interpolé localement entre ticks (offset horloge = `serverTime` reçu − horloge locale) ; signaux `currentItem`/`remainingSeconds`/`overtime`/`agendaProgress` ; contrôles conditionnés à `isOrganizer`.
- **Tests** : TU service (start/next/clôture, mode manuel vs auto, calcul overtime avec `Clock` figé) ; TI (Testcontainers) prouvant les transitions persistées, les 4xx d'erreur, le 403 organisateur-only, et l'isolation STOMP cross-tenant (client STOMP de test) ; front — specs de rendu (overtime, changement de point, clôture) + a11y (`aria-live`, `aria-current`).

---
Item Type: US · Parent: F12.2 · Module: collaboratif · Repo: pivot-core (module collaboratif) + pivot-ui · Phase: phase-3 · Size: L · Priority: Medium
Stage: ⬜
Rôle: animateur-facilitateur
Dépendances: US12.1.1
