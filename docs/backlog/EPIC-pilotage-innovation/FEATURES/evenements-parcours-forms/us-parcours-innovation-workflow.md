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
| Error : given un workflow qui référence une transition ou un événement métier inconnu du SMI, when il est activé, then l'activation échoue avec une erreur de configuration explicite | ⬜ |
| Security : seuls les rôles habilités à approuver une étape (définis dans le workflow) peuvent valider une transition ; toute approbation/rejet est tracé (qui, quand, décision) pour audit | ⬜ |

## Hors périmètre
- Le moteur de workflow lui-même (modélisation, exécution des étapes) : fourni par E29 Workflows, cette US définit le parcours métier d'innovation qui le consomme
- La définition du contenu des étapes d'évaluation/gate (critères, scoring) : déléguée à F38.3/F38.4, cette US orchestre les transitions, pas leur contenu
- La personnalisation libre du parcours par un utilisateur final (hors profils E40 prédéfinis) : les variantes sont limitées aux profils/maturité définis, pas un parcours ad hoc par idée

## Notes d'implémentation
- Consomme le module Workflow (E29) comme moteur d'exécution ; le déclenchement se fait exclusivement via événements du bus PIVOT (idée soumise, gate décidé), sans FK inter-modules (ADR-006/008)
- Les variantes de parcours (léger vs complet) doivent être pilotées par les profils existants (E40), pas recréées spécifiquement pour l'innovation
- Le mécanisme de relance/escalade sur dépassement de SLA doit réutiliser les capacités de notification déjà fournies par Workflow (E29), pas une notification ad hoc

---
Item Type: US · Parent: F38.15 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: High
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: SMI — événements internes d'innovation, parcours orchestré (Workflow E29), dépôt d'idée par formulaire (Forms)
Dépendances: EN38.1 · E29 (Workflows) · bus PIVOT
