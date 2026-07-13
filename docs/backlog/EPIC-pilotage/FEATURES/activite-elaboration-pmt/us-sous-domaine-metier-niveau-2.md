# US18.17.14 — Sous-domaine métier (niveau 2)

**En tant que** chef de projet
**Je veux** préciser un sous-domaine métier de niveau 2 via une liste mono-sélection facultative
**Afin de** affiner la qualification métier de l'activité quand c'est pertinent

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ « Sous-domaine métier (niveau 2) », when j'ouvre la liste, then les valeurs proposées sont CED, Chimie Environnement Déchets, Exploitation, Logistique, Maintenance, Maitrise et suivi du patrimoine (doc et données), Maitrise référentiel et conception exploitation, Prévention Risques, Suivi de fiabilité, N/A | ⬜ |
| Given le champ « Sous-domaine métier (niveau 2) », when je sélectionne une valeur, then une seule valeur est retenue (mono-sélection) | ⬜ |
| Error : given aucune valeur sélectionnée à l'enregistrement, system autorise l'enregistrement car le champ est facultatif | ⬜ |
| Security/Gouvernance : les valeurs proviennent du référentiel, non modifiable par le chef de projet | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le sous-domaine métier de niveau 1 est couvert par l'US dédiée.

## Notes d'implémentation
- Module pilotage (OPDN), écran Élaboration PMT — informations structurelles, liste facultative mono-sélection.
- 10 valeurs dont N/A.

---
Item Type: US · Parent: F18.17 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.13 Activité — champs Élaboration PMT (informations structurelles)
Dépendances: —
