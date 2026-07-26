# US19.4.1 — Afficher les résultats de la session en temps réel (vue animateur)

**En tant que** animateur
**Je veux** voir les résultats de la session en temps réel depuis ma vue dédiée
**Afin de** animer la restitution avec l'audience

**Gate 1 réalisé le 2026-07-23** — remplace le stub outline précédent. Prolonge US19.3.1→US19.3.6.

**Correction de périmètre (Gate 1)** : le stub d'origine omettait `VOTE` (`US19.3.6`) de sa liste
de rendus et de ses dépendances — corrigé ici, cohérent avec `US19.1.1`/`US19.2.2`.

## Critères d'acceptation

### Vue animateur (backend + frontend)

| Critère | 🤖 Dev |
|---------|--------|
| Given une session accessible à l'animateur (créateur ou `ROLE_ADMIN`), when `GET .../sessions/{id}/results` (ou WS temps réel équivalent), then les résultats sont retournés dans une forme dépendant de `session.type` — voir lignes ci-dessous | ⬜ |
| Given `type: QUIZ`, when les résultats se rafraîchissent, then leaderboard live (classement + score) + histogramme des réponses par question déjà terminée | ⬜ |
| Given `type: POLL`, when affichés, then diagramme (camembert ou barres) avec % par option, mis à jour à chaque `POLL_UPDATED` | ⬜ |
| Given `type: WORDCLOUD`, when affichés, then le nuage final rendu en grande taille (même composant que la vue participant, réutilisé — pas dupliqué) | ⬜ |
| Given `type: BRAINSTORM`, when affichés, then les post-its groupés par catégorie (vue tableau) | ⬜ |
| Given `type: QA`, when affichés, then la liste des questions triée par votes avec le statut `ANSWERED`/`OPEN` visible | ⬜ |
| Given `type: VOTE`, when affichés, then le résultat structuré selon le sous-type (consensus FIST_TO_FIVE avec alerte veto, classement WEIGHTED, matrice MATRIX) | ⬜ |
| Given `POST .../sessions/{id}/results/projection-mode`, when activé, then un mode d'affichage plein écran optimisé projection est signalé au frontend (pas de logique métier serveur au-delà d'un flag d'état, le rendu plein écran est purement côté client) | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : `GET .../results` réservé au créateur/`ROLE_ADMIN` — un participant appelant cet endpoint reçoit 404 (mêmes vues que la vue participant standard restent accessibles via les endpoints propres à chaque activité) | ⬜ |
| Security : test TI obligatoire cross-tenant + participant non-animateur → 404 | ⬜ |

## Hors périmètre

- **Personnalisation du thème visuel de projection** — non spécifié.

## Notes d'implémentation

- **Backend** : `SessionResultsAggregatorService` — orchestre la lecture des résultats selon
  `session.type`, délègue à chaque service d'activité (`SessionQuizQueryService`/
  `SessionPollQueryService`/etc., un par type) plutôt que de dupliquer leur logique de calcul.
- **Frontend** : `session-results-view` — composant hôte chargeant le rendu adapté au type
  (réutilise autant que possible les composants de rendu déjà écrits pour la vue participant,
  ex. le nuage `WORDCLOUD`), mode projection (CSS plein écran, `document.fullscreenElement`).

---
Item Type: US · Parent: F19.4 · Module: collaboratif · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Rôle: animateur-facilitateur
Dépendances: US19.3.1, US19.3.2, US19.3.3, US19.3.4, US19.3.5, US19.3.6
