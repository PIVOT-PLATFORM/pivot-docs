# US03.1.1 — Admin active un module pour son tenant

**En tant que** admin tenant
**Je veux** activer un module PIVOT pour mon organisation
**Afin que** mes utilisateurs puissent y accéder

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| POST /api/admin/modules/{id}/activate active le module pour le tenant courant | ✅ |
| Requiert ROLE_ADMIN | ✅ |
| Invalidation immédiate du cache Redis (EN03.3) | ⬜ *(déféré — dépend d'EN03.3, cache Redis non encore mergé sur main)* |
| Audit event `ModuleActivated` enregistré | ✅ |
| 409 si le module est déjà actif | ✅ |
| 403 si module non disponible dans le plan du tenant | ✅ *(simplification documentée : pas de système plan/entitlement en base, "hors plan" = module non enregistré dans le `ModuleRegistry`)* |
| Tests TI POST /api/admin/modules/{id}/activate | ✅ |
| Le tenantId cible est extrait exclusivement du TenantContext du token porteur. Aucun paramètre body/header ne peut surcharger le tenant de destination. Tentative cross-tenant → 403 | ✅ |
| Vérification ROLE_ADMIN implémentée via @PreAuthorize("hasRole('ADMIN')") sur le ServiceMethod (pas uniquement sur le Controller). Test TI inclut appel avec token ROLE_USER → 403 | ✅ |
| L'endpoint retourne 200 avec l'état actuel du module dans la réponse : { id, enabled: true } (pas uniquement 204) | ✅ |
| 403 (module hors plan) → message explicatif inline dans la carte module : "Ce module n'est pas inclus dans votre plan" | ✅ |
| L'UI met à jour le toggle localement (optimiste) sans attendre le cache Redis (TTL 60s) | ✅ |
| En cas d'erreur réseau ou 403, l'état du toggle revient à son état précédent (rollback optimiste) + toast "error" | ✅ |
| Toast de succès "Module [nom] activé" affiché après activation réussie | ✅ |
| Noms de modules, statuts, toasts internalisés dans admin.modules.* (fr.json / en.json) | ✅ |

## Notes de livraison

- Implémenté : `pivot-core` PR [#122](https://github.com/PIVOT-PLATFORM/pivot-core/pull/122) (Gate 4 : 92/100 — MERGE_AUTONOMOUS) · `pivot-ui` PR [#66](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/66) (Gate 4 : 92/100 — MERGE_AUTONOMOUS).
- Déféré (cross-dépendance, non bloquant pour cette US) : invalidation cache Redis à l'activation dépend d'**EN03.3** (cache Redis TTL 60s), pas encore mergé sur `main`. À vérifier/fermer une fois EN03.3 mergé.
- Tests E2E Playwright différés (environnement E2E indisponible lors de l'implémentation) — à compléter en suivi.

---
Item Type: US · Parent: F03.1 · Module: core · Phase: MVP · Size: M · Priority: Critical
Stage: Review
Rôle: administrateur-plateforme
Dépendances : EN03.3 (invalidation cache Redis) — non mergée, suivi requis avant clôture définitive.
