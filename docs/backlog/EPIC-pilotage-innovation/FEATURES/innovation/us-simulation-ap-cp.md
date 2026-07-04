# US38.1.3 — Simulation AP/CP

**En tant que** contrôleur de gestion
**Je veux** simuler des scénarios budgétaires aux règles publiques (autorisations de programme / crédits de paiement, annualité, M57, virements d'enveloppes)
**Afin que** décaler un projet recalcule correctement les crédits de paiement

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet avec AP/CP, when le contrôleur décale le projet, then les crédits de paiement sont recalculés selon l'annualité et la M57 | ⬜ |
| Les virements d'enveloppes sont pris en compte dans la simulation | ⬜ |
| Error : given un scénario violant une règle publique (dépassement d'AP), system le signale | ⬜ |
| Security/Gouvernance : les simulations n'altèrent pas les données budgétaires de référence (traçabilité) | ⬜ |

---
Item Type: US · Parent: F38.1 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: Low
Stage: Backlog
Source: PP-055 · MoSCoW: Could · Lot: Lot 4 · Origine: Bonus B3
Profils: Publique, État
Justification: Dossier §7-B3 : 'décaler un projet' doit recalculer les CP
Dépendances: —
