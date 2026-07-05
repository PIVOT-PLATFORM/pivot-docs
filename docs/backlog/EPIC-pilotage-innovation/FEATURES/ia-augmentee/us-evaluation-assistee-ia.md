# US38.11.3 — Évaluation & pré-tri assistés par IA

**En tant que** évaluateur
**Je veux** un **pré-tri et une pré-évaluation assistés par IA** (résumés, estimation valeur/effort/risque, détection de signaux faibles)
**Afin de** faire gagner du temps aux comités sans leur retirer la décision

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un lot d'idées, when le pré-tri IA s'exécute, then chaque idée reçoit un résumé et une **pré-note indicative** (révisable par l'humain) | ⬜ |
| Given la pré-évaluation, when un comité décide, then la décision humaine prime et l'écart avec l'IA est visible | ⬜ |
| Error : given une idée incomplète ou un lot vide, when le pré-tri IA s'exécute, then l'idée est signalée comme non évaluable (pas de pré-note fantaisiste) et n'est pas comptée dans les statistiques du comité | ⬜ |
| Security : **humain dans la boucle obligatoire** — aucune décision (go/kill/hold) n'est appliquée automatiquement ; pré-notes et résumés IA tracés (idée, modèle, horodatage) ; biais de notation surveillés (écart systématique IA/humain suivi dans le temps) | ⬜ |
| A11y : le tableau de pré-tri (résumé, pré-note, écart IA/humain) est navigable au clavier et correctement restitué par lecteur d'écran (en-têtes de colonnes associés) | ⬜ |

## Hors périmètre
- Notation finale automatique ou classement décisionnel des idées par l'IA (la décision reste au comité, cf. US38.4.1 — Scoring multicritère)
- Détection de biais discriminatoires avancée (algorithmes de fairness dédiés) — hors MVP de cette US, suivi qualitatif seulement
- Pré-tri sur des critères financiers/juridiques sensibles nécessitant une expertise humaine spécifique

## Notes d'implémentation
- S'appuie sur EN38.2 (moteur IA & graphe) pour la génération des résumés/pré-notes ; s'articule avec US38.4.1 (scoring multicritère humain) sans le remplacer
- L'écart IA/humain doit être persisté par idée pour permettre un suivi de dérive dans le temps (alimente la gouvernance US38.11.6)
- Le pré-tri doit rester désactivable par organisation (cohérent avec le flag d'activation de gouvernance IA)

---
Item Type: US · Parent: F38.11 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Medium
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: SMI — fonctionnalités innovantes (IA gouvernée, intelligence collective, corporate venturing)
Dépendances: EN38.1 · EN38.2 (moteur IA & graphe)
