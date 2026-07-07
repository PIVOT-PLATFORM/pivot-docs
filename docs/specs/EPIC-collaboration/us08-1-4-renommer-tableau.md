# Spec figée — US08.1.4 · Renommer un tableau (Angular inline rename)

> Gate 5 — SPEC FREEZE · généré post-merge PR #19 pivot-collaboratif-ui · commit `46766ff`

## Contexte

| Champ | Valeur |
|-------|--------|
| US | US08.1.4 — Renommer un tableau |
| PR mergée | pivot-collaboratif-ui #19 · commit `46766ff` · 2026-07-07 |
| Gate 4 score | 98 / 100 |
| Sprint | Sprint 5 |
| Dépendances | US08.1.3 (BoardListComponent), US08.1.1 (POST board) |
| Différé | Canvas rename → US08.3.2 |

---

## Spec fonctionnelle

### Flux de renommage inline

1. L'utilisateur ouvre le menu ⋯ d'une card de tableau
2. Il clique sur "Renommer"
3. Le titre de la card est remplacé par un champ `<input>` pré-rempli avec le titre actuel, sélectionné au focus
4. L'utilisateur modifie le titre (max 100 chars)
5. **Confirmer** : touche `Entrée` → PATCH `/api/whiteboard/boards/{boardId}` → titre mis à jour dans la liste
6. **Annuler** : touche `Échap` → titre revient à l'original
7. **Pendant la sauvegarde** : champ désactivé + spinner CSS inline à droite du champ
8. **Erreur réseau** : titre revient à l'original + toast "Impossible de renommer le tableau"

### États de la card

| État | Vue |
|------|-----|
| Normal | `<a routerLink>` avec `<h2>` titre |
| Renommage actif | `<div>` + `<input boardListAutofocus>` (jamais input dans `<a>`) |
| Sauvegarde en vol | input `[disabled]` + spinner CSS animé |

---

## Contrat technique

### BoardService — méthode ajoutée

```typescript
/** Renames a board (OWNER only). */
renameBoard(boardId: string, title: string): Observable<Board> {
  return this.http.patch<Board>(
    `${environment.apiUrl}/whiteboard/boards/${boardId}`,
    { title },
  );
}
```

### BoardListComponent — signaux ajoutés

| Signal | Type | Rôle |
|--------|------|------|
| `renamingBoardId` | `signal<string \| null>` | ID du board en cours de renommage |
| `renameTitle` | `signal<string>` | Valeur courante du champ input |
| `isRenaming` | `signal<boolean>` | Sauvegarde PATCH en vol |

### BoardListAutofocusDirective

Directive standalone interne (`selector: '[boardListAutofocus]'`) — `ngOnInit` appelle `focus()` + `select()` sur l'élément natif. Nécessaire car `autofocus` HTML ne se déclenche pas sur les éléments ajoutés dynamiquement via `@if`.

### i18n keys ajoutées

| Clé | FR | EN |
|-----|----|----|
| `whiteboard.board.rename.error` | Impossible de renommer le tableau | Unable to rename the board |
| `whiteboard.board.rename.aria` | Renommer le tableau {{title}} | Rename board {{title}} |

### BEM SCSS

| Classe | Rôle |
|--------|------|
| `board-list__card-rename` | Conteneur div remplaçant le `<a>` |
| `board-list__card-rename-field` | Wrapper `position: relative` pour le spinner |
| `board-list__card-rename-input` | Champ texte inline, underline bleu, `padding-right: 2rem` |
| `board-list__card-rename-spinner` | Spinner CSS (`@keyframes board-rename-spin`) |

---

## Écarts vs ACs

| AC | Statut |
|----|--------|
| Renommage depuis le canvas | Différé → US08.3.2 (canvas non encore créé) |
| Validation titre côté backend | Hors scope Angular — backend `@NotBlank @Size(max=100)` dans US08.1.4 backend (pivot-collaboratif-core PR #19 déjà mergé) |

---

## Scores

| Gate | Score | Décision |
|------|-------|----------|
| Gate 2 (coverage) | Stmts 97.79% · Branch 95% · Funcs 98.03% · Lines 99.07% | ≥ 85 ✅ |
| Gate 4 (merge confidence) | 98 / 100 | MERGE autonome (≥ 85) ✅ |

---

## Observations post-merge

- La directive `BoardListAutofocusDirective` est définie dans le même fichier que `BoardListComponent` (pattern interne — pas encore de module shared). À extraire vers un module partagé quand d'autres composants en auront besoin.
- `onDeleteStub` reste en place dans `BoardListComponent` — sera remplacé dans US08.1.5 par le dialog de confirmation (`role="alertdialog"`) + DELETE.
- Canvas rename (header du canvas cliquable) : AC explicitement ouvert, sera bouclé dans US08.3.2 au moment de l'implémentation du composant canvas.
