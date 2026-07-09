# US05.14.1 — Required checks pivot-core

**En tant que** mainteneur
**Je veux** que les required checks soient configurés sur pivot-core
**Afin d'** empêcher tout merge sans CI verte

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Branch protection `main` : required checks = build, test, sonar, gitleaks, semgrep | ⬜ — bloqué, voir note |
| Force push désactivé sur `main` | ✅ (déjà en place) |
| PR obligatoire avant merge (min 1 review) | ✅ (déjà en place, `required_approving_review_count: 1`) |
| Status checks configurés dans les settings GitHub repo | ⬜ — bloqué, voir note |

> **Bloqué (2026-07-09)** : noms de contexte exacts identifiés (`SonarCloud Analysis`,
> `Gitleaks - Secret Scan`, `Semgrep - SAST`, cohérents avec les 4 déjà requis) et payload PUT
> préparé, mais le PAT fine-grained utilisé pour `gh api` n'a que la lecture sur la permission
> repo "Administration" — la modification de branch protection nécessite l'écriture (le
> endpoint renvoie 404, pas 403, pour ne pas divulguer l'existence de la ressource à un token non
> autorisé). Nécessite un token avec "Administration: Read and write" sur `pivot-core` pour
> débloquer — décision/action mainteneur.

---
Item Type: US · Parent: EN05.14 · Module: core · Phase: Socle · Size: S · Priority: High
Stage: Backlog
