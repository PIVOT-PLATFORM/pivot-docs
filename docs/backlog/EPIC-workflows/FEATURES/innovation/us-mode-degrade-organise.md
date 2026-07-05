# US29.13.6 — Mode dégradé organisé

**En tant que** opérateur
**Je veux** activer un kill switch métier basculant de façon documentée vers la procédure manuelle, avec file des éléments non traités et reprise ordonnée
**Afin de** assurer la continuité d'activité en cas d'incident

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un incident, when j'active le kill switch, then le workflow bascule vers la procédure manuelle documentée | ⬜ |
| Given le mode dégradé, when des éléments arrivent, then ils sont mis en file pour traitement ultérieur | ⬜ |
| Error : given le retour au mode normal, system reprend le traitement des éléments en file de façon ordonnée sans perte | ⬜ |

---
Item Type: US · Parent: F29.13 · Module: automatisation · Phase: phase-3 · Size: L · Priority: Low
Stage: Backlog
Rôle: ingenieur-d-exploitation-pilote
Source: WF-071 · MoSCoW: Could · Lot: Lot 4 · Origine: Bonus B6
Justification: Dossier §7-B6 : continuité d'activité, angle mort des 6
Dépendances: —
