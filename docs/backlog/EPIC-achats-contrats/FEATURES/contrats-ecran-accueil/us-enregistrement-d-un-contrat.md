# US25.5.2 — Enregistrement d'un contrat

**En tant que** contract manager
**Je veux** enregistrer un contrat une fois tous les champs obligatoires remplis
**Afin de** rendre le contrat disponible sans possibilité de brouillon incomplet

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un formulaire de contrat dont tous les champs obligatoires sont remplis, when je consulte la barre d'actions, then le bouton « Enregistrer » est disponible (actif) | ⬜ |
| Given un formulaire dont au moins un champ obligatoire est vide, when je consulte la barre d'actions, then le bouton « Enregistrer » reste indisponible (inactif) | ⬜ |
| Error : given un contrat incomplet, system n'autorise pas l'enregistrement en brouillon — un contrat ne peut pas être enregistré comme brouillon | ⬜ |
| Security/Gouvernance : seuls les contract managers (CM) et les administrateurs (A) peuvent enregistrer un contrat, aux niveaux sur lesquels ils ont les droits (NON/NON/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La saisie des champs et l'auto-enregistrement de la saisie en cours sont couverts par l'US Création d'un contrat.

## Notes d'implémentation
- Écran d'accueil des contrats (module OPDN, B.5), bouton « Enregistrer ».
- Le bouton « Enregistrer » n'est activé que lorsque tous les champs obligatoires sont renseignés.
- Pas de statut « brouillon » : l'enregistrement exige un contrat complet.

---
Item Type: US · Parent: F25.5 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: contract-manager
Source: SPEC_OPDN — B.5 Contrats — écran d'accueil
Dépendances: —
