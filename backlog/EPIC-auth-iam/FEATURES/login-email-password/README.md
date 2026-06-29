# F01.1 — Connexion email/password

**Description** : Permettre à un utilisateur de se connecter avec son email et mot de passe. Token opaque 256-bit retourné, envoyé via cookie HttpOnly. Option "Se souvenir de moi" pour une session longue durée.

**Bénéfice utilisateur** : Accès sécurisé à l'espace personnel PIVOT sans exposition de credentials.

**US rattachées** :
- [US01.1.1 — Connexion](us-connexion.md) ✅
- [US01.1.2 — Déconnexion](us-deconnexion.md) ✅
- [US01.1.3 — Se souvenir de moi](us-remember-me.md) ✅

**Critères de succès** :
- [x] Connexion réussie → token opaque posé en HttpOnly cookie + redirection vers home
- [x] Credentials invalides → message générique anti-énumération
- [x] Compte non vérifié → renvoi silencieux du lien d'activation
- [x] "Se souvenir de moi" → TTL 30j (vs 24h par défaut)
- [x] Déconnexion → token révoqué en BDD, cookie supprimé

**Hors périmètre** :
- Social login (Google OAuth) → post-MVP
- SSO OIDC enterprise → v1-enterprise
