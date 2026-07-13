# US18.16.4 — Description de l'activité

**En tant que** chef de projet (pilote d'activité)
**Je veux** saisir la description de l'activité dans un champ texte obligatoire limité
**Afin de** documenter l'objet et le périmètre de l'activité

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ Description de l'activité, when je saisis du texte, then je dispose d'une zone de 5 lignes de 80 caractères, limitée à 400 caractères au total | ⬜ |
| Given une description valide saisie, when j'enregistre, then la description est associée à l'activité | ⬜ |
| Error : given le champ Description vide à l'enregistrement, then le système bloque (champ obligatoire) et le bouton Enregistrer/Suivant reste grisé | ⬜ |
| Error : given une saisie atteignant 400 caractères, when je continue à saisir, then le système empêche la saisie au-delà de la limite | ⬜ |
| Security/Gouvernance : seul le chef de projet pilote de l'activité (ou un administrateur habilité) peut modifier la description | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le formatage riche (gras, listes, liens) n'est pas couvert : champ texte simple.
- L'enregistrement global de l'écran est couvert par l'US Enregistrer informations générales.

## Notes d'implémentation
- Écran Activité — Informations générales (module pilotage), zone de texte obligatoire.
- Dimension : 5 lignes de 80 caractères, limite dure de 400 caractères.

---
Item Type: US · Parent: F18.16 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.12 Activité — champs Informations générales
Dépendances: —
