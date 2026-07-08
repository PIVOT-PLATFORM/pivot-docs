# US52.2.1 — Idéation & auto-évaluation du risque

**En tant que** Citizen Developer (rôle étendu du référentiel [EN49.2](../../../EPIC-organisation-gouvernance-dsi/ENABLERS/en-modele-roles-raci.md))
**Je veux** déclarer mon intention de créer une application citoyenne et réaliser une auto-évaluation guidée de son niveau de risque (vert/orange/rouge)
**Afin de** entrer dans le cycle de vie citizen dev dès l'idéation, sans court-circuiter la gouvernance ni ralentir l'initiative métier

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un Citizen Developer, when il déclare une intention d'application, then un formulaire d'auto-évaluation guidée lui est proposé (usage individuel vs partagé, données non sensibles vs sensibles/critiques, portée équipe/BU/externe) | ⬜ |
| Given les réponses à l'auto-évaluation, when elles sont soumises, then le système calcule et affiche automatiquement le niveau de risque (vert : usage individuel, données non sensibles, pas de partage · orange : partage équipe, automatisation d'un process métier · rouge : données sensibles/critiques, échelle BU, exposition externe) | ⬜ |
| Given une application classée, when l'idéation est validée, then l'entrée est créée dans le registre transverse (US52.1.1) avec statut de cycle de vie « Idéation » et le niveau de risque déclaré | ⬜ |
| Error : given une auto-évaluation incomplète, system bloque la soumission et signale les champs manquants | ⬜ |
| Security : le niveau de risque déclaré ne peut pas être modifié unilatéralement après validation — toute révision passe par une nouvelle auto-évaluation tracée | ⬜ |
| A11y : le formulaire d'auto-évaluation est utilisable au clavier, erreurs annoncées par lecteur d'écran, contraste conforme WCAG 2.1 AA | ⬜ |

## Hors périmètre

- La validation formelle avant mise en production, proportionnée au risque déclaré ici — couverte par US52.2.2.
- Le calcul automatique du risque à partir de données techniques (ex. scan de connecteurs utilisés) — l'auto-évaluation à l'idéation reste déclarative dans ce périmètre.

## Notes d'implémentation

Questionnaire structuré mappé sur les 3 déclencheurs du tableau de gouvernance par les risques du
benchmark (portée d'usage, sensibilité des données, échelle/exposition). Résultat stocké sur
l'entité `CitizenApp` (US52.1.1) : `risk_level`, `risk_declared_at`, `risk_declared_by`.

---
Item Type: US · Parent: F52.2 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Dépendances: US52.1.1 (registre transverse) · EN49.2 (rôle Citizen Developer)
