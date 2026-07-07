-- ============================================================
-- V1__init_{schema}.sql — Bootstrap template for a PIVOT module schema
--
-- Usage:
--   1. Copy this file as V1__init_{your_schema}.sql into db/{your_schema}/
--   2. Replace all occurrences of {schema} with your module schema name
--      (e.g. "pilotage", "agilite", "collaboratif")
--   3. Declare a ModuleFlywayConfigurer bean in your Spring config (see README)
--
-- EN17.4 FK cross-schema rule:
--   Cross-schema foreign keys are allowed ONLY toward:
--     - public.teams(id)
--     - public.tenants(id)
--   A module schema must NEVER write to the public schema.
-- ============================================================

-- ================================================================
-- EXAMPLE TABLE with allowed cross-schema FKs
-- Replace this with your actual module tables.
-- ================================================================
CREATE TABLE IF NOT EXISTS {schema}.items (
    id          BIGSERIAL    NOT NULL,

    -- Tenant isolation — every module table should carry tenant_id
    -- for multi-tenant filtering and cross-schema FK integrity.
    tenant_id   BIGINT       NOT NULL,

    -- Team association — optional, only if the entity is team-scoped.
    team_id     BIGINT,

    label       VARCHAR(255) NOT NULL,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),

    CONSTRAINT pk_{schema}_items PRIMARY KEY (id),

    -- ----------------------------------------------------------------
    -- Cross-schema FKs — ONLY public.tenants and public.teams allowed
    -- ----------------------------------------------------------------
    CONSTRAINT fk_{schema}_items_tenant
        FOREIGN KEY (tenant_id) REFERENCES public.tenants (id) ON DELETE CASCADE,

    CONSTRAINT fk_{schema}_items_team
        FOREIGN KEY (team_id) REFERENCES public.teams (id) ON DELETE SET NULL
);

-- Index on tenant_id — every module table accessed by tenant must have this
CREATE INDEX IF NOT EXISTS idx_{schema}_items_tenant_id
    ON {schema}.items (tenant_id);

-- Partial index on team_id — only when team association is used
CREATE INDEX IF NOT EXISTS idx_{schema}_items_team_id
    ON {schema}.items (team_id)
    WHERE team_id IS NOT NULL;
