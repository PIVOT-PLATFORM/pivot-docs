# US05.14.1 — Required checks pivot-core

**En tant que** mainteneur
**Je veux** que les required checks soient configurés sur pivot-core
**Afin d'** empêcher tout merge sans CI verte

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Branch protection `main` : required checks = build, test, sonar, gitleaks, semgrep | ✅ — `required_status_checks.contexts` = Code Quality - Java, Tests Backend (TU + TI), Maven deploy preview (PR), Docker preview image (PR), SonarCloud Analysis, Gitleaks - Secret Scan, Semgrep - SAST |
| Force push désactivé sur `main` | ✅ (déjà en place) |
| PR obligatoire avant merge (min 1 review) | ✅ (déjà en place, `required_approving_review_count: 1`) |
| Status checks configurés dans les settings GitHub repo | ✅ |

**Implémentation** : config directe `gh api` (PATCH) sur `branches/main/protection/required_status_checks`
(pas de PR — paramètres de repo), une fois le token `gh` mis à jour avec la permission
"Administration: Read and write" (mainteneur, 2026-07-09). `enforce_admins` vérifié inchangé
(`false`) — préserve le flux de merge autonome `--admin` déjà en place.

**Statut** : ✅ Terminé (2026-07-09)

---
Item Type: US · Parent: EN05.14 · Module: core · Phase: Socle · Size: S · Priority: High
Stage: ✅
Rôle: mainteneur-produit
