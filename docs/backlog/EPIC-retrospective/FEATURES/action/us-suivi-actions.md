# US20.3.2 — Revoir les actions de la rétro précédente au démarrage

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** Scrum Master
**Je veux** afficher les actions ouvertes de la rétro précédente au démarrage de la nouvelle rétro
**Afin d'** assurer la continuité et le suivi des engagements pris

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| GET `.../teams/{teamId}/retro/pending-actions` retourne actions A_FAIRE / EN_COURS des rétros précédentes | ⬜ |
| Vue "warm-up" au démarrage de session : liste des actions en cours + statut | ⬜ |
| Animateur peut marquer une action TERMINEE ou ABANDONNEE avant de démarrer la phase contribution | ⬜ |
| Actions fermées conservées dans l'historique de la session où elles ont été clôturées | ⬜ |
| Test : 0 actions en cours → phase warm-up sautée automatiquement | ⬜ |

---
Item Type: US · Parent: F20.3 · Module: agilite · Phase: phase-3 · Size: S · Priority: Medium
Stage: Backlog
Dépendances: US20.3.1
