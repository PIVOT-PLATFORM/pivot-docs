# US25.4.2 — Consulter dans MyPGI

**En tant que** utilisateur de l'application Achats/Contrats
**Je veux** ouvrir la DA dans MyPGI via un lien dédié
**Afin de** consulter la demande dans le PGI sur le bon mandant

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une DA disposant d'un numéro, when je clique sur le lien « Consulter dans MyPGI », then la DA s'affiche dans MyPGI | ⬜ |
| Given un numéro de DA, when le lien est construit, then le 3e chiffre du numéro de DA définit le mandant PGI (valeur 1 ou 2) | ⬜ |
| Error : given un utilisateur sans les droits PGI requis, system n'affiche pas la DA dans MyPGI (accès PGI refusé côté PGI) | ⬜ |
| Security/Gouvernance : consultation ouverte à P/V/CM/A (OUI/OUI/OUI/OUI) sous réserve qu'ils disposent des droits PGI | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La gestion des habilitations PGI elles-mêmes (assurée côté PGI).
- Le bouton « Valider dans My PGI » de fin de workflow (US dédiée).

## Notes d'implémentation
- Écran de la demande d'achat (module WRAP/OPDN), lien « Consulter dans MyPGI ».
- Le mandant PGI (1 ou 2) est dérivé du 3e chiffre du numéro de DA.

---
Item Type: US · Parent: F25.4 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: SPEC_OPDN — B.4 Demandes d'achats — écran de la demande
Dépendances: —
