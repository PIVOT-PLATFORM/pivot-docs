# EN04.2 — Spring Actuator endpoints

**Type d'enabler** : observabilité · health

**Critères de complétion** :
- [x] `spring-boot-starter-actuator` ajouté dans chaque backend (pivot-core + module-cores) —
      **pivot-core uniquement à ce stade** : `pivot-pilotage-core` / `pivot-agilite-core` /
      `pivot-collaboratif-core` n'existent pas encore comme repos (`pivot-platform/CLAUDE.md` :
      "à créer avec le repo"). Le pattern (port management séparé, `SecurityConfig` permitAll
      `/actuator/**`, `InfoContributor` de profil, plugins `build-info` +
      `git-commit-id-maven-plugin`) est directement réutilisable lors de leur création.
      Vérifié : la dépendance était **déjà présente** dans le `pom.xml` de pivot-core avant
      cet Enabler (pas de doublon ajouté) — seule la configuration manquait.
- [x] Endpoints exposés sur port séparé `:8081` (management port) — **non routé par nginx**
- [x] `/actuator/health` : retourne UP/DOWN · composants : DB, Redis · pas de broker STOMP
      externe à surveiller (WebSocket simple broker in-process, pas d'ActiveMQ/RabbitMQ —
      confirmé, cf. `docker-compose.prod.yml` EN07.1)
- [x] `/actuator/info` : version app (`spring-boot-maven-plugin` build-info), git commit SHA
      complet (`git-commit-id-maven-plugin`, nouvelle dépendance), profil Spring actif
      (`InfoContributor` dédié)
- [x] `/actuator/metrics` : métriques JVM + `http.server.requests` (Micrometer, auto) + custom
      (testé sur un compteur métier déjà existant, `pivot.modules.cache.miss`)
- [x] Accès actuator restreint au réseau Docker interne (pas accessible depuis Internet) —
      **au niveau Spring** : `management.endpoints.web.exposure.include: health,info,metrics`
      (jamais `*`). L'application effective de l'isolation réseau (aucun port publié en
      production) reste le périmètre d'EN07.1 (`docker-compose.prod.yml`) — coordination
      actée, voir note ci-dessous.
- [x] Health check Docker `HEALTHCHECK CMD curl -f http://localhost:8081/actuator/health || exit 1`

**Statut** : ✅ Fait — `pivot-core` [#158](https://github.com/PIVOT-PLATFORM/pivot-core/pull/158)

**Réconciliation EN07.1** : `docker-compose.prod.yml` (PR pivot-core#149, toujours ouverte)
cible actuellement `http://localhost:8080/api/actuator/health` pour son healthcheck — chemin
qui disparaît une fois ce port déplacé. Chemin correct post-merge des deux PR :
`http://localhost:8081/actuator/health` (pas de préfixe `/api` : un `management.server.port`
distinct n'hérite pas de `server.servlet.context-path`). Commentaire de coordination posté sur
PR#149 ; mise à jour du fichier compose laissée à EN07.1 lors du rebase.

---
Item Type: Enabler · Parent: E04 · Type: observabilité · Module: core · Phase: Socle
Stage: ✅ · Priority: High
