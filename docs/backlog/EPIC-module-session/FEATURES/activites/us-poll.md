# US19.3.2 — Activité POLL — sondage instantané avec résultats temps réel

**En tant que** animateur
**Je veux** lancer un sondage rapide et voir les résultats évoluer en temps réel
**Afin de** prendre la température de l'équipe ou valider une décision collective

**Gate 1 réalisé le 2026-07-23** — remplace le stub outline précédent. Prolonge US19.1.2/US19.2.2.

## Critères d'acceptation

### Configuration et vote (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given une session `type: POLL`, when sa `config` est définie, then elle porte une question, 2 à 8 options, et `allowMultiple: boolean` (choix unique par défaut) | ⬜ |
| Given une session `POLL` `LIVE`, when un participant `POST .../sessions/{id}/poll/vote` avec `{ optionIds }` (1 élément si choix unique, N si `allowMultiple`), then son vote est enregistré (upsert — un seul vote actif par participant), broadcast STOMP `POLL_UPDATED` (compte/% par option) | ⬜ |
| Given un vote déjà soumis, when le participant vote à nouveau tant que le POLL reste `LIVE`, then son vote précédent est remplacé (pas de doublon), `POLL_UPDATED` rediffusé | ⬜ |
| Given `POST .../sessions/{id}/poll/hide-results` / `.../show-results` (animateur), when appelé, then les résultats cessent/reprennent d'être inclus dans `POLL_UPDATED` diffusé aux **participants** (l'animateur les voit toujours via sa propre vue, `US19.4.1`) | ⬜ |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| Error : given `optionIds` contient un id hors de la config ou plusieurs ids alors que `allowMultiple: false`, when vote, then 400 code `INVALID_POLL_VOTE` | ⬜ |
| Error : given une session non `POLL` ou non `LIVE`, when vote, then 409 code `INVALID_SESSION_STATUS` | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : given les résultats masqués (`hide-results`), when un participant interroge l'état du poll, then aucun compte/pourcentage n'est présent dans la réponse (pas seulement non affiché côté UI — absent du payload) | ⬜ |
| Security : test TI obligatoire cross-tenant + non-participant sur les endpoints de vote/masquage | ⬜ |

## Hors périmètre

- **Vote pondéré sur un POLL** — relève de `US19.3.6` (VOTE), pas de ce type d'activité.

## Notes d'implémentation

- **Backend** : `fr.pivot.collaboratif.session.poll` — `SessionPollOption`/`SessionPollVote` (FK
  `sessionId`, unique `(sessionId, participantId)` pour l'upsert), `SessionPollService`. Diffusion
  via `SessionDestinations` (`EN19.2`).
- **Frontend** : `session-activity-poll` (participant : sélection options + confirmation), vue
  résultats temps réel (barres/pourcentages).

---
Item Type: US · Parent: F19.3 · Module: collaboratif · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: animateur-facilitateur
Dépendances: US19.1.2
