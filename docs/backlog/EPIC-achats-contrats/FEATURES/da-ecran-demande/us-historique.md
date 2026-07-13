# US25.4.19 — Historique

**En tant que** utilisateur de l'application Achats/Contrats
**Je veux** consulter l'historique des lancements, refus et approbations d'une DA
**Afin de** tracer les actions et décisions successives sur la demande

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une DA, when j'ouvre son historique, then il retrace ses lancements, refus et approbations avec les commentaires associés | ⬜ |
| Given une action tracée, when elle s'affiche dans l'historique, then elle indique le nom de la personne (prescripteur, admin, valideur/vérificateur ou suppléant), la date et l'heure | ⬜ |
| Error : given une DA sans action encore réalisée, system affiche un historique vide sans erreur | ⬜ |
| Security/Gouvernance : consultation ouverte à P/V/CM/A (OUI/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Les actions elles-mêmes (Lancer le workflow, Approuver, Refuser — US dédiées).

## Notes d'implémentation
- Écran de la demande d'achat (module WRAP/OPDN), bloc Historique.
- Trace lancements/refus/approbations avec commentaires, nom (prescripteur, admin, valideur/vérificateur ou suppléant), date et heure.

---
Item Type: US · Parent: F25.4 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: SPEC_OPDN — B.4 Demandes d'achats — écran de la demande
Dépendances: —
