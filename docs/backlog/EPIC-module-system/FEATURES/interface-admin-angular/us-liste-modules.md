# US03.2.1 — UI liste modules disponibles avec statut

**En tant que** admin tenant
**Je veux** voir la liste des modules disponibles avec leur statut (actif/inactif) dans l'interface d'administration
**Afin de** gérer l'activation des modules de mon tenant

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| GET /api/admin/modules retourne liste avec `id`, `name`, `enabled`, `description` | ✅ |
| Page Angular `/admin/modules` accessible uniquement aux ROLE_ADMIN | ✅ |
| Grille de modules avec statut visuel (actif = badge vert, inactif = gris) | ✅ |
| Bouton toggle "Activer / Désactiver" par module (appelle US03.1.1/US03.1.2) | ✅ |
| Tests Vitest AdminModulesComponent | ✅ |
| Si activation échoue (module hors plan → 403), message d'erreur explicite affiché inline dans la carte : "Ce module n'est pas inclus dans votre plan" | ✅ |
| Le contrat de réponse API inclut un champ description aligné avec l'interface PivotModule (EN03.1). Si description non dans l'interface, l'API retourne metadata séparée | ⬜ *(partiel — `description` retourne `""` pour tous les modules car `PivotModule` n'expose pas ce champ ; le fallback "metadata séparée" prévu par l'AC n'a pas été implémenté côté backend. Suivi : soit exposer une metadata séparée côté API, soit étendre `PivotModule` — hard block Gate 4, coordination tous repos modules requise)* |
| Le toggle est désactivé (disabled) pendant l'appel API en cours (évite les doubles clics) | ✅ |
| État "loading" : skeleton de grille affiché pendant le GET /api/admin/modules | ✅ |
| État "empty state" si aucun module disponible : "Aucun module disponible pour votre plan" | ✅ |
| État "error" si GET échoue : message + bouton "Réessayer" | ✅ |
| Chaque carte module : role="article" ou dans <ul><li> ; toggle a aria-label="Activer [nom du module]" / "Désactiver [nom du module]" | ✅ |
| Badge de statut n'est pas uniquement différencié par couleur — texte "Actif" / "Inactif" visible ou en aria-label | ✅ |
| Grille navigable au clavier ; Tab atteint chaque toggle sans piège | ✅ *(couverture Vitest ; validation E2E clavier différée, cf. notes)* |
| Sur mobile (< 768px), grille → colonne unique ; zone cliquable du toggle ≥ 44px (WCAG 2.5.5) | 🟡 *(implémenté — media query CSS + tap target 44px — mais Gate 4 `pivot-ui` classe explicitement cet AC "non testé automatiquement (vérif visuelle/E2E)" ; pas de test Vitest dédié)* |
| Tous textes internalisés dans admin.modules.list.* (fr.json / en.json) | ✅ |

## Notes de livraison

- Implémenté : `pivot-core` PR [#122](https://github.com/PIVOT-PLATFORM/pivot-core/pull/122) (Gate 4 : 92/100 — MERGE_AUTONOMOUS) · `pivot-ui` PR [#66](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/66) (Gate 4 : 92/100 — MERGE_AUTONOMOUS).
- Aucun composant toast/dialog partagé n'existait dans `pivot-ui` (pas de dépendance `@pivot/design-system` encore consommée) — `ToastService`/`ToastComponent` et `ConfirmDialog` ont été construits localement dans `features/admin/modules/`, à migrer vers le design system le jour où celui-ci expose ces composants.
- Tests E2E Playwright différés (environnement E2E indisponible lors de l'implémentation) — la validation clavier/a11y de bout en bout est à compléter en suivi ; couverture actuelle = tests Vitest unitaires uniquement.
- Champ `description` : voir limitation documentée sur l'AC dédié ci-dessus.

---
Item Type: US · Parent: F03.2 · Module: core · Phase: Socle · Size: M · Priority: High
Stage: Done
Dépendances : alignement `description`/`PivotModule` à statuer (coordination EN03.1 + repos modules) ; E2E Playwright en suivi.
Gate 5 : `pivot-core` PR [#122](https://github.com/PIVOT-PLATFORM/pivot-core/pull/122) (Gate 4 = 98/100) · `pivot-ui` PR [#66](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/66) (Gate 4 = 92/100), spec figée `docs/specs/EPIC-module-system/us03-2-1-liste-modules-statut.md` (rétroactif, 2026-07-08).
