# US01.5.1 — E-mail de confirmation d'action sensible

**En tant que** utilisateur
**Je veux** recevoir un email de confirmation après chaque action sensible (changement mdp, email, suppression compte)
**Afin de** être alerté immédiatement si une action a été faite sans mon consentement

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|-------|
| Email envoyé après : changement mdp, changement email, suppression compte, révocation session | ⬜ |
| Email contient : action effectuée, date/heure, IP, lien "Pas moi → sécuriser mon compte" | ⬜ |
| Envoi asynchrone (pas de blocage de la requête API) | ⬜ |
| Template email i18n FR/EN | ⬜ |
| Tests TU SecurityNotificationService (mock EmailService) | ⬜ |
| Le lien "Pas moi" dans l'email redirige vers une URL définie : /account/security (page sécurité compte) avec paramètre ?action=report-suspicious | ⬜ |
| La révocation en masse de sessions (DELETE /api/account/sessions) génère un seul email récapitulatif, pas un email par session | ⬜ |
| L'email contient le type d'action dans le sujet (ex: "Votre mot de passe PIVOT a été modifié", "Connexion depuis un nouvel appareil") | ⬜ |

---
Item Type: US · Parent: F01.5 · Module: auth · Phase: MVP · Size: S · Priority: Medium
Stage: Backlog
