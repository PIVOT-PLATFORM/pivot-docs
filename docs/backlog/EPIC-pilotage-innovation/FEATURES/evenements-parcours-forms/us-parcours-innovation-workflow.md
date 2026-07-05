# US38.15.2 — Parcours d'innovation orchestré (Pivot Workflow, E29)

**En tant que** responsable innovation
**Je veux** définir un **parcours d'innovation** (cycle de vie idée → qualification → évaluation → gate → incubation) **orchestré par des workflows** configurables du module **Workflow (E29)**
**Afin de** automatiser et fiabiliser le processus d'innovation sans coder, avec approbations et relances

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un parcours type, when je le modélise dans le module Workflow (E29), then chaque transition (soumission, qualification, évaluation, gate go/kill, incubation) déclenche étapes, **approbations humaines**, notifications et SLA | ⬜ |
| Given un événement métier (idée soumise, gate décidé), when il survient, then le workflow correspondant s'exécute (déclencheur bus PIVOT, pas de FK — ADR-006/008) | ⬜ |
| Given un parcours, when il est adapté par profil (E40)/maturité, then des variantes (léger vs complet) sont possibles | ⬜ |
| Given un blocage, when un délai est dépassé, then une relance/escalade est déclenchée | ⬜ |

---
Item Type: US · Parent: F38.15 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: High
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: SMI — événements internes d'innovation, parcours orchestré (Workflow E29), dépôt d'idée par formulaire (Forms)
Dépendances: EN38.1 · E29 (Workflows) · bus PIVOT
