# US18.6.1 — Rechercher activités et portefeuilles

**En tant que** utilisateur final
**Je veux** un champ de recherche modernisé
**Afin de** retrouver rapidement des activités et des portefeuilles

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ de recherche, when j'y saisis un terme, then les activités et portefeuilles correspondants sont retournés | ⬜ |
| Given un terme saisi, when je clique sur le bouton d'effacement rapide, then le champ de recherche est vidé | ⬜ |
| Given un filtre de recherche appliqué, when je navigue puis reviens, then le filtre est conservé | ⬜ |
| Error : given une recherche sans résultat, system affiche un état vide explicite sans provoquer d'erreur | ⬜ |
| Security/Gouvernance : la recherche ne retourne que les activités et portefeuilles accessibles selon les habilitations de l'utilisateur | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le filtrage par produit associé est couvert par une US dédiée.

## Notes d'implémentation
- Champ de recherche modernisé (module pilotage) : bouton d'effacement rapide, conservation du filtre lors de la navigation.

---
Item Type: US · Parent: F18.6 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Backlog OPPA (reconstitution v1–v2.1) — US-601
Dépendances: —
