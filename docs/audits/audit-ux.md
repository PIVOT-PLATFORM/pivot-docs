# Audit UX/Accessibilité — PIVOT Platform

## Date : 2026-07-08 — v2

## Expert : Expert UX/UI + Architecte Angular — passe unique (pas de double-passe, domaine à enjeu modéré selon `skill-audit-format`)

## Périmètre : `pivot-ui` (shell + `projects/ui-core`, `projects/design-system` incubés), `pivot-agilite-ui`, `pivot-collaboratif-ui`, `pivot-pilotage-ui` — composants Angular réels (`.ts`/`.html`/`.scss`), workflows `.github/workflows/lighthouse.yml` et configs `.lighthouserc*.json` des 4 repos, fichiers `fr.json`/`en.json` des 4 repos, runs CI GitHub Actions réels (`gh run list`)

---

## Score global : 6.8/10 (premier audit — pas de tendance)

**Statut :** 6.8/10 — v2
**Dernière révision :** 2026-07-08

Premier audit formel du domaine UX/Accessibilité — le fichier était en `Statut: À compléter`
depuis son initialisation (v1, 2026-06-20, score "—"). Ce rapport constitue donc la première
mesure réelle : pas de comparaison possible avec un score antérieur, et la section "Statut des
findings/dettes historiques" est explicitement N/A (voir plus bas). Le score reflète une base
technique plus mature que ce que les documents de contexte (`CLAUDE.md` de
`pivot-collaboratif-ui`, section "Points d'attention" de la précédente version de ce fichier)
laissaient supposer — voir Axe A — mais avec des lacunes concrètes et bien localisées, détaillées
ci-dessous.

---

## I. Résumé exécutif

`pivot-ui` et `pivot-collaboratif-ui` contiennent aujourd'hui des interfaces réelles avec un
niveau d'engagement a11y nettement au-dessus de la moyenne d'un projet à ce stade : landmarks
sémantiques documentés en TSDoc, régions `aria-live` dédiées et réfléchies (évitant les
sur-annonces), gestion de focus manuelle complète dans les dialogues de `pivot-ui`, tables de
données systématiquement avec `scope="col"`, tokens de couleur avec traçabilité de correctifs de
contraste AA. Le contexte fourni en amont de cet audit ("i18n : modules bootstrap n'ont que des
clés placeholder", "pas de `pivot-design-system` publié") s'est révélé **partiellement obsolète**
pour `pivot-collaboratif-ui` — ce repo n'est plus un squelette (69 clés i18n réelles fr/en
synchronisées, 3 composants métier complets : liste de tableaux, rejoindre un tableau, panneau de
partage), et `pivot-ui` héberge déjà une librairie CDK en incubation
(`projects/design-system`, EN17.8) plus avancée que prévu. `pivot-agilite-ui` et
`pivot-pilotage-ui` sont en revanche confirmés bootstrap-only, sans feature réelle — le périmètre
réellement auditable se limite donc à `pivot-ui` et `pivot-collaboratif-ui`.

Deux lacunes structurelles pèsent sur le score : (1) les dialogues modaux de
`pivot-collaboratif-ui` déclarent la sémantique ARIA d'une modale mais n'implémentent aucun
piège de focus réel, contrairement au standard déjà posé dans `pivot-ui` ; (2) la couverture
Lighthouse CI réelle est significativement plus étroite que la surface applicative existante
dans les deux repos matures — dans `pivot-collaboratif-ui` en particulier, le job audite une URL
qui ne correspond à aucune route définie. Ni l'une ni l'autre ne sont bloquantes pour l'usage
actuel (développement actif, pas encore de tenants entreprise), mais les deux doivent être
traitées avant une exposition publique élargie.

---

## II. Analyse par axe

### Axe A — Couverture a11y réelle par repo (vérification du périmètre)

