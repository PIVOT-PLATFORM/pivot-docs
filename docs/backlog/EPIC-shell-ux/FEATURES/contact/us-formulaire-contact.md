# US16.3.1 — Page contact

> **Branche active** : `feat/us16-3-1-contact` (pivot-ui + pivot-core)
> **Statut** : 🔄 En cours — implémentation complète, en attente de validation PO + merge

**En tant que** utilisateur (connecté ou non)
**Je veux** envoyer un message à l'équipe PIVOT via un formulaire
**Afin d'** obtenir de l'aide ou signaler un problème

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|-------|
| Page `/contact` avec champs email et message | ✅ |
| Validation email (requis + format) et message (requis) avec messages d'erreur i18n | ✅ |
| Soumission → `POST /api/contact` avec `{ email, message, lang }` | ✅ |
| Backend : 202 Accepted + email de confirmation envoyé à l'expéditeur | ✅ |
| Email de confirmation i18n FR/EN selon le champ `lang` | ✅ |
| Succès → message de confirmation, formulaire masqué | ✅ |
| Erreur API → message d'erreur avec email de contact direct | ✅ |
| État `loading` → bouton désactivé "Envoi en cours…" | ✅ |
| Tous les textes i18n FR/EN (titre, labels, placeholders, bouton, messages) | ✅ |
| A11y : `<main aria-label="Page de contact">`, hierarchy h1>h2, `role="alert"` erreurs | ✅ |
| Tests Vitest : mount, validation, POST call, succès, erreur API, A11y | ✅ |

## Hors périmètre
- Pièces jointes
- Formulaire de contact admin (gestion des messages reçus → backlog futur)

## Notes d'implémentation
- Frontend : `ContactComponent` — `src/app/features/contact/`
- Tests : `TranslocoTestingModule.forRoot()` depuis `@jsverse/transloco` (pas subpath)
- Backend : `ContactController.POST /api/contact` → `ContactService` → `EmailService.sendContactConfirmation()`
- DTO : `ContactRequest { email, message, lang }` → validation `@NotBlank`, `@Email`, `@Size(max=2000)`
- Rate limiting (à valider : 5 req/15min par IP) → EN02.x ou règle SecurityConfig

---
Item Type: US · Parent: F16.3 · Module: core · Phase: MVP · Size: M · Priority: Low
Human Gate: human-validated · Stage: Review
