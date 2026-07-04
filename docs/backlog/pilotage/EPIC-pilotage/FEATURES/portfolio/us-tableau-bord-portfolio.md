# US18.2.1 — Tableau de bord portefeuille projets

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** directeur de programme / DSI
**Je veux** un tableau de bord consolidé de l'ensemble des projets du portefeuille
**Afin de** suivre l'avancement global et détecter les projets en risque

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| GET `/api/pilotage/portfolio/dashboard` retourne KPIs : nb projets par statut, taux avancement moyen, projets en retard | ⬜ |
| Vue Angular : cartes KPI + liste projets avec indicateur RAG (Rouge / Amber / Vert) | ⬜ |
| Indicateur RAG calculé automatiquement selon décalage planning vs date actuelle | ⬜ |
| Filtre par équipe / responsable / période | ⬜ |
| Sécurité : seuls les projets du tenant visible | ⬜ |
| Test : projet en retard → RAG rouge automatiquement | ⬜ |

---
Item Type: US · Parent: F18.2 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: Backlog
Dépendances: US18.1.1
