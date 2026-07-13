# US18.9.1 — Consulter les photos financières

**En tant que** gestionnaire de portefeuille (décideur)
**Je veux** consulter un écran dédié aux photos financières
**Afin de** disposer d'instantanés budgétaires pour appuyer mes décisions

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'écran dédié Photos Financières, when je l'ouvre, then je consulte les instantanés budgétaires (photos) du périmètre auquel j'ai accès | ⬜ |
| Given plusieurs photos financières disponibles, when je sélectionne une photo, then l'instantané budgétaire correspondant s'affiche à sa date de prise | ⬜ |
| Error : given aucune photo financière disponible sur le périmètre, system affiche un message explicite d'absence de données plutôt qu'un écran vide | ⬜ |
| Security/Gouvernance : seul le gestionnaire de portefeuille (décideur) habilité peut consulter les photos financières de son périmètre | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'accès aux rapports Power BI est couvert par l'US Accéder aux rapports Power BI.
- La production/prise des instantanés budgétaires (batch) relève d'un traitement technique hors de cette US.

## Notes d'implémentation
- Écran dédié Photos Financières (module pilotage) : consultation d'instantanés budgétaires en lecture seule.

---
Item Type: US · Parent: F18.9 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: gestionnaire-de-portefeuille
Source: Backlog OPPA (reconstitution v1–v2.1) — US-901
Dépendances: —
