# EN01.16 — Keycloak embarqué optionnel (profil Docker Compose)

**Type d'enabler** : infrastructure · sécurité

**Objectif technique** : Profil Docker Compose incluant Keycloak préconfiguré comme IdP par
défaut, pour les tenants (associations, TPE) sans IdP existant. Keycloak agit aussi en broker
pour les IdP SAML-only (ADFS legacy), sans écrire de code SAML dans `pivot-core`.

**Justification** : [ADR-004 v2](../../../adr/ADR-004-oidc-multi-tenant.md) prévoit Keycloak en
option, jamais en dépendance imposée — un tenant qui a déjà Entra ID ou Okta se branche en
direct via EN01.14, sans composant Keycloak.

**Critères de complétion** :
- [ ] Profil Docker Compose `--profile keycloak` (ou équivalent) : Keycloak + realm
      préconfiguré, désactivable sans impact sur les tenants ayant leur propre IdP
- [ ] Realm par défaut avec les claims mappés attendus par PIVOT (`pivot_role`,
      `pivot_super_admin`)
- [ ] Bridging SAML documenté (broker Keycloak → IdP SAML du client)
- [ ] Documentation setup (`docs/setup/`) : quand utiliser Keycloak embarqué vs IdP direct

**Dépendances** : EN01.14 (ClientRegistrationRepository dynamique)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E01 · Type: infrastructure · Module: oidc · Phase: v1-enterprise · Size: M
Stage: ⬜ · Priority: Medium
