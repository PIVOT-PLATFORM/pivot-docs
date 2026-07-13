# US25.5.5 — Visualisation d'un contrat

**En tant que** utilisateur final
**Je veux** consulter le détail d'un contrat en cliquant dessus
**Afin de** prendre connaissance des informations des contrats rattachés à mon périmètre

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given la liste des contrats, when je clique sur un contrat, then ses détails s'affichent en mode visualisation (lecture seule) | ⬜ |
| Given un utilisateur rattaché à une unité/division/direction, when il consulte les contrats, then il voit les contrats rattachés à son unité, sa division ou sa direction | ⬜ |
| Given une direction quelconque, when on consulte ses contrats, then le contrat C00000000 y est présent afin de notifier les administrateurs | ⬜ |
| Error : given un contrat hors du périmètre organisationnel de l'utilisateur, system ne l'affiche pas dans sa liste | ⬜ |
| Security/Gouvernance : tous les rôles (P/V/CM/A) peuvent visualiser les contrats de leur périmètre (OUI/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le passage en édition est couvert par l'US Modification d'un contrat.
- La recherche et le filtrage des contrats sont couverts par leurs US dédiées.

## Notes d'implémentation
- Écran d'accueil des contrats (module OPDN, B.5), clic sur une ligne → vue détail en lecture seule.
- Visibilité par périmètre organisationnel (unité/division/direction).
- Contrat système C00000000 présent à chaque direction pour notifier les administrateurs.

---
Item Type: US · Parent: F25.5 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: utilisateur-final
Source: SPEC_OPDN — B.5 Contrats — écran d'accueil
Dépendances: —
