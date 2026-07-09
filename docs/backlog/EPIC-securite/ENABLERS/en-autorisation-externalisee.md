# EN43.7 — Autorisation externalisée (policy-as-code)

**Type d'enabler** : gouvernance · sécurité

**Objectif technique** : Les décisions d'accès ne sont pas codées en dur dans les modules mais exprimées en politiques versionnées (OPA/Rego ou Cedar), évaluées à chaque appel — c'est là que s'appliquent le RBAC par rôle (taxonomie), l'ABAC fin (par entité, par action) et la classification de souveraineté (EN43.11).

**Justification** : Une logique d'accès codée en dur dans chaque module se dérive en 30 implémentations divergentes, impossibles à auditer et à faire évoluer ensemble. Externaliser la décision dans un moteur de politique unique rend les règles d'accès versionnées, testables et cohérentes sur tout le portail.

**Critères de complétion** :
- [ ] Moteur de politique (OPA ou Cedar) déployé, consommé par tous les modules
- [ ] Politiques versionnées en Git, pas de logique d'accès codée en dur dans un module
- [ ] RBAC par rôle (taxonomie des rôles) et ABAC (par entité/action) tous deux supportés
- [ ] La politique bloque un appel si la classe de souveraineté de la donnée dépasse celle du module cible (EN43.11)

**Dépendances** : EN43.11 (classification souveraineté)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E43 · Type: gouvernance · Module: securite · Phase: phase-3 · Size: XL
Stage: ⬜ · Priority: Critical
