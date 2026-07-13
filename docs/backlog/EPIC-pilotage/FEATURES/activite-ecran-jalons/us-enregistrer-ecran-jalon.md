# US18.19.16 — Enregistrer l'écran Jalon

**En tant que** chef de projet (pilote d'activité)
**Je veux** enregistrer globalement l'écran Jalon
**Afin de** persister toutes les modifications de l'onglet en une action

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given des modifications à enregistrer, when j'observe le bouton « Enregistrer », then il est vert (actif) | ⬜ |
| Given aucune modification à enregistrer, when j'observe le bouton « Enregistrer », then il est désactivé (disabled) | ⬜ |
| Given le bouton « Enregistrer » actif, when je clique dessus, then l'écran Jalon est enregistré globalement | ⬜ |
| Error : given des modifications non enregistrées, when je quitte l'écran, system affiche un pop-up d'avertissement de sortie sans enregistrer | ⬜ |
| Security/Gouvernance : l'enregistrement de l'écran reste soumis aux droits de l'utilisateur sur l'activité | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La validation d'un jalon (qui enregistre en même temps) est couverte par l'US « Valider un jalon A/B/C/D ».

## Notes d'implémentation
- Bouton « Enregistrer » de l'écran Jalon (module pilotage, onglet Jalon) : vert si modifications en attente, sinon disabled ; enregistrement global ; pop-up d'avertissement à la sortie sans enregistrement.

---
Item Type: US · Parent: F18.19 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.16 Activité — écran Jalons
Dépendances: —
