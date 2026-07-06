# US03.3.2 — SUPER_ADMIN active/désactive un module par tenant (override)

## Contexte

- US source : [`docs/backlog/EPIC-module-system/FEATURES/activation-super-admin/us-super-admin-override.md`](pathname:///pivot-docs/backlog/EPIC-module-system/FEATURES/activation-super-admin/us-super-admin-override)
- PR : [`pivot-core` #159](https://github.com/PIVOT-PLATFORM/pivot-core/pull/159)
- Dernier commit au moment du figeage (Gate 4 = 100/100) : `3c5c460` (`refactor(modules): extract TenantModuleRecord to remove ModuleActivation/ModuleOverride duplication`)
- Figé avant merge, indépendamment de la recette humaine du mainteneur (`Stage: Done`).

## Spec fonctionnelle

Un `SUPER_ADMIN` peut forcer l'état d'activation d'un module PIVOT pour un tenant précis,
indépendamment du choix fait par l'administrateur de ce tenant (`POST /api/admin/modules/{id}/activate`
côté tenant, US03.1.1/US03.1.2). Cas d'usage visés : support client (activer un module en
diagnostic), essai contractuel temporaire, désactivation d'urgence (incident, non-conformité).

- **Poser un override** (`POST .../override`) : force le module à `enabled` (activé) ou
  `!enabled` (désactivé) pour ce tenant. Idempotent en valeur — reposer le même override deux
  fois de suite ne produit aucun effet de bord observable au-delà de la mise à jour de
  `updated_at`. Applique immédiatement l'état forcé, quel que soit l'état persisté côté choix de
  l'admin du tenant à ce moment — celui-ci reste inchangé en base, simplement masqué tant que
  l'override est actif.
- **Retirer un override** (`DELETE .../override`) : le module revient exactement à l'état que
  l'admin du tenant avait lui-même choisi (dernier appel `activate`/`deactivate` de ce tenant, ou
  désactivé par défaut si jamais touché). Idempotent : appeler `DELETE` sur un couple
  (tenant, module) sans override actif ne produit aucune erreur, renvoie l'état courant
  (déjà celui du choix de l'admin du tenant) sans modification.
- **Coexistence avec les actions de l'admin du tenant** : tant qu'un override est actif, l'admin
  du tenant peut continuer à appeler `activate`/`deactivate` sur son module — son choix est
  persisté normalement (il "prendra effet" dès que le super admin retire l'override), mais
  n'affecte jamais ce qui est effectivement servi au tenant (guard Angular, `@RequiresModule`,
  403/module non chargé) tant que l'override reste posé. Aucune erreur n'est renvoyée à l'admin
  du tenant dans ce cas — il n'a pas connaissance de l'existence d'un override (pas d'exposition
  d'information plateforme à un rôle tenant-scope).
- **Effet immédiat, pas éventuel** : la pose/le retrait d'un override invalide immédiatement
  (write-through) le cache Redis de statut d'activation (`ModuleActivationCacheService`,
  clé `module:status:{tenantId}:{moduleId}`) si l'état effectif transitionne réellement — jamais
  de délai jusqu'à expiration du TTL (60s par défaut) pour ce cas précis.
- **Audit** : chaque appel réussi à `POST`/`DELETE .../override` écrit un `audit_events`
  (`module.override_set` / `module.override_removed`) portant l'identifiant du super admin
  appelant (`superAdminId`) et le tenant ciblé — traçabilité RGPD Art. 30, y compris pour un
  `DELETE` qui n'a rien changé (retrait "à blanc").

## Contrat technique final

### Endpoints

| Méthode | Route | Rôle requis | Body | Réponse |
|---|---|---|---|---|
| `POST` | `/api/superadmin/tenants/{tenantId}/modules/{moduleId}/override` | `ROLE_SUPER_ADMIN` | `{ "enabled": boolean }` | `200` `{ "tenantId", "moduleId", "overridden": true, "enabled" }` |
| `DELETE` | `/api/superadmin/tenants/{tenantId}/modules/{moduleId}/override` | `ROLE_SUPER_ADMIN` | — | `200` `{ "tenantId", "moduleId", "overridden": false, "enabled" }` |

Codes d'erreur : `400` (`enabled` absent du body, validation bean) · `401` (contexte
d'authentification invalide) · `403` (rôle insuffisant, `AccessDeniedException` — comportement
Spring Security par défaut) · `404` `TENANT_NOT_FOUND` (tenantId inexistant) · `404`
`MODULE_NOT_FOUND` (moduleId non enregistré dans le `ModuleRegistry`, géré globalement par
`GlobalExceptionHandler`).

