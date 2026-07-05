# US27.3.1 — Arbre d'alignement (O ↔ O, KR → O parent)

**En tant que** responsable pilotage
**Je veux** aligner un objectif sur un objectif parent et **rattacher un KR à l'objectif de niveau supérieur** auquel il contribue
**Afin de** rendre visible la chaîne « stratégie → exécution »

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un objectif, when je l'aligne, then je choisis un objectif parent ; la relation forme un **arbre d'alignement** (sans cycle) | ⬜ |
| Given un KR, when il contribue à un O de niveau supérieur, then le lien de contribution est explicite et remonte l'avancement | ⬜ |
| Error : given un alignement créant un cycle, then il est refusé | ⬜ |

---
Item Type: US · Parent: F27.3 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Raffinage OKR état de l'art (Doerr/Google ; Quantive/Workboard/Viva Goals/Perdoo)
Dépendances: EN27.1 (modèle OKR & moteur)
