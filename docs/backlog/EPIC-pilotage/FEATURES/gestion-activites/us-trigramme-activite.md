# US18.1.5 — Identifier rapidement une activité par son trigramme

**En tant que** utilisateur final
**Je veux** voir le nom d'activité précédé de son trigramme dans les en-têtes
**Afin de** identifier rapidement l'activité en cours de consultation

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une activité disposant d'un trigramme, when j'ouvre l'en-tête Informations, then le nom d'activité est précédé de son trigramme | ⬜ |
| Given les en-têtes Budgets, Jalons et Risques, when je les consulte, then le nom d'activité y apparaît également précédé de son trigramme | ⬜ |
| Error : given une activité sans trigramme renseigné, system affiche le nom seul sans provoquer d'erreur | ⬜ |
| Security/Gouvernance : l'affichage du trigramme est en lecture seule dans les en-têtes | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La règle de génération/attribution du trigramme n'est pas couverte par cette US.

## Notes d'implémentation
- En-têtes concernés : Informations, Budgets, Jalons, Risques (module pilotage).
- Préfixe trigramme + nom d'activité dans le titre d'en-tête.

---
Item Type: US · Parent: F18.1 · Module: pilotage · Phase: phase-3 · Size: XS · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Backlog OPPA (reconstitution v1–v2.1) — US-105
Dépendances: —
