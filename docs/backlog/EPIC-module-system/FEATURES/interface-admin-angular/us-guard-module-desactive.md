# US03.2.2 — Guard Angular bloque accès module désactivé

**En tant que** utilisateur
**Je veux** être redirigé avec un message clair si j'essaie d'accéder à un module désactivé
**Afin de** comprendre pourquoi la fonctionnalité n'est pas disponible

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Guard appelle GET /api/modules/{id}/status avant chargement du bundle | ✅ |
| Si `enabled: false` → redirection vers `/home` avec toast "Module non disponible" | ✅ |
| Bundle Angular du module non chargé (lazy-loading respecté) | ✅ |
| Sémantique HTTP documentée pour module désactivé (voir décision ci-dessous) | ✅ |
| Tests Vitest moduleGuard (enabled=true, enabled=false) | ✅ |
| La sémantique HTTP pour module désactivé est une décision explicite documentée | ✅ |
| L'AC "bundle Angular non chargé" est vérifié par un test E2E Playwright (inspection des chunks réseau), pas par Vitest (non testable en TU) | ✅ |
| Le toast "Module non disponible" inclut le nom du module et, si utilisateur est ROLE_ADMIN, un lien direct vers /admin/modules | ✅ |
| Pendant la vérification du statut par le guard (GET /api/modules/{id}/status), une page de chargement interstitielle s'affiche — pas d'affichage partiel de la route | ✅ |
| Toast a role="alert" annoncé par les lecteurs d'écran | ✅ |
| Message du toast et texte de la page de chargement internalisés dans modules.guard.* (fr.json / en.json) | ✅ |

### Décision de sémantique HTTP (reconciliation avec l'AC initial « 403 »)

L'AC d'origine envisageait un 403 pour "module désactivé". Après implémentation conjointe
avec EN03.2, la décision retenue est **200 `{enabled: false}`** pour un module enregistré
mais désactivé (le "documented equivalent" du 403 évoqué à la rédaction de l'US), et
**404** réservé au cas distinct d'un identifiant de module absent du `ModuleRegistry`
(ressource inexistante). Cette sémantique respecte la règle transversale de sécurité
« ne pas confirmer/infirmer l'existence d'une ressource via un code HTTP dédié » tout en
restant strictement équivalente côté guard : toute réponse ≠ 200/enabled:true (200/false,
404, 401, erreur réseau) est traitée de façon identique par `moduleGuard` — refus de
navigation, redirection `/home`, toast. Voir EN03.2 (`en-module-guard-angular.md`) pour le
détail complet et le pivot-core `ModuleStatusDto` JavaDoc pour la justification backend.

**Implémentation** : réalisée conjointement avec EN03.2 (même guard `moduleGuard`, mêmes
tests Vitest/Playwright) sur la branche `feat/en03-2-module-guard` (pivot-ui) —
`feat/en03-2-module-guard` (pivot-core) pour l'endpoint.

---
Item Type: US · Parent: F03.2 · Module: core · Phase: MVP · Size: S · Priority: Critical
Stage: Done
