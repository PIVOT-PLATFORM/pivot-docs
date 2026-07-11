# US08.2.1 — Owner partage un tableau par lien public

**En tant que** owner d'un tableau
**Je veux** générer un lien d'invitation pour partager mon tableau
**Afin que** d'autres utilisateurs puissent le rejoindre

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| POST /api/whiteboard/boards/{id}/share génère un token d'invitation (TTL configurable) | ⬜ |
| Rôle assigné au token : EDITOR ou VIEWER | ⬜ |
| Lien : `{baseUrl}/whiteboard/join?token={token}` | ⬜ |
| Token révocable (DELETE /api/whiteboard/boards/{id}/share/{tokenId}) | ⬜ |
| Tests TI POST + DELETE share | ⬜ |
| POST /api/whiteboard/boards/{id}/share vérifie que l'utilisateur courant est OWNER du tableau {id}. Rôle EDITOR ou VIEWER → 403. Test TI inclut appel par VIEWER → 403 | ⬜ |
| Le token d'invitation peut être configuré avec un usage maximum (maxUses : 1 à N). Par défaut maxUses = 1 (lien à usage unique). Dépassement du quota → 410 Gone | ⬜ |
| Le tenantId est extrait du TenantContext du token porteur — le tableau ne peut pas être partagé avec des utilisateurs d'un autre tenant | ⬜ |
| Audit event BoardShared enregistré avec boardId, inviterId, role, expiresAt | ⬜ |
| Board {id} inexistant ou hors du tenant courant → 404 NOT_FOUND | ⬜ |
| Rôle demandé ni EDITOR ni VIEWER → 400 INVALID_ROLE | ⬜ |
| DELETE /api/whiteboard/boards/{id}/share/{tokenId} sur un tokenId inexistant ou déjà révoqué → 404 NOT_FOUND (idempotence non garantie, action explicite requise) | ⬜ |
| Token d'invitation généré via SecureRandom cryptographique 256 bits (imprévisible, non séquentiel, ne contient aucun ID de board en clair), stocké hashé SHA-256 en BDD — le token en clair n'est jamais persisté ni écrit dans les logs | ⬜ |

## Hors périmètre

- Partage par email/notification automatique à un utilisateur nommé (US actuelle = lien seul)
- Gestion de plusieurs liens actifs simultanés avec des rôles différents pour un même board (couvert implicitement par la génération à la demande, pas de limite explicite posée ici)
- Renouvellement/prolongation d'un token existant (nécessite une nouvelle génération)
- Accès invité sans compte (voir US30.8.4, hors socle F08.x)

## Notes d'implémentation

- Endpoint : `POST /api/whiteboard/boards/{id}/share` → `BoardShareController` (module whiteboard, schéma `collaboratif`)
- Endpoint : `DELETE /api/whiteboard/boards/{id}/share/{tokenId}`
- Entité `board_share_token` : `{ id, boardId, tokenHash (SHA-256), role, maxUses, useCount, expiresAt, revokedAt, createdBy }`
- **Point à trancher côté produit (non tranché ici)** : valeur par défaut du TTL si l'appelant ne précise pas de durée (ex. 7 jours) — actuellement seul "TTL configurable" est spécifié, pas de valeur par défaut ni de TTL maximum autorisé. À clarifier avant implémentation (PO Agent ou Architect Agent).
- Cohérence à maintenir avec US08.2.2 (vérification du token à la jointure) et US08.2.3 (affichage/révocation du lien côté UI) : même format de rôle (EDITOR/VIEWER), même mécanisme de hachage du token.

---
Item Type: US · Parent: F08.2 · Module: whiteboard · Phase: Socle · Size: S · Priority: High
Stage: ✅
Rôle: utilisateur-final
