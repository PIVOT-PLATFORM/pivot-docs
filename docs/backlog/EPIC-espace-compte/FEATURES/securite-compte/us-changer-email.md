# US02.2.2 — Changer son e-mail

**En tant que** utilisateur connecté
**Je veux** changer mon adresse e-mail
**Afin de** mettre à jour mon identifiant de connexion

## Critères d'acceptation

| Critère | 🤖 Dev | ✅ PO |
|---------|--------|-------|
| POST /api/account/email envoie lien de confirmation vers la nouvelle adresse | ⬜ | ⬜ |
| L'email actuel est conservé jusqu'à confirmation depuis la nouvelle adresse | ⬜ | ⬜ |
| Lien de confirmation à usage unique, TTL 24h | ⬜ | ⬜ |
| Email de notification envoyé à l'ancienne adresse après changement | ⬜ | ⬜ |
| La nouvelle adresse ne doit pas déjà exister en BDD (409 si doublon) | ⬜ | ⬜ |
| Formulaire Angular avec validation email + mot de passe actuel | ⬜ | ⬜ |
| Réponse POST /api/account/email toujours 202 Accepted, qu'il y ait doublon ou non. Message d'erreur de doublon envoyé uniquement à la nouvelle adresse, jamais exposé dans le body HTTP | ⬜ | ⬜ |
| Token de confirmation : SecureRandom 256 bits, hashé SHA-256 en BDD (raw jamais persisté). Invalidé après premier clic valide. Second clic → 410 Gone | ⬜ | ⬜ |
| POST /api/account/email requiert mot de passe actuel dans le body. Rate limit : 3 tentatives / heure par userId → 429 | ⬜ | ⬜ |
| Connexion avec le nouvel email avant confirmation → 401 (email non encore actif) | ⬜ | ⬜ |
| Lien expiré → page d'erreur dédiée avec bouton "Refaire la demande" | ⬜ | ⬜ |
| Une nouvelle demande de changement d'email annule la précédente | ⬜ | ⬜ |
| Tests TU EmailChangeService + TI POST /api/account/email + TI GET /api/account/email/confirm | ⬜ | ⬜ |
| Après soumission réussie, page affiche état "Email envoyé" avec instruction claire — pas uniquement un toast | ⬜ | ⬜ |
| Pendant soumission, bouton disabled + spinner | ⬜ | ⬜ |
| Champ email : autocomplete="email" ; champ mot de passe : autocomplete="current-password" | ⬜ | ⬜ |
| Erreurs de validation annoncées via role="alert" et aria-describedby | ⬜ | ⬜ |
| Tous textes internalisés dans account.security.email.* (fr.json / en.json) | ⬜ | ⬜ |

---
Item Type: US · Parent: F02.2 · Module: auth · Phase: MVP · Size: M · Priority: Medium
Human Gate: human-validated · Stage: Backlog
