# Sprint 18 — Risques + plan de contrôle sécurité

> ✅ **Verrou Socle levé (2026-07-10).** Inchangé au re-tri du 2026-07-10 (aucune dépendance E40/EN18.3-8). Voir [README §Séquencement](./README.md#sprints-79-1720--plan-phase-3-conditionnel-au-jalon--socle-terminé-).

**Sortie :** registre de risques opérationnel + socle Zero Trust posé

**Gate 1 READINESS passé (2026-07-11)** — **22/22 items Ready** (fourchette 88-100). ACs complétés
sur ~7 fiches (stubs Zero Trust EN43.5/6, A11y F21.1, sécurité 404-403 F21.3). **2 blocages
d'implémentation** (pas de Gate 1) : **EN43.7d** → EN43.11 (classification A/B/C non livrée) ;
**US21.1.6 + la persistance de tout F21.1** → **EN21.1** (schéma Flyway `risk` + entités JPA) ⬜
**non planifié dans ce sprint** — à ordonnancer en tête. Décisions consolidées → commentaire de la PR Gate 1.

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
| EN43.7a | Moteur de politique : PDP/PEP & fail-closed *(ex-EN43.7 XL, décomposé 2026-07-10)* | L | Critical | ⬜ |
| EN43.7b | Politiques RBAC par rôle (taxonomie) | M | Critical | ⬜ |
| EN43.7c | Politiques ABAC fines (par entité, par action) | M | Critical | ⬜ |
| EN43.7d | Contrainte de souveraineté dans la décision d'accès *(bloqué : dépend EN43.11 non livré)* | M | Critical | ⬜ |
| EN43.7e | Politiques versionnées en Git (policy-as-code) | M | Critical | ⬜ |

> **US21.2.5/21.2.6 (mode AMDEC, exposition & vélocité — Medium) → post-S19.** EN43.5-7 = prérequis de tout module manipulant des données sensibles (checklist EN43.13). F21.4 boucle vivante dépend d'ADR-019 (bus) → post-S19.
