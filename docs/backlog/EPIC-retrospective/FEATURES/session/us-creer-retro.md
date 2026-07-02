# US20.1.1 — Créer une session de rétrospective

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** Scrum Master
**Je veux** créer une session de rétrospective pour mon équipe
**Afin d'** animer une rétrospective structurée à la fin du sprint

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| POST `/api/agilite/retro/sessions` crée une session (titre, format, teamId, sprintRef optionnel) | ⬜ |
| Formats disponibles : START_STOP_CONTINUE · KIF_KAF · FOUR_L · MAD_SAD_GLAD · CUSTOM | ⬜ |
| Session génère un code court pour rejoindre (participants sans compte → ROLE_GUEST) | ⬜ |
| Sécurité : tenantId extrait du TenantContext | ⬜ |
| Test : format CUSTOM sans colonnes définies → 400 | ⬜ |

---
Item Type: US · Parent: F20.1 · Module: agilite · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
