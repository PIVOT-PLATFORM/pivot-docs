# E08 — Module Whiteboard

*🎓 Onboarding in-app de ce module → [E41 — Formation & Onboarding](../EPIC-formation-onboarding/README.md) (US41.5.1).*

## Objectif
Tableau blanc collaboratif temps réel : CRUD tableaux, partage par lien/rôles, canvas WebSocket, présence, undo/redo, templates. Inspiré de Miro / Klaxoon Whiteboard.

## Périmètre GitHub (MVP)
- Feature F08.1 : CRUD tableaux (backend + Angular frontend)
- Feature F08.2 : Partage et rôles (backend + Angular)
- Feature F08.3 : Canvas collaboratif temps réel (backend WS + Angular)
- Feature F08.4 : Templates de tableau
- Enabler EN08.1 : Isolation WebSocket room par board
- Enabler EN08.2 : Guard Angular module whiteboard

## Inspiration
PouetPouet (tableau blanc collaboratif open-source)

## Phase
⬜ **MVP** — Gate 1 PO Agent à effectuer · bloqué jusqu'à fin MVP Auth/Shell/Modules

## Repo cible (architecture multi-repo)
- Backend : **`pivot-collaboratif-core`** (schéma Flyway `collaboratif`, FK → `public.teams.id`)
- Frontend : **`pivot-collaboratif-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- Pré-requis EN17 : pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Modules impactés
`collaboratif`

## Dépendances
- Dépend de : E03 Système de modules (EN03.1 + EN03.2)
- Dépend de : E17 Infrastructure multi-repo (EN17.1 + EN17.3)

## Statut global
⬜ Non démarré — Backlog

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| EN08.1 — Isolation WebSocket room par board | ⬜ |
| EN08.2 — Guard Angular module whiteboard | ⬜ |
| **F08.1 — CRUD tableaux** | |
| [US08.1.1 — Utilisateur crée un tableau](FEATURES/crud-tableaux/us-creer-tableau.md) | ⬜ |
| [US08.1.2 — Utilisateur liste ses tableaux (backend)](FEATURES/crud-tableaux/us-liste-tableaux-backend.md) | ⬜ |
| [US08.1.3 — Angular : liste des tableaux](FEATURES/crud-tableaux/us-liste-tableaux-angular.md) | ⬜ |
| [US08.1.4 — Renommer un tableau](FEATURES/crud-tableaux/us-renommer-tableau.md) | ⬜ |
| [US08.1.5 — Supprimer un tableau](FEATURES/crud-tableaux/us-supprimer-tableau.md) | ⬜ |
| **F08.2 — Partage et rôles** | |
| [US08.2.1 — Owner partage un tableau par lien public](FEATURES/partage-roles/us-partager-tableau.md) | ⬜ |
| [US08.2.2 — Utilisateur rejoint un tableau via token](FEATURES/partage-roles/us-rejoindre-tableau.md) | ⬜ |
| [US08.2.3 — Angular : UI partage et gestion rôles](FEATURES/partage-roles/us-ui-partage-roles.md) | ⬜ |
| **F08.3 — Canvas collaboratif temps réel** | |
| [US08.3.1 — Connexion WebSocket au canvas d'un tableau](FEATURES/canvas-ws/us-connexion-ws-canvas.md) | ⬜ |
| [US08.3.2 — Angular : canvas whiteboard](FEATURES/canvas-ws/us-canvas-angular.md) *(À décomposer en 3 sous-US avant implémentation)* | ⬜ |
| [US08.3.3 — Undo / Redo sur le canvas](FEATURES/canvas-ws/us-undo-redo.md) | ⬜ |
| [US08.5.1 — Présence des participants sur le canvas](FEATURES/presence/us-presence-participants.md) | ⬜ |
| **F08.4 — Templates** | |
| [US08.4.1 — Utilisateur crée un tableau depuis un template](FEATURES/templates/us-tableau-depuis-template.md) | ⬜ |

---

## Couverture benchmark (E30 — Collaboration)

E08 est l'implémentation MVP du socle whiteboard. Il concrétise une partie des exigences
marché portées par le backlog benchmark [`E30 — Collaboration`](../EPIC-collaboration/README.md)
(source : dossier benchmark Miro / Klaxoon / FigJam / Microsoft Whiteboard — voir
[`BENCHMARK.md`](../BENCHMARK.md)). Correspondances :

| Exigence benchmark (E30) | Portée par E08 | Écart / reste à faire |
|--------------------------|----------------|-----------------------|
| F30.1 Canevas & objets (BL-001…007) | F08.3 Canvas WS | formes/connecteurs, dessin main levée, images, frames = à étendre |
| F30.2 Collaboration temps réel (BL-008…011) | F08.3 + F08.5 Présence + EN08.1 | commentaires ancrés, historique de versions = à étendre |
| F30.4 Modèles (BL-012…013) | F08.4 Templates | modèles d'organisation chartés = à étendre |
| F30.8 Partage & administration (BL-014…016) | F08.2 Partage & rôles | hiérarchie d'espaces, export PNG/PDF = à étendre |

Les autres Features d'E30 (facilitation, IA, diagrammes, sécurité/gouvernance, plateformes,
engagement, extensibilité, licences, innovation) sont **net-new** et hébergées dans
[`EPIC-collaboration`](../EPIC-collaboration/README.md).
