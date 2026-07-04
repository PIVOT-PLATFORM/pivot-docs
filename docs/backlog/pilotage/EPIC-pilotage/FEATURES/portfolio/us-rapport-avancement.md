# US18.2.2 — Générer un rapport d'avancement du portefeuille

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** responsable pilotage
**Je veux** générer un rapport d'avancement périodique du portefeuille
**Afin de** le partager avec les parties prenantes

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| GET `/api/pilotage/portfolio/report?format=json\|csv` génère rapport au format demandé | ⬜ |
| Rapport contient : liste projets, statut, avancement %, jalons prochains, projets en retard | ⬜ |
| Possibilité de filtrer par période et équipe | ⬜ |
| Vue Angular : bouton export CSV / aperçu JSON | ⬜ |
| Test : rapport CSV correctement formaté avec entêtes | ⬜ |

---
Item Type: US · Parent: F18.2 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
Dépendances: US18.2.1
