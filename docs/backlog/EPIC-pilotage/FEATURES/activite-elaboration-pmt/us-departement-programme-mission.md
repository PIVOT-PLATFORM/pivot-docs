# US18.17.10 — Département / Programme / Mission

**En tant que** chef de projet
**Je veux** rattacher l'activité à un département, programme ou mission via une liste mono-sélection
**Afin de** situer l'activité dans l'organisation et filtrer le pôle / usine associé

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ « Département / Programme / Mission », when j'ouvre la liste, then les valeurs proposées sont Etat Major DivNum, KODATH, SIPN, VISION2035, TECH_CYBER_DATA_IA_SURETE, MISSION STRATEGIE & PILOTAGE, MISSION FINANCE, MISSION TRANSFO, ANIM METIER NUM | ⬜ |
| Given le champ « Département / Programme / Mission », when je sélectionne une valeur, then une seule valeur est retenue (mono-sélection) et le champ est obligatoire | ⬜ |
| Given une valeur sélectionnée, when le champ « Pôle / Usine » est ouvert, then il est filtré selon la valeur retenue | ⬜ |
| Error : given aucune valeur sélectionnée à l'enregistrement, system bloque (champ obligatoire) | ⬜ |
| Security/Gouvernance : les valeurs proviennent du référentiel d'organisation, non modifiable par le chef de projet | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le filtrage du champ « Pôle / Usine » est détaillé dans l'US dédiée.

## Notes d'implémentation
- Module pilotage (OPDN), écran Élaboration PMT — informations structurelles, liste obligatoire mono-sélection.
- Valeur pilote le filtrage du champ « Pôle / Usine ».

---
Item Type: US · Parent: F18.17 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.13 Activité — champs Élaboration PMT (informations structurelles)
Dépendances: —
