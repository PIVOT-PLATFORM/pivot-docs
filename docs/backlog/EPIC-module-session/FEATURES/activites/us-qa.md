# US19.3.5 — Activité Q&A — questions des participants avec upvotes

**En tant que** participant
**Je veux** poser des questions et voter pour les questions des autres
**Afin de** faire remonter les sujets les plus pertinents

**Gate 1 réalisé le 2026-07-23** — remplace le stub outline précédent. Prolonge US19.1.2/US19.2.2.

## Critères d'acceptation

### Contribution (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given une session `type: QA` `LIVE`, when un participant `POST .../sessions/{id}/qa/questions` avec `{ text, anonymous: boolean }`, then la question est créée (`status: "OPEN"`), broadcast STOMP `QUESTION_ADDED` (id, texte, auteur ou « Anonyme » si `anonymous: true`) | ⬜ |
| Given une question existante, when `POST .../qa/questions/{id}/upvote`, then le compteur de votes incrémente pour cet appelant (un vote par question par participant), broadcast `QUESTION_UPVOTED` (id, nouveau total) | ⬜ |
| Given `GET .../sessions/{id}/qa/questions`, when appelé, then les questions sont triées par nombre de votes décroissant (égalité → plus récente d'abord) | ⬜ |
| Given `POST .../qa/questions/{id}/answer` (animateur), when appelé, then `status → "ANSWERED"`, broadcast `QUESTION_ANSWERED` | ⬜ |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| Error : given `text` vide ou > 280 caractères, when soumission, then 400 code `INVALID_QUESTION_TEXT` | ⬜ |
| Error : given un participant qui upvote une question qu'il a déjà upvotée, when tenté, then 409 code `ALREADY_UPVOTED` | ⬜ |
| Error : given une session non `QA` ou non `LIVE`, when contribution, then 409 code `INVALID_SESSION_STATUS` | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : given `anonymous: true`, when la question est diffusée/listée, then l'identité de l'auteur n'apparaît dans **aucun** payload (ni pour les autres participants, ni pour l'animateur) — seule l'auteur peut retrouver ses propres questions via son historique local | ⬜ |
| Security : texte question échappé à l'affichage — test dédié anti-XSS | ⬜ |
| Security : test TI obligatoire double upvote même participant → 409, cross-tenant | ⬜ |

## Hors périmètre

- **Réponse textuelle de l'animateur enregistrée** (au-delà du statut `ANSWERED`) — non spécifié, le statut seul est tracé.

## Notes d'implémentation

- **Backend** : `fr.pivot.collaboratif.session.qa` — `SessionQaQuestion` (FK `sessionId`,
  `participantId` nullable si `anonymous`, `text`, `status` enum `{OPEN,ANSWERED}`, `upvoteCount`
  dénormalisé), `SessionQaUpvote` (unique `(questionId, participantId)` pour empêcher le double
  vote). `SessionQaService`.
- **Frontend** : `session-activity-qa` — liste triée temps réel, bouton upvote (désactivé après
  usage), formulaire soumission avec case « anonyme ».

---
Item Type: US · Parent: F19.3 · Module: collaboratif · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: utilisateur-final
Dépendances: US19.1.2
