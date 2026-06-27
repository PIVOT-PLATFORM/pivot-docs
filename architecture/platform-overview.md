# Architecture cible — PIVOT Platform

## Vue d'ensemble

PIVOT est une suite collaborative auto-hébergeable, conçue pour les associations, TPE/PME et entreprises. Elle repose sur un système de **modules activables individuellement** par tenant.

![PIVOT Platform Architecture](diagrams/platform-overview.png)

> Source PlantUML : [`diagrams/platform-overview.puml`](diagrams/platform-overview.puml)

---

## Flux et protocoles

| Lien | Protocole | Chiffrement | Notes |
|------|-----------|-------------|-------|
| Browser → nginx | **HTTPS :443** | TLS 1.3 | pages, assets, requêtes API |
| Browser → nginx | **WSS :443** /ws/** | TLS 1.3 | WebSocket Secure · STOMP upgrade |
| nginx → pivot-core | **HTTP :8080** | aucun | réseau Docker interne (`pivot-net`) — décision consciente¹ |
| nginx → pivot-core | **WS :8080** | aucun | proxy WebSocket interne |
| pivot-core → PostgreSQL | **JDBC :5432** | `ssl=require` (prod) | `ssl=disable` en dev Testcontainers |
| pivot-core → Redis | **RESP :6379** | `requirepass` + TLS (prod) | no-auth en dev |
| pivot-core → SMTP | **SMTPS :465** (prod) / **SMTP :1025** (dev) | TLS (prod) | emails vérification · reset pwd · OTP device |
| Browser → IdP | **HTTPS :443** | TLS | OIDC Authorization Code + PKCE S256 · state · nonce |
| pivot-core → IdP JWKS | **HTTPS :443** | TLS | validation signature · expiry · issuer · rotation auto |

¹ **HTTP interne acceptable** si le réseau Docker est isolé (réseau non exposé sur l'hôte). En cas de déploiement multi-hôtes, activer mTLS nginx↔core.

---

## Couches techniques

| Couche | Technologie | Repo |
|--------|-------------|------|
| Frontend | Angular 22 · TypeScript strict · SCSS BEM | pivot-ui |
| Reverse proxy / TLS | nginx · HSTS · CSP · X-Frame-Options | pivot-ui |
| API REST | Spring Boot 4.x · Java 25 · Maven | pivot-core |
| Base de données | PostgreSQL 18 · Spring Data JPA · Flyway | pivot-core |
| Cache / Temps réel | Redis 7 · Spring WebSocket (STOMP) | pivot-core |
| Auth interne | Spring Security 7 · Opaque tokens SHA-256 (BDD) | pivot-core |
| Auth enterprise | OIDC PKCE S256 (Angular) · resource server JWKS (Spring) | pivot-core + pivot-ui |
| Tests backend | JUnit 5 · Mockito · Testcontainers | pivot-core |
| Tests frontend | Vitest · Playwright | pivot-ui |
| CI/CD | GitHub Actions · SonarCloud · Plumber · Semantic Release | tous |
| Déploiement | Docker · Docker Compose | tous |

---

## Mécanismes d'authentification

PIVOT supporte deux mécanismes distincts selon le contexte de déploiement :

| Mécanisme | Contexte | Détail |
|-----------|---------|--------|
| **Opaque tokens** | Auth interne (email/password) | Token 256-bit SecureRandom · hash SHA-256 stocké en BDD (`access_tokens`) · raw token jamais persisté · TTL en BDD · révocable · max 5 sessions/utilisateur |
| **OIDC enterprise** | Tenants avec IdP externe | PKCE S256 côté Angular · validation JWKS côté Spring · multi-tenant (`TenantOidcConfig`) · rotation de clés IdP transparente |

> Access token toujours en mémoire uniquement — **jamais localStorage, jamais cookie**. Voir [ADR-005](../adr/ADR-005-opaque-tokens.md).

**WebSocket auth** : Spring Security intercepte le handshake HTTP → opaque token vérifié avant l'upgrade WebSocket → connexion STOMP sécurisée.

**CORS** : `http://localhost:4200` strict en dev. En prod avec nginx proxy, les appels API sont same-origin → CORS non requis côté pivot-core.

---

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
- Aucune logique inter-module directe → `ApplicationEventPublisher` (backend) · services core Angular (frontend)
- Contrat de module défini par `PivotModule` interface (voir [ADR-003](../adr/ADR-003-systeme-modules.md))

---

## Schéma de rôles

| Rôle | Périmètre | Droits |
|------|-----------|--------|
| `ROLE_SUPER_ADMIN` | Plateforme | Gestion tenants, configuration globale |
| `ROLE_ADMIN` | Tenant | Activation modules, gestion utilisateurs |
| `ROLE_USER` | Tenant | Utilisation des modules activés |
| `ROLE_GUEST` | Session | Participation anonyme (sessions live) |

---

## Gaps de sécurité — MVP (backlog)

| Gap | Risque | Mitigation cible |
|-----|--------|-----------------|
| Rate limiting absent | Brute force `/auth/login` · `/auth/forgot-password` | Bucket4j (Spring) ou `nginx limit_req` |
| Redis sans TLS en dev | Port accidentellement exposé | `requirepass` + réseau Docker interne uniquement |
| PostgreSQL `ssl=disable` en dev | Connexion JDBC en clair | Testcontainers uniquement — non exposé |
| nginx→core HTTP | Lisible si host partagé | mTLS en cas de déploiement multi-hôtes |

---

## Déploiement

```bash
docker compose up -d   # pivot-core : postgres + redis + mailpit + app
```

Production : image Docker nginx (pivot-ui) + image Docker JRE (pivot-core) + PostgreSQL managé + Redis managé.
