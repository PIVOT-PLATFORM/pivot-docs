# US20.3.1 — Créer et assigner des actions issues de la rétrospective

**En tant que** équipe
**Je veux** créer des actions concrètes à partir de la rétrospective et les assigner
**Afin de** transformer les apprentissages en améliorations mesurables

## Contexte

Une action se crée pendant la phase `ACTION` d'une session de rétro (US20.1.2c) — après le
dot-voting (US20.1.2b), l'équipe transforme les cards les plus votées en actions concrètes. Une
action reste consultable et modifiable après la clôture de la session (`CLOSED`), au niveau de
l'équipe, indépendamment de toute session — c'est un artefact durable, pas un objet éphémère de
la session.

## Critères d'acceptation

- [ ] Given une session en phase `ACTION`, when le facilitateur (ou tout participant authentifié
      membre de l'équipe) `POST .../retro/sessions/{id}/actions` avec `{ title, ownerUserId?,
      dueDate?, sourceCardId? }`, then 201 et l'action est créée avec `status: A_FAIRE`, liée à la
      fois à la session (`sessionId`) et à l'équipe (`teamId`, hérité de la session).
- [ ] Given aucune session en phase `ACTION` (session en `CONTRIBUTION`/`REVUE`/`VOTE`/`CLOSED`),
      when `POST .../actions`, then 409 (transition de phase invalide — même convention que les
      autres endpoints `retro/phase`).
- [ ] Given `ownerUserId` absent du corps de la requête, when `POST .../actions`, then 201 —
      owner optionnel, une action peut rester non assignée.
- [ ] Given `ownerUserId` fourni mais ne correspondant à aucun membre de l'équipe de la session,
      when `POST .../actions`, then 400 (owner doit être un membre de l'équipe, jamais un
      utilisateur arbitraire d'un autre tenant/équipe).
- [ ] Given `sourceCardId` fourni et référence une card qui n'appartient pas à la session
      courante, when `POST .../actions`, then 400.
- [ ] Given `sourceCardId` absent, when `POST .../actions`, then 201 — action librement créée
      sans card source (ex. suivi d'une décision d'équipe non issue d'une card).
- [ ] Given une session appartenant à un autre tenant (ou dont l'appelant n'est pas membre de
      l'équipe), when `POST .../actions`, then 404 (jamais 403 — pas de confirmation d'existence
      cross-tenant, même convention que tous les autres endpoints `retro/*`).
- [ ] Given une action existante, when `PATCH .../retro/actions/{actionId}` avec `{ status }` où
      `status ∈ { A_FAIRE, EN_COURS, TERMINEE, ABANDONNEE }`, then 200 et le nouveau statut est
      persisté — transitions libres entre les 4 statuts (pas de machine à états stricte, une
      équipe peut rouvrir une action `ABANDONNEE`).
- [ ] Given un `status` hors de l'énumération, when `PATCH .../actions/{actionId}`, then 400.
- [ ] Given une action appartenant à une équipe dont l'appelant n'est pas membre, when
      `PATCH .../actions/{actionId}`, then 404.
- [ ] Given une équipe avec des actions issues de plusieurs sessions de rétro (passées et
      présentes), when `GET .../retro/teams/{teamId}/actions?status=&sort=`, then 200 avec la
      liste de toutes les actions de l'équipe, triable par `status` et par `dueDate` — accessible
      indépendamment de l'état (ouvert/clôturé) de la session d'origine.
- [ ] Given un appelant qui n'est pas membre de `{teamId}`, when
      `GET .../retro/teams/{teamId}/actions`, then 404.
- [ ] Security : `teamId`/`tenantId` extraits exclusivement du `RequestPrincipal` résolu depuis le
      token porteur — jamais du body/query/header (cf. règle transversale isolation tenant,
      `pivot-agilite-core/CLAUDE.md`).
- [ ] Diffusion temps réel : la création d'une action broadcast un événement `ACTION_CREATED` sur
      `/topic/agilite/retro/{sessionId}` (même canal STOMP que les autres événements de phase
      ACTION) — cohérence avec le reste de la session temps réel ; le changement de statut n'a
      pas besoin d'être temps réel (consulté hors session, US20.3.2).

---
Item Type: US · Parent: F20.3 · Module: agilite · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: macro:ingenierie-developpement
Dépendances: US20.1.2c (US20.1.2 décomposée en US20.1.2a/b/c, 2026-07-10)
