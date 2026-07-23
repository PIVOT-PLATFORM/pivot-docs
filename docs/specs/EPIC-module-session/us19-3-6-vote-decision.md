# US19.3.6 — Activité VOTE — prise de décision structurée (Fist-to-Five / pondéré / matrice)

## Contexte

- **US** : [`us-vote-decision.md`](pathname:///pivot-docs/backlog/EPIC-module-session/FEATURES/activites/us-vote-decision) · Parent `F19.3` · Module `collaboratif` · Phase phase-3 · Sprint 22
- **PR** : `pivot-ui` [#276](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/276) (Fist-to-Five + pondéré, `Closes #275`) puis [#280](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/280) (mode MATRICE, différé du PR initial)
- **Commits figés** : `e786086` (`feat(ui): VOTE activity participant view (US19.3.6) (#276)`) + `6e21016` (`feat(ui): VOTE — MATRIX mode … (#280)`)
- **Portée du figeage** : vue participant **frontend** (`pivot-ui`, lib `collaboratif-ui`) + contrat REST/WS consommé. Producteur backend (`pivot-core`, `fr.pivot.collaboratif.session.vote`) hors périmètre de session — contrat figé **tel que consommé**.
- **Gate 4 au figeage** : les deux PR ont convergé (CI verte 5 workflows), squash-mergées sur `main`. Recette humaine en attente.

## Spec fonctionnelle

### Ce que fait la fonctionnalité

Vue participant d'un vote de décision structuré (distinct d'un simple POLL). Trois modes, sélectionnés par la config de session (`voteType`) :

1. **`FIST_TO_FIVE`** — chaque participant note une proposition de `0` (poing fermé = veto) à `5` (accord total). Boutons de notation en groupe `aria-pressed`. Résultat après clôture : moyenne + niveau de consensus (`STRONG` ≥ 4 · `MODERATE` 3–4 · `WEAK` < 3) ; un `0` déclenche une **alerte veto** à l'animateur.
2. **`WEIGHTED`** — chaque participant répartit un budget de `pointsPerParticipant` points entre les options. L'envoi n'est possible que lorsque le budget restant atteint **exactement 0** ; un dépassement affiche une alerte over-budget. Résultat : total de points par option.
3. **`MATRIX`** — grille `options × critères pondérés`. Chaque cellule est une note `0..maxScore` (initialisée à zéro — une grille nulle est un bulletin valide), plafonnée à `maxScore`. Résultat : classement des options par **moyenne pondérée** (calculée côté backend), révélé en liste ordonnée.

**Un seul bulletin par participant** (rejet `409 ALREADY_VOTED`, ou `409 VOTE_CLOSED` après clôture). Le compteur de bulletins reçus est mis à jour en direct via `VOTE_SUBMITTED` (jamais la valeur du vote — seulement le décompte). Les tallies ne sont révélés qu'à la clôture par l'animateur (`VOTE_CLOSED`).

### Sécurité & accessibilité

| Propriété | Mécanisme |
|-----------|-----------|
| Secret du vote | `VOTE_SUBMITTED` ne porte **que** `ballotCount` — jamais la valeur ; tallies dévoilés uniquement à `VOTE_CLOSED` |
| Un vote par participant | Rejet serveur `409` (`ALREADY_VOTED` / `VOTE_CLOSED`) |
| XSS | Libellés options/critères par interpolation `{{ }}` |
| Isolation tenant | Backend depuis le token |
| A11y | Boutons de notation `role="group"` + `aria-pressed` · budget restant en `aria-live` + alerte over-budget · cellules de matrice `aria-label` « option — critère » · résultats `aria-live` |

## Contrat technique final

Endpoint racine : `${collaboratifApiUrl}/sessions/{sessionId}`.

| Verbe | Chemin | Rôle | Corps |
|-------|--------|------|-------|
| `POST` | `/vote/ballot` | participant | `SubmitBallotRequest` → `204` · 2ᵉ vote → `409` |
| `POST` | `/vote/close` | animateur | — → `204` |
| `GET` | `/vote/results` | participant/animateur | — → `VoteResults` |

### `SubmitBallotRequest` (un seul champ renseigné selon le mode)

```ts
{ value?: number;                     // FIST_TO_FIVE (0..5)
  allocations?: Record<string, number>; // WEIGHTED — clé = index option
  scores?: number[][] }               // MATRIX — [optionIndex][criterionIndex]
```

### `VoteResults`

```ts
{ voteType: 'FIST_TO_FIVE'|'WEIGHTED'|'MATRIX';
  closed: boolean; ballotCount: number;
  average: number | null;                 // FIST
  consensusLevel: 'STRONG'|'MODERATE'|'WEAK' | null; veto: boolean;
  options: { optionIndex: number; label: string; points: number }[];        // WEIGHTED
  matrix:  { optionIndex: number; label: string; score: number }[] }         // MATRIX (ordonné)
```

### Broadcasts STOMP (`/topic/collaboratif/session/{sessionId}`)

| Événement | Charge utile | Effet client |
|-----------|--------------|--------------|
| `VOTE_SUBMITTED` | `{ ballotCount }` | maj décompte (jamais la valeur) |
| `VOTE_CLOSED` | `{ results: VoteResults }` | révélation des tallies |

### Config de session (extrait)

```ts
FIST : { proposal }
WEIGHTED : { voteType:'WEIGHTED', options: string[], pointsPerParticipant }
MATRIX : { voteType:'MATRIX', options: string[], criteria: {label, weight}[], maxScore }
```

## Écarts vs ACs initiaux (outline Gate 1)

| AC outline | État | Note |
|-----------|------|------|
| 3 types : FIST / PONDÉRÉ / MATRICE | ✅ | MATRICE différée puis livrée par #280 |
| Fist-to-Five 0–5 sur proposition | ✅ | |
| Consensus FORT ≥ 4 / MOYEN 3–4 / FAIBLE < 3 | ✅ | `STRONG`/`MODERATE`/`WEAK` |
| Vote pondéré : répartition N points | ✅ | envoi gaté sur budget = 0 |
| Broadcast `VOTE_SUBMITTED` + résultats après clôture | ✅ | tallies masqués jusqu'à `VOTE_CLOSED` |
| Décision enregistrée (date/résultat/participants — audit) | ⚠️ backend | trail d'audit géré côté `pivot-core` — hors vue participant frontend |
| Alerte veto sur vote 0 | ✅ | flag `veto` + `role="alert"` |
| Test double vote → `409` | ✅ | branche d'erreur testée + contrat backend |

**Précisions d'implémentation** : mode MATRICE défini comme moyenne pondérée par option (ranking backend) ; une grille matrice toute à zéro est un bulletin valide (pas de contrainte « au moins une cellule > 0 »).

## Gates

- **Gate 2** : 8 cas Vitest au PR #276 (fist no-op/submit/erreur, weighted budget/allocations, événements, destroy) + 3 cas MATRICE au #280 (grille zéro, clamp maxScore, ranking révélé). Suite `collaboratif-ui` verte (1461 puis 1474 au figeage).
- **Gate 4** : les deux PR ont convergé, CI verte, squash-merge `main`. Merge humain final en attente.
