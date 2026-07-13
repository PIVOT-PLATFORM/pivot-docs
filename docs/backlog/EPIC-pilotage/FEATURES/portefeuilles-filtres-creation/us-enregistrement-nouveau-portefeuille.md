# US18.13.3 — Enregistrement d'un nouveau portefeuille

**En tant que** gestionnaire de portefeuille
**Je veux** enregistrer un nouveau portefeuille en lui donnant un nom valide
**Afin de** conserver le regroupement d'activités et le retrouver dans l'écran général

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given des filtres appliqués, when le portefeuille est valide, then le bouton « enregistrer » est vert (sinon disabled) et ouvre la pop-up « Enregistrer Portefeuille » | ⬜ |
| Given la pop-up « Enregistrer Portefeuille », when je saisis le nom, then il est limité à 80 caractères et requiert au minimum 1 caractère, avec les boutons annuler/confirmer | ⬜ |
| Given un enregistrement en cours, when je confirme, then la pop-up reste ouverte jusqu'à la fin de l'enregistrement | ⬜ |
| Given un enregistrement réussi, when il se termine, then le portefeuille est affiché dans l'écran général | ⬜ |
| Error : given un enregistrement en échec, system affiche « Veuillez réessayer d'enregistrer votre portefeuille. Si le problème persiste, veuillez contacter le support. » | ⬜ |
| Security/Gouvernance : seul un gestionnaire de portefeuille peut enregistrer un portefeuille | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'abandon de la création via le bouton Annuler (US dédiée).

## Notes d'implémentation
- Module pilotage (OPDN), pop-up « Enregistrer Portefeuille », nom 1 à 80 caractères.
- Bouton « enregistrer » vert/disabled ; pop-up bloquante pendant l'enregistrement.

---
Item Type: US · Parent: F18.13 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: gestionnaire-de-portefeuille
Source: SPEC_OPDN — B.9 Portefeuilles — filtres & création
Dépendances: —
