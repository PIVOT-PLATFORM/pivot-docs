# US29.14.9 — Audit de sécurité credentials

**En tant que** RSSI
**Je veux** conduire un audit dédié du composant credentials (coffre-fort, rotation, moindre privilège, secrets hors logs) avant toute mise en production
**Afin de** sécuriser le composant le plus sensible après l'annuaire

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le composant credentials, when l'audit est mené, then coffre-fort, rotation, moindre privilège et absence de secrets dans les logs sont vérifiés | ⬜ |
| Given un défaut identifié, when l'audit le relève, then sa correction conditionne la mise en production | ⬜ |
| Security/Gouvernance : aucune mise en production n'a lieu tant que l'audit credentials n'est pas validé | ⬜ |

---
Item Type: US · Parent: F29.14 · Module: automatisation · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Source: WF-082 · MoSCoW: Must · Lot: Lot 2 · Origine: Insight I4
Justification: Dossier §8-I4 : composant le plus sensible après l'annuaire
Dépendances: —
