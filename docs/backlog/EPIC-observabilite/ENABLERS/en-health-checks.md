# EN04.4 — Health checks Docker liveness + readiness

**Type d'enabler** : observabilité · déploiement

**Dépendances (Gate 1, résolues par fusion locale — voir PR pivot-core pour le détail) :**
cet Enabler nécessite le `docker-compose.prod.yml` d'EN07.1
([pivot-core#149](https://github.com/PIVOT-PLATFORM/pivot-core/pull/149)) et le port de
management Actuator d'EN04.2
([pivot-core#158](https://github.com/PIVOT-PLATFORM/pivot-core/pull/158)) — toutes deux
Gate 4 = 100/100 mais pas encore fusionnées dans `main` au moment de l'implémentation.
Développé dans un worktree fusionnant localement les deux branches (jamais poussé sur
`main` ainsi) ; rebase de `pivot-core#162` nécessaire dès que l'une ou l'autre sera mergée.

**Critères de complétion** :
- [x] Chaque service backend dans `docker-compose.prod.yml` :
      `HEALTHCHECK CMD curl -f http://localhost:8081/actuator/health || exit 1` —
      **`pivot-core` uniquement à ce stade** (les repos module-core n'existent pas encore,
      même constat qu'EN07.1/EN04.2). Le fichier hérité d'EN07.1 ciblait encore l'ancien
      chemin partagé (`:8080/api/actuator/health`, `wget`) — corrigé au passage vers le
      chemin EN04.2 (`:8081/actuator/health`, `curl`, déjà installé dans l'image pour le
      `HEALTHCHECK` du `Dockerfile`).
- [x] `start_period: 30s` · `interval: 10s` · `timeout: 5s` · `retries: 3` — `Dockerfile` et
      `docker-compose.prod.yml` alignés (le fichier hérité d'EN07.1 avait 15s/5s/30s/5).
- [x] nginx `upstream` configuré avec `max_fails=3 fail_timeout=30s` — **repo séparé**
      ([pivot-ui#104](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/104), le nginx réel
      vit dans `pivot-ui/nginx.conf`, pas dans `pivot-core` — investigation documentée dans
      cette PR). Avec un seul serveur dans le pool aujourd'hui (aucun module-core existant),
      `max_fails`/`fail_timeout` sont **inertes par conception nginx** (documenté,
      [nginx.org](https://nginx.org/en/docs/http/ngx_http_upstream_module.html)) — le 503 en
      cas de panne fonctionne dès aujourd'hui via un mécanisme indépendant
      (`proxy_intercept_errors`/`error_page`), détaillé dans la PR pivot-ui.
- [x] Endpoint `/actuator/health/readiness` séparé de `/actuator/health/liveness` — groupes
      natifs Spring Boot 4.1 (`management.endpoint.health.group.*`,
      `AvailabilityProbesAutoConfiguration`, actifs par défaut même hors Kubernetes — vérifié
      dans le jar, pas supposé), pas d'endpoint custom.
  - [x] liveness : JVM up (`livenessState` seul)
  - [x] readiness : DB connectée (`db`, contributeur auto-configuré) + Redis connecté
        (`redis`, idem) + Flyway migrations OK (`FlywayHealthIndicator`, **custom** — aucun
        contributeur Flyway natif dans Spring Boot 4.1, vérifié par inspection directe des
        jars `spring-boot-flyway`/`spring-boot-actuator-autoconfigure`/
        `spring-boot-autoconfigure`)
- [x] Test : simulation module KO → nginx retourne 503 sur son préfixe · health check global
      dégradé mais pas DOWN — **interprétation documentée** (AC ambigu, pas d'US pour
      clarifier de façon synchrone, décision PO Agent autonome) : testé avec le seul backend
      qui existe réellement aujourd'hui (`pivot-core`), pas la scène multi-module (repos
      module-core absents). "Dégradé mais pas DOWN" = readiness DOWN pendant que liveness
      reste UP (la distinction canonique liveness/readiness — une panne Redis/DB transitoire
      sort l'instance du trafic sans redémarrer le conteneur). Testé directement
      (`HealthLivenessReadinessIntegrationTest`, Redis coupé via Testcontainers en cours de
      test → readiness 503/DOWN, liveness reste 200/UP).

**Statut** : 🔎 Autoloop convergée (Gate 4) — `pivot-core`
[#162](https://github.com/PIVOT-PLATFORM/pivot-core/pull/162) (base non standard, voir
Dépendances ci-dessus) + `pivot-ui`
[#104](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/104) — Gate: Review

**Spec figée (Gate 5)** :
[`docs/specs/EPIC-observabilite/en04-4-healthchecks.md`](pathname:///pivot-docs/specs/EPIC-observabilite/en04-4-healthchecks)

**Coordination cross-PR** :
- **EN07.1 (#149) / EN04.2 (#158)** : rebase de `pivot-core#162` nécessaire une fois l'une
  ou l'autre mergée dans `main` (attendu sans conflit, à vérifier au moment du rebase).
- **EN04.2 → `en-actuator.md`** : sa note "Réconciliation EN07.1" indiquait que la
  correction de `docker-compose.prod.yml` serait faite "lors du rebase d'EN07.1" — en
  pratique, c'est cette PR (EN04.4) qui la corrige, périmètre naturel (healthchecks Docker).
- **EN07.5 (#155, `deploy.yml`)** : sa vérification post-déploiement cible
  `localhost/api/actuator/health` (chemin pré-EN04.2) — cassera une fois #158 mergée.
  Commentaire de coordination posté sur #155, hors périmètre de cette PR (branche/Enabler
  différents).

---
Item Type: Enabler · Parent: E04 · Type: observabilité · Module: core · Phase: Socle
Stage: Done · Priority: Critical
