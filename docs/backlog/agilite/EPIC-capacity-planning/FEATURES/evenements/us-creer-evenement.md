# US11.1.1 — Créer un événement de capacité

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** Scrum Master / Release Train Engineer
**Je veux** créer un événement de capacité (PI Planning, Sprint, Release, Custom)
**Afin de** planifier la capacité de l'équipe sur cet événement

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| POST `/api/agilite/capacity/events` crée un événement (type, nom, dateDebut, dateFin, teamId) | ⬜ |
| Types supportés : PI_PLANNING · SPRINT · RELEASE · CUSTOM | ⬜ |
| Événement lié à une équipe (FK → `public.teams.id`) | ⬜ |
| Validation : dateDebut < dateFin | ⬜ |
| Sécurité : tenantId extrait du TenantContext | ⬜ |

---
Item Type: US · Parent: F11.1 · Module: agilite · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
