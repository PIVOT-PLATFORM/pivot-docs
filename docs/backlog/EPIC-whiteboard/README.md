# E08 — Module Whiteboard

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
⏸️ **MVP** — Human Gate: `needs-human-valid` sur tous les items · **VERROUILLÉ** tant que MVP Auth/Shell/Modules non terminé

## Modules impactés
`whiteboard`

## Dépendances
- Dépend de : E03 Système de modules (EN03.1 + EN03.2)

## Statut global
⬜ Non démarré — Human Gate: needs-human-valid

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|-------|
| EN08.1 — Isolation WebSocket room par board | ⬜ |
| EN08.2 — Guard Angular module whiteboard | ⬜ |
| **F08.1 — CRUD tableaux** | | |
| [US08.1.1 — Utilisateur crée un tableau](FEATURES/crud-tableaux/us-creer-tableau.md) | ⬜ |
| [US08.1.2 — Utilisateur liste ses tableaux (backend)](FEATURES/crud-tableaux/us-liste-tableaux-backend.md) | ⬜ |
| [US08.1.3 — Angular : liste des tableaux](FEATURES/crud-tableaux/us-liste-tableaux-angular.md) | ⬜ |
| [US08.1.4 — Renommer un tableau](FEATURES/crud-tableaux/us-renommer-tableau.md) | ⬜ |
| [US08.1.5 — Supprimer un tableau](FEATURES/crud-tableaux/us-supprimer-tableau.md) | ⬜ |
| **F08.2 — Partage et rôles** | | |
| [US08.2.1 — Owner partage un tableau par lien public](FEATURES/partage-roles/us-partager-tableau.md) | ⬜ |
| [US08.2.2 — Utilisateur rejoint un tableau via token](FEATURES/partage-roles/us-rejoindre-tableau.md) | ⬜ |
| [US08.2.3 — Angular : UI partage et gestion rôles](FEATURES/partage-roles/us-ui-partage-roles.md) | ⬜ |
| **F08.3 — Canvas collaboratif temps réel** | | |
| [US08.3.1 — Connexion WebSocket au canvas d'un tableau](FEATURES/canvas-ws/us-connexion-ws-canvas.md) | ⬜ |
| [US08.3.2 — Angular : canvas whiteboard](FEATURES/canvas-ws/us-canvas-angular.md) *(À décomposer en 3 sous-US avant implémentation)* | ⬜ |
| [US08.3.3 — Undo / Redo sur le canvas](FEATURES/canvas-ws/us-undo-redo.md) | ⬜ |
| [US08.5.1 — Présence des participants sur le canvas](FEATURES/presence/us-presence-participants.md) | ⬜ |
| **F08.4 — Templates** | | |
| [US08.4.1 — Utilisateur crée un tableau depuis un template](FEATURES/templates/us-tableau-depuis-template.md) | ⬜ |
