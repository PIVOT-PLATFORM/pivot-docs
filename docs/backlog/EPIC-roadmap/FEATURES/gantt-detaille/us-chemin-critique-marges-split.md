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
| Security : given une requête (lecture du chemin critique ou fractionnement) visant un projet d'un autre `tenant_id` (ou inexistant), then 404 sans divulgation ; given un membre du tenant sans droit d'accès au projet, then 403 | ⬜ |
| A11y : les tâches critiques et les marges affichées dans le Gantt ne reposent pas uniquement sur la couleur (icône/motif + texte alternatif) et sont consultables via une vue tabulaire accessible au clavier | ⬜ |

## Hors périmètre
- Le nivellement des ressources sur les tâches critiques : couvert par US22.5.3
- La modification interactive du fractionnement à la souris (glisser un segment) : couverte par US22.4.10
- La comparaison du chemin critique entre plusieurs baselines : couverte par US22.4.9

## Notes d'implémentation
- Le calcul de marge libre/totale et du chemin critique (méthode CPM) doit être assuré par le moteur d'ordonnancement EN22.1, en recalcul incrémental (EN22.2) pour rester performant sur 10 000+ tâches
- Le fractionnement (split) d'une tâche doit être représenté comme une même tâche logique avec plusieurs segments temporels, pas comme des tâches distinctes, pour ne pas casser les dépendances et l'agrégation WBS (US22.4.1)
- Une tâche critique est définie par une marge totale ≤ 0 ; ce seuil correspond au `is_critical` dérivé du moteur (`totalFloat ≤ ε`, ε=0 par défaut, cf. contrat figé EN22.1 §b) — la lecture reflète les champs dérivés `is_critical`/`free_slack_minutes`/`total_slack_minutes` (écriture refusée 422). Rendre ε configurable via profil (E40) si nécessaire, sinon garder la valeur standard MS Project
- **Décision à trancher (mainteneur)** : le fractionnement (split) n'a PAS de représentation dans le contrat figé EN22.1 (§a `pilotage.task` ne porte ni segments ni interruption). Deux options ⇒ (1) ajouter un porteur de segments (nouvelle table `task_split_segment` ou champ JSONB) via un avenant au contrat, ou (2) sortir le split de cette US et le traiter dans un enabler dédié. Tant que ce point n'est pas tranché, les ACs « fractionnement » ne peuvent pas encore s'appuyer sur le schéma actuel

---
Item Type: US · Parent: F22.4 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique)
