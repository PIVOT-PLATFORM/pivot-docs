# US25.5.6 — Barre de recherche

**En tant que** utilisateur final
**Je veux** rechercher un contrat par texte sur l'ensemble de ses champs renseignés
**Afin de** retrouver rapidement un contrat sans connaître son numéro exact

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given la barre de recherche, when je saisis un texte, then la recherche porte sur tous les champs renseignés d'un contrat : N°, Fournisseur, Libellé, Direction, Division, Unité, Contract Manager, Segment d'achat, Résumé, Date début, Date fin validité PGI, Informations complémentaires | ⬜ |
| Given une saisie correspondant à un champ renseigné, when je lance la recherche, then les contrats correspondants sont listés | ⬜ |
| Error : given une saisie ne correspondant à aucun champ renseigné, system renvoie une liste vide sans erreur | ⬜ |
| Security/Gouvernance : la recherche s'exerce dans le périmètre visible de chaque rôle ; tous les rôles (P/V/CM/A) y ont accès (OUI/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le filtrage structuré par critères est couvert par l'US Filtrage des données.

## Notes d'implémentation
- Écran d'accueil des contrats (module OPDN, B.5), barre de recherche texte plein champ.
- Champs couverts : N°, Fournisseur, Libellé, Direction, Division, Unité, Contract Manager, Segment d'achat, Résumé, Date début, Date fin validité PGI, Informations complémentaires.

---
Item Type: US · Parent: F25.5 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: SPEC_OPDN — B.5 Contrats — écran d'accueil
Dépendances: —
