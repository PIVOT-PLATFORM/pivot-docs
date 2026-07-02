# US03.2.1 — UI liste modules disponibles avec statut

**En tant que** admin tenant
**Je veux** voir la liste des modules disponibles avec leur statut (actif/inactif) dans l'interface d'administration
**Afin de** gérer l'activation des modules de mon tenant

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|-------|
| GET /api/admin/modules retourne liste avec `id`, `name`, `enabled`, `description` | ⬜ |
| Page Angular `/admin/modules` accessible uniquement aux ROLE_ADMIN | ⬜ |
| Grille de modules avec statut visuel (actif = badge vert, inactif = gris) | ⬜ |
| Bouton toggle "Activer / Désactiver" par module (appelle US03.1.1/US03.1.2) | ⬜ |
| Tests Vitest AdminModulesComponent | ⬜ |
| Si activation échoue (module hors plan → 403), message d'erreur explicite affiché inline dans la carte : "Ce module n'est pas inclus dans votre plan" | ⬜ |
| Le contrat de réponse API inclut un champ description aligné avec l'interface PivotModule (EN03.1). Si description non dans l'interface, l'API retourne metadata séparée | ⬜ |
| Le toggle est désactivé (disabled) pendant l'appel API en cours (évite les doubles clics) | ⬜ |
| État "loading" : skeleton de grille affiché pendant le GET /api/admin/modules | ⬜ |
| État "empty state" si aucun module disponible : "Aucun module disponible pour votre plan" | ⬜ |
| État "error" si GET échoue : message + bouton "Réessayer" | ⬜ |
| Chaque carte module : role="article" ou dans <ul><li> ; toggle a aria-label="Activer [nom du module]" / "Désactiver [nom du module]" | ⬜ |
| Badge de statut n'est pas uniquement différencié par couleur — texte "Actif" / "Inactif" visible ou en aria-label | ⬜ |
| Grille navigable au clavier ; Tab atteint chaque toggle sans piège | ⬜ |
| Sur mobile (< 768px), grille → colonne unique ; zone cliquable du toggle ≥ 44px (WCAG 2.5.5) | ⬜ |
| Tous textes internalisés dans admin.modules.list.* (fr.json / en.json) | ⬜ |

---
Item Type: US · Parent: F03.2 · Module: core · Phase: MVP · Size: M · Priority: High
Stage: Backlog
