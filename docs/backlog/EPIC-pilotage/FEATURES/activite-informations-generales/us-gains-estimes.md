# US18.16.7 — Gains estimés (k€)

**En tant que** chef de projet (pilote d'activité)
**Je veux** saisir les gains estimés de l'activité dans un champ numérique en k€
**Afin de** quantifier la valeur attendue du projet

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ Gains estimés (k€), when je saisis un montant, then je peux entrer au maximum 7 chiffres (hors séparateur décimal), avec 1 seul caractère après le point décimal, le séparateur décimal étant le point | ⬜ |
| Given un montant valide saisi, when j'enregistre, then le montant en k€ est associé à l'activité | ⬜ |
| Given une activité de type RUN, when j'affiche son écran Informations générales, then le champ Gains estimés (k€) est absent | ⬜ |
| Error : given le champ Gains estimés vide à l'enregistrement (activité non RUN), then le système bloque (champ obligatoire) et le bouton Enregistrer/Suivant reste grisé | ⬜ |
| Error : given une saisie dépassant 7 chiffres ou avec plus d'un chiffre après le point, when je saisis, then le système empêche ou rejette la saisie non conforme | ⬜ |
| Security/Gouvernance : seul le chef de projet pilote de l'activité (ou un administrateur habilité) peut modifier les gains estimés | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Les calculs de ROI ou de consolidation budgétaire à partir des gains ne sont pas couverts ici.
- L'enregistrement global de l'écran est couvert par l'US Enregistrer informations générales.

## Notes d'implémentation
- Écran Activité — Informations générales (module pilotage), champ numérique obligatoire en k€.
- Règles : max 7 chiffres hors séparateur, 1 caractère après le point, séparateur décimal = point.
- Champ absent de l'écran d'une activité de type RUN.

---
Item Type: US · Parent: F18.16 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.12 Activité — champs Informations générales
Dépendances: —
