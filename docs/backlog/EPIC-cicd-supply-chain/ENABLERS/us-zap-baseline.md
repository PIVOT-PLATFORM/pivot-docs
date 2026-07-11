# US05.13.1 — ZAP baseline planifié

**En tant que** équipe sécurité
**Je veux** un scan ZAP baseline automatique planifié sur l'environnement de staging
**Afin de** détecter les vulnérabilités OWASP en continu

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Workflow GitHub Actions `dast-baseline.yml` déclenché nightly (cron) | ✅ |
| ZAP baseline scan contre l'URL staging pivot-ui | ✅ (dégradation gracieuse tant que le secret `STAGING_PIVOT_UI_URL` n'existe pas — aucun staging pivot-ui réel n'est encore provisionné, voir note ci-dessous) |
| Rapport HTML + JSON archivé en artefact GitHub Actions | ✅ |
| Alertes Medium+ bloquantes (fail CI si nouvelles alertes) | ✅ |
| Faux positifs gérés via fichier de règles ZAP (`.zap/rules.tsv`) | ✅ |

**Implémentation** : [pivot-core#190](https://github.com/PIVOT-PLATFORM/pivot-core/pull/190) (mergée).

> **Action mainteneur requise** : aucun environnement de staging pivot-ui n'existe encore
> (vérifié — absent de `docs/cicd/`, aucun workflow `deploy-staging`). Le workflow tourne mais se
> dégrade gracieusement (`::warning::`) tant que le secret `STAGING_PIVOT_UI_URL` n'est pas créé.
> Aucun scan ZAP n'a donc pu tourner end-to-end pour l'instant.

---
Item Type: US · Parent: EN05.13 · Module: core · Phase: Socle · Size: S · Priority: Medium
Stage: ✅
Rôle: responsable-de-la-securite-si
