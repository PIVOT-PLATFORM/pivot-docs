# US08.1.3 — Angular : liste des tableaux

**En tant que** utilisateur
**Je veux** voir mes tableaux dans l'interface Angular
**Afin de** naviguer vers un tableau existant ou en créer un nouveau

## Critères d'acceptation

| Critère | 🤖 Dev | ✅ PO |
|---------|--------|-------|
| Route `/whiteboard` (lazy-loaded, bloquée par moduleGuard) | ⬜ | ⬜ |
| Grille de cards : titre, rôle (badge owner/editor/viewer), date modif | ⬜ | ⬜ |
| Bouton "Nouveau tableau" → modal titre → POST | ⬜ | ⬜ |
| État vide : illustration + CTA "Créer mon premier tableau" | ⬜ | ⬜ |
| Tests Vitest BoardListComponent | ⬜ | ⬜ |
| Clic sur card → navigation vers /whiteboard/{boardId} | ⬜ | ⬜ |
| Pagination : infinite scroll ou bouton "Charger plus" (décision à valider) — page 2 chargée quand l'utilisateur atteint le bas de la grille | ⬜ | ⬜ |
| État "loading" : skeleton cards (aria-busy="true") pendant le GET — pas de spinner page entière | ⬜ | ⬜ |
| État "error" si GET échoue : message explicite + bouton "Réessayer" | ⬜ | ⬜ |
| When activeParticipantCount > 0, la card affiche un badge "N en ligne" avec point vert (aria-label="N collaborateurs actuellement en ligne") | ⬜ | ⬜ |
| Chaque card expose un menu d'actions (bouton ⋯, aria-label="Actions pour [titre du tableau]") : Renommer, Supprimer | ⬜ | ⬜ |
| Action "Supprimer" → dialog de confirmation (role="alertdialog") avant suppression | ⬜ | ⬜ |
| Renommage / suppression hors scope de cette US — délégués à US08.1.4 et US08.1.5 | ⬜ | ⬜ |
| Chaque card : focusable au clavier (Tab, Enter pour ouvrir), aria-label="[titre] — modifié le [date] — [rôle]" | ⬜ | ⬜ |
| Bouton "Nouveau tableau" : premier dans l'ordre de tabulation de la page | ⬜ | ⬜ |
| Route /whiteboard/{boardId} possède son propre moduleGuard ET authGuard indépendants de la route /whiteboard | ⬜ | ⬜ |
| thumbnailUrl : <img [src]="board.thumbnailUrl" *ngIf="board.thumbnailUrl"> — pas de rendu si null ; placeholder visuel côté CSS | ⬜ | ⬜ |
| thumbnailUrl validée côté backend : schéma http/https obligatoire — url javascript: ou data: rejetée | ⬜ | ⬜ |
| Labels de rôle localisés (owner → "Propriétaire", editor → "Éditeur", viewer → "Lecteur"), formats date via Angular DatePipe, tous états externalisés i18n whiteboard.board.list.* | ⬜ | ⬜ |

---
Item Type: US · Parent: F08.1 · Module: whiteboard · Phase: MVP · Size: M · Priority: High
Human Gate: needs-human-valid · Stage: Backlog
