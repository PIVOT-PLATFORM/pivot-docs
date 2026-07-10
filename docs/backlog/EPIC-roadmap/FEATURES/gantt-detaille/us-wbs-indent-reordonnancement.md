# US22.4.1b — WBS : indent/outdent & réordonnancement

**En tant que** chef de projet
**Je veux** abaisser/relever le niveau d'une tâche (indent/outdent) et la réordonner dans le plan
**Afin de** organiser interactivement la hiérarchie de mon projet comme dans MS Project

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une liste de tâches, when j'abaisse le niveau d'une tâche (indent), then elle devient sous-tâche de la tâche précédente et le WBS (`EN22.1`, US22.4.1a) se recalcule | ⬜ |
| Given une sous-tâche, when je relève son niveau (outdent), then elle remonte d'un niveau dans la hiérarchie et le WBS se recalcule | ⬜ |
| Given une tâche, when je la réordonne (déplacement haut/bas parmi ses frères), then l'ordre et la numérotation WBS restent cohérents pour toutes les tâches impactées | ⬜ |
| Error : given une tentative d'indent sur la première tâche du plan (aucun parent possible) ou d'outdent d'une tâche déjà au niveau racine, then l'action est refusée avec un message explicite (`422 Unprocessable Entity`) et la hiérarchie n'est pas modifiée | ⬜ |
| Security : seul un utilisateur ayant un rôle d'édition sur le projet (chef de projet / contributeur planning) peut modifier la hiérarchie ; un rôle lecture seule reçoit `403 Forbidden` sur les endpoints indent/outdent/réordonnancement et ne voit pas les contrôles associés ; un non-membre ou un accès cross-tenant reçoit `404 Not Found` | ⬜ |
| A11y : les actions indent/outdent et réordonnancement sont opérables au clavier (raccourcis + commandes de menu), le focus reste sur la tâche déplacée et le nouveau niveau (`aria-level`) est annoncé après l'action | ⬜ |

## Hors périmètre
- Le modèle WBS et le recalcul serveur de la numérotation : posés par US22.4.1a (consommés ici)
- L'agrégation des champs dérivés des tâches récapitulatives : couverte par US22.4.1c
- La planification automatique des dates et des dépendances lors d'un déplacement : couverte par US22.4.2 et US22.4.3
- Le glisser-déposer à la souris dans la barre Gantt : couvert par US22.4.10 (interactions Gantt)

## Notes d'implémentation
- Chaque action indent/outdent/réordonnancement émet une mutation de structure consommée par `EN22.1`, qui **recalcule le WBS côté serveur** (US22.4.1a) et diffuse le résultat aux clients en co-édition.
- Les cas limites (indent sans parent possible, outdent au niveau racine) sont validés **côté serveur** avant application, jamais uniquement masqués côté client, pour rester robustes en accès API direct.
- L'accessibilité clavier doit couvrir a minima : Tab/flèches pour naviguer dans l'arbre, un raccourci pour indent et un pour outdent, et le déplacement haut/bas parmi les frères.

---
Item Type: US · Parent: F22.4 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Critical
Stage: ⬜
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique & moteur d'ordonnancement), US22.4.1a (modèle WBS & numérotation)
