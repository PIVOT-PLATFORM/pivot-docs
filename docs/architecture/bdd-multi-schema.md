---
title: Convention BDD multi-schéma
sidebar_label: BDD multi-schéma
---

## Vue d'ensemble

PIVOT utilise une **instance PostgreSQL partagée** avec un schéma par domaine fonctionnel.
Chaque repo `pivot-xxx-core` gère ses migrations Flyway dans son propre schéma isolé.

| Schéma | Propriétaire | Contenu |
|--------|-------------|---------|
| `public` | pivot-core | `tenants`, `users`, `teams`, `team_members`, `access_tokens`, `module_activations` |
| `pilotage` | pivot-pilotage-core | `roadmap_projects`, `roadmap_tasks`, `portfolio_items`… |
| `agilite` | pivot-agilite-core | `capacity_plans`, `standup_sessions`… |
| `collaboratif` | pivot-collaboratif-core | `whiteboards`, `quiz_sessions`… |

## Règle FK cross-schéma

> **Règle absolue :** les FK cross-schéma sont autorisées **uniquement** vers :
> - `public.teams(id)`
> - `public.tenants(id)`
>
> Un schéma module ne doit **jamais** écrire dans le schéma `public`.

### Exemples corrects

```sql
-- Dans le schéma "pilotage" — FK autorisée vers public.teams(id)
CONSTRAINT fk_roadmap_project_team
    FOREIGN KEY (team_id) REFERENCES public.teams (id) ON DELETE CASCADE,

-- FK autorisée vers public.tenants(id)
CONSTRAINT fk_roadmap_project_tenant
    FOREIGN KEY (tenant_id) REFERENCES public.tenants (id) ON DELETE CASCADE
```

### Exemples interdits

```sql
-- INTERDIT : FK d'un module vers une autre table du schéma public
CONSTRAINT fk_bad FOREIGN KEY (user_id) REFERENCES public.users (id)

-- INTERDIT : FK cross-module (pilotage → agilite)
CONSTRAINT fk_bad FOREIGN KEY (standup_id) REFERENCES agilite.standup_sessions (id)

-- INTERDIT : INSERT/UPDATE dans le schéma public depuis un repo module
INSERT INTO public.users ...
```

## Configuration Flyway par module (EN17.4)

Chaque `pivot-xxx-core` déclare un bean `ModuleFlywayConfigurer` fourni par `fr.pivot:pivot-core-starter` :

```java
// pivot-pilotage-core — PilotageFlywayConfig.java
@Configuration
public class PilotageFlywayConfig {

    @Bean
    public ModuleFlywayConfigurer pilotageFlywayConfigurer() {
        return new ModuleFlywayConfigurer("pilotage", "classpath:db/pilotage");
    }
}
```

`ModuleFlywayConfigurer` applique automatiquement :
- `schemas("pilotage")` — Flyway cible ce schéma uniquement
- `defaultSchema("pilotage")` — les noms non qualifiés résolvent dans ce schéma
- `locations("classpath:db/pilotage")` — scripts de migration du module
- `createSchemas(true)` — création idempotente du schéma (`CREATE SCHEMA IF NOT EXISTS`)

## Template de migration V1 par module

Copier et adapter `V1__init_{schema}.sql` ci-dessous pour chaque nouveau schéma de module.

Le fichier template est disponible dans ce répertoire :
[`V1__init_{schema}.sql`](./V1__init_%7Bschema%7D.sql)

```sql
-- V1__init_{schema}.sql — Template de bootstrap pour un schéma de module PIVOT
--
-- Remplacer {schema} par le nom du schéma du module (ex. "pilotage", "agilite").
-- Règle FK cross-schéma (EN17.4) : seules public.teams(id) et public.tenants(id)
-- sont des cibles autorisées.

-- ================================================================
-- EXAMPLE TABLE avec FK cross-schéma autorisées
-- ================================================================
CREATE TABLE IF NOT EXISTS {schema}.items (
    id          BIGSERIAL    NOT NULL,
    tenant_id   BIGINT       NOT NULL,  -- FK → public.tenants(id)
    team_id     BIGINT,                 -- FK → public.teams(id)
    label       VARCHAR(255) NOT NULL,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),

    CONSTRAINT pk_{schema}_items PRIMARY KEY (id),

    -- FK cross-schéma autorisées uniquement vers public.tenants et public.teams
    CONSTRAINT fk_{schema}_items_tenant
        FOREIGN KEY (tenant_id) REFERENCES public.tenants (id) ON DELETE CASCADE,
    CONSTRAINT fk_{schema}_items_team
        FOREIGN KEY (team_id) REFERENCES public.teams (id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_{schema}_items_tenant_id ON {schema}.items (tenant_id);
CREATE INDEX IF NOT EXISTS idx_{schema}_items_team_id   ON {schema}.items (team_id)
    WHERE team_id IS NOT NULL;
```

## Nommage des migrations

Respecter la convention Flyway :

```text
db/{schema}/
├── V1__{description}.sql      # migration initiale (schéma, tables)
└── V2__{description}.sql      # migration suivante (uniquement après BETA — cf. CLAUDE.md)
```

Avant la première BETA produit : tout changement de schéma est plié dans `V1__` (pas de `V2__`
séparé), même convention que `pivot-core/src/main/resources/db/migration/V1__schema_init.sql`.

## Gestion des rôles PostgreSQL (recommandation)

Pour une isolation réseau maximale, chaque schéma de module devrait être possédé par un rôle
PostgreSQL dédié avec des droits limités au schéma concerné :

```sql
-- Exemple pour le module "pilotage"
CREATE ROLE pivot_pilotage_app LOGIN PASSWORD '…';
GRANT USAGE ON SCHEMA pilotage TO pivot_pilotage_app;
GRANT ALL ON ALL TABLES IN SCHEMA pilotage TO pivot_pilotage_app;
-- Accès lecture seule aux tables pivot-core référencées par FK
GRANT SELECT ON public.teams   TO pivot_pilotage_app;
GRANT SELECT ON public.tenants TO pivot_pilotage_app;
```

Cette configuration est optionnelle en développement mais recommandée en production.

## Tests d'isolation schéma (Testcontainers)

Chaque repo module doit inclure un test Testcontainers validant :
1. Le schéma module est créé par Flyway.
2. Les migrations s'exécutent dans le schéma module uniquement.
3. Aucune écriture dans le schéma `public`.

Référence : `pivot-core/pivot-core-starter/src/test/.../ModuleSchemaIsolationIntegrationTest.java`

## Références

- [EN17.4 — Convention BDD multi-schéma](../backlog/)
- `fr.pivot.core.db.ModuleFlywayConfigurer` (pivot-core-starter)
- `pivot-core/src/main/resources/db/migration/V1__schema_init.sql` (schéma public de référence)
