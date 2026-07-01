# US01.2.3 — Renvoi lien d'activation

**En tant que** utilisateur dont le lien d'activation a expiré
**Je veux** demander un nouveau lien
**Afin de** finaliser mon inscription

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|-------|
| Page `/auth/resend-activation` avec champ email | ✅ |
| Email connu + compte PENDING → nouveau token généré, ancien invalidé, email envoyé | ✅ |
| Email inconnu ou compte déjà ACTIVE → réponse générique (anti-énumération) | ✅ |
| Renvoi silencieux depuis le flux de connexion (compte non vérifié détecté) | ✅ |
| Rate limiting sur POST /api/auth/resend-activation — au plus 3 renvois par heure par adresse email | ⬜ |
| Token de renvoi : 256-bit SecureRandom, SHA-256 stocké en BDD (même entropie que le token initial) | ⬜ |
| Clés i18n dans l'espace `auth.resendActivation.*` (fr.json / en.json) | ⬜ |

---
Item Type: US · Parent: F01.2 · Module: auth · Phase: MVP · Size: XS · Priority: High
Human Gate: human-validated · Stage: Done
