# US30.3.10 — Mode private (contribution masquée avant révélation)

**En tant que** facilitateur
**Je veux** activer un mode « private » où chaque participant contribue sans voir les contributions des autres jusqu'à une révélation pilotée par l'animateur
**Afin d'** éviter l'effet de conformité / d'ancrage et libérer des idées indépendantes en atelier

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un atelier en cours, when l'animateur active le mode private, then chaque participant ne voit que ses propres contributions jusqu'à la révélation | ⬜ |
| Given le mode private actif, when l'animateur déclenche la révélation, then toutes les contributions deviennent visibles simultanément pour l'ensemble des participants | ⬜ |
| Error : given une entrée invalide ou une coupure réseau, system préserve les contributions masquées et affiche un état cohérent à la reconnexion | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

---
Item Type: US · Parent: F30.3 · Module: collaboratif · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: animateur-facilitateur
Source: Étude interne Klaxoon (EDF) 2026-07 · MoSCoW: Should · Lot: Lot 2 · Origine: Écart terrain (usage central)
Justification: Étude interne §4 (verbatim) : « faire travailler les utilisateurs en mode private pendant les ateliers est primordiale » — distinct de US30.3.5 (anonymat d'attribution) et du masquage de vote (US30.3.1)
Dépendances: —
