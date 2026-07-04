# EN01.6 — Audit Events

**Type d'enabler** : sécurité · observabilité

**Objectif technique** : Journalisation structurée des événements d'authentification (connexions, échecs, resets, device OTP). Conforme RGPD Art. 30.

**Critères de complétion** :
- [x] Entité `AuditEvent` : `user_id`, `event_type`, `ip`, `user_agent`, `success`, `created_at`
- [x] `AuditService.log(event, userId, request, success)`
- [x] Events tracés : `LOGIN_SUCCESS`, `LOGIN_FAILURE`, `REGISTER`, `PASSWORD_RESET`, `DEVICE_OTP_SUCCESS`, `LOGOUT`
- [x] Table `audit_events` dans `V1__schema_init.sql`
- [x] Rétention configurable (pas de purge immédiate — voir `CleanupScheduler`)
- [x] Test `AuditServiceTest`

**Statut** : ✅ Fait — Stage: Done

---
Item Type: Enabler · Parent: E01 · Type: sécurité · Module: auth · Phase: MVP
Stage: Done
