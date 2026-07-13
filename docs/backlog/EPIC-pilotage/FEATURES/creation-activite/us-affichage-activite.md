# US18.15.7 — Affichage d'une activité

**En tant que** chef de projet
**Je veux** ouvrir une activité sur son écran Information générale et être alerté des jalons en retard de validation
**Afin de** prendre connaissance de l'activité et penser à valider les jalons échus

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une activité de la liste, when je l'ouvre, then elle s'affiche sur l'écran « Information générale » | ⬜ |
| Given un jalon A/B/C/ABC/BC/D dont la date est passée et non validée, when j'ouvre l'activité, then un bandeau warning « La date du jalon X est passée - pensez à le valider pour enregistrer la référence planning et budget à date » s'affiche au-dessus des onglets | ⬜ |
| Given plusieurs jalons passés non validés, when le bandeau s'affiche, then seul le premier (date la plus éloignée dans le passé) est mentionné | ⬜ |
| Given le bandeau warning affiché, when je le ferme, then il disparaît ; à la ré-ouverture de l'activité il est réinitialisé et réaffiché | ⬜ |
| Error : given aucun jalon passé non validé, system n'affiche aucun bandeau warning | ⬜ |
| Security/Gouvernance : l'ouverture et le bandeau sont en lecture seule et reflètent l'état réel des jalons de l'activité | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La validation effective des jalons est couverte par la feature Gestion des jalons.

## Notes d'implémentation
- Module pilotage (OPDN), ouverture par défaut sur l'écran « Information générale ».
- Bandeau warning au-dessus des onglets, fermable, réinitialisé à chaque ré-ouverture ; ne cite que le jalon dont la date passée est la plus éloignée.

---
Item Type: US · Parent: F18.15 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.11 Création d'une activité
Dépendances: —
