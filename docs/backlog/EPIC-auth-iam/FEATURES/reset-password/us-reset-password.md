# US01.3.2 — Réinitialisation du mot de passe

**En tant que** utilisateur ayant reçu le lien de reset
**Je veux** définir un nouveau mot de passe
**Afin de** retrouver l'accès à mon compte

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|-------|
| Page `/auth/reset-password?token=xxx` avec champs nouveau password + confirm | ✅ |
| Token valide → password mis à jour (BCrypt-12), token invalidé, redirection login | ✅ |
| Token expiré (> 1h) → message d'erreur + lien "Demander un nouveau lien" | ✅ |
| Token inconnu → erreur générique | ✅ |
| Ancien token utilisé → 400 (token déjà consommé) | ✅ |
| Password trop court → validation avant appel API | ✅ |
| Toutes les sessions actives de l'utilisateur révoquées après reset | ✅ |
| Clés i18n dans l'espace `auth.resetPassword.*` (fr.json / en.json) — libellés, erreurs token, succès | ⬜ |
| A11y : erreurs de validation (token expiré, passwords différents) affichées avec `role="alert"` et focus géré | ⬜ |
| État de chargement (bouton désactivé + spinner) pendant la soumission du nouveau mot de passe | ⬜ |

---
Item Type: US · Parent: F01.3 · Module: auth · Phase: MVP · Size: S · Priority: Critical
Human Gate: human-validated · Stage: Done
