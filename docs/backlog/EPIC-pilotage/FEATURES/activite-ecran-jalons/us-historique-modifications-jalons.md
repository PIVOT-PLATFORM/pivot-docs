# US18.19.17 — Historique des modifications (logs) — Jalons

**En tant que** chef de projet (pilote d'activité)
**Je veux** consulter l'historique des modifications de l'onglet Jalon
**Afin de** connaître le dernier porteur et la traçabilité des changements

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'onglet Jalon, when il s'affiche, then l'information du dernier porteur figure en bas de l'onglet, avec un lien « Voir plus » | ⬜ |
| Given une entrée d'historique, when elle s'affiche, then elle indique « Modification par » + utilisateur + « le » + date + heure | ⬜ |
| Given la modification d'un jalon, when je l'enregistre, then l'historique de l'onglet Jalon est mis à jour | ⬜ |
| Given la modification du commentaire de la page jalon, when je l'enregistre, then l'historique de l'onglet Activité est mis à jour (car le commentaire est lié à l'activité) | ⬜ |
| Error : given aucune modification enregistrée, system n'affiche pas d'entrée d'historique erronée | ⬜ |
| Security/Gouvernance : l'historique est en lecture seule et trace l'utilisateur auteur de chaque modification | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La purge ou l'export de l'historique n'est pas couvert par cette US.

## Notes d'implémentation
- Historique des modifications de l'onglet Jalon (module pilotage) : dernier porteur en bas d'onglet + « Voir plus » ; format « Modification par {utilisateur} le {date} {heure} ».
- La modification d'un jalon met à jour l'historique de l'onglet Jalon ; celle du commentaire de la page jalon met à jour l'historique de l'onglet Activité.

---
Item Type: US · Parent: F18.19 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.16 Activité — écran Jalons
Dépendances: —
