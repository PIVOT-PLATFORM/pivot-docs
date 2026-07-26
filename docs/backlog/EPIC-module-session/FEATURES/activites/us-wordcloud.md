# US19.3.3 — Activité WORDCLOUD — nuage de mots collaboratif

**En tant que** participant
**Je veux** soumettre des mots qui apparaissent instantanément dans un nuage collaboratif
**Afin de** faire émerger visuellement les idées collectives

**Gate 1 réalisé le 2026-07-23** — remplace le stub outline précédent. Prolonge US19.1.2/US19.2.2.

## Critères d'acceptation

### Soumission (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given une session `type: WORDCLOUD` `LIVE`, when un participant `POST .../sessions/{id}/wordcloud/words` avec `{ word }`, then le mot est normalisé (minuscules, espaces superflus retirés) et agrégé — un mot déjà soumis par n'importe quel participant incrémente sa fréquence plutôt que de créer une nouvelle entrée | ⬜ |
| Given `config.maxWordsPerParticipant` (défaut 3), when un participant tente de soumettre un mot supplémentaire au-delà de sa limite, then 409 code `WORD_LIMIT_REACHED` | ⬜ |
| Given un mot soumis, when accepté, then broadcast STOMP `WORD_ADDED` (mot normalisé, fréquence à jour) | ⬜ |
| Given `config.blocklist` (liste noire configurable au niveau tenant, réutilisable entre sessions), when un mot soumis y figure (comparaison normalisée), then 400 code `WORD_BLOCKED` — jamais persisté | ⬜ |
| Given `DELETE .../sessions/{id}/wordcloud/words/{word}` (animateur, modération), when appelé, then le mot est retiré entièrement (toutes occurrences), broadcast `WORD_REMOVED` | ⬜ |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| Error : given un mot vide ou > 30 caractères, when soumission, then 400 code `INVALID_WORD` | ⬜ |
| Error : given une session non `WORDCLOUD` ou non `LIVE`, when soumission, then 409 code `INVALID_SESSION_STATUS` | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : le mot est échappé à l'affichage (`textContent`, jamais `innerHTML`) — même exigence XSS que `US19.3.4` | ⬜ |
| Security : test TI obligatoire : filtre liste noire · limite par participant · suppression réservée à l'animateur (404 sinon) | ⬜ |

## Hors périmètre

- **Détection de synonymes/racines communes** (ex. « rapide »/« rapidité » fusionnés) — comparaison texte normalisé exact uniquement.

## Notes d'implémentation

- **Backend** : `fr.pivot.collaboratif.session.wordcloud` — `SessionWordcloudEntry` (FK
  `sessionId`, mot normalisé, `frequency`, unique `(sessionId, word)`), liste noire au niveau
  tenant réutilisée entre sessions (`TenantWordBlocklist` ou table dédiée — à trancher en
  implémentation selon si une table de config tenant générique existe déjà ailleurs dans
  `collaboratif`, sinon nouvelle table simple). `SessionWordcloudService`.
- **Frontend** : `session-activity-wordcloud` — rendu nuage en **CSS pur** (taille de police
  proportionnelle à la fréquence, calcul côté client), **aucune librairie tierce** (ADR-007).

---
Item Type: US · Parent: F19.3 · Module: collaboratif · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: utilisateur-final
Dépendances: US19.1.2
