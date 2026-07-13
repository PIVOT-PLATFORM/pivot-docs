# US18.10.2 — Accéder aux guides & support

**En tant que** utilisateur final
**Je veux** disposer d'accès directs aux guides utilisateurs, aux news OPPA et au support ITPLUS
**Afin de** me former, me tenir informé et obtenir de l'aide sans quitter l'application

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'application, when j'ouvre la zone d'aide, then j'accède directement aux guides utilisateurs, aux news OPPA et au support ITPLUS | ⬜ |
| Given un accès direct (guide, news ou support), when je clique dessus, then la ressource correspondante s'ouvre | ⬜ |
| Error : given une ressource d'aide (guide, news ou support) indisponible, when je clique dessus, then un message explicite est affiché sans bloquer l'application | ⬜ |
| Security/Gouvernance : les accès aux guides, news et support n'exposent aucune donnée métier au-delà des habilitations de l'utilisateur | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le contenu des guides, des news OPPA et du support ITPLUS n'est pas produit par cette US.
- Le lien vers l'application de suivi des modifications est couvert par son US dédiée.

## Notes d'implémentation
- Accès directs aux guides utilisateurs, news OPPA et support ITPLUS (module pilotage).

---
Item Type: US · Parent: F18.10 · Module: pilotage · Phase: phase-3 · Size: XS · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Backlog OPPA (reconstitution v1–v2.1) — US-1002
Dépendances: —
