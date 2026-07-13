# US18.2.6 — Naviguer entre les années

**En tant que** contrôleur de gestion SI (responsable budgétaire)
**Je veux** disposer d'un carrousel de sélection des années visible et harmonisé
**Afin de** naviguer entre les exercices budgétaires facilement

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given les vues budgétaires, when je consulte la sélection des années, then un carrousel de sélection des années est visible | ⬜ |
| Given les écrans PDS Pluriannuel et Élaboration PMT, when je les compare, then le carrousel de sélection des années est harmonisé entre les deux | ⬜ |
| Error : given une année sans donnée, system affiche la vue vide de l'année sans provoquer d'erreur | ⬜ |
| Security/Gouvernance : la navigation entre années respecte les habilitations d'accès aux données budgétaires | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le classement des lignes par phase est couvert par l'US Classer et filtrer les données budgétaires.

## Notes d'implémentation
- Carrousel de sélection des années (module pilotage), commun aux vues PDS Pluriannuel et Élaboration PMT.

---
Item Type: US · Parent: F18.2 · Module: pilotage · Phase: phase-3 · Size: XS · Priority: Medium
Stage: ⬜
Rôle: controleur-de-gestion-si
Source: Backlog OPPA (reconstitution v1–v2.1) — US-206
Dépendances: —
