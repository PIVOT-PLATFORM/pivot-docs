# US18.10.3 — Disposer de liens utiles intégrés

**En tant que** utilisateur final
**Je veux** disposer dans l'application de liens vers la documentation et les outils internes
**Afin de** accéder rapidement aux ressources connexes à mon activité

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'application, when je consulte la zone des liens utiles, then des liens vers la documentation et les outils internes sont intégrés et accessibles | ⬜ |
| Given un lien utile intégré, when je clique dessus, then la documentation ou l'outil interne cible s'ouvre | ⬜ |
| Error : given un lien utile cible indisponible, when je clique dessus, then un message explicite est affiché sans bloquer l'application | ⬜ |
| Security/Gouvernance : les liens intégrés pointent uniquement vers des ressources internes autorisées, sans exposer de données au-delà des habilitations de l'utilisateur | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Les accès guides / news / support sont couverts par l'US Accéder aux guides & support.
- Le lien vers l'application de suivi des modifications est couvert par son US dédiée.

## Notes d'implémentation
- Liens vers documentation et outils internes intégrés dans l'application (module pilotage).

---
Item Type: US · Parent: F18.10 · Module: pilotage · Phase: phase-3 · Size: XS · Priority: Low
Stage: ⬜
Rôle: utilisateur-final
Source: Backlog OPPA (reconstitution v1–v2.1) — US-1003
Dépendances: —
