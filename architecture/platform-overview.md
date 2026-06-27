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
│                          │  Flyway                   │  │
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
| Base de données | PostgreSQL 18 · Spring Data JPA · Flyway | pivot-core |
| Cache / Temps réel | Redis 7 · Spring WebSocket (STOMP) | pivot-core |
| Auth interne | Spring Security 7 · Opaque tokens SHA-256 (BDD) | pivot-core |
| Auth enterprise | OIDC PKCE S256 (Angular) · resource server JWKS (Spring) | pivot-core + pivot-ui |
| Tests backend | JUnit 5 · Mockito · Testcontainers | pivot-core |
| Tests frontend | Vitest · Playwright | pivot-ui |
| CI/CD | GitHub Actions · SonarCloud · Plumber · Semantic Release | tous |
| Déploiement | Docker · Docker Compose | tous |

## Mécanismes d'authentification

PIVOT supporte deux mécanismes distincts selon le contexte de déploiement :

| Mécanisme | Contexte | Détail |
|-----------|---------|--------|
| **Opaque tokens** | Auth interne (email/password) | Token 256-bit SecureRandom · hash SHA-256 stocké en BDD (`access_tokens`) · raw token jamais persisté · TTL en BDD · révocable · max 5 sessions/utilisateur |
| **OIDC enterprise** | Tenants avec IdP externe | PKCE S256 côté Angular · validation JWKS côté Spring · multi-tenant (`TenantOidcConfig`) |

> Access token toujours en mémoire uniquement — **jamais localStorage, jamais cookie**. Voir [ADR-005](../adr/ADR-005-opaque-tokens.md).

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

## Schéma de rôles

| Rôle | Périmètre | Droits |
|------|-----------|--------|
| `ROLE_SUPER_ADMIN` | Plateforme | Gestion tenants, configuration globale |
| `ROLE_ADMIN` | Tenant | Activation modules, gestion utilisateurs |
| `ROLE_USER` | Tenant | Utilisation des modules activés |
| `ROLE_GUEST` | Session | Participation anonyme (sessions live) |

## Déploiement

```bash
docker compose up -d   # pivot-core : postgres + redis + mailpit + app
```

Production : image Docker nginx (pivot-ui) + image Docker JRE (pivot-core) + PostgreSQL managé + Redis managé.
