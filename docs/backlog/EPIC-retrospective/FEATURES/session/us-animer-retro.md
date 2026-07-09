# US20.1.2 — Animer la rétrospective en temps réel ⚠️ DÉCOMPOSÉE

> **Cette US a été décomposée en 3 sous-US (2026-07-10, Gate 1 PO Agent — XL trop volumineuse
> pour un seul agent/PR). Ne pas implémenter ce fichier — implémenter les 3 sous-US à la place :**
>
> - [US20.1.2a — Contribution & révélation des cards](us-animer-retro-20-1-2a.md)
> - [US20.1.2b — Phase Vote (dot-voting)](us-animer-retro-20-1-2b.md)
> - [US20.1.2c — Phase Action (transition en session)](us-animer-retro-20-1-2c.md)
>
> **Raison :** 4 phases temps réel distinctes (contribution, révélation, vote, action), chacune
> avec sa propre machine à états STOMP et ses propres tests — indépendantes et parallélisables
> une fois la précédente livrée, comme US08.3.2 (whiteboard) au Sprint 5.

**En tant que** Scrum Master (animateur)
**Je veux** conduire la rétrospective par phases avec timer et contribution collaborative
**Afin d'** obtenir des retours structurés de toute l'équipe en temps réel

## Critères d'acceptation (outline d'origine — voir sous-US pour le détail Given/When/Then)

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
Stage: ⬜
Dépendances: US20.1.1
