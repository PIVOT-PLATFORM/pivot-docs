# F01.2 — Inscription & vérification email

**Description** : Permettre à un utilisateur de créer un compte (email + password), recevoir un email de vérification, valider son compte, et renvoyer le lien d'activation si expiré.

**Bénéfice utilisateur** : Accès sécurisé avec vérification d'identité email.

**US rattachées** :
- [US01.2.1 — Inscription](us-inscription.md) ✅
- [US01.2.2 — Vérification email](us-verification-email.md) ✅
- [US01.2.3 — Renvoi lien activation](us-renvoi-lien-activation.md) ✅

**Critères de succès** :
- [x] Inscription → email de vérification envoyé, compte inactif jusqu'à validation
- [x] Token de vérification : 24h TTL, SHA-256 BDD
- [x] Validation → compte actif, redirection login avec message succès
- [x] Compte déjà existant → réponse générique (anti-énumération)
- [x] Renvoi lien si token expiré
