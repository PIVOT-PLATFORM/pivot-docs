# US05.15.1 — Composite action setup partagée

**En tant que** développeur
**Je veux** une composite action GitHub Actions partagée pour le setup (Java/Node/cache)
**Afin d'** éviter la duplication entre pivot-core et pivot-ui

## Critères d'acceptation

| Critère | 🤖 Dev | ✅ PO |
|---------|--------|-------|
| Composite action `.github/actions/setup/action.yml` dans pivot-platform (ou repo dédié) | ⬜ | ⬜ |
| Paramètres : `java-version`, `node-version`, `cache-key` | ⬜ | ⬜ |
| Utilisée dans les workflows pivot-core ET pivot-ui | ⬜ | ⬜ |
| Cache Maven + npm partagé via `actions/cache` | ⬜ | ⬜ |

---
Item Type: US · Parent: EN05.15 · Module: core · Phase: MVP · Size: S · Priority: Medium
Human Gate: ? · Stage: Backlog