| Repo | État réel constaté | Écart vs contexte fourni |
|------|--------------------|--------------------------|
| `pivot-ui` | Shell complet et en production active : auth (login/register/reset), compte (profil, sécurité, export RGPD), admin (utilisateurs, modules), superadmin (tenants, plans), navbar/sidebar/footer. ~21 composants `.html` + templates inline TS. | Conforme au contexte fourni. |
| `pivot-collaboratif-ui` | **Pas bootstrap** : module whiteboard réel et actif (`board-list`, `join-board`, `share-panel`), guard d'accès réel (`boardAccessGuard`, appel API), 69 clés i18n fr/en synchronisées. Commits récents (`feat(whiteboard): US08.4.1`, `fix(whiteboard): ...`) confirment un développement en cours. | **Écart réel** : le `CLAUDE.md` du repo affirme encore "Statut actuel : bootstrap [...] aucune feature métier n'est implémentée" — texte non mis à jour depuis l'implémentation d'EN08.x/US08.x. Le contexte donné pour cet audit ("clés placeholder `app.title`/`app.bootstrapNotice`") ne s'applique plus : ces 2 clés existent encore dans le JSON mais sont désormais résiduelles à côté de 67 clés `whiteboard.*` réelles. |
| `pivot-agilite-ui` | Confirmé bootstrap : un seul composant (`HomeComponent`), 1 clé i18n (`home.title`) fr/en, aucun template `.html` séparé, aucun attribut ARIA dans le repo. | Conforme au contexte fourni. |
| `pivot-pilotage-ui` | Confirmé bootstrap : `HomeComponent` avec texte français **codé en dur** (pas de Transloco — décision documentée et volontaire, voir `app.config.ts` : "ni HttpClient, ni i18n Transloco [...] ne sont câblés ici", ce repo sera lazy-loadé depuis `pivot-ui` qui fournira Transloco via `@pivot-platform/ui-core`). Aucun fichier i18n. | Conforme au contexte fourni — absence de Transloco assumée architecturalement, pas un défaut. |

**Conclusion de l'axe :** le périmètre réellement auditable en profondeur pour ce cycle est
`pivot-ui` + `pivot-collaboratif-ui`. `pivot-agilite-ui`/`pivot-pilotage-ui` restent
explicitement hors score (rien à auditer), mais **la fiche `CLAUDE.md` de
`pivot-collaboratif-ui` doit être mise à jour** pour refléter l'état réel — elle a laissé passer
le gap de couverture Lighthouse décrit à l'axe B.

### Axe B — Pilier Lighthouse — Accessibilité (état CI réel)

Vérification effective via `gh run list`/`gh api` : les 4 workflows `Lighthouse` sont **verts**
sur `main` dans les 4 repos à la date de l'audit. Mais le contenu réellement testé diverge
fortement de la surface applicative :

