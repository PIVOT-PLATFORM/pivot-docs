# US08.2.2 — Utilisateur rejoint un tableau via token

**En tant que** utilisateur invité
**Je veux** rejoindre un tableau en utilisant un lien d'invitation
**Afin d'** accéder à l'espace de collaboration

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|-------|
| POST /api/whiteboard/join?token={token} ajoute l'utilisateur au tableau avec le rôle du token | ⬜ |
| 401 si non authentifié → redirection login puis retour au lien | ⬜ |
| 404/410 si token expiré ou invalide | ⬜ |
| 409 si utilisateur déjà membre (idempotent) | ⬜ |
| Tests TI POST /api/whiteboard/join | ⬜ |
| POST /api/whiteboard/join?token={token} vérifie que l'utilisateur authentifié appartient au même tenant que l'owner du tableau. Utilisateur cross-tenant → 403 | ⬜ |
| Le token d'invitation est un opaque token SecureRandom 256 bits, stocké hashé SHA-256 en BDD | ⬜ |
| Rate limit sur POST /api/whiteboard/join : 10 tentatives / heure par userId ET par IP → 429. Tentatives échouées répétées → audit event SuspiciousJoinAttempt | ⬜ |
| La comparaison du token d'invitation hashé utilise une comparaison à temps constant (MessageDigest.isEqual en Java) | ⬜ |

---
Item Type: US · Parent: F08.2 · Module: whiteboard · Phase: MVP · Size: S · Priority: High
Stage: Backlog
