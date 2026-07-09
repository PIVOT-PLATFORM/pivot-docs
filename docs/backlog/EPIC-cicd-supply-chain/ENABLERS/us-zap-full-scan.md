# US05.13.2 — ZAP full scan + rapport

**En tant que** équipe sécurité
**Je veux** un scan ZAP full (actif) avec rapport détaillé
**Afin d'** identifier les vulnérabilités nécessitant une remédiation

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Workflow `dast-full.yml` déclenché manuellement (workflow_dispatch) | ✅ |
| ZAP full scan (actif) sur staging avec auth configurée | ✅ (matrix ROLE_USER/ROLE_ADMIN, dégradation gracieuse tant que le staging n'existe pas — voir note ci-dessous) |
| Rapport publié en GitHub Pages ou artefact | ✅ (artefact HTML+JSON, rétention 30j) |
| Issue GitHub créée automatiquement si nouvelles alertes High+ | ✅ (job dédié, dédup par titre, label `dast-full-high`) |

**Implémentation** : [pivot-core#191](https://github.com/PIVOT-PLATFORM/pivot-core/pull/191) (mergée).

> **Action mainteneur requise** : même dépendance que US05.13.1 — aucun staging pivot-ui réel.
> Secrets à provisionner : `STAGING_PIVOT_UI_URL` (partagé), `STAGING_DAST_USER_EMAIL`/`_PASSWORD`,
> `STAGING_DAST_ADMIN_EMAIL`/`_PASSWORD`.

---
Item Type: US · Parent: EN05.13 · Module: core · Phase: Socle · Size: M · Priority: Medium
Stage: Review
