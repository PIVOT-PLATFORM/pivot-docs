# US19.1.2 — Démarrer, mettre en pause et terminer une session live

## Contexte

- **US** : [`us-gerer-session.md`](pathname:///pivot-docs/backlog/EPIC-module-session/FEATURES/creation/us-gerer-session) · Parent `F19.1` · Module `collaboratif` · Phase phase-3 · Sprint 22
- **PR** : `pivot-ui` [#270](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/270) (vue runner) · fiabilisation course de poll dans [#289](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/289)
- **Commit figé** : `8581c9d` (`feat(ui): Module Session live — PR1/2 … (#270)`), état de fiabilité au commit `afd5a52` (#289)
- **Portée du figeage** : vue de contrôle animateur **frontend** (`pivot-ui`, `session-runner`) + contrat REST/WS consommé. Producteur backend (`pivot-core`) hors périmètre — contrat figé **tel que consommé**.
- **Gate 4 au figeage** : convergence Autoloop, CI verte. Recette humaine en attente.

## Spec fonctionnelle

### Ce que fait la fonctionnalité

`session-runner` — vue de contrôle du cycle de vie par l'animateur : **Démarrer / Pause / Reprendre /
Terminer**, avec les boutons conditionnés au statut courant (`Démarrer` si `DRAFT`, `Pause` si `LIVE`,
`Reprendre` si `PAUSED`, `Terminer` si `LIVE`/`PAUSED`). Chaque transition est un `POST` renvoyant la
session mise à jour ; un broadcast STOMP notifie les participants.

La vue rafraîchit son propre état par un **poll léger (5 s)** de `GET /sessions/{id}` (pour refléter
p. ex. le nombre de participants) sans ouvrir de connexion STOMP — le temps réel participant est porté
par le shell (US19.2.2). **Fiabilité (#289)** : un compteur de génération est incrémenté à chaque
action réussie, et un résultat de poll dont la requête précède la dernière action est **ignoré** —
sinon un poll lent pouvait réécrire le statut fraîchement transité et faire réapparaître le mauvais bouton.

### Sécurité

| Propriété | Mécanisme |
|-----------|-----------|
| Autorité animateur | Seul le créateur / `ROLE_ADMIN` peut transiter ; un non-propriétaire reçoit `404` de chaque endpoint (anti-énumération), surfacé en état « non autorisé » générique |
| Transitions invalides | Rejetées serveur (`409`), surfacées en `actionError` |
| Isolation tenant | Backend depuis le token |

## Contrat technique final

| Verbe | Chemin | Effet | Broadcast |
|-------|--------|-------|-----------|
| `POST` | `/sessions/{id}/start` | `DRAFT → LIVE` | `SESSION_STARTED` (session complète) |
| `POST` | `/sessions/{id}/pause` | `LIVE → PAUSED` | `SESSION_PAUSED` |
| `POST` | `/sessions/{id}/resume` | `PAUSED → LIVE` | `SESSION_RESUMED` |
| `POST` | `/sessions/{id}/end` | `→ COMPLETED` (résultats figés) | `SESSION_ENDED` |

Réponse : `SessionResponse`. Transition invalide → `409`. Événements de cycle de vie (hors
`SESSION_STARTED` qui porte la session complète) : `{ sessionId }`.

## Écarts vs ACs initiaux (outline Gate 1)

| AC outline | État | Note |
|-----------|------|------|
| start/pause/resume/end → broadcasts `SESSION_*` | ✅ | |
| `end` → `COMPLETED` + résultats figés | ✅ | |
| Animateur seul (propriétaire/`ROLE_ADMIN`) | ✅ | `404` anti-énumération pour un non-propriétaire |
| Test : transition invalide → `409` | ✅ | contrat backend + `actionError` client |

**Précision d'implémentation** : la vue runner utilise un poll REST (5 s) plutôt qu'une connexion
STOMP propre — l'affichage participant en pause/reprise passe par le shell (US19.2.2).

## Gates

- **Gate 2** : `session-runner` couvert en Vitest (transitions, gating par statut, erreur d'action). Suite `collaboratif-ui` verte.
- **Gate 4** : convergence Autoloop, CI verte, squash-merge `main`. Merge humain final en attente.
