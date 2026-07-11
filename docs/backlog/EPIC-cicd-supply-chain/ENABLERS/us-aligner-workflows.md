# US05.15.2 — Aligner les workflows ui sur les conventions core

**En tant que** développeur
**Je veux** que les workflows pivot-ui suivent les mêmes conventions que pivot-core
**Afin de** maintenir une cohérence CI entre les deux repos

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Nommage des jobs identique (build, test, lint, security) | ✅ (`quality-frontend`/`tests-frontend`, miroir du suffixe `-backend` de pivot-core) |
| Composite action setup partagée (US05.15.1) utilisée | ✅ |
| Même structure de rapports (artefacts, annotations) | ✅ |
| Plumber compliance check présent dans pivot-ui CI | ✅ (déjà présent, structurellement aligné) |

**Implémentation** : [pivot-ui#127](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/127) (mergée).

---
Item Type: US · Parent: EN05.15 · Module: core · Phase: Socle · Size: S · Priority: Medium
Stage: ✅
Rôle: developpeur
