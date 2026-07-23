# US19.3.4 — Activité BRAINSTORM — post-its virtuels collaboratifs

## Contexte

- **US** : [`us-brainstorm.md`](pathname:///pivot-docs/backlog/EPIC-module-session/FEATURES/activites/us-brainstorm) · Parent `F19.3` · Module `collaboratif` · Phase phase-3 · Sprint 22
- **PR** : `pivot-ui` [#274](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/274) — `Closes #273`
- **Commit figé** : `10d763a` (`feat(ui): BRAINSTORM activity participant view (US19.3.4) (#274)`)
- **Portée du figeage** : vue participant **frontend** (`pivot-ui`, lib `collaboratif-ui`) + contrat REST/WS consommé. Producteur backend (`pivot-core`, `fr.pivot.collaboratif.session.brainstorm`) hors périmètre de session — contrat figé **tel que consommé**.
- **Gate 4 au figeage** : convergence Autoloop — CI verte (5 workflows), squash-mergé sur `main`. Recette humaine en attente.

## Spec fonctionnelle

### Ce que fait la fonctionnalité

Vue participant du tableau de brainstorming collaboratif.

1. **Ajouter un post-it** — texte + couleur parmi une palette de 5 (`YELLOW` / `PINK` / `BLUE` / `GREEN` / `ORANGE`). À l'envoi, broadcast `CARD_ADDED` → la carte apparaît sur le tableau de tous les participants.
2. **Modifier / supprimer ses propres cartes** — les contrôles éditer/supprimer ne sont rendus que pour les cartes dont `authorParticipantId` correspond au `participantId` de l'appelant (fil transmis par le shell). Le backend **revérifie** indépendamment la propriété et rejette une mutation par un non-auteur avec `403` (le gating client n'est qu'ergonomique, pas une frontière de sécurité).
3. **Suppression en deux temps** (a11y — anti-suppression accidentelle) : `requestDelete` → confirmation/annulation explicite avant l'appel `DELETE`.
4. Un **animateur** peut catégoriser une carte (label) — broadcast `CARD_UPDATED`.
5. **Tableau temps réel** — grille responsive de cartes colorées, hydratée une fois via `GET .../brainstorm/cards` puis maintenue par `CARD_ADDED` / `CARD_UPDATED` / `CARD_REMOVED`.

### Sécurité & accessibilité

| Propriété | Mécanisme |
|-----------|-----------|
| XSS | Texte de carte + catégorie animateur rendus par interpolation `{{ }}` uniquement — jamais `innerHTML` |
| Propriété des cartes | Gate client (`authorParticipantId === participantId`) **+** revérification serveur `403` |
| Pas de `$any` | Template refs typées |
| Isolation tenant | Backend depuis le token — aucun `tenantId`/`userId` client |
| A11y | Sélecteur de couleur en groupe de boutons `aria-pressed` (initialement `role="radio"`, revu en `aria-pressed` par le balayage a11y #279) · tableau `aria-live` · cibles tactiles couleur 44 px · nom accessible contextualisé (texte de carte en param transloco) · suppression en deux temps |

## Contrat technique final

Endpoint racine : `${collaboratifApiUrl}/sessions/{sessionId}`.

| Verbe | Chemin | Rôle | Corps |
|-------|--------|------|-------|
| `GET` | `/brainstorm/cards` | participant | — → `BrainstormCard[]` |
| `POST` | `/brainstorm/cards` | participant | `{ text, color }` → `204` |
| `PATCH` | `/brainstorm/cards/{cardId}` | auteur | `{ text?, color? }` → `204` · non-auteur → `403` |
| `DELETE` | `/brainstorm/cards/{cardId}` | auteur | — → `204` · non-auteur → `403` |
| `POST` | `/brainstorm/cards/{cardId}/category` | animateur | `{ category }` → `204` |

### Broadcasts STOMP (`/topic/collaboratif/session/{sessionId}`)

| Événement | Charge utile | Effet client |
|-----------|--------------|--------------|
| `CARD_ADDED` | carte complète | ajout |
| `CARD_UPDATED` | carte complète | remplacement (édition auteur ou changement de catégorie animateur) |
| `CARD_REMOVED` | `{ cardId }` | retrait |

### `BrainstormCard`

```ts
{ id: string; text: string; color: 'YELLOW'|'PINK'|'BLUE'|'GREEN'|'ORANGE';
  authorParticipantId: string; category: string | null }
```

## Écarts vs ACs initiaux (outline Gate 1)

| AC outline | État | Note |
|-----------|------|------|
| Ajout post-it (texte, 5 couleurs) | ✅ | |
| Broadcast `CARD_ADDED` | ✅ | + `CARD_UPDATED` / `CARD_REMOVED` |
| Modifier/supprimer ses propres post-its | ✅ | gate client + `403` serveur |
| Animateur regroupe en catégories | ✅ | endpoint `.../category` |
| Grille responsive | ✅ | |
| XSS échappé | ✅ | interpolation only |
| Test modif carte d'un autre → `403` | ✅ | contrat backend + gate client testé |

**Précisions d'implémentation** : suppression en deux temps (a11y, non demandée à l'outline) ; `CARD_UPDATED` unifie l'édition par l'auteur et le changement de catégorie par l'animateur en un seul événement porteur de la carte complète.

## Gates

- **Gate 2** : 12 cas Vitest (ajout, édition/suppression author-gated, deux-temps + annulation, événements `CARD_*`, gating de propriété). Suite `collaboratif-ui` verte (1453 au figeage).
- **Gate 4** : convergence Autoloop, CI verte, squash-merge `main`. Merge humain final en attente.
