# EN04.2 — Spring Actuator endpoints

**Type d'enabler** : observabilité · health

**Critères de complétion** :
- [ ] `spring-boot-starter-actuator` ajouté dans chaque backend (pivot-core + module-cores)
- [ ] Endpoints exposés sur port séparé `:8081` (management port) — **non routé par nginx**
- [ ] `/actuator/health` : retourne UP/DOWN · composants : DB, Redis, STOMP broker (si applicable)
- [ ] `/actuator/info` : version app, git commit sha, profil Spring
- [ ] `/actuator/metrics` : métriques JVM + HTTP request duration + custom
- [ ] Accès actuator restreint au réseau Docker interne (pas accessible depuis Internet)
- [ ] Health check Docker `HEALTHCHECK CMD curl -f http://localhost:8081/actuator/health || exit 1`

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E04 · Type: observabilité · Module: core · Phase: MVP
Stage: Backlog · Priority: High