### Schéma BDD

Nouvelle table `public.module_overrides` (migration pliée dans `V1__schema_init.sql`, convention
pré-BETA) :

```sql
CREATE TABLE module_overrides (
    id          BIGSERIAL    NOT NULL,
    tenant_id   BIGINT       NOT NULL,
    module_id   VARCHAR(100) NOT NULL,
    enabled     BOOLEAN      NOT NULL,   -- pas de DEFAULT : toujours une valeur explicite
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    CONSTRAINT pk_module_overrides PRIMARY KEY (id),
    CONSTRAINT uq_mo_tenant_module UNIQUE (tenant_id, module_id),
    CONSTRAINT fk_mo_tenant FOREIGN KEY (tenant_id) REFERENCES tenants (id) ON DELETE CASCADE
);
```

**Décision de conception clé** : table dédiée, distincte de `module_activations` (EN03.1) —
deux niveaux d'autorité différents (admin de tenant vs `SUPER_ADMIN` plateforme) ne partagent
jamais la même ligne/table, pour qu'aucun des deux acteurs ne puisse écraser silencieusement la
décision de l'autre. Colonnes communes (`id`, `tenant_id`, `module_id`, horodatages) factorisées
via un `@MappedSuperclass` package-private (`TenantModuleRecord`, `fr.pivot.core.modules`) —
aucune table ni jointure partagée, juste la mécanique JPA.

### Résolution de l'état effectif

`ModuleActivationService#isEnabled(Long tenantId, String moduleId)` (méthode exportée dans
`pivot-core-starter`, déjà consommée par `ModuleActivationCacheService` et par toute
implémentation `PivotModule#isEnabled` d'un repo module externe) :

1. `module_overrides` — si une ligne existe pour ce couple, sa valeur `enabled` gagne toujours ;
2. à défaut, repli sur `module_activations` (comportement EN03.1 inchangé) ;
3. absence des deux → `false` (défaut sûr).

`activate()`/`deactivate()` (admin de tenant) et `setOverride()`/`removeOverride()`
(`SUPER_ADMIN`) n'écrivent chacun que dans leur propre table ; seule `isEnabled()` les compose.
Un événement `ModuleActivatedEvent`/`ModuleDeactivatedEvent` (réutilisés tels quels, pas de
nouveau type ajouté au `sealed` `ModuleLifecycleEvent`) n'est publié que si l'état **effectif**
transitionne réellement — pas simplement si la table sous-jacente vient de changer.

### Événements d'audit

| Constante | Valeur | Émis par |
|---|---|---|
| `AuditService.MODULE_OVERRIDE_SET` | `module.override_set` | `SuperAdminModuleOverrideController#setOverride` |
| `AuditService.MODULE_OVERRIDE_REMOVED` | `module.override_removed` | `SuperAdminModuleOverrideController#removeOverride` |

`meta` (JSONB) : `{"tenantId", "moduleId", "enabled" (POST uniquement), "superAdminId"}`.

## Écarts vs ACs

- **AC "Override enregistré en BDD (priorité sur le plan)"** : au moment de cette implémentation,
  US03.3.1 (`pivot-core` PR #153, plans/modules par plan) n'a pas encore câblé l'enforcement
  plan → activation dans `isEnabled()` (scope explicitement différé par cette US elle-même). En
  l'absence de ce câblage, "priorité sur le plan" est donc concrètement "priorité sur
  `module_activations`" (le seul mécanisme de résolution existant aujourd'hui) — comportement
  identique une fois l'enforcement plan câblé dans une US future, sans changement requis côté
  override.
- **Interface Angular** (écran super-admin de gestion des overrides) : hors périmètre de cette
  US — aucun AC ne la demande explicitement ; PR `pivot-ui` dédiée, non planifiée à ce jour.

## Scores

- Gate 2 (Coverage) : auto-évalué ≥ 85 (AC couverts, pas de code non testé, tests non triviaux —
  41 tests nouveaux/modifiés : `ModuleActivationServiceTest`, `ModuleOverrideTest`,
  `ModuleOverrideServiceTest`, `SuperAdminModuleOverrideControllerTest`,
  `ModuleOverrideIntegrationTest`). Coverage SonarCloud sur code neuf : 92.3 %.
- Gate 4 (Merge confidence) : 100/100 — CI verte (Tests Backend TU+TI, SonarCloud Quality Gate,
  Checkstyle/SpotBugs, Gitleaks, CodeQL, Semgrep, Trivy), pas de hard block.

## Statut

Figé le 2026-07-06.
