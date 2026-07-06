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
| US03.3.1 | SUPER_ADMIN définit modules disponibles par plan | M | Medium | 🔄 In progress |
| US03.3.2 | SUPER_ADMIN active/désactive module par tenant (override) | M | Medium | ⬜ |
| US03.3.3 | Admin tenant voit uniquement modules de son plan | S | Medium | ⬜ |
| EN04.1 | Logs structurés JSON + MDC (requestId, tenantId, userId) | S | Medium | ⬜ |
| EN04.2 | Spring Actuator (management port :8081, non routé nginx) | S | Medium | ⬜ |
| EN04.3 | Micrometer + Prometheus scraping `/actuator/prometheus` | S | Medium | ⬜ |
| EN04.4 | Docker HEALTHCHECK + liveness / readiness separation | S | Medium | ⬜ |

> **Blocker :** EN-NOTIF doit précéder US16.1.3. EN07.x validé avant toute release prod. EN04.x parallélisables entre eux.
>
> **Démarrage (2026-07-06) :** US16.2.2 était déjà implémentée et mergée (`pivot-ui` #47) — statut resynchronisé, pas relancée. Vague 1 (max 6 agents en parallèle) lancée sur EN07.1, EN07.2, US01.4.2, US01.4.3a, US01.5.1, US03.3.1 — `Stage: In progress` dans les fichiers US concernés dès le démarrage de chaque agent. **Note EN07.1 :** l'AC d'origine référence `pivot-pilotage-core`/`pivot-agilite-core`/`pivot-collaboratif-core` — repos pas encore créés ; scope clarifié (Gate 1 autonome) pour couvrir uniquement les services existants (nginx, pivot-core, pivot-ui, postgres, redis), le reste documenté comme différé plutôt que fabriqué.
>
> **EN07.2 (2026-07-06) :** Gate 4 = 100/100, `pivot-core` PR [#150](https://github.com/PIVOT-PLATFORM/pivot-core/pull/150) sortie du mode draft. Point de coordination ouvert avec EN07.1 (PR [#149](https://github.com/PIVOT-PLATFORM/pivot-core/pull/149)) sur le nommage des cibles Docker secrets dans `docker-compose.prod.yml` — commentaire posté sur les deux PR, à réconcilier avant fusion de la seconde.
