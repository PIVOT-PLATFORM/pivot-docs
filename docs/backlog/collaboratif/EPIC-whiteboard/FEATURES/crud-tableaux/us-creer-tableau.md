# US08.1.1 — Utilisateur crée un tableau

**En tant que** utilisateur
**Je veux** créer un nouveau tableau blanc
**Afin de** démarrer une session de collaboration

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|-------|
| POST /api/whiteboard/boards crée un tableau (titre requis) | ⬜ |
| Créateur = owner automatique | ⬜ |
| Tableau lié au tenant courant | ⬜ |
| 403 si module whiteboard désactivé pour le tenant | ⬜ |
| Tests TI POST /api/whiteboard/boards | ⬜ |
| Titre validé : entre 1 et 100 caractères, @NotBlank @Size(max=100). Titre vide → 400 INVALID_TITLE | ⬜ |
| Doublon de titre autorisé (boards identifiés par UUID v4 généré côté serveur) | ⬜ |
| Visibilité par défaut = PRIVATE (accès par invitation uniquement, pas visible au tenant entier) | ⬜ |
| POST retourne 201 + { id, title, role: "owner", createdAt, tenantId } | ⬜ |
| Entrée board_members créée automatiquement : { boardId, userId, role: "OWNER" } | ⬜ |
| tenantId résolu exclusivement depuis le SecurityContext (token opaque) — aucun tenantId accepté dans le body ou query params | ⬜ |
| Titre rendu côté Angular via interpolation {{ title }} uniquement — jamais innerHTML (protection XSS) | ⬜ |
| Bouton "Créer" désactivé + spinner pendant le POST (aria-busy="true", aria-label="Création en cours…") | ⬜ |
| Après création réussie, toast "Tableau créé" (role="status", 4s) + redirection vers /whiteboard/{boardId} | ⬜ |
| Titre vide à la soumission → champ aria-invalid="true" + message d'erreur inline via aria-describedby | ⬜ |
| Erreur réseau ou 5xx → toast (role="alert") + bouton "Réessayer" | ⬜ |
| Modal "Nouveau tableau" : role="dialog", aria-modal="true", aria-labelledby sur titre, focus trap, fermeture par Échap, focus retourné sur déclencheur | ⬜ |
| Tous les libellés de la modal internalisés dans whiteboard.board.create.* (fr.json / en.json) | ⬜ |

---
Item Type: US · Parent: F08.1 · Module: whiteboard · Phase: MVP · Size: S · Priority: High
Stage: Backlog
