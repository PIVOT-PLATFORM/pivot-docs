# Sprint 11 — Risques + plan de contrôle sécurité

> ⏸️ **Verrou :** conditionnel au jalon « MVP terminé » — voir [README](./README.md#sprints-712--plan-phase-3-conditionnel-au-jalon--mvp-terminé-).

**Sortie :** registre de risques opérationnel + socle Zero Trust posé

| Item | Titre | Size | Priorité | 🤖 Dev |
|------|-------|------|----------|--------|
| US21.1.1 | Questionnaire de cadrage | M | Critical | ⬜ |
| US21.1.2 | Bibliothèque de typologies | M | Critical | ⬜ |
| US21.1.3 | Taxonomie universelle 12 familles | S | Critical | ⬜ |
| US21.1.4 | Matrice de pondération des impacts | M | Critical | ⬜ |
| US21.1.5 | Bibliothèque de risques pré-suggérés | M | Critical | ⬜ |
| US21.1.6 | Entité Risk au catalogue | M | Critical | ⬜ |
| US21.2.1 | Score probabilité × gravité | M | Critical | ⬜ |
| US21.2.2 | Gravité multidimensionnelle | M | Critical | ⬜ |
| US21.2.3 | Seuils d'appétence | S | High | ⬜ |
| US21.2.4 | Matrice de risques visuelle | M | High | ⬜ |
| US21.3.1 | Cycle de vie du risque | M | Critical | ⬜ |
| US21.3.2 | Stratégies de traitement (4 T) | M | Critical | ⬜ |
| US21.3.3 | Plan d'action | M | High | ⬜ |
| US21.3.4 | Plan de contingence | S | Medium | ⬜ |
| US21.3.5 | Revues de risques | M | High | ⬜ |
| EN43.5 | Plan de contrôle : Identité | L | Critical | ⬜ |
| EN43.6 | Plan de contrôle : Secrets (OpenBao) | L | Critical | ⬜ |
| EN43.7 | Autorisation externalisée (policy-as-code) | XL | Critical | ⬜ |

> **US21.2.5/21.2.6 (mode AMDEC, exposition & vélocité — Medium) → post-S12.** EN43.5-7 = prérequis de tout module manipulant des données sensibles (checklist EN43.13). F21.4 boucle vivante dépend d'ADR-019 (bus) → post-S12.
