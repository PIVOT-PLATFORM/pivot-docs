# US25.1.5 — Onglet « Contrats »

**En tant que** utilisateur de l'application Achats/Contrats
**Je veux** accéder à l'onglet « Contrats » recensant l'ensemble des contrats
**Afin de** consulter les informations des contrats et de leurs fournisseurs

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le bandeau de menu à gauche, when je sélectionne l'onglet « Contrats », then la liste recense l'ensemble des contrats | ⬜ |
| Given la liste des contrats, when je consulte une ligne, then les informations affichées comprennent Informations contrat, Fournisseur, Contract Manager, Segment d'achat, Contrôle CM, Date de début, Date de fin et Actif | ⬜ |
| Given l'onglet « Contrats » ouvert, when j'observe l'interface, then le bandeau de menu est affiché à gauche | ⬜ |
| Error : given l'échec de chargement de la liste des contrats, system affiche un message d'erreur sans quitter l'onglet | ⬜ |
| Security/Gouvernance : la liste des contrats reste soumise aux droits de l'utilisateur ; onglet disponible pour P/V/CM/A (OUI/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le détail d'un contrat et l'édition (couverts par les US des écrans Contrats).

## Notes d'implémentation
- Colonnes : Informations contrat, Fournisseur, Contract Manager, Segment d'achat, Contrôle CM, Date de début, Date de fin, Actif.
- Bandeau de menu à gauche. Module WRAP/OPDN.

---
Item Type: US · Parent: F25.1 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: utilisateur-final
Source: SPEC_OPDN — B.1 Navigation générale & accès
Dépendances: —
