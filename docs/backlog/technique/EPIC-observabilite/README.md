# E04 — Observabilité

## Objectif

Donner une visibilité complète sur l'état de la plateforme en production : logs structurés, métriques applicatives, health checks et alertes — sur **tous les backends** (pivot-core + pivot-xxx-core).

## Périmètre GitHub (MVP — Critical)

- EN04.1 : Logs structurés JSON + MDC (requestId, tenantId, userId)
- EN04.2 : Spring Actuator endpoints (health, info, metrics) — non exposés à nginx
- EN04.3 : Micrometer → export Prometheus (scraping compatible Grafana)
- EN04.4 : Health checks liveness + readiness Docker (basés sur `/actuator/health`)

## Périmètre GitHub (v1-enterprise)

- EN04.5 : Dashboard Grafana — métriques JVM + DB + Redis + ActiveMQ par module
- EN04.6 : Alerting Grafana — SLO temps de réponse · taux d'erreur · saturation Redis/DB

## Modules impactés

Tous les backends : `pivot-core` · `pivot-pilotage-core` · `pivot-agilite-core` · `pivot-collaboratif-core`

## Dépendances

- Dépend de : E07 Infrastructure (EN07.1 Docker Compose prod)
- Prérequis pour : opération en production, debugging incidents

## Statut global

⬜ À planifier — MVP Critical

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **Phase MVP — Critical** | |
| [EN04.1 — Logs structurés JSON + MDC](ENABLERS/en-logs-structures.md) | ⬜ |
| [EN04.2 — Spring Actuator endpoints](ENABLERS/en-actuator.md) | ⬜ |
| [EN04.3 — Micrometer Prometheus](ENABLERS/en-micrometer-prometheus.md) | ⬜ |
| [EN04.4 — Health checks Docker liveness + readiness](ENABLERS/en-health-checks.md) | ⬜ |
| **Phase v1-enterprise** | |
| EN04.5 — Dashboard Grafana | ⏸️ |
| EN04.6 — Alerting Grafana SLO | ⏸️ |
