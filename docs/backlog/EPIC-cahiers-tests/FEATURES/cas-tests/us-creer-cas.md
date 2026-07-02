# US13.1.1 — Créer et gérer des cas de test

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** testeur / responsable qualité
**Je veux** créer des cas de test structurés avec préconditions et étapes
**Afin de** documenter les scénarios de recette de manière reproductible

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| POST `/api/pilotage/test-cases` crée un cas (titre, priorité, préconditions, étapes, résultat attendu) | ⬜ |
| Étape = description + résultat attendu (liste ordonnée) | ⬜ |
| CRUD complet cas de test | ⬜ |
| Tags configurables (fonctionnel, régression, smoke, performance) | ⬜ |
| Sécurité : tenantId extrait du TenantContext | ⬜ |
| Test TI : cas d'un autre tenant → 404 | ⬜ |

---
Item Type: US · Parent: F13.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
