# EN38.2 — Moteur IA & graphe d'innovation (gouverné)

**Type d'enabler** : architecture · IA

**Objectif technique** : Le socle des fonctionnalités innovantes du SMI :
- **Embeddings & similarité sémantique** : clustering d'idées, détection de doublons, ponts entre idées ressemblantes (F38.11.2), combinaison (F38.14.3).
- **LLM gouverné** : assistant d'idéation, résumés, pré-évaluation, recommandations — **humain dans la boucle**, sorties révisables.
- **Graphe de connaissance** (idées ↔ brevets ↔ projets ↔ personnes ↔ tendances) + **moteur de sérendipité** et **matchmaking** (F38.11.5, F38.12, F38.14.2).
- **Signaux & prédiction** : fail-fast assisté (F38.11.4), momentum, marché de prédiction (F38.14.1).

**Gouvernance IA (doctrine suite)** : appels **tracés**, **non-entraînement** sur les données, **option modèle souverain/local**, minimisation RGPD, surveillance des biais, **désactivable par l'administrateur**, conformité **AI Act** (explicabilité, contrôle humain).

**Critères de complétion** :
- [ ] Service d'embeddings + similarité (clustering, doublons, ponts)
- [ ] Intégration LLM gouvernée (traçabilité, non-entraînement, souverain en option, désactivable)
- [ ] Graphe de connaissance + moteur de sérendipité + matchmaking
- [ ] Détection de signaux (fail-fast, momentum) et marché de prédiction
- [ ] Conformité RGPD/AI Act (explicabilité, humain dans la boucle, non-biais)

---
Item Type: Enabler · Parent: E38 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: High
Stage: ⬜
Profils: Grand groupe, Publique, État
Justification: Socle IA & graphe gouverné pour les fonctionnalités innovantes du SMI
Dépendances: EN38.1 (modèle SMI) · gouvernance IA suite (cf. BL-028 / WF-020 / PP-031)
