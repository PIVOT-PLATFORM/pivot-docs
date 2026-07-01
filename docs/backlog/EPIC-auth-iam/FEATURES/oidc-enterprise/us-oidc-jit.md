# US01.7.2 — Provisionnement JIT utilisateur OIDC

**En tant que** utilisateur enterprise se connectant pour la première fois via SSO
**Je veux** que mon compte PIVOT soit créé automatiquement
**Afin de** ne pas dépendre d'un processus d'invitation manuel

## Critères d'acceptation

| Critère | 🤖 Dev | ✅ PO |
|---------|--------|-------|
| Première connexion OIDC → `User` créé avec `AuthMethod.OIDC`, `oidcSubject = sub` | ✅ | ✅ |
| Claims mappés : email, prénom/nom selon `TenantOidcConfig.claimsMapping` | ✅ | ✅ |
| JIT provisionnement configurable par tenant (`jitEnabled: true/false`) | ✅ | ✅ |
| JIT désactivé → 403 si utilisateur non pré-provisionné | ✅ | ✅ |
| Connexions suivantes → `User` existant retrouvé via `oidcSubject` | ✅ | ✅ |
| Rôle assigné selon mapping claims OIDC (ou rôle par défaut `ROLE_USER`) | ✅ | ✅ |

---
Item Type: US · Parent: F01.7 · Module: oidc · Phase: v1-enterprise · Size: M · Priority: High
Human Gate: human-validated · Stage: Done
