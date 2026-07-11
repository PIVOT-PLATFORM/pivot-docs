# US01.3.1 — Mot de passe oublié (demande)

**En tant que** utilisateur ayant oublié son mot de passe
**Je veux** soumettre mon email pour recevoir un lien de réinitialisation
**Afin de** récupérer l'accès à mon compte

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Page `/auth/forgot-password` avec champ email | ✅ |
| Email connu → token reset généré (TTL 1h), email envoyé avec lien | 🟡 TTL réel 15 min, pas 1h |
| Email inconnu → réponse générique "Si un compte existe, un email vous a été envoyé" (anti-énumération) | ✅ |
| Token SHA-256 stocké en BDD, TTL 1h | 🟡 TTL réel 15 min, pas 1h |
| Rate limiting sur POST /api/auth/forgot-password — au plus 3 demandes par heure par adresse email (voir EN01.x) | ⬜ implémenté par IP (5/h), pas par email |
| Clés i18n dans l'espace `auth.forgotPassword.*` (fr.json / en.json) — libellés, messages de confirmation | ✅ (sous `auth.forgot_password.*`) |
| État de chargement (bouton désactivé + spinner) pendant la requête; résultat affiché via `role="status"` | 🟡 spinner OK, `role="status"` absent |

---
Item Type: US · Parent: F01.3 · Module: auth · Phase: Socle · Size: S · Priority: Critical
Stage: ✅
Rôle: utilisateur-final
Gate 5 : `pivot-core` PR [#105](https://github.com/PIVOT-PLATFORM/pivot-core/pull/105) (87/100) +
`pivot-ui` PR [#39](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/39) (86/100) — lot MVP E01,
implémentation d'origine dans `pivot-core` [#67](https://github.com/PIVOT-PLATFORM/pivot-core/pull/67)
+ `pivot-ui` [#11](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/11), spec figée
`docs/specs/EPIC-auth-iam/us01-3-1-mot-de-passe-oublie.md` (rétroactif, 2026-07-08)
