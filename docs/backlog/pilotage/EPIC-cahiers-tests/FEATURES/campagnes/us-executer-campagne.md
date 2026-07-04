# US13.2.2 — Exécuter une campagne de test (guided mode)

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** testeur
**Je veux** exécuter les cas de test d'une campagne étape par étape
**Afin de** enregistrer les résultats de recette de manière guidée et traçable

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| Vue exécution : un cas à la fois, étapes listées avec résultat attendu | ⬜ |
| Résultat par cas : PASS · FAIL · BLOCKED · SKIPPED | ⬜ |
| Résultat FAIL → champ commentaire + capture écran (upload optionnel) obligatoires | ⬜ |
| Résultat BLOCKED → motif obligatoire | ⬜ |
| Progression campagne mise à jour en temps réel (% cas exécutés) | ⬜ |
| Testeur peut reprendre une exécution interrompue (state persisté) | ⬜ |
| Test : cas marqué FAIL sans commentaire → 400 | ⬜ |

---
Item Type: US · Parent: F13.2 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Medium
Stage: Backlog
Dépendances: US13.1.1
