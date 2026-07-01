# US06.2.2 — Super admin désactive un tenant

**En tant que** SUPER_ADMIN
**Je veux** désactiver un tenant
**Afin de** bloquer l'accès à une organisation sans supprimer ses données

## Critères d'acceptation

| Critère | 🤖 Dev | ✅ PO |
|---------|--------|-------|
| PATCH /api/superadmin/tenants/{tenantId}/status accepte `{ status: "INACTIVE" }` | ⬜ | ⬜ |
| Requiert ROLE_SUPER_ADMIN | ⬜ | ⬜ |
| Tous les utilisateurs du tenant → 401 immédiat (sessions révoquées) | ⬜ | ⬜ |
| Audit event `TenantDeactivated` enregistré | ⬜ | ⬜ |
| Tests TI PATCH /api/superadmin/tenants/{id}/status | ⬜ | ⬜ |
| La révocation en masse utilise une stratégie de génération : tenant_invalidation_timestamp en BDD. Chaque requête vérifie que le token a été émis APRÈS ce timestamp. Révocation effective en < 500ms indépendamment du nombre d'utilisateurs | ⬜ | ⬜ |
| Le tenant système (hébergeant les SUPER_ADMIN) ne peut pas être désactivé via cet endpoint → 403 avec message explicite. Test TI valide ce cas | ⬜ | ⬜ |
| L'endpoint retourne 200 uniquement après que la révocation bulk soit confirmée | ⬜ | ⬜ |
| Audit event TenantDeactivated avec tenantId et actorId enregistré | ⬜ | ⬜ |

---
Item Type: US · Parent: F06.2 · Module: admin · Phase: MVP · Size: S · Priority: Medium
Human Gate: human-validated · Stage: Backlog
