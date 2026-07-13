# US18.18.7 — Bouton de mise à jour des données des tableaux

**En tant que** contrôleur de gestion SI (profil budget)
**Je veux** rafraîchir les données des tableaux budgétaires via un bouton dédié
**Afin de** afficher les dernières données à jour sans quitter l'écran

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'écran Budget, when je clique sur le bouton de mise à jour, then les données des tableaux sont rafraîchies | ⬜ |
| Given une modification en cours, when je clique sur le bouton de mise à jour, then la modale « Quitter sans sauvegarder » s'affiche | ⬜ |
| Given la modale « Quitter sans sauvegarder », when j'agis, then je peux poursuivre en perdant les modifications ou annuler pour rester sur ma saisie | ⬜ |
| Error : given une modification en cours et un choix d'annulation dans la modale, system conserve les modifications non sauvegardées | ⬜ |
| Security/Gouvernance : le rafraîchissement respecte les droits de consultation de l'utilisateur | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le mécanisme d'enregistrement des modifications, couvert par l'US Enregistrer.

## Notes d'implémentation
- Module pilotage (OPDN), écran Budget, bouton de mise à jour des données des tableaux.
- Modale « Quitter sans sauvegarder » (poursuivre en perdant les modifs / annuler) si une modification est en cours.

---
Item Type: US · Parent: F18.18 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: controleur-de-gestion-si
Source: SPEC_OPDN — B.15 Activité — écran Budget
Dépendances: —
