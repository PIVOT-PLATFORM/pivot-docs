# US21.4.3 — Actions → tâches delivery

**En tant que** Chef de projet, Dev
**Je veux** qu'une action de mitigation arrivant à échéance émette un événement `risk.mitigation.due` transformable en tâche dans l'outil de delivery (Plane/OpenProject)
**Afin de** que le traitement du risque se traduise en travail réellement planifié et suivi par l'équipe

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une action de mitigation avec une échéance arrivant à J, when l'échéance est atteinte, then l'événement `risk.mitigation.due` est publié sur le bus avec les métadonnées de l'action (titre, échéance, responsable, risque source) | ⬜ |
| Given un adaptateur delivery configuré (Plane ou OpenProject) qui consomme `risk.mitigation.due`, when l'événement est reçu, then une tâche est créée dans l'outil de delivery avec un lien retour vers l'action de mitigation | ⬜ |
| Error : given aucun adaptateur delivery configuré pour le projet, system publie tout de même l'événement `risk.mitigation.due` (best effort) sans bloquer le traitement du risque, et signale l'absence de projection dans l'UI risque | ⬜ |
| Security : la création de tâche dans l'outil delivery est effectuée par un compte de service dédié ; l'action de mitigation ne peut être poussée que si son responsable existe et est actif sur le projet | ⬜ |

## Hors périmètre
- L'implémentation des adaptateurs Plane/OpenProject eux-mêmes — ceux-ci sont des consommateurs externes du bus, hors périmètre du module risque.
- La synchronisation retour de statut (tâche delivery terminée → mise à jour de l'action de mitigation) — non couverte ici.
- La création de l'action de mitigation elle-même (F21.3 — Plan d'action).

## Notes d'implémentation
- S'appuie sur l'émission d'événements normalisés définie en US21.4.4 et sur l'adaptateur bus PIVOT (EN21.3).
- Dépend de US21.3.3 (Plan d'action) pour l'existence de l'entité « action de mitigation » avec échéance et responsable.
- Le format de l'événement `risk.mitigation.due` doit rester stable (versionné) car il constitue un contrat consommé par des adaptateurs tiers hors du module risque.

---
Item Type: US · Parent: F21.4 · Module: risk · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Dépendances: US21.3.3, US21.4.1
