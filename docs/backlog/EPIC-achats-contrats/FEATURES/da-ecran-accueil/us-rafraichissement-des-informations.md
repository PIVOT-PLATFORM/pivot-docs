# US25.3.13 — Rafraîchissement des informations

**En tant que** utilisateur de l'application Achats/Contrats
**Je veux** rafraîchir l'affichage des demandes d'achat
**Afin de** disposer des informations à jour tout en conservant mon contexte de consultation

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un onglet de demandes d'achat, when je clique sur le bouton d'actualisation, then l'affichage est rechargé avec les données à jour | ⬜ |
| Given un onglet ouvert sans action d'actualisation, when des données évoluent côté serveur, then l'affichage reste figé à la dernière sélection | ⬜ |
| Given un changement d'onglet, when je bascule sur un autre sous-onglet, then les données sont rechargées automatiquement | ⬜ |
| Given un tri de colonnes et des filtres en cours, when le rafraîchissement a lieu, then le tri des colonnes et les filtres en cours sont conservés | ⬜ |
| Error : given l'échec du rechargement, when j'actualise, then un message d'erreur s'affiche sans perdre la sélection en cours | ⬜ |
| Security/Gouvernance : le rafraîchissement respecte le périmètre de visibilité de l'utilisateur ; disponible pour P/V/CM/A (OUI/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Les mécanismes de notification en temps réel ne sont pas couverts (affichage figé jusqu'à action utilisateur ou changement d'onglet).

## Notes d'implémentation
- Écran d'accueil des demandes d'achats (module WRAP/OPDN), bouton d'actualisation.
- Affichage figé à la dernière sélection ; rechargement auto au changement d'onglet ; conservation du tri des colonnes et des filtres en cours.

---
Item Type: US · Parent: F25.3 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: SPEC_OPDN — B.3 Demandes d'achats — écran d'accueil
Dépendances: —
