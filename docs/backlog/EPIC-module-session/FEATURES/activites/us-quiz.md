# US19.3.1 — Activité QUIZ — quiz interactif réseau multijoueur

**En tant que** animateur
**Je veux** lancer un quiz interactif multijoueur en temps réel (réseau)
**Afin de** tester les connaissances du groupe avec scoring et classement live

**Gate 1 réalisé le 2026-07-23** — remplace le stub outline précédent. Prolonge US19.1.2/US19.2.2.

**Architecture — pas de couplage avec le module whiteboard (Gate 1 — décision PO/Architecte)** :
`fr.pivot.collaboratif.whiteboard.quiz` porte déjà un quiz réel, mergé et testé — mais **couplé au
tableau blanc** (`QuizSession.boardId`, FK dure vers `board`, `QuizStatus`/`QuestionState{OPEN,
REVEALED}` piloté manuellement par le facilitateur sans minuteur — MVP « Quiz QCM animé », voir sa
propre JavaDoc). Une session `E19` n'est **pas** un board — la coupler à `board_id` serait une
erreur d'architecture (deux concepts distincts artificiellement fusionnés). **Décision retenue** :
le quiz `E19` **s'inspire de la forme éprouvée** (entités question/choix/réponse, état de question,
index unique partiel « une seule session active ») mais reconstruit avec `session_id` comme clé
étrangère réelle, **jamais** `board_id`, aucune dépendance de code vers `fr.pivot.collaboratif.
whiteboard.quiz`. Différence fonctionnelle majeure assumée : l'AC ci-dessous exige un **minuteur
par question avec fin automatique et bonus de rapidité** (le MVP whiteboard n'a ni minuteur ni
score — piloté manuellement, sans classement) — les deux implémentations divergent donc aussi
fonctionnellement, pas seulement par leur clé étrangère. Une consolidation future des deux moteurs
quiz (whiteboard + session) en une bibliothèque partagée est un candidat v2 plausible, **non
tenté ici** — noté pour plus tard, pas ignoré silencieusement.

## Critères d'acceptation

### Configuration (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given une session `type: QUIZ` en `DRAFT`, when sa `config` est définie/mise à jour (`PUT .../sessions/{id}/quiz/questions`), then elle porte une liste ordonnée de questions, chacune : texte, 2 à 6 options, 1 ou plusieurs bonnes réponses, durée (secondes, 5–120), points de base (défaut 1000) | ⬜ |

### Déroulement (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given une session `QUIZ` `LIVE`, when `POST .../sessions/{id}/quiz/next`, then la question suivante démarre (`currentQuestionIndex` incrémenté, `speakingAt`-style `questionStartedAt` = maintenant), broadcast STOMP `QUESTION_STARTED` (texte, options, durée — **jamais la bonne réponse**) sur `/topic/collaboratif/session/{id}` | ⬜ |
| Given une question en cours, when un participant `POST .../sessions/{id}/quiz/answer` avec `{ questionIndex, selectedOptions }` avant l'expiration du minuteur, then sa réponse est enregistrée avec son rang de soumission (1er, 2e, …) — une seule réponse acceptée par participant par question (soumission suivante → 409) | ⬜ |
| Given l'expiration du minuteur de la question (`questionStartedAt + durée`, scheduler périodique — même précédent que `StandupTimerScheduler`, horloge injectable, jamais `Instant.now()` en dur), when elle est détectée, then transition automatique identique à une fin manuelle : réponse correcte révélée, scores mis à jour, broadcast `QUESTION_ENDED` (réponse correcte + classement) | ⬜ |
| Given le calcul du score d'une réponse correcte, when il est appliqué, then il vaut `points de base × facteur de rapidité` — facteur décroissant linéairement de 1.0 (1er à répondre) vers un plancher configurable (défaut 0.5) selon le rang de soumission parmi les réponses correctes de cette question ; une réponse incorrecte ou absente vaut 0 | ⬜ |
| Given la dernière question terminée, when `QUESTION_ENDED` est traité côté serveur, then la session passe automatiquement à `COMPLETED` (même transition qu'`US19.1.2#end`) plutôt que d'attendre une action manuelle de l'animateur | ⬜ |
| Given un participant qui se reconnecte en cours de question, when il recharge l'état (`GET .../sessions/{id}/quiz/current`), then il reçoit la question en cours (sans la bonne réponse tant qu'elle n'est pas révélée), son score courant, et s'il a déjà répondu | ⬜ |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| Error : given une réponse soumise après expiration du minuteur (course serveur/réseau), when reçue, then 409 code `QUESTION_CLOSED` — jamais comptabilisée | ⬜ |
| Error : given une session non `QUIZ` ou non `LIVE`, when `next`/`answer`, then 409 code `INVALID_SESSION_STATUS` | ⬜ |
| Error : given `questionIndex` ne correspondant pas à la question courante, when réponse soumise, then 400 code `INVALID_QUESTION_INDEX` | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : la bonne réponse n'est **jamais** incluse dans le payload `QUESTION_STARTED` ni dans `GET .../quiz/current` avant révélation — vérifié par test dédié (pas seulement absent de la doc, absent du JSON réel) | ⬜ |
| Security : test TI obligatoire prouvant le bonus de rapidité décroissant selon l'ordre de soumission (3 participants, ordre de réponse contrôlé) | ⬜ |
| Security : test TI obligatoire : minuteur expiré déclenche l'auto-avancement, une réponse tardive concurrente ne double-compte jamais | ⬜ |

## Hors périmètre

- **Questions à réponse libre (non QCM)** — non spécifié, QCM uniquement.
- **Import de banque de questions externe** — non spécifié.

## Notes d'implémentation

- **Backend** : `fr.pivot.collaboratif.session.quiz` (package dédié, **aucune dépendance vers
  `fr.pivot.collaboratif.whiteboard.quiz`**) — entités `SessionQuizQuestion`/`SessionQuizChoice`/
  `SessionQuizAnswer` (FK `sessionId`, jamais `boardId`), `QuizScoreCalculator` (fonction pure —
  facteur de rapidité, testable en isolation, même approche que `CapacityVelocityForecastCalculator`).
  `SessionQuizTimerScheduler` (poll périodique, horloge injectable, calque de
  `StandupTimerScheduler`) partage la transition interne avec le déclenchement manuel via `next`
  (même principe que `RetroPhaseScheduler`/`StandupTimerScheduler` — pas de logique dupliquée entre
  bouton manuel et scheduler). Diffusion via `SessionDestinations` (`EN19.2`, posé en `US19.1.2`).
- **Frontend** : `session-activity-quiz` (vue participant : question + minuteur visuel + soumission),
  minuteur circulaire réutilisant l'approche `standup-timer`/`pi-dependency-layer` (dérivé client,
  pas de tick serveur) pour l'affichage, bien que l'expiration réelle reste arbitrée côté serveur.

---
Item Type: US · Parent: F19.3 · Module: collaboratif · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Rôle: animateur-facilitateur
Dépendances: US19.1.2
