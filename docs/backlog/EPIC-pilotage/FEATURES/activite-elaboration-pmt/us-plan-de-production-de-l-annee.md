# US18.17.2 — Plan de production de l'année

**En tant que** chef de projet
**Je veux** rattacher l'activité à un ou plusieurs plans de production annuels via une liste multi-sélection
**Afin de** positionner l'activité sur les exercices de production concernés

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ « Plan de production de l'année », when j'ouvre la liste, then les valeurs proposées vont de 2025 à 2030 | ⬜ |
| Given le champ « Plan de production de l'année », when je sélectionne des valeurs, then je peux en choisir plusieurs (multi-sélection) | ⬜ |
| Given un import de fichier, when les activités sont créées, then elles sont taguées « Plan de PROD 2026 » | ⬜ |
| Error : given une valeur hors liste, system n'autorise pas sa saisie (choix restreint à la liste) | ⬜ |
| Security/Gouvernance : en V2, seul l'administrateur peut rendre la liste modifiable, et uniquement en addition de valeurs (aucune suppression) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'administration de la liste (ajout d'années par l'admin) est prévue en V2.
- La logique d'import de fichier est couverte par les US d'import d'activités.

## Notes d'implémentation
- Module pilotage (OPDN), écran Élaboration PMT — informations structurelles, champ liste multi-sélection.
- Liste initiale : 2025 à 2030 ; extensible par l'admin en V2 (addition uniquement).

---
Item Type: US · Parent: F18.17 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.13 Activité — champs Élaboration PMT (informations structurelles)
Dépendances: —
