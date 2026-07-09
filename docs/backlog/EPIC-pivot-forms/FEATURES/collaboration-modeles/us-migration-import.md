# US42.9.3 — Migration / import

**En tant que** concepteur de formulaire
**Je veux** importer un formulaire existant (structure et, si possible, réponses) depuis un outil tiers (Typeform, Jotform, Google Forms…)
**Afin de** migrer vers Forms sans reconstruire mes formulaires depuis zéro

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un fichier d'export d'un outil tiers supporté, when je l'importe, then les champs et leur structure sont recréés dans Forms, avec un rapport listant ce qui n'a pas pu être mappé automatiquement | ⬜ |
| Given un import de réponses associées, when il est demandé en plus de la structure, then les réponses sont rattachées au formulaire importé sans mélange avec un autre formulaire existant | ⬜ |
| Error : given un fichier d'export corrompu ou d'un format non supporté, when l'import est tenté, then il échoue proprement avec un message explicite plutôt que de créer un formulaire partiel silencieusement incomplet | ⬜ |
| Security : les données importées suivent immédiatement les mêmes règles de classification et de RBAC que tout autre formulaire (US42.7.1) — pas de formulaire « hors gouvernance » le temps de la migration | ⬜ |

## Hors périmètre

- Synchronisation continue avec l'outil source après import (import ponctuel, pas de connecteur bidirectionnel permanent) — hors périmètre
- Import de la logique conditionnelle avancée d'un outil tiers si elle n'a pas d'équivalent dans le modèle Forms — signalé comme non mappé, pas reconstruit à l'identique

## Notes d'implémentation

- S'appuie autant que possible sur le format d'échange ouvert (US42.11.1) pour les outils qui l'exposent ; pour les autres, des convertisseurs dédiés par outil source

---
Item Type: US · Parent: F42.9 · Module: forms · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Source: FRM-903 · MoSCoW: Could · Origine: Jotform, Tally (import 1-clic)
Justification: Benchmark formulaires (Typeform/Jotform/Tally/Formbricks/Qualtrics/Google) — recentré PIVOT
Dépendances: EN42.1 (moteur & schéma de formulaire)
