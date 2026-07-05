# US26.1.1 — Saisir le budget d'un projet

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** chef de projet
**Je veux** saisir le budget alloué à un projet par poste de dépense
**Afin de** suivre la consommation budgétaire tout au long du projet

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| POST `/api/pilotage/roadmap/projects/{id}/budget` crée le budget (postes : humain, matériel, prestation, autre) | ⬜ |
| Budget total = somme des postes | ⬜ |
| Devise configurable au niveau tenant (EUR par défaut) | ⬜ |
| Sécurité : tenantId extrait du TenantContext | ⬜ |
| Test : budget avec poste négatif → 400 | ⬜ |

---
Item Type: US · Parent: F26.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Rôle: chef-de-projet
Dépendances: US22.1.1
