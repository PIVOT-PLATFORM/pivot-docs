# US05.13.1 — ZAP baseline planifié

**En tant que** équipe sécurité
**Je veux** un scan ZAP baseline automatique planifié sur l'environnement de staging
**Afin de** détecter les vulnérabilités OWASP en continu

## Critères d'acceptation

| Critère | 🤖 Dev | ✅ PO |
|---------|--------|-------|
| Workflow GitHub Actions `dast-baseline.yml` déclenché nightly (cron) | ⬜ | ⬜ |
| ZAP baseline scan contre l'URL staging pivot-ui | ⬜ | ⬜ |
| Rapport HTML + JSON archivé en artefact GitHub Actions | ⬜ | ⬜ |
| Alertes Medium+ bloquantes (fail CI si nouvelles alertes) | ⬜ | ⬜ |
| Faux positifs gérés via fichier de règles ZAP (`.zap/rules.tsv`) | ⬜ | ⬜ |

---
Item Type: US · Parent: EN05.13 · Module: core · Phase: MVP · Size: S · Priority: Medium
Human Gate: needs-human-valid · Stage: Backlog
