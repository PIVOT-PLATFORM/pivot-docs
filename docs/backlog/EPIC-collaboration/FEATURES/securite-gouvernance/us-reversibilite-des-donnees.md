# US30.9.8 — Réversibilité des données

**En tant que** administrateur
**Je veux** exporter de façon structurée et complète le board (objets, positions, liens, auteurs), avec procédure de sortie documentée
**Afin de** garantir la réversibilité et éviter le lock-in

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le canevas de collaboration, when je lance un export structuré complet du board, then le résultat est visible et persistant pour tous les participants | ⬜ |
| Positions | ⬜ |
| Error : given une entrée invalide ou une coupure réseau, system préserve les contributions et affiche un état cohérent | ⬜ |
| Security/Gouvernance : conforme aux politiques de sécurité et de conformité (RGPD, audit, droits d'accès) | ⬜ |

---
Item Type: US · Parent: F30.9 · Module: collaboratif · Phase: phase-3 · Size: L · Priority: High
Stage: Backlog
Source: BL-048 · MoSCoW: Must · Lot: Lot 2 · Origine: Insight I9 + Bonus B6
Justification: Dossier §8-I9 : lock-in total chez les 4 = risque majeur
Dépendances: —
