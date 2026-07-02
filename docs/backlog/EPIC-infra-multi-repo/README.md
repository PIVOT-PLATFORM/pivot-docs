# E17 — Infrastructure multi-repo

## Objectif

Mettre en place les prérequis techniques permettant de créer les repos modules (`pivot-pilotage-*`, `pivot-agilite-*`, `pivot-collaboratif-*`) de manière autonome, sans dupliquer la logique socle.

## Périmètre

- Enabler EN17.1 : Publication `pivot-core-starter` (Maven artifact, GitHub Packages)
- Enabler EN17.2 : Publication `@pivot/design-system` (npm package, GitHub Packages)
- Enabler EN17.3 : Publication `@pivot/ui-core` (npm package, GitHub Packages)
- Enabler EN17.4 : Convention BDD multi-schéma + migration Flyway baseline stabilisée
- Enabler EN17.5 : Template repo `pivot-xxx-core`
- Enabler EN17.6 : Template repo `pivot-xxx-ui`
- [Enabler EN17.7 : nginx API Gateway — routing multi-backend par préfixe URL](ENABLERS/en-nginx-api-gateway.md)

## Phase

⬜ **phase-3** — prérequis MVP non bloquant · déclencher quand E03 (module system) est Done

## Dépendances

- Dépend de : E03 Système de modules (EN03.1 — interface PivotModule)
- Dépend de : E07 Infrastructure (EN07.1 Docker Compose prod)

## Statut global

⬜ Non démarré — Backlog phase-3

---

Item Type: Epic · Clé: E17 · Phase: phase-3 · Enablers: 7 (EN17.1–7)
Stage: Backlog · Priority: High
