# US06.2.1 — Super admin crée un tenant

**En tant que** SUPER_ADMIN
**Je veux** créer un nouveau tenant sur la plateforme
**Afin d'** onboarder un nouveau client ou organisation

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| POST /api/superadmin/tenants crée un tenant avec : nom, slug, plan, auth_mode | ✅ |
| Requiert ROLE_SUPER_ADMIN | ✅ |
| Slug unique (409 si doublon) | ✅ |
| Tenant créé avec statut `is_active: true` | ✅ |
| Audit event `TenantCreated` enregistré | ✅ |
| Tests TI POST /api/superadmin/tenants | ✅ |
| Le slug est validé par regex stricte : [a-z0-9-]{3,50}, sans préfixe réservé | ✅ |
| Liste de slugs interdits : api, admin, superadmin, auth, actuator, health, system, pivot. Tentative avec slug réservé → 422 Unprocessable Entity | ✅ |
| Rate limit sur POST /api/superadmin/tenants : 10 créations / heure par compte SUPER_ADMIN → 429. Audit event TenantCreationRateLimitExceeded enregistré | ✅ |
| Valeurs possibles d'auth_mode listées : LOCAL, OIDC, GOOGLE | ✅ |
| La réponse retourne l'ID du tenant créé et une URL d'invitation pour le premier admin du tenant | ✅ |
| Formulaire Angular /superadmin/tenants/new : champs nom (obligatoire), slug (auto-généré depuis le nom, éditable), plan (select), auth_mode (select) | ✅ |
| Slug auto-généré en temps réel depuis le nom (lowercase, tirets), vérification disponibilité en temps réel (debounce 500ms → GET /api/superadmin/tenants/check-slug) | ✅ |
| 409 (slug dupliqué) → message d'erreur inline sur le champ slug | ✅ |
| Après création réussie, toast succès + redirection vers page de détail du tenant créé | ✅ *(pas de page de détail tenant existante — redirection vers la liste US06.2.3 à la place)* |
| Pendant soumission, bouton disabled + spinner | ✅ |
| Formulaire : labels explicites, aria-required="true" sur les champs obligatoires, messages d'erreur liés via aria-describedby | ✅ |
| Tous textes internalisés dans admin.tenants.create.* (fr.json / en.json) | ✅ |

## Notes de livraison

- Implémenté : `pivot-core` PR [#134](https://github.com/PIVOT-PLATFORM/pivot-core/pull/134) **mergée** (Gate 2 self-évalué : 96/100) · `pivot-ui` PR [#76](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/76) **mergée** (Gate 2 self-évalué : ~90/100).
- `SuperAdminTenantController`/`Service` avaient été créés indépendamment sur cette PR, sur PR#126 (US06.2.3) et sur PR#135 (US06.2.2) — collision déjà réconciliée en une seule classe (`list()` + `create()` + `checkSlug()` + `updateStatus()`), les trois PR sont mergées sur `main`.
- PR#76 était rebasée sur la branche de PR#69 (US06.2.3) et incluait son commit — #69 a bien été fusionnée en premier.
- Réutilise `tenants.auth_mode` pour une sémantique différente (LOCAL/OIDC/GOOGLE, création) de celle déjà en place (SAAS/ENTERPRISE/HYBRID, mode de déploiement) — élargissement additif de la contrainte CHECK (schéma depuis consolidé dans `V1__schema_init.sql`, voir `pivot-core` #146). Décision produit à valider par le mainteneur.
- Incohérence mineure de nommage i18n signalée : `admin.tenants.create.*` (cette US, texte AC littéral) vs `superadmin.tenants.*` (US06.2.3) — à harmoniser plus tard.
- **Statut réel vérifié (2026-07-06) :** les deux PR sont mergées sur `main` — resynchronisé de `In progress` à `Review`.

---
Item Type: US · Parent: F06.2 · Module: admin · Phase: Socle · Size: S · Priority: Medium
Stage: ✅
Gate 5 : `pivot-core` PR [#134](https://github.com/PIVOT-PLATFORM/pivot-core/pull/134) (Gate 4 =
95/100) · `pivot-ui` PR [#76](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/76) (Gate 4 =
100/100), spec figée `docs/specs/EPIC-administration/us06-2-1-creer-tenant.md` (rétroactif,
2026-07-08) — divergence notable non tranchée : `invitationUrl` reçu du backend mais jamais
exploité côté UI (voir § Écarts de la spec)
