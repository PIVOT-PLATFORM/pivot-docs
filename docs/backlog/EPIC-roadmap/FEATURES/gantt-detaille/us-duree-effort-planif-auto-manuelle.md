# US22.4.2 — Durées, effort, planification auto vs manuelle

**En tant que** chef de projet
**Je veux** saisir durée/effort et choisir par tâche la planification automatique (pilotée par le moteur) ou manuelle
**Afin de** garder le contrôle là où c'est nécessaire, comme MS Project

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une tâche en planification auto, when une dépendance ou un calendrier change, then ses dates se recalculent | ⬜ |
| Given une tâche en planification manuelle, when le moteur recalcule, then ses dates ne sont pas écrasées mais un écart est signalé | ⬜ |
| Given durée et effort, when les unités de ressource changent, then la relation travail = durée × unités est respectée | ⬜ |
| Error : given une durée ou un effort saisi négatif, nul (hors jalon) ou non numérique, then la saisie est rejetée avec un message d'erreur et la tâche conserve ses valeurs précédentes | ⬜ |
| Security : seul un utilisateur avec un rôle d'édition sur le projet peut basculer une tâche entre planification automatique et manuelle ou modifier durée/effort ; une action refusée est journalisée | ⬜ |
| Security : given une requête d'édition durée/effort ou de bascule auto/manuel sur une tâche d'un projet appartenant à un autre `tenant_id` (ou dont l'utilisateur n'est pas membre), then le système retourne 404 (non-divulgation d'existence, jamais 403 exposant la ressource) | ⬜ |
| Error : given une écriture sur un champ dérivé du moteur (`early_*`/`late_*`, marges, `is_critical`, agrégat récapitulatif) accompagnant la saisie durée/effort, then le système retourne 422 (champ en lecture seule, EN22.1) | ⬜ |
| A11y : le sélecteur auto/manuel et les champs durée/effort sont accessibles au clavier, avec un état (auto/manuel) annoncé par les lecteurs d'écran via `aria-pressed`/`aria-live` lors du recalcul | ⬜ |

## Hors périmètre
- Le calcul du chemin critique et des marges à partir des dates recalculées : couvert par US22.4.7
- La définition des calendriers ouvrés utilisés par le recalcul : couvert par US22.4.5
- L'affectation des ressources et la gestion de la sur-affectation : couverte par F22.5

## Notes d'implémentation
- Le mode manuel doit stocker un état « planifié manuellement » persistant (pas juste une absence de recalcul) pour permettre au moteur EN22.1 de signaler l'écart sans jamais écraser silencieusement les dates saisies
- La relation travail = durée × unités suppose que le calendrier de la ressource (US22.4.5) est déjà résolu ; en son absence (aucune ressource affectée), le calcul retombe sur le calendrier du projet
- Le recalcul en auto doit être incrémental (EN22.2) pour rester performant en co-édition sur un plan de 10 000+ tâches

---
Item Type: US · Parent: F22.4 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Critical
Stage: ⬜
Rôle: chef-de-projet
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique)
