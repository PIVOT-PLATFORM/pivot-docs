# US22.7.8 — Interop outils PM open source

**En tant que** chef de projet
**Je veux** importer/exporter avec GanttProject (.gan), ProjectLibre, OpenProject, TaskJuggler et GNOME Planner (.planner)
**Afin de** garantir la portabilité avec l'écosystème libre (anti lock-in)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un fichier GanttProject .gan ou GNOME Planner .planner, when je l'importe, then tâches, dépendances et ressources sont restitués | ⬜ |
| Given un plan, when je l'exporte vers OpenProject / TaskJuggler, then il reste exploitable dans ces outils | ⬜ |
| Error : given un fichier .gan/.planner corrompu, un format XML invalide ou une version de schéma non supportée par l'outil source, when je tente l'import, then l'import est rejeté avec un message précis et aucune donnée partielle n'est créée | ⬜ |
| Security : le fichier importé est validé/assaini avant traitement (parsing XML sans résolution d'entités externes pour prévenir le XXE, limite de taille) ; import réservé aux rôles disposant du droit d'écriture sur le Projet cible | ⬜ |

## Hors périmètre
- Import depuis OpenProject/TaskJuggler (l'US ne couvre que l'export vers ces deux outils, l'import ne concerne que GanttProject .gan et GNOME Planner .planner)
- Synchronisation continue avec ces outils open source (chaque import/export est un instantané ponctuel, pas un lien vivant)
- Garantie de parité fonctionnelle complète avec chaque outil (ex. spécificités TaskJuggler comme les shifts avancés) — seuls tâches/dépendances/ressources du modèle temporel unique sont garantis

## Notes d'implémentation
- `.gan` (GanttProject) et `.planner` (GNOME Planner) sont des formats XML documentés et relativement simples comparés à MSPDI/P6 — un parseur dédié par format est envisageable sans librairie tierce lourde
- L'export vers OpenProject se fait via son format d'échange (XML/JSON selon version) ou son API REST si plus fiable ; l'export TaskJuggler génère un fichier `.tjp` texte
- Mapping cible le modèle temporel unique EN22.1, dans la même logique que US22.7.1/US22.7.4

---
Item Type: US · Parent: F22.7 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Medium
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Interopérabilité / interfaces inter-modules & SI (ADR-010, bus PIVOT + deep-links ADR-006/008)
Dépendances: EN22.1 (modèle temporel unique)
