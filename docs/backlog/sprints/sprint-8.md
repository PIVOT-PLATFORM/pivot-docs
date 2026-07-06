# Sprint 8 — Pilote multi-repo (agilité) + enforcement taxonomie

> ⏸️ **Verrou :** conditionnel au jalon « Socle terminé » — voir [README](./README.md#sprints-712--plan-phase-3-conditionnel-au-jalon--socle-terminé-).

**Scope :** premiers modules satellites sur `pivot-agilite-*` — périmètres volontairement petits pour valider les templates EN17.5/6 avant d'engager le domaine Pilotage
**Sortie :** 1er repo satellite en prod + retour d'expérience sur les templates

| Item | Titre | Size | Priorité | 🤖 Dev |
|------|-------|------|----------|--------|
| US09.1.1 | Créer une room de planning poker | M | High | ⬜ |
| US09.1.2 | Rejoindre une room via code | S | High | ⬜ |
| US09.2.1 | Voter sur un ticket en temps réel | M | High | ⬜ |
| US09.2.2 | Révéler les votes et calculer le consensus | S | High | ⬜ |
| US09.3.1 | Participer anonymement (sans compte) | M | Medium | ⬜ |
| US14.1.1 | Créer et gérer une roue de tirage | M | High | ⬜ |
| US14.2.1 | Effectuer un tirage pondéré anti-repeat | M | High | ⬜ |
| US14.3.1 | Diffusion du résultat en temps réel (WebSocket) | M | High | ⬜ |
| US20.1.1 | Créer une session de rétrospective | M | High | ⬜ |
| US20.1.2 | Animer la rétrospective en temps réel *(XL → décomposer avant impl.)* | XL | High | ⬜ |
| US20.2.1 | Formats de rétro prédéfinis + custom | M | Medium | ⬜ |
| US20.3.1 | Créer et assigner des actions de rétro | M | High | ⬜ |
| US20.3.2 | Revoir les actions de la rétro précédente | S | Medium | ⬜ |
| TAXO-1 | Merge `check-taxonomie.mjs` + câblage `lint:taxonomie` en CI | S | High | ⬜ |
| TAXO-2 | Backfill champ `Rôle:` sur ~700 US/EN (résolution vers le référentiel) | M | High | ⬜ |

> **Parallélisable :** E09 ‖ E14 ‖ E20 (trois agents, trois périmètres du même repo `pivot-agilite-*`) ‖ TAXO (pivot-docs).
