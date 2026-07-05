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

---
Item Type: US · Parent: F38.15 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: SMI — événements internes d'innovation, parcours orchestré (Workflow E29), dépôt d'idée par formulaire (Forms)
Dépendances: EN38.1 · E42 Pivot Forms · US38.2.2
