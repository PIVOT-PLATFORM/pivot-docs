# US05.13.2 — ZAP full scan + rapport

**En tant que** équipe sécurité
**Je veux** un scan ZAP full (actif) avec rapport détaillé
**Afin d'** identifier les vulnérabilités nécessitant une remédiation

## Critères d'acceptation

| Critère | 🤖 Dev | ✅ PO |
|---------|--------|-------|
| Workflow `dast-full.yml` déclenché manuellement (workflow_dispatch) | ⬜ | ⬜ |
| ZAP full scan (actif) sur staging avec auth configurée | ⬜ | ⬜ |
| Rapport publié en GitHub Pages ou artefact | ⬜ | ⬜ |
| Issue GitHub créée automatiquement si nouvelles alertes High+ | ⬜ | ⬜ |

---
Item Type: US · Parent: EN05.13 · Module: core · Phase: MVP · Size: M · Priority: Medium
Human Gate: needs-human-valid · Stage: Backlog
