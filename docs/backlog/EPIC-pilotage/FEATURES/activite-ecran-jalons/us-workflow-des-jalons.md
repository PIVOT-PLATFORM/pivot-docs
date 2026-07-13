# US18.19.14 — Workflow des jalons

**En tant que** chef de projet (pilote d'activité)
**Je veux** un workflow visuel des jalons à droite de l'écran
**Afin de** suivre d'un coup d'œil l'état d'avancement des jalons

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'écran Jalon, when il s'affiche, then le workflow des jalons apparaît à droite de l'écran, dans le même ordre que l'affichage des jalons | ⬜ |
| Given un jalon non validé, when le workflow s'affiche, then son état est représenté par une coche grise « Non validé » | ⬜ |
| Given un jalon validé, when le workflow s'affiche, then son état est une coche verte « Validé » (pour A/B/C/D quand validé, pour les autres quand la date de passage est dépassée) | ⬜ |
| Given le prochain jalon à valider, when le workflow s'affiche, then son état est une coche orange « En cours » | ⬜ |
| Error : given un jalon sans date ni validation, system ne le marque ni vert ni orange (reste « Non validé ») | ⬜ |
| Security/Gouvernance : le workflow est un affichage en lecture, sans action de modification des jalons | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Les règles de grisage des jalons sont couvertes par l'US « Affichage des jalons (grisés) ».

## Notes d'implémentation
- Workflow des jalons à droite de l'écran (module pilotage, onglet Jalon), même ordre que l'affichage ; coches : gris = Non validé, vert = Validé (A/B/C/D validés ou autres à date dépassée), orange = En cours (prochain jalon à valider).

---
Item Type: US · Parent: F18.19 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.16 Activité — écran Jalons
Dépendances: —
