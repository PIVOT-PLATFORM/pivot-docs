# EN43.5 — Plan de contrôle : Identité

**Type d'enabler** : gouvernance · sécurité

**Contexte** : Intègre Keycloak (ADR-004, E01) comme service transverse consommé par **tous** les modules — aucun module ne gère de compte local. Complète l'identité utilisateur par le **Token Exchange** (EN01.13) pour la propagation d'identité en profondeur.

**Critères de complétion** :
- [ ] Tous les modules/adaptateurs délèguent l'authentification à Keycloak (SSO)
- [ ] Aucun module ne stocke ni ne gère de credentials propres
- [ ] Fédération des IdP externes documentée (cohérent ADR-004)
- [ ] Référence croisée avec EN01.13 (identité propagée)

**Dépendances** : ADR-004, EN01.13

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E43 · Type: gouvernance · Module: securite · Phase: phase-3
Stage: Backlog · Priority: Highest
