# US25.1.2 — Page d'accueil par défaut

**En tant que** utilisateur de l'application Achats/Contrats
**Je veux** arriver sur l'onglet le plus pertinent selon mes actions en attente
**Afin de** accéder immédiatement aux demandes qui me concernent

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un utilisateur sans demande à valider, when il ouvre l'application, then l'onglet affiché par défaut est « Mes demandes » | ⬜ |
| Given un valideur ayant des demandes à valider en tant que titulaire (principal), when il ouvre l'application, then l'onglet affiché par défaut est « Mes demandes à valider » | ⬜ |
| Given un valideur sans demande à valider en principal mais avec des demandes à valider en tant que suppléant, when il ouvre l'application, then l'onglet affiché par défaut est « Mes demandes à valider - Suppléant » | ⬜ |
| Given un valideur sans aucune demande à valider ni en principal ni en suppléant, when il ouvre l'application, then l'onglet affiché par défaut retombe sur « Mes demandes » | ⬜ |
| Error : given l'échec de récupération des demandes à valider, system affiche par défaut l'onglet « Mes demandes » sans bloquer l'accès | ⬜ |
| Security/Gouvernance : chaque utilisateur ne voit que ses propres demandes et celles qui lui sont assignées (titulaire/suppléant) ; règle applicable à P/V/CM/A (OUI/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le contenu et le tri des listes de demandes (couverts par les US des écrans DA).

## Notes d'implémentation
- Ordre de priorité de l'onglet d'accueil : « Mes demandes à valider » (principal) > « Mes demandes à valider - Suppléant » > « Mes demandes ».
- Module WRAP/OPDN, écran d'accueil du module DA.

---
Item Type: US · Parent: F25.1 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: SPEC_OPDN — B.1 Navigation générale & accès
Dépendances: —
