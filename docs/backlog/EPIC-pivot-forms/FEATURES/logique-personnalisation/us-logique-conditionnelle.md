# US42.2.1 — Logique conditionnelle

**En tant que** concepteur de formulaire
**Je veux** définir des règles d'affichage/masquage de champs, des branchements et des sauts de page selon les réponses précédentes
**Afin de** ne présenter à chaque répondant que les questions qui le concernent réellement

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une règle « si réponse X à la question A, alors afficher/masquer le champ B », when le répondant répond à A, then B apparaît ou disparaît immédiatement sans rechargement | ⬜ |
| Given un saut de page conditionnel configuré, when la condition est satisfaite, then le répondant est dirigé directement vers la page cible en sautant les pages non pertinentes | ⬜ |
| Error : given une règle référençant un champ supprimé entre-temps de l'éditeur, when le concepteur ouvre le formulaire, then la règle orpheline est signalée explicitement (jamais une erreur silencieuse en production) | ⬜ |
| Security : les réponses masquées par une condition non satisfaite ne sont ni affichées ni transmises côté client — la logique est également validée côté serveur à la soumission (pas de contournement en modifiant le DOM) | ⬜ |
| A11y : l'apparition/disparition d'un champ est annoncée aux technologies d'assistance (zone live ARIA), pas seulement un changement visuel | ⬜ |

## Hors périmètre

- Logique conditionnelle inter-formulaires (réponse d'un formulaire A conditionnant un formulaire B) — hors périmètre, chaque formulaire reste autonome
- Éditeur visuel de flux/diagramme de la logique (au-delà d'une liste de règles) — non couvert dans cette itération

## Notes d'implémentation

- Le moteur de logique conditionnelle est porté par EN42.1 ; cette US couvre son exposition dans l'éditeur, pas le moteur lui-même
- Rejouer la validation des conditions côté serveur est requis pour éviter qu'une réponse à un champ masqué soit acceptée par une requête API directe

---
Item Type: US · Parent: F42.2 · Module: forms · Phase: phase-3 · Size: L · Priority: Critical
Stage: Backlog
Source: FRM-101 · MoSCoW: Must · Origine: 5/6 (sauf Google avancé)
Justification: Benchmark formulaires (Typeform/Jotform/Tally/Formbricks/Qualtrics/Google) — recentré PIVOT
Dépendances: EN42.1 (moteur & schéma de formulaire)
