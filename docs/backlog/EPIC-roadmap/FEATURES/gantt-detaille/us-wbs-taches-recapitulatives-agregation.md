# US22.4.1c — WBS : agrégation des tâches récapitulatives & accessibilité

**En tant que** chef de projet
**Je veux** que les tâches récapitulatives agrègent automatiquement les dates, la durée et l'avancement de leurs sous-tâches, en lecture seule et accessibles
**Afin de** suivre l'état d'un lot de travail d'un coup d'œil, comme dans MS Project

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une tâche récapitulative, when ses sous-tâches changent (dates, durée ou avancement), then ses date de début (min), date de fin (max), durée et avancement pondéré s'agrègent automatiquement via `EN22.1` | ⬜ |
| Given une tâche récapitulative, when je consulte le plan, then ses champs agrégés sont présentés en lecture seule et visuellement distincts des tâches feuilles éditables | ⬜ |
| Given une sous-tâche déplacée sous un autre parent, when la hiérarchie change (US22.4.1b), then les agrégats de l'ancien et du nouveau parent récapitulatif sont recalculés | ⬜ |
| Error : given une tentative d'édition directe des champs dérivés (dates/durée/avancement) d'une tâche récapitulative, then l'action est refusée avec un statut `422 Unprocessable Entity` et un message expliquant que ces champs sont dérivés | ⬜ |
| Security : le recalcul des agrégats ne s'exécute que dans le périmètre du projet du membre ; un non-membre ou un accès cross-tenant reçoit `404 Not Found` et n'obtient aucune valeur agrégée d'un autre projet (isolation multi-tenant) | ⬜ |
| A11y : le caractère récapitulatif et le statut lecture seule d'une tâche sont exposés aux lecteurs d'écran (`aria-readonly="true"` + libellé de rôle), et l'avancement agrégé ne repose pas uniquement sur la couleur (texte + motif/icône) | ⬜ |

## Hors périmètre
- Le modèle WBS et la numérotation : posés par US22.4.1a
- Les actions d'indentation/désindentation et de réordonnancement : couvertes par US22.4.1b
- Le chemin critique et les marges sur les tâches récapitulatives : couverts par US22.4.7
- La planification automatique (durée, effort, dépendances) : couverte par US22.4.2 et US22.4.3

## Notes d'implémentation
- Une tâche récapitulative **n'est jamais éditable directement** en dates/durée/avancement : ce sont des champs **dérivés** (agrégation des sous-tâches), à distinguer clairement en lecture seule dans l'UI et à refuser côté serveur.
- L'agrégation est assurée par le moteur d'ordonnancement `EN22.1` ; pour rester performante sur 10 000+ tâches, elle s'appuie sur le recalcul incrémental de `EN22.2` (ne recalculer que la branche impactée, pas tout le plan).
- L'avancement d'une tâche récapitulative est un **avancement pondéré** (par durée ou effort des sous-tâches selon le paramétrage), pas une simple moyenne arithmétique — le mode de pondération suit la valeur standard MS Project sauf profil (E40) le nécessitant.
- Aucun double stockage : les agrégats sont projetés depuis le modèle temporel unique partagé avec la Roadmap rapide (F22.3).

---
Item Type: US · Parent: F22.4 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Critical
Stage: ⬜
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique & moteur d'ordonnancement), EN22.2 (recalcul incrémental & performance), US22.4.1a (modèle WBS & numérotation), US22.4.1b (indent/outdent & réordonnancement)
