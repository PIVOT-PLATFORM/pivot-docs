# US03.3.3 — Admin tenant voit uniquement modules de son plan

**En tant que** admin tenant
**Je veux** voir dans l'interface d'administration uniquement les modules inclus dans mon plan
**Afin de** ne pas voir de modules auxquels je n'ai pas droit

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| GET /api/admin/modules filtre par plan du tenant (+ overrides SUPER_ADMIN) | ✅ |
| Modules hors plan invisibles (pas 403, juste absents de la liste) | ✅ |
| Override SUPER_ADMIN visible si actif | ✅ |
| Tests TI avec 2 tenants de plans différents | ✅ |
| L'API retourne un champ source: 'plan' \| 'override' par module | ✅ |
| Un module disponible via override SUPER_ADMIN est affiché avec un indicateur visuel distinct (badge "Activé par l'administrateur plateforme") | ✅ |

## Notes de livraison

- Implémenté : `pivot-core` PR [#161](https://github.com/PIVOT-PLATFORM/pivot-core/pull/161) ·
  `pivot-ui` PR [#102](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/102).
- **Dépendance non mergée** : la branche `pivot-core` part de `main` puis fusionne localement
  (jamais poussé séparément) les commits de deux PR encore ouvertes au moment de l'implémentation
  — #153 (`feat/us03-3-1-super-admin-modules-plan`, `Plan`/`PlanModule`,
  `tenants.billing_plan_id`) et #159 (`feat/us03-3-2-super-admin-override`, `ModuleOverride`,
  `TenantModuleRecord`). Conflit résolu sur `V1__schema_init.sql` (deux blocs `CREATE TABLE`
  indépendants ajoutés par les deux PR juste après `module_activations` sans se connaître) — les
  deux jeux de tables conservés, ordre : `plans` → `plan_modules` → `ALTER TABLE` (FK
  `fk_tenants_billing_plan`) → `module_overrides`. **Cette branche devra être rebasée** une fois
  #153 et #159 réellement mergées dans `main` (ordre recommandé : #153 puis #159, inchangé au
  moment de l'écriture — vérifié via `gh pr list --state merged`).
- Tenant sans `billing_plan_id` assigné (majorité des tenants existants) : aucune restriction —
  clarification PO Agent documentée en Javadoc d'`AdminModuleListService` (`@implNote`), pour
  éviter une régression de visibilité non demandée par l'AC.
- Bloquer `activate`/`deactivate` pour un module hors plan reste hors périmètre de cette US (voir
  l'`@implNote` « future enforcement » de `Plan`, #153) — seule la **visibilité** de
  `GET /api/admin/modules` est concernée.
- Fix CI en cours d'implémentation : `AdminModuleListIntegrationTest` (pivot-core) réutilise le
  contexte Spring de `AdminModuleActivationIntegrationTest` (import de la même classe
  `TestModuleConfig`) plutôt que d'en déclarer un nouveau — la suite de tests d'intégration
  approchait la limite `max_connections` PostgreSQL du conteneur Testcontainers partagé
  (`FATAL: sorry, too many clients already`) à mesure que le nombre de configurations Spring
  distinctes croît. Un flake CI préexistant et sans rapport (`theme.service.spec.ts`, pivot-ui —
  spy `Storage.prototype.setItem` non restauré) a également été corrigé au passage.
- Écran Angular `/admin/modules` (US03.1.1/US03.1.2/US03.2.1) déjà existant, étendu (pas
  recréé) : badge distinct « Activé par l'administrateur plateforme » ajouté pour
  `source: 'override'`.

---
Item Type: US · Parent: F03.3 · Module: core · Phase: Socle · Size: M · Priority: Medium
Stage: Done
