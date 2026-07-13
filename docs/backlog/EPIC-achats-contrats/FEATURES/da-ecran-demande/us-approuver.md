# US25.4.24 — Approuver

**En tant que** responsable des marchés (vérificateur / valideur)
**Je veux** approuver la DA pour la faire avancer dans le workflow
**Afin de** valider la demande jusqu'à sa validation finale dans le PGI

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une DA à une étape de vérification/validation, when je clique sur « Approuver », then elle passe à l'étape suivante, un mail est envoyé au suivant (ou un récapitulatif à 17h) et la DA se ferme | ⬜ |
| Given la validation finale, when je l'approuve, then PGI s'ouvre sur l'écran de validation puis le statut de la DA passe « Validé » | ⬜ |
| Given des sessions simultanées, when j'appuie sur « Approuver », then un contrôle des étapes s'exécute pour éviter la double validation | ⬜ |
| Error : given une étape déjà validée par une autre session, system empêche la double validation | ⬜ |
| Security/Gouvernance : action ouverte au vérificateur/valideur (V), au contract manager (CM) et à l'administrateur (A), non ouverte au prescripteur (P) — matrice P/V/CM/A = NON/OUI/OUI/OUI | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le bouton « Valider dans My PGI » (US dédiée).
- Le refus d'une DA (US « Refuser »).

## Notes d'implémentation
- Écran de la demande d'achat (module WRAP/OPDN), action « Approuver ».
- Étape suivante + mail au suivant (ou récapitulatif à 17h) + fermeture ; validation finale ouvre PGI puis statut « Validé » ; contrôle des étapes à l'appui contre la double validation (sessions simultanées).

---
Item Type: US · Parent: F25.4 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Critical
Stage: ⬜
Rôle: responsable-des-marches
Source: SPEC_OPDN — B.4 Demandes d'achats — écran de la demande
Dépendances: —
