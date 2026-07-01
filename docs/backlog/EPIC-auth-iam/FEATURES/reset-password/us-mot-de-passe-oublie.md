# US01.3.1 — Mot de passe oublié (demande)

**En tant que** utilisateur ayant oublié son mot de passe
**Je veux** soumettre mon email pour recevoir un lien de réinitialisation
**Afin de** récupérer l'accès à mon compte

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|-------|
| Page `/auth/forgot-password` avec champ email | ✅ |
| Email connu → token reset généré (TTL 1h), email envoyé avec lien | ✅ |
| Email inconnu → réponse générique "Si un compte existe, un email vous a été envoyé" (anti-énumération) | ✅ |
| Token SHA-256 stocké en BDD, TTL 1h | ✅ |
| Rate limiting sur POST /api/auth/forgot-password — au plus 3 demandes par heure par adresse email (voir EN01.x) | ⬜ |
| Clés i18n dans l'espace `auth.forgotPassword.*` (fr.json / en.json) — libellés, messages de confirmation | ⬜ |
| État de chargement (bouton désactivé + spinner) pendant la requête; résultat affiché via `role="status"` | ⬜ |

---
Item Type: US · Parent: F01.3 · Module: auth · Phase: MVP · Size: S · Priority: Critical
Human Gate: human-validated · Stage: Done
