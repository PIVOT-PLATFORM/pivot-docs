# US18.4.3 — Attribuer le marché et notifier les candidats

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** responsable achats
**Je veux** attribuer le marché au candidat retenu et notifier les autres
**Afin de** clore le processus de consultation de manière traçable

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| POST `.../consultations/{id}/award` (body: candidateId, motif) → statut consultation → ATTRIBUEE | ⬜ |
| Attribution enregistrée avec horodatage + utilisateur ayant attribué | ⬜ |
| Génération automatique : rapport d'attribution (PDF ou export structuré) avec grille d'analyse | ⬜ |
| Traçabilité : historique complet des décisions (audit log) | ⬜ |
| Test : attribution sur consultation non ouverte → 409 · attribution sans candidats → 400 | ⬜ |

---
Item Type: US · Parent: F18.4 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
Dépendances: US18.4.2
