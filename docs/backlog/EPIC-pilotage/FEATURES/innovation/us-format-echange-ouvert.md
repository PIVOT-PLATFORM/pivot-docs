# US18.18.8 — Format d'échange ouvert

**En tant que** acheteur
**Je veux** un standard d'export/import de portefeuilles entre PPM (projets, jalons, budgets, décisions)
**Afin de** limiter le risque de lock-in juridique lié à la remise en concurrence

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un portefeuille, when l'acheteur l'exporte au format ouvert, then projets, jalons, budgets et décisions sont exportés dans un standard réimportable | ⬜ |
| Un portefeuille exporté par un autre PPM au même standard peut être importé | ⬜ |
| Error : given un fichier non conforme au standard, system rejette l'import avec un diagnostic | ⬜ |
| Security/Gouvernance : les décisions exportées conservent leur horodatage et traçabilité | ⬜ |

---
Item Type: US · Parent: F18.18 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Low
Stage: Backlog
Source: PP-060 · MoSCoW: Could · Lot: Lot 4 · Origine: Bonus B8
Justification: Dossier §7-B8 : risque juridique pour l'acheteur soumis à remise en concurrence
Dépendances: —
