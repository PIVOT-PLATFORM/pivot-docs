# US11.4.1 — Saisir la vélocité réelle d'un sprint

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** Scrum Master
**Je veux** saisir la vélocité réelle livrée à la fin de chaque sprint
**Afin de** alimenter le tracking de vélocité et affiner les estimations

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| PATCH `.../events/{id}/velocity` enregistre la vélocité réelle (pointsLivres) d'un sprint terminé | ⬜ |
| Vélocité historique : liste des N derniers sprints avec points engagés vs livrés | ⬜ |
| Vélocité moyenne calculée sur les 3 derniers sprints (configurable) | ⬜ |
| Suggestion capacité sprint suivant = vélocité moyenne × facteur (configurable, défaut 0.85) | ⬜ |
| Test : sprint sans vélocité saisie exclu du calcul moyenne | ⬜ |

---
Item Type: US · Parent: F11.4 · Module: agilite · Phase: phase-3 · Size: S · Priority: High
Stage: Backlog
Dépendances: US11.1.2
