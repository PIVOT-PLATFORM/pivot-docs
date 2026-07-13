# US25.3.17 — Import de demandes d'achats

**En tant que** acheteur informatique (prescripteur)
**Je veux** importer des demandes d'achat via le bouton « Import des demandes d'achat »
**Afin de** créer en masse des DA dont je suis le prescripteur

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'écran d'accueil, when je clique sur le bouton « Import des demandes d'achat », then l'écran d'import s'ouvre avec les mêmes règles d'affichage que « + Nouvelle demande » | ⬜ |
| Given un import réalisé, when il se termine, then je suis repositionné dans le sous-onglet « Mes demandes » | ⬜ |
| Given des DA importées, when elles sont créées, then la personne qui a réalisé l'import est considérée comme prescripteur de ces DA | ⬜ |
| Error : given un fichier d'import invalide, when je lance l'import, then l'import est refusé et je suis informé de l'erreur | ⬜ |
| Security/Gouvernance : l'import applique les mêmes habilitations que la création manuelle ; l'importateur devient prescripteur des DA importées | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le format détaillé du fichier d'import et le mapping des colonnes sont couverts par une US dédiée au gabarit d'import.

## Notes d'implémentation
- Écran d'accueil des demandes d'achats (module WRAP/OPDN), bouton « Import des demandes d'achat ».
- Mêmes règles d'affichage que « + Nouvelle demande » ; repositionnement dans « Mes demandes » après import ; importateur = prescripteur des DA importées.

---
Item Type: US · Parent: F25.3 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Rôle: acheteur-informatique
Source: SPEC_OPDN — B.3 Demandes d'achats — écran d'accueil
Dépendances: —
