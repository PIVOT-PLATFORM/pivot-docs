# US18.3.2 — Consulter et rechercher les ADRs d'un projet

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** membre de l'équipe projet
**Je veux** consulter et rechercher les ADRs du projet
**Afin de** comprendre les décisions architecturales prises

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| GET `/api/pilotage/roadmap/projects/{id}/adrs` retourne liste ADRs paginée | ⬜ |
| Recherche full-text sur titre + contexte + décision | ⬜ |
| Filtre par statut ADR | ⬜ |
| Vue Angular : liste ADRs avec statut badge + aperçu décision | ⬜ |
| Vue détail ADR : contexte · décision · conséquences · historique versions | ⬜ |
| Test : recherche full-text retourne résultats pertinents | ⬜ |

---
Item Type: US · Parent: F18.3 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: Backlog
Dépendances: US18.3.1
