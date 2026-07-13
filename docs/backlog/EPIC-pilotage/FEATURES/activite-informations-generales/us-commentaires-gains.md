# US18.16.9 — Commentaires Gains

**En tant que** chef de projet (pilote d'activité)
**Je veux** saisir un commentaire obligatoire sur les gains de l'activité
**Afin de** expliciter et justifier les gains estimés

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ Commentaires Gains, when je saisis du texte, then je peux entrer jusqu'à 400 caractères | ⬜ |
| Given un commentaire valide saisi, when j'enregistre, then le commentaire est associé à l'activité | ⬜ |
| Given une activité de type RUN, when j'affiche son écran Informations générales, then le champ Commentaires Gains est absent | ⬜ |
| Error : given le champ Commentaires Gains vide à l'enregistrement (activité non RUN), then le système bloque (champ obligatoire) et le bouton Enregistrer/Suivant reste grisé | ⬜ |
| Error : given une saisie atteignant 400 caractères, when je continue à saisir, then le système empêche la saisie au-delà de la limite | ⬜ |
| Security/Gouvernance : seul le chef de projet pilote de l'activité (ou un administrateur habilité) peut modifier les commentaires gains | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le formatage riche du commentaire n'est pas couvert : champ texte simple.
- L'enregistrement global de l'écran est couvert par l'US Enregistrer informations générales.

## Notes d'implémentation
- Écran Activité — Informations générales (module pilotage), champ texte obligatoire 400 caractères.
- Champ absent de l'écran d'une activité de type RUN.

---
Item Type: US · Parent: F18.16 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.12 Activité — champs Informations générales
Dépendances: —
