# Sprint 4 — Infrastructure prod + Auth avancé + Notifications

**Branches :** une branche par US/Enabler — `feat/{us-id}-{slug}` (voir [§Règles d'utilisation](./README.md#règles-dutilisation))
**Scope :** E07 (infra déploiement) + US01 sécurité avancée + EN-NOTIF + US16 restants + US03 SUPER_ADMIN

| US | Titre | Size | Priorité | 🤖 Dev |
|----|-------|------|----------|--------|
| EN07.1 | Docker Compose production | M | Critical | 🔄 In progress |
| EN07.2 | Secret management Docker secrets | M | Critical | 🔎 Review |
| EN07.5 | deploy.yml GitHub Actions CI/CD vers prod | S | Critical | ⬜ |
| US01.4.2 | Gérer ses appareils de confiance | M | High | 🔄 In progress |
| US01.4.3a | Alerte connexion depuis nouvel appareil | M | High | 🔄 In progress |
| US01.5.1 | Notification email action sensible | M | High | 🔄 In progress |
| EN-NOTIF | Infrastructure notifications in-app | L | High | ⬜ |
| US16.1.3 | Badge notifications | S | Medium | ⬜ |
| US16.2.2 | Section modules à venir | S | Medium | 🔎 Review |
| US03.3.1 | SUPER_ADMIN définit modules disponibles par plan | M | Medium | 🔎 Review |
| US03.3.2 | SUPER_ADMIN active/désactive module par tenant (override) | M | Medium | 🔎 Review |
| US03.3.3 | Admin tenant voit uniquement modules de son plan | S | Medium | 🔎 Review |
| EN04.1 | Logs structurés JSON + MDC (requestId, tenantId, userId) | S | Medium | 🔄 |
| EN04.2 | Spring Actuator (management port :8081, non routé nginx) | S | Medium | 🔎 Review |
| EN04.3 | Micrometer + Prometheus scraping `/actuator/prometheus` | S | Medium | 🔎 Review |
| EN04.4 | Docker HEALTHCHECK + liveness / readiness separation | S | Medium | ⬜ |

> **Blocker :** EN-NOTIF doit précéder US16.1.3. EN07.x validé avant toute release prod. EN04.x parallélisables entre eux.
>
> **Démarrage (2026-07-06) :** US16.2.2 était déjà implémentée et mergée (`pivot-ui` #47) — statut resynchronisé, pas relancée. Vague 1 (max 6 agents en parallèle) lancée sur EN07.1, EN07.2, US01.4.2, US01.4.3a, US01.5.1, US03.3.1 — `Stage: In progress` dans les fichiers US concernés dès le démarrage de chaque agent. **Note EN07.1 :** l'AC d'origine référence `pivot-pilotage-core`/`pivot-agilite-core`/`pivot-collaboratif-core` — repos pas encore créés ; scope clarifié (Gate 1 autonome) pour couvrir uniquement les services existants (nginx, pivot-core, pivot-ui, postgres, redis), le reste documenté comme différé plutôt que fabriqué.
>
> **EN07.2 (2026-07-06) :** Gate 4 = 100/100, `pivot-core` PR [#150](https://github.com/PIVOT-PLATFORM/pivot-core/pull/150) sortie du mode draft. Point de coordination ouvert avec EN07.1 (PR [#149](https://github.com/PIVOT-PLATFORM/pivot-core/pull/149)) sur le nommage des cibles Docker secrets dans `docker-compose.prod.yml` — commentaire posté sur les deux PR, à réconcilier avant fusion de la seconde.
>
> **EN04.2 (2026-07-06) :** Gate 4 en cours, `pivot-core` PR [#158](https://github.com/PIVOT-PLATFORM/pivot-core/pull/158). Point de coordination ouvert avec EN07.1 (PR [#149](https://github.com/PIVOT-PLATFORM/pivot-core/pull/149)) sur le chemin du healthcheck Docker (`:8080/api/actuator/health` → `:8081/actuator/health` une fois les deux fusionnées) — commentaire posté sur PR#149, à réconcilier avant fusion.
>
> **EN04.3 :** Gate 4 = 100/100, `pivot-core` PR
> [#157](https://github.com/PIVOT-PLATFORM/pivot-core/pull/157) (`feat/en04-3-micrometer-prometheus`)
> sortie du mode draft (label `auto-approved`). Spec figée (Gate 5) :
> `docs/specs/EPIC-observabilite/en04-3-micrometer-prometheus.md`. Points de coordination
> ouverts :
> - **EN04.2** (PR [#158](https://github.com/PIVOT-PLATFORM/pivot-core/pull/158), ouverte après
>   coup côté EN04.3) : même valeur `management.server.port: 8081` des deux côtés — pas de
>   conflit là. En revanche les deux PR modifient la **même ligne**
>   `management.endpoints.web.exposure.include` (EN04.3 : `health,info,prometheus` · EN04.2 :
>   `health,info,metrics`) — à fusionner en `health,info,metrics,prometheus` (union, pas le
>   contenu d'un seul des deux côtés) au merge de la seconde des deux PR, sous peine de faire
>   disparaître silencieusement un endpoint (404, aucun test/build ne le détecte). Commentaire
>   posé sur les deux PR (#157 et #158).
> - **EN07.1** (PR [#149](https://github.com/PIVOT-PLATFORM/pivot-core/pull/149)) : le
>   healthcheck Docker de `pivot-core` (`http://localhost:8080/api/actuator/health`) doit passer
>   à `http://localhost:8081/actuator/health` une fois EN04.3 et EN07.1 fusionnées — Actuator
>   quitte le port principal.
>
> **US03.3.1 (2026-07-06) :** implémentation terminée — `pivot-core` PR
> [#153](https://github.com/PIVOT-PLATFORM/pivot-core/pull/153) et `pivot-ui` PR
> [#101](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/101), Gate 4 = 100/100 sur les deux,
> CI verte, PR ouvertes et prêtes pour review (pas encore mergées) — `Stage` passé à `Review`
> dans le fichier US.
