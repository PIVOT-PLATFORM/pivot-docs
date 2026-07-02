# EN07.1 — Docker Compose production complet (multi-repo)

**Type d'enabler** : infrastructure · déploiement

**Critères de complétion** :
- [ ] `docker-compose.prod.yml` avec **tous les services** :
  - `nginx` (API gateway + static SPA) — :443/:80
  - `pivot-core` :8080 — auth · tenant · team · module registry
  - `pivot-pilotage-core` :8081 — roadmap · survey · quiz
  - `pivot-agilite-core` :8082 — scrum-poker · standup · capacity
  - `pivot-collaboratif-core` :8083 — whiteboard · session
  - `postgres` :5432 — instance unique, 4 schémas (public/pilotage/agilite/collaboratif)
  - `redis` :6379 — cache partagé tous les backends
  - `activemq` :61613/:61617 — broker STOMP partagé
  - `pgbouncer` :5432 — pool connexions
- [ ] Health checks Docker sur chaque service (`/actuator/health` pour les backends Spring)
- [ ] Volumes persistants : postgres (data), redis (data), activemq (kahadb)
- [ ] Restart policy `unless-stopped` sur tous les services
- [ ] Réseaux Docker isolés : `pivot-net-app` (nginx ↔ backends) + `pivot-net-data` (backends ↔ data)
- [ ] Aucun port backend exposé directement — tout passe par nginx
- [ ] Variables d'environnement via Docker secrets (pas de `.env` en prod)
- [ ] Documentation déploiement dans `pivot-docs`

**Note multi-repo :** chaque `pivot-xxx-core` est un conteneur Docker indépendant. Si un module tombe,
les autres restent disponibles. nginx retourne 503 uniquement sur le préfixe du module KO.

**Statut** : ⬜ À faire — Gate: Backlog

---
Item Type: Enabler · Parent: E07 · Type: infrastructure · Module: core · Phase: MVP
Stage: Backlog · Priority: Critical
