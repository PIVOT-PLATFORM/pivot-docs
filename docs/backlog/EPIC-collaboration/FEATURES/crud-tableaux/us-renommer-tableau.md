# US08.1.4 — Renommer un tableau

**En tant que** owner d'un tableau
**Je veux** renommer mon tableau
**Afin de** garder mes espaces de travail organisés et lisibles

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| PATCH /api/whiteboard/boards/{boardId} avec body { title: "nouveau titre" } renomme le tableau | ⬜ |
| Vérification que boardId appartient au tenant courant. Cross-tenant → 404 | ⬜ |
| boardId existant, même tenant, mais utilisateur non membre du board → 404 (même traitement que cross-tenant, anti-énumération/IDOR) | ⬜ |
| Seul l'OWNER peut renommer (EDITOR/VIEWER → 403, ces rôles étant déjà membres du board) | ⬜ |
| tenantId résolu exclusivement depuis le SecurityContext (token opaque) — jamais depuis le path ou le body | ⬜ |
| Titre validé : entre 1 et 100 caractères, @NotBlank. Titre vide ou invalide → 400 | ⬜ |
| Titre rendu via text content Angular ({{ title }}) — jamais innerHTML | ⬜ |
| Audit event BoardRenamed enregistré avec boardId, oldTitle, newTitle, actorId | ⬜ |
| Tests TI PATCH /api/whiteboard/boards/{boardId} (owner → 200, editor → 403, cross-tenant → 404) | ⬜ |
| UI : renommage inline depuis la card (clic sur titre ou menu ⋯ → "Renommer") | ⬜ |
| Champ de renommage inline : pré-rempli avec le titre actuel, sélectionné au focus | ⬜ |
| Validation : Entrée pour confirmer, Échap pour annuler (titre revient à l'original) | ⬜ |
| Pendant la sauvegarde, champ disabled + spinner inline | ⬜ |
| En cas d'erreur réseau, titre revient à l'original + toast "error" | ⬜ |
| Renommage également possible depuis le canvas (titre du board cliquable en haut) | ⬜ |
| Tous textes internalisés dans whiteboard.board.rename.* (fr.json / en.json) | ⬜ |
| Champ de renommage inline : aria-label="Renommer le tableau [titre actuel]" ; résultat (succès/erreur) annoncé via la zone aria-live="polite" du toast | ⬜ |

## Hors périmètre
- Renommage en masse (bulk rename) : hors scope
- Historique des renommages visible par l'utilisateur (au-delà de l'audit event technique) : hors scope
- Renommage collaboratif concurrent (deux utilisateurs renomment simultanément) : dernier écrit gagne (last-write-wins), pas de résolution de conflit dans cette US

## Notes d'implémentation
- Backend `pivot-collaboratif-core`, endpoint `PATCH /api/whiteboard/boards/{boardId}` → `BoardController.rename()` → `BoardService.rename()`
- tenantId résolu exclusivement depuis le SecurityContext (token opaque), jamais depuis le path/body — cohérent avec US08.1.1/US08.1.2
- **Convention transverse d'accès** (cohérente avec US08.1.1/US08.1.5) : board inexistant, cross-tenant, ou utilisateur non membre → 404 ; membre existant avec rôle EDITOR/VIEWER → 403
- Audit event `BoardRenamed` (boardId, oldTitle, newTitle, actorId) persisté via le service d'audit commun (cible à terme : EN30.9.5 Journaux d'audit)
- Frontend : édition inline dans `BoardCardComponent` (grille US08.1.3) et dans le header du canvas (US08.3.2)
- i18n : clés `whiteboard.board.rename.*`

---
Item Type: US · Parent: F08.1 · Module: whiteboard · Phase: Socle · Size: S · Priority: High
Stage: In progress
Dépendances: US08.1.1
