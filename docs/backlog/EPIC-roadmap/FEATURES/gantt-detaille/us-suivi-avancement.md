# US22.4.8 — Suivi d'avancement (% réalisé, réel/restant)

**En tant que** chef de projet
**Je veux** saisir l'avancement (% réalisé, travail réel et restant, dates réelles) à une date d'état
**Afin de** suivre l'exécution et alimenter les écarts

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une tâche, when je saisis % réalisé, then la barre d'avancement et le travail restant se mettent à jour | ⬜ |
| Given une date d'état, when des tâches sont en retard, then une ligne de progression (progress line) les matérialise | ⬜ |
| Given un récapitulatif, when ses sous-tâches avancent, then son % réalisé s'agrège | ⬜ |
| Error : given une saisie de % réalisé hors de l'intervalle [0, 100] ou une date réelle de fin antérieure à la date réelle de début, then la saisie est rejetée avec un message explicite | ⬜ |
| Security : seul un utilisateur avec un rôle d'édition sur le projet (ou affecté à la tâche) peut saisir l'avancement ; l'historique des saisies est tracé (auteur, date) | ⬜ |
| Security : given une saisie/lecture d'avancement visant un projet d'un autre `tenant_id` (ou inexistant), then 404 sans divulgation ; given un membre du tenant ni éditeur ni affecté à la tâche, then 403 | ⬜ |
| A11y : la barre d'avancement et la ligne de progression (progress line) exposent leur valeur en texte (pourcentage, retard) accessible aux lecteurs d'écran, pas uniquement via un remplissage visuel | ⬜ |

## Hors périmètre
- La comparaison de l'avancement avec une baseline figée (écarts planifié vs réel) : couverte par US22.4.9
- Le calcul automatique de l'avancement à partir de pointage de temps externe : hors périmètre (saisie manuelle uniquement dans cette US)
- L'agrégation des coûts réels associés à l'avancement : couverte par US22.5.4

## Notes d'implémentation
- La date d'état (status date) est une propriété du projet utilisée pour positionner la ligne de progression ; elle doit être distincte de la date du jour système
- L'agrégation du % réalisé d'une tâche récapitulative doit être pondérée par la durée (ou le travail) des sous-tâches, cohérent avec la logique d'agrégation déjà définie pour dates/durée en US22.4.1
- Le recalcul du travail restant (remaining work) à partir du % réalisé et du travail réel doit suivre la même formule que MS Project (travail restant = travail total − travail réel) pour rester en parité

---
Item Type: US · Parent: F22.4 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique)
