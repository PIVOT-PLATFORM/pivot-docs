# US10.1.1 — Créer une session de daily standup

**En tant que** Scrum Master / animateur
**Je veux** créer une session de daily standup pour mon équipe
**Afin de** organiser le tour de parole et le minuteur

**Gate 1 réalisé le 2026-07-22** — remplace le stub outline précédent. Conventions reprises du
socle E14 La Roue (déjà livré, Sprint 8/18) : session rattachée à une équipe (`public.teams`),
participants résolus depuis `TeamMembershipService` (module `agilite.team`, déjà exposé par
`GET /api/agilite/teams`/`GET /api/agilite/teams/{teamId}/members`, US14.1.1) — aucun nouveau
picker d'équipe à construire.

**Architecture temps réel (Gate 1 — décision PO/Architecte, s'applique à tout F10.2)** : le POC de
référence PouetPouet (`apps/api/src/modules/daily/daily.sockets.ts`) ne broadcaste **aucun tick
serveur** — chaque client dérive le temps écoulé localement depuis un timestamp `speakingAt` fixe
(`Date.now() - speakingAt`, rafraîchi par un `setInterval` client de 1s) et le serveur ne diffuse
qu'un événement par **changement d'état réel** (démarrage, tour suivant, saut, fin). C'est
strictement plus simple et moins bavard qu'un broadcast `TIMER_TICK` par seconde tout en offrant
la même UX (minuteur visuel fluide) — retenu tel quel pour F10.2, voir US10.2.1/US10.2.2 pour le
détail des événements.

## Critères d'acceptation

### Création (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given un appelant authentifié membre de l'équipe `teamId`, when `POST /api/agilite/standup/sessions` avec `{ name, teamId, timePerPersonSeconds?, participantUserIds }`, then 201 Created avec la session créée (`status: "PENDING"`, `currentIndex: 0`), chaque `participantUserId` devenant un `StandupParticipant` dans l'ordre du tableau reçu (`order` 0..n-1, `status: "WAITING"`) | ⬜ |
| Given `timePerPersonSeconds` omis, when la session est créée, then la valeur par défaut **120** (2 min) est appliquée | ⬜ |
| Given `participantUserIds` fourni dans un ordre choisi par l'appelant (aléatoire ou manuel — mélange/réordonnancement fait côté client avant l'envoi), when la session est créée, then cet ordre est conservé tel quel — aucune randomisation serveur | ⬜ |
| Given chaque `participantUserId`, when la session est créée, then le nom affiché de chaque participant est résolu via `TeamMembershipService` (même mécanisme que `WheelService#buildTeamMemberEntry`, US14.1.1) et persisté sur `StandupParticipant.name` (dénormalisé — un départ d'équipe ultérieur ne doit pas casser l'historique) | ⬜ |

### Lecture

| Critère | 🤖 Dev |
|---------|--------|
| Given une session existante du tenant de l'appelant, when `GET /api/agilite/standup/sessions/{id}`, then 200 OK avec la session et ses participants dans l'ordre | ⬜ |
| Given le tenant de l'appelant, when `GET /api/agilite/standup/sessions?teamId=&status=`, then 200 OK avec la liste des sessions accessibles (membre de l'équipe), filtrée par `teamId`/`status` si fournis, triée par `createdAt` décroissant | ⬜ |

### Suppression

