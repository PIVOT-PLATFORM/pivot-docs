# US05.14.2 — Required checks pivot-ui

**En tant que** mainteneur
**Je veux** que les required checks soient configurés sur pivot-ui
**Afin d'** empêcher tout merge sans CI verte

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Branch protection `main` : required checks = build, test, lint, playwright, lighthouse | ✅ — `required_status_checks.contexts` = Code Quality - Angular, Tests (Vitest), Build Angular (production), E2E - Playwright, Lighthouse — Accessibilité |
| Force push désactivé sur `main` | ✅ (déjà en place) |
| PR obligatoire avant merge (min 1 review) | ✅ (déjà en place, `required_approving_review_count: 1`) |

**Implémentation** : config directe `gh api` sur `branches/main/protection/required_status_checks`
(pas de PR — paramètres de repo). `enforce_admins` laissé à `false` (préserve le flux de merge
autonome `--admin` déjà en place pour contourner la seule restriction d'auto-review).

---
Item Type: US · Parent: EN05.14 · Module: core · Phase: Socle · Size: S · Priority: High
Stage: ✅
