# US21.1.1 — Questionnaire de cadrage

**En tant que** Chef de projet, PMO
**Je veux** répondre à un questionnaire de cadrage (10-15 questions : typologie, criticité, données perso, IA, souveraineté, méthode, dépendance fournisseur, cadre réglementaire)
**Afin de** adapter l'analyse de risque à la nature du projet

## Contexte

Formulaire de profil projet (10-15 questions : typologie, criticité, données perso, IA, souveraineté, méthode, dépendance fournisseur, cadre réglementaire).

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet sans profil de risque, when le Chef de projet répond aux 10-15 questions du questionnaire, then un profil de projet est créé, stocké et modifiable ultérieurement | ⬜ |
| Given un profil déjà répondu, when le Chef de projet ou le PMO modifie une réponse, then le profil est mis à jour et l'historique de la modification est conservé | ⬜ |
| Error : given une réponse obligatoire manquante, system bloque la soumission et retourne la liste des champs requis non renseignés | ⬜ |
| Security : seuls le Chef de projet du projet concerné, le PMO et l'admin peuvent créer ou modifier le profil ; les réponses portant sur données personnelles, IA ou souveraineté sont traitées comme sensibles (accès restreint, pas d'exposition dans les exports non autorisés) | ⬜ |
| A11y : le formulaire de questionnaire (labels, messages d'erreur, navigation clavier) respecte WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le calcul du poids d'impact par typologie (matrice de pondération, US21.1.4) et la suggestion de risques types (US21.1.5) ne sont pas couverts ici — cette US ne fait que collecter et stocker les réponses au questionnaire.
- Pas de refonte dynamique des questions par IA (cf. F21.7 — IA gouvernée) : le questionnaire est un formulaire structuré fixe pour ce lot.

## Notes d'implémentation
- Les réponses alimentent l'entité `RiskProfile` (cf. EN21.1 — schéma Flyway `risk`), rattachée au projet via `project_ref` (bus PIVOT, pas de FK inter-modules — ADR-006).
- Les questions portant sur données personnelles / IA / souveraineté doivent être signalées comme sensibles dans le modèle de données pour permettre un traitement RGPD différencié en aval.
- Le profil doit être versionnable pour permettre la traçabilité des modifications (qui a modifié, quand, quelle réponse).

---
Item Type: US · Parent: F21.1 · Module: risk · Phase: phase-3 · Size: M · Priority: Critical
Stage: ⬜
Dépendances: —
