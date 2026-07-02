# US18.1.1 — Créer et gérer un projet sur la roadmap

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** chef de projet / responsable pilotage
**Je veux** créer un projet sur la roadmap avec ses dates, statut et jalons
**Afin de** visualiser le portefeuille et la timeline des initiatives

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| POST `/api/pilotage/roadmap/projects` crée un projet (nom, description, dateDebut, dateFin, statut) | ⬜ |
| Statuts : DRAFT · ACTIVE · ON_HOLD · COMPLETED · CANCELLED | ⬜ |
| Projet lié à une équipe (FK → `public.teams.id`) ou à un tenant (portefeuille global) | ⬜ |
| CRUD complet projet | ⬜ |
| Sécurité : tenantId extrait du TenantContext | ⬜ |

---
Item Type: US · Parent: F18.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
