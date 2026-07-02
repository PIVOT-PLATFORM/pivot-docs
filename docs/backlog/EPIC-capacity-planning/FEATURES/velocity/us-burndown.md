# US11.4.2 — Visualiser le burndown chart du sprint

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** Scrum Master
**Je veux** voir le burndown chart du sprint en cours
**Afin de** détecter les dérives de livraison au plus tôt

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| GET `.../events/{id}/burndown` retourne série temporelle points restants par jour | ⬜ |
| Courbe idéale = décrémentation linéaire de la capacité initiale vers 0 | ⬜ |
| Courbe réelle = points restants mis à jour quotidiennement (saisie manuelle ou via intégration) | ⬜ |
| Vue Angular : graphique burndown (ligne idéale + ligne réelle) | ⬜ |
| Alerte : courbe réelle au-dessus de l'idéale depuis 2 jours → indicateur "à risque" | ⬜ |
| Test : pas de mise à jour depuis 3 jours → staleness warning | ⬜ |

---
Item Type: US · Parent: F11.4 · Module: agilite · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
Dépendances: US11.4.1
