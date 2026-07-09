# US05.14.3 — Required checks pivot-docs

**En tant que** mainteneur
**Je veux** des required checks minimaux sur pivot-docs
**Afin de** garantir l'intégrité du dépôt de documentation

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Branch protection `main` : required check = gitleaks (secrets scan) | ✅ — `required_status_checks.contexts` = Lint + build docs site, Gitleaks - Secret Scan |
| Force push désactivé sur `main` | ✅ (déjà en place) |

**Implémentation** : job Gitleaks ajouté ([pivot-docs#175](https://github.com/PIVOT-PLATFORM/pivot-docs/pull/175), mergée) + branch protection configurée dans la même PR.

**Statut** : ✅ Terminé (2026-07-09)

---
Item Type: US · Parent: EN05.14 · Module: core · Phase: Socle · Size: XS · Priority: Medium
Stage: Done
