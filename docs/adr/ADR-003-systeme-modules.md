# ADR-003 — Système de modules activables

**Statut :** Accepté
**Date :** 2026-06-20

## Contexte

PIVOT doit supporter plusieurs modules fonctionnels (whiteboard, session, quiz…) activables indépendamment par les admins de chaque tenant, sans redéploiement.

## Décision

Système de modules runtime basé sur :
- Interface `PivotModule` côté backend (Spring)
- Routes lazy-loaded + guards côté frontend (Angular)
- Activation en BDD par tenant, vérifiée à chaque requête

## Raisons

- **Isolation** : module désactivé = 0 code chargé côté client, 0 endpoint accessible côté serveur
- **Pas de déploiement** : activation via UI admin, pas de restart serveur
- **Extensibilité** : ajout d'un module = nouveau package, pas de modification du core
- vs feature flags classiques : les feature flags gèrent des variantes de fonctionnalités, pas des modules entiers avec leurs propres routes/API/BDD
- vs microservices : trop complexe pour une équipe réduite en phase MVP

## Contrat

```java
public interface PivotModule {
    String getId();
    String getName();
    String getVersion();
    boolean isEnabled(TenantContext ctx);
}
```

## Règles

| Règle | Raison |
|-------|--------|
| Aucune logique inter-module directe | Évite couplage fort |
| Changement de contrat = hard block | Coordination pivot-core + pivot-ui obligatoire |
| Module désactivé = bundle non chargé | Sécurité + performance |

## Conséquences

- Chaque module nécessite un guard Angular + un check API
- Le registre de modules est le point central — le maintenir cohérent est critique
- Tests d'intégration requis pour chaque combinaison d'activation

## Historique

| Version | Date | Évolution |
|---------|------|-----------|
| v1 | 2026-06-20 | Décision initiale |
