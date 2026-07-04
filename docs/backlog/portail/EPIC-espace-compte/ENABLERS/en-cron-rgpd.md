# EN02.5 — Cron / job planifié RGPD

**Type d'enabler** : infrastructure · RGPD

**Critères de complétion** :
- [ ] Scheduler Spring (@EnableScheduling) configuré en prod
- [ ] Job RGPD quotidien : purge comptes inactifs (EN02.4) + nettoyage tokens expirés
- [ ] Monitoring du job (log durée, compteur Micrometer)
- [ ] Alerting si job échoue (Spring Mail notification admin)

**Statut** : ⏸️ v1-enterprise

---
Item Type: Enabler · Parent: E02 · Type: infrastructure · Module: auth · Phase: v1-enterprise
Stage: Backlog · Priority: Low
