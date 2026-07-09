# EN43.5 — Plan de contrôle : Identité

**Type d'enabler** : gouvernance · sécurité

**Objectif technique** : Intègre Keycloak (ADR-004, E01) comme service transverse consommé par **tous** les modules — aucun module ne gère de compte local — et complète l'identité utilisateur par le **Token Exchange** (EN01.13) pour la propagation d'identité en profondeur.

**Justification** : Un module qui gère ses propres comptes locaux est un angle mort pour la gouvernance des accès (impossible de révoquer un utilisateur partout d'un coup) et une cible directe pour un vol de credentials. Centraliser sur Keycloak est la condition pour que EN43.7 (autorisation externalisée) et EN43.8 (audit) aient une identité fiable à qui rattacher chaque décision.

**Critères de complétion** :
- [ ] Tous les modules/adaptateurs délèguent l'authentification à Keycloak (SSO)
- [ ] Aucun module ne stocke ni ne gère de credentials propres
- [ ] Fédération des IdP externes documentée (cohérent ADR-004)
- [ ] Référence croisée avec EN01.13 (identité propagée)

**Dépendances** : ADR-004, EN01.13

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E43 · Type: gouvernance · Module: securite · Phase: phase-3 · Size: L
Stage: ⬜ · Priority: Critical
