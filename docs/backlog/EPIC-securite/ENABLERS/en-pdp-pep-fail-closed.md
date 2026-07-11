# EN43.7a — Moteur de politique : PDP/PEP et fail-closed

**Type d'enabler** : architecture · sécurité

**Objectif technique** : Déployer le moteur de décision de politique (`PDP` — Policy Decision Point, OPA ou Cedar) et le point d'application (`PEP` — Policy Enforcement Point) intégré au plan de contrôle, de sorte que chaque appel inter-module passe par une évaluation de politique explicite. Le comportement par défaut est fail-closed : toute décision indéterminée, toute erreur d'évaluation ou toute indisponibilité du `PDP` refuse l'accès.

**Justification** : Sans point d'application unique et sans posture fail-closed, une politique absente ou un moteur momentanément indisponible ouvrirait silencieusement l'accès — l'inverse exact de l'objectif. Cet enfant pose la mécanique d'évaluation (le « moteur ») sur laquelle EN43.7b (RBAC) et EN43.7c (ABAC) viendront brancher leurs règles.

**Critères de complétion** :
- [ ] `PDP` (OPA ou Cedar) déployé comme service transverse, choix tranché en ADR
- [ ] `PEP` intégré au plan de contrôle, appelé sur chaque requête inter-module
- [ ] Posture fail-closed : décision indéterminée, erreur d'évaluation ou `PDP` injoignable → refus
- [ ] Contrat de requête/réponse d'autorisation (sujet, action, ressource, contexte) documenté et stable
- [ ] Chaque décision d'autorisation est traçable (identifiant de politique évaluée, verdict)

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given une requête inter-module portant une identité valide et une politique autorisant l'action, when le `PEP` interroge le `PDP`, then la décision `permit` est renvoyée et l'appel aboutit.
- [ ] Given une requête pour laquelle aucune politique n'accorde explicitement l'accès, when le `PDP` l'évalue, then le verdict est `deny` par défaut (fail-closed) et le `PEP` retourne `403`.
- [ ] Error case: given un `PDP` injoignable ou une erreur d'évaluation de politique, when le `PEP` sollicite la décision, then l'accès est refusé (fail-closed) et l'erreur est journalisée sans exposer de détail interne au client.
- [ ] Security: aucun chemin d'appel inter-module ne contourne le `PEP` ; une requête sans identité propagée valide (EN43.5) est refusée avant même l'évaluation de la politique, et une identité d'un autre tenant ne peut obtenir un verdict `permit` sur les ressources d'un tenant tiers (isolation multi-tenant).

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E43 · Type: sécurité · Module: securite · Phase: phase-3 · Size: L · Priority: Critical
Stage: ⬜
Dépendances: EN43.5 (plan de contrôle identité — identité fiable à évaluer), ADR choix `PDP` (OPA/Cedar)
