# US22.8.3 — Weekends & jours fériés par pays / localité

**En tant que** chef de projet
**Je veux** appliquer les weekends et jours fériés d'un pays / d'une localité (import d'un fournisseur de fériés, weekend configurable par région)
**Afin de** planifier sur le temps réellement ouvré, où que soit l'équipe

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un pays/région, when je l'associe à un calendrier, then ses jours fériés sont importés (fournisseur type API fériés) et exclus de l'ordonnancement | ⬜ |
| Given une localité à weekend non standard (ex. vendredi–samedi), when je la configure, then l'ordonnancement respecte ce weekend | ⬜ |
| Given une équipe multi-pays, when des tâches sont réparties, then chaque tâche/ressource suit le calendrier de sa localité | ⬜ |
| Given une mise à jour du référentiel de fériés (année N+1), when elle est publiée, then les calendriers se rafraîchissent | ⬜ |

---
Item Type: US · Parent: F22.8 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: Backlog
Rôle: chef-de-projet
Profils: Tous
Justification: Interopérabilité / interfaces inter-modules & SI (ADR-010, bus PIVOT + deep-links ADR-006/008)
Dépendances: EN22.1 · EN22.3 (connecteurs calendrier)
