# EN43.7e — Politiques versionnées en Git (policy-as-code)

**Type d'enabler** : gouvernance · dette

**Objectif technique** : Établir le cycle de vie policy-as-code : toutes les politiques d'autorisation (RBAC EN43.7b, ABAC EN43.7c, souveraineté EN43.7d) vivent dans un dépôt Git unique, sont testées en CI, distribuées au `PDP` (EN43.7a) par un mécanisme contrôlé, et aucune logique d'accès n'est codée en dur dans un module.

**Justification** : Externaliser la décision d'accès n'a de valeur que si la source des règles est versionnée, revue et testée comme du code. Sans ce cycle, les politiques dériveraient hors contrôle. Cet enfant garantit l'auditabilité, la reproductibilité et la non-régression des règles d'accès sur tout le portail.

**Critères de complétion** :
- [ ] Toutes les politiques du `PDP` versionnées dans un dépôt Git dédié (source de vérité unique)
- [ ] Tests de politique exécutés en CI (cas `permit`/`deny`, cas fail-closed) — échec bloquant
- [ ] Distribution des politiques au `PDP` par un mécanisme contrôlé et traçable (version déployée identifiable)
- [ ] Zéro logique d'accès codée en dur dans un module (vérifié par revue/lint)
- [ ] Historique des changements de politique auditable (qui, quand, pourquoi)

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given une modification de politique poussée sur une branche, when la CI s'exécute, then les tests de politique passent (cas `permit`, `deny`, fail-closed) avant toute possibilité de fusion.
- [ ] Given une nouvelle version de politique fusionnée, when elle est distribuée, then le `PDP` sert la version déployée et la version active est identifiable (traçabilité).
- [ ] Error case: given une politique syntaxiquement invalide ou faisant échouer un test, when la CI l'évalue, then la distribution est bloquée et la version précédente reste active (pas de dégradation silencieuse).
- [ ] Security: aucun changement de politique ne contourne la revue et la CI (pas de push direct non revu) ; le dépôt de politiques ne contient aucun secret, et une politique introduisant un accès cross-tenant est détectée par un test dédié avant fusion (isolation multi-tenant vérifiée en CI).

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E43 · Type: gouvernance · Module: securite · Phase: phase-3 · Size: M · Priority: Critical
Stage: ⬜
Dépendances: EN43.7a (moteur `PDP`/`PEP` consommant les politiques), EN43.7b/EN43.7c/EN43.7d (politiques à versionner)
