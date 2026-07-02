# US03.2.2 — Guard Angular bloque accès module désactivé

**En tant que** utilisateur
**Je veux** être redirigé avec un message clair si j'essaie d'accéder à un module désactivé
**Afin de** comprendre pourquoi la fonctionnalité n'est pas disponible

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|-------|
| Guard appelle GET /api/modules/{id}/status avant chargement du bundle | ⬜ |
| Si `enabled: false` → redirection vers `/home` avec toast "Module non disponible" | ⬜ |
| Bundle Angular du module non chargé (lazy-loading respecté) | ⬜ |
| 403 retourné par l'API si module désactivé | ⬜ |
| Tests Vitest moduleGuard (enabled=true, enabled=false) | ⬜ |
| La sémantique HTTP 403 pour module désactivé est une décision explicite documentée : 403 = "authentifié mais ressource non disponible pour ce tenant" | ⬜ |
| L'AC "bundle Angular non chargé" est vérifié par un test E2E Playwright (inspection des chunks réseau), pas par Vitest (non testable en TU) | ⬜ |
| Le toast "Module non disponible" inclut le nom du module et, si utilisateur est ROLE_ADMIN, un lien direct vers /admin/modules | ⬜ |
| Pendant la vérification du statut par le guard (GET /api/modules/{id}/status), une page de chargement interstitielle s'affiche — pas d'affichage partiel de la route | ⬜ |
| Toast a role="alert" annoncé par les lecteurs d'écran | ⬜ |
| Message du toast et texte de la page de chargement internalisés dans modules.guard.* (fr.json / en.json) | ⬜ |

---
Item Type: US · Parent: F03.2 · Module: core · Phase: MVP · Size: S · Priority: High
Stage: Backlog
