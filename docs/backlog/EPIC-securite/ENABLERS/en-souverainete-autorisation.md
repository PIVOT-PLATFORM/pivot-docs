# EN43.7d — Contrainte de souveraineté dans la décision d'accès

**Type d'enabler** : sécurité · souveraineté

**Objectif technique** : Faire appliquer par le moteur de politique (EN43.7a) la règle de souveraineté : la classe de souveraineté de la donnée (zones A/B/C, EN43.11) portée par la ressource est comparée à celle du module cible, et l'appel est bloqué si la donnée franchirait la frontière vers une zone moins protégée que sa classe.

**Justification** : Sans cette contrainte dans la décision d'accès, RBAC et ABAC pourraient accorder un accès légitime en droits tout en laissant une donnée souveraine (zone A) transiter vers un module de zone inférieure — trou de souveraineté. Cet enfant branche le modèle de classification (EN43.11) sur le moteur d'autorisation.

**Justification du séquencement** : dépend de EN43.11 (classification souveraineté A/B/C), **non livré** — cet enfant reste bloqué tant que chaque ressource/module ne porte pas d'attribut de classe exploitable.

**Critères de complétion** :
- [ ] Attribut de classe de souveraineté (A/B/C, EN43.11) exposé dans le contexte de requête d'autorisation
- [ ] Politique de souveraineté dans le `PDP` : accès refusé si la classe de la donnée dépasse celle du module cible
- [ ] Règle combinée avec RBAC/ABAC (un accès autorisé en droits reste bloqué s'il viole la souveraineté)
- [ ] Comportement documenté quand la classe est absente : refus (fail-closed, cohérent EN43.7a)

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given une donnée de classe B et un module cible de classe B ou A, when la politique de souveraineté l'évalue, then l'accès est autorisé (la donnée ne descend pas vers une zone moins protégée).
- [ ] Given une donnée de classe A (souveraine) et un module cible de classe C, when l'appel est évalué, then le `PDP` renvoie `deny` et le `PEP` retourne `403`, même si le rôle et les attributs autoriseraient l'action.
- [ ] Error case: given une ressource dont la classe de souveraineté est absente ou non résolue, when la politique l'évalue, then l'accès est refusé (fail-closed) et l'absence de classe est journalisée.
- [ ] Security: la classe de souveraineté est portée par un attribut de confiance (issu du catalogue EN28.2 / EN43.11), non déclaré par l'appelant ; un appelant d'un autre tenant ne peut ni contourner la contrainte ni observer la classe d'une ressource d'un tenant tiers → `404` (cross-tenant).

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E43 · Type: sécurité · Module: securite · Phase: phase-3 · Size: M · Priority: Critical
Stage: ⬜
Dépendances: EN43.7a (moteur `PDP`/`PEP`), EN43.11 (classification souveraineté A/B/C — **non livré, bloquant**), EN28.2 (catalogue d'entités portant l'attribut de classe)
