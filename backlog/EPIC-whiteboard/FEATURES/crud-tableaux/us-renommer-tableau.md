# US08.1.4 — Renommer un tableau

**En tant que** owner d'un tableau
**Je veux** renommer mon tableau
**Afin de** garder mes espaces de travail organisés et lisibles

## Critères d'acceptation

| Critère | 🤖 Dev | ✅ PO |
|---------|--------|-------|
| PATCH /api/whiteboard/boards/{boardId} avec body { title: "nouveau titre" } renomme le tableau | ⬜ | ⬜ |
| Vérification que boardId appartient au tenant courant. Cross-tenant → 404 | ⬜ | ⬜ |
| Seul l'OWNER peut renommer (EDITOR/VIEWER → 403) | ⬜ | ⬜ |
| Titre validé : entre 1 et 100 caractères, @NotBlank. Titre vide ou invalide → 400 | ⬜ | ⬜ |
| Titre rendu via text content Angular ({{ title }}) — jamais innerHTML | ⬜ | ⬜ |
| Audit event BoardRenamed enregistré avec boardId, oldTitle, newTitle, actorId | ⬜ | ⬜ |
| Tests TI PATCH /api/whiteboard/boards/{boardId} (owner → 200, editor → 403, cross-tenant → 404) | ⬜ | ⬜ |
| UI : renommage inline depuis la card (clic sur titre ou menu ⋯ → "Renommer") | ⬜ | ⬜ |
| Champ de renommage inline : pré-rempli avec le titre actuel, sélectionné au focus | ⬜ | ⬜ |
| Validation : Entrée pour confirmer, Échap pour annuler (titre revient à l'original) | ⬜ | ⬜ |
| Pendant la sauvegarde, champ disabled + spinner inline | ⬜ | ⬜ |
| En cas d'erreur réseau, titre revient à l'original + toast "error" | ⬜ | ⬜ |
| Renommage également possible depuis le canvas (titre du board cliquable en haut) | ⬜ | ⬜ |
| Tous textes internalisés dans whiteboard.board.rename.* (fr.json / en.json) | ⬜ | ⬜ |

---
Item Type: US · Parent: F08.1 · Module: whiteboard · Phase: MVP · Size: S · Priority: High
Human Gate: needs-human-valid · Stage: Backlog
