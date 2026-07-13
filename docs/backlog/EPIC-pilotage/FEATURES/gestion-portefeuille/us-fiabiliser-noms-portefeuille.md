# US18.5.2 — Fiabiliser les noms de portefeuille

**En tant que** utilisateur final
**Je veux** être empêché d'enregistrer un portefeuille dont le nom commence par des espaces
**Afin de** garantir des noms de portefeuille propres et fiables

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un nom de portefeuille commençant par des espaces, when je tente d'enregistrer, then le système bloque l'enregistrement | ⬜ |
| Given un nom de portefeuille sans espace initial, when j'enregistre, then l'enregistrement est accepté | ⬜ |
| Error : given un nom commençant par des espaces, system refuse l'enregistrement et signale la cause | ⬜ |
| Security/Gouvernance : le contrôle de nom s'applique quel que soit l'utilisateur créant ou renommant le portefeuille | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le contrôle des noms d'activité (doublon, espaces début/fin) est couvert par une US dédiée (activité).

## Notes d'implémentation
- Contrôle appliqué à la création/renommage de portefeuille (module pilotage) : rejet des espaces en début de nom.

---
Item Type: US · Parent: F18.5 · Module: pilotage · Phase: phase-3 · Size: XS · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Backlog OPPA (reconstitution v1–v2.1) — US-502
Dépendances: —
