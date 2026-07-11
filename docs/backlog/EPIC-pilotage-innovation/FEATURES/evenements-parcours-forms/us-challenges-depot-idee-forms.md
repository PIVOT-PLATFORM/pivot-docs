# US38.15.3 — Challenges & dépôt d'idée par formulaire (Forms)

**En tant que** responsable innovation
**Je veux** organiser des **challenges d'innovation** dont le **dépôt d'idée** se fait via un **formulaire configurable** (E42 Pivot Forms), avec des **champs additionnels** propres au challenge
**Afin de** cadrer la collecte d'idées d'un challenge sans développement, tout en réutilisant l'entité idée

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un challenge, when je le crée, then je lui associe un **formulaire de dépôt** (E42 Pivot Forms) avec champs spécifiques (contexte, contrainte, critères) | ⬜ |
| Given une soumission via le formulaire, when elle est validée, then elle crée/enrichit une **idée** (entité Idea existante) rattachée au challenge — pas de doublon de modèle | ⬜ |
| Given un challenge clôturé, when il se termine, then ses idées passent en évaluation (F38.4) et entonnoir (F38.3) | ⬜ |
| Étend les campagnes/défis (US38.2.2) par l'intégration Forms | ⬜ |
| Error : given une soumission de formulaire dont les champs obligatoires du challenge sont manquants ou invalides, when elle est envoyée, then la création/enrichissement de l'idée est refusé et l'erreur de validation est renvoyée au soumissionnaire | ⬜ |
| Security : seul le responsable innovation (ou rôle habilité) peut créer/modifier un challenge et son formulaire associé ; une soumission ne peut modifier que l'idée qu'elle a créée, pas les idées d'autrui | ⬜ |
| A11y : le formulaire de dépôt (hérité de Pivot Forms) respecte WCAG 2.1 AA (labels associés, messages d'erreur annoncés, navigation clavier) | ⬜ |

## Hors périmètre
- Le form-builder lui-même (création/édition de champs de formulaire) : fourni par E42 Pivot Forms, cette US ne fait que le consommer pour le dépôt d'idée
- La logique d'évaluation et d'entonnoir des idées issues du challenge : déléguée à F38.4/F38.3, cette US se limite au dépôt et à la clôture
- La gestion complète du challenge (jury, équipes, prix) : couverte par US38.15.1 (organisation d'événements), cette US se concentre sur le dépôt via formulaire

## Notes d'implémentation
- Le formulaire de dépôt est créé/configuré via E42 Pivot Forms ; l'événement `form.submitted` déclenche la création/mise à jour de l'idée (bus PIVOT, pas de FK — ADR-006/008)
- Les champs additionnels du formulaire doivent être stockés via le schéma d'idée extensible (US38.15.4), sans dupliquer le modèle Idea de base
- Réutilise/étend US38.2.2 (campagnes/défis) : le challenge est un type de campagne avec dépôt structuré par formulaire

---
Item Type: US · Parent: F38.15 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Rôle: responsable-innovation
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: SMI — événements internes d'innovation, parcours orchestré (Workflow E29), dépôt d'idée par formulaire (Forms)
Dépendances: EN38.1 · E42 Pivot Forms · US38.2.2
