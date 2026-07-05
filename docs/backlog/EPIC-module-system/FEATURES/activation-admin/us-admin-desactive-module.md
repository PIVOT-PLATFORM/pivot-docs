# US03.1.2 — Admin désactive un module pour son tenant

**En tant que** admin tenant
**Je veux** désactiver un module PIVOT pour mon organisation
**Afin de** restreindre l'accès à une fonctionnalité non souhaitée

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| DELETE /api/admin/modules/{id}/activate désactive le module pour le tenant courant | ✅ |
| Requiert ROLE_ADMIN | ✅ |
| Guard Angular retourne 403 immédiatement après désactivation (cache invalidé) | ⬜ *(déféré — dépend du endpoint status d'EN03.2 (`/api/modules/{id}/status`) + invalidation cache d'EN03.3, aucun des deux mergé)* |
| Audit event `ModuleDeactivated` enregistré | ✅ |
| Tests TI DELETE /api/admin/modules/{id}/activate | ✅ |
| Le tenantId cible est extrait exclusivement du TenantContext du token porteur. Tentative cross-tenant → 403 | ✅ |
| Vérification ROLE_ADMIN via @PreAuthorize sur le ServiceMethod. Test TI inclut appel avec token ROLE_USER → 403 | ✅ |
| Le filtre Spring Security vérifie le statut du module en BDD (ou Redis TTL ≤ 1s) à chaque requête sur /api/{module}/. Module désactivé → 403 même pour sessions actives existantes | ⬜ *(hors périmètre de cette US — c'est le guard/filtre d'EN03.2, pas le contrôleur admin ; à valider une fois EN03.2 mergé)* |
| Les connexions WebSocket STOMP actives sur le module sont terminées dans les 5 secondes suivant la désactivation | ⬜ *(N/A pour le MVP — aucun module utilisant WebSocket/STOMP n'existe encore ; à réévaluer quand un module collaboratif temps réel sera construit)* |
| La désactivation est effective en < TTL cache (≤ 60s) — le mot "immédiatement" remplacé par cette garantie | ⬜ *(déféré — dépend de l'invalidation cache d'EN03.3, non mergée)* |
| L'action "Désactiver" requiert un dialog de confirmation : "Les utilisateurs connectés seront bloqués. Confirmer ?" avant appel API | ✅ |
| Toast de succès "Module [nom] désactivé" + badge mis à jour après désactivation | ✅ |
| Un utilisateur actif sur un module au moment de sa désactivation reçoit un toast "Module désactivé par l'administrateur" à la prochaine requête API | ⬜ *(déféré — nécessite un intercepteur HTTP global sur la forme d'erreur 403 "module désactivé" qu'exposera EN03.2 ; pas encore stable)* |

## Notes de livraison

- Implémenté : `pivot-core` PR [#122](https://github.com/PIVOT-PLATFORM/pivot-core/pull/122) (Gate 4 : 92/100 — MERGE_AUTONOMOUS) · `pivot-ui` PR [#66](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/66) (Gate 4 : 92/100 — MERGE_AUTONOMOUS).
- Le contrôleur `DELETE /api/admin/modules/{id}/activate` change bien l'état en base immédiatement — ce qui reste déféré est la propagation/enforcement *côté consommateur* (guard Angular, filtre Spring Security sur `/api/{module}/*`, cache Redis, notification temps réel), portée par EN03.2 et EN03.3, pas encore mergées.
- Tests E2E Playwright différés (environnement E2E indisponible lors de l'implémentation) — à compléter en suivi.

---
Item Type: US · Parent: F03.1 · Module: core · Phase: MVP · Size: M · Priority: Critical
Stage: Review
Rôle: administrateur-plateforme
Dépendances : EN03.2 (guard Angular + status API), EN03.3 (invalidation cache Redis) — non mergées, suivi requis avant clôture définitive.
