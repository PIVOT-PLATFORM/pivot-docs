# US41.2.2 — Aide contextuelle par écran

**En tant que** utilisateur
**Je veux** obtenir l'aide **spécifique à l'écran courant** (et au module) d'un simple clic
**Afin de** réduire le temps de recherche d'information

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un écran d'un module, when je demande l'aide, then les articles/tours liés à cet écran sont proposés en priorité | ⬜ |
| Given mon rôle, when l'aide s'affiche, then le contenu est filtré selon le rôle pertinent (taxonomie des rôles) | ⬜ |
| Error : given un écran sans article ni tour rattaché (contenu pas encore rédigé), when l'aide contextuelle est demandée, then l'utilisateur bascule sur la recherche du centre d'aide général (US41.2.1) plutôt qu'un résultat vide | ⬜ |

## Hors périmètre

- Rédaction du mapping écran → article — relève du processus éditorial de F41.3, pas du mécanisme lui-même

## Notes d'implémentation

- Le rattachement écran → contenu doit être maintenable sans redéploiement (mapping déclaratif), pour suivre l'évolution des écrans sans dette de documentation

---
Item Type: US · Parent: F41.2 · Module: core · Phase: phase-3 · Size: S · Priority: Low
Stage: Backlog
Profils: Tous
Justification: Formation & onboarding — adoption de Pivot (in-app, supports, présentiel) ; cf. Insight I8 (réseau de référents)
Dépendances: EN41.1 (framework onboarding)
