# US21.8.3 — Vue Scrum Master

**En tant que** Scrum Master
**Je veux** une vue centrée sur le sprint en cours affichant les risques actifs du sprint, leur vélocité et les obstacles remontés
**Afin de** surveiller pendant le sprint les blocages susceptibles de dégrader la livraison

## Contexte

Risques du sprint, vélocité de risque, obstacles.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un sprint en cours sur un projet, when le Scrum Master ouvre la vue Scrum Master, then il voit la liste des risques actifs rattachés au sprint courant, leur exposition/vélocité (US21.2.6) et les obstacles Daily ayant généré un risque candidat (US21.4.2) | ⬜ |
| Given un risque candidat créé automatiquement à partir d'un obstacle Daily persistant, when le Scrum Master consulte la vue, then le lien vers l'obstacle d'origine est visible et permet la navigation vers celui-ci | ⬜ |
| Error : given un sprint sans aucun risque ni obstacle associé, system affiche un état vide explicite plutôt qu'une liste absente sans explication | ⬜ |
| Security : la vue n'expose que les risques et obstacles des sprints des projets/équipes auxquels le Scrum Master est rattaché | ⬜ |
| A11y : la liste des risques du sprint est navigable au clavier et l'indicateur de vélocité (progression/tendance) est doublé d'un libellé textuel, pas uniquement d'une représentation graphique ou colorée (WCAG 2.1 AA 1.4.1 et 2.1.1) | ⬜ |

## Hors périmètre
- Le calcul de l'exposition et de la vélocité du risque — couvert par US21.2.6 ; cette US restitue la donnée.
- La génération du risque candidat à partir d'un obstacle Daily — couverte par US21.4.2 ; cette vue affiche le résultat et le lien de traçabilité.
- La qualification complète du risque candidat (probabilité, gravité, traitement) — relève du cycle de vie standard (F21.3), pas de cette vue de restitution.
- Le suivi de sprints passés/clôturés (historique) — hors périmètre, cette vue se concentre sur le sprint courant.

## Notes d'implémentation
- Le périmètre « sprint courant » nécessite de connaître le sprint actif du projet via le bus PIVOT (événement `sprint.closed` déjà consommé par US21.4.1/US21.4.2 pour la logique inverse) — à corréler pour déterminer le sprint en cours au moment de l'affichage.
- Le lien obstacle ↔ risque candidat repose sur la traçabilité déjà posée par US21.4.2 (référence à l'obstacle source) ; cette US ne fait que l'exposer en UI.
- Vue en lecture seule : aucune action de qualification/traitement n'est attendue ici, celles-ci restent portées par les écrans du cycle de vie (F21.3).

---
Item Type: US · Parent: F21.8 · Module: risk · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Dépendances: US21.4.2
