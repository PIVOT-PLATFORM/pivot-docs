# Spec figée — US08.1.5 · Supprimer un tableau (Angular confirm dialog)

> Gate 5 — SPEC FREEZE · généré post-merge PR #20 pivot-collaboratif-ui · commit `8b1d9a7`

## Contexte

| Champ | Valeur |
|-------|--------|
| US | US08.1.5 — Supprimer un tableau |
| PR mergée | pivot-collaboratif-ui #20 · commit `8b1d9a7` · 2026-07-07 |
| Gate 4 score | 100 / 100 |
| Sprint | Sprint 5 |
| Dépendances | US08.1.3 (BoardListComponent), US08.1.1 (board model) |
| Backend | pivot-collaboratif-core PR #19 mergé (DELETE endpoint, cascade, audit) |

---

## Spec fonctionnelle

### Flux de suppression

1. L'utilisateur ouvre le menu ⋯ d'une card de tableau
2. Il clique sur "Supprimer"
3. Un dialog de confirmation `role="alertdialog"` s'ouvre avec le titre du tableau
4. L'utilisateur peut **Annuler** (Échap ou bouton) — dialog fermé, aucun appel réseau
5. L'utilisateur clique **Supprimer définitivement** (rouge)
6. Bouton désactivé + spinner pendant le DELETE en vol
7. **Succès** : dialog fermé, card retirée de la grille, toast "Tableau supprimé"
8. **Erreur** : dialog fermé, card maintenue, toast "Impossible de supprimer le tableau"

### Dialog de confirmation

| Propriété | Valeur |
|-----------|--------|
| `role` | `alertdialog` |
| `aria-modal` | `true` |
| `aria-labelledby` | `delete-dialog-heading` |
| Fermeture clavier | `keydown.escape` sur l'overlay |
| Focus initial | Bouton "Annuler" (via `boardListAutofocus`) |
| Texte titre | "Supprimer « {titre} » ?" |
| Texte corps | "Cette action est irréversible. Tous les éléments du tableau seront perdus." |
| Bouton confirm | "Supprimer définitivement" · rouge (#ef4444) |

---

## Contrat technique

### BoardService — méthode ajoutée

```typescript
/** Permanently deletes a board and all its data (OWNER only). */
deleteBoard(boardId: string): Observable<void> {
  return this.http.delete<void>(
    `${environment.apiUrl}/whiteboard/boards/${boardId}`,
  );
}
```

### BoardListComponent — signaux ajoutés

| Signal | Type | Rôle |
|--------|------|------|
| `deletingBoard` | `signal<Board \| null>` | Board sélectionné pour confirmation |
| `isDeleting` | `signal<boolean>` | DELETE en vol |

### BoardListAutofocusDirective — correction

`select?.()` (optional chaining) — la méthode `select()` n'existe pas sur `<button>`, uniquement sur `<input>`. Le safe call permet de réutiliser la directive pour les deux types d'éléments.

### i18n keys ajoutées

| Clé | FR | EN |
|-----|----|----|
| `whiteboard.board.delete.success` | Tableau supprimé | Board deleted |
| `whiteboard.board.delete.error` | Impossible de supprimer le tableau | Unable to delete the board |
| `whiteboard.board.delete.confirm.title` | Supprimer « {{title}} » ? | Delete «{{title}}»? |
| `whiteboard.board.delete.confirm.message` | Cette action est irréversible… | This action is irreversible… |
| `whiteboard.board.delete.confirm.confirm` | Supprimer définitivement | Delete permanently |
| `whiteboard.board.delete.confirm.cancel` | Annuler | Cancel |

### BEM SCSS

| Classe | Rôle |
|--------|------|
| `board-list__modal-btn--delete` | Bouton confirmation rouge, `display: inline-flex` pour le spinner |
| `board-list__delete-message` | Paragraphe descriptif dans le dialog |

---

## Écarts vs ACs

| AC | Statut |
|----|--------|
| Focus trap complet (Tab wrap) | Minimal — focus sur Cancel + Escape. Focus wrap Tab/Shift+Tab absent (pas de `@pivot/design-system` disponible). Acceptable Socle. |
| STOMP BOARD_DELETED redirect | EN08.1 (WS room isolation) non implémenté — la redirection des participants connectés sera câblée dans EN08.1. |

---

## Scores

| Gate | Score | Décision |
|------|-------|----------|
| Gate 2 (coverage) | Stmts 97.14% · Branch 94.31% · Funcs 96.66% · Lines 98.82% | ≥ 85 ✅ |
| Gate 4 (merge confidence) | 100 / 100 | MERGE autonome (≥ 85) ✅ |

---

## Observations post-merge

- `onDeleteStub` remplacé par les méthodes `startDelete / cancelDelete / confirmDelete` — dette zéro.
- La directive `BoardListAutofocusDirective` est désormais générique (fonctionne input + button). À extraire vers un module partagé si d'autres composants en ont besoin.
- STOMP BOARD_DELETED : les participants actuellement connectés au board ne sont pas redirigés (EN08.1 manquant) — à câbler dans EN08.1 avec le registre de présence WebSocket.
