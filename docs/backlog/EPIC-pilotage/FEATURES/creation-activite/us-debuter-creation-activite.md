# US18.15.1 — Débuter la création d'une nouvelle activité

**En tant que** chef de projet
**Je veux** lancer la création d'une nouvelle activité en choisissant son type puis en renseignant les onglets de saisie
**Afin de** initialiser une activité pilotable dans le module

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given la liste des activités, when je clique sur « + Nouvelle activité », then je choisis entre 4 types (BUILD, RUN, GROUPEMENT, TRANSVERSE), chacun accompagné de sa description | ⬜ |
| Given un type choisi, when l'écran de création s'ouvre, then il présente 5 onglets (Informations générales, Informations structurelles, Budget, Jalons [sauf RUN], Risques) et les onglets Budget/Jalons/Risques sont grisés pendant la création | ⬜ |
| Given l'onglet Informations générales, when tous ses champs obligatoires sont remplis, then le bouton « Suivant » s'active, puis « Enregistrer » s'active une fois les champs obligatoires de « Informations structurelles » remplis | ⬜ |
| Given la validation en cours, when l'enregistrement est lancé, then une pop-up bloquante s'affiche pendant la création ; en cas de succès j'arrive sur l'activité créée | ⬜ |
| Given des informations contribuées, when je clique sur le bouton Retour pour annuler, then une pop-up de confirmation s'affiche avant d'abandonner la création | ⬜ |
| Error : given un échec de création, system affiche un message d'échec et n'ouvre pas l'activité | ⬜ |
| Security/Gouvernance : seul un chef de projet peut créer une activité ; les champs proposés dépendent du type d'activité sélectionné | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le détail des règles de nommage (unicité, espaces) est couvert par l'US Règle de nommage.
- La saisie détaillée des onglets Budget, Jalons et Risques est couverte par leurs features dédiées.

## Notes d'implémentation
- Module pilotage (OPDN), écran de création d'activité à 5 onglets, bouton « + Nouvelle activité ».
- L'onglet Jalons est absent pour le type RUN ; les champs de saisie varient selon le type d'activité.
- Activation en cascade des boutons « Suivant » puis « Enregistrer » selon les champs obligatoires renseignés ; pop-up bloquante pendant la création.

---
Item Type: US · Parent: F18.15 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.11 Création d'une activité
Dépendances: —
