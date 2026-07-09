# EN01.18 — Retrait du PKCE hand-rolled côté Angular

**Type d'enabler** : architecture · sécurité

**Objectif technique** : Supprimer le code Angular qui exécute aujourd'hui lui-même l'échange
Authorization Code + PKCE face à l'IdP enterprise (`OidcAuthController`/`OidcAuthService` côté
serveur reçoivent actuellement un token déjà échangé côté client) — remplacé par la redirection
serveur-à-serveur posée par EN01.14.

**Justification** : [ADR-004 v2](../../../adr/ADR-004-oidc-multi-tenant.md) — le flux OIDC ne
doit plus transiter par Angular du tout. Le code actuel confirme qu'Angular fait aujourd'hui le
PKCE lui-même (aucune librairie OIDC de type `angular-oauth2-oidc`/`oidc-client-js` n'est même
utilisée — implémentation hand-rolled), donc ce retrait est un changement de code, pas une
clarification de doc.

**Critères de complétion** :
- [ ] Code Angular de PKCE (génération code_verifier/challenge, appel token endpoint IdP, stockage
      du token reçu) supprimé
- [ ] `OidcAuthController`/`OidcAuthService` (pivot-core) : le endpoint qui recevait le token
      échangé côté client est retiré, remplacé par le callback `oauth2Login` d'EN01.14
- [ ] Bouton « Se connecter avec {tenant} » redirige vers `GET /oauth2/authorization/{tenant}`
      (aucun appel réseau IdP direct depuis Angular)
- [ ] US01.7 (OIDC enterprise login) et US01.7 JIT re-testées end-to-end sur le nouveau flux

**Dépendances** : EN01.14 (ClientRegistrationRepository dynamique)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E01 · Type: architecture · Module: oidc · Phase: v1-enterprise · Size: S
Stage: ⬜ · Priority: High
