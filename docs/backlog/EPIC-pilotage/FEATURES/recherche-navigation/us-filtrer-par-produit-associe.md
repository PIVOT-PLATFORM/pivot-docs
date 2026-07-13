# US18.6.2 — Filtrer par produit associé

**En tant que** utilisateur final
**Je veux** filtrer les activités par Produits associés
**Afin de** retrouver les activités rattachées à un produit donné

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given la liste des activités, when j'applique un filtre Produits associés, then seules les activités rattachées aux produits sélectionnés sont affichées | ⬜ |
| Given un filtre Produits associés appliqué, when je le retire, then la liste revient à son affichage complet | ⬜ |
| Error : given un filtre Produits associés sans activité correspondante, system affiche un état vide explicite sans provoquer d'erreur | ⬜ |
| Security/Gouvernance : le filtrage ne révèle que des activités accessibles selon les habilitations de l'utilisateur | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le champ de recherche textuel est couvert par l'US Rechercher activités et portefeuilles.

## Notes d'implémentation
- Filtre Produits associés sur la liste des activités (module pilotage).

---
Item Type: US · Parent: F18.6 · Module: pilotage · Phase: phase-3 · Size: XS · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Backlog OPPA (reconstitution v1–v2.1) — US-602
Dépendances: —
