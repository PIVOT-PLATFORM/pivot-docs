# US18.1.2 — Visualiser la roadmap en vue Gantt

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** responsable pilotage
**Je veux** voir l'ensemble des projets sous forme de diagramme de Gantt interactif
**Afin de** détecter les chevauchements et les dépendances critiques

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| GET `/api/pilotage/roadmap/projects?teamId=` retourne liste projets avec dates + jalons | ⬜ |
| Vue Gantt Angular : barres horizontales par projet, axe temporel configurable (mensuel / trimestriel / annuel) | ⬜ |
| Jalons affichés (losange) sur la timeline | ⬜ |
| Glisser-déposer pour modifier les dates (PUT `.../projects/{id}`) | ⬜ |
| Filtre par statut / équipe / période | ⬜ |
| Accessibilité : navigation clavier sur le Gantt, ARIA labels | ⬜ |
| Test : chevauchement projets détecté et signalé visuellement | ⬜ |

---
Item Type: US · Parent: F18.1 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: High
Stage: Backlog
Dépendances: US18.1.1
