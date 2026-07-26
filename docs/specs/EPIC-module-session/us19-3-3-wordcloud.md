# US19.3.3 — Activité WORDCLOUD — nuage de mots collaboratif

## Contexte

- **US** : [`us-wordcloud.md`](pathname:///pivot-docs/backlog/EPIC-module-session/FEATURES/activites/us-wordcloud) · Parent `F19.3` · Module `collaboratif` · Phase phase-3 · Sprint 22
- **PR** : `pivot-ui` [#270](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/270) — Module Session live, PR1/2 (infra socle + POLL/WORDCLOUD)
- **Commit figé** : `8581c9d` (`feat(ui): Module Session live — PR1/2, core infra + POLL/WORDCLOUD (#270)`)
- **Portée du figeage** : vue participant **frontend** (`pivot-ui`, lib `collaboratif-ui`) + contrat REST/WS consommé. Producteur backend (`pivot-core`) hors périmètre de session — contrat figé **tel que consommé**.
- **Gate 4 au figeage** : convergence Autoloop, CI verte, squash-mergé sur `main`. Recette humaine en attente.

## Spec fonctionnelle

### Ce que fait la fonctionnalité

Vue participant d'un nuage de mots collaboratif.

1. **Soumettre un mot** — jusqu'à `maxWordsPerParticipant` mots (configurable). `POST .../wordcloud/words { word }` ; le mot est **normalisé et agrégé côté serveur** (retourne l'entrée `{ word, frequency }`).
2. **Nuage temps réel** — chaque ajout déclenche `WORD_ADDED` (entrée nichée sous `entry`) → le nuage se met à jour chez tous les participants. La suppression déclenche `WORD_REMOVED`.
3. **Taille proportionnelle** — la taille de police de chaque mot est **calculée côté client** proportionnellement à sa fréquence (`frequency`). Rendu **CSS pur, sans lib externe** (contrainte ADR-007).
4. **Filtre obscénités** — liste noire par tenant appliquée **côté serveur** (`blocklist` en config n'est qu'informatif côté client — le rejet fait autorité au backend).
5. **Modération** — l'animateur peut supprimer un mot entièrement (`DELETE .../wordcloud/words/{word}`) → `WORD_REMOVED`.

### Sécurité & accessibilité

| Propriété | Mécanisme |
|-----------|-----------|
| Filtre obscénités fiable | Blocklist appliquée **serveur** — jamais une frontière client |
| Agrégation | Normalisation + comptage serveur (le client ne dédoublonne pas) |
| XSS | Mots rendus par interpolation `{{ }}` |
| Isolation tenant | Backend depuis le token ; blocklist résolue par tenant côté serveur |
| A11y / rendu | Nuage CSS pur (pas de lib), taille de police dérivée de la fréquence |

## Contrat technique final

Endpoint racine : `${collaboratifApiUrl}/sessions/{sessionId}`.

| Verbe | Chemin | Rôle | Corps / réponse |
|-------|--------|------|-----------------|
| `POST` | `/wordcloud/words` | participant | `{ word: string }` → `WordEntry { word, frequency }` |
| `DELETE` | `/wordcloud/words/{word}` | animateur | `{word}` URL-encodé → `204` |

### Broadcasts STOMP (`/topic/collaboratif/session/{sessionId}`)

| Événement | Charge utile | Effet client |
|-----------|--------------|--------------|
| `WORD_ADDED` | `{ entry: { word, frequency } }` — niché sous `entry`, pas aplati | ajoute / met à jour la taille |
| `WORD_REMOVED` | `{ word }` | retire le mot du nuage |

### Types

```ts
WordcloudConfig   : { maxWordsPerParticipant: number; blocklist: string[] }
WordSubmitRequest : { word: string }
WordEntry         : { word: string; frequency: number }
```

## Écarts vs ACs initiaux (outline Gate 1)

| AC outline | État | Note |
|-----------|------|------|
| Soumettre 1–3 mots (config) · `POST .../wordcloud/words` | ✅ | `maxWordsPerParticipant` |
| Broadcast `WORD_ADDED` → nuage temps réel | ✅ | entrée nichée sous `entry` |
| Taille proportionnelle à la fréquence | ✅ | calcul client, CSS pur |
| Filtre obscénités (blocklist tenant) | ✅ | appliqué serveur |
| Rendu CSS sans lib externe | ✅ | conforme ADR-007 |
| Modération : animateur supprime un mot | ✅ | `DELETE` → `WORD_REMOVED` |
| Test même mot ×3 → taille triple · suppression → `WORD_REMOVED` | ✅ | agrégation serveur + broadcast (contrat + test) |

## Gates

- **Gate 2** : composant WORDCLOUD couvert en Vitest (soumission, `WORD_ADDED`/`WORD_REMOVED`, taille dérivée de la fréquence). Suite `collaboratif-ui` verte au figeage.
- **Gate 4** : convergence Autoloop, CI verte, squash-merge `main`. Merge humain final en attente.
