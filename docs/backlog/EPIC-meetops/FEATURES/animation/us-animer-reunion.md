# US12.2.1 — Animer la réunion en temps réel (point courant + timer)

> Gate 1 validé (PO Agent) — Sprint 23.

**En tant que** animateur de réunion
**Je veux** dérouler l'agenda en temps réel avec timer et point courant partagé
**Afin de** tenir les délais et garder tous les participants synchronisés

## Critères d'acceptation

### Fonctionnels (Given / When / Then)

| Critère | 🤖 Dev |
|---------|--------|
| **AC-01 (Démarrage)** — Given une réunion `CONFIRMED` avec ≥ 1 point d'agenda et l'animateur (owner ou `ROLE_ADMIN`) authentifié, when il `POST /api/collaboratif/meetings/{id}/start`, then la réunion passe `IN_PROGRESS`, le 1er point devient `CURRENT` (`current_item_started_at = now()` **serveur**), et un message `MEETING_STARTED` portant le point courant est diffusé sur `/topic/collaboratif/meeting/{id}` à tous les abonnés. | ⬜ |
| **AC-02 (Timer partagé)** — Given une réunion `IN_PROGRESS` dont le point courant a une durée allouée `D`, when le point est en cours, then le serveur diffuse `TIMER_TICK` à cadence 1 s portant `elapsedSeconds` / `remainingSeconds` calculés **côté serveur** depuis `current_item_started_at` ; tous les participants voient le même décompte (l'UI ancre son rendu par seconde sur la dernière valeur autoritative reçue, jamais sur une horloge locale seule). | ⬜ |
| **AC-03 (Point suivant — manuel)** — Given l'animateur sur le point `i` (i < dernier), when il `POST /api/collaboratif/meetings/{id}/agenda/next`, then le point `i` passe `DONE` (`ended_at`, `actual_seconds` renseignés), le point `i+1` devient `CURRENT` (`current_item_started_at` réinitialisé serveur), et `AGENDA_ITEM_CHANGED` (nouvel index + total + point courant) est diffusé à tous les participants. | ⬜ |
| **AC-04 (Dépassement / overtime)** — Given un point courant dont `elapsedSeconds ≥ D`, when le décompte franchit 0, then l'état diffusé porte `overtime = true` et `TIMER_TICK` porte `overtimeSeconds > 0` (`remainingSeconds` négatif) ; l'agenda n'avance pas de force, permettant à l'UI d'afficher un indicateur visuel « overtime ». | ⬜ |
| **AC-05 (Passage automatique — option)** — Given une réunion `auto_advance = true` dont le point courant vient d'expirer, when l'expiration est détectée côté serveur, then le serveur avance automatiquement au point suivant et diffuse `AGENDA_ITEM_CHANGED` ; sur le **dernier** point expiré aucune clôture automatique n'a lieu (l'`overtime` continue jusqu'à action animateur). | ⬜ |
| **AC-06 (Fin de réunion)** — Given l'animateur sur le dernier point (ou souhaitant conclure), when il `POST /api/collaboratif/meetings/{id}/end`, then la réunion passe `ENDED` (`ended_at`), le timer s'arrête, et `MEETING_ENDED` est diffusé à tous (prépare US12.3.1 compte-rendu). | ⬜ |
| **AC-07 (Vue participant + resynchronisation)** — Given un participant membre abonné à la room, when il rejoint (ou se reconnecte) après le démarrage via `GET /api/collaboratif/meetings/{id}/live`, then il reçoit l'état courant complet (statut réunion, point courant, `index` / `total`, `elapsedSeconds` / `remainingSeconds` / `overtime` calculés serveur, liste des points avec statut `PENDING`/`CURRENT`/`DONE`) — pas de dépendance à l'historique STOMP manqué. | ⬜ |
| **AC-08 (Capture d'action en réunion)** — Given l'animateur sur un point courant, when il `POST /api/collaboratif/meetings/{id}/actions` `{ label, ownerUserId?, dueDate? }`, then une `meeting_action` est créée liée à la réunion et au point courant (colonnes minimales `label` + `owner_user_id` + `due_date`), et `MEETING_ACTION_ADDED` est diffusé (données requises plus tard par US12.3.1 / EN12.3). | ⬜ |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| **AC-E1** — Error : given un `start` sur une réunion déjà `IN_PROGRESS` ou `ENDED`, system retourne `409 Conflict` et **aucun** message n'est rediffusé. | ⬜ |
| **AC-E2** — Error : given `agenda/next` (ou `end`) alors que la réunion n'est pas `IN_PROGRESS` (aucun point courant), system retourne `409 Conflict`. | ⬜ |
| **AC-E3** — Error : given un `start` sur une réunion **sans aucun** point d'agenda, system retourne `422 Unprocessable Entity` (rien à animer — cohérent avec US12.1.1 qui autorise l'agenda vide à la création). | ⬜ |
| **AC-E4** — Error : given un `POST /actions` avec `label` vide/blanc ou `dueDate` antérieure à la date du jour, system retourne `400 Bad Request` (validation Bean Validation), sans créer de ligne. | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| **AC-S1 (Isolation tenant)** — Security : le `tenantId` est extrait **exclusivement** du `TenantContext` du token porteur ; jamais du body/query/header. Un `meetingId` appartenant à un autre tenant → `404 Not Found` (jamais 403 — ne pas confirmer l'existence cross-tenant). Test TI cross-tenant obligatoire sur chaque endpoint. | ⬜ |
| **AC-S2 (Autorisation animateur)** — Security : `start`, `agenda/next`, `end` et `POST /actions` sont réservés à l'owner de la réunion ou à `ROLE_ADMIN` (même patron que `VoteController#close`) ; un `ROLE_USER` participant non-animateur → `403 Forbidden`. | ⬜ |
| **AC-S3 (Isolation room STOMP)** — Security : le SUBSCRIBE à `/topic/collaboratif/meeting/{id}` n'est autorisé qu'aux membres du meeting (contrôle tenant + appartenance) via un `MeetingChannelInterceptor` calqué sur `SessionChannelInterceptor` ; un non-membre voit sa frame silencieusement rejetée + notification `/user/queue/errors`, sans aucune fuite d'événement cross-room ni cross-tenant. | ⬜ |
| **AC-S4 (Timer autoritatif serveur)** — Security : `elapsedSeconds` / `remainingSeconds` / `overtimeSeconds` sont **toujours** recalculés côté serveur à partir de `current_item_started_at` persisté ; aucune valeur de temps envoyée par un client n'est acceptée ni rediffusée (anti-dérive et anti-triche, cf. principe « score/temps calculé côté serveur »). | ⬜ |

### Accessibilité (WCAG 2.1 AA)

| Critère | 🤖 Dev |
|---------|--------|
| **AC-A1 (Annonce du timer et de l'overtime)** — A11y : le décompte est exposé dans une région `aria-live="polite"` avec `role="timer"` ; l'entrée en overtime déclenche une annonce `aria-live="assertive"` ; l'indicateur « overtime » ne repose pas uniquement sur la couleur (icône + libellé texte) — conforme WCAG 1.4.1 (Use of Color) et 4.1.3 (Status Messages). | ⬜ |
| **AC-A2 (Clavier + contraste)** — A11y : tous les contrôles animateur (démarrer, point suivant, terminer, ajouter une action) sont atteignables et actionnables au clavier avec focus visible (WCAG 2.1.1, 2.4.7) ; le texte du timer et de l'indicateur overtime respecte un contraste ≥ 4.5:1 dans les thèmes clair et sombre (WCAG 1.4.3). | ⬜ |

## Hors-périmètre

- Rédaction/édition complète des décisions et actions et leur suivi post-réunion → **US12.2.2** / **US12.3.2** (ici : seule la *capture minimale* d'actions en séance, table `meeting_actions`, est requise pour ne pas rebloquer US12.3.1).
- Génération et partage du compte-rendu → **US12.3.1**.
- Création de la réunion et de l'agenda (entité `meeting` + `agenda_items`) → **US12.1.1** (dépendance amont).
- Persistance d'un historique de messages STOMP rejouable : la resynchronisation passe par `GET .../live` (AC-07), pas par un replay du broker.

## Notes d'implémentation

- **Migration** : `V18__meetops_animation.sql` (additive, ne touche jamais V1..V17). `ALTER TABLE collaboratif.meetings ADD` `status`, `current_agenda_item_id`, `started_at`, `ended_at`, `auto_advance BOOLEAN NOT NULL DEFAULT FALSE` ; `ALTER TABLE collaboratif.agenda_items ADD` `item_status` (`PENDING`/`CURRENT`/`DONE`), `current_item_started_at`, `ended_at`, `actual_seconds`, `overtime` ; nouvelles tables `meeting_decisions` et `meeting_actions` (`tenant_id BIGINT NOT NULL`, `meeting_id` FK `ON DELETE CASCADE`, `agenda_item_id` FK nullable, `label TEXT NOT NULL`, `meeting_actions` ajoute `owner_user_id`, `due_date DATE`, `status`). Colonnes de temps en `TIMESTAMPTZ`, cf. style V15.
- **STOMP** : réutiliser la room `/topic/collaboratif/meeting/{meetingId}` (US12.1.1 / EN12.2). Types de message : `MEETING_STARTED`, `TIMER_TICK`, `AGENDA_ITEM_CHANGED`, `MEETING_ENDED`, `MEETING_ACTION_ADDED`.
- **Timer 1 s** : le tick n'est PAS l'autorité — l'autorité est `current_item_started_at` en base ; le tick est une reconciliation, l'UI rend le décompte par seconde en local en s'ancrant sur la dernière valeur autoritative (dégradation gracieuse si un tick est manqué).

---
Item Type: US · Parent: F12.2 · Module: collaboratif · Phase: phase-3 · Size: L · Priority: Medium
Stage: ⬜
Rôle: animateur-facilitateur
Dépendances: US12.1.1
