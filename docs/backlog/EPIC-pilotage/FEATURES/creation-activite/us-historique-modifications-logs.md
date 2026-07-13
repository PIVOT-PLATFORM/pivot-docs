# US18.15.3 — Historique des modifications (logs) des informations générales et structurelles

**En tant que** chef de projet
**Je veux** consulter l'historique des modifications au bas des onglets Informations générales et structurelles
**Afin de** tracer qui a créé et modifié l'activité et quand

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'onglet Informations générales, when je consulte le bas de l'onglet, then le log de création affiche « Créé par » + utilisateur + « le » + date + « à » + heure, ainsi que les « Modification par »… | ⬜ |
| Given l'onglet Informations structurelles, when je consulte le bas de l'onglet, then les logs affichent « Modification par » + utilisateur + « le » + date + « à » + heure | ⬜ |
| Given plusieurs logs, when j'ouvre l'onglet, then par défaut seul le dernier log est visible | ⬜ |
| Given la liste réduite au dernier log, when je clique sur « Voir plus », then l'ensemble des logs de modification s'affiche | ⬜ |
| Error : given un historique indisponible, system n'affiche aucun log erroné et le reste de l'onglet reste consultable | ⬜ |
| Security/Gouvernance : les logs sont en lecture seule et reflètent l'utilisateur réel ayant créé ou modifié l'activité | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'affichage isolé du dernier porteur de modification est couvert par une US dédiée.

## Notes d'implémentation
- Module pilotage (OPDN), zone de logs en bas des onglets Informations générales et Informations structurelles.
- Format Informations générales : « Créé par … le … à … » puis « Modification par … » ; format Informations structurelles : « Modification par … ».
- Un seul log (le dernier) visible par défaut, « Voir plus » pour dérouler l'ensemble.

---
Item Type: US · Parent: F18.15 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.11 Création d'une activité
Dépendances: —
