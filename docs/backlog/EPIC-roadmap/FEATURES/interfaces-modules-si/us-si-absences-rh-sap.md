# US22.8.4 — Interconnexion SI d'absences / RH (SAP, Workday…)

**En tant que** chef de projet
**Je veux** importer les absences/congés depuis un SI RH (SAP SuccessFactors, SAP HCM, Workday, Lucca, ADP…) pour en déduire les indisponibilités des ressources
**Afin de** planifier et niveler sur la disponibilité réelle des personnes

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un connecteur SI RH configuré, when la synchro s'exécute, then les absences (congés, RTT, arrêts) deviennent des indisponibilités sur les calendriers ressources | ⬜ |
| Given une ressource en absence sur une période, when une tâche lui est affectée sur cette période, then une alerte de conflit est levée (et prise en compte au nivellement) | ⬜ |
| Security/RGPD : seules les périodes d'indisponibilité sont importées (pas le motif d'absence) ; flux tracé et minimisé | ⬜ |
| Error : given le SI RH indisponible, when la synchro échoue, then le dernier état connu est conservé et l'échec signalé | ⬜ |

---
Item Type: US · Parent: F22.8 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: High
Stage: Backlog
Rôle: chef-de-projet
Profils: PME, Grand groupe, Privée sous droit public
Justification: Interopérabilité / interfaces inter-modules & SI (ADR-010, bus PIVOT + deep-links ADR-006/008)
Dépendances: EN22.1 · EN22.3 · E03 Ressources & temps
