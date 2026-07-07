# US08.2.3 — Angular : UI partage et gestion des rôles

## Contexte

- **US** : `docs/backlog/EPIC-collaboration/FEATURES/partage-roles/us-ui-partage-roles.md` (F08.2 — Partage et rôles, EPIC-collaboration E30)
- **PR** : `pivot-collaboratif-ui` [#21](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-ui/pull/21)
  (`feat/us08-2-3-ui-partage-roles`)
- **Dernier commit au moment du figeage** : `01280ac` — `feat(whiteboard): implement US08.2.3 — Angular share panel and join board UI`
- **Gate 2 COVERAGE** : 97.3 % stmts / 95.33 % branches / 93.8 % fonctions / 98.75 % lignes (83/83 tests Vitest)
- **Gate 4 MERGE_CONFIDENCE** : 93/100 — auto-approuvé (seuil ≥ 85)
- **Dépend de** : US08.2.1 (backend génération/révocation token, `POST/DELETE /whiteboard/boards/{boardId}/share`), US08.2.2 (backend jointure, `POST /whiteboard/join`)

---

## Spec fonctionnelle

### SharePanelComponent

Panneau latéral/modale de partage et gestion des membres d'un tableau. Accès : `boardId` passé
en `@Input({ required: true })`. La fermeture est émise via `@Output() closed`.

**Section lien d'invitation**

- Sélecteur de rôle (`EDITOR` | `VIEWER`) → bouton « Générer un lien »
- `POST /whiteboard/boards/{boardId}/share` avec `{ role }` — réponse `ShareToken`
- Lien construit : `${window.location.origin}/whiteboard/join?token={token}`
- Bouton « Copier le lien » → `navigator.clipboard.writeText()` → confirmation `role="status" aria-live="polite"`
- Repli clipboard : si `navigator.clipboard` indisponible ou en échec → `<input readonly>` affichant le lien + message explicatif
- Erreur génération → toast (aucune mise à jour optimiste)

**Section membres**

- `GET /whiteboard/boards/{boardId}/members` au montage → liste `BoardMember[]` triée par `joinedAt`
- `OWNER` : badge uniquement, pas de contrôle de rôle, pas de bouton de retrait
- `EDITOR` / `VIEWER` : `<select>` de rôle avec `<label>` associé via `id/for` → `PATCH /whiteboard/boards/{boardId}/members/{userId}/role` avec `{ role }`
- Retrait : bouton « Retirer » → dialog de confirmation (`role="alertdialog"`, `aria-modal="true"`) → `DELETE /whiteboard/boards/{boardId}/members/{userId}`
- Erreurs (chargement, mise à jour rôle, retrait) → toast ; état de la liste inchangé jusqu'à confirmation serveur

**Accessibilité (WCAG 2.1 AA)**

- Panneau principal : `role="dialog"`, `aria-modal="true"`, `[attr.aria-label]` i18n, `(keydown.escape)="close()"`, `tabindex="-1"`
- Bouton de fermeture : `autofocus`, `[attr.aria-label]` i18n
- Tableau membres : `<table>` sémantique, `<th scope="col">` sur toutes les en-têtes, `.sr-only` pour la colonne Actions
- Sélects de rôle : `<label class="sr-only" [for]="'role-' + member.userId">` explicite
- Dialog de confirmation : `role="alertdialog"`, `aria-modal="true"`, `aria-labelledby`, `autofocus` sur le bouton Annuler, `(keydown.escape)="cancelRemove()"`
- Spinner et éléments décoratifs : `aria-hidden="true"`
- États de chargement : `aria-busy="true"` + `aria-live="polite"`

### JoinBoardComponent

Page autonome chargée à la demande (lazy) sur la route `/whiteboard/join?token=...` (avant `:boardId`).

- Lecture du paramètre `token` depuis `ActivatedRoute.queryParamMap` (observable)
- `POST /whiteboard/join` avec `{ params: { token } }` → réponse `JoinBoardResult`
- Succès : `router.navigateByUrl(result.redirectUrl)`
- Token absent : affiche immédiatement l'état d'erreur (pas d'appel HTTP)
- Bouton « Réessayer » : restaure l'état `loading` et relance `joinBoard()`
- État erreur : `role="alert"`, message i18n spécifique par code HTTP

| Code | Message i18n |
|------|-------------|
| 401 | `whiteboard.join.error401` |
| 403 | `whiteboard.join.error403` |
| 404 | `whiteboard.join.error404` |
| 409 | `whiteboard.join.error409` — déjà membre |
| 410 | `whiteboard.join.error410` — lien expiré/révoqué |
| 429 | `whiteboard.join.error429` |
| autre | `whiteboard.join.errorDefault` |

---

## Contrat technique

### Fichiers introduits / modifiés (`pivot-collaboratif-ui`)

| Fichier | Rôle |
|---------|------|
| `src/app/core/whiteboard/board.model.ts` (modifié) | Interfaces `BoardMember`, `ShareToken`, `JoinBoardResult` ajoutées |
| `src/app/core/whiteboard/board.service.ts` (modifié) | 6 nouvelles méthodes : `listMembers`, `generateShareToken`, `revokeShareToken`, `joinBoard`, `updateMemberRole`, `removeMember` |
| `src/app/core/whiteboard/board.service.spec.ts` (modifié) | 12 tests ajoutés (2 par méthode : succès + propagation d'erreur) |
| `src/app/whiteboard/whiteboard.routes.ts` (modifié) | Route `join` ajoutée avant `:boardId` (ordre critique) |
| `src/app/whiteboard/share-panel/share-panel.component.ts` (nouveau) | Standalone, OnPush, signals, inject() — 17 tests |
| `src/app/whiteboard/share-panel/share-panel.component.html` (nouveau) | Template avec a11y complète |
| `src/app/whiteboard/share-panel/share-panel.component.scss` (nouveau) | BEM, palette cohérente avec `board-list` |
| `src/app/whiteboard/share-panel/share-panel.component.spec.ts` (nouveau) | 17 tests Vitest |
| `src/app/whiteboard/join-board/join-board.component.ts` (nouveau) | Standalone, OnPush, signals, computed, inject() |
| `src/app/whiteboard/join-board/join-board.component.html` (nouveau) | Spinner + `role="alert"` + bouton retry |
| `src/app/whiteboard/join-board/join-board.component.scss` (nouveau) | Layout centré minimal |
| `src/app/whiteboard/join-board/join-board.component.spec.ts` (nouveau) | 9 tests en 2 describe blocks (avec/sans token) |
| `public/assets/i18n/fr.json` (modifié) | 20 clés `whiteboard.share.panel.*` + 9 clés `whiteboard.join.*` |
| `public/assets/i18n/en.json` (modifié) | Mêmes clés en anglais |

### Modèles TypeScript

```typescript
export interface BoardMember {
  userId: string;
  role: 'OWNER' | 'EDITOR' | 'VIEWER';
  joinedAt: string;  // ISO 8601
}

export interface ShareToken {
  id: string;
  token: string;
  role: 'EDITOR' | 'VIEWER';
  maxUses: number;
  expiresAt: string;  // ISO 8601
}

export interface JoinBoardResult {
  boardId: string;
  title: string;
  role: 'EDITOR' | 'VIEWER';
  redirectUrl: string;
}
```

### Endpoints consommés

| Méthode | URL | Corps | Réponse |
|---------|-----|-------|---------|
| `GET` | `/whiteboard/boards/{boardId}/members` | — | `BoardMember[]` |
| `POST` | `/whiteboard/boards/{boardId}/share` | `{ role }` | `ShareToken` |
| `DELETE` | `/whiteboard/boards/{boardId}/share/{tokenId}` | — | 204 |
| `POST` | `/whiteboard/join?token={token}` | — | `JoinBoardResult` |
| `PATCH` | `/whiteboard/boards/{boardId}/members/{userId}/role` | `{ role }` | `BoardMember` |
| `DELETE` | `/whiteboard/boards/{boardId}/members/{userId}` | — | 204 |

### Route Angular

```typescript
{
  path: 'join',
  loadComponent: () =>
    import('./join-board/join-board.component').then(m => m.JoinBoardComponent),
}
```

Placée **avant** `{ path: ':boardId', ... }` pour éviter que `join` soit capturé comme `boardId`.

### Signaux internes (`SharePanelComponent`)

| Signal | Type | Rôle |
|--------|------|------|
| `members` | `Signal<BoardMember[]>` | Liste chargée depuis le serveur |
| `membersStatus` | `Signal<'loading' \| 'loaded' \| 'error'>` | État du chargement |
| `shareToken` | `Signal<ShareToken \| null>` | Token courant généré |
| `tokenStatus` | `Signal<'idle' \| 'generating' \| 'error'>` | État de la génération |
| `selectedRole` | `Signal<'EDITOR' \| 'VIEWER'>` | Rôle sélectionné avant génération |
| `linkCopied` | `Signal<boolean>` | Confirmation copie (auto-reset 2 s) |
| `clipboardFailed` | `Signal<boolean>` | Bascule sur repli input readonly |
| `confirmRemoveMember` | `Signal<BoardMember \| null>` | Membre à retirer (ouvre dialog) |
| `updatingRoleForUserId` | `Signal<string \| null>` | Spinners par membre |
| `removingMemberId` | `Signal<string \| null>` | Spinners retrait |
| `shareLink` | `Computed<string \| null>` | URL complète dérivée de `shareToken` |

### i18n — clés ajoutées

```text
whiteboard.share.panel.title
whiteboard.share.panel.close
whiteboard.share.panel.linkSection
whiteboard.share.panel.selectRole
whiteboard.share.panel.generateLink
whiteboard.share.panel.generatingLink
whiteboard.share.panel.linkLabel
whiteboard.share.panel.copyLink
whiteboard.share.panel.linkCopied
whiteboard.share.panel.clipboardFallback
whiteboard.share.panel.generateError
whiteboard.share.panel.membersSection
whiteboard.share.panel.memberUserId
whiteboard.share.panel.memberRole
whiteboard.share.panel.memberJoined
whiteboard.share.panel.changeRole
whiteboard.share.panel.removeMember
whiteboard.share.panel.removeError
whiteboard.share.panel.roleUpdateError
whiteboard.share.panel.loadMembersError
whiteboard.share.panel.confirmRemove.title
whiteboard.share.panel.confirmRemove.message
whiteboard.share.panel.confirmRemove.confirm
whiteboard.share.panel.confirmRemove.cancel
whiteboard.join.loading
whiteboard.join.error401
whiteboard.join.error403
whiteboard.join.error404
whiteboard.join.error409
whiteboard.join.error410
whiteboard.join.error429
whiteboard.join.errorDefault
whiteboard.join.retry
```

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US08.2.1 | `SharePanelComponent` consomme `POST/DELETE /whiteboard/boards/{boardId}/share` — contrat du backend figé dans `docs/specs/EPIC-collaboration/us08-2-1-*.md` |
| US08.2.2 | `JoinBoardComponent` consomme `POST /whiteboard/join` — contrat figé dans `docs/specs/EPIC-collaboration/us08-2-2-rejoindre-tableau.md` |
| US08.3.x | Le canvas (WebSocket STOMP) ne dépend pas de cette US. `SharePanelComponent` sera déclenché depuis l'interface du canvas (`BoardCanvasComponent`, US08.3.2a), hors périmètre de cette US. |

---

## Hors périmètre (explicitement exclu)

- Affichage/révocation de plusieurs tokens actifs simultanément dans l'UI
- Historique des partages (les événements d'audit sont stockés backend, pas affichés ici)
- Recherche/filtrage des membres
- Transfert de propriété OWNER via cette UI
- Tests E2E Playwright (différés à US08.3.x, environnement complet non disponible)
