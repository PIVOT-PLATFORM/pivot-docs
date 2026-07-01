# EN01.5 — Feature Flags (BDD)

**Type d'enabler** : architecture · infrastructure

**Objectif technique** : Système de feature flags administrable via BDD (`feature_flags` table). Permet de configurer TTL sessions, limites rate limiting, comportements d'auth sans redéploiement.

**Critères de complétion** :
- [x] Entité `FeatureFlag` : `key`, `value`, `description`, `updated_at`
- [x] Repository `FeatureFlagRepository`
- [x] `TokenService` consomme `SESSION_TTL_SECONDS` depuis les flags
- [x] `RateLimiterService` consomme les seuils de rate limiting
- [x] Cache courte durée (évite N+1 sur chaque requête)
- [x] Test `FeatureFlagRepositoryTest`

**Statut** : ✅ Fait — Stage: Done

---
Item Type: Enabler · Parent: E01 · Type: architecture · Module: auth · Phase: MVP
Human Gate: human-validated · Stage: Done
