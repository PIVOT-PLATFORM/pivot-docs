# EN01.13 — Token Exchange & identité propagée

**Type d'enabler** : architecture · sécurité

**Objectif technique** : Comment l'identité de l'utilisateur atteint-elle un module trois couches plus bas, sans partager de mot de passe ni « faire confiance » au portail ? L'utilisateur s'authentifie une fois auprès de Keycloak ; à chaque appel descendant, le token utilisateur est **échangé** (OAuth2 Token Exchange, RFC 8693) contre un token à portée réduite, spécifique au module cible et à l'action, à durée de vie courte.

**Critères de complétion** :
- [ ] Implémentation du Token Exchange (RFC 8693) côté Keycloak
- [ ] Distinction claire entre **contexte utilisateur** (token échangé, *on-behalf-of*) et **contexte de service** (identité de charge / workload identity, mTLS, droits minimaux)
- [ ] Le module cible reçoit une preuve cryptographique de « qui agit et pour quoi », sans jamais voir les credentials d'origine
- [ ] L'audit trace la personne réelle, pas « le portail », même au fond de la pile d'appels

**Dépendances** : ADR-004 (OIDC multi-tenant), [E43 EN43.3](../../EPIC-securite/ENABLERS/en-service-mesh.md) (Service Mesh, identité de charge)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E01 · Type: architecture · Module: auth · Phase: phase-3
Stage: ⬜ · Priority: High
