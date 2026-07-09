# EN01.14 — ClientRegistrationRepository dynamique par tenant

**Type d'enabler** : architecture · sécurité

**Objectif technique** : Remplacer le flux OIDC actuel (PKCE géré côté Angular, `OidcAuthController`
recevant un token déjà échangé) par un `oauth2Login` Spring Security exécuté entièrement côté
serveur, avec un `ClientRegistrationRepository` qui résout `issuer`/`client_id`/`client_secret`
depuis PostgreSQL selon le tenant (au lieu d'une configuration statique par variable
d'environnement).

**Justification** : [ADR-004 v2](../../../adr/ADR-004-oidc-multi-tenant.md) retient le pattern
BFF — Angular ne doit plus manipuler de token IdP ni exécuter lui-même le PKCE. C'est un
changement d'implémentation réel : aujourd'hui aucun `oauth2Login` ni `ClientRegistrationRepository`
n'existe côté `pivot-core` (vérifié dans le code, pas seulement dans le backlog).

**Critères de complétion** :
- [ ] `ClientRegistrationRepository` custom : lookup par tenant (sous-domaine ou chemin) depuis
      `tenant_oidc_configs` (réutilise l'entité `TenantOidcConfig` d'EN01.12)
- [ ] Découverte automatique via `/.well-known/openid-configuration`
- [ ] `GET /oauth2/authorization/{tenant}` déclenche la redirection IdP, callback géré par Spring
      Security (plus de code d'échange PKCE côté Angular)
- [ ] Secrets IdP (`client_secret`) chiffrés en base — voir ADR-014
- [ ] Migration des tenants existants configurés (Azure AD, Okta) vers le nouveau mécanisme sans
      interruption de service

**Dépendances** : [ADR-004 v2](../../../adr/ADR-004-oidc-multi-tenant.md), EN01.12 (Infrastructure
Multi-tenant), bloque EN01.17 (rework auth frontend), EN01.18 (retrait PKCE Angular)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E01 · Type: architecture · Module: oidc · Phase: v1-enterprise · Size: L
Stage: ⬜ · Priority: High
