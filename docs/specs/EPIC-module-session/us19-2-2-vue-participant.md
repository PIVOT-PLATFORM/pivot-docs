# US19.2.2 — Vue participant en temps réel (affichage adapté au type d'activité)

## Contexte

- **US** : [`us-vue-participant.md`](pathname:///pivot-docs/backlog/EPIC-module-session/FEATURES/participation/us-vue-participant) · Parent `F19.2` · Module `collaboratif` · Phase phase-3 · Sprint 22
- **PR** : `pivot-ui` [#270](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/270) — Module Session live, PR1/2 (infra socle + POLL/WORDCLOUD)
- **Commit figé** : `8581c9d` (`feat(ui): Module Session live — PR1/2, core infra + POLL/WORDCLOUD (#270)`)
- **Portée du figeage** : shell participant temps réel **frontend** (`pivot-ui`, lib `collaboratif-ui`) + contrat REST/WS consommé. Producteur backend (`pivot-core`, `fr.pivot.collaboratif.session.*`) hors périmètre de session — contrat figé **tel que consommé**.
- **Gate 4 au figeage** : convergence Autoloop — CI verte, squash-mergé sur `main` (le finding F1 `$any()` de template a été corrigé pendant l'Autoloop). Recette humaine en attente.

## Spec fonctionnelle

### Ce que fait la fonctionnalité

Coquille (shell) de participation à une session live, socle des six activités. Un participant
(authentifié ou invité anonyme `ROLE_GUEST`) :

1. **Rejoint** une session via son code court (`POST /sessions/join`) — l'appel produit
   de façon transparente un participant authentifié ou invité selon l'état d'auth ambiant (le token
   porteur, s'il existe, est attaché par l'intercepteur HTTP du shell ; jamais inspecté ni transmis
   explicitement par la méthode).
2. **Charge la vue adaptée** au `session.type` — le shell résout un composant **lazy-loadé** via une
   map `ACTIVITY_LOADERS` + `NgComponentOutlet`. Après la livraison des six activités (Sprint 22),
   `PLACEHOLDER_TYPES` est vide : chaque type résout un composant réel.
3. **S'abonne au temps réel** — une seule connexion STOMP par session sur le topic partagé
   `/topic/collaboratif/session/{id}`, différenciée par le champ `type` de chaque message. Les
   événements de cycle de vie (`SESSION_STARTED` / `PAUSED` / `RESUMED` / `ENDED`,
   `PARTICIPANT_JOINED`) pilotent le shell ; les événements d'activité sont consommés par le
   composant d'activité monté.
4. **Se reconnecte proprement** — à la (re)connexion STOMP, l'état de session est réhydraté depuis
   l'API (`GET /sessions/{id}/state`) : le participant qui rejoint en cours ou après une coupure
   retrouve l'état courant (statut, type, config), puis suit les broadcasts.
5. **Maintient sa présence** (invité) — `POST /sessions/{id}/participants/{pid}/heartbeat` rafraîchit
   le TTL de présence de l'invité ; no-op contractuel pour un participant authentifié.

### Sécurité & accessibilité

| Propriété | Mécanisme |
|-----------|-----------|
| Auth optionnelle | Même appel `join`/`state` selon l'état d'auth : authentifié (bearer) ou `ROLE_GUEST` (token invité scellé `X-Guest-Token`) |
| Isolation tenant | Résolue backend depuis le token/porteur invité — aucun `tenantId`/`userId` client |
| Token invité | Scellé, transmis en header `X-Guest-Token` (jamais en query/body) ; le même est présenté au `CONNECT` STOMP |
| Pas de `$any` | `NgComponentOutlet` alimenté par des inputs typés (finding F1 corrigé) |
| A11y | Statut de session annoncé ; chaque activité porte ses propres garanties WCAG (specs dédiées) |

## Contrat technique final

Endpoint racine : `${collaboratifApiUrl}/sessions`.

| Verbe | Chemin | Rôle | Corps / réponse |
|-------|--------|------|-----------------|
| `POST` | `/sessions/join` | participant | `JoinSessionRequest { code }` → `JoinSessionResponse` |
| `GET` | `/sessions/{id}/state` | participant | header `X-Guest-Token` optionnel → `ParticipantSessionResponse` |
| `POST` | `/sessions/{id}/participants/{pid}/heartbeat` | invité | `GuestHeartbeatRequest` → `204` |

> Cycle de vie animateur (`start` / `pause` / `resume` / `end`) : voir US19.1.2.

### `ParticipantSessionResponse`

```ts
{ id: string; title: string; type: SessionType; status: SessionStatus;
  config: SessionConfig; participantCount: number;
  startedAt: string | null; endedAt: string | null }
// SessionType   = 'QUIZ'|'POLL'|'WORDCLOUD'|'BRAINSTORM'|'QA'|'VOTE'
// SessionStatus = 'DRAFT'|'LIVE'|'PAUSED'|'COMPLETED'
```

### Broadcasts STOMP de cycle de vie (`/topic/collaboratif/session/{id}`)

| Événement | Charge utile | Effet client |
|-----------|--------------|--------------|
| `SESSION_STARTED` | session complète démarrée | bascule en `LIVE`, monte l'activité |
| `SESSION_PAUSED` / `SESSION_RESUMED` / `SESSION_ENDED` | `{ sessionId }` | maj du statut (résultats figés à `ENDED`) |
| `PARTICIPANT_JOINED` | `{ sessionId, participantCount }` | maj du décompte de participants |

## Écarts vs ACs initiaux (outline Gate 1)

| AC outline | État | Note |
|-----------|------|------|
| Router charge le composant adapté au `session.type` (lazy) | ✅ | `ACTIVITY_LOADERS` + `NgComponentOutlet` |
| QUIZ / POLL / WORDCLOUD / BRAINSTORM / QA rendus adaptés | ✅ | POLL/WORDCLOUD dans ce PR ; les 4 autres dans les PR d'activité (#272/#274/#276/#278/#280) |
| Reconnexion STOMP → état rechargé depuis l'API | ✅ | `GET /sessions/{id}/state` |

**Précision d'implémentation** : un **seul** topic STOMP partagé par session (différencié par `type`),
et non un topic par activité — choix d'infra temps réel du module, référencé par toutes les specs d'activité.

## Gates

- **Gate 2** : composants shell + POLL + WORDCLOUD couverts en Vitest (dispatch d'activité, hydratation, reconnexion). Suite `collaboratif-ui` verte au figeage.
- **Gate 4** : convergence Autoloop (finding F1 corrigé), CI verte, squash-merge `main`. Merge humain final en attente.
