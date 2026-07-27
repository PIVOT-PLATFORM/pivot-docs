# US12.1.1 — Créer une réunion avec agenda structuré

> Gate 1 validé (PO Agent) — Sprint 23.

**En tant que** organisateur de réunion
**Je veux** créer une réunion avec un agenda structuré par points
**Afin de** préparer et partager l'ordre du jour à l'avance

## Critères d'acceptation (Gate 1 — définitifs)

> Fondation du domaine MeetOps (E12) : cette première US porte le schéma Flyway `meetings` +
> `meeting_agenda_items` (extrait de EN12.1 — les autres tables suivront avec les US qui en ont
> besoin), le guard Angular module `meetops` et la room STOMP de base. Chaque AC mappe ≥ 1 test.

### Fonctionnels (Given / When / Then)

- [ ] **AC-12.1.1-01 — Création réunion + agenda structuré**
  Given un utilisateur authentifié (`ROLE_USER` ou `ROLE_ADMIN`) dont le tenant a le module MeetOps activé,
  when il envoie `POST /api/collaboratif/meetings` avec `{ title, scheduledStart, durationMinutes, teamId? , agendaItems: [{ title, durationMinutes, type ∈ {INFO, DISCUSSION, DECISION}, facilitator? }] }`,
  then la réunion est persistée en statut `CONFIRMED` avec ses points d'agenda ordonnés, et le système répond `201 Created` avec le `MeetingResponse` (`id`, `title`, `scheduledStart`, `durationMinutes`, `status`, `teamId`, `createdAt`, `agendaItems[]` incluant `position` et `type`).

- [ ] **AC-12.1.1-02 — Ordre des points d'agenda préservé**
  Given une requête de création contenant N points d'agenda dans un ordre donné,
  when la réunion est créée,
  then chaque point est persisté avec une `position` 0-based reflétant l'ordre de la requête, et le `MeetingResponse` les retourne dans ce même ordre.

- [ ] **AC-12.1.1-03 — Agenda vide autorisé** (conserve l'outline)
  Given une requête de création avec `agendaItems` vide ou omis,
  when elle est soumise,
  then la réunion est créée avec succès (`201`) et zéro point d'agenda — l'agenda est facultatif à la création.

- [ ] **AC-12.1.1-04 — Avertissement d'écart de durée (non bloquant)** (conserve l'outline « warning si écart »)
  Given une requête où la somme des `durationMinutes` des points d'agenda diffère de `durationMinutes` de la réunion (et l'agenda n'est pas vide),
  when la réunion est créée,
  then elle est tout de même persistée (`201`) et le `MeetingResponse` porte `agendaDurationWarning = true` avec `agendaDurationTotalMinutes` (somme des points) ; l'écart n'empêche jamais la création. En l'absence d'écart (ou agenda vide), `agendaDurationWarning = false`.

- [ ] **AC-12.1.1-05 — Consultation d'une réunion**
  Given une réunion créée par l'appelant, ou rattachée à une équipe dont l'appelant est membre,
  when il envoie `GET /api/collaboratif/meetings/{id}`,
  then la réunion et ses points d'agenda ordonnés sont retournés (`200`).

### Cas d'erreur

- [ ] **AC-12.1.1-06 — Error : titre invalide**
  Given `POST /api/collaboratif/meetings` avec `title` vide/blanc ou > 200 caractères,
  system retourne `400 Bad Request` (`ProblemDetail`, `code = INVALID_TITLE`) — aucune réunion persistée.

- [ ] **AC-12.1.1-07 — Error : durée invalide**
  Given `durationMinutes` ≤ 0 ou > 1440 (réunion), ou un point d'agenda avec `durationMinutes` ≤ 0,
  system retourne `400 Bad Request` (`code = INVALID_DURATION`) — aucune réunion persistée.

- [ ] **AC-12.1.1-08 — Error : type de point d'agenda invalide**
  Given un point d'agenda dont `type` n'appartient pas à `{INFO, DISCUSSION, DECISION}`,
  system retourne `400 Bad Request` (`code = INVALID_AGENDA_ITEM_TYPE`) — rien persisté.

