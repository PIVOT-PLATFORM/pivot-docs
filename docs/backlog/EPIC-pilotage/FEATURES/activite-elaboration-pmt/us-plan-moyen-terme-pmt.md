# US18.17.1 — Plan Moyen Terme (PMT)

**En tant que** chef de projet
**Je veux** rattacher l'activité à un ou plusieurs Plans Moyen Terme via une liste multi-sélection
**Afin de** rattacher l'activité aux exercices PMT concernés lors de l'élaboration du PMT

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ « Plan Moyen Terme (PMT) », when j'ouvre la liste, then les valeurs proposées sont PMT68, PMT79, PMT80, PMT91, PMT02, PMT13 | ⬜ |
| Given le champ « Plan Moyen Terme (PMT) », when je sélectionne des valeurs, then je peux en choisir plusieurs (multi-sélection) | ⬜ |
| Given un import de fichier sur PMT68, when les activités sont créées, then toutes les activités du fichier sont taguées PMT68 | ⬜ |
| Error : given une valeur hors liste, system n'autorise pas sa saisie (choix restreint à la liste) | ⬜ |
| Security/Gouvernance : en V2, seul l'administrateur peut rendre la liste modifiable, et uniquement en addition de valeurs (aucune suppression) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'administration de la liste (ajout de valeurs par l'admin) est prévue en V2.
- La logique d'import de fichier est couverte par les US d'import d'activités.

## Notes d'implémentation
- Module pilotage (OPDN), écran Élaboration PMT — informations structurelles, champ liste multi-sélection.
- Liste initiale : PMT68, PMT79, PMT80, PMT91, PMT02, PMT13 ; extensible par l'admin en V2 (addition uniquement).

---
Item Type: US · Parent: F18.17 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.13 Activité — champs Élaboration PMT (informations structurelles)
Dépendances: —
