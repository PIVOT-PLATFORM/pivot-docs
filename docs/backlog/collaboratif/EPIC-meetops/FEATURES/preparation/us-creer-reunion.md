# US12.1.1 — Créer une réunion avec agenda structuré

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** organisateur de réunion
**Je veux** créer une réunion avec un agenda structuré par points
**Afin de** préparer et partager l'ordre du jour à l'avance

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| POST `/api/collaboratif/meetings` crée une réunion (titre, date, durée totale, teamId optionnel) | ⬜ |
| Agenda : liste de points (titre, durée, type : INFO · DISCUSSION · DÉCISION, animateur) | ⬜ |
| Durée points = durée totale réunion (warning si écart) | ⬜ |
| Sécurité : tenantId extrait du TenantContext | ⬜ |
| Test : réunion sans points agenda → valide (agenda vide autorisé) | ⬜ |

---
Item Type: US · Parent: F12.1 · Module: collaboratif · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
