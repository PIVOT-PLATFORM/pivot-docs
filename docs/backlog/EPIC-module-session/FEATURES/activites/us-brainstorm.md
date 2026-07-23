# US19.3.4 — Activité BRAINSTORM — post-its virtuels collaboratifs

**En tant que** participant
**Je veux** ajouter des post-its virtuels sur un tableau de brainstorming
**Afin de** contribuer collectivement à la génération d'idées

**Gate 1 réalisé le 2026-07-23** — remplace le stub outline précédent. Prolonge US19.1.2/US19.2.2.

## Critères d'acceptation

### Contribution (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given une session `type: BRAINSTORM` `LIVE`, when un participant `POST .../sessions/{id}/brainstorm/cards` avec `{ text, color }`, then le post-it est créé (`color` ∈ 5 valeurs prédéfinies), broadcast STOMP `CARD_ADDED` (id, auteur, texte, couleur) | ⬜ |
| Given un post-it créé par l'appelant, when `PATCH .../brainstorm/cards/{cardId}` avec `{ text?, color? }`, then 200 OK, broadcast `CARD_UPDATED` | ⬜ |
| Given un post-it créé par l'appelant, when `DELETE .../brainstorm/cards/{cardId}`, then 204 No Content, broadcast `CARD_REMOVED` | ⬜ |
| Given `POST .../brainstorm/categories` (animateur) avec `{ name }` puis `PATCH .../cards/{cardId}` avec `{ categoryId }`, when appelés, then les post-its peuvent être regroupés par catégorie (label), broadcast `CARD_CATEGORIZED` | ⬜ |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| Error : given `text` vide ou > 280 caractères, when création/modification, then 400 code `INVALID_CARD_TEXT` | ⬜ |
| Error : given une session non `BRAINSTORM` ou non `LIVE`, when contribution, then 409 code `INVALID_SESSION_STATUS` | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : given un participant qui tente de modifier/supprimer le post-it d'un **autre** participant, when `PATCH`/`DELETE`, then 403 (post-it visible et existant, juste non autorisé — seul cas de ce sprint où 403 prime sur le 404 anti-énumération, cohérent avec `US10.2.2`/le pattern général « ressource visible mais action refusée ») | ⬜ |
| Security : given l'animateur, when `PATCH`/`DELETE` sur un post-it d'un participant, then autorisé (modération) — distinct du cas ci-dessus | ⬜ |
| Security : contenu post-it échappé à l'affichage (`textContent`, jamais `innerHTML`) — test dédié anti-XSS | ⬜ |
| Security : test TI obligatoire cross-tenant + modification post-it autre participant → 403 | ⬜ |

## Hors périmètre

- **Positionnement libre sur un canevas 2D** (drag-and-drop en espace libre, façon whiteboard) — grille responsive simple au socle, pas de canevas.
- **Vote/like sur les post-its** — relève de `US19.3.5` (Q&A) pour la mécanique d'upvote, non repris ici.

## Notes d'implémentation

- **Backend** : `fr.pivot.collaboratif.session.brainstorm` — `SessionBrainstormCard` (FK
  `sessionId`, `participantId` auteur, `text`, `color`, `categoryId` nullable),
  `SessionBrainstormCategory`. `SessionBrainstormService` — vérification auteur-ou-animateur sur
  `PATCH`/`DELETE`.
- **Frontend** : `session-activity-brainstorm` — grille de post-its colorés, responsive, boutons
  modifier/supprimer visibles uniquement sur ses propres post-its (+ animateur).

---
Item Type: US · Parent: F19.3 · Module: collaboratif · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: utilisateur-final
Dépendances: US19.1.2
