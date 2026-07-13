# US25.7.1 — Onglet « Direction »

**En tant que** administrateur plateforme
**Je veux** afficher et créer des directions depuis l'onglet « Direction »
**Afin de** structurer l'organisation et y rattacher des rôles hérités

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'onglet « Direction », when je clique sur « + Ajouter une direction », then je peux déclarer une direction par un nom et un code, le code liant l'AD Microsoft à la direction | ⬜ |
| Given le niveau direction (niveau le plus haut), when j'ajoute des rôles, then ces rôles sont hérités par les divisions, unités et organisations rattachées | ⬜ |
| Given la création d'un rôle, when je le déclare, then un modèle de mail et une « personne physique » sont requis | ⬜ |
| Error : given un administrateur local, system ne lui affiche que les directions sur lesquelles il a les droits et ne lui permet pas de créer de direction | ⬜ |
| Security/Gouvernance : la gestion des directions est réservée à l'administrateur (A) ; ni P, ni V, ni CM (NON/NON/NON/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La gestion des divisions et unités est couverte par leurs US dédiées.

## Notes d'implémentation
- Module Administration (OPDN, B.7), onglet « Direction », bouton « + Ajouter une direction ».
- Direction déclarée par un nom et un code (le code lie l'AD Microsoft à la direction).
- Rôles au niveau direction (niveau le plus haut) hérités par divisions/unités/organisations ; création de rôle exigeant un modèle de mail et une « personne physique ».
- Restriction admin local : lecture seule sur ses directions, pas de création.

---
Item Type: US · Parent: F25.7 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: administrateur-plateforme
Source: SPEC_OPDN — B.7 Module Administration
Dépendances: —
