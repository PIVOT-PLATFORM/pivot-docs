# US18.17.16 — Sous-capacité métier

**En tant que** chef de projet
**Je veux** préciser une sous-capacité métier de l'activité BUILD via une liste mono-sélection facultative
**Afin de** affiner la capacité métier ciblée par l'activité de type Build

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une activité de type BUILD, when j'affiche l'écran, then le champ « Sous-capacité métier » est affiché et facultatif | ⬜ |
| Given le champ « Sous-capacité métier », when je sélectionne une valeur, then une seule valeur est retenue (mono-sélection) | ⬜ |
| Error : given une activité BUILD sans sous-capacité métier à l'enregistrement, system autorise l'enregistrement car le champ est facultatif | ⬜ |
| Security/Gouvernance : les valeurs proviennent du référentiel, non modifiable par le chef de projet | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le champ ne s'applique qu'aux activités de type BUILD ; les autres types ne l'affichent pas.
- La capacité métier de niveau 1 est couverte par l'US dédiée.

## Notes d'implémentation
- Module pilotage (OPDN), écran Élaboration PMT — informations structurelles, liste facultative mono-sélection.
- Applicable aux activités de type BUILD.

---
Item Type: US · Parent: F18.17 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.13 Activité — champs Élaboration PMT (informations structurelles)
Dépendances: —
