# US42.2.2 — Calculs et scoring (quiz)

**En tant que** concepteur de formulaire
**Je veux** définir des champs calculés et un barème de scoring (points par réponse, seuils de résultat)
**Afin de** produire un score et un verdict automatiques pour un quiz ou une évaluation

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un barème configuré (points par réponse, seuils de résultat), when le répondant termine le quiz, then un score et un résultat (ex. « réussi »/« à revoir ») s'affichent immédiatement après soumission | ⬜ |
| Given un champ calculé référençant d'autres champs numériques, when une valeur source change avant soumission, then le champ calculé se met à jour en temps réel | ⬜ |
| Error : given un barème incohérent (ex. seuils de résultat qui se chevauchent ou somme de points impossible à atteindre), when le concepteur tente de le publier, then l'éditeur bloque la publication et signale l'incohérence | ⬜ |
| Security : le calcul du score est rejoué et vérifié côté serveur à la soumission — un score envoyé depuis le client n'est jamais accepté tel quel | ⬜ |

## Hors périmètre

- Certification/diplôme délivré à l'issue du quiz — relève de la formation (E41, certification interne), pas de Forms
- Adaptation dynamique de la difficulté selon le score en cours (quiz adaptatif) — hors périmètre

## Notes d'implémentation

- Le moteur de calcul/scoring est porté par EN42.1 ; il doit être déterministe et rejouable côté serveur pour la vérification de sécurité ci-dessus

---
Item Type: US · Parent: F42.2 · Module: forms · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Source: FRM-102 · MoSCoW: Should · Origine: Typeform, Jotform, Google, Formbricks
Justification: Benchmark formulaires (Typeform/Jotform/Tally/Formbricks/Qualtrics/Google) — recentré PIVOT
Dépendances: EN42.1 (moteur & schéma de formulaire)
