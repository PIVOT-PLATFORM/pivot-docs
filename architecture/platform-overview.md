# Architecture cible — PIVOT Platform

## Vue d'ensemble

PIVOT est une suite collaborative auto-hébergeable, conçue pour les associations, TPE/PME et entreprises. Elle repose sur un système de **modules activables individuellement** par tenant.

```
┌─────────────────────────────────────────────────────────┐
│                     PIVOT Platform                      │
│                                                         │
│  ┌──────────────┐        ┌──────────────────────────┐  │
│  │  pivot-ui    │◄──────►│      pivot-core           │  │
│  │  Angular 22  │  REST  │  Spring Boot 4.x          │  │
│  │  nginx       │  WS    │  Java 25                  │  │
│  └──────────────┘        │  PostgreSQL 18            │  │
│                          │  Redis 7                  │  │
│                          │  Liquibase                │  │
│                          └──────────────────────────┘  │
│                                    │                    │
│                          ┌─────────▼──────────┐        │
│                          │   IdP externe       │        │
│                          │ Keycloak/Azure/Okta │        │
│                          │  OIDC PKCE S256     │        │
│                          └────────────────────┘        │
└─────────────────────────────────────────────────────────┘
```

## Couches techniques

| Couche | Technologie | Repo |
|--------|-------------|------|
| Frontend | Angular 22 · TypeScript strict · SCSS BEM | pivot-ui |
| API REST | Spring Boot 4.x · Java 25 · Maven | pivot-core |
| Base de données | PostgreSQL 18 · Spring Data JPA · Liquibase | pivot-core |
| Cache / Temps réel | Redis 7 · Spring WebSocket (STOMP) | pivot-core |
| Auth | Spring Security · JWT · OIDC (PKCE S256) | pivot-core + pivot-ui |
| Tests backend | JUnit 5 · Mockito · Testcontainers | pivot-core |
| Tests frontend | Vitest · Playwright | pivot-ui |
| CI/CD | GitHub Actions · SonarCloud · Plumber · Semantic Release | tous |
| Déploiement | Docker · Docker Compose | tous |

## Modules activables

Chaque module est activable indépendamment par les admins tenant.

| Module | Description | Inspiration |
|--------|-------------|-------------|
| `whiteboard` | Tableau blanc collaboratif temps réel | PouetPouet |
| `session` | Sessions live : QUIZ, POLL, WORDCLOUD, BRAINSTORM, QA | Klaxoon |
| `roadmap` | Roadmap / Gantt intégré | — |
| `survey` | Système de sondage | — |
| `quiz` | Quiz interactif gamifié | Kahoot |

### Principe d'isolation

- Module désactivé → 403 côté API + bundle Angular non chargé (lazy-loading)
- Aucune logique inter-module directe → bus d'événements (`ApplicationEventPublisher` côté backend, services core côté Angular)
- Contrat de module défini par `PivotModule` interface (voir [ADR-003](../adr/ADR-003-systeme-modules.md))

## Multi-tenancy OIDC

| Rôle | Périmètre | Droits |
|------|-----------|--------|
| `ROLE_SUPER_ADMIN` | Plateforme | Gestion tenants, configuration globale |
| `ROLE_ADMIN` | Tenant | Activation modules, gestion utilisateurs |
| `ROLE_USER` | Tenant | Utilisation des modules activés |
| `ROLE_GUEST` | Session | Participation anonyme (sessions live) |

Rôles portés via claims OIDC. Mapping claims → rôles configurable par tenant (voir [ADR-004](../adr/ADR-004-oidc-multi-tenant.md)).

## Déploiement

```
docker compose up -d   # pivot-core : postgres + redis + mailpit + app
```

Production : image Docker nginx (pivot-ui) + image Docker JRE (pivot-core) + PostgreSQL managé + Redis managé.
