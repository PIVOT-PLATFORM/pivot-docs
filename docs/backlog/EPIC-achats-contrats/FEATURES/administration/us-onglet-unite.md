# US25.7.3 — Onglet « Unité »

**En tant que** administrateur plateforme
**Je veux** afficher et créer des unités depuis l'onglet « Unité »
**Afin de** rattacher les unités à leur direction et division et y déclarer des rôles hérités

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'onglet « Unité », when je clique sur « + Ajouter une unité », then je peux déclarer une unité par un nom et un code, rattachée à une direction et une division | ⬜ |
| Given le niveau unité, when j'ajoute des rôles, then ces rôles sont hérités par les organisations rattachées | ⬜ |
| Error : given un administrateur local, system ne lui permet de créer des unités que sur les directions et divisions sur lesquelles il a les droits | ⬜ |
| Security/Gouvernance : la gestion des unités est réservée à l'administrateur (A) ; ni P, ni V, ni CM (NON/NON/NON/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La gestion des directions et des divisions est couverte par leurs US dédiées.

## Notes d'implémentation
- Module Administration (OPDN, B.7), onglet « Unité », bouton « + Ajouter une unité ».
- Une unité appartient à une direction et une division, déclarée par un nom et un code.
- Rôles au niveau unité hérités par les organisations.
- Restriction admin local : création limitée aux directions/divisions autorisées.

---
Item Type: US · Parent: F25.7 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: administrateur-plateforme
Source: SPEC_OPDN — B.7 Module Administration
Dépendances: —
