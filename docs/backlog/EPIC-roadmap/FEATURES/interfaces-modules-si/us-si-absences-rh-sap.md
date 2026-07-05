# US22.8.4 — Interconnexion SI d'absences / RH (SAP, Workday…)

**En tant que** chef de projet
**Je veux** importer les absences/congés depuis un SI RH (SAP SuccessFactors, SAP HCM, Workday, Lucca, ADP…) pour en déduire les indisponibilités des ressources
**Afin de** planifier et niveler sur la disponibilité réelle des personnes

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un connecteur SI RH configuré, when la synchro s'exécute, then les absences (congés, RTT, arrêts) deviennent des indisponibilités sur les calendriers ressources | ⬜ |
| Given une ressource en absence sur une période, when une tâche lui est affectée sur cette période, then une alerte de conflit est levée (et prise en compte au nivellement) | ⬜ |
| Security/RGPD : seules les périodes d'indisponibilité sont importées (pas le motif d'absence) ; flux tracé, minimisé, et accès aux calendriers d'indisponibilité restreint aux rôles habilités (chef de projet/PMO) — pas d'exposition du détail RH aux autres membres du projet | ⬜ |
| Error : given le SI RH indisponible, when la synchro échoue, then le dernier état connu est conservé et l'échec signalé | ⬜ |

## Hors périmètre
- Gestion des absences elle-même (saisie, validation, workflow congés) : reste dans le SI RH source, jamais dans PIVOT
- Import du motif d'absence ou de toute donnée RH qualifiante au-delà de la période d'indisponibilité (exclu par principe de minimisation)
- Écriture/synchronisation retour vers le SI RH (l'US couvre un flux entrant uniquement, lecture seule)
- Support de tous les connecteurs RH du marché : un connecteur pivot type SAP suffit pour cette US, les autres (Workday, Lucca, ADP…) suivent le même contrat d'interface mais sont hors périmètre d'implémentation initiale

## Notes d'implémentation
- Connecteur porté par EN22.3 : normalisation des absences en indisponibilités (périodes seules) consommées par le moteur d'ordonnancement/nivellement d'EN22.1
- Minimisation RGPD dès la couche d'ingestion : le motif d'absence ne doit jamais transiter ni être stocké côté PIVOT, y compris dans les logs de synchro
- Fréquence de synchro et gestion du dernier-état-connu (cache) à spécifier avec le connecteur SI RH retenu pour le premier pivot (type SAP SuccessFactors/HCM)
- Dépend d'E03 Ressources & temps pour la notion de calendrier ressource sur laquelle se posent les indisponibilités

---
Item Type: US · Parent: F22.8 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: High
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public
Justification: Interopérabilité / interfaces inter-modules & SI (ADR-010, bus PIVOT + deep-links ADR-006/008)
Dépendances: EN22.1 · EN22.3 · E03 Ressources & temps
