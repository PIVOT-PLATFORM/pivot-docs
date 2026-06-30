# US01.1.4 — Redirection post-login

**En tant que** utilisateur
**Je veux** être redirigé vers la page que je tentais d'accéder avant d'être renvoyé au login
**Afin de** ne pas perdre mon contexte de navigation

## Critères d'acceptation

| Critère | 🤖 Dev | ✅ PO |
|---------|--------|-------|
| L'URL d'origine est conservée dans un `returnUrl` query param ou en session Angular | ⬜ | ⬜ |
| Après login réussi, redirection vers `returnUrl` si valide (même domaine) | ⬜ | ⬜ |
| Si pas de `returnUrl`, redirection vers /home | ⬜ | ⬜ |
| Open redirect bloqué (validation que returnUrl est sur le même origine) | ⬜ | ⬜ |
| Tests Vitest AuthGuard avec returnUrl | ⬜ | ⬜ |
| Priority order: query param ?returnUrl takes precedence over session Angular; if both present, query param wins | ⬜ | ⬜ |
| La valeur returnUrl n'est pas persistée au-delà de la tentative de navigation | ⬜ | ⬜ |
| Si returnUrl pointe vers une route inexistante → redirection /home | ⬜ | ⬜ |
| returnUrl n'accepte que des URLs relatives internes (commence par /). Valeur absolue ou externe ignorée → redirection / par défaut | ⬜ | ⬜ |
| Si résolution du returnUrl prend > 500ms (guard async), indicateur de chargement affiché | ⬜ | ⬜ |
| Spinner/loader de redirection a role="status" et aria-label="Chargement en cours..." annoncé aux lecteurs d'écran | ⬜ | ⬜ |

---
Item Type: US · Parent: F01.1 · Module: auth · Phase: MVP · Size: S · Priority: Medium
Human Gate: human-validated · Stage: Backlog
