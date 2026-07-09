# US29.10.2 — RPA auto-réparante

**En tant que** opérateur
**Je veux** bénéficier d'une RPA self-healing qui s'adapte automatiquement quand l'interface cible change
**Afin de** réduire la fragilité des robots RPA

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un robot RPA, when l'interface cible change légèrement, then le robot adapte automatiquement ses sélecteurs et poursuit | ⬜ |
| Given une adaptation automatique, when elle a lieu, then elle est journalisée pour revue | ⬜ |
| Error : given un changement d'interface non récupérable, system alerte plutôt que d'agir à l'aveugle | ⬜ |

---
Item Type: US · Parent: F29.10 · Module: automatisation · Phase: phase-3 · Size: XL · Priority: Medium
Stage: ⬜
Source: WF-048 · MoSCoW: Could · Lot: Lot 4 · Origine: Différenciant Power Automate 2026
Justification: Dossier §6.3 ; répond à la fragilité RPA documentée
Dépendances: —
