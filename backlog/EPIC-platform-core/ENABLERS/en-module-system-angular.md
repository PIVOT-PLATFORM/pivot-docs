# EN02.2 — Système de modules Angular (guard + lazy-loading)

**Type d'enabler** : architecture

**Objectif technique** : Guard Angular qui vérifie l'état d'un module via `GET /api/modules/{id}/status`. Module désactivé = route inaccessible + bundle non chargé.

**Justification** : Un module désactivé côté admin ne doit jamais être accessible en Angular — ni la route, ni le bundle.

**Critères de complétion** :
- [ ] `ModuleGuard` (CanMatchFn) : appel `GET /api/modules/{moduleId}/status` → 200 = pass, 403 = redirect
- [ ] `ModuleService` : cache signal de l'état des modules (TTL 60s, refresh sur activation admin)
- [ ] Intégration sur toutes les routes de modules (`whiteboard`, `session`, etc.)
- [ ] Module désactivé → redirect vers page "Module non activé" (not `auth/login`)
- [ ] Bundle Angular jamais chargé si module désactivé (lazy-loading conditionnel)

**Dépendances** : EN02.1 (endpoint `/api/modules/{id}/status` doit exister)

**Statut** : ⬜ À faire — Sprint 2

---
Item Type: Enabler · Parent: E02 · Type: architecture · Module: core · Phase: MVP
Human Gate: needs-human-valid · Stage: Backlog