- [ ] **AC-12.1.1-09 — Error : réunion inconnue ou cross-tenant**
  Given `GET /api/collaboratif/meetings/{id}` pour un `id` inexistant ou appartenant à un autre tenant,
  system retourne `404 Not Found` — jamais `403` (ne confirme pas l'existence de la ressource cross-tenant).

- [ ] **AC-12.1.1-10 — Error : module désactivé**
  Given un tenant dont le module MeetOps est désactivé,
  when l'appelant tente `POST /api/collaboratif/meetings`,
  system retourne `403 Forbidden` (module désactivé), cohérent avec `@RequiresModule` / le guard.

### Sécurité

- [ ] **AC-12.1.1-11 — Security : isolation tenant, identité issue du token**
  `tenantId` et `createdBy` sont extraits **exclusivement** du `CollaboratifRequestPrincipal` (TenantContext du token porteur) ; tout `tenantId`/`createdBy`/`userId` présent dans le body, un query param ou un header custom est ignoré. Les endpoints `list`/`get` filtrent sur `principal.tenantId()` → une ressource cross-tenant est indiscernable d'une absente (`404`). Un `teamId` fourni est validé comme appartenant au tenant de l'appelant, sinon `400`/`404`.

- [ ] **AC-12.1.1-12 — Security : isolation de la room STOMP**
  Un `SUBSCRIBE` sur `/topic/collaboratif/meeting/{meetingId}` est autorisé par un intercepteur de canal qui vérifie que le principal authentifié au `CONNECT` a accès à cette réunion (même tenant + créateur ou membre de l'équipe). Un appelant d'un autre tenant ou sans accès est refusé (STOMP ERROR frame) sans déconnecter les autres abonnés ; aucun événement de réunion ne fuit cross-tenant.

- [ ] **AC-12.1.1-13 — Security : authentification requise**
  Tous les endpoints `/api/collaboratif/meetings/**` exigent un opaque bearer token valide ; absence/expiration → `401`.

### Accessibilité (WCAG 2.1 AA)

- [ ] **AC-12.1.1-14 — A11y : formulaire de création accessible**
  Le formulaire (titre, date/heure, durée, lignes de points d'agenda) est entièrement opérable au clavier ; chaque champ possède un `<label>`/`aria-label` associé ; les erreurs de validation sont liées programmatiquement (`aria-invalid`, `aria-describedby`) et annoncées via une région live (WCAG 1.3.1, 3.3.1, 3.3.2, 4.1.3).

- [ ] **AC-12.1.1-15 — A11y : liste d'agenda sémantique + gestion du focus**
  Les points d'agenda utilisent une structure de liste sémantique ; l'ajout/suppression d'un point déplace le focus de façon prévisible et est annoncé (`aria-live`) ; le `type` de point (INFO/DISCUSSION/DÉCISION) est véhiculé par du texte, pas uniquement par la couleur (1.4.1), contraste ≥ 4.5:1.

## Hors-périmètre

- Invitation des participants et partage de l'ordre du jour → **US12.1.2**.
- Animation temps réel (timer par point, point courant partagé) → **US12.2.1** (la room STOMP posée ici n'émet encore aucun événement métier — abonnement seul).
- Décisions / actions en séance → **US12.2.2** (tables `meeting_decisions`/`meeting_actions` non créées ici).
- Compte-rendu → **F12.3**.
- Pré-réservation depuis une plage roadmap, meilleur créneau, `booking_window`/`event_ref`/`project_ref`, statut `PRE_RESERVED`, `proposed_slots` → **US12.4.1** (le statut `PRE_RESERVED` peut exister dans l'enum/colonne mais cette US ne produit que des réunions `CONFIRMED`).
- KPI du domaine → **EN12.3**.

## Notes d'implémentation

- Réunion créée directement en statut `CONFIRMED` (pas de flux de pré-réservation dans cette US).
- Le champ `config`/JSONB n'est pas utilisé ici : l'agenda est normalisé dès la fondation (table dédiée), contrairement au socle Session.
- L'écart de durée (AC-04) est un avertissement calculé côté serveur, jamais une contrainte de validation.
- Room STOMP posée mais silencieuse : seul l'abonnement autorisé est livré ; le premier événement métier arrive en US12.2.1.

---
Item Type: US · Parent: F12.1 · Module: collaboratif · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Rôle: animateur-facilitateur
