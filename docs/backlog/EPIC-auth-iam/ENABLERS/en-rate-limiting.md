# EN01.4 — Rate Limiting (Redis)

**Type d'enabler** : sécurité · infrastructure

**Objectif technique** : Sliding-window rate limiter Redis-backed sur tous les endpoints d'auth sensibles. Protège contre les attaques par force brute et l'énumération.

**Critères de complétion** :
- [x] `RateLimiterService` : sliding window Redis, configurable par endpoint
- [x] Endpoints couverts : `POST /auth/login`, `POST /auth/register`, `POST /auth/forgot-password`, `POST /auth/resend-verification`, `POST /auth/device-otp`
- [x] Réponse 429 avec header `Retry-After` au dépassement
- [x] Limite configurable via `FeatureFlag` (pas de redéploiement nécessaire)
- [x] Test `RateLimiterServiceTest`

**Statut** : ✅ Fait — Stage: Done

---
Item Type: Enabler · Parent: E01 · Type: sécurité · Module: auth · Phase: MVP
Human Gate: human-validated · Stage: Done
