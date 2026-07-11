# US33.1.2 — Continuum tâches-projets

**En tant que** contributeur terrain
**Je veux** relier les tâches du quotidien (individuelles, d'équipe) aux projets du portefeuille
**Afin d'** assurer la capillarité terrain qui décide du succès de l'alimentation du pilotage

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une tâche du quotidien, when un contributeur la relie à un projet, then l'avancement de la tâche remonte au projet du portefeuille | ⬜ |
| Les tâches individuelles et d'équipe sont rattachables aux projets | ⬜ |
| Error : given une tâche rattachée à un projet clôturé, system refuse ou avertit | ⬜ |
| Security/Gouvernance : le rattachement respecte les périmètres de visibilité par rôle | ⬜ |

## Hors périmètre
- Le calcul détaillé de l'avancement du projet à partir de l'agrégation des tâches (pondération, règles de calcul) n'est pas traité ici — seule la remontée de l'avancement de la tâche rattachée est couverte
- La création ou la gestion des projets du portefeuille eux-mêmes reste hors périmètre (dépend des US de pilotage de portefeuille existantes)
- Le rattachement en masse (bulk) de plusieurs tâches à un projet en une seule opération n'est pas couvert

## Notes d'implémentation
- Le rattachement crée une FK entre la tâche (module pilotage) et le projet du portefeuille (`public.teams.id` ou équivalent projet), sans double saisie côté contributeur
- La vérification du statut du projet (clôturé ou non) et des périmètres de visibilité par rôle doit se faire côté backend (`pivot-pilotage-core`) au moment du rattachement, pas uniquement côté UI
- L'US est taillée XL : prévoir un découpage technique (ex. modèle de données du rattachement, API de rattachement, remontée d'avancement) si la mise en œuvre dépasse une itération

---
Item Type: US · Parent: F33.1 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: High
Stage: ⬜
Rôle: utilisateur-final
Source: PP-025 · MoSCoW: Should · Lot: Lot 2 · Origine: MS généralisé + Insight I6
Profils: Tous
Justification: Dossier §8-I6 : l'alimentation terrain décide du succès
Dépendances: US33.1.4 (entité tâche du quotidien à rattacher au projet)
