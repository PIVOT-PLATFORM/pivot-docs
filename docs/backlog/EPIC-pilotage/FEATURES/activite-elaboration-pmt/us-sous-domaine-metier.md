# US18.17.13 — Sous-domaine métier

**En tant que** chef de projet
**Je veux** rattacher l'activité à un sous-domaine métier via une liste mono-sélection
**Afin de** préciser le sous-domaine métier de l'activité

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ « Sous-domaine métier », when j'ouvre la liste, then les valeurs proposées sont Exploitation Projets, Maintenance, Ingénierie Exploitation, Ingénierie Conception, Sûreté, Transverse, N/A | ⬜ |
| Given le champ « Sous-domaine métier », when je sélectionne une valeur, then une seule valeur est retenue (mono-sélection) et le champ est obligatoire | ⬜ |
| Error : given aucune valeur sélectionnée à l'enregistrement, system bloque (champ obligatoire) | ⬜ |
| Security/Gouvernance : les valeurs proviennent du référentiel, non modifiable par le chef de projet | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le sous-domaine métier de niveau 2 est couvert par l'US dédiée.

## Notes d'implémentation
- Module pilotage (OPDN), écran Élaboration PMT — informations structurelles, liste obligatoire mono-sélection.
- 7 valeurs dont Transverse et N/A.

---
Item Type: US · Parent: F18.17 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.13 Activité — champs Élaboration PMT (informations structurelles)
Dépendances: —
