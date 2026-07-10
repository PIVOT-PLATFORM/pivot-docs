# EN43.7c — Politiques ABAC fines (par entité, par action)

**Type d'enabler** : sécurité · gouvernance

**Objectif technique** : Compléter le RBAC (EN43.7b) par un contrôle d'accès basé sur les attributs (`ABAC`) évalué dans le même moteur (EN43.7a) : les décisions fines tiennent compte des attributs du sujet, de la ressource (entité) et du contexte (appartenance au tenant, propriété de la ressource, action précise), pour couvrir les cas que le rôle seul ne discrimine pas.

**Justification** : Le rôle seul ne suffit pas à décider « cet utilisateur peut modifier *cette* entité précise » : il faut croiser des attributs (propriétaire, tenant, état de l'entité). L'ABAC exprime ces règles fines en politique versionnée plutôt qu'en conditions codées en dur dispersées dans chaque module.

**Critères de complétion** :
- [ ] Politiques ABAC exprimées dans le `PDP`, combinables avec le RBAC (RBAC comme filtre grossier, ABAC comme affinage)
- [ ] Attributs de sujet, de ressource et de contexte modélisés dans le contrat de requête d'autorisation (EN43.7a)
- [ ] Isolation par tenant appliquée par attribut (aucune décision `permit` cross-tenant)
- [ ] Cas fins couverts : propriété de la ressource, appartenance, portée de l'action

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given un utilisateur autorisé par rôle mais dont les attributs ne correspondent pas à la ressource ciblée (ex. non-propriétaire quand la politique l'exige), when il tente l'action, then le `PDP` renvoie `deny` et le `PEP` retourne `403`.
- [ ] Given un utilisateur dont les attributs (tenant, propriété, contexte) satisfont la politique ABAC, when il agit sur l'entité, then la décision est `permit` et l'action aboutit.
- [ ] Error case: given un attribut de ressource requis par la politique mais absent du contexte de requête, when le `PDP` l'évalue, then la décision est `deny` (fail-closed) et l'évaluation incomplète est journalisée.
- [ ] Security: un utilisateur non-membre du tenant propriétaire de l'entité ne peut ni lire ni deviner son existence → `404` (cross-tenant) ; l'isolation multi-tenant est portée par un attribut de tenant vérifié, non par un simple filtre applicatif contournable.

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E43 · Type: sécurité · Module: securite · Phase: phase-3 · Size: M · Priority: Critical
Stage: ⬜
Dépendances: EN43.7a (moteur `PDP`/`PEP`), EN43.7b (RBAC, socle grossier affiné par l'ABAC)
