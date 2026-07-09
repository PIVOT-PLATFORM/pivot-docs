# US08.1.3 — Angular : liste des tableaux

**En tant que** utilisateur
**Je veux** voir mes tableaux dans l'interface Angular
**Afin de** naviguer vers un tableau existant ou en créer un nouveau

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Route `/whiteboard` (lazy-loaded, bloquée par moduleGuard) | ✅ |
| Grille de cards : titre, rôle (badge owner/editor/viewer), date modif | ✅ |
| Bouton "Nouveau tableau" → modal titre → POST | ✅ |
| État vide : illustration + CTA "Créer mon premier tableau" | ✅ |
| Tests Vitest BoardListComponent | ✅ |
| Clic sur card → navigation vers /whiteboard/{boardId} | ✅ |
| Pagination : infinite scroll ou bouton "Charger plus" (décision à valider) — page 2 chargée quand l'utilisateur atteint le bas de la grille | ✅ |
| État "loading" : skeleton cards (aria-busy="true") pendant le GET — pas de spinner page entière | ✅ |
| État "error" si GET échoue : message explicite + bouton "Réessayer" | ✅ |
| When activeParticipantCount > 0, la card affiche un badge "N en ligne" avec point vert (aria-label="N collaborateurs actuellement en ligne") | ✅ |
| Chaque card expose un menu d'actions (bouton ⋯, aria-label="Actions pour [titre du tableau]") : Renommer, Supprimer | ✅ |
| Action "Supprimer" → dialog de confirmation (role="alertdialog") avant suppression | ⬜ |
| Renommage / suppression hors scope de cette US — délégués à US08.1.4 et US08.1.5 | ✅ |
| Chaque card : focusable au clavier (Tab, Enter pour ouvrir), aria-label="[titre] — modifié le [date] — [rôle]" | ✅ |
| Bouton "Nouveau tableau" : premier dans l'ordre de tabulation de la page | ✅ |
| Route /whiteboard/{boardId} possède son propre moduleGuard ET authGuard indépendants de la route /whiteboard | ✅ |
| thumbnailUrl : `<img [src]="board.thumbnailUrl" *ngIf="board.thumbnailUrl">` — pas de rendu si null ; placeholder visuel côté CSS | ✅ |
| thumbnailUrl validée côté backend : schéma http/https obligatoire — url javascript: ou data: rejetée | ✅ |
| Labels de rôle localisés (owner → "Propriétaire", editor → "Éditeur", viewer → "Lecteur"), formats date via Angular DatePipe, tous états externalisés i18n whiteboard.board.list.* | ✅ |
| Aucun identifiant de tenant transmis ou stocké côté client (Angular) : toutes les requêtes API s'appuient uniquement sur le token opaque en cookie HttpOnly, tenantId résolu côté backend (SecurityContext) | ✅ |

## Hors périmètre
- Renommage et suppression : couverts par US08.1.4 et US08.1.5 (menu ⋯ exposé ici, actions déléguées)
- Recherche/filtre de tableaux dans la grille : hors scope (dépend de US08.1.2, marquée hors scope Socle)
- Tri personnalisé par l'utilisateur : hors scope, ordre fixe `updatedAt DESC` hérité du backend

## Notes d'implémentation
- Frontend `pivot-collaboratif-ui`, route lazy `whiteboard/whiteboard.routes.ts`, composant `BoardListComponent`
- Consomme `GET /api/collaboratif/whiteboard/boards` ; pagination via `page`/`size`, `size` fixé à 20 côté client
- Design system non disponible au moment de l'implémentation : card/skeleton/modal implémentés en BEM SCSS custom
- i18n : clés `whiteboard.board.list.*` dans `fr.json`/`en.json`
- Décision pagination : bouton "Charger plus" (plus accessible que infinite scroll, pas d'IntersectionObserver)
- `onRenameStub` / `onDeleteStub` : stubs sans logique — délégués à US08.1.4 / US08.1.5

---
Item Type: US · Parent: F08.1 · Module: whiteboard · Phase: Socle · Size: M · Priority: High
Stage: Done
Dépendances: US08.1.1, US08.1.2
