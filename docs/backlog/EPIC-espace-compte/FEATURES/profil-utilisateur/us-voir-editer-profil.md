# US02.1.1 — Voir et éditer son profil

**En tant que** utilisateur connecté
**Je veux** consulter et modifier mon profil (prénom, nom, avatar)
**Afin de** maintenir mes informations à jour

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| GET /api/account/profile retourne les infos du compte (prénom, nom, email, avatar) | ✅ |
| PATCH /api/account/profile met à jour prénom et nom | ✅ |
| Upload avatar (multipart/form-data) stocké, URL retournée | ✅ |
| Page `/account/profile` Angular affiche et permet l'édition | ✅ |
| Formulaire réactif avec validation (prénom/nom obligatoires) | ✅ |
| Message de succès après sauvegarde | ✅ |
| Tests TU ProfileService + TI GET/PATCH | ✅ |
| PATCH /api/account/profile rejette le champ email avec 400 s'il est fourni (modification email → US02.2.2) | ✅ |
| Prénom/nom : max 100 caractères, strip HTML côté backend (XSS protection — nom affiché à d'autres utilisateurs) | ✅ |
| Upload avatar : formats acceptés JPEG/PNG/WEBP, taille max 2 Mo ; format invalide ou taille dépassée → message d'erreur accessible (role="alert") sous le champ | ✅ |
| Avatar non défini → retourne null ; frontend utilise l'avatar initiales | ✅ |
| Pendant la sauvegarde, bouton "Enregistrer" désactivé + spinner (empêche double soumission) | ✅ |
| Si aucun changement effectué, bouton "Enregistrer" reste désactivé | ✅ |
| En cas d'erreur réseau lors du PATCH, toast "error" avec message localisé FR/EN | ✅ |
| Formulaire : chaque champ a <label> explicite via for/id ; erreurs de validation annoncées via aria-describedby + role="alert" | ✅ |
| Focus retourné sur le premier champ en erreur après tentative de soumission invalide | ✅ |
| Tous labels, placeholders, messages succès/erreur internalisés (clés i18n account.profile.* dans fr.json / en.json) | ✅ |

## Hors périmètre
- Suppression de compte → US02.2.4
- Préférence de langue → US02.1.2

## Notes de livraison

- Implémenté : `pivot-core` PR [#129](https://github.com/PIVOT-PLATFORM/pivot-core/pull/129) **mergée** (Gate 2 self-évalué : 92/100) · `pivot-ui` PR [#71](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/71) **ouverte, non mergée** (Gate 2 self-évalué : 92/100 — détail dans la PR).
- Stockage avatar : filesystem local, chemin configurable (`pivot.storage.avatars.base-path` / `PIVOT_AVATAR_STORAGE_PATH`) — choix Socle justifié pour une plateforme auto-hébergeable ; à revoir pour un déploiement multi-instance sans volume partagé.
- Bug corrigé en cours de revue : un test unitaire (`TokenAuthenticationFilterTest`) polluait `SecurityContextHolder` entre tests, masquant un 403 attendu sur l'upload avatar sans token — corrigé (`@AfterEach SecurityContextHolder.clearContext()`), plus un correctif CodeQL (regex `HtmlStripper` en temps linéaire, était potentiellement O(n²) sur entrée adversariale).
- Tests E2E Playwright différés (environnement E2E indisponible lors de l'implémentation) — à compléter en suivi.

---
Item Type: US · Parent: F02.1 · Module: auth · Phase: Socle · Size: S · Priority: Medium
Stage: In progress
