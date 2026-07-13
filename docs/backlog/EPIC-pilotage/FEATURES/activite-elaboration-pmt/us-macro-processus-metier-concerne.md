# US18.17.4 — Macro Processus Métier concerné

**En tant que** chef de projet
**Je veux** rattacher l'activité à un macro processus métier via une liste mono-sélection
**Afin de** situer l'activité dans la cartographie des processus métier

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ « Macro Processus Métier concerné », when j'ouvre la liste, then les valeurs proposées proviennent du référentiel chargé | ⬜ |
| Given le champ « Macro Processus Métier concerné », when je sélectionne une valeur, then une seule valeur est retenue (mono-sélection) | ⬜ |
| Error : given une valeur hors référentiel, system n'autorise pas sa saisie | ⬜ |
| Security/Gouvernance : les valeurs référentielles sont chargées depuis le référentiel, non modifiables par le chef de projet | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'administration et le chargement des valeurs référentielles du macro processus.

## Notes d'implémentation
- Module pilotage (OPDN), écran Élaboration PMT — informations structurelles, champ liste mono-sélection.
- Valeurs référentielles à charger.

---
Item Type: US · Parent: F18.17 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.13 Activité — champs Élaboration PMT (informations structurelles)
Dépendances: —
