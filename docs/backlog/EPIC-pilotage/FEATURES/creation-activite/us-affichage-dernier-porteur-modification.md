# US18.15.4 — Affichage du dernier porteur de modification

**En tant que** chef de projet
**Je veux** voir le dernier porteur de modification au bas des onglets Informations générales et structurelles
**Afin de** identifier rapidement qui a modifié l'activité en dernier

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'onglet Informations générales, when je consulte le bas de l'onglet, then l'information du dernier porteur de modification est affichée | ⬜ |
| Given l'onglet Informations structurelles, when je consulte le bas de l'onglet, then l'information du dernier porteur de modification est affichée | ⬜ |
| Given l'affichage du dernier porteur, when je clique sur « Voir plus », then l'ensemble des logs de modification s'affiche | ⬜ |
| Error : given une information de porteur indisponible, system n'affiche pas de porteur erroné et laisse l'onglet consultable | ⬜ |
| Security/Gouvernance : l'information du dernier porteur est en lecture seule et reflète l'utilisateur réel | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le format détaillé des logs (« Créé par … le … à … ») est couvert par l'US Historique des modifications.

## Notes d'implémentation
- Module pilotage (OPDN), pied des onglets Informations générales et Informations structurelles.
- Affichage synthétique du dernier porteur, « Voir plus » pour dérouler l'ensemble des logs.

---
Item Type: US · Parent: F18.15 · Module: pilotage · Phase: phase-3 · Size: XS · Priority: Medium
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.11 Création d'une activité
Dépendances: —
