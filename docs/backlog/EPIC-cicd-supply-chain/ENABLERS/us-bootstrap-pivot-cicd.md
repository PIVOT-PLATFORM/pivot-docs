# US05.17.1 — Bootstrap du repo `pivot-cicd`

**En tant que** ingénieur plateforme
**Je veux** un repo `pivot-cicd` structuré et gouverné, prêt à héberger les reusable workflows
**Afin de** disposer d'une source unique CI/CD avant d'y migrer le moindre pipeline

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le repo `pivot-cicd` créé, when on inspecte sa structure, then elle contient `.github/workflows/`, `actions/`, `.plumber.yaml`, `.github/dependabot.yml`, `README.md`, `docs/USAGE.md` | ⬜ |
| Given `.plumber.yaml`, when on la compare à celle de `.github`, then elle reprend les mêmes gates (SHA pinning, permissions explicites, pas de write-all, triggers non dangereux, branche protégée) | ⬜ |
| Given un workflow de CI interne `_self-ci.yml`, when une PR est ouverte sur `pivot-cicd`, then `actionlint` + `yamllint` s'exécutent et sont verts | ⬜ |
| Given `docs/USAGE.md`, when un mainteneur le lit, then il trouve la convention d'appel (`uses: PIVOT-PLATFORM/pivot-cicd/.github/workflows/<x>.yml@<SHA>`) et un emplacement pour le tableau des inputs par reusable | ⬜ |
| Error : given un workflow épinglé par tag au lieu d'un SHA, when Plumber s'exécute, then le gate `actionsMustBePinnedByCommitSha` échoue (comportement attendu, non contourné) | ⬜ |
| Security : given le repo, when on vérifie les permissions par défaut, then aucun workflow ne déclare `permissions: write-all` et la branche `main` est protégée (code owner review requise) | ⬜ |

## Notes d'implémentation

- Le repo est **neuf** : `git init` + premier commit, puis `gh repo create PIVOT-PLATFORM/pivot-cicd`
  (visibilité alignée sur `.github` — public) et push. Branche `main` protégée.
- `.plumber.yaml` copiée/adaptée depuis `PIVOT-PLATFORM/.github/.plumber.yaml` (source de gates).
- `dependabot.yml` : `ecosystem: github-actions` pour bumper les actions tierces épinglées.
- Aucun pipeline métier migré dans cette US — uniquement l'ossature. Les reusables arrivent en
  US05.17.2 / US05.17.3.

**Hors périmètre** : écriture des reusables `ci-core`/`ci-ui` (US05.17.2/.3), migration
`security.yml` (Vague 2), rapatriement composite `setup` (Vague 6).

---
Item Type: US · Parent: EN05.17 · Module: core · Phase: Socle · Size: M · Priority: High
Stage: ⬜
Profils: Tous
Dépendances: EN05.17 · PIVOT-PLATFORM/.github (.plumber.yaml source des gates)
