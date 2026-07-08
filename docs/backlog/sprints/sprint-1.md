# Sprint 1 — Auth & Shell Socle ✅ Terminé (14/14)

| US | Titre | 🤖 Dev |
|----|-------|--------|
| US01.1.1 | Connexion email + mot de passe | ✅ |
| US01.1.2 | Déconnexion | ✅ |
| US01.1.3 | Rester connecté (remember-me) | ✅ |
| US01.2.1 | Inscription | ✅ |
| US01.2.2 | Vérification email | ✅ |
| US01.2.3 | Renvoi lien activation | ✅ |
| US01.3.1 | Demande réinitialisation mot de passe | ✅ |
| US01.3.2 | Réinitialisation par token | ✅ |
| US01.4.1 | Confirmation appareil inconnu par OTP | ✅ |
| F01.6 | Connexion Google OAuth2 | ✅ |
| F01.7/F01.8 | OIDC enterprise + JIT + session restore | ✅ |
| US16.1.1 | Navigation principale | ✅ |
| US16.1.2 | Menu utilisateur | ✅ |
| US16.2.1 | Page d'accueil (grille modules) | ✅ |
| US16.4.1 | Thème clair / sombre | ✅ |
| Pages légales | ML + PC + CGU | ✅ |
| Footer + i18n | Footer + Transloco FR/EN | ✅ |
| Dashboard utilisateur | Accueil connecté | ✅ |
| Pages Bientôt disponible | Modules non activés | ✅ |
| US16.3.1 | Formulaire de contact | ✅ |

> **US16.3.1 (2026-07-08, resynchronisé)** — le tableau et `us-formulaire-contact.md` affichaient
> encore `🔎 Review — en attente de merge`, information périmée : vérification directe du code sur
> `main` confirme que le backend (`ContactController`/`ContactService`/`ContactRequestDto`,
> rate limiting 5 req/10min par IP, emails i18n) est mergé via `pivot-core` PR
> [#112](https://github.com/PIVOT-PLATFORM/pivot-core/pull/112), et que le frontend
> (`ContactComponent` réellement câblé à `ContactApiService.submit()` → `POST /api/contact`,
> routé authentifié + fallback public) est mergé via `pivot-ui` PR
> [#48](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/48) et
> [#87](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/87). Les deux branches `feat/us16-3-1-contact`
> sont supprimées post-merge sur les deux repos. `Stage: Review` reste correct dans le fichier US
> (recette PO restante avant `Stage: Done`, cf. convention resync Sprint 3) — voir `sprint-6.md`
> Axe 3.
