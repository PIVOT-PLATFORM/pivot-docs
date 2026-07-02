# US18.3.1 — Créer un ADR (Architecture Decision Record) projet

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** architecte / chef de projet
**Je veux** créer et suivre des ADRs liés à un projet spécifique
**Afin de** tracer les décisions architecturales du projet

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| POST `/api/pilotage/roadmap/projects/{id}/adrs` crée un ADR (titre, statut, contexte, décision, conséquences) | ⬜ |
| Statuts ADR : PROPOSED · ACCEPTED · DEPRECATED · SUPERSEDED | ⬜ |
| ADR superseded → lien vers ADR remplaçant obligatoire | ⬜ |
| CRUD ADR complet | ⬜ |
| Sécurité : ADR accessible uniquement aux membres de l'équipe projet | ⬜ |
| Test : ADR SUPERSEDED sans ADR successeur → 400 | ⬜ |

---
Item Type: US · Parent: F18.3 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Dépendances: US18.1.1
