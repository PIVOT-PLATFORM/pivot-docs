# US18.12.3 — Suppression d'un portefeuille existant

**En tant que** gestionnaire de portefeuille
**Je veux** supprimer un portefeuille existant via le bouton « corbeille » après confirmation
**Afin de** retirer les portefeuilles devenus inutiles sans suppression accidentelle

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un portefeuille de la liste, when je clique sur le bouton « corbeille », then une pop-up de confirmation s'affiche | ⬜ |
| Given la pop-up de confirmation, when je clique sur « confirmer », then le portefeuille est supprimé et retiré de la liste | ⬜ |
| Given la pop-up de confirmation, when je clique sur « annuler », then aucune suppression n'a lieu et je reviens à la liste | ⬜ |
| Error : given une suppression en échec, system conserve le portefeuille dans la liste et signale l'échec | ⬜ |
| Security/Gouvernance : seul un gestionnaire de portefeuille peut supprimer un portefeuille | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La suppression n'affecte pas les activités du portefeuille, seulement le regroupement.

## Notes d'implémentation
- Module pilotage (OPDN), bouton « corbeille » sur la ligne du portefeuille.
- Pop-up de confirmation obligatoire (confirmer/annuler).

---
Item Type: US · Parent: F18.12 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: gestionnaire-de-portefeuille
Source: SPEC_OPDN — B.8 Portefeuilles d'activités — liste & gestion
Dépendances: —
