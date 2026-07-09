# US36.1.2 — API et interfaces standardisées

**En tant que** DSI
**Je veux** des API ouvertes documentées, des connecteurs BI et un datamart de pilotage croisant PPM et données externes (finances, RH)
**Afin d'** ouvrir les données de pilotage au SI décisionnel et croiser les sources

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'API ouverte documentée, when un système tiers l'appelle, then les données de pilotage sont exposées de façon standardisée | ⬜ |
| Un datamart croise les données PPM avec finances et RH pour le décisionnel | ⬜ |
| Error : given un appel API non authentifié ou hors périmètre, system le refuse | ⬜ |
| Security/Gouvernance : les accès API sont authentifiés, tracés et limités par périmètre | ⬜ |

## Hors périmètre
- Les connecteurs BI (Power BI, etc.) livrent une intégration de référence ; l'intégration à tout outil BI tiers non couvert par ces connecteurs de référence n'est pas garantie dans cette US.
- L'interface avec les SI financiers publics (rapprochement M57, Coriolis, Grand Angle) est traitée par US36.1.1, pas ici.
- La construction du reporting décisionnel personnalisé au-delà du datamart livré relève de l'extensibilité low-code (US36.1.4).

## Notes d'implémentation
- API exposée par `pivot-pilotage-core`, documentée (OpenAPI) pour consommation par un SI tiers ou un outil BI.
- Le datamart croise les entités du schéma `pilotage` (projets, budgets) avec des données finances/RH externes : nécessite une stratégie d'import/synchronisation à définir (batch vs API) avant implémentation.
- L'authentification et le traçage des accès API s'appuient sur le modèle d'auth déjà en place pour le module pilotage (tokens applicatifs, FK `public.teams.id` pour le scoping par organisation).

---
Item Type: US · Parent: F36.1 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: Backlog
Source: PP-026 · MoSCoW: Must · Lot: Lot 2 · Origine: PM (Datamart) + MS (Power BI)
Profils: Grand groupe, Privée sous droit public, Publique, État
Justification: Dossier §5.2
Dépendances: —
