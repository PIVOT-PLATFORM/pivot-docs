# US16.3.1 — Page contact

> **Statut** : 🔎 Review — implémentation complète et **mergée sur `main`** (backend `pivot-core`
> PR [#112](https://github.com/PIVOT-PLATFORM/pivot-core/pull/112), frontend `pivot-ui` PR
> [#48](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/48) + [#87](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/87)),
> branches supprimées post-merge. `Stage: Review` reflète la recette PO restante avant
> `Stage: Done` (mainteneur), pas un merge en attente — resynchronisé le 2026-07-08.

**En tant que** utilisateur (connecté ou non)
**Je veux** envoyer un message à l'équipe PIVOT via un formulaire
**Afin d'** obtenir de l'aide ou signaler un problème

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
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
- Frontend : `ContactComponent` (`pivot-ui`, `src/app/features/contact/`) → `ContactApiService.submit()`,
  routé authentifié (shell) + fallback public (accessible sans connexion)
- Tests : `TranslocoTestingModule.forRoot()` depuis `@jsverse/transloco` (pas subpath)
- Backend (`pivot-core`) : `ContactController.POST /contact` → `ContactService` → email de
  confirmation i18n
- DTO : `ContactRequestDto { email, message, lang }` → validation `@Valid`
- Rate limiting confirmé dans le code mergé : **5 req/10min par IP** (`RateLimiterService`,
  `HttpStatus.ACCEPTED` en succès, `RateLimitException` au-delà du seuil)

---
Item Type: US · Parent: F16.3 · Module: core · Phase: Socle · Size: M · Priority: Low
Stage: Review
