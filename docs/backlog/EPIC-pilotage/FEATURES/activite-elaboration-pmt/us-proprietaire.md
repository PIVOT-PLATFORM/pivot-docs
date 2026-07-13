# US18.17.9 — Propriétaire

**En tant que** chef de projet
**Je veux** désigner le propriétaire d'une activité de type RUN via une liste mono-sélection
**Afin de** identifier le responsable du Run à partir du référentiel REF_PROPRIETAIRES

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une activité de type RUN, when j'affiche l'écran, then le champ « Propriétaire » est obligatoire | ⬜ |
| Given le champ « Propriétaire » (REF_PROPRIETAIRES), when j'ouvre la liste, then les valeurs proviennent du référentiel REF_PROPRIETAIRES | ⬜ |
| Given le champ « Propriétaire », when je sélectionne une valeur, then une seule valeur est retenue (mono-sélection) | ⬜ |
| Error : given une activité RUN sans propriétaire à l'enregistrement, system bloque (champ obligatoire) | ⬜ |
| Security/Gouvernance : les valeurs proviennent du référentiel REF_PROPRIETAIRES, non modifiable par le chef de projet | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le champ ne s'applique qu'aux activités de type RUN ; les autres types ne l'affichent pas.

## Notes d'implémentation
- Module pilotage (OPDN), écran Élaboration PMT — informations structurelles, champ mono-sélection alimenté par REF_PROPRIETAIRES.
- Obligatoire pour les activités de type RUN.

---
Item Type: US · Parent: F18.17 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.13 Activité — champs Élaboration PMT (informations structurelles)
Dépendances: —
