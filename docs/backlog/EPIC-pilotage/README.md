# E18 — Domaine Pilotage (socle technique)

> **Sous-ensemble opérationnel du domaine Pilotage.** Ce dossier n'héberge que le **socle
> technique** du domaine — les enablers non spéculatifs, extraits de l'ombrelle E18 pour le
> [Sprint 9](../sprints/sprint-9.md) (re-tri du 2026-07-10 « valeur pilotage avant idéation »).
>
> L'ombrelle E18 (rôle documentaire) et les enablers d'**habillage entreprise** EN18.3-8
> (Cloud/SaaS RGPD, localisation RGAA, perf de consolidation, admin sans code, hébergement FR/UE,
> on-premise) **restent en idéation** → [`BACKLOG-IDEATION/EPIC-pilotage`](../BACKLOG-IDEATION/EPIC-pilotage/README.md).
> Leur promotion = décision explicite du mainteneur.

## Objectif

Poser le socle de données et d'accès partagé par **tous** les modules du domaine Pilotage
(E21 Risques, E22 Roadmap, E23 Portefeuille, E24 ADR projet, E26 Budget, E27 OKR…) : schéma
`pilotage`, hiérarchie Application → Projet, guard de module, et la couture de profil par défaut
qui découple le domaine du moteur adaptatif E40 (verrouillé en idéation).

## Enablers (socle technique — Sprint 9, Gate 1 passé)

| Enabler | Titre | Size | Priority | Stage |
|---------|-------|------|----------|-------|
| [EN18.1](ENABLERS/en-schema-flyway-pilotage.md) | Schéma Flyway `pilotage` + entités JPA | M | Critical | ⬜ |
| [EN18.2](ENABLERS/en-guard-angular-pilotage.md) | Guard Angular module pilotage | S | Critical | ⬜ |
| [EN18.9](ENABLERS/en-modele-application-projet.md) | Modèle Application → Projet | M | High | ⬜ |
| [EN18.10](ENABLERS/en-profil-organisation-defaut.md) | Profil d'organisation par défaut (couture de découplage d'E40) | M | High | ⬜ |
| [EN18.11](ENABLERS/en-exposer-kpi.md) | Exposer les KPI du domaine | S | Medium | ⬜ |

> **Dépendances / séquencement** (cf. [`sprint-9.md`](../sprints/sprint-9.md)) : EN18.1 précède tout ·
> EN18.1 dépend d'EN17.4 (`ModuleFlywayConfigurer`) · EN18.10 fournit l'altitude/activation par
> défaut consommée par [E22 Roadmap](../EPIC-roadmap/README.md) sans dépendre d'E40.
