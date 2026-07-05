# US21.4.2 — Remontée des obstacles Scrum

**En tant que** Scrum Master
**Je veux** qu'un obstacle Daily non levé après 2 sprints consécutifs génère automatiquement un risque candidat
**Afin de** ne pas laisser un blocage récurrent passer sous le radar du pilotage des risques

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un obstacle remonté en Daily toujours ouvert à la clôture de 2 sprints consécutifs sur le même projet, when le second sprint est clôturé, then un risque candidat est créé à l'état « à qualifier » avec un lien vers l'obstacle d'origine | ⬜ |
| Given un risque candidat déjà créé pour un obstacle, when l'obstacle persiste sur un sprint supplémentaire, then aucun doublon de risque candidat n'est créé | ⬜ |
| Error : given un obstacle sans projet associé (`project_ref` manquant), system ne génère pas de risque candidat et journalise l'anomalie | ⬜ |
| Security : seul un utilisateur ayant le rôle Scrum Master ou Chef de projet sur le projet concerné peut qualifier ou rejeter le risque candidat généré | ⬜ |

## Hors périmètre
- La détection et la saisie de l'obstacle lui-même côté module Daily/Scrum — donnée en entrée, non modifiée ici.
- La qualification complète du risque candidat (probabilité, gravité, traitement) — relève du cycle de vie standard (F21.3).
- Le seuil « 2 sprints » n'est pas paramétrable dans cette US (valeur fixe documentée).

## Notes d'implémentation
- Consomme les événements du bus PIVOT via l'adaptateur EN21.3 ; dépend de US21.4.1 pour la mécanique de consommation.
- Le comptage « 2 sprints consécutifs » se base sur l'état de l'obstacle à chaque `sprint.closed` reçu pour le `project_ref` concerné — nécessite de conserver un compteur de persistance par obstacle.
- Le risque candidat créé doit référencer l'obstacle source (traçabilité) pour permettre l'audit et éviter les recréations en doublon.

---
Item Type: US · Parent: F21.4 · Module: risk · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Dépendances: US21.4.1
