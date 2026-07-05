# US27.4.2 — Statut & tendance (ON_TRACK / AT_RISK / OFF_TRACK)

**En tant que** responsable pilotage
**Je veux** obtenir un **statut** (ON_TRACK · AT_RISK · OFF_TRACK · DONE) et une **tendance**, calculés par l'écart entre avancement réel et **rythme attendu**
**Afin de** détecter tôt les OKR qui dérapent

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'avancement d'un KR et le temps écoulé du cycle, when le statut se calcule, then il compare l'avancement au **pace attendu** (proratisé) → ON_TRACK / AT_RISK / OFF_TRACK | ⬜ |
| Given plusieurs check-ins, when j'affiche la tendance, then l'évolution (amélioration/dégradation) est visible | ⬜ |
| Given confiance basse + avancement en retard, then l'OKR est signalé prioritairement dans la liste « à risque » | ⬜ |

---
Item Type: US · Parent: F27.4 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Rôle: officier-responsable-pmo
Profils: Tous
Justification: Raffinage OKR état de l'art (Doerr/Google ; Quantive/Workboard/Viva Goals/Perdoo)
Dépendances: US27.4.1
