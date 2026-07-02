# US19.1.1 — Créer une session live

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** animateur
**Je veux** créer une session live avec un type d'activité
**Afin de** animer une interaction collective en temps réel

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| POST `/api/collaboratif/sessions` crée une session (titre, type, config, teamId optionnel) | ⬜ |
| Types : QUIZ · POLL · WORDCLOUD · BRAINSTORM · QA | ⬜ |
| Session génère un code court (6 chars alphanum) pour rejoindre | ⬜ |
| Session liée au tenant via TenantContext | ⬜ |
| Sécurité : tenantId extrait du TenantContext, jamais du body | ⬜ |

---
Item Type: US · Parent: F19.1 · Module: collaboratif · Phase: phase-3 · Size: M · Priority: Critical
Stage: Backlog
