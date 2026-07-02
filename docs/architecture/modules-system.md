# Système de modules PIVOT

## Contrat de base

Le contrat `PivotModule` est défini dans **pivot-core** et packagé dans `fr.pivot:pivot-core-starter`. Chaque repo module déclare son implémentation via un `@Bean` Spring.

```java
// fr.pivot.core.modules — packagé dans pivot-core-starter
public interface PivotModule {
    String getId();        // "pilotage", "agilite", "collaboratif"
    String getName();      // nom affiché en UI
    String getVersion();
    boolean isEnabled(TenantContext ctx);  // activable par admin tenant
}
```

```java
// Exemple dans pivot-collaboratif-core
@Bean
public PivotModule collaboratifModule() {
    return new CollaboratifModule();  // implémente PivotModule
}
```

---

## Architecture multi-repo

Chaque domaine fonctionnel = repo backend + repo frontend dédiés.

| Domaine | Backend | Frontend | Port dev |
|---------|---------|---------|---------|
| core (auth · admin · modules) | pivot-core | pivot-ui | :8080 |
| pilotage (roadmap · survey · quiz) | pivot-pilotage-core | pivot-pilotage-ui | :8081 |
| agilité (scrum-poker · standup) | pivot-agilite-core | pivot-agilite-ui | :8082 |
| collaboratif (whiteboard · session) | pivot-collaboratif-core | pivot-collaboratif-ui | :8083 |

### Dépendances build-time

```
pivot-xxx-core  →  consomme  fr.pivot:pivot-core-starter  (Maven)
pivot-xxx-ui    →  consomme  @pivot/ui-core  (npm)
                →  consomme  @pivot/design-system  (npm, via @pivot/ui-core)
```

---

## Côté backend (pivot-xxx-core)

- Chaque module = **JVM séparée** · déploiement Docker indépendant
- Schéma Flyway propre (`pilotage` / `agilite` / `collaboratif`) — jamais dans `public`
- FK cross-schéma **uniquement vers `public`** — pas de FK entre schémas modules
- Module désactivé → `403 Forbidden` sur tous les endpoints `/api/{domaine}/**`
- Module backend KO → nginx retourne `503` sur son préfixe uniquement
- Aucune logique inter-module directe → `ApplicationEventPublisher` pour les événements typés
- Changement de contrat `PivotModule` → **hard block Gate 4**, coordination pivot-core + tous les repos modules

### Routing nginx par préfixe

```
/api/auth/**         →  pivot-core :8080
/api/admin/**        →  pivot-core :8080
/api/pilotage/**     →  pivot-pilotage-core :8081
/api/agilite/**      →  pivot-agilite-core :8082
/api/collaboratif/** →  pivot-collaboratif-core :8083
/ws/pilotage/**      →  pivot-pilotage-core :8081  (ip_hash)
/ws/agilite/**       →  pivot-agilite-core :8082   (ip_hash)
/ws/collaboratif/**  →  pivot-collaboratif-core :8083 (ip_hash)
```

---

## Côté frontend (pivot-xxx-ui)

- Bundles compilés séparément, **lazy-loaded** dans le shell `pivot-ui` via `moduleGuard`
- `moduleGuard` appelle `GET /api/admin/modules/{id}/status` (via pivot-core) avant chargement
- Module désactivé → bundle non chargé + redirection `/403`
- Module backend KO → `503` → SPA affiche "Module temporairement indisponible"
- Cache module status 60s — pas d'appel à chaque navigation

```typescript
// Dans pivot-ui — routing shell (lazy-load depuis pivot-xxx-ui)
{
  path: 'pilotage',
  canActivate: [moduleGuard],
  data: { moduleId: 'pilotage' },
  loadChildren: () =>
    import('@pivot/pilotage-ui').then(m => m.PILOTAGE_ROUTES)
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
Bundle pivot-xxx-ui chargé  →  route disponible pour le tenant
```

---

## Cache Redis module status

```
Clé   : module:{tenantId}:{moduleId}
TTL   : 60 s
Scope : partagé entre tous les backends (pivot-core + tous les module-core)
```

Chaque `moduleGuard` Angular appelle `GET /api/admin/modules/{id}/status` → pivot-core vérifie en Redis d'abord, puis BDD si cache miss.

---

## Règles de design

| Règle | Raison |
|-------|--------|
| Pas d'import direct inter-feature | Évite couplage fort entre modules |
| Schéma Flyway isolé par module | Migrations indépendantes · pas de coordination |
| FK cross-schéma → `public` uniquement | Isolation · pivot-core reste le pivot du partage |
| API status mis en cache Redis (60s) | Évite N appels DB par navigation |
| Bundle non chargé si module désactivé | Sécurité + performance |
| Événements typés via `ApplicationEventPublisher` | Contrat explicite entre modules |
| `teams` / `team_members` dans `public` | Partage cross-modules via pivot-core uniquement |
| Module KO → 503 · pas crash global | Fault isolation · résilience plateforme |
| `PivotModule` dans `pivot-core-starter` | Module repos n'ont pas à modifier pivot-core |

---

## Prérequis avant instanciation des repos modules (EN17)

Les repos `pivot-xxx-core` et `pivot-xxx-ui` **ne doivent pas être créés** avant :

| Enabler | Prérequis |
|---------|-----------|
| EN17.1 | `fr.pivot:pivot-core-starter` publié sur GitHub Packages |
| EN17.2 | `@pivot/design-system` publié sur GitHub Packages |
| EN17.3 | `@pivot/ui-core` publié sur GitHub Packages |
| EN17.4 | Convention Flyway multi-schema documentée et validée |
| EN17.5 | Template `pivot-xxx-core` (Spring Boot + pivot-core-starter) créé |
| EN17.6 | Template `pivot-xxx-ui` (Angular + @pivot/ui-core) créé |
