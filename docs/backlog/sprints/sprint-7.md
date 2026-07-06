# Sprint 7 — Fondations phase-3 (E17 + gouvernance ADR)

> ⏸️ **Verrou :** ce sprint (comme les Sprints 7–12, voir [README](./README.md#sprints-712--plan-phase-3-conditionnel-au-jalon--mvp-terminé-)) ne démarre qu'après la déclaration « MVP terminé » (Sprint 6).

**Scope :** infrastructure multi-repo complète + mise à jour de la gouvernance d'architecture
**Pré-requis :** E03 terminé · E07 infra prod validée (S4)

| Item | Titre | Priority | 🤖 Dev |
|------|-------|----------|--------|
| EN17.4 | Convention BDD multi-schéma + Flyway baseline | Critical | ⬜ |
| EN17.1 | Publication pivot-core-starter (Maven) | High | ⬜ |
| EN17.2 | Publication @pivot/design-system (npm) — **création du repo `pivot-design-system`** | High | ⬜ |
| EN17.3 | Publication @pivot/ui-core (npm) | High | ⬜ |
| EN17.5 | Template repo pivot-xxx-core | High | ⬜ |
| EN17.6 | Template repo pivot-xxx-ui | High | ⬜ |
| EN17.7 | nginx API Gateway — routing multi-backend par préfixe URL | Critical | ⬜ |
| ADR | Passage ADR-008→016 de « Proposé » à « Accepté » (décision mainteneur actée) | Critical | ⬜ |
| ADR | Rédaction ADR-017 (modèle d'entités catalogue) · ADR-018 (stratégie forks) · **ADR-019 (bus d'événements — bloquant E21/E29/E42/E43)** · ADR-020 (briques natives) | Critical | ⬜ |

> **Parallélisable :** EN17.1 ‖ EN17.2 → EN17.3 → EN17.4 ‖ EN17.5 → EN17.6 · EN17.7 dès EN17.4 stable · rédaction ADR en parallèle de tout le reste.
