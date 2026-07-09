# US21.3.5 — Revues de risques

**En tant que** PMO, Chef de projet
**Je veux** planifier des revues de risques avec réévaluation et journal des décisions
**Afin de** traiter et suivre chaque risque jusqu'à sa clôture

## Contexte

Revues planifiées avec réévaluation et journal des décisions.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une revue de risques planifiée à une date donnée, when le PMO ouvre la revue, then la liste des risques actifs du périmètre (projet ou portefeuille) s'affiche avec leur statut, stratégie et dernière évaluation | ⬜ |
| Given une revue en cours, when le Chef de projet réévalue un risque (score, statut ou stratégie) et consigne une décision, then la décision est ajoutée au journal de la revue avec horodatage et auteur, sans modifier l'historique des transitions déjà tracées (US21.3.1) | ⬜ |
| Error : given une tentative de clôture d'une revue sans qu'au moins une décision ait été consignée pour chaque risque du périmètre, system bloque la clôture et retourne un statut 409 avec la liste des risques non traités | ⬜ |
| Security : seuls le PMO ou le Chef de projet du périmètre concerné peuvent créer une revue, y consigner des décisions ou la clôturer ; le journal des décisions est immuable une fois la revue clôturée | ⬜ |
| A11y : le tableau de revue (liste des risques, champs de réévaluation, journal des décisions) est navigable au clavier et les statuts/scores sont restitués par lecteur d'écran, pas uniquement par code couleur (WCAG 2.1 AA) | ⬜ |

## Hors périmètre
- La définition des seuils d'appétence utilisés pour évaluer si un risque nécessite une décision — cf. F21.2 US21.2.3 (Seuils d'appétence)
- La modification des stratégies de traitement elles-mêmes, au-delà de leur consignation en revue — cf. US21.3.2
- La consolidation multi-projets des tendances de risques dans le temps — cf. F21.5 US21.5.5 (Tendance et historique)

## Notes d'implémentation
- Une revue s'appuie sur l'historique des transitions de statut (US21.3.1) et sur l'état des plans d'action/contingence (US21.3.3, US21.3.4) au moment de son ouverture, sans les dupliquer
- Le journal des décisions de revue est un flux d'événements distinct et additif, consultable a posteriori depuis la fiche du risque, indépendant de l'audit trail des transitions de statut mais référençant les mêmes risques
- Le périmètre d'une revue (projet ou portefeuille) doit pouvoir s'appuyer sur la corrélation `project_ref` (bus PIVOT, ADR-006) pour agréger les risques d'un même projet sans FK directe

---
Item Type: US · Parent: F21.3 · Module: risk · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Dépendances: US21.3.1
