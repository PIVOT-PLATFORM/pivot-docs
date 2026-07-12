# ADR-027 — Modèle organisationnel : unités & équipes, deux plans (partage vs management)

**Date :** 2026-07-12
**Statut :** Accepté
**Décideurs :** Architecte plateforme, Product Owner, Mainteneur
**Contexte technique :** `pivot-core` (schéma `public` : `org_levels`, `org_units`, `teams`, `team_members`, `org_delegation`), `pivot-ui` (organigramme + gestion), tous les `pivot-xxx-core` (FK cross-schéma vers `public.teams`/`public.org_units`), [E15 — Organisation & Équipes](pathname:///pivot-docs/backlog/EPIC-equipes/)

---

## Contexte

L'[EPIC E15](pathname:///pivot-docs/backlog/EPIC-equipes/) était jusqu'ici spécifiée comme un
simple modèle d'équipes plates : `teams(name, parent_team_id)` + `team_members(team_id, user_id)`
en association N-N pure, avec une hiérarchie d'arbre anticipée sur `parent_team_id`
(EN17.1, `pivot-core#171`, entités créées en avance de phase comme fondation Socle ;
principal d'authentification minimal partagé tranché par
[ADR-022](pathname:///pivot-docs/adr/ADR-022-principal-authentification-minimal-partage)).
Cette forme minimale
ne dit rien de la **sémantique** que les modules attendent réellement d'une hiérarchie
d'organisation :

1. **Managers / responsables** — qui dirige une équipe, comment on le distingue d'un simple membre.
2. **Nœuds supérieurs typés** — un organigramme d'entreprise/groupe est fait de niveaux nommés
   (pôle < département < division < direction < entreprise < groupe), chacun avec un responsable et
   un état-major (comité de direction), et ces niveaux varient d'une organisation à l'autre.
3. **Délégation** — un responsable délègue son autorité, par défaut à un pair, plus rarement à un
   subordonné, pour une durée bornée.
4. **Escalade graduée** — un responsable a le droit `X`, le responsable au-dessus a `X+Y` :
   l'autorité s'accumule en remontant la ligne managériale.

Ces besoins font éclater deux hypothèses implicites du modèle plat. D'une part, une équipe de
travail (les gens qui collaborent) n'est pas la même chose qu'une **unité organisationnelle** (la
maille structurelle : une division *contient* des équipes). D'autre part, une hiérarchie ne
propage pas « tout » de façon uniforme : l'**accès aux ressources** et l'**autorité managériale**
se comportent en sens opposés. Confondre les deux — et c'est le piège classique — conduit soit à
des fuites d'accès (un directeur voit par défaut tous les fichiers de sa direction), soit à une
hiérarchie de management inutile (un responsable sans autorité sur son sous-arbre).

Cet ADR fige le modèle qui lève ces ambiguïtés, en cohérence avec
[ADR-006](pathname:///pivot-docs/adr/ADR-006-multi-repo-architecture) (FK cross-schéma limitées à
`public.teams`/`public.tenants`, étendues ici à `public.org_units`) et
[ADR-023](pathname:///pivot-docs/adr/ADR-023-modele-entites-catalogue) (le Kind catalogue `Team`
reste une projection directe de `public.teams`).

## Décision

### 1. Principe directeur — deux plans orthogonaux

Une hiérarchie organisationnelle porte **deux relations distinctes** qui ne propagent pas dans le
même sens. Les modéliser séparément est la décision fondatrice de cet ADR.

| Plan | Propagation | Règle |
|------|-------------|-------|
| **Partage de ressources** (accès aux données/projets d'un module) | **aucune** | strict par équipe : seuls les **membres directs** de l'équipe ciblée accèdent — jamais de cascade descendante vers les sous-unités, jamais de remontée vers les parents |
| **Autorité managériale** (responsabilité, validation, escalade) | **cumulative vers le haut** | un responsable couvre **tout son sous-arbre** ; le responsable d'une unité parente hérite de l'autorité des unités filles (`X` au pôle, `X+Y` à la division…) |

Conséquence directe : déplacer une unité dans l'arbre ne change **jamais** silencieusement qui
accède à une ressource déjà partagée (le partage est ancré sur l'équipe, pas sur la position dans
l'arbre). Inversement, rattacher une unité sous une autre étend bien l'autorité managériale du
responsable parent — c'est le sens d'un organigramme.

### 2. Deux concepts : `org_units` (structure) vs `teams` (les gens)

- **Unité organisationnelle (`org_units`)** : la maille *structurelle* de l'organigramme — pôle,
  département, division, direction, entreprise, groupe. Elle est typée par un niveau, hiérarchisée
  (arbre), et possède un responsable et un état-major. Elle ne « contient » pas directement des
  utilisateurs : elle contient des équipes.
- **Équipe de travail (`teams`)** : un collectif de personnes rattaché à une unité. C'est l'entité
  déjà existante (`public.teams`, EN17.1), enrichie. C'est **elle**, et elle seule, qui est la
  cible d'un partage de ressource et le point d'ancrage de l'appartenance (`team_members`).

L'**arbre organisationnel vit sur `org_units.parent_org_unit_id`, pas sur les équipes.** La colonne
`teams.parent_team_id`, ajoutée en anticipation par EN17.1, est **remplacée par `teams.org_unit_id`**
(rattachement à une unité) — deux arbres concurrents (un sur les unités, un sur les équipes) seraient
une source de divergence. Ce remplacement est sans coût de migration de retrofit tant que la règle
« `V1__schema_init.sql` unique avant BETA » de `pivot-core` tient (cf. §10).

### 3. Échelle de niveaux **configurable par tenant** (`org_levels`)

Les organisations n'ont pas toutes la même profondeur : une startup a deux niveaux, un groupe en a
sept, et les libellés diffèrent (« pôle » ici, « business unit » ailleurs). Figer une enum globale
serait rigide. Chaque tenant définit donc sa propre **échelle ordonnée** de niveaux, seedée à la
création du tenant avec un modèle par défaut (`pôle < département < division < direction <
entreprise < groupe`).

L'ordre est porté par un entier `rank` : plus grand `rank` = plus haut dans la hiérarchie. Il sert
à l'invariant de cohérence de l'arbre (§4) et à l'affichage.

### 4. `org_units` — arbre typé et ses invariants

- `parent_org_unit_id` nullable : `NULL` ⇒ unité racine (souvent le niveau le plus haut, ex.
  « groupe »). Structure en arbre.
- **Invariants** (validés applicativement à toute affectation de parent) :
  - **I1 — same-tenant** : `parent.tenant_id = enfant.tenant_id`. Un parent cross-tenant est un
    IDOR hiérarchique (règle d'isolation tenant de `pivot-core`) → rejet.
  - **I2 — pas de cycle** : une unité ne peut être son propre ancêtre.
  - **I3 — cohérence de niveau** : `enfant.rank < parent.rank`. Une division ne peut pas contenir
    une direction. Les **sauts** de niveau sont autorisés (un pôle directement sous une direction),
    seule l'inversion est interdite.
- Suppression d'une unité : ses enfants sont re-rattachés à leur **grand-parent** (`ON DELETE` géré
  applicativement pour préserver la connexité du sous-arbre) plutôt que promus racines — à
  confirmer à l'implémentation d'EN15.1.

### 5. `teams` enrichi et `team_members.role`

`teams` gagne : `org_unit_id` (rattachement, nullable — une équipe peut être orpheline), `kind ∈
{WORKING, LEADERSHIP}`, et les attributs de présentation `slug` (unique par tenant, URL-safe),
`color`, `description`.

`team_members` gagne `role ∈ {RESPONSABLE, ADJOINT, MEMBRE}` (au lieu de l'association N-N sans
sémantique) et un `updated_at` (le rôle *évolue* — promotion —, l'appartenance n'est plus
immuable, ce qui **révise** la Javadoc initiale de `TeamMember`).

- `RESPONSABLE` : 0..1 par équipe — le manager. Peut gérer l'équipe et ses membres.
- `ADJOINT` : 0..N — adjoints / membres de l'état-major.
- `MEMBRE` : appartenance simple.

L'autorité de **gestion** d'une équipe (renommer, inviter, supprimer) est portée par son
`RESPONSABLE`, avec repli sur `ROLE_ADMIN` tenant. Comme le partage (plan 1), cette autorité de
gestion **ne cascade pas** le long de l'arbre : être responsable d'une unité parente ne donne pas
la gestion directe des équipes des unités filles (c'est l'autorité *managériale* du plan 2 qui
remonte, pas le droit d'édition CRUD).

### 6. État-major & responsable d'unité = une équipe `LEADERSHIP`

L'état-major (comité de direction) d'une unité est matérialisé par une **équipe dédiée** : une
`teams` de `kind = LEADERSHIP` rattachée à l'unité (`org_unit_id`). Ce choix — plutôt qu'un simple
filtre de rôles — reflète que l'état-major est souvent un organe de travail à part entière
(réunions, partages propres, membres non-managers invités).

Il en découle une définition unique et sans ambiguïté :

- **Responsable d'une unité** = le membre `RESPONSABLE` de son équipe `LEADERSHIP`.
- **État-major d'une unité** = les membres (`RESPONSABLE` + `ADJOINT`) de son équipe `LEADERSHIP`.

Une dénormalisation optionnelle `org_units.responsable_user_id` peut être ajoutée pour l'affichage
rapide de l'organigramme, sans être la source de vérité (qui reste l'appartenance `LEADERSHIP`).

### 7. Appartenance directe vs effective (double notion)

Deux notions de premier plan, exposées **distinctement** par l'API (`?scope=direct|effective`) :

- **Membre direct** : une ligne `team_members` existe.
- **Effectif d'une unité** : `effectif(unité) = membres des teams de l'unité ∪ effectif(unités
  enfants)` — un roll-up sur l'arbre `org_units` (un directeur « voit » l'effectif de toute sa
  direction).

⚠️ L'effectif est un outil de **vision / reporting / organigramme uniquement** — il ne donne
**aucun accès**. Seule l'appartenance directe à l'équipe *spécifiquement partagée* ouvre l'accès
(plan 1, §1). C'est le point de cohérence entre « double notion » et « partage strict ».

### 8. Délégation (`org_delegation`)

Un responsable délègue son autorité managériale sur une unité pour une durée bornée. Entité dédiée,
séparée de l'appartenance (elle n'altère ni `team_members` ni le partage) :

`org_delegation(org_unit_id, delegator_user_id, delegate_user_id, scope ∈ {UNIT, SUBTREE},
from_date, to_date, motif)`.

- Délégataire par défaut : un **pair** (autre responsable de même niveau, ou un `ADJOINT`).
- Plus rarement : un membre d'un nœud inférieur (`scope = SUBTREE`).
- Bornée dans le temps (`from_date`/`to_date`) — visualisée sur la carte du manager.

### 9. Escalade graduée — **différée** (renvoi à ADR-013)

La structure managériale (ligne des `RESPONSABLE`, niveaux) est posée ici ; les **seuils gradués**
(`X` au pôle, `X+Y` à la division…) et le **routage d'escalade** ne sont **pas** modélisés dans le
schéma team. Ils relèveront de l'autorisation externalisée policy-as-code
([ADR-013](pathname:///pivot-docs/adr/ADR-013-autorisation-externalisee-policy-as-code)) : le
modèle organisationnel fournit la ligne hiérarchique (« remonter les `RESPONSABLE` via
`parent_org_unit_id` »), le moteur de policy décide des droits par niveau. Recoder des seuils
d'autorisation en dur dans le schéma contredirait ADR-013 — d'où le report explicite.

### 10. Séquencement du schéma (portée de l'anticipation)

Toute l'anticipation n'a pas le même coût. On distingue :

- **Replié maintenant dans `V1__schema_init.sql`** (deltas peu coûteux, déjà justifiés, même
  logique que `parent_team_id`) : `teams.slug/color/description`, `teams.org_unit_id` (en
  remplacement de `parent_team_id`), `team_members.role`/`updated_at`. Une simple FK `org_unit_id`
  nullable sans table `org_units` matérialisée reste inerte tant qu'E15 est verrouillé.
- **Différé au déverrouillage d'E15** (machinerie complète, anticipation spéculative évitée) :
  `org_levels`, `org_units`, `org_delegation`. Le schéma cible ci-dessous en fixe la forme, mais il
  n'est créé qu'à l'implémentation d'EN15.1.

### Schéma cible (forme figée, matérialisation par phase — cf. §10)

```sql
-- ORG_LEVELS — échelle configurable par tenant (différé EN15.1)
CREATE TABLE IF NOT EXISTS org_levels (
    id          BIGSERIAL   NOT NULL,
    tenant_id   BIGINT      NOT NULL,
    name        VARCHAR(60) NOT NULL,
    rank        INT         NOT NULL,   -- plus grand = plus haut
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT pk_org_levels PRIMARY KEY (id),
    CONSTRAINT uq_org_levels_tenant_name UNIQUE (tenant_id, name),
    CONSTRAINT uq_org_levels_tenant_rank UNIQUE (tenant_id, rank),
    CONSTRAINT fk_org_levels_tenant FOREIGN KEY (tenant_id) REFERENCES tenants (id) ON DELETE CASCADE
);

-- ORG_UNITS — nœud de l'organigramme (différé EN15.1)
CREATE TABLE IF NOT EXISTS org_units (
    id                  BIGSERIAL    NOT NULL,
    tenant_id           BIGINT       NOT NULL,
    name                VARCHAR(255) NOT NULL,
    slug                VARCHAR(255) NOT NULL,
    description         TEXT,
    level_id            BIGINT       NOT NULL,
    parent_org_unit_id  BIGINT,
    created_at          TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    CONSTRAINT pk_org_units PRIMARY KEY (id),
    CONSTRAINT uq_org_units_tenant_slug UNIQUE (tenant_id, slug),
    CONSTRAINT fk_org_units_tenant FOREIGN KEY (tenant_id) REFERENCES tenants (id) ON DELETE CASCADE,
    CONSTRAINT fk_org_units_level  FOREIGN KEY (level_id)  REFERENCES org_levels (id),
    -- invariants I1 (same-tenant) / I2 (pas de cycle) / I3 (rank enfant < parent) : applicatifs
    CONSTRAINT fk_org_units_parent FOREIGN KEY (parent_org_unit_id) REFERENCES org_units (id) ON DELETE SET NULL
);

-- TEAMS — delta replié dès maintenant (§10)
-- + slug (unique/tenant), + color, + description, + org_unit_id (remplace parent_team_id),
-- + kind {WORKING, LEADERSHIP}
--   fk_teams_org_unit FOREIGN KEY (org_unit_id) REFERENCES org_units (id) ON DELETE SET NULL

-- TEAM_MEMBERS — delta replié dès maintenant (§10)
-- + role {RESPONSABLE, ADJOINT, MEMBRE}, + updated_at

-- ORG_DELEGATION — délégation bornée (différé EN15.4)
CREATE TABLE IF NOT EXISTS org_delegation (
    id                 BIGSERIAL    NOT NULL,
    tenant_id          BIGINT       NOT NULL,
    org_unit_id        BIGINT       NOT NULL,
    delegator_user_id  BIGINT       NOT NULL,
    delegate_user_id   BIGINT       NOT NULL,
    scope              VARCHAR(10)  NOT NULL,  -- UNIT | SUBTREE
    from_date          TIMESTAMPTZ  NOT NULL,
    to_date            TIMESTAMPTZ,
    motif              TEXT,
    created_at         TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    CONSTRAINT pk_org_delegation PRIMARY KEY (id),
    CONSTRAINT fk_delegation_tenant FOREIGN KEY (tenant_id)   REFERENCES tenants (id)   ON DELETE CASCADE,
    CONSTRAINT fk_delegation_unit   FOREIGN KEY (org_unit_id) REFERENCES org_units (id) ON DELETE CASCADE,
    CONSTRAINT fk_delegation_from   FOREIGN KEY (delegator_user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_delegation_to     FOREIGN KEY (delegate_user_id)  REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT chk_delegation_scope CHECK (scope IN ('UNIT', 'SUBTREE'))
);
```

## Alternatives écartées

- **Nœud unique `Team` enrichi d'un `level`** (une division = une équipe de niveau DIVISION) —
  rejeté : plus simple, mais amalgame la maille structurelle et le collectif de personnes ; une
  division « contient » des équipes, forcer les deux dans une seule table aurait rendu ambigu le
  partage (partager à une division ≠ partager à une équipe) et l'appartenance.
- **Échelle de niveaux figée en enum globale** — rejeté : les organisations diffèrent trop en
  profondeur et en vocabulaire ; une enum unique aurait forcé chaque tenant atypique à détourner
  des libellés.
- **État-major comme simple filtre de rôles sur l'équipe de l'unité** — rejeté au profit d'une
  équipe `LEADERSHIP` dédiée : l'état-major est souvent un organe de travail (partages propres,
  invités non-managers) qu'un filtre de rôles ne peut pas porter.
- **Escalade graduée modélisée dans le schéma team** (table `level_capabilities`, seuils par
  niveau) — rejeté : recoderait de l'autorisation dans le schéma, à contre-courant d'ADR-013
  (policy-as-code). La structure suffit ici ; les seuils vivront dans le moteur de policy.
- **Propagation uniforme de la hiérarchie** (accès *et* autorité cascadent pareil) — rejeté : c'est
  précisément l'erreur que le principe « deux plans » (§1) corrige ; elle produit soit des fuites
  d'accès, soit une hiérarchie de management inopérante.
- **Conserver `teams.parent_team_id` en plus de `org_units`** — rejeté : deux arbres concurrents
  (unités et équipes) divergent inévitablement ; l'arbre est porté par `org_units`, les équipes
  s'y rattachent à plat.

## Conséquences

- **Positif :** modèle qui répond aux quatre besoins de visualisation (managers, nœuds supérieurs
  typés, délégation, escalade) sans confondre accès et autorité ; réutilise l'existant
  (`public.teams`, FK cross-schéma d'ADR-006) ; l'anticipation coûteuse (OrgUnit) est figée en
  spec mais pas matérialisée prématurément pour un epic verrouillé (§10) ; l'escalade graduée est
  proprement renvoyée là où elle appartient (ADR-013).
- **Négatif :** deux entités (`org_units` + `teams`) au lieu d'une — plus de tables, de FK et
  d'écrans qu'un annuaire plat ; les invariants I1–I3 et l'effectif transitif (§7) sont portés
  applicativement (pas de contrainte SQL native), donc à couvrir par des tests dédiés ; la Javadoc
  de `TeamMember` (« appartenance immuable, N-N pure ») doit être révisée (rôle + `updated_at`).
- **Interdit :** partager une ressource « à une unité » avec cascade implicite vers ses
  sous-unités (viole le plan 1) ; dériver un droit d'accès de l'appartenance *effective* (§7) ;
  recréer un arbre sur `teams.parent_team_id` en parallèle de `org_units` (§2) ; coder des seuils
  d'escalade dans le schéma team (§9, renvoi ADR-013) ; un `parent_org_unit_id` cross-tenant (I1).

## Points ouverts

- **Politique de suppression d'unité** (re-rattachement au grand-parent vs promotion racine) —
  esquissée §4, à confirmer à l'implémentation d'EN15.1.
- **Dénormalisation `org_units.responsable_user_id`** — optionnelle (§6), à trancher selon les
  besoins de performance de l'organigramme côté `pivot-ui`.
- **Cycle de vie / archivage** — l'archivage (soft-delete) des équipes et unités a été écarté au
  profit d'une suppression dure ; à revisiter avant EN15.1 si un besoin « désactiver sans casser
  les partages existants » émerge (la suppression dure est destructive vis-à-vis des FK
  cross-schéma des ressources déjà partagées).
- **Escalade graduée** — entièrement différée (§9), à spécifier via un enabler adossé à ADR-013.
- **Groupe multi-tenant** — l'arbre organisationnel vit dans un seul tenant (I1) ; le niveau
  « groupe » est modélisé comme racine intra-tenant. Un véritable groupe couvrant plusieurs
  tenants (holding multi-sociétés isolées) est hors périmètre et relèverait d'une décision
  distincte sur la frontière de tenant.

## Historique

| Version | Date | Évolution |
|---------|------|-----------|
| v1 | 2026-07-12 | Décision initiale — raffinage du concept d'équipes en modèle organisationnel à deux plans |
