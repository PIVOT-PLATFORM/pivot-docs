# US29.12.2 — Compteurs et alertes budget

**En tant que** administrateur
**Je veux** voir la consommation (tâches/crédits/capacité) en temps réel, recevoir des alertes avant plafond et définir des budgets par équipe
**Afin de** éviter les pathologies économiques (emballement des coûts)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un espace, when des workflows consomment, then la consommation (tâches/crédits/capacité) est visible en temps réel | ⬜ |
| Given un budget par équipe, when la consommation approche du plafond, then une alerte est émise avant dépassement | ⬜ |
| Error : given un plafond atteint, system applique la politique définie (blocage ou notification) sans surprise | ⬜ |

---
Item Type: US · Parent: F29.12 · Module: automatisation · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Source: WF-033 · MoSCoW: Must · Lot: Lot 2 · Origine: Insight I2 + Gumloop/Zapier
Justification: Dossier §8-I2 : trois pathologies économiques documentées
Dépendances: —
