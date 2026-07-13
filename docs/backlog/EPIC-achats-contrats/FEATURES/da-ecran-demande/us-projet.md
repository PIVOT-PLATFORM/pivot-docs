# US25.4.15 — Projet

**En tant que** acheteur informatique (prescripteur)
**Je veux** rattacher la demande d'achat à un projet dans une liste filtrée
**Afin de** relier la DA au projet pertinent de mon unité

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une unité de DA sélectionnée, when j'ouvre la liste Projet, then seuls les projets liés à cette unité (héritage direction/division) s'affichent | ⬜ |
| Given un projet sélectionné, when j'enregistre la DA, then le rattachement au projet est conservé | ⬜ |
| Error : given un projet non rattaché à l'unité de la DA, system ne le propose pas dans la liste | ⬜ |
| Security/Gouvernance : saisie ouverte à P/V/CM/A (OUI/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La création et l'administration des projets (hors écran de la demande).

## Notes d'implémentation
- Écran de la demande d'achat (module WRAP/OPDN), liste Projet filtrée par l'unité de la DA via héritage direction/division.

---
Item Type: US · Parent: F25.4 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: acheteur-informatique
Source: SPEC_OPDN — B.4 Demandes d'achats — écran de la demande
Dépendances: —
