# US18.17.15 — Capacité métier

**En tant que** chef de projet
**Je veux** rattacher l'activité BUILD à une capacité métier via une liste mono-sélection
**Afin de** identifier la capacité métier ciblée par l'activité de type Build

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une activité de type BUILD, when j'affiche l'écran, then le champ « Capacité métier » est affiché et obligatoire | ⬜ |
| Given le champ « Capacité métier », when je sélectionne une valeur, then une seule valeur est retenue (mono-sélection) | ⬜ |
| Error : given une activité BUILD sans capacité métier à l'enregistrement, system bloque (champ obligatoire) | ⬜ |
| Security/Gouvernance : les valeurs proviennent du référentiel, non modifiable par le chef de projet | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le champ ne s'applique qu'aux activités de type BUILD ; les autres types ne l'affichent pas.
- La sous-capacité métier est couverte par l'US dédiée.

## Notes d'implémentation
- Module pilotage (OPDN), écran Élaboration PMT — informations structurelles, liste obligatoire mono-sélection.
- Obligatoire pour les activités de type BUILD.

---
Item Type: US · Parent: F18.17 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.13 Activité — champs Élaboration PMT (informations structurelles)
Dépendances: —
