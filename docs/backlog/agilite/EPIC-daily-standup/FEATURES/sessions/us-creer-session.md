# US10.1.1 — Créer une session de daily standup

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** Scrum Master / animateur
**Je veux** créer une session de daily standup pour mon équipe
**Afin de** organiser le tour de parole et le minuteur

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| POST `/api/agilite/standup/sessions` crée une session (nom, durée par participant, liste membres) | ⬜ |
| Session liée à une équipe (FK → `public.teams.id`) | ⬜ |
| Durée par participant configurable (défaut 2 min) | ⬜ |
| Ordre des participants aléatoire ou défini manuellement | ⬜ |
| Sécurité : tenantId extrait du TenantContext | ⬜ |

---
Item Type: US · Parent: F10.1 · Module: agilite · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
