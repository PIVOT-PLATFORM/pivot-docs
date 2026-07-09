# US21.4.1 — Consommation du bus PIVOT

**En tant que** Dev, PMO
**Je veux** que le module risque s'abonne aux événements `task.completed`, `budget.alert` et `sprint.closed` du bus PIVOT
**Afin de** maintenir le risque synchronisé avec le pilotage réel sans ressaisie manuelle

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un risque lié à un `project_ref`, when un événement `budget.alert` est publié sur ce projet, then l'indicateur d'exposition du risque concerné est recalculé et horodaté | ⬜ |
| Given un événement `sprint.closed` reçu, when le sprint clôturé contient des tâches en retard, then les risques de délai liés au projet sont réévalués | ⬜ |
| Error : given un événement reçu avec un `project_ref` inconnu du module risk, system journalise l'événement en `dead-letter` et ne lève pas d'exception bloquant le consumer | ⬜ |
| Security : le consumer bus vérifie la provenance et la signature de l'événement PIVOT ; un événement mal formé ou non signé est rejeté et journalisé sans effet sur les données | ⬜ |

## Hors périmètre
- L'émission d'événements par le module risque (`risk.raised`, etc.) — traitée par US21.4.4.
- La logique de qualification manuelle du risque par le chef de projet — inchangée, seul l'indicateur est recalculé automatiquement.
- La définition du schéma des événements consommés (`task.completed`, `budget.alert`, `sprint.closed`) — portée par les modules émetteurs (Delivery, Budget, Scrum).

## Notes d'implémentation
- S'appuie sur l'adaptateur bus PIVOT défini en EN21.3 (consumer `task.completed`, `budget.alert`, `sprint.closed`).
- Corrélation par `project_ref` uniquement — pas de FK inter-modules (cf. ADR-006).
- Le recalcul d'indicateur doit être idempotent : rejouer le même événement (replay bus) ne doit pas doubler l'effet.

---
Item Type: US · Parent: F21.4 · Module: risk · Phase: phase-3 · Size: L · Priority: Critical
Stage: ⬜
Dépendances: US21.1.6
