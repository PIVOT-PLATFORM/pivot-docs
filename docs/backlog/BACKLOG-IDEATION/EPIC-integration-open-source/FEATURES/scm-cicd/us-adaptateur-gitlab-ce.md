# US28.10.1 — Adaptateur GitLab CE

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.
> Domaine absent du backlog initial malgré sa présence en ADR-009 §5 — ajouté lors de la revue PO.

**En tant que** développeur
**Je veux** que les dépôts, merge requests et pipelines **GitLab CE** de mon organisation soient exposés comme entités PIVOT
**Afin de** disposer d'une vue unifiée SCM/CI-CD au catalogue, sans quitter mon outil habituel

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| Adaptateur `adapter-gitlab-ce` conforme au contrat PivotAdapter (EN28.3) | ⬜ |
| Dépôts et pipelines GitLab CE traduits en entités `Component`/`Resource` | ⬜ |
| Une merge request fusionnée émet un événement exploitable sur le bus | ⬜ |

---
Item Type: US · Parent: F28.10 · Module: scm-cicd · Phase: phase-3 · Size: L · Priority: Medium
Stage: ⬜
Rôle: developpeur
Dépendances: EN28.3
