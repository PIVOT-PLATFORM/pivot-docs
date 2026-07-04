# US18.4.2 — Suivre les candidats et analyser les offres

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** responsable achats
**Je veux** enregistrer les candidats et leurs offres pour une consultation
**Afin d'** analyser et comparer les propositions reçues

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| POST `.../consultations/{id}/candidates` enregistre un candidat (raison sociale, contact, montantOffre, délai) | ⬜ |
| Grille d'analyse configurable : critères pondérés (prix, délai, technique, références) | ⬜ |
| Score calculé automatiquement par critère pondéré | ⬜ |
| Vue comparaison : tableau candidats × critères avec scores et classement | ⬜ |
| RGPD : données candidats (nom, contact) marquées données personnelles → purgeables | ⬜ |
| Test : grille avec poids total ≠ 100% → 400 | ⬜ |

---
Item Type: US · Parent: F18.4 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: Backlog
Dépendances: US18.4.1
