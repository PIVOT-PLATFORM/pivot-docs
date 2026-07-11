# EN43.5 — Plan de contrôle : Identité

**Type d'enabler** : gouvernance · sécurité

**Objectif technique** : Intègre Keycloak (ADR-004, E01) comme service transverse consommé par **tous** les modules — aucun module ne gère de compte local — et complète l'identité utilisateur par le **Token Exchange** (EN01.13) pour la propagation d'identité en profondeur.

**Justification** : Un module qui gère ses propres comptes locaux est un angle mort pour la gouvernance des accès (impossible de révoquer un utilisateur partout d'un coup) et une cible directe pour un vol de credentials. Centraliser sur Keycloak est la condition pour que EN43.7 (autorisation externalisée) et EN43.8 (audit) aient une identité fiable à qui rattacher chaque décision.

**Critères de complétion** :
- [ ] Tous les modules/adaptateurs délèguent l'authentification à Keycloak (SSO)
- [ ] Aucun module ne stocke ni ne gère de credentials propres
- [ ] Fédération des IdP externes documentée (cohérent ADR-004)
- [ ] Référence croisée avec EN01.13 (identité propagée)

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given un module qui reçoit une requête utilisateur non authentifiée, when il tente d'accéder à une ressource protégée, then il redirige vers Keycloak (SSO) et n'accepte aucun credential local.
- [ ] Given un utilisateur authentifié auprès de Keycloak, when un module appelle un module aval en profondeur, then l'identité est propagée via Token Exchange (EN01.13) et le module aval reçoit une identité rattachable à l'utilisateur d'origine.
- [ ] Given un utilisateur révoqué (session/compte désactivé côté Keycloak), when il présente un jeton précédemment valide après expiration/révocation, then l'accès est refusé (`401`) par tous les modules, sans qu'aucun compte local ne le maintienne actif.
- [ ] Error case: given un jeton absent, expiré, ou de signature invalide, when un module l'évalue, then l'accès est refusé (`401`) et la tentative est journalisée sans exposer de détail interne.
- [ ] Security: aucun module ne stocke ni ne gère de credentials propres (aucune table de comptes locale) ; un jeton émis pour un tenant ne confère aucun accès aux ressources d'un autre tenant → `404` (non-divulgation d'existence, cross-tenant) ; la fédération d'IdP externes ne permet pas l'usurpation d'une identité d'un autre domaine d'identité (émetteur `issuer` et audience `aud` vérifiés).

**Dépendances** : ADR-004, EN01.13

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E43 · Type: gouvernance · Module: securite · Phase: phase-3 · Size: L
Stage: ⬜ · Priority: Critical
