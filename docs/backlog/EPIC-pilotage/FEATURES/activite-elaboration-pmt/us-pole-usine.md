# US18.17.11 — Pôle / Usine

**En tant que** chef de projet
**Je veux** rattacher l'activité à un pôle / usine via une liste mono-sélection filtrée
**Afin de** préciser le rattachement organisationnel cohérent avec le département / programme / mission

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ « Pôle / Usine », when j'ouvre la liste, then les valeurs sont filtrées selon la valeur de « Département / Programme / Mission » | ⬜ |
| Given le champ « Pôle / Usine », when je sélectionne une valeur, then une seule valeur est retenue (mono-sélection) et le champ est obligatoire | ⬜ |
| Error : given aucune valeur sélectionnée à l'enregistrement, system bloque (champ obligatoire) | ⬜ |
| Error : given « Département / Programme / Mission » non renseigné, system ne propose aucune valeur de pôle / usine | ⬜ |
| Security/Gouvernance : les valeurs proviennent du référentiel d'organisation, non modifiable par le chef de projet | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La définition des valeurs de « Département / Programme / Mission » est couverte par l'US dédiée.

## Notes d'implémentation
- Module pilotage (OPDN), écran Élaboration PMT — informations structurelles, liste obligatoire mono-sélection.
- Filtrée dynamiquement selon la valeur de « Département / Programme / Mission ».

---
Item Type: US · Parent: F18.17 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.13 Activité — champs Élaboration PMT (informations structurelles)
Dépendances: —
