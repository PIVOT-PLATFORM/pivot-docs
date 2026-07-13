# US25.1.4 — Onglet « Demandes d'achats »

**En tant que** utilisateur de l'application Achats/Contrats
**Je veux** accéder à l'onglet « Demandes d'achats » et à ses sous-onglets
**Afin de** consulter et gérer les demandes d'achat qui me concernent

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le bandeau de menu à gauche, when je sélectionne l'onglet « Demandes d'achats », then j'accède aux sous-onglets Mes demandes, Demandes à valider, Demandes à valider suppléant, Historique de mes actions et Toutes les demandes | ⬜ |
| Given l'onglet « Demandes d'achats » ouvert, when j'observe l'interface, then le bandeau de menu est affiché à gauche | ⬜ |
| Error : given l'échec de chargement d'un sous-onglet, system affiche un message d'erreur sans quitter l'onglet « Demandes d'achats » | ⬜ |
| Security/Gouvernance : les contenus des sous-onglets restent filtrés selon le rattachement et le rôle de l'utilisateur ; onglet disponible pour P/V/CM/A (OUI/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le contenu de chaque sous-onglet (listes, colonnes, filtres) couvert par les US des écrans DA.

## Notes d'implémentation
- Sous-onglets : Mes demandes, Demandes à valider, Demandes à valider suppléant, Historique de mes actions, Toutes les demandes.
- Bandeau de menu à gauche. Module WRAP/OPDN.

---
Item Type: US · Parent: F25.1 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: utilisateur-final
Source: SPEC_OPDN — B.1 Navigation générale & accès
Dépendances: —
