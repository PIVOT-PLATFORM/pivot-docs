# US27.5.1 — Scoring 0.0–1.0 (KR & objectif pondéré)

**En tant que** responsable pilotage
**Je veux** obtenir un **score 0.0–1.0** par KR et par objectif (moyenne pondérée), tenant compte du type engageant/aspirationnel
**Afin de** évaluer objectivement l'atteinte, à la manière de Google

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un KR, when son avancement est à X %, then son **score = X/100** (borné 0.0–1.0) | ⬜ |
| Given un objectif, when on agrège, then **score O = moyenne pondérée des KR** ; pour un O aspirationnel, **0.7 est considéré « réussi »**, 1.0 pour un O engageant | ⬜ |
| Given un score, when il est affiché, then le code couleur suit le sweet spot (rouge < 0.4 · orange 0.4–0.6 · vert 0.7+) | ⬜ |

---
Item Type: US · Parent: F27.5 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Rôle: officier-responsable-pmo
Profils: Tous
Justification: Raffinage OKR état de l'art (Doerr/Google ; Quantive/Workboard/Viva Goals/Perdoo)
Dépendances: US27.1.3
