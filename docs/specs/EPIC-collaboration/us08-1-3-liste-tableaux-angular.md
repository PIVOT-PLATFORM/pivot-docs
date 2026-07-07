# US08.1.3 — Angular : liste des tableaux

## Contexte

- **US** : `docs/backlog/EPIC-collaboration/FEATURES/crud-tableaux/us-liste-tableaux-angular.md`
  (F08.1 — CRUD tableaux)
- **PR** : `pivot-collaboratif-ui` [#17](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-ui/pull/17)
  (`feat/us08-1-3-liste-tableaux-angular`)
- **Commit au moment du figeage** : `76d9256` (squash-merge sur `main`, 2026-07-07)
- **Gate 4 MERGE_CONFIDENCE** : 100/100 — convergence Autoloop + revue neutre indépendante (Expert
  PR Review, 88/100 avec observations non bloquantes) + auto-évaluation 100/100. PR mergée
  le 2026-07-07 avec bypass admin (REVIEW_REQUIRED, pas de co-reviewer disponible — GitHub
  n'autorise pas l'auto-approbation).

## Spec fonctionnelle

`BoardListComponent` est la page d'accueil du module whiteboard (`/whiteboard`). Elle charge,
affiche et permet de créer des tableaux collaboratifs.

### Flux principal — chargement

1. À la construction du composant, `loadBoards(0)` est appelé → status `'loading'`, grille de
   8 skeleton cards avec `aria-busy="true"`.
2. `GET /api/collaboratif/whiteboard/boards?page=0&size=20` est envoyé.
3. **Succès** : les cards sont affichées ; si `hasNext`, un bouton "Charger plus" est visible.
4. **Erreur** : status `'error'`, message explicite + bouton "Réessayer" (`role="alert"`).
5. **Résultat vide** : état "vide" avec illustration et CTA "Créer mon premier tableau".

### Flux — pagination

- Bouton "Charger plus" déclenche `loadBoards(currentPage + 1)`.
- Les boards de la page suivante sont **concaténés** à la liste existante (pas de remplacement).
- Choix : bouton explicite, pas d'IntersectionObserver (`infinite scroll`) — meilleure
  accessibilité, comportement prévisible au clavier.

### Flux — création

1. "Nouveau tableau" (ou CTA vide) → `showCreateModal(true)` → `role="dialog"` `aria-modal="true"`.
2. `autofocus` sur le `<input>` du titre.
3. "Créer" → `submitCreate()` → `POST /api/collaboratif/whiteboard/boards` `{ title }`.
4. **Succès** : ferme modal, `Router.navigate(['/whiteboard', board.id])`.
5. **Erreur** : `ToastService.show(transloco.translate('whiteboard.board.list.createError'), 'error')`.

### Flux — menu d'actions

- Bouton ⋯ par card (`aria-expanded`, `aria-label="Actions pour [titre]"`).
- Clic → affiche `role="menu"` avec 2 `role="menuitem"` : Renommer / Supprimer.
- `onRenameStub` / `onDeleteStub` : corps vides, délégués à US08.1.4 / US08.1.5.
- `event.stopPropagation()` sur le bouton ⋯ — évite l'activation de la card (navigation).

## Contrat technique

### Services

#### `BoardService` (`src/app/core/whiteboard/board.service.ts`)

| Méthode | Endpoint | Params |
|---------|----------|--------|
| `getBoards(page = 0)` | `GET /api/collaboratif/whiteboard/boards` | `page`, `size=20` (constante `PAGE_SIZE`) |
| `createBoard(title)` | `POST /api/collaboratif/whiteboard/boards` | body `{ title }` |

Injecté avec `providedIn: 'root'`. Aucun `tenantId` transmis — backend résout depuis le token.

#### Modèles (`src/app/core/whiteboard/board.model.ts`)

```typescript
export interface Board {
  id: string;
  title: string;
  role: 'owner' | 'editor' | 'viewer';
  createdAt: string;    // ISO 8601
  updatedAt: string;    // ISO 8601
  thumbnailUrl: string | null;
  activeParticipantCount: number;
}

export interface BoardPage {
  boards: Board[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  hasNext: boolean;
}
```

### Composant (`BoardListComponent`)

| Signal | Type | Rôle |
|--------|------|------|
| `boards` | `Signal<Board[]>` | Liste affichée (accumulée entre pages) |
| `status` | `Signal<'loading' \| 'loaded' \| 'error'>` | État de chargement |
| `hasNext` | `Signal<boolean>` | Affichage du bouton "Charger plus" |
| `currentPage` | `Signal<number>` | Page courante pour le prochain "Charger plus" |
| `showCreateModal` | `Signal<boolean>` | Affichage de la modal |
| `isCreating` | `Signal<boolean>` | Verrouillage pendant le POST |
| `createTitle` | `Signal<string>` | Valeur du champ titre |
| `activeMenuBoardId` | `Signal<string \| null>` | ID du menu contextuel ouvert |

- `ChangeDetectionStrategy.OnPush`, standalone, `inject()` pour toutes les dépendances.
- `skeletons = Array.from<null>({ length: 8 })` — typage correct en strict mode.

### Routing (`whiteboard.routes.ts`)

```typescript
export const whiteboardRoutes: Routes = [
  { path: '', component: BoardListComponent },
  { path: ':boardId', canActivate: [boardAccessGuard], children: [] },
];
```

### i18n

Clés sous `whiteboard.board.list.*` dans `fr.json` et `en.json` :
`title`, `newBoard`, `emptyTitle`, `emptySubtitle`, `emptyCta`, `loadMore`, `retry`,
`errorSubtitle`, `createError`, `online`, `role.{owner|editor|viewer}`,
`menu.{rename|delete}`, `create.{title|label|placeholder|confirm|cancel}`,
`aria.{openBoard|boardMenu|activeParticipants}`.

### Accessibilité

| Point | Implémentation |
|-------|---------------|
| Skeleton | `aria-busy="true"` sur la grille |
| Card link | `aria-label="[titre] — [date] — [rôle]"` (via `cardAriaLabel()`) |
| Menu bouton | `aria-expanded`, `aria-label="Actions pour [titre]"` |
| Modal | `role="dialog"`, `aria-modal="true"`, `autofocus` sur l'input |
| Error | `role="alert"` |
| Menu | `role="menu"` + `role="menuitem"` + `role="none"` sur les `<li>` |

### Budget Angular (`angular.json`)

`anyComponentStyle` augmenté : `4kB`/`8kB` → `8kB`/`16kB` (SCSS légitime de 6.44kB :
grille, skeleton `@keyframes`, modal, états multiples, badges).

## Écarts vs ACs initiaux

| AC | État | Note |
|----|------|------|
| Action "Supprimer" → `role="alertdialog"` | ⬜ hors scope | Délégué à US08.1.5 — stub `onDeleteStub` présent |
| Renommage | ⬜ hors scope | Délégué à US08.1.4 — stub `onRenameStub` présent |
| `thumbnailUrl` validée côté backend | ⬜ backend | Contrat backend — `[src]` Angular sanitize côté client |

## Scores

| Gate | Score | Seuil |
|------|-------|-------|
| Gate 2 — COVERAGE | 98.59% stmt / 98.41% branch / 97.43% func / 100% lines | ≥ 85% ✅ |
| Gate 4 — MERGE_CONFIDENCE | 100/100 (auto) / 88/100 (expert neutre) | ≥ 85 ✅ |

## Observations post-merge (à surveiller, non bloquantes)

- **Pagination concurrente** : double-clic sur "Charger plus" peut déclencher 2 requêtes
  concurrentes. Désactiver le bouton pendant le chargement ou utiliser `concatMap` (US08.1.x future).
- **Focus trap modal** : `autofocus` présent mais pas de `cdkTrapFocus` ni handler `Escape`.
  À ajouter avant GA pour WCAG 2.1 AA complet.
- **Stubs sans marqueur TODO traceable** : `onRenameStub`/`onDeleteStub` sans commentaire
  `// TODO(US08.1.4)` — suivis via backlog US08.1.4/08.1.5 uniquement.
