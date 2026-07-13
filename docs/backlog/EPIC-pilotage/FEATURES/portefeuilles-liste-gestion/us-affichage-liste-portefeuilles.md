# US18.12.1 — Affichage de la liste des portefeuilles

**En tant que** gestionnaire de portefeuille
**Je veux** afficher la liste de mes portefeuilles d'activités ordonnés par date de modification
**Afin de** retrouver rapidement les portefeuilles sur lesquels j'ai travaillé récemment

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'écran des portefeuilles, when la liste se charge, then les portefeuilles sont ordonnés par date de modification, le dernier modifié en premier | ⬜ |
| Given un portefeuille que je viens de modifier, when je reviens sur la liste, then il remonte en tête de liste | ⬜ |
| Error : given aucun portefeuille existant, system affiche la liste vide sans erreur | ⬜ |
| Security/Gouvernance : seul un gestionnaire de portefeuille accède à la gestion des portefeuilles | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La création, la modification et la suppression d'un portefeuille (US dédiées).

## Notes d'implémentation
- Module pilotage (OPDN), écran liste des portefeuilles d'activités.
- Tri par date de modification décroissante.

---
Item Type: US · Parent: F18.12 · Module: pilotage · Phase: phase-3 · Size: XS · Priority: Medium
Stage: ⬜
Rôle: gestionnaire-de-portefeuille
Source: SPEC_OPDN — B.8 Portefeuilles d'activités — liste & gestion
Dépendances: —
