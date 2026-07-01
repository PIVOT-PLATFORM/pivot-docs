# Système de modules PIVOT

## Contrat de base

```java
public interface PivotModule {
    String getId();        // "whiteboard", "survey", "quiz"…
    String getName();      // nom affiché en UI
    String getVersion();
    boolean isEnabled(TenantContext ctx);  // activable par admin tenant
}
```

## Côté backend (pivot-core)

- Modules déclarés dans `src/main/java/fr/pivot/backend/modules/registry/`
- Module désactivé → `403 Forbidden` sur tous les endpoints du module
- Aucune logique inter-module directe → `ApplicationEventPublisher` pour les événements typés
- Changement de contrat → **hard block Gate 4**, coordination pivot-ui obligatoire

## Côté frontend (pivot-ui)

- Routes lazy-loaded par module (`loadChildren`)
- Guard `moduleGuard` vérifie `GET /api/modules/{id}/status` avant chargement
- Module désactivé → bundle non chargé + redirection `/403`
- Cache API 60s — pas d'appel à chaque navigation

```typescript
{
  path: 'whiteboard',
  canActivate: [moduleGuard],
  data: { moduleId: 'whiteboard' },
  loadChildren: () =>
    import('./features/whiteboard/whiteboard.routes')
      .then(m => m.WHITEBOARD_ROUTES)
}
```

## Cycle d'activation

```text
Admin tenant → active module via UI
      ↓
PATCH /api/modules/{id}/enable (ROLE_ADMIN)
      ↓
Module activé en BDD pour le tenant
      ↓
pivot-ui recharge la config → route disponible
```

## Règles de design

| Règle | Raison |
|-------|--------|
| Pas d'import direct inter-feature | Évite couplage fort entre modules |
| API status mis en cache | Évite N appels par navigation |
| Bundle non chargé si désactivé | Sécurité + performance |
| Événements typés uniquement | Contrat explicite entre modules |
