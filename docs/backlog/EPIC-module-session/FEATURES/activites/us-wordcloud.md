# US19.3.3 — Activité WORDCLOUD — nuage de mots collaboratif

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** participant
**Je veux** soumettre des mots qui apparaissent instantanément dans un nuage collaboratif
**Afin de** faire émerger visuellement les idées collectives

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| Participant soumet 1–3 mots (configurable) · POST `.../sessions/{id}/wordcloud/words` | ⬜ |
| STOMP broadcast `WORD_ADDED` → nuage mis à jour en temps réel | ⬜ |
| Taille mot proportionnelle à sa fréquence d'apparition | ⬜ |
| Filtre obscénités configurable (liste noire tenant) | ⬜ |
| Vue Angular : rendu nuage CSS (pas de lib externe) · taille calc côté client | ⬜ |
| Modération : animateur peut supprimer un mot | ⬜ |
| Test : même mot soumis 3 fois → taille triple · mot supprimé → broadcast `WORD_REMOVED` | ⬜ |

---
Item Type: US · Parent: F19.3 · Module: collaboratif · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Dépendances: US19.1.2
