# US18.1.3 — Contrôler la validité du nom d'activité

**En tant que** utilisateur final
**Je veux** être empêché de créer un nom avec espaces en début/fin ou en doublon pour un même type d'activité
**Afin de** garantir des noms d'activités fiables et non ambigus

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un nom d'activité comportant des espaces en début ou en fin, when je tente d'enregistrer, then le système bloque la création | ⬜ |
| Given un nom déjà utilisé pour le même type d'activité, when je tente d'enregistrer, then le système détecte le doublon en ignorant la casse et bloque la création | ⬜ |
| Error : given un nom en doublon (casse ignorée) ou avec espaces début/fin, system refuse l'enregistrement et signale la cause du refus | ⬜ |
| Security/Gouvernance : le contrôle d'unicité s'applique par type d'activité et reste actif quel que soit l'utilisateur | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le contrôle des noms de portefeuille est couvert par une US dédiée (portefeuille).

## Notes d'implémentation
- Contrôle appliqué à la création/renommage d'activité ; comparaison insensible à la casse et par type d'activité.
- Rejet des espaces de début/fin (trim de contrôle) avant enregistrement.

---
Item Type: US · Parent: F18.1 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: utilisateur-final
Source: Backlog OPPA (reconstitution v1–v2.1) — US-103
Dépendances: —
