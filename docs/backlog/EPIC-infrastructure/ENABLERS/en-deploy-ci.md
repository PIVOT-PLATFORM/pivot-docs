# EN07.5 — deploy.yml GitHub Actions CI/CD vers prod

**Type d'enabler** : CI/CD · déploiement

**Critères de complétion** :
- [ ] Workflow `deploy.yml` déclenché sur tag `v*` ou merge sur `main`
- [ ] Build images Docker pivot-core + pivot-ui → push GHCR
- [ ] SSH vers serveur prod + `docker compose pull && docker compose up -d`
- [ ] Smoke test post-déploiement (curl /actuator/health)
- [ ] Rollback automatique si smoke test échoue
- [ ] Notification Slack/email sur succès/échec

**Statut** : ⬜ À faire — Gate: needs-human-valid

---
Item Type: Enabler · Parent: E07 · Type: CI/CD · Module: core · Phase: MVP
Human Gate: needs-human-valid · Stage: Backlog · Priority: Critical
