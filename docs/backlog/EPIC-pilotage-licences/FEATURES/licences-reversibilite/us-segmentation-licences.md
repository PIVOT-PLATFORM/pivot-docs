# US37.1.3 — Segmentation des licences

**En tant que** acheteur
**Je veux** des profils différenciés (consultation / contribution terrain / pilotage / PMO) avec une tarification adaptée et un coût complet simulé par population
**Afin de** maîtriser le TCO et éviter l'empilement tarifaire documenté

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given des populations d'utilisateurs, when l'acheteur configure les profils, then consultation, contribution terrain, pilotage et PMO ont une tarification distincte | ⬜ |
| Le coût complet est simulable par population d'utilisateurs | ⬜ |
| Error : given une simulation sans effectif renseigné pour une population, system la signale comme incomplète | ⬜ |
| Security/Gouvernance : l'attribution des profils est tracée et respecte les périmètres | ⬜ |

---
Item Type: US · Parent: F37.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Source: PP-034 · MoSCoW: Must · Lot: Lot 1 · Origine: Insight I8
Justification: Dossier §8-I8 : empilement MS ~60-70 $/util. documenté
Dépendances: —
