# US18.2.1 — Créer une ligne budgétaire

**En tant que** contrôleur de gestion SI (responsable budgétaire)
**Je veux** créer une ligne budgétaire (utilisateur/prescripteur, pôle/usine en charge (CCS), produit, objet de gestion, contrat, nature, priorité, typologie...)
**Afin de** initialiser le suivi budgétaire d'une activité

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le formulaire de création de ligne budgétaire, when je le renseigne, then les champs Utilisateur/Prescripteur et Pôle/Usine en charge (CCS) sont obligatoires | ⬜ |
| Given le formulaire de création, when je le complète, then je peux renseigner produit, objet de gestion, contrat, nature, priorité et typologie | ⬜ |
| Given le formulaire de création/modification, when je le consulte, then les informations de montant et d'année ne sont plus saisies (champs supprimés) | ⬜ |
| Error : given Utilisateur/Prescripteur ou Pôle/Usine en charge (CCS) vide, system bloque la création et signale le champ obligatoire manquant | ⬜ |
| Security/Gouvernance : seul un contrôleur de gestion SI habilité peut créer une ligne budgétaire sur l'activité | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La saisie des montants et des années est traitée hors du formulaire de création/modification (champs supprimés ici).

## Notes d'implémentation
- Écran budgets de l'activité (module pilotage), formulaire de création de ligne.
- Champs obligatoires : Utilisateur/Prescripteur, Pôle/Usine en charge (CCS).

---
Item Type: US · Parent: F18.2 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: controleur-de-gestion-si
Source: Backlog OPPA (reconstitution v1–v2.1) — US-201
Dépendances: —
