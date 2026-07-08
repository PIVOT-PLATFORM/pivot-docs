# US16.1.2 — Menu utilisateur (avatar, nom, déconnexion)

## Contexte

- **US** : `docs/backlog/EPIC-shell-ux/FEATURES/navigation/us-menu-utilisateur.md` (F16.1 —
  Navigation, EPIC-shell-ux E16)
- **PR** : `pivot-ui` [#49](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/49)
  (`feat/us16-1-shell-navbar`) — PR conjointe qui livre **aussi** US16.1.1 (Navigation principale) ;
  les deux US partagent le même composant `NavbarComponent` et le même commit de figeage
- **Dernier commit au moment du figeage** : `f63d423` (squash merge sur `main`, 25 fichiers,
  +1032/-260 lignes, 33 commits de travail compactés)
- **Gate 2 COVERAGE** : SonarCloud 94.4–94.5 % coverage new code · `navbar.component.spec.ts` —
  29 tests Vitest (couvrant conjointement US16.1.1 et US16.1.2 : thème, langue, badge notif
  placeholder, initiales, `avatarColor()`, toggle dropdown, `onDocumentClick`, logout)
- **Gate 4 MERGE_CONFIDENCE** : 93/100 — 3 itérations d'autoloop (65 → 88 → 93), tous les
  bloquants levés (rebase `ThemeService`, token `--color-error-light`, BOM/EOF) ; 1 dette
  résiduelle documentée et non bloquante (thème `ocean` provisoire, nettoyé au commit `a3761db`
  avant merge)
- **Dépend de** : US16.1.1 (même PR, même composant) — aucune dépendance backend spécifique
  nouvelle, réutilise `AuthService.logout()` existant depuis `pivot-ui` PR #39

---

## Spec fonctionnelle

### Bloc menu utilisateur de `NavbarComponent`

Le menu utilisateur n'est **pas un composant Angular séparé** (`UserMenuComponent` n'existe pas) —
c'est une section du template unique de `NavbarComponent`, partagée avec la navigation principale
(US16.1.1). Comportement réellement livré :

- **Bulle avatar** : cercle coloré affichant les **initiales** de l'utilisateur (première lettre du
  prénom + première lettre du nom, majuscules), avec repli sur la première lettre de l'email si
  prénom/nom absents, et `"?"` si aucun utilisateur n'est résolu. Couleur déterministe issue de
  `avatarColor(name)` — fonction pure exportée, hash (`codePointAt` × 31, Unicode-safe) sur une
  palette fixe de 8 couleurs. **Pas de photo de profil** — seule la branche "initiales" de l'AC
  ("initiales *ou* photo de profil") est implémentée ; aucune US ne couvre l'upload/affichage de
  photo à ce jour.
- **Ouverture du dropdown** : clic sur le bouton avatar (`toggleUserMenu()`, avec
  `stopPropagation()`) bascule un signal `userMenuOpen`. Un `@HostListener('document:click')`
  referme le dropdown (et le badge notifications) sur tout clic en dehors — pas de bouton "fermer"
  dédié.
- **Contenu du dropdown** (`role="menu"`) : en-tête avec avatar (variante large), nom complet et
  email ; puis 4 items `role="menuitem"` — Profil, Préférences, Sécurité, Mes données — **tous
  `aria-disabled="true"` avec un badge i18n "bientôt disponible"** au moment de ce figeage (stubs
  non fonctionnels, pas de navigation réelle) ; séparateur ; puis **Déconnexion**, seul item actif
  du groupe.
- **Déconnexion** : `logout()` délègue à `AuthService.logout()` (service préexistant, introduit
  dans `pivot-ui` PR #39, *non* réécrit par cette US) — au succès, l'état d'auth local est nettoyé
  et l'utilisateur est redirigé vers `/auth/login`.
- **Accessibilité effectivement présente et vérifiable dans le code** : `aria-haspopup="menu"` et
  `[attr.aria-expanded]` sur le bouton déclencheur, `role="menu"`/`role="menuitem"` sur le
  dropdown/ses items, `aria-label` dynamiques i18n, avatar marqué `aria-hidden="true"` (décoratif,
  le nom est déjà porté par `aria-label` du bouton), `:focus-visible` sur tous les éléments
  interactifs. **Aucun de ces attributs n'est couvert par une assertion de test dédiée** (les tests
  vérifient la présence/absence du DOM du dropdown, pas la valeur de ses attributs ARIA) — présence
  confirmée par lecture directe du template, pas par Gate 2.

---

## Contrat technique

### Fichiers introduits / modifiés (`pivot-ui`, PR #49)

