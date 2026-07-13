# US18.2.3 — Dupliquer une ligne budgétaire

**En tant que** contrôleur de gestion SI (responsable budgétaire)
**Je veux** dupliquer une ligne budgétaire
**Afin de** créer rapidement une ligne similaire sans tout ressaisir

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une ligne existante, when je la duplique, then les informations principales sont reprises, hors montants et commentaires | ⬜ |
| Given une duplication effectuée, when la nouvelle ligne apparaît, then le bouton Enregistrer apparaît immédiatement | ⬜ |
| Error : given une ligne dupliquée non enregistrée, system conserve l'état non enregistré sans écraser la ligne source | ⬜ |
| Security/Gouvernance : seul un contrôleur de gestion SI habilité peut dupliquer une ligne budgétaire | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La sécurisation du couple MO/HMO après duplication est traitée dans l'US Modifier une ligne budgétaire.

## Notes d'implémentation
- Écran budgets de l'activité (module pilotage), action de duplication.
- Reprise des informations principales sauf montants et commentaires ; bouton Enregistrer immédiatement disponible.

---
Item Type: US · Parent: F18.2 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: controleur-de-gestion-si
Source: Backlog OPPA (reconstitution v1–v2.1) — US-203
Dépendances: —
