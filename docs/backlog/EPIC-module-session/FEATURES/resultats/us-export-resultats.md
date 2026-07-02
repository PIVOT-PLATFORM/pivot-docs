# US19.4.2 — Exporter les résultats d'une session terminée

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** animateur
**Je veux** exporter les résultats d'une session terminée (JSON / CSV)
**Afin de** partager ou archiver les données de la session

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| GET `/api/collaboratif/sessions/{id}/results?format=json|csv` retourne résultats format demandé | ⬜ |
| Session doit être `COMPLETED` pour export (session en cours → 409) | ⬜ |
| Export QUIZ : questions + réponses + scores participants | ⬜ |
| Export POLL : options + nb votes + % | ⬜ |
| Export WORDCLOUD : liste mots + fréquences | ⬜ |
| Export BRAINSTORM : post-its + catégories | ⬜ |
| Export QA : questions + votes + statut | ⬜ |
| Sécurité : seul l'animateur (propriétaire) ou ROLE_ADMIN peut exporter | ⬜ |
| Test : export session autre tenant → 404 | ⬜ |

---
Item Type: US · Parent: F19.4 · Module: collaboratif · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
Dépendances: US19.4.1
