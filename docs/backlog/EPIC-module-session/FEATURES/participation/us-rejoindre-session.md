# US19.2.1 — Rejoindre une session via code court (authentifié ou anonyme)

**En tant que** participant
**Je veux** rejoindre une session live via un code court
**Afin de** participer sans avoir besoin de compte PIVOT (en ROLE_GUEST)

**Gate 1 réalisé le 2026-07-23** — remplace le stub outline précédent. Prolonge US19.1.1/US19.1.2.

**Architecture — invité anonyme calqué sur le précédent Scrum Poker (`US09.3.1`)** : même mécanisme
que `fr.pivot.agilite.poker` — `AnonymousJoinRequest`/`AnonymousJoinResponse`, un jeton invité
opaque scellé côté session (`GuestSessionExpiredException` équivalent), heartbeat périodique côté
frontend pour maintenir la présence active (`GuestHeartbeatRequest`/`Response`, même modèle que le
poker). Le jeton invité est **strictement scopé à la session** (jamais réutilisable sur une autre
session ni transformable en compte).

## Critères d'acceptation

### Rejoindre (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given un code de session valide, when `POST /api/collaboratif/sessions/join` avec `{ code, displayName }`, then 200 OK avec `{ participantId, token, wsTopic }` | ⬜ |
| Given un appelant authentifié (Bearer token présent), when il rejoint, then le `Participant` créé porte son `userId` (identité de compte, `displayName` fourni peut différer de son nom de profil pour cette session) | ⬜ |
| Given un appelant anonyme (aucun Bearer token), when il rejoint, then un `Participant` `ROLE_GUEST` est créé avec `userId: null` et un `guestToken` opaque scellé, valable uniquement pour cette session | ⬜ |
| Given la jonction réussie, when elle est traitée, then broadcast STOMP `PARTICIPANT_JOINED` (id, displayName) aux autres participants déjà connectés sur `/topic/collaboratif/session/{id}` | ⬜ |
| Given un `displayName`, when il est fourni, then il est tronqué/validé (1–40 caractères, échappé pour l'affichage — jamais interprété comme HTML) | ⬜ |
| Given un heartbeat périodique `POST .../sessions/{id}/participants/{participantId}/heartbeat` (invité uniquement, même contrat que `GuestHeartbeatRequest`/`Response` du poker), when reçu, then la présence est rafraîchie (TTL glissant) | ⬜ |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| Error : given un code inexistant, when jonction, then 404 (même réponse qu'un code syntaxiquement invalide — pas de distinction exploitable pour un brute-force) | ⬜ |
| Error : given une session `COMPLETED`, when jonction tentée, then 404 (une session terminée n'est plus « rejoignable », traitée comme inexistante côté join — évite de révéler qu'un code a existé) | ⬜ |
| Error : given un `displayName` vide ou > 40 caractères, when jonction, then 400 code `INVALID_DISPLAY_NAME` | ⬜ |
| Error : given un jeton invité expiré (heartbeat manqué au-delà du TTL), when action ultérieure tentée, then 401 code `GUEST_SESSION_EXPIRED` | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : le code de session n'est jamais loggé en clair dans les logs applicatifs au-delà du niveau DEBUG (surface de brute-force limitée par le format 6 caractères + le statut `COMPLETED`/absence traités identiquement) | ⬜ |
| Security : un jeton invité ne donne accès qu'aux endpoints participant de **cette session précise** — toute tentative sur une autre session avec ce jeton → 401 | ⬜ |
| Security : test TI obligatoire : join authentifié · join anonyme · code invalide · session `COMPLETED` · jeton invité réutilisé sur une autre session | ⬜ |

## Hors périmètre

- **Limite de participants par session** — non spécifiée, pas de plafond au socle.
- **Bannissement d'un participant par l'animateur** — non spécifié dans cette US (voir `US19.3.4` pour la modération de contenu, distincte de l'exclusion d'un participant).

## Notes d'implémentation

- **Backend** : `SessionParticipantService#join/heartbeat` — réutilise le pattern `AnonymousJoinRequest`/`GuestHeartbeatRequest` du poker (`fr.pivot.agilite.poker.dto`) adapté au module `collaboratif` (nouveaux DTOs propres, pas de dépendance cross-module `agilite`↔`collaboratif`, ADR-006 — même forme, package différent). `GuestSessionExpiredException` équivalent dans `fr.pivot.collaboratif.exception`.
- **Frontend** : `session-join` (saisie code + displayName, page publique sans auth requise), heartbeat périodique dans le service WS participant.

---
Item Type: US · Parent: F19.2 · Module: collaboratif · Phase: phase-3 · Size: M · Priority: Critical
Stage: ⬜
Rôle: utilisateur-final
Dépendances: US19.1.1
