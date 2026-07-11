# US22.4.10b — Zoom de l'échelle de temps et poignée d'avancement

**En tant que** chef de projet
**Je veux** zoomer l'échelle de temps du Gantt (jour → semaine → mois → trimestre) et ajuster l'avancement d'une tâche en tirant sa poignée d'avancement
**Afin de** naviguer le planning à la bonne granularité et mettre à jour l'exécution directement sur la barre

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'échelle de temps, when je zoome (jour → semaine → mois → trimestre) ou dézoome, then le rendu s'adapte à la granularité choisie et le point focal (période visible) reste centré | ⬜ |
| Given une barre de tâche, when je tire sa poignée d'avancement, then le pourcentage réalisé et le remplissage d'avancement se mettent à jour via le moteur de saisie d'avancement (US22.4.8) | ⬜ |
| Given un utilisateur en lecture seule, when il zoome ou navigue dans l'échelle de temps, then l'affichage s'adapte sans qu'aucune modification ne soit possible | ⬜ |
| Error : given un ajustement de poignée qui porterait le pourcentage réalisé hors de l'intervalle [0, 100], then la valeur est bornée aux limites valides et un message explicite s'affiche | ⬜ |
| Security : seul un utilisateur membre du projet avec un rôle d'édition (ou affecté à la tâche) peut ajuster l'avancement à la poignée ; un non-membre reçoit 404 (isolation multi-tenant), un membre en lecture seule reçoit 403 sur l'ajustement mais peut zoomer et naviguer | ⬜ |
| A11y : le niveau de zoom courant est exposé en texte accessible et annoncé aux lecteurs d'écran, et la poignée d'avancement expose sa valeur (pourcentage) via un rôle de curseur ARIA ajustable au clavier, pas uniquement via un remplissage visuel | ⬜ |

## Hors périmètre
- Le déplacement/redimensionnement des barres et la création de lien par glisser : couverts par US22.4.10a
- La logique métier de saisie d'avancement (travail réel/restant, date d'état, agrégation des récapitulatifs) : couverte par US22.4.8 (cette US couvre l'interaction directe à la poignée)
- Le formulaire d'édition clavier équivalent et la virtualisation du rendu : couverts par US22.4.10c
- La co-édition temps réel multi-utilisateurs : couverte par EN22.2

## Notes d'implémentation
- Le zoom doit conserver le point focal : la période visible au moment du zoom reste centrée, pour ne pas perdre le contexte de navigation ; recalculer l'origine de l'échelle à partir du centre du viewport avant de rendre la nouvelle granularité
- L'ajustement d'avancement à la poignée passe par le même moteur de validation que la saisie structurée (US22.4.8 / EN22.1) ; le bornage [0, 100] est vérifié côté serveur avant persistance
- Le changement de granularité de l'échelle ne doit pas déclencher de recalcul du planning (opération purement de rendu) ; seul l'ajustement d'avancement écrit dans le modèle

---
Item Type: US · Parent: F22.4 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Critical
Stage: ⬜
Dépendances: EN22.1 (modèle temporel unique), US22.4.8 (suivi d'avancement, pour le modèle ajusté à la poignée), US22.4.10a (interactions directes de base sur les barres)
