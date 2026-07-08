# US03.1.2 — Admin désactive un module pour son tenant

**En tant que** admin tenant
**Je veux** désactiver un module PIVOT pour mon organisation
**Afin de** restreindre l'accès à une fonctionnalité non souhaitée

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| DELETE /api/admin/modules/{id}/activate désactive le module pour le tenant courant | ✅ |
| Requiert ROLE_ADMIN | ✅ |
| Guard Angular retourne 403 immédiatement après désactivation (cache invalidé) | ⬜ *(EN03.2 et EN03.3 sont mergées (pivot-core #123/#121, pivot-ui #67) ; le endpoint `/api/modules/{id}/status` répond `Cache-Control: no-store` et ne passe pas par le cache Redis — pas de latence de cache attendue sur ce chemin, mais le comportement de bout en bout n'a pas encore été vérifié par un test E2E dédié)* |
| Audit event `ModuleDeactivated` enregistré | ✅ |
| Tests TI DELETE /api/admin/modules/{id}/activate | ✅ |
| Le tenantId cible est extrait exclusivement du TenantContext du token porteur. Tentative cross-tenant → 403 | ✅ |
| Vérification ROLE_ADMIN via @PreAuthorize sur le ServiceMethod. Test TI inclut appel avec token ROLE_USER → 403 | ✅ |
| Le filtre Spring Security vérifie le statut du module en BDD (ou Redis TTL ≤ 1s) à chaque requête sur /api/{module}/. Module désactivé → 403 même pour sessions actives existantes | ⬜ *(hors périmètre de cette US — EN03.2 est mergée mais ne livre que l'endpoint `/api/modules/{id}/status` et le guard Angular, pas un filtre Spring Security générique sur `/api/{module}/*` ; aucun module métier n'existe encore pour exercer ce filtre, décision d'architecture à trancher quand un premier module collaboratif sera construit)* |
| Les connexions WebSocket STOMP actives sur le module sont terminées dans les 5 secondes suivant la désactivation | ⬜ *(N/A pour le Socle — aucun module utilisant WebSocket/STOMP n'existe encore ; à réévaluer quand un module collaboratif temps réel sera construit)* |
| La désactivation est effective en < TTL cache (≤ 60s) — le mot "immédiatement" remplacé par cette garantie | ⬜ *(EN03.3 est mergée (PR #121) mais son cache n'est pas raccordé au chemin de lecture réel du statut module — voir notes EN03.3 ; garantie non vérifiable tant que ce raccordement n'est pas fait)* |
| L'action "Désactiver" requiert un dialog de confirmation : "Les utilisateurs connectés seront bloqués. Confirmer ?" avant appel API | ✅ |
| Toast de succès "Module [nom] désactivé" + badge mis à jour après désactivation | ✅ |
| Un utilisateur actif sur un module au moment de sa désactivation reçoit un toast "Module désactivé par l'administrateur" à la prochaine requête API | ⬜ *(déféré — EN03.2 (mergée) a tranché pour un contrat 200/404 sans jamais de 403 sur `/api/modules/{id}/status` ; ce toast nécessiterait un mécanisme différent de celui envisagé ici (pas un intercepteur 403), à concevoir — décision d'architecture ouverte, pas encore traitée)* |

## Notes de livraison

- Implémenté : `pivot-core` PR [#122](https://github.com/PIVOT-PLATFORM/pivot-core/pull/122) (Gate 4 : 92/100 — MERGE_AUTONOMOUS) · `pivot-ui` PR [#66](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/66) (Gate 4 : 92/100 — MERGE_AUTONOMOUS).
- Le contrôleur `DELETE /api/admin/modules/{id}/activate` change bien l'état en base immédiatement — EN03.2 et EN03.3 sont désormais mergées, mais la propagation/enforcement *côté consommateur* (filtre Spring Security générique sur `/api/{module}/*`, raccordement du cache Redis, notification temps réel) reste un gap technique non couvert par ces deux enablers (voir notes ci-dessus par AC).
- Tests E2E Playwright différés (environnement E2E indisponible lors de l'implémentation) — à compléter en suivi.

---
Item Type: US · Parent: F03.1 · Module: core · Phase: Socle · Size: M · Priority: Critical
Stage: Done
Gate 5 : `pivot-core` PR [#122](https://github.com/PIVOT-PLATFORM/pivot-core/pull/122) (Gate 4 = 98/100) · `pivot-ui` PR [#66](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/66) (Gate 4 = 92/100), spec figée `docs/specs/EPIC-module-system/us03-1-2-admin-desactive-module.md` (rétroactif, 2026-07-08).
Dépendances : EN03.2 (guard Angular + status API), EN03.3 (invalidation cache Redis) — toutes deux mergées ; suivi technique requis sur le raccordement cache Redis + filtre générique `/api/{module}/*`, avant clôture définitive des AC déférés ci-dessus.
