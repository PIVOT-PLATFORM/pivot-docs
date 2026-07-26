# US19.3.2 — Activité POLL — sondage instantané avec résultats temps réel

## Contexte

- **US** : [`us-poll.md`](pathname:///pivot-docs/backlog/EPIC-module-session/FEATURES/activites/us-poll) · Parent `F19.3` · Module `collaboratif` · Phase phase-3 · Sprint 22
- **PR** : `pivot-ui` [#270](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/270) — Module Session live, PR1/2 (infra socle + POLL/WORDCLOUD)
- **Commit figé** : `8581c9d` (`feat(ui): Module Session live — PR1/2, core infra + POLL/WORDCLOUD (#270)`)
- **Portée du figeage** : vue participant **frontend** (`pivot-ui`, lib `collaboratif-ui`) + contrat REST/WS consommé. Producteur backend (`pivot-core`) hors périmètre de session — contrat figé **tel que consommé**. La révision a11y de POLL (barre visuelle proportionnelle + résultats en `aria-live`) est arrivée par le balayage #279 (`8c8c963`).
- **Gate 4 au figeage** : convergence Autoloop, CI verte, squash-mergé sur `main`. Recette humaine en attente.

## Spec fonctionnelle

### Ce que fait la fonctionnalité

Vue participant d'un sondage instantané.

1. **Voter** — question + 2 à 8 options, choix unique ou multiple selon `allowMultiple`. `POST .../poll/vote { optionIds }`.
2. **Changer son vote** — tant que le POLL est ouvert, un re-vote remplace le précédent (le compteur se met à jour).
3. **Résultats temps réel** — chaque vote déclenche `POLL_UPDATED` portant les tallies par option ; le pourcentage se met à jour en direct chez les participants **et** l'animateur.
4. **Masquage animateur** — l'animateur peut masquer/afficher les résultats en cours de vote (`hide-results` / `show-results`). Quand ils sont masqués, `POLL_UPDATED` **omet `count`/`percent` par entrée** (jamais le tableau entier, jamais `null`) : le participant voit les libellés d'options sans les tallies. Le respect du masquage est **serveur** — le client ne reçoit tout simplement pas les chiffres.

### Sécurité & accessibilité

| Propriété | Mécanisme |
|-----------|-----------|
| Masquage fiable | Résultats masqués → tallies **absents de la charge utile** serveur (pas un simple `display:none` client) |
| XSS | Question / libellés d'options par interpolation `{{ }}` |
| Isolation tenant | Backend depuis le token |
| A11y (#279) | Résultats dans une région `aria-live` + barre visuelle proportionnelle derrière chaque option (auparavant texte-% seul) |

## Contrat technique final

Endpoint racine : `${collaboratifApiUrl}/sessions/{sessionId}`.

| Verbe | Chemin | Rôle | Corps |
|-------|--------|------|-------|
| `POST` | `/poll/vote` | participant | `{ optionIds: string[] }` → `204` |
| `POST` | `/poll/hide-results` | animateur | — → `204` |
| `POST` | `/poll/show-results` | animateur | — → `204` |

### Broadcast STOMP (`/topic/collaboratif/session/{sessionId}`)

| Événement | Charge utile | Effet client |
|-----------|--------------|--------------|
| `POLL_UPDATED` | `{ results: PollOptionResult[] }` | maj tallies (ou libellés seuls si masqués) |

### Types

```ts
PollConfig       : { question: string; options: { id; label }[]; allowMultiple: boolean }
PollVoteRequest  : { optionIds: string[] }
PollOptionResult : { optionId: string; label: string; count?: number; percent?: number }
//                   count/percent ABSENTS (undefined) quand l'animateur masque — jamais null
```

## Écarts vs ACs initiaux (outline Gate 1)

| AC outline | État | Note |
|-----------|------|------|
| Question + 2–8 options · unique/multiple | ✅ | `allowMultiple` |
| Résultats % temps réel (animateur + participants) | ✅ | `POLL_UPDATED` |
| Masquage résultats en cours | ✅ | `count`/`percent` omis côté serveur |
| Re-vote tant que POLL ouvert | ✅ | |
| Event `POLL_UPDATED` à chaque vote | ✅ | |
| Test re-vote / résultats masqués non broadcastés | ✅ | tallies absents de la charge (contrat + test) |

## Gates

- **Gate 2** : composant POLL couvert en Vitest (vote unique/multiple, re-vote, `POLL_UPDATED`, masquage → tallies absents). Suite `collaboratif-ui` verte au figeage.
- **Gate 4** : convergence Autoloop, CI verte, squash-merge `main`. Merge humain final en attente.