| Repo | Config | URLs réellement auditées | Gap identifié |
|------|--------|---------------------------|----------------|
| `pivot-ui` | `.lighthouserc.noauth.json` (3 runs) + `.lighthouserc.json` (1 run, script Puppeteer auth) | Public : `/auth/login`, `/auth/register`, `/auth/forgot-password`, `/auth/resend-verification`, `/legal/mentions-legales`, `/legal/confidentialite`, `/legal/cgu`. Authentifié : **`/dashboard` uniquement**. | Aucune des ~15 routes authentifiées réelles avec formulaires/tableaux/dialogues (`/account/profile`, `/account/security/*`, `/admin/users`, `/admin/modules`, `/superadmin/tenants`, `/superadmin/plans`, `/account/pages/export*`) n'est couverte par la passe authentifiée. |
| `pivot-collaboratif-ui` | `.lighthouserc.json` — 1 seule URL : `http://localhost:4200/` | `app.routes.ts` ne définit **aucune route à la racine** (`path: ''`) — seule la route `/whiteboard` (et ses enfants `join`, `:boardId`) existe. La page auditée par Lighthouse ne correspond donc à aucun composant réel du module (`board-list`, `join-board`, `share-panel` ne sont jamais chargés pendant l'audit CI). | Le score Lighthouse vert de ce repo ne dit rien de l'accessibilité réelle du whiteboard — c'est un faux sentiment de sécurité CI. |
| `pivot-agilite-ui` | `.lighthouserc.noauth.json` — route placeholder uniquement | Conforme à son propre état (rien d'autre à auditer). | Aucun — cohérent avec le statut bootstrap. |
| `pivot-pilotage-ui` | `.lighthouserc.noauth.json` — route placeholder uniquement, passe authentifiée explicitement absente (commentaire TODO en tête de fichier) | Conforme à son propre état. | Aucun — gap documenté et assumé (TODO-SETUP.md §4). |

Aucun repo n'a d'outillage a11y complémentaire à Lighthouse : pas de `axe-core`/`@axe-core/playwright`/`pa11y`
dans les 4 `package.json`, pas de règles ESLint dédiées à l'accessibilité des templates Angular
(`eslint.config.mjs` de `pivot-ui` ne référence que `@typescript-eslint/*`). Lighthouse est donc
le **seul** filet de sécurité automatisé, et n'auditant que l'état DOM au chargement initial,
il ne peut structurellement pas détecter les régressions sur du contenu injecté après interaction
(cf. Axe A, finding sur les messages d'erreur des pages d'auth, plan d'action P1).

### Axe C — Performance / Best Practices / SEO — périmètre

Les 4 workflows s'appellent `Lighthouse — Accessibilité` mais font en réalité tourner les 4
piliers Lighthouse (les configs `.lighthouserc*.json` assertent `categories:accessibility`,
`categories:best-practices`, et `categories:performance` dans tous les repos ; `categories:seo`
en plus sur la passe publique de `pivot-ui`) — seul le pilier accessibilité est **nommé** dans le
job CI et le résumé `GITHUB_STEP_SUMMARY`, mais les seuils `minScore` sont bien fixés
(accessibilité/best-practices ≥ 0.9, performance ≥ 0.7, SEO ≥ 0.9 côté public `pivot-ui`) et
bloquants (`assert` → échec de run si non atteints). Il n'y a donc pas de risque de régression
Performance/Best Practices silencieuse : ces piliers **sont** suivis et gatés, seul le nom du job
laisse penser qu'ils ne le sont pas. Ce nom devrait être corrigé (`Lighthouse` seul, ou
`Lighthouse — Qualité` par exemple) pour refléter la réalité, mais ce n'est qu'une question de
libellé, pas un gap fonctionnel.

### Axe D — i18n — complétude réelle par repo

Comparaison programmatique des clés `fr.json`/`en.json` (aplatissement JSON, tous niveaux) :

| Repo | Clés FR | Clés EN | Clés manquantes (FR↔EN) | Clés orphelines identifiées |
|------|---------|---------|---------------------------|-------------------------------|
| `pivot-ui` | 580 | 580 | 0 | — |
| `pivot-collaboratif-ui` | 69 | 69 | 0 | `whiteboard.guard.moduleDisabled`, `whiteboard.guard.networkError` — définies mais jamais consommées (voir Axe A : `whiteboardModuleGuard` est un stub `of(true)` qui ne les utilise pas encore ; `boardAccessGuard` n'utilise que `whiteboard.guard.accessDenied` pour tous les cas d'erreur, 403/404/réseau confondus) |
| `pivot-agilite-ui` | 1 | 1 | 0 | — |
| `pivot-pilotage-ui` | — | — | N/A (pas de fichier i18n) | — |

Aucune clé manquante entre FR/EN sur les 3 repos qui ont un i18n réel — synchronisation parfaite.
Les 2 clés orphelines de `pivot-collaboratif-ui` sont rattachées au blocage documenté EN17.3
(guard réel pas encore branché) : pas un défaut UX aujourd'hui, mais à vérifier une fois le vrai
guard implémenté pour s'assurer qu'elles seront effectivement consommées et pas remplacées par de
nouvelles clés qui les laisseraient mortes. Point d'attention additionnel : `board-list.component.ts`
construit dynamiquement la clé `whiteboard.board.list.role.${role}` via template literal — un
grep statique de complétude i18n ne peut pas la détecter automatiquement ; vérifié manuellement
que le typage `Board['role']` (`'owner'|'editor'|'viewer'`, minuscule) correspond bien à la
casse des clés JSON définies — cohérent, mais un futur renommage de cet enum casserait la
traduction sans qu'aucun lint ne le détecte.

### Axe E — Cohérence design system

`pivot-ui` gère toujours ses styles en interne (`src/styles/tokens.scss`, `reset.scss`,
`components.scss`) comme documenté, mais **une librairie Angular workspace en incubation existe
déjà** : `projects/design-system/` (EN17.8, présente depuis le commit `5d6fb78`), avec
`@angular/cdk` en dépendance réelle du `package.json` racine. Elle contient des versions plus
abouties de `confirm-dialog`, `toast` et `password-strength` — la version CDK de
`ConfirmDialogComponent` utilise `FocusTrapFactory`/`FocusTrap` (piège de focus, retour de focus,
initial-focus) là où la version encore utilisée en prod dans `src/app/shared/confirm-dialog/`
réimplémente le même comportement manuellement (Tab/Shift+Tab interceptés à la main). Les deux
implémentations sont fonctionnellement équivalentes et documentées comme temporaires
("Kept for backward compat [...] until `@pivot/design-system` is published"), mais c'est une
duplication réelle à surveiller : toute future correction a11y devra être répliquée dans les deux
implémentations tant que la migration n'a pas eu lieu.

Cohérence des styles de focus : 11 fichiers SCSS utilisent `:focus-visible` (navbar, footer,
boutons du design system incubé) contre quelques composants plus anciens qui utilisent encore
`:focus` seul (`components.scss` classe `.form-control`, `change-password`/`change-email`) —
fonctionnellement non bloquant (l'anneau de focus reste visible dans les deux cas, juste aussi
au clic souris pour la variante `:focus`), mais une divergence de convention à unifier.

Contraste : les tokens de couleur (`tokens.scss`) montrent une vraie démarche de vérification —
`--color-gray-500` porte un commentaire explicite ("5.15:1 sur blanc — corrige la régression AA
de --pv-text-muted (3.73:1)"), preuve d'un historique réel de correction de contraste plutôt
qu'une simple affirmation de conformité. Vérification manuelle du texte de sidebar
(`rgba(255,255,255,.65)` sur fond `--color-navy-900` `#1A1230`) : ratio calculé ≈ 8.6:1, largement
conforme AA (4.5:1) et même AAA (7:1).

---

## Statut des findings/dettes historiques

**N/A — premier audit formel.** Le fichier était en `Statut: À compléter` avec `Score: —` depuis
son initialisation (v1, 2026-06-20). Aucun finding antérieur n'existe donc à re-vérifier — cette
section réapparaîtra au prochain cycle (v3) avec les findings listés ci-dessous (plan d'action)
comme référence.

---

## Bonnes pratiques confirmées / Points forts

| # | Pratique | Preuve |
|---|----------|--------|
| 1 | Landmarks et structure sémantique documentés explicitement dans le code, pas seulement appliqués | `pivot-ui/src/app/features/home/home.component.ts` — TSDoc en tête de fichier : "Accessibility: landmark `<main>`, h1/h2 heading hierarchy, skeleton uses aria-busy + aria-label, interactive cards have visible focus ring" ; `<main [attr.aria-label]>`, sections `aria-labelledby`, `role="list"`/`"listitem"` sur la grille de modules |
| 2 | Région `aria-live` conçue pour éviter les sur-annonces (pas juste posée par réflexe) | `pivot-ui/src/app/core/layout/navbar/navbar.component.ts` — commentaire explicite : jamais `aria-live` sur le badge lui-même ("répéterait l'annonce à chaque cycle de détection de changement même sans changement de valeur"), `<output class="sr-only" aria-live="polite" aria-atomic="true">` séparé |
| 3 | Gestion de focus complète et manuelle dans les dialogues (avant même l'arrivée de CDK) | `pivot-ui/src/app/shared/confirm-dialog/confirm-dialog.component.ts` — piège Tab/Shift+Tab, retour de focus à l'élément déclencheur, Escape, `aria-modal` + `aria-labelledby`/`aria-describedby` dynamiques |
| 4 | Migration vers CDK déjà amorcée pour renforcer encore cette gestion de focus | `pivot-ui/projects/design-system/src/components/confirm-dialog/confirm-dialog.component.ts` — `FocusTrapFactory`/`FocusTrap` CDK, `focusInitialElement()` |
| 5 | Tables de données systématiquement sémantiques | `scope="col"` présent 27 fois sur 5 fichiers (`admin-users`, `tenants-list`, `plans-list`, `sessions-list`, `trusted-devices-list`) — aucune exception trouvée |
| 6 | Traçabilité réelle des corrections de contraste (pas une affirmation de conformité à l'aveugle) | `pivot-ui/src/styles/tokens.scss` ligne 26 — commentaire de correctif AA référençant la valeur précédente non conforme |
| 7 | i18n fr/en strictement synchronisé partout où il existe réellement | 580/580 clés (`pivot-ui`), 69/69 (`pivot-collaboratif-ui`), 1/1 (`pivot-agilite-ui`) — 0 écart FR↔EN sur les 3 repos |
| 8 | Accessibilité soignée dans un module encore en développement actif (pas relégué à "plus tard") | `pivot-collaboratif-ui` whiteboard — `aria-live`/`aria-busy` sur les états async, `role="alertdialog"`/`"dialog"` corrects, libellés `sr-only` sur les `<select>` de rôle dans `share-panel.component.html` |
| 9 | CI Lighthouse bloquante avec seuils stricts, pas juste informative | `minScore: 0.9` accessibilité + best-practices sur les 4 repos, `assert` fait échouer le run — vérifié vert sur les runs `main` réels des 4 repos (`gh run list`) |

---

## Score par grille — WCAG 2.1 AA / 4 piliers Lighthouse / cohérence design system

| Catégorie | Score | Findings/dette actifs |
|-----------|-------|------------------------|
| WCAG 2.1 AA — composants réels (pivot-ui) | 8.0/10 | Messages d'erreur auth sans `role="alert"`/`aria-live` (MEDIUM) ; sidebar collapsed sans nom accessible fiable (MEDIUM) ; incohérence `:focus` vs `:focus-visible` (LOW) |
| WCAG 2.1 AA — composants réels (pivot-collaboratif-ui) | 6.5/10 | Modales sans piège de focus réel malgré la sémantique ARIA (HIGH) ; 2 clés i18n orphelines liées à un guard stub (LOW) |
| Lighthouse — couverture CI réelle vs surface applicative | 5.0/10 | `pivot-collaboratif-ui` : URL auditée hors de toute route réelle (HIGH) ; `pivot-ui` : passe authentifiée limitée à 1 route sur ~15 (MEDIUM) ; aucun outillage a11y complémentaire (axe-core, ESLint template) (LOW) |
| Performance/Best Practices/SEO | 8.5/10 | Suivis et gatés réellement (seuils stricts) malgré un nom de job trompeur ("Accessibilité" seul) — correction cosmétique uniquement |
| i18n — complétude par repo | 9.0/10 | 0 clé manquante FR/EN partout où l'i18n existe ; 2 clés orphelines mineures, liées à un blocage déjà documenté (EN17.3) |
| Cohérence design system | 6.0/10 | Duplication confirm-dialog/toast/password-strength (prod vs incubation CDK) tant que la migration n'a pas eu lieu ; documentation `CLAUDE.md` de `pivot-collaboratif-ui` obsolète sur l'état "bootstrap" |
| Déclaration d'accessibilité (conformité formelle) | 2.0/10 | Lien footer `/legal/accessibilite` pointe vers `ComingSoonComponent` — aucune déclaration de conformité réelle publiée alors que le lien est déjà exposé publiquement (MEDIUM) |

---

## Plan d'action

### P0 — bloquant

Aucun. Aucune barrière d'accès totale identifiée (pas de trappe clavier empêchant l'usage, pas de
contenu totalement inaccessible aux lecteurs d'écran sur les parcours principaux vérifiés).

### P1 — avant le prochain déploiement / dette majeure à traiter vite

- **Implémenter un piège de focus réel dans les modales de `pivot-collaboratif-ui`**
  (`share-panel.component.ts`, modales create/delete de `board-list.component.html`) — soit en
  répliquant le pattern manuel de `pivot-ui/src/app/shared/confirm-dialog/`, soit en ajoutant
  `@angular/cdk` à ce repo (pas encore une dépendance) pour réutiliser `FocusTrapFactory`. Le
  TSDoc de `share-panel.component.ts` affirme déjà à tort que la contrainte est satisfaite —
  corriger le code, pas seulement le commentaire.
- **Corriger la couverture Lighthouse de `pivot-collaboratif-ui`** — ajouter au minimum
  `http://localhost:4200/whiteboard` (et idéalement `/whiteboard/join`, un board existant) à
  `.lighthouserc.json` ; la config actuelle (`/` seul) n'audite aucun composant réel.
- **Ajouter `role="alert"`/`aria-live` aux messages d'erreur des pages d'authentification**
  (`login.component.html:11`, `register.component.html:26`, `device-confirm.component.ts:26`,
  `reset-password.component.ts:59`, `forgot-password.component.ts:38`) — pattern déjà appliqué
  ailleurs dans l'app (profil, sécurité, export, admin, superadmin), à généraliser aux pages les
  plus fréquentées (premier contact utilisateur).

### P2 — sprint suivant / amélioration planifiable

- **Élargir la passe Lighthouse authentifiée de `pivot-ui`** au-delà de `/dashboard` seul — au
  minimum une route avec formulaire (`/account/profile`) et une route avec tableau de données
  (`/admin/users` ou `/superadmin/tenants`), pour couvrir les patterns d'interaction les plus
  complexes de l'app.
- **Corriger le nom accessible des items de sidebar en mode réduit**
  (`sidebar.component.ts` lignes 27-32) — ajouter `[attr.aria-label]` sur le `<a>` (au lieu de
  compter sur `title`, ignoré tant que le contenu textuel de l'icône existe) et `aria-hidden="true"`
  sur le span d'icône.
- **Publier une vraie déclaration d'accessibilité** à la route `/legal/accessibilite` (remplacer
  `ComingSoonComponent`) — a minima un état des lieux honnête (conformité partielle, contenus non
  conformes connus, plan de remédiation), cohérent avec le fait que le lien est déjà exposé en
  pied de page à tous les visiteurs.
- **Mettre à jour `pivot-collaboratif-ui/CLAUDE.md`** — la section "Statut actuel : bootstrap"
  est obsolète depuis l'implémentation d'EN08.x/US08.x ; corriger pour éviter que de futurs
  audits ou revues partent d'une hypothèse fausse.
- Unifier `:focus` → `:focus-visible` sur les derniers composants qui utilisent encore l'ancienne
  convention (`components.scss` `.form-control`, `change-password`, `change-email`).

### P3 — qualité continue / mois

- Introduire un outillage a11y automatisé complémentaire à Lighthouse (`@axe-core/playwright`
  dans les specs E2E existantes, ou règles ESLint dédiées aux templates Angular) — Lighthouse
  seul ne couvre qu'un sous-ensemble de pages et ne peut pas détecter les régressions sur du
  contenu post-interaction.
- Vérifier/nettoyer les 2 clés i18n orphelines de `pivot-collaboratif-ui`
  (`whiteboard.guard.moduleDisabled`, `whiteboard.guard.networkError`) une fois le vrai guard de
  module implémenté (EN17.3).
- Renommer le job CI `Lighthouse — Accessibilité` (les 4 repos) pour refléter que Performance/
  Best Practices/SEO sont également gatés — cosmétique mais réduit la confusion pour les futurs
  audits.
- Planifier la migration effective de `src/app/shared/{confirm-dialog,toast,password-strength}`
  vers `projects/design-system` une fois ce dernier stabilisé, pour éliminer la duplication.

### Externe — hors du contrôle direct de l'équipe

- Publication de `pivot-design-system` en repo dédié (EN17.2, `Stage: Backlog`, `Phase: phase-3`)
  — dépend de la planification produit, pas d'un blocage technique.
- Passe Lighthouse authentifiée réelle pour `pivot-agilite-ui`/`pivot-pilotage-ui` — dépend de
  l'arrivée des premières US métier réelles dans ces modules (aucune feature à auditer
  aujourd'hui).

---

## Conclusion

**Verdict : base a11y solide mais non formalisée, dette identifiée et localisée — pas de
blocage prod pour l'usage actuel (développement actif, pas de tenant entreprise exposé), mais
3 réserves à lever avant élargissement de l'exposition publique/entreprise :** (1) l'absence de
piège de focus réel dans les modales de `pivot-collaboratif-ui` malgré une sémantique ARIA qui
laisse croire le contraire ; (2) une couverture Lighthouse CI qui, dans ce même repo, n'audite
aucune page réelle du module ; (3) l'absence de déclaration d'accessibilité alors que le lien est
déjà public. Le niveau d'engagement a11y démontré dans le code de `pivot-ui` (landmarks
documentés, gestion de focus manuelle complète, régions live réfléchies, tokens de contraste
tracés) et dans `pivot-collaboratif-ui` (module encore actif mais déjà soigné) dépasse ce que le
contexte disponible avant cet audit laissait supposer — c'est la bonne surprise de ce premier
passage. La prochaine révision formelle devra vérifier concrètement (preuve à l'appui, pas
affirmation) la résolution des points P1 ci-dessus.

---

*Expert UX/UI + Architecte Angular — 2026-07-08 — indépendant — distribution restreinte*

---

## Historique des révisions

| Version | Date | Score | Évolutions principales |
|---|---|---|---|
| v1 | 2026-06-20 | — | Initialisation |
| v2 | 2026-07-08 | 6.8/10 | Premier audit formel réel. Périmètre : `pivot-ui` + `pivot-collaboratif-ui` (composants réels vérifiés) ; `pivot-agilite-ui`/`pivot-pilotage-ui` confirmés bootstrap, hors score. Points forts : gestion de focus manuelle complète et régions `aria-live` réfléchies dans `pivot-ui`, i18n fr/en strictement synchronisé (580/580, 69/69, 1/1), tables sémantiques systématiques, traçabilité réelle des correctifs de contraste. Findings majeurs : absence de piège de focus dans les modales `pivot-collaboratif-ui` malgré la sémantique ARIA affichée ; couverture Lighthouse CI très en-deçà de la surface applicative réelle (URL hors-route sur `pivot-collaboratif-ui`, 1 seule route authentifiée auditée sur `pivot-ui`) ; messages d'erreur des pages d'authentification sans `role="alert"`/`aria-live` ; déclaration d'accessibilité absente malgré un lien déjà public. `CLAUDE.md` de `pivot-collaboratif-ui` signalé obsolète (affirme encore "bootstrap"). |
