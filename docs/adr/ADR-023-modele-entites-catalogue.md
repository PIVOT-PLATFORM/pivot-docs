# ADR-023 — Modèle d'entités du catalogue, réconcilié avec `public.teams`

**Date :** 2026-07-09
**Statut :** Proposé
**Décideurs :** Architecte plateforme, Product Owner
**Contexte technique :** `pivot-core` (schéma `public`, portail catalogue), `pivot-pilotage-core` (schéma `pilotage`), `pivot-agilite-core` (schéma `agilite`), futur `pivot-risk-core` (schéma `risk`, cf. §6 Extensibilité), adaptateurs E28 (`pivot-docs/docs/backlog/EPIC-integration-open-source/`)

---

## Contexte

[ADR-009](pathname:///pivot-docs/adr/ADR-009-cadre-integration-open-source) définit le contrat d'intégration à six capacités (`PivotAdapter`), dont la capacité **Entités** — « déclarer au catalogue ce que la brique contient » — et cite un premier jet de neuf Kinds : `Project · Portfolio · Contract · Vendor · Team · Capacity · Decision(ADR) · Requirement · Epic`. Ce jet n'a jamais été transformé en modèle de données : ni schéma de stockage, ni forme exacte de `PivotEntity`, ni règle de réconciliation avec l'existant.

Deux enablers backlog bloquent explicitement sur ce point :

- **EN28.2** (« Catalogue d'entités étendu ») liste encore les 9 entités d'origine et dépend d'un ADR de modèle d'entités — ancienne numérotation (ADR-017) avant la renumérotation actée au Sprint 7 (cf. [ADR-009](pathname:///pivot-docs/adr/ADR-009-cadre-integration-open-source), Historique v1.3).
- **EN28.10** a déjà anticipé un dixième Kind, **Application** (hiérarchie `Application 1..n Projet`, EN18.9), sans que le modèle « officiel » d'EN28.2 ne soit mis à jour — incohérence entre les deux enablers que cet ADR tranche.

La difficulté de fond est une tension entre deux décisions déjà actées :

1. **[ADR-006](pathname:///pivot-docs/adr/ADR-006-multi-repo-architecture)** : une seule instance PostgreSQL, un schéma Flyway par module, **FK cross-schéma interdites sauf vers `public.teams`/`public.tenants`**, jamais de FK inter-modules.
2. **[ADR-008](pathname:///pivot-docs/adr/ADR-008-domaines-modules-cockpits)** : la composabilité du domaine Pilotage exige de relier des entités qui vivent dans des schémas différents (ex. un risque du schéma `risk` et un projet du schéma `pilotage`) — résolu au cas par cas par un identifiant logique (`project_ref`) propagé sur le bus, jamais par FK.

Le catalogue doit exposer un graphe de relations **à travers** ces schémas (un `Risk` relié à `Project`, `Portfolio`, `Vendor`, `Contract`, `Decision` — cf. US21.1.6, US21.4.5 du module [E21](pathname:///pivot-docs/backlog/EPIC-risk/)) sans jamais recréer, à l'échelle plateforme, la FK inter-modules qu'ADR-006/008 interdisent. C'est précisément le problème que cet ADR doit résoudre — et le backlog le documente déjà comme non résolu (`docs/backlog/sprints/zones-ombre.md`, item 14).

Une seconde question, non structurante mais bloquante pour l'implémentation, est restée ouverte dans EN28.2/EN28.10 : le vocabulaire standard d'un *software catalog* (`Component`/`API`/`Resource`/`System`/`Domain`, façon Backstage/Port/Cortex/OpsLevel) doit-il rejoindre le modèle PPM ci-dessus ? Les deux seuls consommateurs de ce vocabulaire (F28.10 — adaptateurs GitLab CE/Forgejo, F28.11 — scorecards/scaffolding/TechDocs) ont été **déplacés en `BACKLOG-IDEATION` le 2026-07-09** (« hors domaine PIVOT », cf. `EPIC-integration-open-source/README.md`) — cet ADR referme ce point pour le périmètre actif (voir §Décision point 7 et §Alternatives écartées).

## Décision

### 1. Le catalogue est une projection, pas une source de vérité — sauf pour `Team`

`public.catalog_entities` n'héberge **jamais** la donnée métier complète d'une entité. Chaque Kind reste possédé par son schéma/outil d'origine (le « système de vérité ») ; le catalogue n'en stocke qu'une projection légère (identité, libellé, statut, relations, classe de souveraineté) utile à la recherche, aux cockpits (ADR-008) et aux liens profonds. Dupliquer la donnée complète romprait la propriété par schéma qu'ADR-006 vient d'établir et créerait une seconde source de vérité à resynchroniser.

**Exception : `Team`.** `public.teams`/`public.team_members` (ADR-006, EN17.1) sont déjà la source de vérité partagée, dans le même schéma que le catalogue lui-même (`public`, propriété `pivot-core`). Le Kind `Team` du catalogue est donc une **projection en lecture directe** de `public.teams` — jamais une ligne dupliquée dans `catalog_entities`, jamais produite via `toEntities()`. Aucun adaptateur ni module ne « déclare » une Team : elle existe déjà.

### 2. Les 10 Kinds fondateurs

Cet ADR fige la liste à **10 Kinds**, alignée sur EN28.10 (qui avait déjà anticipé l'ajout d'`Application`) — EN28.2, resté à 9, doit être mis à jour en conséquence à son implémentation.

| Kind | Source de vérité (schéma.table) | Origine | Rattachement `public.teams`/`public.tenants` |
|---|---|---|---|
| **Team** | `public.teams` / `public.team_members` | Core (projection directe, pas de `toEntities()`) | *Est* `public.teams` — hiérarchie `parent_team_id` (E15) |
| **Application** | `pilotage.applications` | Natif (`pivot-pilotage-core`) | `team_id` → `public.teams.id` (nullable) |
| **Project** | `pilotage.roadmap_projects` | Natif + adaptateurs (Plane, OpenProject/ProjeQtOr — ideation) | `team_id` → `public.teams.id` ; `application_id` intra-schéma (EN18.9) |
| **Portfolio** | `pilotage.portfolios` (+ jonction `pilotage.portfolio_items`) | Natif | `team_id` optionnel (portefeuille souvent multi-équipes) |
| **Contract** | `pilotage.contracts` | Natif (CLM, « vide côté OSS » — US28.5.2) | via `Project`/`Vendor`, pas de FK directe |
| **Vendor** | `pilotage.vendors` | Natif (CLM) | via `Contract` |
| **Decision** (ADR projet) | `pilotage.project_adrs` | Natif (US24.1.1) | `project_id` intra-schéma `pilotage` |
| **Capacity** | `agilite.capacity_plans` | Natif (E11) | `team_id` → `public.teams.id` |
| **Requirement** | *(aucun schéma propriétaire à ce jour)* | Aucune US ne le produit encore | Placeholder — cf. §Points ouverts |
| **Epic** | *(aucun schéma PIVOT — adaptateur uniquement)* | Adaptateurs delivery-agile (Plane, Taiga — US28.1.1) | via `Project` |

**Décision de placement Contract/Vendor.** Ni ADR-008 ni le backlog n'attribuent aujourd'hui un module de capacité dédié au CLM (le module « CLM (Pilotage) » est cité par US21.4.5 sans EPIC propre). Cet ADR tranche : `Contract`/`Vendor` vivent dans le schéma `pilotage` (`pivot-pilotage-core`), au même titre que Roadmap/Portefeuille/ADR/Budget/Commande publique — cohérent avec le principe déjà acté par ADR-008 que « la séparation physique en repos distincts reste incrémentale ». Si le périmètre CLM grossit, il suivra le même chemin de scission que `risk` (E21) : nouveau schéma `clm` + repo dédié, sans changer la forme du catalogue (le Kind ne change pas, seul son `owner_module` est réédité).

**Décision de périmètre Epic.** Le Kind `Epic` du catalogue désigne exclusivement un epic agile issu d'un outil de delivery tiers (Plane/Taiga). Il **n'est jamais** une projection de la hiérarchie `EPIC-xxx` du backlog `pivot-docs` — ce sont deux concepts homonymes et non liés : le premier est une donnée catalogue multi-tenant orientée exécution delivery, le second est la documentation produit de PIVOT lui-même. Aucun adaptateur ne doit les confondre.

### 3. Le type `PivotEntity`

Complète le contrat `toEntities(raw: UpstreamPayload): PivotEntity[]` d'ADR-009 :

```typescript
/** Les 10 Kinds fondateurs (ADR-023). Liste ouverte — cf. §6 Extensibilité. */
export type FoundingKind =
  | "Team" | "Application" | "Project" | "Portfolio" | "Contract"
  | "Vendor" | "Decision" | "Capacity" | "Requirement" | "Epic";

export interface PivotEntity {
  kind: FoundingKind | string;        // string = Kind additionnel enregistré (§6)
  ref: string;                        // "{source}:{kind}:{localId}" — ex. "pilotage:project:482"
  label: string;
  status?: string;
  teamRef?: string;                   // résolu server-side vers public.teams.id — jamais un id brut transmis par l'adaptateur
  sovereignty: "A" | "B" | "C";       // héritée du module/adaptateur déclarant (ADR-015), cf. §5
  deepLink: string;
  attributes: Record<string, unknown>;  // forme typée par le schéma YAML versionné du Kind (catalog_kinds.schema_ref)
  relations?: Array<{ type: string; ref: string }>;
}
```

`ref` formalise, comme convention unique, ce que le backlog utilise déjà de façon ad hoc (`project_ref`, `vendor_ref`, `contract_ref` dans E21) : un identifiant logique opaque, jamais une FK. Côté `pivot-core`, la même forme est exposée en Java (`fr.pivot.core.catalog.CatalogEntity`, record miroir) pour le portail catalogue (EN28.1).

**Attributs indicatifs par Kind** (forme des `attributes`, non exhaustive — versionnée par Kind, cf. §6) :

| Kind | `attributes` (extrait) |
|---|---|
| Project | `description, dateDebut, dateFin, status (DRAFT·ACTIVE·ON_HOLD·COMPLETED·CANCELLED), applicationRef` |
| Application | `description` (relation inverse : liste des `Project` rattachés) |
| Portfolio | `description, ragStatus` (relation : `Project` membres) |
| Contract | `vendorRef, startDate, endDate, status` (émet `contract.due`) |
| Vendor | `name, category` |
| Decision | `status (PROPOSED·ACCEPTED·DEPRECATED·SUPERSEDED), projectRef, supersededByRef` |
| Capacity | `teamRef, periodType (SPRINT·INCREMENT·PI), startDate, endDate, netCapacityDays, focusFactor, velocityN1` |
| Epic | `projectRef, status, sourceSystem ("plane"\|"taiga")` |
| Requirement | `description, status` — squelette minimal, cf. §Points ouverts |

### 4. Stockage catalogue — schéma `public` (pivot-core)

Le catalogue n'est pas un schéma module : c'est une capacité plateforme (ADR-009 §6 le place déjà dans `pivot-core/`). Il rejoint donc `public`, au même titre que `module_activations`/`plans`/`feature_flags` — des tables ajoutées incrémentalement à `public` sans figurer dans le tableau original d'ADR-006, précédent déjà établi. Convention `V1__schema_init.sql` unique avant BETA (cf. `pivot-core/CLAUDE.md`) : ces tables se plient dans le fichier existant, pas de `V2__`.

```sql
-- ================================================================
-- TABLE: catalog_kinds — registre des Kinds autorisés (allow-list)
-- ================================================================
CREATE TABLE IF NOT EXISTS catalog_kinds (
    kind            VARCHAR(40)  NOT NULL,
    schema_version  VARCHAR(20)  NOT NULL DEFAULT '1.0.0',
    -- NULL = Kind sans propriétaire natif, alimenté uniquement par des adaptateurs (ex. Epic)
    owner_module    VARCHAR(60),
    schema_ref      TEXT         NOT NULL,  -- chemin du schéma YAML versionné, dans le repo propriétaire
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),

    CONSTRAINT pk_catalog_kinds PRIMARY KEY (kind)
);

INSERT INTO catalog_kinds (kind, owner_module, schema_ref) VALUES
    ('Team',        'core',     'pivot-core/catalog-schemas/team.yaml'),
    ('Application', 'pilotage', 'pivot-pilotage-core/catalog-schemas/application.yaml'),
    ('Project',     'pilotage', 'pivot-pilotage-core/catalog-schemas/project.yaml'),
    ('Portfolio',   'pilotage', 'pivot-pilotage-core/catalog-schemas/portfolio.yaml'),
    ('Contract',    'pilotage', 'pivot-pilotage-core/catalog-schemas/contract.yaml'),
    ('Vendor',      'pilotage', 'pivot-pilotage-core/catalog-schemas/vendor.yaml'),
    ('Decision',    'pilotage', 'pivot-pilotage-core/catalog-schemas/decision.yaml'),
    ('Capacity',    'agilite',  'pivot-agilite-core/catalog-schemas/capacity.yaml'),
    ('Requirement', NULL,       'pivot-core/catalog-schemas/requirement.yaml'),
    ('Epic',        NULL,       'adapter-plane/catalog-schemas/epic.yaml')
ON CONFLICT DO NOTHING;

-- ================================================================
-- TABLE: catalog_kind_relations — allow-list des relations Kind→Kind
-- ================================================================
-- C'est ICI, et seulement ici, qu'une relation peut être rejetée par contrainte SQL réelle :
-- le triplet (Kind source, type, Kind cible) doit être pré-déclaré, revue de schéma via PR
-- (cf. US21.1.6). Ne dit rien sur l'existence d'une instance précise — cf. catalog_relations.
CREATE TABLE IF NOT EXISTS catalog_kind_relations (
    from_kind      VARCHAR(40) NOT NULL,
    relation_type  VARCHAR(40) NOT NULL,
    to_kind        VARCHAR(40) NOT NULL,

    CONSTRAINT pk_catalog_kind_relations PRIMARY KEY (from_kind, relation_type, to_kind),
    CONSTRAINT fk_ckr_from FOREIGN KEY (from_kind) REFERENCES catalog_kinds (kind),
    CONSTRAINT fk_ckr_to   FOREIGN KEY (to_kind)   REFERENCES catalog_kinds (kind)
);

INSERT INTO catalog_kind_relations (from_kind, relation_type, to_kind) VALUES
    ('Project',  'belongsTo',     'Application'),
    ('Decision', 'belongsTo',     'Project'),
    ('Epic',     'belongsTo',     'Project'),
    ('Contract', 'issuedTo',      'Vendor'),
    -- Risk n'est pas un Kind fondateur : ajouté par le module risk (§6 Extensibilité)
    ('Risk',     'correlatesTo',  'Project'),
    ('Risk',     'relatesTo',     'Portfolio'),
    ('Risk',     'relatesTo',     'Vendor'),
    ('Risk',     'relatesTo',     'Contract'),
    ('Risk',     'relatesTo',     'Decision')
ON CONFLICT DO NOTHING;

-- ================================================================
-- TABLE: catalog_entities — projection légère, une ligne par entité déclarée
-- ================================================================
CREATE TABLE IF NOT EXISTS catalog_entities (
    id             BIGSERIAL     NOT NULL,
    tenant_id      BIGINT        NOT NULL,
    team_id        BIGINT,
    kind           VARCHAR(40)   NOT NULL,
    entity_ref     VARCHAR(255)  NOT NULL,   -- "{source}:{kind}:{localId}"
    source         VARCHAR(60)   NOT NULL,   -- module id ou adapter id déclarant
    label          VARCHAR(255)  NOT NULL,
    status         VARCHAR(30),
    sovereignty    CHAR(1)       NOT NULL DEFAULT 'C',  -- A/B/C, héritée du module/adaptateur (ADR-015)
    deep_link      TEXT,
    attributes     JSONB         NOT NULL DEFAULT '{}',
    declared_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ   NOT NULL DEFAULT NOW(),

    CONSTRAINT pk_catalog_entities PRIMARY KEY (id),
    CONSTRAINT uq_catalog_entities_ref UNIQUE (tenant_id, entity_ref),
    CONSTRAINT fk_ce_tenant FOREIGN KEY (tenant_id) REFERENCES tenants (id) ON DELETE CASCADE,
    CONSTRAINT fk_ce_team   FOREIGN KEY (team_id)   REFERENCES teams (id)   ON DELETE SET NULL,
    CONSTRAINT fk_ce_kind   FOREIGN KEY (kind)       REFERENCES catalog_kinds (kind),
    CONSTRAINT chk_ce_sovereignty CHECK (sovereignty IN ('A', 'B', 'C'))
);

CREATE INDEX IF NOT EXISTS idx_ce_tenant_kind ON catalog_entities (tenant_id, kind);
CREATE INDEX IF NOT EXISTS idx_ce_team_id ON catalog_entities (team_id) WHERE team_id IS NOT NULL;

-- ================================================================
-- TABLE: catalog_relations — instances de relations entre entités déclarées
-- ================================================================
CREATE TABLE IF NOT EXISTS catalog_relations (
    id               BIGSERIAL    NOT NULL,
    tenant_id        BIGINT       NOT NULL,
    from_entity_ref  VARCHAR(255) NOT NULL,
    from_kind        VARCHAR(40)  NOT NULL,
    relation_type    VARCHAR(40)  NOT NULL,
    to_entity_ref    VARCHAR(255) NOT NULL,
    to_kind          VARCHAR(40)  NOT NULL,
    -- false = to_entity_ref pas encore vu au catalogue ("projet non résolu", cf. US21.9.1) —
    -- mis à jour par la reconciliation bus, jamais rejeté à l'écriture.
    resolved         BOOLEAN      NOT NULL DEFAULT true,
    declared_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),

    CONSTRAINT pk_catalog_relations PRIMARY KEY (id),
    CONSTRAINT uq_catalog_relations UNIQUE (tenant_id, from_entity_ref, relation_type, to_entity_ref),
    CONSTRAINT fk_cr_tenant FOREIGN KEY (tenant_id) REFERENCES tenants (id) ON DELETE CASCADE,
    -- C'est CETTE FK qui rejette une relation au moment de sa déclaration si le triplet
    -- (Kind source, type, Kind cible) n'est pas dans l'allow-list — satisfait l'AC d'erreur
    -- de US21.1.6 sans jamais exiger que to_entity_ref existe déjà (voir "resolved" ci-dessus).
    CONSTRAINT fk_cr_kind_pair FOREIGN KEY (from_kind, relation_type, to_kind)
        REFERENCES catalog_kind_relations (from_kind, relation_type, to_kind)
);

CREATE INDEX IF NOT EXISTS idx_cr_from ON catalog_relations (tenant_id, from_entity_ref);
CREATE INDEX IF NOT EXISTS idx_cr_to   ON catalog_relations (tenant_id, to_entity_ref);
```

Cette conception répond aux deux AC en apparence contradictoires du backlog : **US21.1.6** exige un rejet à la déclaration si la relation utilise une Kind inconnue ou une FK inter-modules directe — la FK sur `catalog_kind_relations` le fait réellement, en SQL. **US21.9.1** exige qu'un `project_ref` pas encore vu ne soit jamais rejeté, seulement marqué « non résolu » — `to_entity_ref` n'a délibérément aucune FK vers `catalog_entities.entity_ref` ; `resolved` porte cette information et est corrigé après coup par la réconciliation bus.

### 5. Ingestion et classe de souveraineté

Chaque module natif et chaque adaptateur implémente `toEntities()` (ADR-009 §4 — même contrat, natif ou adaptateur, EN28.3) ; le service catalogue (EN28.1) ingère ce flux dans `catalog_entities`/`catalog_relations`, par sondage périodique couplé au endpoint santé (EN28.6) au minimum, avec en complément des événements d'upsert/suppression sur le bus (le schéma exact de ces événements relève d'ADR-025, hors périmètre ici). **`Team` ne suit jamais ce chemin** — projection directe (§1).

La classe de souveraineté A/B/C (ADR-015) est une propriété du **module ou de l'adaptateur déclarant**, pas du Kind : deux instances du même Kind `Project` peuvent porter des classes différentes (native `pilotage` = zone A, un futur adaptateur OpenProject hébergé hors PIVOT = zone B/C). `catalog_entities.sovereignty` est donc stampée à l'ingestion depuis la classe enregistrée du `source`, jamais fixée par Kind dans `catalog_kinds`.

### 6. Extensibilité — nouveaux Kinds et sous-typage

La liste des 10 Kinds n'est pas fermée. Un module ajoute un nouveau Kind en :
1. publiant un schéma YAML versionné décrivant sa forme d'`attributes` et les relations qu'il peut porter (`catalog_kind_relations`) ;
2. faisant relire ce schéma en PR (gouvernance identique à une déclaration d'entité, cf. AC sécurité de US21.1.6 : réservé Dev/admin) ;
3. l'enregistrant dans `catalog_kinds` — aucune modification de `catalog_entities`/`catalog_relations` n'est nécessaire (stockage polymorphe déjà générique).

Le module `risk` (E21, futur `pivot-risk-core`) est l'exemple de référence : il ajoute le Kind `Risk` (hors des 10 fondateurs) avec des relations vers `Project`, `Portfolio`, `Vendor`, `Contract`, `Decision` — exactement le chemin ci-dessus, déjà seedé en §4.

**Sous-typage.** Quand une brique candidate n'est pas un nouveau concept mais une spécialisation d'un Kind existant, elle porte un champ `subtype` dans `attributes` plutôt que de créer un Kind racine (ex. un futur `Contract.subtype = "marché-public"` pour la Commande publique, E25, plutôt qu'un Kind `PublicContract` séparé). Ce mécanisme est un filet de repli, pas la voie par défaut — un nouveau Kind reste préférable dès que la sémantique diverge réellement (cf. §7 pour pourquoi `Component`/`Resource` ne sont, pour l'instant, ni l'un ni l'autre).

### 7. Hors périmètre — vocabulaire *software catalog*

Le vocabulaire Backstage/Port/Cortex/OpsLevel (`Component`, `API`, `Resource`, `System`, `Domain`) **ne rejoint pas** le modèle. Ses deux seuls consommateurs identifiés — F28.10 (adaptateurs GitLab CE/Forgejo) et F28.11 (scorecards/scaffolding/TechDocs) — ont été déplacés en `BACKLOG-IDEATION` le 2026-07-09 (« hors domaine PIVOT »). Figer un vocabulaire technique pour des features qui ne sont plus au périmètre actif serait prématuré. Si F28.10/F28.11 reviennent au périmètre actif, ils suivent le chemin d'extension du §6 (nouveau groupe de Kinds), sans modification de ce modèle de stockage.

## Alternatives écartées

- **Catalogue = source de vérité unique** (dupliquer la donnée métier complète dans `catalog_entities`) — rejeté : contredit la propriété par schéma d'ADR-006, crée une resynchronisation permanente entre le catalogue et chaque module.
- **FK réelles cross-schéma vers un hub catalogue central** — rejeté : viole ADR-006 (FK cross-schéma limitées à `public.teams`/`public.tenants`) et recrée exactement le couplage inter-modules qu'ADR-008 a démantelé pour `risk` en introduisant `project_ref`.
- **Une table dédiée par Kind** (10 tables typées dans `public`) plutôt qu'un stockage polymorphe — rejeté : chaque nouveau Kind exigerait une migration Flyway sur `pivot-core`, contredisant la promesse EN28.2 « déclarable via un fichier YAML versionné » sans redéploiement du socle catalogue.
- **Adopter immédiatement le vocabulaire Backstage** (`Component`/`API`/`Resource`/`System`/`Domain`) en parallèle des 10 Kinds PPM — rejeté pour l'instant : ses seuls consommateurs (F28.10/F28.11) sont désormais en ideation, hors périmètre actif (§7).
- **Sous-typer `Component`/`Resource` sous `Project`/`Requirement`** (Option B d'EN28.10) — rejeté pour l'instant, même raison, et risque de sémantique bâtarde : un dépôt Git n'est pas un projet PPM, forcer l'un dans l'autre aurait fragilisé les deux modèles.
- **`to_entity_ref` avec FK stricte vers `catalog_entities`** — rejeté : rejetterait toute relation dont la cible n'est pas encore ingérée, contredisant l'AC « projet non résolu » de US21.9.1 (cohérence éventuelle assumée, pas intégrité référentielle SGBD).

## Conséquences

- **Positif :** modèle unique et concret pour EN28.2/EN28.10, débloquant leur implémentation ; réconciliation explicite et sans ambiguïté avec `public.teams` (`Team` = projection, jamais dupliquée) ; extensibilité prouvée par l'exemple `risk` sans modification de schéma catalogue ; les deux AC en tension du backlog (rejet strict au niveau Kind vs tolérance « non résolu » au niveau instance) sont satisfaites par deux contraintes SQL distinctes, pas par de la logique applicative fragile.
- **Négatif :** `catalog_entities.attributes` en JSONB sacrifie une part de validation SQL forte au profit de la flexibilité déclarative — la validation de forme par Kind doit être portée applicativement (contre le `schema_ref` versionné), pas par des contraintes PostgreSQL ; EN28.2 doit être réédité pour passer de 9 à 10 entités avant son implémentation.
- **Interdit :** dupliquer la donnée métier complète d'un Kind dans `catalog_entities` au-delà de la projection décrite ici ; ajouter une FK directe de `catalog_relations.to_entity_ref` vers `catalog_entities.entity_ref` (romprait la tolérance « non résolu ») ; déclarer un nouveau Kind sans revue de schéma PR (gouvernance identique à une US catalogue existante, cf. AC sécurité US21.1.6).

## Points ouverts

- **Vocabulaire *software catalog*** — fermé pour le périmètre actif par §7 ; à rouvrir explicitement si F28.10/F28.11 reviennent hors `BACKLOG-IDEATION`.
- **Schéma propriétaire définitif de `Contract`/`Vendor`** — provisoirement `pilotage` (§2) ; à revisiter si un domaine CLM autonome émerge (précédent `risk`/E21).
- **`Requirement`** — aucune US ne le produit à ce jour ; le squelette d'attributs proposé (§3) est un point de départ, à réviser dès qu'une US concrète (probablement adossée à E13 Cahiers de tests, ou un futur module d'exigences) le spécifie.
- **Mécanique de transport de l'ingestion** (sondage vs événements `catalog.entity.upserted`/`catalog.entity.deleted`) — esquissée en §5, le schéma d'événements précis relève d'ADR-025 (Bus d'événements), hors périmètre de cet ADR.

## Historique

| Version | Date | Évolution |
|---------|------|-----------|
| v1 | 2026-07-09 | Décision initiale |
