# ADR-001 — Stack technique PIVOT

**Statut :** Accepté
**Date :** 2026-06-20

## Contexte

Refonte complète du POC PouetPouet (Node.js/TypeScript) en une suite collaborative production-ready. Choix de la stack technique backend et frontend.

## Décision

**Backend :** Java 25 · Spring Boot 4.x · Maven · Flyway
**Frontend :** Angular 22 · TypeScript strict · SCSS

## Raisons

### Backend Java/Spring Boot

- Écosystème mature pour applications d'entreprise (sécurité, multi-tenancy, transactions)
- Spring Security 7 : opaque tokens SHA-256 (auth interne) + resource server OIDC/JWKS (enterprise), `@PreAuthorize`, filtres
- Spring Data JPA + Flyway : migrations versionnées (V1__, V2__…), intégrité référentielle
- Spring WebSocket (STOMP) : temps réel pour sessions live
- Testcontainers : tests d'intégration réalistes (PostgreSQL, Redis)
- vs Node.js : typage fort, meilleure isolation des threads, écosystème enterprise plus riche

### Frontend Angular

- Framework complet : routing, HttpClient, formulaires, i18n intégré
- TypeScript strict par défaut — cohérence avec une codebase enterprise
- Angular Signals (17+) : state management réactif sans bibliothèque externe
- `ChangeDetectionStrategy.OnPush` : performances sur composants complexes
- Lazy-loading natif : modules activables sans bundle initial alourdi
- vs React : conventions strictes facilitent la maintenance à plusieurs, moins de décisions d'architecture

## Conséquences

- Courbe d'apprentissage Angular pour profils React
- JDK 25 requis en CI et en production
- Maven Wrapper supprimé — Maven installé via `apt` dans Dockerfile

## Historique

| Version | Date | Évolution |
|---------|------|-----------|
| v1 | 2026-06-20 | Décision initiale |
