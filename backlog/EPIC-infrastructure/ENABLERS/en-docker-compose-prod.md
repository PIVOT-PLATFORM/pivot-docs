# EN07.1 — Docker Compose production complet

**Type d'enabler** : infrastructure · déploiement

**Critères de complétion** :
- [ ] `docker-compose.prod.yml` avec services : pivot-core, pivot-ui (nginx), postgres, redis, activemq, pgbouncer
- [ ] Health checks Docker sur chaque service
- [ ] Volumes persistants pour postgres (data), redis (data), activemq (kahadb)
- [ ] Restart policy `unless-stopped` sur tous les services
- [ ] Réseau interne isolé (pas d'exposition port inutile)
- [ ] Documentation déploiement dans `pivot-docs`

**Statut** : ⬜ À faire — Gate: needs-human-valid

---
Item Type: Enabler · Parent: E07 · Type: infrastructure · Module: core · Phase: MVP
Human Gate: needs-human-valid · Stage: Backlog · Priority: Critical
