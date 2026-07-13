# US08.1.7 — Corbeille et restauration d'un tableau

**En tant que** owner d'un tableau
**Je veux** que la suppression d'un tableau le mette en corbeille au lieu de le supprimer définitivement, et pouvoir le restaurer
**Afin de** me prémunir d'une suppression accidentelle sans perdre le contenu du tableau

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un tableau dont je suis owner, when j'utilise l'action "Supprimer" (US08.1.5), then le tableau est marqué supprimé (colonne `deletedAt` renseignée) au lieu d'être supprimé physiquement — plus aucune donnée n'est effacée en cascade | ⬜ |
| Given un tableau en corbeille, when j'ouvre la section "Corbeille" de la liste des tableaux, then le tableau apparaît avec son titre, sa date de suppression, et une action "Restaurer" | ⬜ |
| Given un tableau en corbeille, when je clique "Restaurer", then `deletedAt` est réinitialisé à null, le tableau redevient accessible normalement et disparaît de la corbeille pour réapparaître dans la liste principale | ⬜ |
| Given un tableau en corbeille, when un membre (autre que owner) ou un participant tente d'y accéder par son URL directe, then l'accès est refusé au même titre qu'un tableau inexistant (404) | ⬜ |
| Given un tableau en corbeille, when la liste principale des tableaux est chargée (`GET /boards`), then ce tableau n'apparaît pas dans la liste principale (filtré par `deletedAt IS NULL`) | ⬜ |
| Error : given un échec réseau ou 5xx lors de la restauration, when la requête échoue, then toast `role="alert"` + le tableau reste affiché en corbeille (pas de mise à jour optimiste non confirmée) | ⬜ |
| Error : given un boardId inexistant, déjà restauré, ou cross-tenant, when POST restore est appelé, then 404 (cohérent avec la convention anti-énumération des autres endpoints CRUD tableaux) | ⬜ |
| Security : seul l'OWNER peut lister/restaurer un tableau en corbeille — EDITOR/VIEWER n'ont pas accès à la corbeille et ne peuvent pas restaurer (403 s'ils appellent directement l'endpoint restore sur un board dont ils sont membres non-owner) | ⬜ |
| Security : tenantId résolu exclusivement depuis le SecurityContext (token opaque) — la liste de corbeille et la restauration sont strictement scopées au tenant courant, cross-tenant → 404 | ⬜ |
| A11y : section "Corbeille" atteignable au clavier depuis la liste des tableaux (lien ou onglet standard, pas de piège de focus), bouton "Restaurer" avec `aria-label="Restaurer [titre]"`, confirmation de restauration annoncée via `role="status"` | ⬜ |
| Tests TI : delete (soft) → board absent de `GET /boards`, présent dans `GET /boards/trash` ; restore (owner → 200, editor/viewer → 403, cross-tenant/inexistant → 404) | ⬜ |
| Tests Vitest : section corbeille (liste, action restaurer, état vide "Corbeille vide") | ⬜ |

## Hors périmètre

- Purge automatique ou manuelle définitive des tableaux en corbeille (rétention illimitée en Socle) — pas de hard-delete déclenchable par l'utilisateur dans cette US
- Corbeille partagée visible par tous les membres — seul l'OWNER voit et gère la corbeille de ses tableaux
- Restauration en masse (bulk restore) — hors scope

## Notes d'implémentation

- **Révise US08.1.5** (`us-supprimer-tableau.md`) : remplace le hard-delete initialement tranché (cascade physique `board`/`board_member`/`canvas_event`/`board_thumbnail`/`board_invitation_token`) par un soft-delete — colonne `deleted_at TIMESTAMP NULL` sur `board`. Toutes les requêtes de lecture existantes (liste, accès direct, jointure par token) doivent être auditées pour exclure `deleted_at IS NOT NULL`, sauf le nouvel endpoint de listing de corbeille
- Backend `pivot-collaboratif-core` : `DELETE /api/collaboratif/whiteboard/boards/{boardId}` devient un soft-delete (`UPDATE board SET deleted_at = now()`) au lieu du hard-delete ; nouvel endpoint `POST /api/collaboratif/whiteboard/boards/{boardId}/restore` ; nouvel endpoint `GET /api/collaboratif/whiteboard/boards/trash` (liste scopée owner + tenant)
- L'événement d'audit `BoardDeleted` existant (US08.1.5) est conservé ; ajouter `BoardRestored`
- Le message STOMP `BOARD_DELETED` (notification temps réel des participants connectés, EN08.1) est inchangé — la mise en corbeille continue de fermer la session active des participants
- Frontend : nouvelle section/onglet "Corbeille" dans `BoardListComponent` (US08.1.3), bouton "Restaurer" sur chaque carte de la corbeille
- i18n : clés `whiteboard.board.trash.*` (fr.json / en.json)
- Source : parité visible vs POC PouetPouet (corbeille + restauration) — décision mainteneur d'extension du Socle noyau F08.x, suite à `docs/audits/audit-recette-fonctionnelle.md`

---
Item Type: US · Parent: F08.1 · Module: whiteboard · Phase: Socle · Size: M · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Parité visible PouetPouet (audit recette fonctionnelle Socle, 2026-07-13) — décision mainteneur d'extension du périmètre F08.x « noyau + parité visible ». Révise la décision hard-delete d'US08.1.5 (soft-delete désormais requis)
Dépendances: US08.1.5 (supprimer un tableau — révisée par cette US)
