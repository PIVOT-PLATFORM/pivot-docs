# US19.3.1 — Activité QUIZ — quiz interactif réseau multijoueur

## Contexte

- **US** : [`us-quiz.md`](pathname:///pivot-docs/backlog/EPIC-module-session/FEATURES/activites/us-quiz) · Parent `F19.3` · Module `collaboratif` · Phase phase-3 · Sprint 22
- **PR** : `pivot-ui` [#278](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/278) — `Closes #277`
- **Commit figé** : `041ad7a` (`feat(ui): QUIZ activity participant view (US19.3.1) — all six activities now real (#278)`)
- **Portée du figeage** : vue participant **frontend** (`pivot-ui`, lib `collaboratif-ui`) + contrat REST/WS consommé. Producteur backend (`pivot-core`, `fr.pivot.collaboratif.session.quiz`) hors périmètre de session — contrat figé **tel que consommé**. Ce PR vide `PLACEHOLDER_TYPES` : **les six types d'activité (POLL, WORDCLOUD, QA, BRAINSTORM, VOTE, QUIZ) résolvent désormais un composant lazy-loadé réel**.
- **Gate 4 au figeage** : convergence Autoloop — CI verte (5 workflows), squash-mergé sur `main`. Recette humaine en attente.

## Spec fonctionnelle

### Ce que fait la fonctionnalité

Vue joueur d'un quiz multijoueur temps réel. **Le serveur est l'autorité d'horloge** — le client n'est jamais la source de vérité du timing.

1. **Question en cours** — l'animateur déclenche `POST .../quiz/next` → broadcast `QUESTION_STARTED` portant texte, options et durée (jamais la bonne réponse). Le joueur répond avant la fin du décompte affiché.
2. **Décompte** — compte à rebours dérivé d'un `interval(1000)` rxjs + signal, démonté à la destruction du composant. **Purement visuel** : la fenêtre de réponse fait autorité côté serveur — une réponse tardive est rejetée `409 QUESTION_CLOSED` (`submitError`), quel que soit l'état du décompte local.
3. **Scoring** — points si correct + **bonus rapidité décroissant selon le rang de soumission** (1ᵉ répondant = bonus max). Double réponse rejetée `409`.
4. **Révélation** — fin de fenêtre → `QUESTION_ENDED` : indices corrects révélés + leaderboard rafraîchi. La ligne du joueur courant est mise en évidence via le `participantId` transmis par le shell.
5. **Reconnexion** — un joueur déconnecté rejoint en cours : état hydraté une fois via `GET .../quiz/state` (question courante + son score), puis maintenu par `QUESTION_STARTED` / `QUIZ_ANSWERED` / `QUESTION_ENDED`.
6. **Résultats finaux** — `GET .../quiz/results` : classement complet + score par joueur.

### Sécurité & accessibilité

| Propriété | Mécanisme |
|-----------|-----------|
| Anti-triche timing | Bonne réponse jamais dans `QUESTION_STARTED` (révélée à `QUESTION_ENDED`) ; fenêtre de réponse tranchée serveur (`409 QUESTION_CLOSED`), le décompte client n'est qu'indicatif |
| Une réponse par question | Rejet serveur `409` |
| XSS | Question/options par interpolation `{{ }}` |
| Isolation tenant | Backend depuis le token |
| A11y | Le décompte par seconde **n'est pas** annoncé (évite le flooding lecteur d'écran) — une région assertive visuellement masquée annonce uniquement « temps écoulé » (`timeUp` computed, balayage a11y #279) · leaderboard `aria-live` |

## Contrat technique final

Endpoint racine : `${collaboratifApiUrl}/sessions/{sessionId}`.

| Verbe | Chemin | Rôle | Corps |
|-------|--------|------|-------|
| `POST` | `/quiz/next` | animateur | — → `204` |
| `POST` | `/quiz/end` | animateur | — → `204` |
| `POST` | `/quiz/answer` | joueur | `{ questionIndex, optionIndex(es) }` → `204` · tardif/2ᵉ → `409` |
| `GET` | `/quiz/state` | joueur | — → `QuizState` (reconnexion) |
| `GET` | `/quiz/results` | joueur/animateur | — → `QuizResults` |

### Broadcasts STOMP (`/topic/collaboratif/session/{sessionId}`)

| Événement | Charge utile | Effet client |
|-----------|--------------|--------------|
| `QUESTION_STARTED` | `{ index, text, options, durationSeconds, startedAt }` — **sans** bonne réponse | ouvre la question + décompte |
| `QUIZ_ANSWERED` | `{ count }` | compteur de réponses reçues |
| `QUESTION_ENDED` | `{ correctIndices, leaderboard }` | révèle correct + leaderboard |

## Écarts vs ACs initiaux (outline Gate 1)

| AC outline | État | Note |
|-----------|------|------|
| Questions (texte, 2–6 options, 1+ correctes, durée) | ✅ | config quiz |
| Salle multijoueur STOMP | ✅ | topic session partagé `/topic/collaboratif/session/{id}` (et non un topic `/quiz/{id}` dédié — voir précision) |
| `POST .../quiz/next` → `QUESTION_STARTED` | ✅ | |
| Réponse indépendante avant fin timer | ✅ | fenêtre serveur, `409` si tardif |
| Score + bonus rapidité par rang | ✅ | 1ᵉ = bonus max, décroissant |
| Fin timer → `QUESTION_ENDED` (correct + leaderboard) | ✅ | |
| Leaderboard temps réel | ✅ | |
| Résultats finaux (classement, score, taux) | ✅ | `GET .../quiz/results` |
| Reconnexion → état rechargé | ✅ | `GET .../quiz/state` |
| Test réponse tardive non comptée + bonus décroissant | ✅ | branches testées + contrat backend |

**Précision d'implémentation** : conformément à l'infra temps réel du module (US19.2.2), toutes les activités partagent **un seul** topic STOMP par session (`/topic/collaboratif/session/{id}`) différencié par le champ `type` de l'événement — l'outil `.../quiz/{sessionId}` de l'outline est réalisé par ce topic partagé, pas par une room dédiée.

## Gates

- **Gate 2** : 11 cas Vitest (question started/answer/late 409/double 409, décompte + démontage, reveal + leaderboard, hydratation state, résultats). Suite `collaboratif-ui` verte (1470 au figeage). Le test du fallback placeholder du shell est retiré (plus aucun type placeholder ; le cas POLL couvre la résolution lazy-load).
- **Gate 4** : convergence Autoloop, CI verte, squash-merge `main`. Merge humain final en attente.
