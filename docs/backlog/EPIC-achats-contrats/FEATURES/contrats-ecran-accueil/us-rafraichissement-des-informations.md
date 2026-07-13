# US25.5.7 — Rafraîchissement des informations

**En tant que** utilisateur final
**Je veux** actualiser la liste des contrats via un bouton dédié
**Afin de** disposer de données à jour tout en conservant mon tri et mes filtres

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'écran des contrats, when j'affiche la zone de filtrage, then un bouton d'actualisation est présent à côté du filtrage | ⬜ |
| Given un affichage figé à ma dernière sélection, when je clique sur le bouton d'actualisation, then les informations sont rechargées en conservant le tri et les filtres appliqués | ⬜ |
| Given un changement d'onglet, when je reviens sur la liste, then les données sont rechargées automatiquement | ⬜ |
| Error : given un rechargement, system ne réinitialise ni le tri ni les filtres en cours | ⬜ |
| Security/Gouvernance : fonction disponible pour tous les rôles (P/V/CM/A) dans leur périmètre (OUI/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La définition des critères de filtrage est couverte par l'US Filtrage des données.

## Notes d'implémentation
- Écran d'accueil des contrats (module OPDN, B.5), bouton d'actualisation à côté du filtrage.
- Affichage figé à la dernière sélection ; recharge auto au changement d'onglet ; tri et filtres préservés.

---
Item Type: US · Parent: F25.5 · Module: pilotage · Phase: phase-3 · Size: XS · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: SPEC_OPDN — B.5 Contrats — écran d'accueil
Dépendances: —
