# US18.17.17 — Typologie principale de l'activité

**En tant que** chef de projet
**Je veux** qualifier la typologie principale de l'activité via une liste mono-sélection
**Afin de** classer l'activité selon sa nature dominante

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ « Typologie principale de l'activité », when j'ouvre la liste, then les valeurs proposées sont Evol. Fonctionnelle, Evol. Technique, Evol. Mixte, Obsolescence, Cybersécurité, Fatal, Réglementaire, Refonte, Etude | ⬜ |
| Given le champ « Typologie principale de l'activité », when je sélectionne une valeur, then une seule valeur est retenue (mono-sélection) et le champ est obligatoire | ⬜ |
| Error : given aucune valeur sélectionnée à l'enregistrement, system bloque (champ obligatoire) | ⬜ |
| Security/Gouvernance : les valeurs proviennent du référentiel, non modifiable par le chef de projet | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Une éventuelle typologie secondaire n'est pas couverte par cette US.

## Notes d'implémentation
- Module pilotage (OPDN), écran Élaboration PMT — informations structurelles, liste obligatoire mono-sélection.
- 9 valeurs de typologie.

---
Item Type: US · Parent: F18.17 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.13 Activité — champs Élaboration PMT (informations structurelles)
Dépendances: —
