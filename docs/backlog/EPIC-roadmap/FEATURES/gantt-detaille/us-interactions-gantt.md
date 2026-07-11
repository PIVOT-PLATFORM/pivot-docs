# US22.4.10 — Interactions Gantt directes

**En tant que** chef de projet
**Je veux** manipuler le Gantt à la souris : déplacer/redimensionner les barres, lier par glisser, zoomer l'échelle de temps, ajuster l'avancement à la poignée
**Afin de** éditer le planning aussi fluidement qu'un client lourd, dans le navigateur

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une barre, when je la déplace ou la redimensionne, then dates/durée se mettent à jour et le moteur recalcule les dépendances | ⬜ |
| Given deux barres, when je tire de l'une à l'autre, then un lien de dépendance est créé | ⬜ |
| Given l'échelle de temps, when je zoome (jour→semaine→mois→trimestre), then le rendu s'adapte sans perte de contexte | ⬜ |
| Error : given un déplacement ou redimensionnement qui violerait une contrainte de date bloquante ou créerait un cycle de dépendance, then l'action à la souris est annulée et un message explicite s'affiche | ⬜ |
| Security : seul un utilisateur avec un rôle d'édition sur le projet peut manipuler les barres (déplacer, redimensionner, lier, ajuster l'avancement) ; un rôle lecture seule peut zoomer/naviguer mais pas modifier | ⬜ |
| A11y : chaque interaction souris (déplacer, redimensionner, lier, ajuster l'avancement) dispose d'un équivalent clavier (ex. formulaire d'édition accessible pour dates/liens/% avancement), le Gantt n'étant pas utilisable exclusivement à la souris | ⬜ |

## Hors périmètre
- Le modèle de dépendances typées (FS/SS/FF/SF, lag/lead) lui-même : couvert par US22.4.3 (cette US couvre l'interaction directe de création via glisser-déposer)
- Le calcul du chemin critique et des marges affichés pendant l'interaction : couvert par US22.4.7
- La co-édition temps réel multi-utilisateurs (résolution de conflits simultanés) : couverte par EN22.2

## Notes d'implémentation
- Toute modification directe (drag, resize, poignée d'avancement) doit passer par le même moteur de validation/recalcul que les formulaires (EN22.1), pour garantir la cohérence entre édition directe et édition structurée
- Le rendu doit rester fluide sur un plan de 10 000+ tâches lors du zoom et du déplacement (virtualisation, EN22.2) : les interactions ne doivent pas déclencher un recalcul complet du planning à chaque pixel de déplacement (debounce/throttle)
- Le zoom de l'échelle de temps (jour→semaine→mois→trimestre) doit conserver le point focal (la période visible reste centrée) pour ne pas perdre le contexte de navigation de l'utilisateur

---
Item Type: US · Parent: F22.4 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: Critical
Stage: ⬜
Rôle: chef-de-projet
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique)
