# US28.3.6 — Adaptateur Apache Airflow (alternative orchestration data)

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** développeur ou data engineer
**Je veux** pouvoir activer **Apache Airflow** (alternative à Kestra) pour les pipelines data
**Afin de** choisir, à l'instanciation, l'orchestrateur data déjà en place dans mon organisation

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| Adaptateur `adapter-airflow` conforme au contrat PivotAdapter (EN28.3) | ⬜ |
| Un DAG Airflow est visible et supervisé depuis le portail | ⬜ |
| Une instance peut activer Kestra, Airflow, ou les deux simultanément | ⬜ |

---
Item Type: US · Parent: F28.3 · Module: workflows · Phase: phase-3 · Size: M · Priority: Low
Stage: ⬜
Dépendances: EN28.3
