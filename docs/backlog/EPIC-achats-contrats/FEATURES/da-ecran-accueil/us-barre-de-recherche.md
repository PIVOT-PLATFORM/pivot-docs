# US25.3.12 — Barre de recherche

**En tant que** utilisateur de l'application Achats/Contrats
**Je veux** rechercher une demande d'achat via la barre de recherche
**Afin de** retrouver rapidement une DA dans l'onglet consulté

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un onglet de demandes d'achat, when je saisis un texte dans la barre de recherche, then la liste se restreint aux DA dont l'une des colonnes affichées correspond au texte | ⬜ |
| Given la barre de recherche, when je recherche, then la recherche porte sur l'ensemble des colonnes de l'onglet DA courant | ⬜ |
| Error : given un texte sans correspondance, when je recherche, then la liste s'affiche vide sans erreur | ⬜ |
| Security/Gouvernance : la recherche reste limitée aux DA visibles selon le périmètre de l'utilisateur ; disponible pour P/V/CM/A (OUI/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le filtrage structuré par critère est couvert par l'US Filtrage des données.

## Notes d'implémentation
- Écran d'accueil des demandes d'achats (module WRAP/OPDN), barre de recherche texte.
- Recherche sur l'ensemble des colonnes de l'onglet DA courant.

---
Item Type: US · Parent: F25.3 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: SPEC_OPDN — B.3 Demandes d'achats — écran d'accueil
Dépendances: —
