# US19.4.1 — Vue résultats temps réel (animateur)

## Contexte

- **US** : [`us-resultats-temps-reel.md`](pathname:///pivot-docs/backlog/EPIC-module-session/FEATURES/resultats/us-resultats-temps-reel) · Parent `F19.4` · Module `collaboratif` · Phase phase-3 · Sprint 22
- **PR** : `pivot-ui` [#282](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/282) — `Closes #281`
- **Commit figé** : `76cfba8` (`feat(ui): facilitator real-time results view (US19.4.1)`) — figeage **pré-merge** (convergence Autoloop / CI verte), conforme au Gate 5 (voir [specs/README](pathname:///pivot-docs/specs/)).
- **Portée du figeage** : vue animateur **frontend** (`pivot-ui`, lib `collaboratif-ui`) + contrat REST/WS consommé. Producteur backend (`pivot-core`, `fr.pivot.collaboratif.session.*`) hors périmètre de session — contrat figé **tel que consommé**.
- **Gate 4 au figeage** : convergence Autoloop, CI verte (5 workflows). Recette humaine en attente.

## Spec fonctionnelle

### Ce que fait la fonctionnalité

Vue de restitution des résultats destinée à l'animateur — le pendant, côté facilitateur, du shell
participant (US19.2.2). Remplace le placeholder de résultats différé au PR1 (#270). Ce PR est le
**PR2/2** du module : après lui, le module Session live est fonctionnellement complet côté frontend.

1. **Chargement** — la vue charge la session **autoritaire animateur** (`GET /sessions/{id}`), en
   déduit le `type` et le `status`, puis hydrate un **snapshot par type** depuis les lectures REST.
2. **Temps réel** — tant que la session est `LIVE`/`PAUSED`, la vue s'abonne au **topic STOMP
   partagé** de la session (`/topic/collaboratif/session/{id}`) — le même que les participants,
   différencié par le champ `type` de chaque événement — et met à jour l'affichage en direct. Une
   session `COMPLETED` affiche un **snapshot figé, sans connexion WS**.
3. **Rendu par type d'activité** :
   - **POLL** — barres horizontales avec pourcentage par option (l'animateur voit toujours les tallies).
   - **WORDCLOUD** — nuage dont la taille de police est proportionnelle à la fréquence (rendu CSS pur).
   - **Q&A** — questions triées votes décroissants (ancienneté en tie-break) + badge « Répondu ».
   - **BRAINSTORM** — post-its groupés par catégorie (catégories alphabétiques, « sans catégorie » en dernier).
   - **VOTE** — restitution selon le mode : Fist (moyenne + consensus + alerte veto), pondéré (points/option), matrice (classement).
   - **QUIZ** — leaderboard (re-trié par score) + taux de bonnes réponses par question (barres).
4. **Mode projection** — un bouton (`aria-pressed`) agrandit l'affichage pour un écran partagé.

Chaque hydratation de snapshot **dégrade gracieusement** (liste vide) si la lecture REST échoue,
puis se peuple via le WS — jamais d'erreur bloquante. Un échec de chargement de la session
(non-propriétaire → `404` anti-énumération) affiche un message neutre, sans retry.

### Sécurité & accessibilité

| Propriété | Mécanisme |
|-----------|-----------|
| XSS | Tous les contenus (libellés, mots, questions, cartes, noms) rendus par interpolation `{{ }}` — jamais `innerHTML` |
| Isolation tenant | Résolue backend depuis le token porteur — aucun `tenantId`/`userId` client |
| Autorité animateur | `GET /sessions/{id}` (autoritaire) réservé au créateur / `ROLE_ADMIN` côté serveur ; `404` anti-énumération pour un non-propriétaire |
| Nettoyage | Abonnement WS et connexion STOMP démontés à la destruction du composant |
| A11y | Corps des résultats en `aria-live="polite"` · toggle projection `aria-pressed` · barres décoratives `aria-hidden` + valeurs textuelles · fréquence WORDCLOUD annoncée en texte visuellement masqué (la taille de police seule n'est pas perceptible au lecteur d'écran) |

## Contrat technique final

Endpoint racine : `${collaboratifApiUrl}/sessions/{sessionId}`. La vue **ne mute jamais** la session.

| Verbe | Chemin | Rôle | Réponse | Statut |
|-------|--------|------|---------|--------|
| `GET` | `/sessions/{id}` | animateur | `SessionResponse` | existant (US19.1.1) |
| `GET` | `/poll/results` | animateur | `PollOptionResult[]` | **ajouté (US19.4.1)** |
| `GET` | `/wordcloud/words` | animateur | `WordEntry[]` | **ajouté (US19.4.1)** |
| `GET` | `/qa/questions` | animateur | `QaQuestion[]` | existant (US19.3.5) |
| `GET` | `/brainstorm/cards` | animateur | `BrainstormCard[]` | existant (US19.3.4) |
| `GET` | `/vote/results` | animateur | `VoteResults` | existant (US19.3.6) |
| `GET` | `/quiz/results` | animateur | `QuizResults` | existant (US19.3.1) |

> **Endpoints ajoutés** : `getPollResults` et `listWordcloudWords` sont des lectures **additives**
> pour l'animateur — POLL et WORDCLOUD sont *event-sourced* côté participant (aucun snapshot GET
> auparavant), donc la vue résultats a besoin de ces lectures pour s'hydrater à l'ouverture en cours
> de session. Additif : aucun changement de contrat sur les endpoints existants.

### Événements STOMP consommés (`/topic/collaboratif/session/{id}`)

`POLL_UPDATED` · `WORD_ADDED` / `WORD_REMOVED` · `QUESTION_ADDED` / `QUESTION_UPVOTED` /
`QUESTION_ANSWERED` · `CARD_ADDED` / `CARD_UPDATED` / `CARD_REMOVED` · `VOTE_CLOSED` ·
`QUESTION_ENDED` · `SESSION_PAUSED` / `SESSION_RESUMED` / `SESSION_ENDED` (transition de statut).

## Écarts vs ACs initiaux (outline Gate 1)

| AC outline | État | Note |
|-----------|------|------|
| Vue animateur temps réel via STOMP | ✅ | topic partagé, connexion ouverte seulement en `LIVE`/`PAUSED` |
| QUIZ : leaderboard live + histogramme réponses/question | ✅ | leaderboard + taux de bonnes réponses par question (barres) |
| POLL : % par option | ✅ | barres horizontales (camembert non retenu — cohérence design system SCSS) |
| WORDCLOUD : nuage final grande taille | ✅ | + mode projection |
| BRAINSTORM : post-its groupés par catégorie | ✅ | |
| Q&A : questions triées votes + statut `ANSWERED` | ✅ | |
| Bascule grand écran (projection) | ✅ | toggle `aria-pressed` |

**Précisions d'implémentation** : POLL rendu en **barres** (et non camembert) — cohérence avec le
design system SCSS custom (aucune lib de graphes, ADR-007). VOTE, non listé à l'outline mais partie
intégrante de la restitution, est inclus (les trois modes). Snapshot figé sans WS pour une session
`COMPLETED` (précision non spécifiée à l'outline).

## Gates

- **Gate 2** : 11 cas Vitest (hydratation + live-update des 6 types, mode projection, pas de WS si `COMPLETED`, `loadError` sans id / `404`, démontage). Suite `collaboratif-ui` verte (1484 au figeage) ; le placeholder de résultats et son test sont supprimés.
- **Gate 4** : convergence Autoloop, CI verte, aucune nouvelle alerte de budget SCSS issue de ce diff. Merge humain final en attente.
