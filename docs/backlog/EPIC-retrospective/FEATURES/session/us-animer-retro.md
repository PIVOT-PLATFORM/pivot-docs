# US20.1.2 — Animer la rétrospective en temps réel

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** Scrum Master (animateur)
**Je veux** conduire la rétrospective par phases avec timer et contribution collaborative
**Afin d'** obtenir des retours structurés de toute l'équipe en temps réel

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| Phase CONTRIBUTION : participants soumettent des cards dans chaque colonne (texte, anonyme optionnel) | ⬜ |
| STOMP broadcast `CARD_ADDED` → cards apparaissent masquées (autres participants) jusqu'à phase REVUE | ⬜ |
| Phase REVUE : animateur révèle toutes les cards → `CARDS_REVEALED` broadcast | ⬜ |
| Phase VOTE : chaque participant a N votes (dot-voting) à répartir sur les cards | ⬜ |
| Phase ACTION : équipe génère des actions à partir des cards les plus votées | ⬜ |
| Timer configurable par phase (contribution, vote, action) | ⬜ |
| XSS : contenu card échappé (textContent, jamais innerHTML) | ⬜ |
| Test : card soumise visible uniquement par animateur avant révélation | ⬜ |

---
Item Type: US · Parent: F20.1 · Module: agilite · Phase: phase-3 · Size: XL · Priority: High
Stage: Backlog
Dépendances: US20.1.1
