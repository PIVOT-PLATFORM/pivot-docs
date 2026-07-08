# US16.1.1 — Navigation principale (logo, liens, responsive)

## Contexte

- **US** : `docs/backlog/EPIC-shell-ux/FEATURES/navigation/us-navbar.md` (F16.1 — Navigation
  principale, EPIC-shell-ux E16)
- **PR** : `pivot-ui` [#49](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/49)
  (`feat/us16-1-shell-navbar`) — titre PR `feat(ui): redesign shell and navbar — top-nav layout,
  theme toggle, user menu` (l'US n'est pas nommée dans le titre, confirmée par le contenu du diff
  et de la revue Gate 4)
- **Dernier commit au moment du figeage** : `a3761db` — `refactor(ui): ThemeService — retrait
  ocean + cycleTheme (dette review)`
- **Gate 2 COVERAGE** : SonarCloud — 94.5 % coverage new code, 0 duplication ; 189/189 tests
  Vitest, 36/36 E2E Playwright
- **Gate 4 MERGE_CONFIDENCE** : 93/100 (revue finale) — trajectoire 65 → 88 → 93 sur 3 itérations
  (rebase `ThemeService`, nettoyage BOM/EOF, dette `notifOpen` orpheline, dette i18n
  `HomeComponent`, retrait thème `ocean` de l'UI) — auto-approuvé (seuil ≥ 85)
- **Dépend de** : aucune dépendance backend — feature 100 % front (pas de PR `pivot-core`
  associée)

---

## Spec fonctionnelle

### NavbarComponent (`src/app/core/layout/navbar/navbar.component.ts`)

Barre de navigation top-nav (remplace l'ancien shell avec sidebar + hamburger), `role="banner"`,
sticky en haut de la zone de contenu scrollable.

- **Logo** : lien vers `/`, icône SVG PIVOT (`aria-hidden`) + texte "PIVOT", `aria-label="PIVOT —
  accueil"`.
- **Liens de navigation** (`aria-label="Navigation principale"`) :
  - "Accueil" (clé `nav.home`) → `routerLink="/dashboard"`
  - "Modules" (clé `nav.modules`) → `routerLink="/home"`
  - "Mes équipes" (clé `nav.teams`) → `routerLink="/teams"`
  - Indicateur de page active via `routerLinkActive="navbar__nav-link--active"` (changement visuel
    de couleur/fond/poids de police). **Aucun `aria-current="page"`** n'est posé — ni
    `ariaCurrentWhenActive` sur `RouterLinkActive`, ni attribut manuel — voir § Écarts.
- **Basculeur thème** : bouton icône lune/soleil, `toggleTheme()` → `ThemeService.toggleTheme()`
  (light ↔ dark uniquement — voir § Écarts sur le thème `ocean`), `aria-label`/`title` dynamiques
  ("Passer en mode sombre"/"Passer en mode clair").
- **Bouton aide ("?")** : rendu visuellement (icône `?`, `aria-label`/`title` i18n `nav.help`),
  **sans aucun gestionnaire de clic ni lien** — purement décoratif à ce stade, voir § Écarts.
- **Bouton bug** : `<a>` avec `href` = `environment.bugReportUrl` =
  `mailto:bugs@pivot-platform.fr?subject=Bug%20PIVOT` — email pré-rempli avec un sujet fixe non
  traduit (identique FR/EN), voir § Écarts.
- **Sélecteur langue** : pilule à deux boutons FR/EN (`role="group"`, `aria-pressed` sur chaque
  option), `setLang()` appelle `TranslocoService.setActiveLang()` + persiste dans
  `localStorage['pivot_lang']`. Langue active mise en évidence via
  `navbar__lang-opt--active`.
- **Cloche notifications** : bouton `aria-disabled="true"` avec badge conditionnel
  (`notifCount() > 0`) — hors périmètre de cette US (couvert par US16.1.3, badge alimenté par un
  compteur statique à `0` dans cette PR).
- **Menu utilisateur** : bulle avatar colorée (`avatarColor()`, hash déterministe du nom sur une
  palette de 8 couleurs, `codePointAt` — Unicode-aware), nom affiché (fallback email si
  prénom/nom absents), chevron animé. Dropdown (`role="menu"`) : en-tête identité (avatar large +
  nom + email), 4 raccourcis marqués "Bientôt" (`aria-disabled="true"` — Mon profil, Préférences,
  Sécurité, Mes données), puis Déconnexion (`role="menuitem"`, appelle `AuthService.logout()`).
  Fermeture au clic extérieur (`HostListener('document:click')`) et fermeture croisée avec le
  panneau notifications.
- **Design** : fond navbar en dégradé CSS (`--surface-navbar`) — indigo→violet en thème clair
  (`linear-gradient(135deg, #1e1b4b → #7c3aed)`), noir teinté violet en thème sombre
  (`linear-gradient(135deg, #07060e → #1e1450)`) ; textes/icônes en blanc translucide sur les deux
  thèmes, tokens `--navbar-*` dédiés et namespacés par thème (`tokens.scss`).
- **A11y** : `role="banner"`, `aria-label` sur les zones interactives, `aria-expanded`/
  `aria-haspopup="menu"` sur le déclencheur du menu utilisateur, `aria-pressed` sur les options
  de langue, `aria-hidden="true"` sur tous les SVG décoratifs, `:focus-visible` sur tous les
  éléments interactifs (outline blanc translucide). Audit Lighthouse Accessibilité vert en CI.
- **Responsive** : `@media (max-width: 767px)` masque `navbar__username`, `navbar__nav` et le
  chevron (icônes seules conservées).

### ShellComponent / HomeComponent (changements adjacents dans la même PR)

- `ShellComponent` simplifié : suppression de la sidebar, layout flex-column `height: 100vh`,
  navbar sticky, contenu scrollable (`shell.component.html`/`.scss` désormais externes).
- Nouvelle route `/home` (lazy, `HomeComponent`) — placeholder minimal, i18n (`home.title` /
  `home.subtitle`), ajouté suite à une dette de revue (texte FR hardcodé au départ).
- `FooterComponent` ajouté (nouveau, hors AC de cette US mais livré dans le même diff).

---

## Contrat technique

### Fichiers introduits / modifiés (`pivot-ui`)

| Fichier | Rôle |
|---|---|
| `src/app/core/layout/navbar/navbar.component.ts` | Refonte complète — top-nav, thème, langue, menu utilisateur, `avatarColor()` exportée |
| `src/app/core/layout/navbar/navbar.component.spec.ts` | Tests étendus (dropdown, thème, langue, avatar, badge, click-outside) |
| `src/app/core/layout/shell/shell.component.ts` / `.html` (nouveau) / `.scss` (nouveau) / `.spec.ts` (nouveau) | Layout shell sans sidebar |
| `src/app/core/layout/footer/footer.component.ts` (nouveau) / `.spec.ts` (nouveau) | Pied de page shell |
| `src/app/core/theme/theme.service.ts` | Réduit à `Theme = 'light' \| 'dark'` (retrait de `'ocean'`/`cycleTheme()` en fin de revue) |
| `src/app/features/home/home.component.ts` (nouveau) / `.spec.ts` (nouveau) | Placeholder route `/home` |
| `src/app/app.routes.ts` | Route `/home` (lazy) |
| `src/environments/environment.ts` / `.prod.ts` | `bugReportUrl` |
| `src/styles/tokens.scss` | Tokens `--navbar-*` (light/dark/ocean), gradients `--surface-navbar` |
| `public/assets/i18n/fr.json` / `en.json` | Clés `nav.*`, `nav.dropdown.*`, `home.*` |

### Endpoints / modèles / contrats techniques pertinents

Feature 100 % front — aucun nouvel endpoint backend. `logout()` réutilise
`DELETE /api/auth/logout` déjà contractualisé par `AuthService` (US01.x, hors périmètre de cette
US). Aucune modification de contrat module ni OIDC (confirmé Gate 4).

### Choix technique — thème `ocean` résiduel dans les tokens CSS

`tokens.scss` conserve les valeurs `[data-theme="ocean"]` (variables `--color-*`) après le retrait
de `cycleTheme()`/`'ocean'` côté TypeScript — décision documentée en revue : CSS pur sans impact
JS, réservé à une future US thème (`feat/us16-4-1-theme`). N'affecte pas le rendu de cette US
(l'UI n'expose que light/dark).

---

## Écarts vs AC initiaux

Écarts confirmés par lecture directe du diff (pas de mention explicite en commentaire de revue
pour les deux premiers — ils n'ont pas été relevés par le Gate 4, qui portait sur
architecture/qualité de code plutôt que sur la traçabilité AC ligne à ligne) :

- **`aria-current="page"` absent** — l'AC "A11y : `role="banner"`, `aria-label`,
  `aria-current="page"`, focus visible, WCAG AA" n'est couverte qu'en partie : l'indicateur de
  page active existe visuellement (`routerLinkActive` + classe CSS), mais aucun `aria-current`
  n'est posé (ni `[ariaCurrentWhenActive]` sur `RouterLinkActive`, ni attribut manuel) — un
  lecteur d'écran ne peut pas identifier la page courante dans le menu de navigation.
- **Bouton "?" (aide) non fonctionnel** — rendu visuellement avec `aria-label`/`title` i18n, mais
  sans `(click)`, `href` ni `routerLink` : au clic, rien ne se produit. Le bouton bug, lui, est
  bien un lien `mailto:` opérant. L'AC "Boutons ? (aide) et bug (email pré-rempli i18n)" est donc
  à moitié couverte.
- **Email bug pré-rempli mais non i18n** — `bugReportUrl` est une constante d'environnement
  unique (`mailto:bugs@pivot-platform.fr?subject=Bug%20PIVOT`), identique quelle que soit la
  langue active. Le "pré-rempli" est vérifié, le "i18n" du sujet ne l'est pas.
- **Libellés "Accueil"/"Modules" vs routes `/dashboard`/`/home`** — l'AC nomme les liens "Accueil,
  Modules, Mes équipes" sans préciser les cibles ; l'implémentation route "Accueil" vers
  `/dashboard` (page existante) et "Modules" vers `/home` (nouveau placeholder). Cohérent avec le
  fait que `/` redirige vers `/home`, mais le nommage libellé/route peut prêter à confusion pour
  la suite du shell — signalé pour information, pas un blocage.

Pas d'écart sur les autres AC (liens de navigation, thème, sélecteur langue FR/EN, menu
utilisateur, design dégradé) : implémentation conforme et testée.

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US16.1.2 — Menu utilisateur | Fichier backlog `us-menu-utilisateur.md` indique explicitement "Couvert par l'implémentation existante de la NavbarComponent (US16.1.1 legacy)" — pas de PR dédiée, le dropdown utilisateur de cette US16.1.1 en constitue l'implémentation réelle. Point d'attention non résolu par cette spec : l'AC "focus piégé" de US16.1.2 n'a pas de mécanisme identifiable dans ce diff (pas de gestion `Escape`/piège de tabulation) — à vérifier séparément côté backlog US16.1.2, hors périmètre de ce figeage. |
| US16.1.3 — Badge notifications | Le bouton cloche (`aria-disabled="true"`, `notifCount` codé à `0` en dur) posé dans cette PR est le point d'ancrage repris et alimenté par US16.1.3 (PR `pivot-ui` #103, déjà figée sous `docs/specs/EPIC-shell-ux/us16-1-3-badge-notifications.md`). |
| US16.4.1 — Thème (à venir) | `ThemeService` de cette PR inclut temporairement `cycleTheme()`/`'ocean'` puis les retire en cours de revue (dette documentée) ; les tokens CSS `[data-theme="ocean"]` restent en place pour cette future US. |
| US02.1.2 — Préférence de langue | PR distincte (`pivot-ui` #72). Le sélecteur pilule FR/EN de la navbar (`setLang()` + `localStorage['pivot_lang']`) est le point d'entrée UI ; la persistance/restauration de préférence utilisateur plus poussée relève de US02.1.2, non de cette US. |

## Hors périmètre (explicitement exclu)

- Panneau détaillé des notifications (dropdown/page dédiée) — bouton cloche présent mais inerte,
  couvert par US16.1.3 pour le compteur uniquement.
- Fonctionnalité réelle des raccourcis "Mon profil", "Préférences", "Sécurité", "Mes données" du
  menu utilisateur — marqués "Bientôt" (`aria-disabled="true"`), US dédiées à venir.
- Focus trap du dropdown utilisateur (mentionné dans l'AC de US16.1.2, pas de cette US) — aucun
  mécanisme trouvé dans ce diff.
- Fonctionnalité du bouton "?" (aide) et traduction du sujet de l'email bug — voir § Écarts,
  dettes non trackées explicitement dans un commentaire de revue au moment du figeage.
- Thème `ocean` côté UI (tokens CSS conservés, non exposés) — réservé à `feat/us16-4-1-theme`.
