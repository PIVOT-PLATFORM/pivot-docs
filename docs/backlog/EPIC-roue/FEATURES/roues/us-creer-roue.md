# US14.1.1 — Créer et gérer une roue de tirage

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** animateur
**Je veux** créer une roue de tirage avec une liste de participants ou éléments
**Afin de** animer des tirages aléatoires lors d'événements d'équipe

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| POST `/api/collaboratif/roue/wheels` crée une roue (nom, liste entrées avec poids) | ⬜ |
| CRUD complet : créer / modifier / supprimer / lister ses roues | ⬜ |
| Poids par entrée configurable (1–10) — influence la probabilité de tirage | ⬜ |
| Roue liée à un tenant (isolation) | ⬜ |
| Sécurité : tenantId extrait du TenantContext | ⬜ |

---
Item Type: US · Parent: F14.1 · Module: collaboratif · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
