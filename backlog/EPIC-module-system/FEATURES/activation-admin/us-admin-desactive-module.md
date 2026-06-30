# US03.1.2 — Admin désactive un module pour son tenant

**En tant que** admin tenant
**Je veux** désactiver un module PIVOT pour mon organisation
**Afin de** restreindre l'accès à une fonctionnalité non souhaitée

## Critères d'acceptation

| Critère | 🤖 Dev | ✅ PO |
|---------|--------|-------|
| DELETE /api/admin/modules/{id}/activate désactive le module pour le tenant courant | ⬜ | ⬜ |
| Requiert ROLE_ADMIN | ⬜ | ⬜ |
| Guard Angular retourne 403 immédiatement après désactivation (cache invalidé) | ⬜ | ⬜ |
| Audit event `ModuleDeactivated` enregistré | ⬜ | ⬜ |
| Tests TI DELETE /api/admin/modules/{id}/activate | ⬜ | ⬜ |
| Le tenantId cible est extrait exclusivement du TenantContext du token porteur. Tentative cross-tenant → 403 | ⬜ | ⬜ |
| Vérification ROLE_ADMIN via @PreAuthorize sur le ServiceMethod. Test TI inclut appel avec token ROLE_USER → 403 | ⬜ | ⬜ |
| Le filtre Spring Security vérifie le statut du module en BDD (ou Redis TTL ≤ 1s) à chaque requête sur /api/{module}/. Module désactivé → 403 même pour sessions actives existantes | ⬜ | ⬜ |
| Les connexions WebSocket STOMP actives sur le module sont terminées dans les 5 secondes suivant la désactivation | ⬜ | ⬜ |
| La désactivation est effective en < TTL cache (≤ 60s) — le mot "immédiatement" remplacé par cette garantie | ⬜ | ⬜ |
| L'action "Désactiver" requiert un dialog de confirmation : "Les utilisateurs connectés seront bloqués. Confirmer ?" avant appel API | ⬜ | ⬜ |
| Toast de succès "Module [nom] désactivé" + badge mis à jour après désactivation | ⬜ | ⬜ |
| Un utilisateur actif sur un module au moment de sa désactivation reçoit un toast "Module désactivé par l'administrateur" à la prochaine requête API | ⬜ | ⬜ |

---
Item Type: US · Parent: F03.1 · Module: core · Phase: MVP · Size: S · Priority: High
Human Gate: human-validated · Stage: Backlog
