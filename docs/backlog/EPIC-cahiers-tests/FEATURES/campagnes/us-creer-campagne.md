# US13.2.1 — Créer une campagne de test

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** responsable qualité
**Je veux** créer une campagne de test en sélectionnant des cas, en assignant des testeurs et une deadline
**Afin de** planifier une session de recette structurée

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| POST `/api/pilotage/test-campaigns` crée une campagne (nom, deadline, sélection de cas depuis une ou plusieurs suites) | ⬜ |
| Assignation d'un ou plusieurs testeurs par cas ou par lot | ⬜ |
| Lien optionnel de la campagne à un projet (E18) | ⬜ |
| Une campagne ne peut être créée avec une deadline dans le passé | ⬜ |
| Sécurité : tenantId extrait du TenantContext | ⬜ |
| Test TI : campagne d'un autre tenant → 404 | ⬜ |

---
Item Type: US · Parent: F13.2 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Dépendances: US13.1.1
