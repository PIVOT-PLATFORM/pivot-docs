# US18.17.5 — Présence schéma directeur

**En tant que** chef de projet
**Je veux** indiquer la présence d'un schéma directeur via une coche
**Afin de** déclencher l'affichage conditionnel du champ « Commentaires schéma directeur »

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ « Présence schéma directeur », when l'écran s'ouvre, then la coche est à vrai par défaut | ⬜ |
| Given la coche « Présence schéma directeur » à vrai, when j'affiche l'écran, then le champ « Commentaires schéma directeur » est masqué | ⬜ |
| Given la coche « Présence schéma directeur » à faux, when je décoche, then le champ « Commentaires schéma directeur » devient visible | ⬜ |
| Error : given une valeur incohérente, system conserve un état booléen valide (vrai/faux uniquement) | ⬜ |
| Security/Gouvernance : seul un chef de projet habilité sur l'activité peut modifier la coche | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le contenu et l'obligation du champ « Commentaires schéma directeur » sont couverts par l'US dédiée.

## Notes d'implémentation
- Module pilotage (OPDN), écran Élaboration PMT — informations structurelles, coche booléenne.
- Défaut = vrai (masque les commentaires) ; faux = affiche les commentaires.

---
Item Type: US · Parent: F18.17 · Module: pilotage · Phase: phase-3 · Size: XS · Priority: Medium
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.13 Activité — champs Élaboration PMT (informations structurelles)
Dépendances: —
