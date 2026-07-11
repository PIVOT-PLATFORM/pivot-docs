# US22.4.1a — WBS : modèle arborescent & numérotation

**En tant que** chef de projet
**Je veux** que mes tâches soient structurées en arborescence (WBS) avec une numérotation hiérarchique (`1`, `1.1`, `1.2.3`) recalculée côté serveur
**Afin de** disposer d'une structure de découpage du projet stable et cohérente en co-édition, comme dans MS Project

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une liste de tâches rattachées à un projet, when je consulte le plan, then chaque tâche porte un code WBS hiérarchique (`1`, `1.1`, `1.2.3`) reflétant sa position dans l'arborescence | ⬜ |
| Given une tâche déplacée sous un nouveau parent, when la hiérarchie change, then le moteur d'ordonnancement (`EN22.1`) recalcule côté serveur les codes WBS de toutes les tâches impactées et les diffuse aux clients connectés | ⬜ |
| Given deux tâches de même niveau sous un même parent, when elles coexistent, then leurs codes WBS sont uniques et ordonnés selon leur rang parmi leurs frères | ⬜ |
| Error : given une requête créant un cycle dans la hiérarchie (une tâche référencée comme son propre ancêtre), then l'opération est refusée avec un statut `409 Conflict` et la structure existante n'est pas modifiée | ⬜ |
| Error : given une tentative d'écriture directe du champ dérivé `wbs_code` (PATCH/PUT positionnant explicitement le code WBS), then l'opération est refusée avec un statut `422 Unprocessable Entity` car le code WBS est calculé côté serveur et non éditable (`EN22.1`, contrat figé) | ⬜ |
| Security : un utilisateur non-membre du projet ou d'un autre tenant reçoit `404 Not Found` sur le plan WBS (isolation multi-tenant) ; le recalcul WBS n'expose aucune tâche hors du périmètre du projet demandé | ⬜ |
| A11y : la structure arborescente est exposée via `role="tree"`/`role="treeitem"` avec `aria-level`, `aria-setsize` et `aria-posinset`, et le code WBS de chaque tâche est annoncé aux lecteurs d'écran | ⬜ |

## Hors périmètre
- Les actions interactives d'indentation/désindentation et de réordonnancement : couvertes par US22.4.1b
- L'agrégation des dates/durée/avancement des tâches récapitulatives : couverte par US22.4.1c
- La planification automatique des dates et des dépendances : couverte par US22.4.2 et US22.4.3
- L'import/export d'une structure WBS depuis/vers MS Project : couvert par F22.7

## Notes d'implémentation
- La numérotation WBS (ex. `1.2.3`) est **recalculée côté serveur** par le moteur d'ordonnancement `EN22.1`, jamais dérivée uniquement côté client, pour rester cohérente en co-édition temps réel.
- Le WBS est une **propriété dérivée** de la position dans l'arborescence (parent + rang parmi les frères) : il n'est pas stocké comme champ éditable indépendant, afin d'éviter toute divergence lors des réorganisations.
- Le graphe temporel étant partagé avec la Roadmap rapide (F22.3) via `EN22.1`, la structure WBS ne fait pas l'objet d'un double stockage : elle est projetée depuis le même modèle temporel unique.
- Cette US pose le **modèle de données** (relation parent/enfant, rang, code WBS dérivé) consommé par US22.4.1b et US22.4.1c.

---
Item Type: US · Parent: F22.4 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Critical
Stage: ⬜
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique & moteur d'ordonnancement)
