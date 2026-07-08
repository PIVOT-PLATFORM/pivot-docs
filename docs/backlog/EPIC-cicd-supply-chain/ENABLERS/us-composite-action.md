# US05.15.1 — Composite action setup partagée

**En tant que** développeur
**Je veux** une composite action GitHub Actions partagée pour le setup (Java/Node/cache)
**Afin d'** éviter la duplication entre pivot-core et pivot-ui

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Composite action `.github/actions/setup/action.yml` hébergée dans `pivot-core` | ⬜ |
| Paramètres : `java-version`, `node-version`, `cache-key` | ⬜ |
| Référencée depuis `pivot-ui` via `uses: PIVOT-PLATFORM/pivot-core/.github/actions/setup@main` (composite action cross-repo, pas de checkout du repo hôte requis) | ⬜ |
| Cache Maven + npm partagé via `actions/cache` | ⬜ |

> **Repo cible** : `pivot-core`, pas `pivot-platform/` (n'est pas un repo — cf. racine `CLAUDE.md`)
> ni un repo dédié (aucun besoin identifié au-delà de core+ui pour justifier un repo
> supplémentaire). `pivot-core` est le repo `Module: core` naturel des deux consommateurs
> (`pivot-core`, `pivot-ui`) et GitHub Actions résout nativement les composite actions
> cross-repo via `owner/repo/chemin@ref`, y compris sur repos privés du même org.

---
Item Type: US · Parent: EN05.15 · Module: core · Phase: Socle · Size: S · Priority: Medium
Stage: Ready
