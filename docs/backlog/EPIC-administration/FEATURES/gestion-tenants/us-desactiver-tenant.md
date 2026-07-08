# US06.2.2 — Super admin désactive un tenant

**En tant que** SUPER_ADMIN
**Je veux** désactiver un tenant
**Afin de** bloquer l'accès à une organisation sans supprimer ses données

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| PATCH /api/superadmin/tenants/{tenantId}/status accepte `{ status: "INACTIVE" }` | ✅ |
| Requiert ROLE_SUPER_ADMIN | ✅ |
| Tous les utilisateurs du tenant → 401 immédiat (sessions révoquées) | ✅ |
| Audit event `TenantDeactivated` enregistré | ✅ |
| Tests TI PATCH /api/superadmin/tenants/{id}/status | ✅ |
| La révocation en masse utilise une stratégie de génération : tenant_invalidation_timestamp en BDD. Chaque requête vérifie que le token a été émis APRÈS ce timestamp. Révocation effective en < 500ms indépendamment du nombre d'utilisateurs | ✅ |
| Le tenant système (hébergeant les SUPER_ADMIN) ne peut pas être désactivé via cet endpoint → 403 avec message explicite. Test TI valide ce cas | ✅ |
| L'endpoint retourne 200 uniquement après que la révocation bulk soit confirmée | ✅ |
| Audit event TenantDeactivated avec tenantId et actorId enregistré | ✅ |

## Notes de livraison

- Implémenté : `pivot-core` PR [#135](https://github.com/PIVOT-PLATFORM/pivot-core/pull/135) (Gate 2 self-évalué : 97/100). Backend uniquement — pas de critère d'acceptation Angular dans cette US (le bouton, s'il est souhaité, n'est pas spécifié).
- **Attention — touche le chemin de validation de token partagé** (`TokenService#validate`, utilisé par toute requête authentifiée de la plateforme) : revue Security Agent explicitement demandée dans la PR. Vérifié : aucun test `TokenService*` existant n'a été cassé (timestamp `null` = toujours valide sur cette dimension).
- Tenant système identifié via une propriété configurable `pivot.tenant.system-tenant-slug` (aucune convention préexistante trouvée dans le code).
- Collision de fichiers (`SuperAdminTenantController`/`Service`) avec PR#126 (US06.2.3) et PR#134 (US06.2.1) déjà réconciliée à la fusion — voir notes de livraison de US06.2.1 pour le détail.

---
Item Type: US · Parent: F06.2 · Module: admin · Phase: Socle · Size: S · Priority: Medium
Stage: Review
Gate 5 : `pivot-core` PR [#135](https://github.com/PIVOT-PLATFORM/pivot-core/pull/135) (Gate 4 = 100/100), spec figée `docs/specs/EPIC-administration/us06-2-2-desactiver-tenant.md` (rétroactif, 2026-07-08)
