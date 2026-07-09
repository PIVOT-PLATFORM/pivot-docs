# US22.1.3 — Gérer les jalons et dépendances entre projets

**En tant que** responsable pilotage
**Je veux** définir des jalons et des dépendances entre projets
**Afin de** modéliser le chemin critique de mon portefeuille

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet, when je crée un jalon (nom, date, type LIVRAISON/REVUE/GO_LIVE) via `POST .../projects/{id}/milestones`, then le jalon est créé et visible sur la vue Gantt | ⬜ |
| Given deux projets, when je crée une dépendance (sourceId → targetId, type FINISH_TO_START) via `POST .../projects/{id}/dependencies`, then une flèche de dépendance relie les deux barres projet dans le Gantt | ⬜ |
| Error : given une dépendance qui créerait un cycle (A→B→C→A), when je la soumets, then l'API retourne 409 Conflict et aucune dépendance n'est créée | ⬜ |
| Error : given un jalon avec une date invalide ou un type hors énumération, when je le soumets, then l'API retourne 400 Bad Request | ⬜ |
| Security : seul un utilisateur ayant un rôle de gestion sur le portefeuille (ex. responsable pilotage) peut créer/modifier/supprimer un jalon ou une dépendance ; lecture seule pour les autres rôles du domaine `pilotage` | ⬜ |
| A11y : les flèches de dépendances et jalons de la vue Gantt sont perceptibles sans dépendre uniquement de la couleur (forme/label) et navigables au clavier (WCAG 2.1 AA) | ⬜ |

## Hors périmètre

- Le calcul et l'affichage du chemin critique (marges, chemin le plus long) — couvert par US22.2.2 / US22.4.7.
- Les dépendances typées SS/FF/SF avec retard/avance — cette US ne couvre que FINISH_TO_START ; le typage complet est couvert par US22.4.3.
- Le nivellement automatique des ressources en cas de conflit de dépendances — couvert par US22.5.3.

## Notes d'implémentation

- Repose sur le modèle temporel unique EN22.1 : jalon et dépendance sont des objets du graphe `Projet → Phase → Tâche → Jalon → Dépendance`, partagés entre roadmap rapide et Gantt (pas de double stockage).
- Détection de cycle : parcours du graphe de dépendances (DFS) à la création/modification, avant écriture en base — nécessaire pour renvoyer un 409 sans corrompre l'état.
- Dépend de US22.1.2 (vue Gantt) pour l'affichage des flèches de dépendances.
- Schéma Flyway `pilotage` (EN18.1), guard de domaine EN18.2.

---
Item Type: US · Parent: F22.1 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Medium
Stage: ⬜
Dépendances: US22.1.2
