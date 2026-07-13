# US18.17.12 — Domaine métier

**En tant que** chef de projet
**Je veux** rattacher l'activité à un domaine métier via une liste mono-sélection à choix libre
**Afin de** qualifier le domaine métier de l'activité

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ « Domaine métier », when j'ouvre la liste, then les valeurs proposées sont Production Nucléaire, Thermique, Appui Industriel, Combustible, Hydraulique, Gestion des Déchets et Déconstruction, Socle Technique & Data, Autre, Transverse | ⬜ |
| Given le champ « Domaine métier », when je sélectionne une valeur, then une seule valeur est retenue (mono-sélection, choix libre) et le champ est obligatoire | ⬜ |
| Error : given aucune valeur sélectionnée à l'enregistrement, system bloque (champ obligatoire) | ⬜ |
| Security/Gouvernance : les valeurs proviennent du référentiel, non modifiable par le chef de projet | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Les sous-domaines métier sont couverts par les US dédiées.

## Notes d'implémentation
- Module pilotage (OPDN), écran Élaboration PMT — informations structurelles, liste obligatoire mono-sélection (choix libre).
- 9 valeurs dont Autre et Transverse.

---
Item Type: US · Parent: F18.17 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.13 Activité — champs Élaboration PMT (informations structurelles)
Dépendances: —
