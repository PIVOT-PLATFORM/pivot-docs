# US19.3.4 — Activité BRAINSTORM — post-its virtuels collaboratifs

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** participant
**Je veux** ajouter des post-its virtuels sur un tableau de brainstorming
**Afin de** contribuer collectivement à la génération d'idées

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| Participant ajoute un post-it (texte, couleur parmi 5 options) | ⬜ |
| STOMP broadcast `CARD_ADDED` → tous voient le nouveau post-it | ⬜ |
| Participant peut modifier / supprimer ses propres post-its | ⬜ |
| Animateur peut regrouper les post-its en catégories (labels) | ⬜ |
| Vue Angular : grille de post-its colorés, responsive | ⬜ |
| XSS : contenu post-it échappé (`textContent`, jamais `innerHTML`) | ⬜ |
| Test : modification post-it autre participant → 403 | ⬜ |

---
Item Type: US · Parent: F19.3 · Module: collaboratif · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Dépendances: US19.1.2
