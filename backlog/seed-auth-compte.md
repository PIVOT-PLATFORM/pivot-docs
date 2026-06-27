# Seed backlog — Auth & Compte (patterns classiques)

> Items **originaux PIVOT**, inspirés de patterns d'authentification/compte « classiques »
> (génériques, non spécifiques à un produit tiers). Sert de **source de seed** pour le Project
> org (vague MVP). Statut : `✅ fait` (livré via US-AUTH-002) · `⬜ à faire` · `🔄 partiel`.
> Phase par défaut = **MVP** sauf indication (verrou MVP actif — cf. `README.md` §6).

---

## EPIC E01 — Authentification & IAM
Module : `auth` · Phase : MVP

### FEATURE F01.1 — Connexion / session
| Clé | US | Statut | Size |
|-----|----|--------|------|
| US01.1.1 | Connexion email + mot de passe | ✅ fait | M |
| US01.1.2 | Déconnexion (révocation token + cookie) | ⬜ à faire | S |
| US01.1.3 | Rester connecté (remember-me, TTL étendu) | 🔄 partiel | S |
| US01.1.4 | Redirection post-login vers la cible demandée | ⬜ à faire | S |
| US01.1.5 | Expiration de session côté front + auto-logout | 🔄 partiel (`millisUntilExpiry`) | M |

### FEATURE F01.2 — Inscription & vérification
| Clé | US | Statut | Size |
|-----|----|--------|------|
| US01.2.1 | Inscription (création compte, email de vérification) | ✅ fait | M |
| US01.2.2 | Vérification d'email via lien | ✅ fait | S |
| US01.2.3 | Renvoi du lien de vérification | ✅ fait | S |
| US01.2.4 | Politique de robustesse mot de passe (longueur, classes) | 🔄 partiel (front) | S |

### FEATURE F01.3 — Réinitialisation mot de passe
| Clé | US | Statut | Size |
|-----|----|--------|------|
| US01.3.1 | Demande de réinitialisation (no-enumeration) | ✅ fait | S |
| US01.3.2 | Réinitialisation via token à usage unique | ✅ fait | S |

### FEATURE F01.4 — MFA par appareil
| Clé | US | Statut | Size |
|-----|----|--------|------|
| US01.4.1 | OTP à la connexion depuis un appareil inconnu | ✅ fait | M |
| US01.4.2 | Gestion des appareils de confiance (lister/révoquer) | ⬜ à faire | M |
| US01.4.3 | Alerte e-mail sur connexion suspecte / nouvel appareil | ⬜ à faire | S |

### FEATURE F01.5 — Notifications de sécurité
| Clé | US | Statut | Size |
|-----|----|--------|------|
| US01.5.1 | E-mail de confirmation sur action sensible (mdp, email, MFA) | ⬜ à faire | S |

### ENABLERS (auth)
| Clé | Enabler | Statut | Size |
|-----|---------|--------|------|
| EN01.6 | Rate-limiting des endpoints auth (429) | 🔄 à confirmer | S |
| EN01.7 | Anti-énumération (réponses génériques) | ✅ fait | S |
| EN01.8 | Opaque tokens + TTL en BDD (SHA-256) | ✅ fait (core) | M |
| EN01.9 | Invalidation de session (logout global, sur changement mdp) | ⬜ à faire | M |
| EN01.10 | En-têtes de sécurité (CSP, HSTS) nginx | ⬜ à faire | S |
| EN01.11 | OIDC multi-tenant (PKCE S256, JWKS) | 🔄 partiel (stubs) | L · v1-enterprise |

---

## EPIC E02 — Espace compte
Module : `auth` / `admin` · Phase : MVP

### FEATURE F02.1 — Profil
| Clé | US | Statut | Size |
|-----|----|--------|------|
| US02.1.1 | Voir / éditer ses informations de profil | ⬜ à faire | S |
| US02.1.2 | Préférence de langue (persistée) | 🔄 partiel (front `pivot_lang`) | XS |

### FEATURE F02.2 — Sécurité du compte
| Clé | US | Statut | Size |
|-----|----|--------|------|
| US02.2.1 | Changer son mot de passe (ré-auth + invalidation autres sessions) | ⬜ à faire | M |
| US02.2.2 | Changer son e-mail (vérification du nouvel e-mail) | ⬜ à faire | M |
| US02.2.3 | Voir et révoquer ses sessions actives | ⬜ à faire | M |
| US02.2.4 | Suppression de compte (RGPD, avec garde-fous) | ⬜ à faire | M |
| US02.2.5 | Réactivation de compte (avant purge définitive) | ⬜ à faire | S · v1-enterprise |

### FEATURE F02.3 — Droits RGPD
| Clé | US | Statut | Size |
|-----|----|--------|------|
| US02.3.1 | Export de ses données personnelles (portabilité) | ⬜ à faire | M |

### ENABLERS (compte / RGPD)
| Clé | Enabler | Statut | Size |
|-----|---------|--------|------|
| EN02.4 | Purge des comptes inactifs (détection + avertissement + purge) | ⬜ à faire | L · v1-enterprise |
| EN02.5 | Cron / job planifié RGPD | ⬜ à faire | S · v1-enterprise |

---

## Notes

- **Non spécifique produit** : volontairement exclus les patterns liés à un domaine tiers
  (vérification d'âge, catalogue, e-commerce, adresses de livraison, etc.).
- Les US `✅ fait` sont rattachées à **US-AUTH-002** (déjà livrée sur `feature/auth`).
- AC + critères de non-acceptation + notes d'implémentation seront rédigés par US au moment
  du seed dans le Project (template §4 de `README.md`), avant passage `Human Gate = validated`.
- Tout ce qui est `v1-enterprise` reste **verrouillé** tant que le MVP n'est pas déclaré terminé.
