# US25.1.3 — Bouton roue crantée (accès au profil)

**En tant que** utilisateur de l'application Achats/Contrats
**Je veux** ouvrir la vue de mon profil depuis un bouton roue crantée
**Afin de** consulter et paramétrer mes informations et préférences

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'interface de l'application, when je regarde en haut à droite, then le bouton roue crantée est affiché à côté de l'icône profil | ⬜ |
| Given le bouton roue crantée, when je clique dessus, then la vue du profil s'ouvre | ⬜ |
| Error : given l'indisponibilité momentanée de la vue profil, system affiche un message d'erreur et laisse l'utilisateur sur l'écran courant | ⬜ |
| Security/Gouvernance : chaque utilisateur n'accède qu'à son propre profil ; bouton disponible pour P/V/CM/A (OUI/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le contenu détaillé de la vue profil (rattachement, préférences) couvert par les US du profil utilisateur.

## Notes d'implémentation
- Bouton roue crantée positionné en haut à droite, à côté de l'icône profil.
- Module WRAP/OPDN.

---
Item Type: US · Parent: F25.1 · Module: pilotage · Phase: phase-3 · Size: XS · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: SPEC_OPDN — B.1 Navigation générale & accès
Dépendances: —
