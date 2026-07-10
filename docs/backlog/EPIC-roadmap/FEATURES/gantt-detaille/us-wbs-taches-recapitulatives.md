# US22.4.1 — WBS : tâches & tâches récapitulatives

> ⚠️ **Décomposée (2026-07-10)** en US22.4.1a, US22.4.1b, US22.4.1c — voir les fiches enfants ; cette US/enabler ne porte plus d'ACs propres (hors score Gate 1).

**En tant que** chef de projet
**Je veux** structurer le projet en arborescence (WBS) avec hiérarchisation (indent/outdent), tâches récapitulatives et numérotation WBS
**Afin de** organiser le travail comme dans MS Project

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une liste de tâches, when j'abaisse/relève le niveau (indent/outdent), then la hiérarchie WBS et la numérotation se recalculent | ⬜ |
| Given une tâche récapitulative, when ses sous-tâches changent, then ses dates/durée/avancement s'agrègent automatiquement | ⬜ |
| Given une tâche, when je la réordonne, then l'ordre et le WBS restent cohérents | ⬜ |
| Error : given une tentative d'indent sur la première tâche du plan (aucun parent possible) ou d'outdent au-delà du niveau racine, then l'action est refusée avec un message explicite et la hiérarchie n'est pas modifiée | ⬜ |
| Security : seul un utilisateur ayant un rôle d'édition sur le projet (chef de projet / contributeur planning) peut modifier la hiérarchie WBS ; un rôle lecture seule ne voit pas les contrôles indent/outdent | ⬜ |
| A11y : les actions indent/outdent et la structure arborescente (niveaux, parent/enfant) sont opérables au clavier et exposées via ARIA (`aria-level`, `role="treeitem"`) pour les lecteurs d'écran | ⬜ |

## Hors périmètre
- La planification automatique des dates (durée, effort, dépendances) : couverte par US22.4.2 et US22.4.3
- Le chemin critique et les marges sur les tâches récapitulatives : couverts par US22.4.7
- L'import/export d'une structure WBS depuis/vers MS Project : couvert par F22.7

## Notes d'implémentation
- La numérotation WBS (ex. `1.2.3`) doit être recalculée côté serveur (moteur d'ordonnancement EN22.1) pour rester cohérente en co-édition temps réel, pas seulement côté client
- Une tâche récapitulative n'est jamais éditable directement en dates/durée/avancement : ce sont des champs dérivés (agrégation des sous-tâches), à distinguer clairement en lecture seule dans l'UI
- Le graphe temporel étant partagé avec la Roadmap rapide (F22.3) via EN22.1, un changement de hiérarchie WBS ne doit pas casser la vue macro (pas de double stockage)

---
Item Type: US · Parent: F22.4 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: Critical
Stage: Decomposed
Rôle: chef-de-projet
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique)
