# US18.16.6 — Projet à enjeux

**En tant que** chef de projet (pilote d'activité)
**Je veux** cocher si l'activité constitue un projet à enjeux pour la DivNum
**Afin de** signaler les projets à surveiller prioritairement

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ Projet à enjeux, when l'écran s'affiche, then une case à cocher est proposée avec la valeur par défaut False (décochée) | ⬜ |
| Given je coche « Projet à enjeux », when j'enregistre, then l'activité est marquée comme projet à enjeux pour la DivNum | ⬜ |
| Given une activité de type RUN, when j'affiche son écran Informations générales, then le champ Projet à enjeux est absent | ⬜ |
| Error : given l'absence du champ sur une activité RUN, when j'enregistre, then aucune valeur « projet à enjeux » n'est requise ni stockée pour cette activité | ⬜ |
| Security/Gouvernance : seul le chef de projet pilote de l'activité (ou un administrateur habilité) peut modifier l'indicateur projet à enjeux | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Les traitements ou tableaux de bord filtrant les projets à enjeux ne sont pas couverts ici.
- L'enregistrement global de l'écran est couvert par l'US Enregistrer informations générales.

## Notes d'implémentation
- Écran Activité — Informations générales (module pilotage), case à cocher, défaut False.
- Champ absent de l'écran d'une activité de type RUN.

---
Item Type: US · Parent: F18.16 · Module: pilotage · Phase: phase-3 · Size: XS · Priority: Medium
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.12 Activité — champs Informations générales
Dépendances: —
