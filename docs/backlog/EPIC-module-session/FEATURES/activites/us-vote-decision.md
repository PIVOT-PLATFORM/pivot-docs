# US19.3.6 — Activité VOTE — prise de décision structurée (Fist-to-Five / pondéré)

**En tant que** animateur
**Je veux** organiser un vote de décision structuré (distinct d'un simple sondage)
**Afin d'** obtenir un consensus ou une décision d'équipe traçable

**Gate 1 réalisé le 2026-07-23** — remplace le stub outline précédent. Prolonge US19.1.2/US19.2.2.

**Architecture — pas de couplage avec le module whiteboard (Gate 1 — décision PO/Architecte)** :
même situation que `US19.3.1` (QUIZ) — `fr.pivot.collaboratif.whiteboard.vote` existe déjà
(`VoteSession` FK dure `boardId`) mais reste un vote whiteboard simple, sans les trois sous-types
structurés exigés ici (FIST_TO_FIVE / PONDÉRÉ / MATRICE) ni le trail d'audit décisionnel. Même
décision que `US19.3.1` : nouvelle implémentation `session_id`-scopée, **aucune** dépendance vers
`fr.pivot.collaboratif.whiteboard.vote`, la forme éprouvée (session de vote + clôture par
l'animateur + diffusion résultat) sert d'inspiration, pas de code partagé. Consolidation future
notée, non tentée ici (voir `US19.3.1` §Architecture).

## Critères d'acceptation

### Configuration et types de vote (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given une session `type: VOTE`, when sa `config` est définie, then elle porte un `voteType` ∈ `{FIST_TO_FIVE, WEIGHTED, MATRIX}` et une proposition (texte) | ⬜ |
| Given `voteType: WEIGHTED`, when la config est définie, then elle porte en plus une liste d'options et `pointsPerParticipant` (nombre de points à répartir) | ⬜ |
| Given `voteType: MATRIX`, when la config est définie, then elle porte une liste de critères et une liste d'options (matrice critères × options) | ⬜ |

### Soumission (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given `voteType: FIST_TO_FIVE`, when un participant `POST .../sessions/{id}/vote/submit` avec `{ score }` (0–5 entier), then son vote est enregistré — un seul vote par participant, soumission suivante → 409 | ⬜ |
| Given `voteType: WEIGHTED`, when soumission avec `{ allocations: [{ optionId, points }] }`, then validé : somme des points = `pointsPerParticipant`, chaque `points ≥ 0` | ⬜ |
| Given `voteType: MATRIX`, when soumission avec `{ scores: [{ criterionId, optionId, score }] }` (une note par cellule critère×option, échelle 0–5), then toutes les cellules doivent être renseignées pour que la soumission soit acceptée (soumission partielle refusée) | ⬜ |
| Given `POST .../sessions/{id}/vote/close` (animateur), when appelé, then plus aucun vote accepté, résultats calculés et figés, broadcast STOMP `VOTE_CLOSED` avec les résultats | ⬜ |
| Given `voteType: FIST_TO_FIVE` clôturé, when les résultats sont calculés, then `consensusScore` = moyenne des votes, `consensusLevel` = `FORT` (≥4) / `MOYEN` (3 à <4) / `FAIBLE` (<3) ; si au moins un vote = 0, then `vetoDetected: true` et la liste des participants ayant voté 0 est incluse **pour l'animateur uniquement** (jamais diffusée aux autres participants) | ⬜ |
| Given `voteType: WEIGHTED` clôturé, when les résultats sont calculés, then le total de points par option est agrégé et classé | ⬜ |
| Given `voteType: MATRIX` clôturé, when les résultats sont calculés, then un score moyen par (critère, option) et un score total par option (somme ou moyenne pondérée simple des critères) sont fournis | ⬜ |
| Given un vote clôturé, when les résultats sont persistés, then une entrée d'audit (`date`, `voteType`, `résultat`, `nombre de participants ayant voté`) est conservée indéfiniment, consultable même après suppression éventuelle de la session (voir Hors périmètre — pas de suppression de session dans ce socle, mais l'audit est pensé pour survivre) | ⬜ |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| Error : given `score` hors `[0,5]` (FIST_TO_FIVE), when soumission, then 400 code `INVALID_VOTE_SCORE` | ⬜ |
| Error : given la somme des `allocations` ≠ `pointsPerParticipant` (WEIGHTED), when soumission, then 400 code `INVALID_ALLOCATION_TOTAL` | ⬜ |
| Error : given une cellule manquante (MATRIX), when soumission, then 400 code `INCOMPLETE_MATRIX_VOTE` | ⬜ |
| Error : given une soumission après clôture, when tentée, then 409 code `VOTE_CLOSED` | ⬜ |
| Error : given un vote soumis deux fois par le même participant (tout type), when tenté, then 409 code `ALREADY_VOTED` | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : la liste nominative des votes « veto » (score 0) n'est incluse que dans la réponse à l'**animateur** (`resolveSessionForOwnerOrAdmin`) — un participant ou une réponse générique ne l'expose jamais | ⬜ |
| Security : test TI obligatoire par sous-type (FIST_TO_FIVE/WEIGHTED/MATRIX) : soumission valide, double soumission → 409, soumission après clôture → 409 | ⬜ |
| Security : test TI obligatoire cross-tenant sur soumission et clôture | ⬜ |

## Hors périmètre

- **Modification d'un vote après soumission** — non spécifié, un vote soumis est définitif jusqu'à
  clôture (pas de « je change d'avis » contrairement à `US19.3.2` POLL).
- **Suppression d'une session avec vote clôturé** — hors périmètre de cette US ; si une US
  ultérieure ajoute la suppression de session, l'audit trail du vote devra être préservé ou
  explicitement traité à ce moment-là, non résolu ici.

## Notes d'implémentation

- **Backend** : `fr.pivot.collaboratif.session.vote` (**aucune** dépendance vers
  `fr.pivot.collaboratif.whiteboard.vote`) — `SessionVote` (FK `sessionId`, `participantId`,
  `voteType`, payload JSONB dont la forme dépend du type — `score` / `allocations` / `scores`),
  `SessionVoteResultCalculator` (fonction pure par sous-type, testable en isolation : moyenne +
  niveau de consensus FIST_TO_FIVE, agrégation WEIGHTED, moyenne par cellule MATRIX).
  `SessionVoteAuditEntry` (table séparée, indépendante du cycle de vie de `Session`/`SessionVote`
  pour permettre une survie même si une future US ajoute la suppression). `SessionVoteService`.
- **Frontend** : `session-activity-vote` — trois sous-vues selon `voteType` (poing levé 0-5 avec
  emoji/icône par niveau, répartition de points par glisser ou champ numérique, grille matrice),
  vue résultats avec badge de consensus (texte + icône, jamais la seule couleur — cohérent A11y).

---
Item Type: US · Parent: F19.3 · Module: collaboratif · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Rôle: animateur-facilitateur
Dépendances: US19.1.2
