# US05.14.3 — Required checks pivot-docs

**En tant que** mainteneur
**Je veux** des required checks minimaux sur pivot-docs
**Afin de** garantir l'intégrité du dépôt de documentation

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Branch protection `main` : required check = gitleaks (secrets scan) | 🔄 job Gitleaks ajouté, PR [#175](https://github.com/PIVOT-PLATFORM/pivot-docs/pull/175) en cours (merge humain requis) |
| Force push désactivé sur `main` | ✅ (déjà en place) |

---
Item Type: US · Parent: EN05.14 · Module: core · Phase: Socle · Size: XS · Priority: Medium
Stage: In progress
