# US05.14.1 — Required checks pivot-core

**En tant que** mainteneur
**Je veux** que les required checks soient configurés sur pivot-core
**Afin d'** empêcher tout merge sans CI verte

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|-------|
| Branch protection `main` : required checks = build, test, sonar, gitleaks, semgrep | ⬜ |
| Force push désactivé sur `main` | ⬜ |
| PR obligatoire avant merge (min 1 review) | ⬜ |
| Status checks configurés dans les settings GitHub repo | ⬜ |

---
Item Type: US · Parent: EN05.14 · Module: core · Phase: MVP · Size: S · Priority: High
Human Gate: human-validated · Stage: Backlog
