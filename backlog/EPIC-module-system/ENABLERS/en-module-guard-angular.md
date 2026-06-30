# EN03.2 — Guard Angular moduleGuard + status API

**Type d'enabler** : architecture · sécurité

**Critères de complétion** :
- [ ] GET /api/modules/{id}/status retourne `{enabled: boolean}` (403 si désactivé)
- [ ] `moduleGuard` Angular appelle l'API status et bloque la navigation si désactivé
- [ ] Route inaccessible = redirection vers page 403 ou accueil avec message
- [ ] Bundle du module non chargé si désactivé (lazy-loading Angular respecté)
- [ ] Cache navigateur TTL court (ou sans cache) sur l'endpoint status
- [ ] Tests Vitest moduleGuard

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E03 · Type: architecture · Module: core · Phase: MVP
Human Gate: human-validated · Stage: Backlog · Priority: High
