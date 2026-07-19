# Système de modules PIVOT

> **Bascule Spring Modulith** ([ADR-030](pathname:///pivot-docs/adr/ADR-030-bascule-spring-modulith), mergée 2026-07-17) : les domaines métier sont des **modules internes** de `pivot-core` (`fr.pivot.agilite.*` / `fr.pivot.collaboratif.*`), plus des repos/JVMs séparés. Pilotage est **retiré de PIVOT** (extraction). Frontières vérifiées par `ApplicationModules.verify()`, isolation des données par schéma conservée. Certains flux de déploiement restent `[transition]` (routage nginx/compose encore dirigé vers les services archivés — bascule runtime à planifier).

## Contrat de base

Le contrat `PivotModule` est défini dans **pivot-core** et packagé dans `fr.pivot:pivot-core-starter`. Chaque module interne déclare son implémentation via un `@Bean` Spring.

```java
// fr.pivot.core.modules — packagé dans pivot-core-starter
public interface PivotModule {
    String getId();        // "agilite", "collaboratif"
    String getName();      // nom affiché en UI
    String getVersion();
    boolean isEnabled(TenantContext ctx);  // activable par admin tenant
}
```

```java
// Exemple dans le module collaboratif (fr.pivot.collaboratif)
@Bean
public PivotModule collaboratifModule() {
    return new CollaboratifModule();  // implémente PivotModule
}
```

---

## Architecture modulith

Chaque domaine fonctionnel = **module interne** de `pivot-core` (backend) + lib Angular du workspace `pivot-ui` (frontend). Un seul artefact, une seule JVM.

| Domaine | Backend | Frontend | Port dev |
|---------|---------|----------|----------|
| core (auth · admin · modules) | pivot-core · `fr.pivot.core.*` | pivot-ui (shell) | :8080 |
| agilité (scrum-poker · standup) | pivot-core · `fr.pivot.agilite.*` | pivot-ui/projects/agilite-ui | :8080 |
| collaboratif (whiteboard · session) | pivot-core · `fr.pivot.collaboratif.*` | pivot-ui/projects/collaboratif-ui | :8080 |

> Domaine **pilotage** retiré de PIVOT (extraction ADR-030). Anciens repos `pivot-{agilite,collaboratif,pilotage}-{core,ui}` et `pivot-design-system` : archivés (lecture seule).

### Dépendances build-time

```text
module interne (fr.pivot.{agilite,collaboratif}.*)  →  dépend de  fr.pivot.core.*  (starter, en interne)
pivot-ui/projects/{agilite,collaboratif}-ui         →  consomme   @pivot/ui-core  (npm)
                                                    →  consomme   design-system   (workspace pivot-ui/projects/*)
```

---

## Côté backend (modules internes de pivot-core)

- Chaque module = **module interne** du modulith · même JVM · frontières vérifiées par `ApplicationModules.verify()`
- Aucun import croisé entre domaines (`agilite` ⇎ `collaboratif`) — chaque module ne dépend que du shell `fr.pivot.core.*`
- Schéma Flyway propre (`agilite` / `collaboratif`) — jamais dans `public`
- FK cross-schéma **uniquement vers `public`** — pas de FK entre schémas modules
- Module désactivé → `403 Forbidden` sur tous les endpoints `/api/{domaine}/**`
- Aucune logique inter-module directe → `ApplicationEventPublisher` pour les événements typés
- Changement de contrat `PivotModule` → **hard block Gate 4**, coordination pivot-core (shell + modules internes)

> `[transition]` Tant que le routage nginx pointe vers les services archivés, un module backend KO renvoie encore `503` sur son préfixe (fault isolation par process héritée). En cible modulith, la disponibilité suit celle du process `pivot-core` unique.

### Routing nginx par préfixe

Cible modulith — tout converge vers `pivot-core:8080` :

```text
/api/auth/**         →  pivot-core :8080
/api/admin/**        →  pivot-core :8080
/api/agilite/**      →  pivot-core :8080
/api/collaboratif/** →  pivot-core :8080
/ws/agilite/**       →  pivot-core :8080  (ip_hash)
/ws/collaboratif/**  →  pivot-core :8080  (ip_hash)
```

> `[transition]` Le nginx effectif (dev & prod) route encore `/api/{agilite,collaboratif}` et `/ws/{agilite,collaboratif}` vers `pivot-agilite-core:8082` / `pivot-collaboratif-core:8083` (services archivés) — bascule vers `pivot-core:8080` à planifier.

---

## Côté frontend (libs du workspace pivot-ui)

- Bundles compilés séparément, **lazy-loaded** dans le shell `pivot-ui` via `moduleGuard`
- `moduleGuard` appelle `GET /api/admin/modules/{id}/status` (via pivot-core) avant chargement
- Module désactivé → bundle non chargé + redirection `/403`
- Cache module status 60s — pas d'appel à chaque navigation

```typescript
// Dans pivot-ui — routing shell (lazy-load depuis le workspace projects/*)
{
  path: 'agilite',
  canActivate: [moduleGuard],
  data: { moduleId: 'agilite' },
  loadChildren: () =>
    import('@pivot/agilite-ui').then(m => m.AGILITE_ROUTES)
},
{
  path: 'collaboratif',
  canActivate: [moduleGuard],
  data: { moduleId: 'collaboratif' },
  loadChildren: () =>
    import('@pivot/collaboratif-ui').then(m => m.COLLABORATIF_ROUTES)
}
```

---

## Cycle d'activation

```text
Admin tenant → active module via UI pivot-ui
      ↓
PATCH /api/admin/modules/{id}/enable  (ROLE_ADMIN → pivot-core :8080)
      ↓
pivot-core : MODULES_STATE mis à jour en BDD (schéma public)
      ↓
Cache Redis invalidé : module:{tenantId}:{moduleId}  TTL 60s
      ↓
pivot-ui recharge le statut → moduleGuard autorise le chargement lazy
      ↓
Bundle {agilite,collaboratif}-ui chargé  →  route disponible pour le tenant
```

---

## Cache Redis module status

```text
Clé   : module:{tenantId}:{moduleId}
TTL   : 60 s
Scope : accédé par le backend pivot-core (shell + modules internes)
```

Chaque `moduleGuard` Angular appelle `GET /api/admin/modules/{id}/status` → pivot-core vérifie en Redis d'abord, puis BDD si cache miss.

---

## Règles de design

| Règle | Raison |
|-------|--------|
| Pas d'import direct inter-module | Évite couplage fort · vérifié par `ApplicationModules.verify()` |
| Schéma Flyway isolé par module | Migrations indépendantes · pas de coordination |
| FK cross-schéma → `public` uniquement | Isolation · pivot-core reste le pivot du partage |
| API status mis en cache Redis (60s) | Évite N appels DB par navigation |
| Bundle non chargé si module désactivé | Sécurité + performance |
| Événements typés via `ApplicationEventPublisher` | Contrat explicite entre modules |
| `teams` / `team_members` dans `public` | Partage cross-modules via pivot-core uniquement |
| `PivotModule` dans `pivot-core-starter` | Contrat de module stable et partagé |

---

## Historique — instanciation multi-repo (EN17, superseded par ADR-030)

> Le découpage multi-repo des domaines ([ADR-006](pathname:///pivot-docs/adr/ADR-006-multi-repo-architecture)) et les enablers EN17 qui préparaient l'instanciation de repos `pivot-xxx-core` / `pivot-xxx-ui` sont **supersédés par [ADR-030](pathname:///pivot-docs/adr/ADR-030-bascule-spring-modulith)** : les domaines métier ne sont **pas** instanciés en repos séparés, ils vivent comme modules internes de `pivot-core` / libs du workspace `pivot-ui`. Les enablers d'infrastructure encore pertinents restent la publication du starter et de `@pivot/ui-core`, et la convention BDD multi-schema.

| Enabler | Statut vis-à-vis d'ADR-030 |
|---------|----------------------------|
| EN17.1 | `fr.pivot:pivot-core-starter` — toujours pertinent (consommé en interne par les modules) |
| EN17.2 | `@pivot/design-system` — repo dédié abandonné ; design-system rapatrié dans `pivot-ui/projects/*` |
| EN17.3 | `@pivot/ui-core` — toujours pertinent |
| EN17.4 | Convention Flyway multi-schema — toujours pertinente (par module, dans une JVM unique) |
| EN17.5 | Template `pivot-xxx-core` — obsolète (plus de repos modules à créer) |
| EN17.6 | Template `pivot-xxx-ui` — obsolète (libs internes au workspace `pivot-ui`) |
