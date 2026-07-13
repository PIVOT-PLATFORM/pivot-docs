# US25.5.1 — Création d'un contrat

**En tant que** contract manager
**Je veux** créer un contrat via le bouton « + nouveau contrat » en renseignant les champs obligatoires
**Afin de** disposer d'un contrat de référence utilisable dans les demandes d'achat

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'écran d'accueil des contrats, when je clique sur « + nouveau contrat », then le formulaire de création s'ouvre avec les champs obligatoires marqués d'une étoile rouge (Num Contrat, Fournisseur, Date début, Date fin, Résumé du contrat) | ⬜ |
| Given un formulaire de création en cours, when je quitte l'écran sans enregistrer, then la saisie est auto-enregistrée et restaurée à mon retour | ⬜ |
| Error : given un champ obligatoire non renseigné (Num Contrat, Fournisseur, Date début, Date fin ou Résumé du contrat), system signale le champ manquant par l'étoile rouge et bloque l'enregistrement | ⬜ |
| Security/Gouvernance : seuls les contract managers (CM) et les administrateurs (A) peuvent créer un contrat, et uniquement aux niveaux direction/division/unité sur lesquels ils ont les droits ; ni le prescripteur (P) ni le vérificateur (V) ne peuvent créer un contrat (NON/NON/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'enregistrement effectif du contrat (conditions de disponibilité du bouton « Enregistrer ») est couvert par l'US Enregistrement d'un contrat.
- La gestion des droits CM par niveau organisationnel est couverte par le module Administration.

## Notes d'implémentation
- Écran d'accueil des contrats (module OPDN, B.5), bouton « + nouveau contrat ».
- Champs obligatoires avec étoile rouge : Num Contrat, Fournisseur, Date début, Date fin, Résumé du contrat.
- Auto-enregistrement du brouillon de saisie à la sortie sans enregistrement, restauré au retour.

---
Item Type: US · Parent: F25.5 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: contract-manager
Source: SPEC_OPDN — B.5 Contrats — écran d'accueil
Dépendances: —
