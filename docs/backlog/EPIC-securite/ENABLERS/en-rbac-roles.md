# EN43.7b — Politiques RBAC par rôle (taxonomie)

**Type d'enabler** : sécurité · gouvernance

**Objectif technique** : Exprimer, dans le moteur de politique (EN43.7a), le contrôle d'accès basé sur les rôles (`RBAC`) : une taxonomie de rôles unique et versionnée est mappée aux permissions par action, et les rôles portés par l'identité propagée (EN43.5) déterminent le verdict d'autorisation.

**Justification** : Le RBAC couvre la majorité des décisions d'accès grossières (qui peut faire quoi, par rôle). Le poser en politique versionnée — plutôt qu'en tables de rôles dupliquées par module — garantit une taxonomie cohérente sur tout le portail et un seul endroit à auditer quand un rôle évolue.

**Critères de complétion** :
- [ ] Taxonomie des rôles unique, versionnée, documentée (source de vérité pour tous les modules)
- [ ] Mapping rôle → permissions par action exprimé en politique dans le `PDP`
- [ ] Rôles issus de l'identité propagée (EN43.5), jamais redéfinis localement dans un module
- [ ] Absence de rôle requis → refus (cohérent fail-closed EN43.7a)

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given un utilisateur porteur d'un rôle autorisant l'action visée, when il appelle l'endpoint correspondant, then le `PDP` renvoie `permit` et l'action aboutit.
- [ ] Given un utilisateur dont aucun rôle n'autorise l'action, when il appelle l'endpoint, then le `PDP` renvoie `deny` et le `PEP` retourne `403`.
- [ ] Error case: given un jeton dont la revendication de rôles est absente ou malformée, when la politique RBAC l'évalue, then l'accès est refusé (`403`) et l'anomalie est journalisée.
- [ ] Security: un utilisateur non-membre du tenant ciblé ne peut invoquer la ressource même avec un rôle homonyme dans son propre tenant → `404` (non-divulgation d'existence, cross-tenant) ; l'élévation de privilège par injection d'un rôle non émis par l'IdP est impossible (rôles vérifiés contre l'identité signée).

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E43 · Type: sécurité · Module: securite · Phase: phase-3 · Size: M · Priority: Critical
Stage: ⬜
Dépendances: EN43.7a (moteur `PDP`/`PEP`), EN43.5 (rôles portés par l'identité propagée)
