# US25.4.26 — Refuser

**En tant que** responsable des marchés (vérificateur / valideur)
**Je veux** refuser la DA pour la renvoyer au prescripteur
**Afin de** demander une correction avant toute nouvelle soumission

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une DA en cours de workflow, when je clique sur « Refuser », then elle repasse au statut « Brouillon » chez le prescripteur | ⬜ |
| Given un refus, when il est enregistré, then le workflow repasse à l'étape initiale, le prescripteur reçoit un mail et la DA se ferme | ⬜ |
| Error : given une DA déjà refermée par une autre action, system n'applique pas un second refus | ⬜ |
| Security/Gouvernance : action ouverte au vérificateur/valideur (V), au contract manager (CM) et à l'administrateur (A), non ouverte au prescripteur (P) — matrice P/V/CM/A = NON/OUI/OUI/OUI | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'approbation d'une DA (US « Approuver »).

## Notes d'implémentation
- Écran de la demande d'achat (module WRAP/OPDN), action « Refuser ».
- Renvoie la DA au statut « Brouillon » chez le prescripteur ; workflow à l'étape initiale, mail au prescripteur, fermeture de la DA.

---
Item Type: US · Parent: F25.4 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: responsable-des-marches
Source: SPEC_OPDN — B.4 Demandes d'achats — écran de la demande
Dépendances: —
