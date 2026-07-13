# US18.13.4 — Bouton Annuler

**En tant que** gestionnaire de portefeuille
**Je veux** quitter la création d'un portefeuille via le bouton Annuler
**Afin de** revenir à la page d'affichage des portefeuilles sans enregistrer

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given la vue de création d'un portefeuille, when je clique sur le bouton « Annuler », then je quitte la création | ⬜ |
| Given l'annulation effectuée, when je quitte la création, then je retourne à la page d'affichage des portefeuilles | ⬜ |
| Given des filtres saisis non enregistrés, when j'annule, then aucun portefeuille n'est créé | ⬜ |
| Error : given une annulation, system n'enregistre aucune donnée saisie durant la création | ⬜ |
| Security/Gouvernance : seul un gestionnaire de portefeuille accède à la création et à son annulation | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'annulation depuis la pop-up d'enregistrement (couverte par l'US enregistrement).

## Notes d'implémentation
- Module pilotage (OPDN), bouton « Annuler » de la vue de création.
- Retour à la page d'affichage des portefeuilles.

---
Item Type: US · Parent: F18.13 · Module: pilotage · Phase: phase-3 · Size: XS · Priority: Medium
Stage: ⬜
Rôle: gestionnaire-de-portefeuille
Source: SPEC_OPDN — B.9 Portefeuilles — filtres & création
Dépendances: —
