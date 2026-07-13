# US18.14.3 — Réactualisation de la liste

**En tant que** utilisateur final
**Je veux** réactualiser la liste des activités via un bouton dédié
**Afin de** disposer des données à jour sans recharger toute la page

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'écran de recherche d'activités, when je clique sur le bouton d'actualisation, then la liste des activités est rechargée | ⬜ |
| Given des activités modifiées entre-temps, when j'actualise, then la liste reflète l'état à jour | ⬜ |
| Given une actualisation, when elle s'exécute, then les critères de recherche/filtres en cours restent appliqués | ⬜ |
| Error : given une actualisation en échec, system conserve la liste précédente et signale l'échec | ⬜ |
| Security/Gouvernance : seul un utilisateur habilité peut actualiser la liste des activités | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La recherche et le filtrage des activités (US dédiée).

## Notes d'implémentation
- Module pilotage (OPDN), bouton de réactualisation de la liste des activités.

---
Item Type: US · Parent: F18.14 · Module: pilotage · Phase: phase-3 · Size: XS · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: SPEC_OPDN — B.10 Recherche d'activités
Dépendances: —
