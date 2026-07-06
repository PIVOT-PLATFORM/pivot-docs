# Sprint 4 — Infrastructure prod + Auth avancé + Notifications

**Branches :** une branche par US/Enabler — `feat/{us-id}-{slug}` (voir [§Règles d'utilisation](./README.md#règles-dutilisation))
**Scope :** E07 (infra déploiement) + US01 sécurité avancée + EN-NOTIF + US16 restants + US03 SUPER_ADMIN

| US | Titre | Size | Priorité | 🤖 Dev |
|----|-------|------|----------|--------|
| EN07.1 | Docker Compose production | M | Critical | ⬜ |
| EN07.2 | Secret management Docker secrets | M | Critical | ⬜ |
| EN07.5 | deploy.yml GitHub Actions CI/CD vers prod | S | Critical | ⬜ |
| US01.4.2 | Gérer ses appareils de confiance | M | High | ⬜ |
| US01.4.3a | Alerte connexion depuis nouvel appareil | M | High | ⬜ |
| US01.5.1 | Notification email action sensible | M | High | ⬜ |
| EN-NOTIF | Infrastructure notifications in-app | L | High | ⬜ |
| US16.1.3 | Badge notifications | S | Medium | ⬜ |
| US16.2.2 | Section modules à venir | S | Medium | 🔄 |
| US03.3.1 | SUPER_ADMIN définit modules disponibles par plan | M | Medium | ⬜ |
| US03.3.2 | SUPER_ADMIN active/désactive module par tenant (override) | M | Medium | ⬜ |
| US03.3.3 | Admin tenant voit uniquement modules de son plan | S | Medium | ⬜ |
| EN04.1 | Logs structurés JSON + MDC (requestId, tenantId, userId) | S | Medium | ⬜ |
| EN04.2 | Spring Actuator (management port :8081, non routé nginx) | S | Medium | ⬜ |
| EN04.3 | Micrometer + Prometheus scraping `/actuator/prometheus` | S | Medium | ⬜ |
| EN04.4 | Docker HEALTHCHECK + liveness / readiness separation | S | Medium | ⬜ |

> **Blocker :** EN-NOTIF doit précéder US16.1.3. EN07.x validé avant toute release prod. EN04.x parallélisables entre eux.
