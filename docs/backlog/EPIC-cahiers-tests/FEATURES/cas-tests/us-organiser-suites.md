# US13.1.2 — Organiser les cas de test en suites

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** testeur / responsable qualité
**Je veux** organiser les cas de test en suites hiérarchiques (dossiers)
**Afin de** structurer le référentiel de tests par fonctionnalité ou module

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| POST `/api/pilotage/test-suites` crée une suite (nom, suite parente optionnelle) | ⬜ |
| Un cas de test est rattaché à une seule suite à la fois | ⬜ |
| Arborescence de suites navigable (déplacement d'une suite/d'un cas par glisser-déposer ou action explicite) | ⬜ |
| Suppression d'une suite non vide bloquée tant qu'elle contient des cas ou sous-suites | ⬜ |
| Sécurité : tenantId extrait du TenantContext | ⬜ |
| Test TI : suite d'un autre tenant → 404 | ⬜ |

---
Item Type: US · Parent: F13.1 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: Backlog
Dépendances: US13.1.1
