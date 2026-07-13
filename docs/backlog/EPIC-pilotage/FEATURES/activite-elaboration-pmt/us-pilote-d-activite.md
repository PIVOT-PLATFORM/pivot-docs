# US18.17.7 — Pilote d'activité

**En tant que** chef de projet
**Je veux** désigner le pilote d'activité en recherchant une personne dans l'annuaire EDF
**Afin de** rattacher l'activité à son responsable identifié sans ambiguïté

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ « Pilote d'activité », when l'écran s'ouvre, then aucune personne n'est sélectionnée par défaut | ⬜ |
| Given le champ « Pilote d'activité », when je recherche une personne, then la recherche interroge l'annuaire EDF et affiche le mail et le NNI pour éviter les homonymes | ⬜ |
| Given le résultat de recherche, when je sélectionne une personne, then une seule personne est retenue (mono-sélection) | ⬜ |
| Error : given aucune personne sélectionnée à l'enregistrement (MVP), system autorise l'enregistrement car le champ est facultatif | ⬜ |
| Security/Gouvernance : la recherche annuaire EDF respecte les habilitations d'accès aux données personnelles (mail, NNI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'intégration technique détaillée à l'annuaire EDF est couverte par un enabler dédié.

## Notes d'implémentation
- Module pilotage (OPDN), écran Élaboration PMT — informations structurelles, champ facultatif (MVP), mono-sélection.
- Recherche annuaire EDF avec affichage mail + NNI ; pas de sélection par défaut.

---
Item Type: US · Parent: F18.17 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.13 Activité — champs Élaboration PMT (informations structurelles)
Dépendances: —
