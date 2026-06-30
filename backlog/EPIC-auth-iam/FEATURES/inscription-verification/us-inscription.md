# US01.2.1 — Inscription

**En tant que** visiteur
**Je veux** créer un compte avec mon email et un mot de passe
**Afin d'** accéder à la plateforme PIVOT

## Critères d'acceptation

| Critère | 🤖 Dev | ✅ PO |
|---------|--------|-------|
| Formulaire : email, password, confirm password | ✅ | ✅ |
| Email déjà utilisé → réponse générique "Un email vous a été envoyé" (anti-énumération) | ✅ | ✅ |
| Inscription réussie → email de vérification envoyé, compte en état `PENDING` | ✅ | ✅ |
| Password trop court (< 8 chars) → erreur de validation | ✅ | ✅ |
| Passwords non identiques → erreur de validation | ✅ | ✅ |
| Email format invalide → erreur de validation | ✅ | ✅ |
| Password haché BCrypt-12 en BDD — jamais en clair | ✅ | ✅ |
| A11y : labels, messages d'erreur, focus management | ✅ | ✅ |
| Clés i18n dans l'espace `auth.register.*` (fr.json / en.json) — libellés, erreurs, messages de succès | ⬜ | ⬜ |
| État de chargement (bouton désactivé + spinner) pendant la requête POST /api/auth/register | ⬜ | ⬜ |
| Rate limiting sur POST /api/auth/register (voir EN01.x) — endpoint sensible à l'abus | ⬜ | ⬜ |

---
Item Type: US · Parent: F01.2 · Module: auth · Phase: MVP · Size: M · Priority: Critical
Human Gate: human-validated · Stage: Done
