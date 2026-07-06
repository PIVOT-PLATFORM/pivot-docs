# US03.3.1 — SUPER_ADMIN définit modules disponibles par plan

**En tant que** SUPER_ADMIN
**Je veux** définir quels modules sont disponibles pour chaque plan tarifaire
**Afin de** contrôler l'offre SaaS par niveau de plan

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| POST /api/superadmin/plans/{planId}/modules configure la liste des modules d'un plan | ✅ |
| Requiert ROLE_SUPER_ADMIN | ✅ |
| Entité `Plan` avec association M-N modules | ✅ |
| Tenant associé à un plan (champ `planId` sur Tenant) | ✅ |
| Tests TI POST /api/superadmin/plans/{planId}/modules | ✅ |
| Sémantique HTTP clarifiée : PUT /api/superadmin/plans/{planId}/modules pour remplacement complet de la liste, POST /api/superadmin/plans/{planId}/modules/{moduleId} pour ajout unitaire | ✅ |
| GET /api/superadmin/plans/{planId}/modules retourne la liste courante des modules du plan | ✅ |
| Interface Angular /superadmin/plans pour visualiser et modifier la configuration des plans (AC frontend à définir dans une US dédiée ou ajoutés ici) | ✅ |

## Notes de livraison

- **Backend** (`pivot-core`) : PR [#153](https://github.com/PIVOT-PLATFORM/pivot-core/pull/153)
  — Gate 4 = 100/100, CI verte (855/855 tests dont 24 TI dédiées à cette US), **prête pour
  review** (ouverte, pas encore mergée).
- **Frontend** (`pivot-ui`) : PR [#101](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/101)
  — Gate 4 = 100/100, CI verte (892/892 tests), **prête pour review** (ouverte, pas encore mergée).
- **Schéma** : nouvelle entité `Plan` (table `plans`) avec association M-N modules (table
  `plan_modules`) ; `Tenant` reçoit un champ `billingPlanId` (colonne `tenants.billing_plan_id`)
  plutôt qu'un `plan_id` littéral — `tenants` porte déjà une colonne `plan` héritée (périmètre de
  déploiement / mode d'authentification `SAAS`/`ENTERPRISE`/`TRIAL`), un concept totalement
  différent du plan tarifaire/bundle de modules introduit ici. `billing_plan_id` lève
  l'ambiguïté entre les deux. Détail complet (et rationale de l'`ALTER TABLE` séparé pour la FK,
  `plans` étant créée plus loin dans `V1__schema_init.sql`) → description de la PR `pivot-core` #153.
- **AC-gap comblé (PO Agent self-clarification)** : l'AC littérale ne couvrait que la gestion de
  la liste de modules d'un plan *existant* — sans endpoint de création/liste de `Plan`,
  `{planId}` ne pourrait jamais exister en pratique. Ajoutés en conséquence :
  `POST /api/superadmin/plans` (création), `GET /api/superadmin/plans` (liste),
  `GET /api/superadmin/plans/{planId}` (détail).
- **Ajout unitaire idempotent** : `POST .../modules/{moduleId}` sur un module déjà présent
  renvoie `200` sans erreur (pas de `409` inventé, l'AC n'en demandait aucun).
- **Frontend** : routes `/superadmin/plans` (liste + création inline) et
  `/superadmin/plans/:planId` (détail, gestion des modules), gardées par `superAdminGuard`. Pas
  d'endpoint de suppression unitaire de module côté backend → le retrait d'un module dans l'UI
  passe par le `PUT` de remplacement complet (liste actuelle moins le module retiré). Pas
  d'endpoint de listing des modules côté superadmin → le champ d'ajout de module est un champ
  texte libre, un identifiant inconnu étant remonté par le `400 UNKNOWN_MODULE_ID` du backend.
- **Statut réel vérifié (2026-07-06)** : les deux PR sont ouvertes, non mergées, Gate 4 = 100/100
  chacune — `Stage` passé à `Review` (recette manuelle du mainteneur + merge restants).

---
Item Type: US · Parent: F03.3 · Module: core · Phase: Socle · Size: S · Priority: High
Stage: Review
