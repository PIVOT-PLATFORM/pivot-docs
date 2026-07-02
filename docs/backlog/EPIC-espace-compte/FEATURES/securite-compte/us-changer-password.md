# US02.2.1 — Changer son mot de passe

**En tant que** utilisateur connecté
**Je veux** changer mon mot de passe depuis mon espace compte
**Afin de** maintenir la sécurité de mon compte

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|-------|
| POST /api/account/password exige mot de passe actuel (vérification) | ⬜ |
| Nouveau mot de passe validé selon politique de robustesse (US01.2.4) | ⬜ |
| Tous les tokens de session existants révoqués après changement | ⬜ |
| Email de confirmation de changement de mot de passe envoyé | ⬜ |
| Formulaire Angular : ancien mdp, nouveau mdp, confirmation | ⬜ |
| Rate limiting sur l'endpoint (5 tentatives/15min) | ⬜ |
| Tests TU PasswordService + TI POST | ⬜ |
| POST /api/account/password n'accepte aucun champ userId/accountId — identité extraite du token porteur uniquement. Champ inattendu dans body → 400 | ⬜ |
| Révocation post-changement inclut le token courant ; nouveau token émis et retourné dans la réponse 200 | ⬜ |
| Rate limiting par userId ET par IP indépendamment : 5 tentatives / 15 min → 429 avec Retry-After. Message 429 indistinguable de "mot de passe incorrect" (anti-énumération) | ⬜ |
| La session courante est préservée après changement (seules les autres sessions révoquées) | ⬜ |
| Dépendance : US01.2.4 (politique password) — règles de complexité validées côté backend | ⬜ |
| Dépendance : US01.5.1 (email confirmation) — email envoyé après changement réussi | ⬜ |
| Bouton "Enregistrer" désactivé tant que les 3 champs ne sont pas remplis et valides | ⬜ |
| Mot de passe actuel incorrect (401 backend) → message d'erreur inline sur le champ concerné avec role="alert" — pas de toast générique | ⬜ |
| Pendant soumission, bouton disabled + spinner | ⬜ |
| Chaque champ mot de passe : bouton "Afficher/masquer" avec aria-label adapté ("Afficher le mot de passe" / "Masquer le mot de passe") | ⬜ |
| PasswordStrengthComponent (US01.2.4) réutilisé ici ; changements de niveau annoncés via aria-live="polite" | ⬜ |
| Messages d'erreur de validation liés aux champs via aria-describedby | ⬜ |
| Tous textes internalisés dans account.security.password.* (fr.json / en.json) | ⬜ |

---
Item Type: US · Parent: F02.2 · Module: auth · Phase: MVP · Size: M · Priority: High
Stage: Backlog
