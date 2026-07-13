# US18.18.1 — Affichage de l'écran Budget

**En tant que** utilisateur final
**Je veux** accéder à l'écran Budget d'une activité, quel que soit son type
**Afin de** consulter et gérer les données budgétaires de l'activité

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une activité de n'importe quel type, when j'ouvre l'écran Budget, then l'écran est disponible et affiche un header | ⬜ |
| Given l'écran Budget, when il s'affiche, then le sous-onglet « PDS Pluriannuel » est présent et constitue le périmètre MVP | ⬜ |
| Given l'écran Budget, when il s'affiche, then les sous-onglets « Élaboration PMT » et « Photos financières » sont prévus (post-MVP) | ⬜ |
| Error : given une activité sans données budgétaires, system affiche l'écran Budget avec ses sous-onglets sans erreur | ⬜ |
| Security/Gouvernance : l'affichage de l'écran est ouvert en consultation, la modification restant soumise aux règles de chaque sous-onglet | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le détail du contenu des sous-onglets, couvert par les US dédiées.
- Les sous-onglets « Élaboration PMT » et « Photos financières » sont post-MVP.

## Notes d'implémentation
- Module pilotage (OPDN), écran Budget d'une activité, disponible sur tous les types d'activités.
- Header + sous-onglet PDS Pluriannuel (MVP) ; Élaboration PMT et Photos financières post-MVP.

---
Item Type: US · Parent: F18.18 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: utilisateur-final
Source: SPEC_OPDN — B.15 Activité — écran Budget
Dépendances: —
