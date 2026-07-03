# EN03.2 — Guard Angular moduleGuard + status API

**Type d'enabler** : architecture · sécurité

**Critères de complétion** :
- [x] GET /api/modules/{id}/status retourne `{enabled: boolean}` — voir décision de sémantique HTTP ci-dessous
- [x] `moduleGuard` Angular appelle l'API status et bloque la navigation si désactivé
- [x] Route inaccessible = redirection vers accueil (`/home`) avec message (toast)
- [x] Bundle du module non chargé si désactivé (lazy-loading Angular respecté) — vérifié par test E2E Playwright (inspection réseau)
- [x] Cache navigateur TTL court (ou sans cache) sur l'endpoint status — `Cache-Control: no-store` côté backend + `Cache-Control: no-cache` sur la requête Angular
- [x] Tests Vitest moduleGuard

### Décision de sémantique HTTP (documentée EN03.2 / US03.2.2)

Après analyse, le couple **200/404** a été retenu plutôt que 403, pour rester cohérent avec
la règle transversale « ne pas confirmer l'existence d'une ressource cross-tenant/inconnue » :

- **200 `{enabled: false}`** — module enregistré dans le `ModuleRegistry` mais désactivé pour
  le tenant courant. L'utilisateur authentifié est autorisé à connaître le statut du module ;
  seul son usage est bloqué.
- **200 `{enabled: true}`** — module enregistré et activé pour le tenant courant.
- **404** — identifiant de module absent du `ModuleRegistry` (n'existe pas du tout), cas
  distinct d'un module simplement désactivé — traduit depuis `UnknownModuleException` par le
  `GlobalExceptionHandler` (pivot-core).

Aucun 403 n'est retourné par ce endpoint. Le `moduleGuard` Angular ne distingue pas la cause
HTTP (200/enabled:false, 404, 401, erreur réseau) : toute réponse autre que 200/enabled:true
est traitée de façon identique (refus + redirection `/home` + toast), ce qui garde la logique
403-vs-404 entièrement côté contrat API/backend.

**Statut** : ✅ Fait — implémenté sur `feat/en03-2-module-guard`, couvert conjointement avec
US03.2.2 (même guard, mêmes tests).

---
Item Type: Enabler · Parent: E03 · Type: architecture · Module: core · Phase: MVP
Stage: Review · Priority: High
