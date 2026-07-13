# US25.7.2 — Onglet « Division »

**En tant que** administrateur plateforme
**Je veux** afficher et créer des divisions depuis l'onglet « Division »
**Afin de** rattacher les divisions à leur direction et y déclarer des rôles hérités

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'onglet « Division », when je clique sur « + Ajouter une division », then je peux déclarer une division par un nom et un code, rattachée à une direction | ⬜ |
| Given le niveau division, when j'ajoute des rôles, then ces rôles sont hérités par les unités et organisations rattachées | ⬜ |
| Error : given un administrateur local, system ne lui permet de voir et créer des divisions que sur les directions sur lesquelles il a les droits | ⬜ |
| Security/Gouvernance : la gestion des divisions est réservée à l'administrateur (A) ; ni P, ni V, ni CM (NON/NON/NON/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La gestion des directions et des unités est couverte par leurs US dédiées.

## Notes d'implémentation
- Module Administration (OPDN, B.7), onglet « Division », bouton « + Ajouter une division ».
- Une division appartient à une direction, déclarée par un nom et un code.
- Rôles au niveau division hérités par unités/organisations.
- Restriction admin local : visibilité et création limitées aux directions autorisées.

---
Item Type: US · Parent: F25.7 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: administrateur-plateforme
Source: SPEC_OPDN — B.7 Module Administration
Dépendances: —
