# US18.2.4 — Supprimer une ligne budgétaire

**En tant que** contrôleur de gestion SI (responsable budgétaire)
**Je veux** supprimer une ligne via un bouton dédié
**Afin de** retirer une ligne budgétaire obsolète en toute sécurité

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une ligne budgétaire, when j'active le bouton de suppression dédié, then une confirmation est demandée avant suppression | ⬜ |
| Given une confirmation de suppression, when la demande s'affiche, then un rappel des montants existants est présenté pour éviter les suppressions accidentelles | ⬜ |
| Error : given une suppression non confirmée, system annule l'opération et conserve la ligne | ⬜ |
| Security/Gouvernance : seul un contrôleur de gestion SI habilité peut supprimer une ligne budgétaire | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La restauration/corbeille d'une ligne supprimée n'est pas couverte par cette US.

## Notes d'implémentation
- Écran budgets de l'activité (module pilotage), bouton de suppression dédié.
- Confirmation avec rappel des montants existants avant suppression.

---
Item Type: US · Parent: F18.2 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: controleur-de-gestion-si
Source: Backlog OPPA (reconstitution v1–v2.1) — US-204
Dépendances: —
