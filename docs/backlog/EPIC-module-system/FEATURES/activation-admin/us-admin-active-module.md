# US03.1.1 — Admin active un module pour son tenant

**En tant que** admin tenant
**Je veux** activer un module PIVOT pour mon organisation
**Afin que** mes utilisateurs puissent y accéder

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|-------|
| POST /api/admin/modules/{id}/activate active le module pour le tenant courant | ⬜ |
| Requiert ROLE_ADMIN | ⬜ |
| Invalidation immédiate du cache Redis (EN03.3) | ⬜ |
| Audit event `ModuleActivated` enregistré | ⬜ |
| 409 si le module est déjà actif | ⬜ |
| 403 si module non disponible dans le plan du tenant | ⬜ |
| Tests TI POST /api/admin/modules/{id}/activate | ⬜ |
| Le tenantId cible est extrait exclusivement du TenantContext du token porteur. Aucun paramètre body/header ne peut surcharger le tenant de destination. Tentative cross-tenant → 403 | ⬜ |
| Vérification ROLE_ADMIN implémentée via @PreAuthorize("hasRole('ADMIN')") sur le ServiceMethod (pas uniquement sur le Controller). Test TI inclut appel avec token ROLE_USER → 403 | ⬜ |
| L'endpoint retourne 200 avec l'état actuel du module dans la réponse : { id, enabled: true } (pas uniquement 204) | ⬜ |
| 403 (module hors plan) → message explicatif inline dans la carte module : "Ce module n'est pas inclus dans votre plan" | ⬜ |
| L'UI met à jour le toggle localement (optimiste) sans attendre le cache Redis (TTL 60s) | ⬜ |
| En cas d'erreur réseau ou 403, l'état du toggle revient à son état précédent (rollback optimiste) + toast "error" | ⬜ |
| Toast de succès "Module [nom] activé" affiché après activation réussie | ⬜ |
| Noms de modules, statuts, toasts internalisés dans admin.modules.* (fr.json / en.json) | ⬜ |

---
Item Type: US · Parent: F03.1 · Module: core · Phase: MVP · Size: S · Priority: High
Human Gate: human-validated · Stage: Backlog
