# US22.1.2 — Visualiser la roadmap en vue Gantt

**En tant que** responsable pilotage
**Je veux** voir l'ensemble des projets sous forme de diagramme de Gantt interactif
**Afin de** détecter les chevauchements et les dépendances critiques

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given des projets existants, when j'ouvre la vue Gantt (GET `/api/pilotage/roadmap/projects?teamId=`), then chaque projet s'affiche en barre horizontale positionnée sur ses dates, avec ses jalons (losange) sur la timeline | ⬜ |
| Given la vue Gantt, when je change l'axe temporel (mensuel / trimestriel / annuel), then les barres et jalons se réalignent sans perte de données | ⬜ |
| Given une barre de projet, when je la glisse-dépose ou la redimensionne, then ses dates sont mises à jour (PUT `.../projects/{id}`) et persistées | ⬜ |
| Given deux projets aux périodes chevauchantes, when la vue Gantt les affiche, then le chevauchement est signalé visuellement (ex. surbrillance) | ⬜ |
| Given la liste des projets, when j'applique un filtre (statut / équipe / période), then seuls les projets correspondants restent affichés dans le Gantt | ⬜ |
| Error : given une modification de dates par glisser-déposer qui rendrait dateFin < dateDebut, system annule le déplacement et affiche un message d'erreur | ⬜ |
| Security : la liste de projets retournée est filtrée par tenantId (TenantContext) et par les droits de l'utilisateur sur les équipes concernées | ⬜ |
| A11y : le Gantt est navigable au clavier (déplacement entre barres, ajustement des dates via clavier) avec ARIA labels décrivant chaque barre/jalon (WCAG 2.1 AA) | ⬜ |

## Hors périmètre

- La création/édition des jalons et dépendances entre projets (US22.1.3)
- Le moteur d'ordonnancement, le chemin critique et les marges (F22.4/EN22.1 — hors socle F22.1)
- La planification détaillée (WBS, tâches, sous-tâches) : cette US reste à la granularité « projet » du socle, pas du Gantt détaillé (F22.4)
- L'export du Gantt en image/PDF (US22.3.5 / US22.6.4)

## Notes d'implémentation

- Vue en lecture/déplacement basée sur GET `/api/pilotage/roadmap/projects?teamId=` ; la mise à jour des dates réutilise le PUT de US22.1.1 (pas de nouvel endpoint dédié aux dates).
- Le rendu Gantt consomme les jalons comme objet partagé avec la roadmap rapide (cf. EN22.1 : « jalon = objet partagé entre vue roadmap et vue Gantt ») — ne pas dupliquer le stockage des jalons ici, ils sont créés/gérés via US22.1.3.
- La détection de chevauchement est un signal visuel simple (période se recoupant entre deux projets) ; ce n'est pas le chemin critique ni le nivellement de ressources (F22.4/F22.5, phase ultérieure).
- Le composant Gantt doit rester compatible avec la volumétrie visée par EN22.2 (rendu virtualisé) même si cette US porte sur un nombre de projets plus restreint que le Gantt détaillé.

---
Item Type: US · Parent: F22.1 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: High
Stage: Backlog
Dépendances: US22.1.1
