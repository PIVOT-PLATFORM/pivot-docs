# EN01.2 — Configuration Spring Security

**Type d'enabler** : infrastructure · sécurité

**Objectif technique** : Configuration Spring Security 7 pour l'authentification par opaque token, CORS, CSRF, headers HTTP de sécurité.

**Critères de complétion** :
- [x] `SecurityConfig.java` : filtre opaque token, endpoints publics/protégés
- [x] CORS configuré pour l'origine Angular dev + prod
- [x] CSRF désactivé pour les API stateless (tokens dans cookies HttpOnly)
- [x] Headers sécurité : X-Frame-Options, X-Content-Type-Options, Referrer-Policy
- [x] `@PreAuthorize` sur les endpoints sensibles (ROLE_USER, ROLE_ADMIN)
- [x] Spring Actuator endpoints protégés (accès interne uniquement)

**Statut** : ✅ Fait — Stage: Done

---
Item Type: Enabler · Parent: E01 · Type: sécurité · Module: auth · Phase: MVP
Stage: Done
