# EN01.7 — Token Cleanup Scheduler

**Type d'enabler** : infrastructure

**Objectif technique** : Tâche planifiée Spring (`@Scheduled`) qui purge périodiquement les tokens expirés/révoqués et les événements d'audit anciens.

**Critères de complétion** :
- [x] `CleanupScheduler` : `@Scheduled(cron = ...)` configurable
- [x] Purge `access_tokens` expirés/révoqués
- [x] Purge `email_verifications` expirées
- [x] Purge `password_reset_tokens` expirés
- [x] Purge `device_verify_tokens` expirés
- [x] Log structuré des purges (nbr de lignes supprimées)

**Statut** : ✅ Fait — Stage: Done

---
Item Type: Enabler · Parent: E01 · Type: infrastructure · Module: auth · Phase: MVP
Stage: Done
