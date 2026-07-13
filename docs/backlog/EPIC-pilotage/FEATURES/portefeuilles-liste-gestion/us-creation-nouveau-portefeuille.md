# US18.12.6 — Création d'un nouveau portefeuille

**En tant que** gestionnaire de portefeuille
**Je veux** créer un nouveau portefeuille à partir d'une combinaison de filtres
**Afin de** regrouper les activités correspondant à un périmètre de suivi précis

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'écran des portefeuilles, when je clique sur le bouton « + Portefeuille d'activité », then la vue de création s'ouvre | ⬜ |
| Given la vue de création, when elle s'ouvre, then aucun filtre n'est sélectionné et une image incite à choisir un filtre | ⬜ |
| Given les 13 filtres, when j'en combine plusieurs, then le portefeuille est construit selon une logique ET entre les filtres | ⬜ |
| Given la vue de création, when je clique sur « annuler » (à côté d'« enregistrer »), then la création est abandonnée | ⬜ |
| Error : given une création sans aucun filtre, system n'a aucune activité à afficher tant qu'aucun filtre n'est choisi | ⬜ |
| Security/Gouvernance : seul un gestionnaire de portefeuille peut créer un portefeuille | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le détail des 13 filtres et l'enregistrement final sont couverts par les US filtres & création.

## Notes d'implémentation
- Module pilotage (OPDN), bouton « + Portefeuille d'activité ».
- Combinaison de 13 filtres en logique ET ; état initial sans filtre avec image incitative.

---
Item Type: US · Parent: F18.12 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: gestionnaire-de-portefeuille
Source: SPEC_OPDN — B.8 Portefeuilles d'activités — liste & gestion
Dépendances: —
