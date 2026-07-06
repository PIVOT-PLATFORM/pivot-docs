# EN07.1 — Docker Compose production complet (multi-repo)

**Type d'enabler** : infrastructure · déploiement

**Scope clarifié (Gate 1, self-challenge PO Agent — voir aussi `sprints/sprint-4.md`) :**
l'AC d'origine liste `pivot-pilotage-core`, `pivot-agilite-core`, `pivot-collaboratif-core`,
`activemq` et `pgbouncer`. Aucun de ces éléments n'existe dans l'organisation à ce jour :
- les trois repos module-core sont **« à créer avec le repo »** (`pivot-platform/CLAUDE.md`)
  — pas encore de code, pas d'image à référencer ;
- `pivot-core` n'a **aucune dépendance ActiveMQ/RabbitMQ/Kafka/pgbouncer** (vérifié :
  `pom.xml`, `application*.yml`, `src/` — le seul point commun est
  `spring-boot-starter-websocket`, broker STOMP **interne** à Spring, pas de broker externe).

Implémenté pour ce qui existe réellement aujourd'hui (nginx = image `pivot-ui`, `pivot-core`,
`postgres` schéma `public` uniquement, `redis`) — le reste est documenté en commentaires dans
le fichier compose (et dans la doc de déploiement) comme différé, jamais fabriqué par
anticipation. ActiveMQ et PgBouncer ont d'ailleurs leurs propres Enablers dédiés :
[EN07.3](en-activemq.md), [EN07.4](en-pgbouncer.md).

**Critères de complétion** :
- [x] `docker-compose.prod.yml` avec les services existants aujourd'hui :
  - [x] `nginx` (image `pivot-ui` — API gateway + static SPA) — `:80` (`:443`/TLS différé,
        nécessite un changement `nginx.conf` côté `pivot-ui` — repo distinct)
  - [x] `pivot-core` :8080 — auth · tenant · team · module registry (aucun port publié)
  - [ ] `pivot-pilotage-core` :8081 — **différé**, repo pas encore créé (bloc commentaire
        dans le compose marquant où l'intégrer)
  - [ ] `pivot-agilite-core` :8082 — **différé**, repo pas encore créé (idem)
  - [ ] `pivot-collaboratif-core` :8083 — **différé**, repo pas encore créé (idem)
  - [x] `postgres` :5432 — instance unique, schéma `public` uniquement aujourd'hui (les
        schémas `pilotage`/`agilite`/`collaboratif` viendront avec leurs repos respectifs)
  - [x] `redis` :6379 — cache partagé, prêt pour les futurs module-cores
  - [ ] `activemq` :61613/:61617 — **différé**, suivi par [EN07.3](en-activemq.md)
  - [ ] `pgbouncer` :5432 — **différé**, suivi par [EN07.4](en-pgbouncer.md)
- [x] Health checks Docker sur chaque service (`/api/actuator/health` pour `pivot-core` —
      `server.servlet.context-path=/api` s'applique aussi à Actuator ; `wget` sur `/` pour
      `nginx` ; `pg_isready`/`redis-cli ping` pour `postgres`/`redis`)
- [x] Volumes persistants : `postgres_data`, `redis_data` (`activemq` kahadb différé avec
      EN07.3)
- [x] Restart policy `unless-stopped` sur tous les services
- [x] Réseaux Docker isolés : `pivot-net-app` (nginx ↔ `pivot-core`) + `pivot-net-data`
      (`pivot-core` ↔ `postgres`/`redis`, `internal: true`)
- [x] Aucun port backend exposé directement — tout passe par `nginx`
- [x] Variables d'environnement via Docker secrets (fichiers + `configtree` Spring Boot) —
      pas de `.env` en prod. Voir aussi [EN07.2](en-secret-management.md) — Enabler distinct,
      en cours en parallèle, qui couvre la même zone en plus de détail (rotation, audit
      `.env.example`) : à réconcilier entre les deux PRs.
- [x] Documentation déploiement dans `pivot-docs` —
      [`docs/cicd/docker-compose-prod.md`](pathname:///pivot-docs/cicd/docker-compose-prod)

**Note multi-repo :** chaque `pivot-xxx-core` est un conteneur Docker indépendant. Si un module tombe,
les autres restent disponibles. nginx retourne 503 uniquement sur le préfixe du module KO.
*(Comportement documenté pour quand les module-cores existeront — non observable aujourd'hui
puisqu'aucun n'est encore déployé.)*

**PR** : [pivot-core#149](https://github.com/PIVOT-PLATFORM/pivot-core/pull/149) (draft — Autoloop Gate 4 en cours)

**Statut** : 🔎 Implémenté, en revue (Autoloop PR pivot-core en cours — périmètre clarifié,
module-cores/activemq/pgbouncer différés, voir note ci-dessus) — Gate: In progress

---
Item Type: Enabler · Parent: E07 · Type: infrastructure · Module: core · Phase: Socle
Stage: In progress · Priority: Critical
