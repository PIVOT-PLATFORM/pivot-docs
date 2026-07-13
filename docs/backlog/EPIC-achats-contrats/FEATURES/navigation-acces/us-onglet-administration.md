# US25.1.6 — Onglet « Administration »

**En tant que** administrateur de la plateforme
**Je veux** accéder à l'onglet « Administration » regroupant les éléments de configuration
**Afin de** paramétrer l'application

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un administrateur, when il consulte le bandeau de menu à gauche, then l'onglet « Administration » est visible | ⬜ |
| Given l'onglet « Administration », when l'administrateur le sélectionne, then il accède aux éléments de configuration de l'application | ⬜ |
| Given un prescripteur, un vérificateur/valideur ou un contract manager, when il consulte le bandeau de menu, then l'onglet « Administration » n'est pas accessible | ⬜ |
| Error : given un utilisateur non administrateur qui tente d'accéder à l'onglet via une URL directe, system refuse l'accès | ⬜ |
| Security/Gouvernance : onglet « Administration » réservé à l'administrateur — P/V/CM/A (NON/NON/NON/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le détail des écrans de configuration (couverts par les US de la feature Administration).

## Notes d'implémentation
- Bandeau de menu à gauche, visibilité conditionnée au rôle administrateur.
- Module WRAP/OPDN.

---
Item Type: US · Parent: F25.1 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: administrateur-plateforme
Source: SPEC_OPDN — B.1 Navigation générale & accès
Dépendances: —
