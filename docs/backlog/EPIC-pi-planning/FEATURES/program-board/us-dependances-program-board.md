# US50.3.2 — Gérer les dépendances entre tickets du Program Board

**En tant que** RTE ou Scrum Master
**Je veux** relier deux tickets du Program board par une dépendance (mode « Lier »), matérialisée par une flèche, avec statut OK/bloquant
**Afin de** repérer les risques de blocage inter-équipes avant le démarrage du PI

**Gate 1 réalisé le 2026-07-22** — remplace le stub outline précédent. Prolonge US50.3.1 (tickets
du board). Accès et absence de temps réel WebSocket : voir US50.1.1/US50.3.1 §Architecture.

**Architecture — algorithme anti-cycle (Gate 1 — décision PO/Architecte)** : PIVOT n'a pas encore
de module Roadmap implémenté (`E-roadmap` reste au stade backlog, aucun code dans `pivot-core`) —
la référence "même exigence que les dépendances de Roadmap" du stub d'origine pointe donc vers
l'algorithme du **POC PouetPouet** (`validateDeps`/`roadmap.routes.ts`, adapté pour le Program
Board dans `wouldCreateDependencyCycle`/`pi-board.routes.ts`), retenu tel quel comme référence
technique : avant de créer l'arête `fromTicketId → toTicketId`, un parcours en profondeur (DFS)
sur le graphe des dépendances existantes du cycle vérifie si `fromTicketId` est déjà atteignable
depuis `toTicketId` en suivant les arêtes existantes — si oui, l'ajout créerait un cycle, refusé
en 400. Complexité O(tickets + dépendances) par vérification, largement suffisante au volume
attendu (dizaines de tickets par PI, pas de milliers).

## Critères d'acceptation

### Création d'une dépendance (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given deux tickets du même cycle, when `POST /api/agilite/pi/cycles/{id}/dependencies` avec `{ fromTicketId, toTicketId, status?, note? }`, then 201 Created — `status` par défaut `"OK"` si omis | ⬜ |
| Given l'ajout de l'arête `fromTicketId → toTicketId`, when elle est traitée, then le graphe des dépendances existantes du cycle est parcouru (DFS, voir §Architecture) pour détecter si elle créerait un cycle — refusée si oui (voir Cas d'erreur) | ⬜ |
| Given une dépendance créée, when elle est affichée, then elle porte un statut visuel **OK** (vert) ou **bloquant** (rouge, trait plus épais/pointillé pour rester distinguable sans dépendre de la seule couleur) | ⬜ |

### Modification / Suppression

| Critère | 🤖 Dev |
|---------|--------|
| Given une dépendance existante du cycle, when `PATCH .../cycles/{id}/dependencies/{depId}` avec `{ status?, note? }`, then 200 OK — seuls le statut et la note sont modifiables, jamais `fromTicketId`/`toTicketId` (supprimer et recréer si le lien lui-même doit changer) | ⬜ |
| Given une dépendance du cycle, when `DELETE .../cycles/{id}/dependencies/{depId}`, then 204 No Content | ⬜ |
| Given un ticket supprimé (US50.3.1), when la suppression est traitée, then toutes ses dépendances (entrantes et sortantes) sont supprimées en cascade | ⬜ |

### Rendu (frontend `pivot-ui`)

| Critère | 🤖 Dev |
|---------|--------|
| Given le board avec des dépendances, when il s'affiche, then chaque dépendance est matérialisée par une flèche reliant les deux tickets, superposée à la matrice (calque SVG dédié, jamais bloquant les interactions de la grille en dessous sauf sur le tracé lui-même) | ⬜ |
| Given le mode « Lier », when l'utilisateur l'active puis clique un ticket source puis un ticket cible, then une dépendance est créée entre les deux (statut `OK` par défaut, modifiable ensuite) | ⬜ |
| Given une flèche de dépendance existante, when l'utilisateur clique dessus, then un panneau permet de voir/modifier son statut OK/bloquant, sa note, ou de la supprimer | ⬜ |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| Error : given `fromTicketId === toTicketId`, when création, then 400 code `SELF_DEPENDENCY` | ⬜ |
| Error : given un `fromTicketId`/`toTicketId` qui n'appartient pas au même cycle que l'URL, when création, then 400 code `INVALID_TICKET` | ⬜ |
| Error : given une dépendance `fromTicketId → toTicketId` déjà existante (même paire, même sens), when création, then 400 code `DUPLICATE_DEPENDENCY` | ⬜ |
| Error : given un ajout qui créerait un cycle (voir §Architecture), when création, then 400 code `DEPENDENCY_CYCLE` | ⬜ |
| Error : given un `id` de cycle ou de dépendance inexistant/autre tenant, when tout endpoint ci-dessus, then 404 | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : `tenantId`/`userId` résolus exclusivement depuis le `RequestPrincipal` | ⬜ |
| Security : given un appelant sans lien avec le cycle (voir US50.1.1 §Architecture), when tout endpoint dépendances, then 404 (jamais 403) | ⬜ |
| Security : test TI obligatoire cross-tenant sur les 3 endpoints dépendances | ⬜ |
| Security : test TI obligatoire prouvant le refus d'un cycle de dépendances (A→B→C→A refusé à la création du 3ᵉ lien) | ⬜ |

### A11y (frontend `pivot-ui`)

| Critère | 🤖 Dev |
|---------|--------|
| A11y : le statut OK/bloquant n'est jamais porté par la seule couleur (icône ou libellé texte associé, contraste suffisant) | ⬜ |
| A11y : le mode « Lier » et la création de dépendance restent accessibles au clavier (sélection des deux tickets via la vue détail, pas uniquement clic-clic souris) | ⬜ |
| A11y : tous les libellés externalisés via Transloco | ⬜ |

## Hors périmètre

- **Import de dépendances externes (Jira/ADO)** — non spécifié.
- **Temps réel WebSocket sur les dépendances** — voir US50.3.1 §Architecture.

## Notes d'implémentation

- **Backend** : nouvelle entité `PiDependency` (`id`, `cycleId` FK `ON DELETE CASCADE`,
  `fromTicketId`/`toTicketId` FK `pi_ticket(id) ON DELETE CASCADE`, contrainte unique
  `(fromTicketId, toTicketId)`, `status` enum `PiDependencyStatus{OK,BLOCKED}`, `note` nullable)
  — même fichier de migration que US50.3.1 (`PiTicket`) ou suivant, à trancher en implémentation.
  `PiDependencyService#create/update/delete`, détection de cycle en mémoire (charge les arêtes du
  cycle via `PiDependencyRepository#findAllByCycleId`, DFS pur — méthode testable en isolation
  sans base, même approche que `PiIterationGenerator`/`WeightedEntrySelector`) avant tout insert.
  `PiDependencyController`.
- **Frontend** : composant `pi-dependency-layer` — `<svg>` en absolute overlay du conteneur de la
  matrice, ancres calculées via `ResizeObserver` sur les éléments ticket (référence : POC PouetPouet
  `apps/web/src/components/pi/dependency-layer.tsx` pour l'approche, réimplémentée en Angular avec
  signals — jamais copiée verbatim), courbe simple entre les deux ancres, marqueurs verts/rouges
  distincts (voir A11y).

---
Item Type: US · Parent: F50.3 · Module: agilite · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Rôle: release-train-engineer, scrum-master
Source: PouetPouet v0.31.0 (PR5 #247 données/API — dépendances OK/bloquant + anti-cycle, PR6 #248 UI)
Dépendances: US50.3.1
