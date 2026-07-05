# US22.4.7 — Chemin critique, marges & fractionnement

**En tant que** chef de projet
**Je veux** visualiser le chemin critique, les marges (libre/totale) et fractionner une tâche (split)
**Afin de** prioriser et gérer les interruptions comme dans MS Project

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un planning, when j'active le chemin critique, then les tâches critiques (marge totale ≤ 0) sont mises en évidence | ⬜ |
| Given une tâche, when je consulte ses marges, then marge libre et marge totale sont affichées | ⬜ |
| Given une tâche interrompue, when je la fractionne, then elle apparaît en segments avec un creux | ⬜ |
| Error : given une tentative de fractionnement qui produirait un segment de durée nulle ou négative, then l'action est refusée avec un message explicite | ⬜ |
| Security : seul un utilisateur avec un rôle d'édition sur le projet peut fractionner une tâche ; le calcul du chemin critique et des marges reste accessible en lecture à tout utilisateur ayant accès au projet | ⬜ |
| A11y : les tâches critiques et les marges affichées dans le Gantt ne reposent pas uniquement sur la couleur (icône/motif + texte alternatif) et sont consultables via une vue tabulaire accessible au clavier | ⬜ |

## Hors périmètre
- Le nivellement des ressources sur les tâches critiques : couvert par US22.5.3
- La modification interactive du fractionnement à la souris (glisser un segment) : couverte par US22.4.10
- La comparaison du chemin critique entre plusieurs baselines : couverte par US22.4.9

## Notes d'implémentation
- Le calcul de marge libre/totale et du chemin critique (méthode CPM) doit être assuré par le moteur d'ordonnancement EN22.1, en recalcul incrémental (EN22.2) pour rester performant sur 10 000+ tâches
- Le fractionnement (split) d'une tâche doit être représenté comme une même tâche logique avec plusieurs segments temporels, pas comme des tâches distinctes, pour ne pas casser les dépendances et l'agrégation WBS (US22.4.1)
- Une tâche critique est définie par une marge totale ≤ 0 ; ce seuil doit être configurable si un profil (E40) le nécessite, sinon garder la valeur standard MS Project

---
Item Type: US · Parent: F22.4 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique)
