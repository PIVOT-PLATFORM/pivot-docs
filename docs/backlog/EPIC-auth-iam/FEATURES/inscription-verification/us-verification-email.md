# US01.2.2 — Vérification email

**En tant que** utilisateur ayant reçu l'email de vérification
**Je veux** cliquer le lien pour activer mon compte
**Afin de** pouvoir me connecter

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|-------|
| `GET /api/auth/verify?token=xxx` → compte passé à `ACTIVE` | ✅ |
| Token valide → redirection `/auth/login` avec banner succès "Compte activé !" | ✅ |
| Token expiré (> 24h) → page d'erreur avec bouton "Renvoyer un lien" | ✅ |
| Token inconnu → page d'erreur générique (ne révèle pas l'existence du compte) | ✅ |
| Token SHA-256 stocké en BDD, supprimé après utilisation | ✅ |
| Clés i18n dans l'espace `auth.verifyEmail.*` (fr.json / en.json) — bannière succès, pages d'erreur, bouton renvoi | ⬜ |
| A11y : page de résultat (succès ou erreur) annonce le statut via `role="status"` ou `role="alert"` selon le cas | ⬜ |

## Notes d'implémentation
- `VerifyEmailComponent` lit le `token` query param
- Appelle `GET /api/auth/verify-email?token=xxx`
- Route Angular : `/auth/verify-email`

---
Item Type: US · Parent: F01.2 · Module: auth · Phase: MVP · Size: S · Priority: Critical
Stage: Done
