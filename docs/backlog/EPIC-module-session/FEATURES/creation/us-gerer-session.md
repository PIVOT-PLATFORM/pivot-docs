# US19.1.2 — Démarrer, mettre en pause et terminer une session live

**En tant que** animateur
**Je veux** contrôler le cycle de vie de ma session (démarrer / pause / terminer)
**Afin de** maîtriser le rythme de l'animation

**Gate 1 réalisé le 2026-07-23** — remplace le stub outline précédent. Prolonge US19.1.1.

**Architecture — accès animateur : propriétaire ou admin, pas « tout membre d'équipe »** (Gate 1
— décision PO/Architecte) : contrairement aux modules `agilite.*` de ce sprint (Standup/Retro/
Wheel/PI Planning — « tout membre d'équipe peut piloter »), le stub d'origine de cette US précise
explicitement *« Animateur seul peut changer le statut (ROLE_USER propriétaire ou ROLE_ADMIN) »*.
Cohérent avec `teamId` optionnel sur `US19.1.1` (une session peut ne pas être rattachée à une
équipe) : le pilotage reste au **créateur** de la session, jamais dérivé d'une appartenance
d'équipe. `teamId` sert uniquement à la visibilité/liste (`US19.1.1` `GET /sessions`), jamais à
l'autorisation de pilotage.

## Critères d'acceptation

### Transitions (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given une session `DRAFT` du créateur appelant, when `POST .../sessions/{id}/start`, then 200 OK — `status → "LIVE"`, `startedAt` = maintenant, broadcast STOMP `SESSION_STARTED` (session complète) sur `/topic/collaboratif/session/{id}` | ⬜ |
| Given une session `LIVE`, when `POST .../sessions/{id}/pause`, then 200 OK — `status → "PAUSED"`, broadcast `SESSION_PAUSED` (participants voient un écran de pause, saisie désactivée) | ⬜ |
| Given une session `PAUSED`, when `POST .../sessions/{id}/resume`, then 200 OK — `status → "LIVE"`, broadcast `SESSION_RESUMED` | ⬜ |
| Given une session `LIVE` ou `PAUSED`, when `POST .../sessions/{id}/end`, then 200 OK — `status → "COMPLETED"`, `endedAt` = maintenant, résultats figés (aucune nouvelle réponse acceptée après ce point, voir `US19.2.2`/`US19.3.x`), broadcast `SESSION_ENDED` | ⬜ |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| Error : given une transition invalide (`DRAFT→pause`, `DRAFT→end`, `PAUSED→start`, `COMPLETED→` tout), when tentée, then 409 code `INVALID_SESSION_TRANSITION` | ⬜ |
| Error : given un `id` de session inexistant ou d'un autre tenant, when tout endpoint ci-dessus, then 404 | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : `tenantId`/`userId` résolus exclusivement depuis le `RequestPrincipal` | ⬜ |
| Security : given un appelant qui n'est ni le créateur ni `ROLE_ADMIN`, when tout changement de statut, then 404 (jamais 403 — anti-énumération, même convention que le reste du socle) | ⬜ |
| Security : test TI obligatoire cross-tenant sur les 4 endpoints de transition | ⬜ |
| Security : test TI obligatoire prouvant qu'un participant (non créateur, non admin) reçoit 404 sur ces 4 endpoints | ⬜ |

## Hors périmètre

- **Historique des transitions** (audit trail des pause/resume) — non spécifié, seul l'état courant est conservé.

## Notes d'implémentation

- **Backend** : `SessionService#start/pause/resume/end` — machine à états stricte (`SessionStatus`), transition invalide = `InvalidSessionTransitionException` → 409 via `CollaboratifExceptionHandler`. `SessionAccessService#resolveSessionForOwnerOrAdmin` (variante stricte de `resolveSessionForCaller` posé en `US19.1.1`, réservée aux endpoints de pilotage). `EN19.2` (isolation WebSocket par session) posée ici : `fr.pivot.collaboratif.session.ws.SessionDestinations`/`SessionChannelInterceptor`, calqués sur `WhiteboardChannelInterceptor` (`fr.pivot.collaboratif.whiteboard.ws`) — vérification d'appartenance à la session sur `SUBSCRIBE`/`SEND` vers `/topic/collaboratif/session/{id}` et `/app/collaboratif/session/{id}/...`, cache Redis TTL court pour la vérification d'accès (même précédent que `MembershipCacheService`), pas de dépendance sur un enabler transverse partagé — même principe déjà appliqué trois fois côté `agilite.*` ce sprint (poker/wheel/retro/standup/pi-planning ont chacun leur isolation dédiée).
- **Frontend** : `session-runner` (vue animateur) — boutons Démarrer/Pause/Reprendre/Terminer, état visuel de la session.

---
Item Type: US · Parent: F19.1 · Module: collaboratif · Phase: phase-3 · Size: M · Priority: Critical
Stage: ⬜
Rôle: animateur-facilitateur
Dépendances: US19.1.1
