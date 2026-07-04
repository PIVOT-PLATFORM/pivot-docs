# US18.6.1 — Créer des objectifs et résultats-clés (OKR)

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** manager / responsable pilotage
**Je veux** créer des OKR (Objectives & Key Results) pour mon équipe ou mon tenant
**Afin de** aligner les équipes sur des objectifs mesurables

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| POST `/api/pilotage/okr/objectives` crée un objectif (titre, description, période : trimestre / année, ownerTeamId) | ⬜ |
| Chaque objectif contient 1–5 Key Results (titre, valeur cible, unité, valeur actuelle) | ⬜ |
| Statut objectif calculé automatiquement : ON_TRACK · AT_RISK · OFF_TRACK selon % avancement des KR | ⬜ |
| OKR lié au tenant (isolation) ou à une équipe spécifique | ⬜ |
| Test : objectif sans KR → 400 | ⬜ |

---
Item Type: US · Parent: F18.6 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