| Critère | 🤖 Dev |
|---------|--------|
| Given une session `PENDING` ou `DONE` créée par l'appelant, when `DELETE /api/agilite/standup/sessions/{id}`, then 204 No Content, la session et ses participants sont supprimés (`ON DELETE CASCADE`) | ⬜ |
| Given une session `RUNNING`, when `DELETE .../sessions/{id}`, then 409 — une session en cours ne peut pas être supprimée, elle doit d'abord être terminée (US10.1.2) | ⬜ |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| Error : given `name` vide ou > 100 caractères, when création, then 400 code `INVALID_NAME` | ⬜ |
| Error : given `participantUserIds` vide, when création, then 400 code `EMPTY_PARTICIPANTS` | ⬜ |
| Error : given `timePerPersonSeconds` fourni hors bornes [30, 1800] (30s à 30min), when création, then 400 code `INVALID_TIME_PER_PERSON` | ⬜ |
| Error : given un `participantUserId` qui n'est pas membre de l'équipe `teamId`, when création, then 400 code `INVALID_PARTICIPANT` | ⬜ |
| Error : given un `teamId` inexistant ou d'un autre tenant, when création/lecture/suppression, then 404 — anti-énumération, même convention que `WheelController` (jamais 403 sur une ressource cross-tenant) | ⬜ |
| Error : given un `id` de session inexistant ou d'un autre tenant, when lecture/suppression, then 404 | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : `tenantId`/`userId` résolus exclusivement depuis le `RequestPrincipal` (bearer token), jamais du body/d'un paramètre | ⬜ |
| Security : given un appelant authentifié qui n'est pas membre de l'équipe `teamId`, when création/lecture, then 404 (jamais 403 — n'expose pas l'existence de l'équipe ou de la session) | ⬜ |
| Security : given une session appartenant à une autre équipe/tenant, when suppression, then 404, même si l'appelant est membre d'une autre équipe du même tenant | ⬜ |
| Security : test TI obligatoire cross-tenant sur les 3 endpoints (create/get/delete) | ⬜ |

### A11y (frontend `pivot-ui`)

| Critère | 🤖 Dev |
|---------|--------|
| A11y : formulaire de création — champs `<label>` associés, erreurs `role="alert"`, focus posé sur le premier champ invalide à la soumission échouée | ⬜ |
| A11y : sélecteur de participants — checklist native (`<input type="checkbox">` par membre), jamais une liste cliquable sans sémantique de formulaire | ⬜ |
| A11y : tous les libellés externalisés via Transloco (`fr.json`/`en.json`) | ⬜ |

## Hors périmètre

- **Participants hors équipe (texte libre)** — contrairement à la Roue (US14.1.1), tous les
  participants viennent de l'équipe liée ; pas de saisie libre pour ce sprint.
- **Notification/relance des retardataires** (US10.2.3, benchmark Geekbot) — hors fichier US
  écrit, non repris dans ce sprint (voir `EPIC-daily-standup/README.md`).
- **Modification d'une session existante** (nom, participants, durée) après création — non prévu,
  supprimer et recréer si besoin.

## Notes d'implémentation

- **Backend** : nouveau module `fr.pivot.agilite.standup` (entités `StandupSession`,
  `StandupParticipant`, enum `StandupSessionStatus{PENDING,RUNNING,DONE}`,
  `StandupParticipantStatus{WAITING,SPEAKING,DONE,SKIPPED}`). Migration Flyway forward
  `V4__standup_session.sql` (même précédent que V2/V3 poker — base recette déjà migrée, V1 jamais
  rejoué) : tables `agilite.standup_session`/`agilite.standup_participant`, FK
  `public.teams(id) ON DELETE CASCADE` (même convention que `agilite.wheel`), FK
  `public.users(id)` pour `created_by`. `StandupSessionRepository`/`StandupParticipantRepository`,
  `StandupSessionService#create/getCurrent/list/delete`, `StandupSessionController`. Réutilise
  `TeamMembershipService` (aucune duplication de la résolution de membres).
- **Frontend** : `projects/agilite-ui/src/lib/features/standup/` — `standup-list`,
  `standup-form` (mêmes patterns que `wheel-list`/`wheel-form`), `models/standup.model.ts`,
  `services/standup-api.service.ts`. UX inspirée du POC de référence PouetPouet
  (`apps/web/src/app/(app)/daily/page.tsx`) adaptée aux tokens `@pivot/design-system`.

---
Item Type: US · Parent: F10.1 · Module: agilite · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: scrum-master
