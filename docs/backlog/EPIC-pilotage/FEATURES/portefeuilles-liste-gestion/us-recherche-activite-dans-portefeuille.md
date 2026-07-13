# US18.12.5 — Recherche d'une activité dans un portefeuille

**En tant que** utilisateur final
**Je veux** rechercher une activité dans un portefeuille via une barre de recherche
**Afin de** retrouver rapidement une activité parmi celles du portefeuille

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le portefeuille affiché, when je saisis du texte dans la barre de recherche, then la recherche porte sur l'ensemble des champs textuels visibles du tableau | ⬜ |
| Given une recherche saisie, when je navigue puis reviens sur le portefeuille, then le contenu de la barre de recherche est conservé | ⬜ |
| Given au moins un caractère saisi, when la barre contient du texte, then un bouton d'effacement est affiché | ⬜ |
| Error : given une recherche sans résultat, system affiche un tableau vide sans erreur | ⬜ |
| Security/Gouvernance : seul un utilisateur habilité à consulter le portefeuille peut y rechercher une activité | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Les filtres de création/modification du portefeuille (US filtres dédiée).

## Notes d'implémentation
- Module pilotage (OPDN), barre de recherche sur les champs textuels visibles du tableau.
- Bouton d'effacement conditionné à la présence d'au moins un caractère.

---
Item Type: US · Parent: F18.12 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: SPEC_OPDN — B.8 Portefeuilles d'activités — liste & gestion
Dépendances: —
