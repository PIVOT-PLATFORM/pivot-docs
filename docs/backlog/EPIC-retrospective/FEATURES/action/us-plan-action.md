# US20.3.1 — Créer et assigner des actions issues de la rétrospective

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** équipe
**Je veux** créer des actions concrètes à partir de la rétrospective et les assigner
**Afin de** transformer les apprentissages en améliorations mesurables

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| POST `.../sessions/{id}/actions` crée une action (titre, owner, échéance, card source optionnelle) | ⬜ |
| Action liée à la session de rétro ET à l'équipe | ⬜ |
| Statut action : A_FAIRE · EN_COURS · TERMINEE · ABANDONNEE | ⬜ |
| Actions consultables hors session (liste par équipe, tri par statut/échéance) | ⬜ |
| Test : action sans owner → valide (owner optionnel) | ⬜ |

---
Item Type: US · Parent: F20.3 · Module: agilite · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Dépendances: US20.1.2
