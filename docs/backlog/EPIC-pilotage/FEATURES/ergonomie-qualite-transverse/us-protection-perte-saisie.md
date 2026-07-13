# US18.11.2 — Être protégé contre la perte de saisie

**En tant que** utilisateur final
**Je veux** être averti par une pop-up claire avant de quitter un écran sans sauvegarder
**Afin de** ne pas perdre ma saisie en cours par erreur

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un formulaire avec des modifications non enregistrées, when je tente de quitter l'écran, then une pop-up « Quitter sans sauvegarder » claire s'affiche | ⬜ |
| Given la pop-up « Quitter sans sauvegarder » affichée, when je confirme, then l'écran est quitté et la saisie non enregistrée est abandonnée ; when j'annule, then je reste sur l'écran avec ma saisie conservée | ⬜ |
| Error : given un formulaire sans aucune modification, when je quitte l'écran, then aucune pop-up n'est affichée (pas d'interruption inutile) | ⬜ |
| Security/Gouvernance : la pop-up n'altère aucune donnée enregistrée ; abandonner la saisie ne modifie pas l'état persistant existant | ⬜ |
| A11y : la pop-up est accessible au clavier (focus piégé, échappement) et restituée par lecteur d'écran, conformément à WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La sauvegarde effective des données relève des US de chaque formulaire concerné.
- Les bulles d'aide et la réinitialisation des champs sont couvertes par leurs US dédiées.

## Notes d'implémentation
- Pop-up « Quitter sans sauvegarder » (module pilotage) déclenchée uniquement en présence de modifications non enregistrées.

---
Item Type: US · Parent: F18.11 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Backlog OPPA (reconstitution v1–v2.1) — US-1102
Dépendances: —
