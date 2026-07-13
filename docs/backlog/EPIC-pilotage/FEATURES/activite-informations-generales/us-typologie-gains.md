# US18.16.8 — Typologie Gains

**En tant que** chef de projet (pilote d'activité)
**Je veux** sélectionner la typologie des gains dans une liste obligatoire
**Afin de** qualifier la nature du gain attendu de l'activité

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ Typologie Gains, when j'ouvre la liste, then je peux choisir une valeur parmi : Coûts économisés (dépose infra, maintenance, licence…), Gain de productivité (optimisation processus, automatisation…), Diminution des erreurs et risques (obsolescence, cyber…) | ⬜ |
| Given une typologie sélectionnée, when j'enregistre, then la typologie retenue est associée à l'activité | ⬜ |
| Given une activité de type RUN, when j'affiche son écran Informations générales, then le champ Typologie Gains est absent | ⬜ |
| Error : given le champ Typologie Gains non renseigné à l'enregistrement (activité non RUN), then le système bloque (champ obligatoire) et le bouton Enregistrer/Suivant reste grisé | ⬜ |
| Security/Gouvernance : seul le chef de projet pilote de l'activité (ou un administrateur habilité) peut modifier la typologie des gains | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La cohérence entre typologie et montant des gains estimés n'est pas contrôlée ici.
- L'enregistrement global de l'écran est couvert par l'US Enregistrer informations générales.

## Notes d'implémentation
- Écran Activité — Informations générales (module pilotage), liste déroulante obligatoire.
- Valeurs : Coûts économisés, Gain de productivité, Diminution des erreurs et risques.
- Champ absent de l'écran d'une activité de type RUN.

---
Item Type: US · Parent: F18.16 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.12 Activité — champs Informations générales
Dépendances: —
