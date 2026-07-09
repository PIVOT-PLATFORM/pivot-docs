# US21.3.4 — Plan de contingence

**En tant que** Chef de projet
**Je veux** documenter un plan de repli prêt à déclencher pour un risque toléré
**Afin de** traiter et suivre chaque risque jusqu'à sa clôture

## Contexte

Plan de repli prêt à déclencher pour les risques tolérés.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un risque doté de la stratégie `Tolérer`, when le Chef de projet documente un plan de contingence (déclencheur, actions de repli, responsable), then le plan est enregistré et associé au risque | ⬜ |
| Given un plan de contingence existant dont le déclencheur est atteint (risque passé au statut `survenu`), when le Chef de projet active le plan, then le plan passe en statut `déclenché` et l'activation est horodatée | ⬜ |
| Error : given une tentative d'enregistrement d'un plan de contingence sans condition de déclenchement définie, system rejette la requête avec un statut 400 | ⬜ |
| Security : seul le Chef de projet assigné au risque peut créer, modifier ou déclencher un plan de contingence ; le contenu du plan (actions de repli) peut inclure des informations sensibles (ex. clauses contractuelles de repli) et n'est visible qu'aux rôles autorisés sur le risque (Chef de projet, PMO) | ⬜ |

## Hors périmètre
- Le choix de la stratégie `Tolérer` qui rend un plan de contingence pertinent — cf. US21.3.2
- Les actions de mitigation préventives (plan d'action) visant à éviter d'atteindre le déclencheur — cf. US21.3.3
- La réévaluation périodique de la pertinence du plan de contingence lors des revues — cf. US21.3.5

## Notes d'implémentation
- Un plan de contingence est rattaché à un risque ayant la stratégie `Tolérer` (US21.3.2) ; il documente un déclencheur (condition observable) et une séquence d'actions de repli
- Le déclenchement du plan peut être manuel (Chef de projet) ou suggéré automatiquement lorsque le risque passe au statut `survenu` (US21.3.1), sans automatisation forcée de l'exécution
- Pas de composant UI complexe attendu au-delà d'un formulaire de documentation/déclenchement ; pas de critère A11y dédié au-delà des standards de formulaire déjà couverts par le design system partagé (`@pivot/ui-core`)

---
Item Type: US · Parent: F21.3 · Module: risk · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Dépendances: US21.3.2
