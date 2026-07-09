# US08.1.1 — Utilisateur crée un tableau

**En tant que** utilisateur
**Je veux** créer un nouveau tableau blanc
**Afin de** démarrer une session de collaboration

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| POST /api/whiteboard/boards crée un tableau (titre requis) | ✅ |
| Créateur = owner automatique | ✅ |
| Tableau lié au tenant courant | ✅ |
| 403 si module whiteboard désactivé pour le tenant | ✅ (stub `WhiteboardModuleCheck`, toujours actif — TODO EN17) |
| Tests TI POST /api/whiteboard/boards | ✅ |
| Titre validé : entre 1 et 100 caractères, @NotBlank @Size(max=100). Titre vide → 400 INVALID_TITLE | ✅ |
| Doublon de titre autorisé (boards identifiés par UUID v4 généré côté serveur) | ✅ |
| Visibilité par défaut = PRIVATE (accès par invitation uniquement, pas visible au tenant entier) | ✅ |
| POST retourne 201 + { id, title, role: "owner", createdAt, tenantId } | ✅ |
| Entrée board_members créée automatiquement : { boardId, userId, role: "OWNER" } | ✅ |
| tenantId résolu exclusivement depuis le SecurityContext (token opaque) — aucun tenantId accepté dans le body ou query params | 🟡 écart assumé : résolu depuis les headers `X-Pivot-User-Id`/`X-Pivot-Tenant-Id` (bootstrap, TODO EN17) — voir Gate 5 spec |
| Titre rendu côté Angular via interpolation {{ title }} uniquement — jamais innerHTML (protection XSS) | ✅ — couvert par `board-list.component` (modal intégrée, US08.1.3) |
| Bouton "Créer" désactivé + spinner pendant le POST (aria-busy="true", aria-label="Création en cours…") | ✅ — idem |
| Après création réussie, toast "Tableau créé" (role="status", 4s) + redirection vers /whiteboard/{boardId} | ✅ — idem |
| Titre vide à la soumission → champ aria-invalid="true" + message d'erreur inline via aria-describedby | ✅ — idem |
| Erreur réseau ou 5xx → toast (role="alert") + bouton "Réessayer" | ✅ — idem |
| Modal "Nouveau tableau" : role="dialog", aria-modal="true", aria-labelledby sur titre, focus trap, fermeture par Échap, focus retourné sur déclencheur | ✅ — idem |
| Tous les libellés de la modal internalisés dans whiteboard.board.create.* (fr.json / en.json) | ✅ — idem |

## Hors périmètre
- Partage et gestion des rôles (owner invite editor/viewer) — couvert par US08.2.1/US08.2.2/US08.2.3
- Création depuis un template — couverte par US08.4.1
- Génération de thumbnail à la création — hors scope Socle (voir US08.1.2 : `thumbnailUrl` nullable)
- Quota / limite du nombre de tableaux par tenant ou par utilisateur — pas de limite dans cette US

## Notes d'implémentation
- Backend `pivot-collaboratif-core` (schéma Flyway `collaboratif`), endpoint `POST /api/whiteboard/boards` → `BoardController.create()` → `BoardService.create()`
- Entités : `Board` (id UUID v4, title, tenantId, visibility, createdAt) + `BoardMember` (boardId, userId, role) créée en même transaction
- tenantId résolu exclusivement depuis le SecurityContext (token opaque) — jamais accepté en body/query, cohérent avec le modèle d'auth opaque tokens de `pivot-core`
- Vérification module actif avant création : `ModuleAccessService.isEnabled(tenantId, "whiteboard")` → 403 sinon
- Frontend `pivot-collaboratif-ui`, `BoardCreateModalComponent`, consomme `@pivot/ui-core` (toast, spinner) + `@pivot/design-system` (modal, focus trap)
- **Convention transverse d'accès** (réutilisée par US08.1.4/US08.1.5) : accès à un board d'un autre tenant ou dont l'utilisateur n'est pas membre → 404 (anti-énumération/IDOR) ; membre existant avec rôle insuffisant pour l'action → 403

---
Item Type: US · Parent: F08.1 · Module: whiteboard · Phase: Socle · Size: S · Priority: High
Stage: ✅
Gate 5 : `pivot-collaboratif-core` PR [#19](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-core/pull/19)
(Gate 4 = 88/100), spec figée `docs/specs/EPIC-collaboration/us08-1-1-creer-tableau.md` (rétroactif, 2026-07-07)
