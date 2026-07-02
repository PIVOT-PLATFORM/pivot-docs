# US08.2.1 — Owner partage un tableau par lien public

**En tant que** owner d'un tableau
**Je veux** générer un lien d'invitation pour partager mon tableau
**Afin que** d'autres utilisateurs puissent le rejoindre

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|-------|
| POST /api/whiteboard/boards/{id}/share génère un token d'invitation (TTL configurable) | ⬜ |
| Rôle assigné au token : EDITOR ou VIEWER | ⬜ |
| Lien : `{baseUrl}/whiteboard/join?token={token}` | ⬜ |
| Token révocable (DELETE /api/whiteboard/boards/{id}/share/{tokenId}) | ⬜ |
| Tests TI POST + DELETE share | ⬜ |
| POST /api/whiteboard/boards/{id}/share vérifie que l'utilisateur courant est OWNER du tableau {id}. Rôle EDITOR ou VIEWER → 403. Test TI inclut appel par VIEWER → 403 | ⬜ |
| Le token d'invitation peut être configuré avec un usage maximum (maxUses : 1 à N). Par défaut maxUses = 1 (lien à usage unique). Dépassement du quota → 410 Gone | ⬜ |
| Le tenantId est extrait du TenantContext du token porteur — le tableau ne peut pas être partagé avec des utilisateurs d'un autre tenant | ⬜ |
| Audit event BoardShared enregistré avec boardId, inviterId, role, expiresAt | ⬜ |

---
Item Type: US · Parent: F08.2 · Module: whiteboard · Phase: MVP · Size: S · Priority: High
Stage: Backlog