| Fichier | Rôle |
|---|---|
| `src/app/core/layout/navbar/navbar.component.ts` | Bloc menu utilisateur (`toggleUserMenu`, `initials()`, `avatarColor()`, `displayName`, `logout()`) intégré au même composant que US16.1.1 |
| `src/app/core/layout/navbar/navbar.component.spec.ts` | 29 tests Vitest, dont ceux dédiés au menu utilisateur (`initials()`, `avatarColor()`, `userMenuOpen` toggle, `logout()`, `onDocumentClick()`, rendu du dropdown) |
| `public/assets/i18n/fr.json` / `en.json` | Clés `nav.dropdown.*` (profile, preferences, security, my_data, coming_soon, coming_soon_a11y, logout, user_menu_aria) |
| `src/app/core/auth/service/auth.service.ts` | **Non modifié par cette PR** — `logout()` déjà présent depuis PR #39, simplement consommé ici |

### Endpoint consommé

```text
POST /auth/logout  (pivot-core, AuthController — inchangé par cette US)
→ 204 No Content
```

`AuthService.logout()` (`pivot-ui`) : `this.http.post<void>('${apiUrl}/auth/logout', null, { withCredentials: true })` — session par cookie httpOnly, pas de bearer token envoyé explicitement côté client.

---

## Écarts vs AC initiaux (divergences réelles, non gommées)

| AC backlog | Réalité vérifiée | Statut |
|---|---|---|
| "Déconnexion appelle **DELETE** /api/auth/logout" | `AuthController` (`pivot-core`) expose `@PostMapping("/logout")`, et `AuthService.logout()` (`pivot-ui`) appelle un **POST**, pas un DELETE. Comportement fonctionnel correct (révocation de session côté serveur via `SessionService.logout()`, cookie nettoyé), mais le verbe HTTP documenté dans l'AC est faux — et ce choix (`POST`) préexiste à cette US (introduit PR #39, `pivot-ui`, bien avant US16.1.2). | AC à corriger dans le fichier backlog, pas un bug d'implémentation |
| "Clic sur la bulle ouvre un dropdown : nom complet, email, **lien profil**, déconnexion" | Nom et email bien affichés ; l'item "Profil" est au moment de ce figeage un **stub désactivé** (`aria-disabled="true"`, badge "bientôt disponible"), pas un lien fonctionnel — la vraie page profil n'existe que depuis `pivot-ui` PR [#71](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/71) (US02.1.1, mergée après #49, hors périmètre de cette US). Vérifié sur `main` actuel : l'item "Profil" est désormais un `routerLink="/account/profile"` fonctionnel — mais ce câblage est un livrable de US02.1.1, pas de cette PR. | Partiellement couvert au moment du merge de #49 ; complété plus tard par une autre US |
| "Tests Vitest **UserMenuComponent**" | Aucun composant `UserMenuComponent` n'existe — le menu utilisateur est une section de `NavbarComponent`, testée dans `navbar.component.spec.ts` (mêmes fichiers que US16.1.1). L'AC supposait un découpage en composant dédié qui n'a pas été retenu à l'implémentation. | Tests bien présents, mais pas sous la forme/le nom supposé par l'AC |
| "Accessibilité WCAG 2.1 AA : aria-haspopup, aria-expanded, **focus piégé**" | `aria-haspopup`/`aria-expanded` confirmés dans le template. **Aucun focus trap clavier n'est implémenté** : pas de handler `keydown` (Escape, Tab), pas de gestion explicite de `tabindex`/`focus()` dans le dropdown. La fermeture ne se fait que par re-clic sur le bouton avatar ou clic document externe (`HostListener('document:click')`) — un utilisateur clavier seul ne peut pas fermer le menu avec Échap ni voir son focus contraint à l'intérieur. | Non implémenté — écart réel, pas seulement non testé |

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US16.1.1 — Navigation principale | Même PR (#49), même composant `NavbarComponent`, même commit de figeage `f63d423` — Gate 5 de US16.1.1 (si figée séparément) devra référencer la même PR |
| US16.1.3 — Badge notifications | Bouton cloche déjà présent dans #49 comme placeholder (`notifOpen` signal, `notifCount` figé à `0`, `aria-disabled="true"`) ; le vrai câblage backend arrive dans `pivot-ui` PR #103 (spec déjà figée : `docs/specs/EPIC-shell-ux/us16-1-3-badge-notifications.md`) |
| US02.1.1 — Voir et éditer son profil (`pivot-ui` PR #71) | Résout après coup le stub "Profil" du dropdown laissé désactivé par cette US (voir § Écarts) |

## Hors périmètre (explicitement exclu)

- Photo de profil dans la bulle avatar (seules les initiales sont implémentées)
- Navigation réelle des items "Préférences", "Sécurité", "Mes données" du dropdown (stubs
  `aria-disabled`, en attente de leurs US respectives)
- Focus trap clavier / fermeture au clavier (Échap) du dropdown — non implémenté, non couvert par
  une US ultérieure identifiée à ce jour
- Révocation de token au sens "liste noire de tokens" côté client — la session repose sur un cookie
  httpOnly nettoyé côté serveur, pas sur une invalidation explicite d'un token porté par le front
