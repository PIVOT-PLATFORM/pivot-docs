# Audit — architecture

**Statut :** 6.2/10 — v2
**Dernière révision :** 2026-07-08
**Profil agent responsable :** Architecte Modules (coordination) + Architecte Java/Spring (pivot-core) + Architecte Angular (pivot-ui)
**Méthodologie :** Passe unique (double-passe non obligatoire pour ce domaine) — exploration directe du code (`find`/`wc -l`/`grep`/`git diff`/`git show`), comparaison avec l'historique Git réel (y compris `origin/main` quand le checkout local était en retard), croisement avec l'issue GitHub `pivot-core#171` et le backlog `pivot-docs`.

**Périmètre réellement couvert :**
- `pivot-core` — arborescence racine `src/`, `pivot-core-starter/`, `pivot-core-app/`, `pom.xml`, `compose.yml`, `sonar-project.properties`. **Note méthodologique** : le checkout local était 2 commits derrière `origin/main` (PR pivot-core#173 et #175 non présents localement) — l'audit a comparé `HEAD` et `origin/main` via `git diff`/`git show` pour auditer l'état réellement mergé, pas un checkout obsolète.
- `pivot-ui` — `src/app/` (core/features/shared), `projects/ui-core/`, `projects/design-system/`, `nginx.conf`/`nginx.dev.conf`.
- `pivot-collaboratif-core`/`-ui` — seul module avec code métier réel (whiteboard).
- `pivot-agilite-core`/`-ui`, `pivot-pilotage-core`/`-ui` — vérification de l'état bootstrap annoncé.
- `pivot-docs` — ADR-007, `docs/backlog/EPIC-infra-multi-repo/ENABLERS/en-pivot-core-starter.md`, issue `pivot-core#171` (lecture croisée, aucune édition).

---

## Score global : 6.2/10 (premier audit formel — pas de tendance)

Fondations Java saines (couches propres, zéro God Class, direction de dépendance Maven respectée) mais **le contrat de plateforme multi-repo — ce que `pivot-core-starter` et `@pivot-platform/ui-core` sont censés exporter — est encore en grande partie fictif**, et la documentation (`CLAUDE.md` de 3 repos + Javadoc + ADR) le décrit comme déjà livré à plusieurs endroits. Le module métier le plus avancé (whiteboard, `pivot-collaboratif-core`) tourne aujourd'hui sans aucune frontière de confiance réelle (identité dérivée d'en-têtes HTTP non signés), ce qui est documenté comme un choix transitoire assumé — pas une découverte cachée — mais reste un vrai risque tant que l'extraction `auth` n'a pas eu lieu. Premier passage : aucun finding historique à confronter (voir section dédiée).

---

## I. Résumé exécutif

PIVOT est une plateforme multi-repo à deux vitesses : un shell (`pivot-core`/`pivot-ui`) mature et discipliné au niveau du code, et un système de contrats inter-repo (Maven `pivot-core-starter`, npm `@pivot-platform/ui-core`) encore largement à l'état d'intention. L'équipe a elle-même détecté une bonne partie de cet écart (issue `pivot-core#171`, ouverte et documentée fichier par fichier le jour de cet audit) — c'est un signe de maturité organisationnelle à saluer, pas un signal d'alarme supplémentaire. Ce que cet audit ajoute : la mesure précise de l'écart côté backend (confirmé et complété : `TenantContextHolder`/`@TenantAware` n'existent nulle part, pas seulement "pas extraits"), l'équivalent côté frontend (jamais tracé jusqu'ici : le scope npm documenté `@pivot/ui-core` ne correspond à aucun package réellement publiable — c'est `@pivot-platform/ui-core`, mono-entrée, sans les sous-chemins `/auth`, `/tenant`, `/shell`, `/modules` documentés), et la conséquence concrète sur le module métier le plus avancé (aucune authentification réelle sur les endpoints whiteboard tant que ce contrat n'est pas branché).

---

## II. Analyse par axe

### Axe 1 — Contrat de plateforme `pivot-core-starter` (Maven) — Score : 5/10

**Ce qui fonctionne** : la direction de dépendance est propre. Vérifié par `git grep` sur `origin/main` : `pivot-core-starter/src/main/**/*.java` ne contient **aucun** import de `fr.pivot.modules.*`, `fr.pivot.auth.*` ou `fr.pivot.tenant.*` (packages réservés à `pivot-core-app`) — le sens de couplage starter→app n'existe pas, seul app→starter existe (7 fichiers de `pivot-core-app` importent bien `fr.pivot.core.modules.*`/`fr.pivot.core.tenant.*`). PR pivot-core#173 (mergée, visible sur `origin/main` mais absente du checkout local `HEAD`) a effectivement **déplacé** (pas dupliqué) les 14 fichiers de `fr.pivot.core.modules` et `TenantContext.java` de `pivot-core-app/src` vers `pivot-core-starter/src` — vérifié : `git show origin/main:src/main/java/fr/pivot/core/modules/ModuleRegistry.java` échoue (`fatal: … exists on disk, but not in 'origin/main'`), donc pas de duplication résiduelle.

**Ce qui ne fonctionne pas** : sur les 5 packages que `pivot-core-starter` est censé exporter (`pivot-core/CLAUDE.md:9-19`, Javadoc de `PivotCoreAutoConfiguration.java:21-31`), seuls 2 sont réellement complets :

| Package promis | État réel vérifié (2026-07-08, `origin/main`) |
|---|---|
| `fr.pivot.core.db` | ✅ Fait — `ModuleFlywayConfigurer.java` (74 lignes) + `PivotCoreAutoConfiguration.java` (83 lignes) |
| `fr.pivot.core.modules` | ✅ Fait (PR #173) — 14 fichiers, `ModuleRegistry`/`PivotModule`/`ModuleActivationService` (322 lignes) etc. réellement dans `pivot-core-starter/src` |
| `fr.pivot.core.tenant` | 🟡 Partiel — seul `TenantContext.java` (22 lignes, un simple `record`) existe. **`TenantContextHolder` et l'annotation `@TenantAware`, documentés comme exportés dans la Javadoc de `PivotCoreAutoConfiguration.java:24-25`, n'existent nulle part dans le codebase** (`grep` vide sur toute la plateforme) |
| `fr.pivot.core.auth` | ❌ N'existe pas du tout. `fr.pivot.auth.*` (8240 lignes) gère tout l'auth applicatif mais mélange générique (validation opaque token, config OIDC resource server) et spécifique-app (endpoints login/2FA/appareils de confiance) — nécessite un vrai tri architectural avant extraction, pas un déplacement mécanique |
| `fr.pivot.core.team` | ❌ N'existe pas. Aucune classe `Team`/`TeamMember` dans tout le repo, et **aucune table `teams`/`team_members` dans `V1__schema_init.sql`** (19 tables réelles : `tenants`, `users`, `access_tokens`, `module_activations`… pas de `teams`). Ce n'est pas une extraction en attente — c'est une feature jamais commencée |

Cet état est corroboré, presque au mot près, par l'issue `pivot-core#171` ("EN17.1 — Extraction réelle auth/tenant/team/modules vers pivot-core-starter", ouverte et assignée, constat fichier par fichier daté du 2026-07-08) et par `docs/backlog/EPIC-infra-multi-repo/ENABLERS/en-pivot-core-starter.md` — l'équipe a diagnostiqué le problème avant cet audit, ce qui est en soi une bonne pratique (voir section dédiée), mais le gap reste réel et bloquant pour tout module qui voudrait consommer `auth`/`team` aujourd'hui.

**Conséquence directe** : `pivot-collaboratif-core` (le seul module avec du code métier), `pivot-agilite-core` et `pivot-pilotage-core` ne déclarent **aucune** dépendance Maven vers `fr.pivot:pivot-core-starter` — vérifié (`grep pivot-core-starter` dans leurs `pom.xml` : zéro résultat, seulement des commentaires expliquant pourquoi elle est absente). C'est cohérent et documenté (pas une négligence), mais ça signifie qu'aujourd'hui, aucun module ne bénéficie de l'isolation tenant portée par `TenantContext`.

### Axe 2 — Contrat de plateforme `@pivot-platform/ui-core` (npm) — Score : 4/10

Écart symétrique côté frontend, non documenté jusqu'ici dans le backlog (contrairement au backend où l'issue #171 existe déjà) :

- **Scope npm incohérent** : `pivot-ui/projects/ui-core/package.json:2` déclare `"name": "@pivot-platform/ui-core"`, et `.npmrc` route bien `@pivot-platform:registry=https://npm.pkg.github.com`. Mais `pivot-ui/CLAUDE.md` (lignes 8, 22, 26-29, 78) documente systématiquement `@pivot/ui-core` — scope différent, jamais publiable tel quel. Le `CLAUDE.md` racine `pivot-platform/CLAUDE.md` reprend la même erreur ("publie `@pivot/ui-core` (npm)").
- **Sous-chemins d'export fictifs** : `pivot-ui/CLAUDE.md:26-29` documente `@pivot/ui-core/auth`, `/tenant`, `/shell`, `/modules` comme points d'entrée séparés. `projects/ui-core/ng-package.json` ne déclare qu'un seul `entryFile` (`src/public-api.ts`), aucun secondary entrypoint — ces sous-chemins ne peuvent pas exister avec la config actuelle.
- **Composants documentés inexistants** : `TenantService`, `TenantContextDirective`, `NavigationService` (annoncés ligne 27-28 du CLAUDE.md) n'apparaissent dans aucun fichier de `projects/ui-core/src/lib/`. Le contenu réel de `public-api.ts` exporte `provideUiCore`, `AuthService`, `tokenInterceptor`, `authGuard`/`authMatchGuard`/`guestGuard`, `ModuleStatusService`, `moduleGuard`, `HeaderComponent`, `FooterComponent` — un sous-ensemble cohérent (~1038 lignes) mais différent de ce qui est annoncé.

Impact : un développeur (humain ou agent) qui suivrait `pivot-ui/CLAUDE.md` à la lettre pour consommer la lib dans un repo module tenterait d'importer une dépendance npm inexistante (`@pivot/ui-core`) et des symboles qui n'existent pas (`TenantService`). Risque symétrique de l'Axe 1 côté frontend, mais qui n'a — à la différence du backend — aucune issue de suivi équivalente à `#171` aujourd'hui.

### Axe 3 — Couches Java (Controller/Service/Repository/DTO) — Score : 8.5/10

Point fort net de la plateforme. Vérifications faites sur `pivot-core/src/main/java` (~26 packages, `account`/`auth`/`contact`/`notification`/`plan`/`tenant`/`modules`/`core`) :

- **Zéro entité JPA exposée en API** — échantillon de 20 signatures de contrôleur (`AuthController`, `AdminUserController`, `SessionController`, `AccountEmailController`…) : toutes retournent des DTO (`AuthResponse`, `SessionDto`, `AdminUserDto`, `Map<String,String>`), jamais une entité `@Entity` directement.
- **Zéro `@Transactional` sur un contrôleur** — `grep -rl "@Transactional" --include="*Controller.java"` : aucun résultat sur tout `pivot-core`.
- **Aucune God Class** — le plus gros fichier de production sur l'ensemble des repos backend (`pivot-core` + `pivot-core-starter` + les 3 modules) est `EmailService.java` à 505 lignes ; le plus gros fichier du starter est `ModuleActivationService.java` à 322 lignes. Aucun fichier ne dépasse le seuil "hotspot" (800 lignes) ni a fortiori le seuil "critique" (1500 lignes + 40 méthodes publiques).
- **`pivot-collaboratif-core`** (seul module avec code métier, 3840 lignes) respecte la même discipline : `BoardController`/`BoardMemberController`/`BoardShareController`/`BoardJoinController` délèguent à des `*Service`, DTO dédiés (`BoardResponse`, `MemberResponse`…), exceptions métier typées (`BoardNotFoundException`, `BoardAccessDeniedException`…).

Réserve mineure : `ModuleActivationService.java` (322 lignes, starter) cumule activation, override SUPER_ADMIN, publication d'événements et métriques Micrometer dans une seule classe — juste au-dessus du seuil "à surveiller" (300 lignes), bien documenté (Javadoc explicite sur la séparation des responsabilités entre `module_activations` et `module_overrides`), pas un problème aujourd'hui mais à re-regarder si de nouvelles responsabilités s'y ajoutent.

### Axe 4 — Architecture Angular (shell `pivot-ui` + apps module) — Score : 7.5/10

`pivot-ui/src/app` suit une convention `core/`(31 fichiers)/`features/`(61 fichiers)/`shared/`(5 fichiers) cohérente ; aucun composant ne dépasse 435 lignes (`admin-users.component.ts`), largement sous le seuil hotspot.

Point fort spécifique : l'incubation `projects/design-system` (dans `pivot-ui`, avant la création du repo dédié prévu par l'ADR-007) est bien gouvernée — règle d'indépendance imposée par ESLint `no-restricted-imports` (interdit d'importer `app/core`, `app/shared`, `environments/*`), alignée sur la structure `tokens/`/`cdk/`/`components/`/`scss/` de l'ADR-007, Storybook + specs a11y déjà en place pour les 3 composants incubés (`confirm-dialog`, `toast`, `password-strength`). C'est une extraction "propre" en devenir, contrairement à l'extraction backend.

Réserves :
- `projects/design-system/package.json` déclare `"name": "design-system"` sans scope — cosmétique, à corriger avant publication réelle.
- Incohérence de layout entre le shell (`core/features/shared`) et l'app module la plus avancée : `pivot-collaboratif-ui/src/app/whiteboard/` est un sibling direct de `app/core/`, pas nichée sous un dossier `features/` — aucune convention Angular documentée pour les repos `-ui` module ne tranche ce point aujourd'hui. `pivot-agilite-ui`/`pivot-pilotage-ui` (bootstrap, un seul `features/home`) n'ont pas encore cette tension.

### Axe 5 — Frontière de confiance multi-repo (isolation tenant) — Score : 4/10

Conséquence directe de l'Axe 1 : `pivot-collaboratif-core` — le module avec la feature la plus avancée (whiteboard, EN08.1 WebSocket STOMP mergé) — n'a **aucune authentification réelle**. `RequestPrincipalResolver.java:15-26` (`fr.pivot.collaboratif.context`) résout l'identité de la requête depuis deux en-têtes HTTP bruts, non signés : `X-Pivot-User-Id` et `X-Pivot-Tenant-Id`. N'importe quel appelant peut se faire passer pour n'importe quel tenant/utilisateur simplement en positionnant ces en-têtes — c'est exactement le pattern qu'interdit `pivot-core/CLAUDE.md` ("`tenantId` extrait du body / header dans un endpoint" → IDOR cross-tenant), à la différence près que la règle ne s'applique formellement qu'à `pivot-core` et que ce module ne l'a pas encore adoptée.

Ce n'est **pas une découverte cachée** : le code porte un commentaire explicite (`// TODO: replace with SecurityContext extraction when pivot-core-starter adds auth (EN17)`), et `pivot-collaboratif-core/CLAUDE.md` a une section dédiée "Authentification (différée)" qui l'assume. De la même façon, `WhiteboardModuleCheck`/`DefaultWhiteboardModuleCheck.java:26-27` retourne toujours `true` (module considéré actif pour tous les tenants) en attendant le registre réel — bonne pratique d'anticipation (interface posée, implémentation par défaut isolée et documentée), mais qui matérialise la même dépendance non résolue.

Le point d'attention réel : la table `collaboratif.board` (`V1__schema_init.sql:9-17`) stocke `tenant_id UUID NOT NULL` sans aucune contrainte FK (ni vers `public.tenants`, ni vers `public.teams` — cette dernière **existe désormais** depuis EN17.1/`pivot-core#171`, mais `board` ne la référence pas encore, et une FK resterait de toute façon bloquée par l'incompatibilité de type UUID↔BIGSERIAL ; voir Axe 1). Isolation tenant actuellement **non vérifiable en base**, entièrement portée par la couche applicative — qui elle-même dépend d'en-têtes non authentifiés.

### Axe 6 — Infrastructure multi-repo (gateway nginx / parité dev-prod) — Score : 7/10

Le gateway nginx (`pivot-ui/nginx.conf`, EN17.7) est bien conçu : routage par préfixe (`/api/{module}/`, `/ws/{module}/`) avec résolution DNS différée (`resolver 127.0.0.11`) pour tolérer des modules pas encore déployés, logs JSON structurés avec label de module, gestion explicite des erreurs 502/503/504 par `error_page`. `nginx.dev.conf` (variante HTTP sans TLS, ajoutée par PR pivot-ui#117) documente explicitement en tête de fichier l'obligation de garder les deux fichiers synchronisés.

L'incident réel (`compose.yml` sans alias réseau `pivot-core` ni montage de `nginx.dev.conf`, corrigé par pivot-core#175 + pivot-ui#117, visible dans le `git diff HEAD origin/main` du checkout local qui n'avait pas encore ces 2 commits) est bien résolu sur `origin/main`. Mais **rien en CI ne vérifie la parité des deux fichiers** — la garantie repose entièrement sur un commentaire ("Keep both files' routing logic … in sync whenever one changes"), le mécanisme qui a justement échoué une première fois. Observation additionnelle : le checkout local porte encore une modification non committée de `compose.yml` (ajout d'un mapping de port `443:443` sur le service `frontend`, inerte puisque `nginx.dev.conf` n'écoute qu'en HTTP sur :80) — un exemple de plus de modification de config dev qui traîne sans être formalisée.

### Axe 7 — Hétérogénéité de maturité inter-modules — Score : 6/10

Vérifié : `pivot-agilite-core/src` et `pivot-pilotage-core/src` ne contiennent chacun qu'une seule classe (`PivotAgiliteApplication.java`, `PivotPilotageApplication.java`) — bootstrap pur, conforme à ce qu'annoncent leurs `CLAUDE.md`/`TODO-SETUP.md`. `pivot-collaboratif-core` (3840 lignes) et `pivot-collaboratif-ui` (755 lignes) sont les seuls avec du code métier réel.

Point de vigilance distinct de la maturité elle-même : **`pivot-collaboratif-core/CLAUDE.md` est en décalage complet avec son propre code**. Le fichier affirme "Statut actuel : bootstrap… aucune feature métier n'est implémentée", "Temps réel… pas encore branché", "Aucune implémentation de PivotModule" — alors que l'historique Git du repo montre 5 PR de fonctionnalités mergées (board CRUD US08.1.1-1.5, share token US08.2.1, join board US08.2.2, gestion des membres US08.2.3, isolation WebSocket STOMP par board EN08.1) et que `WhiteboardModuleCheck`/`DefaultWhiteboardModuleCheck` implémentent déjà une ébauche du contrat `PivotModule`. Un agent qui démarrerait une tâche sur ce repo en ne lisant que son `CLAUDE.md` partirait sur des hypothèses fausses sur l'existant.

Duplication de configuration Maven entre les 3 repos module-core (voir table DRY ci-dessous) — attendu tant qu'aucun parent POM partagé n'existe au-delà de `spring-boot-starter-parent`, mais un facteur de dérive supplémentaire pour cet axe.

---

## III. Duplication de code (DRY)

| # | Duplication | Fichiers concernés | Impact | Évolution |
|---|---|---|---|---|
| 1 | `checkstyle.xml` identique bit-à-bit | `pivot-core`, `pivot-agilite-core`, `pivot-pilotage-core` (vérifié par `diff`, zéro différence) | Toute évolution de règle qualité doit être répliquée manuellement dans N repos | Nouveau (premier audit) |
| 2 | ~100 lignes de config plugin Maven (compiler/checkstyle/spotbugs) dupliquées dans chaque `pom.xml` module-core, aucun parent POM partagé au-delà de `spring-boot-starter-parent` | `pivot-core/pom.xml` vs `pivot-agilite-core/pom.xml` (`diff` : sections `<build><pluginManagement>` quasi identiques) | Dérive de configuration silencieuse possible entre repos | Nouveau |
| 3 | Bloc de 6 `add_header` de sécurité répété ~10× par fichier, dans 2 fichiers (`nginx.conf` + `nginx.dev.conf`) | `pivot-ui/nginx.conf`, `pivot-ui/nginx.dev.conf` | Limitation nginx documentée (pas d'héritage d'`add_header` inter-blocs) — déjà à l'origine d'une divergence réelle (incident #175) | Connu, partiellement mitigé (commentaire explicite, pas de CI) |
| 4 | Contrat `PivotModule` (interface Java) recopié tel quel en exemple dans 2+ `CLAUDE.md` (`pivot-core`, `pivot-collaboratif-core`) sans référence à une source unique | `pivot-core/CLAUDE.md`, `pivot-collaboratif-core/CLAUDE.md` | Si l'interface évolue dans le code, rien ne force la mise à jour des deux copies documentaires | Nouveau |

## IV. Complexité / hotspots

Aucun hotspot (>800 lignes) ni fichier critique (>1500 lignes + 40 méthodes publiques) trouvé sur l'ensemble de la plateforme. Fichiers de production les plus proches du seuil "à surveiller" (300-800 lignes) :

| Fichier | Lignes | Repo | Alerte |
|---|---|---|---|
| `fr/pivot/auth/service/EmailService.java` | 505 | pivot-core | À surveiller |
| `fr/pivot/auth/service/SessionService.java` | 502 | pivot-core | À surveiller |
| `fr/pivot/auth/service/TokenService.java` | 474 | pivot-core | À surveiller |
| `fr/pivot/account/service/AccountDeletionService.java` | 398 | pivot-core | À surveiller |
| `fr/pivot/auth/service/OidcAuthService.java` | 368 | pivot-core | À surveiller |
| `fr/pivot/core/modules/ModuleActivationService.java` | 322 | pivot-core-starter | À surveiller |
| `admin-users.component.ts` | 435 | pivot-ui | À surveiller |
| `navbar.component.ts` | 303 | pivot-ui | À surveiller |

Aucune évolution possible vs version précédente (premier audit formel).

---

## Statut des findings/dettes historiques

**N/A — premier audit formel.** Aucun rapport `audit-architecture.md` antérieur ne contenait de score réel (v1, 2026-06-20, `Score : —`) — il n'y a donc aucun finding historique à confronter. Les "points d'attention" listés dans le brouillon v1 (extraction `pivot-core-starter`, incident nginx/compose, hétérogénéité des modules, ADR-007) ont été repris, vérifiés sur le code réel et transformés en findings sourcés ci-dessus plutôt que reconduits tels quels.

| # | Item (v1) | Statut | Preuve |
|---|---|---|---|
| — | Aucun finding v1 à statut réel | N/A | v1 n'avait pas de score, seulement des points d'attention préparatoires |

---

## Bonnes pratiques confirmées / Points forts

1. **Discipline de couches Java sans exception constatée** — zéro entité JPA exposée en API sur tout `pivot-core` et `pivot-collaboratif-core`, zéro `@Transactional` sur un contrôleur, DTO systématiques en entrée/sortie.
2. **Direction de dépendance Maven strictement respectée** — `pivot-core-starter` ne référence aucun package `pivot-core-app`-only (`fr.pivot.modules.*`, `fr.pivot.auth.*`, `fr.pivot.tenant.*`), malgré une extraction encore partielle.
3. **Zéro God Class sur toute la plateforme backend** — le plus gros fichier de production (`EmailService.java`, 505 lignes) reste à 63% du seuil hotspot (800 lignes).
4. **Auto-diagnostic organisationnel de qualité** — l'équipe a ouvert et documenté `pivot-core#171` avec un état fichier-par-fichier de l'extraction `pivot-core-starter` avant même ce premier audit formel ; le backlog (`en-pivot-core-starter.md`) reflète la même exigence de vérité que cet audit.
5. **Gateway nginx bien conçu** — résolution DNS différée tolérant les modules non déployés, logs structurés JSON par module, distinction prod/dev explicite et commentée.
6. **Incubation `design-system` disciplinée** — règle d'indépendance imposée par tooling (ESLint `no-restricted-imports`), pas seulement par convention documentaire ; alignement vérifié avec ADR-007 ; Storybook + tests a11y déjà en place pour 3 composants avant même la création du repo dédié.
7. **Anticipation propre du contrat de module côté collaboratif** — `WhiteboardModuleCheck`/`RequestPrincipalResolver` posent des interfaces claires avec implémentations par défaut isolées et documentées (`TODO` explicite), plutôt que de bloquer le développement ou de improviser un mécanisme d'auth maison — conforme à l'interdit explicite du `CLAUDE.md` du repo ("Réimplémentation locale d'un mécanisme d'auth… dérive d'architecture").

---

## Score par grille — SOLID + organisation des couches

| Catégorie | Score | Findings/dette actifs |
|---|---|---|
| SOLID (SRP/OCP/LSP/ISP/DIP) | 7.5/10 | `ModuleActivationService` cumule plusieurs responsabilités (surveillance, pas bloquant) ; direction de dépendance Maven exemplaire (DIP respecté) |
| Organisation des couches (Controller/Service/Repository/DTO) | 8.5/10 | Aucune violation constatée sur l'échantillon audité |
| Duplication de code (DRY) | 5.5/10 | 4 duplications identifiées (config Maven ×3 repos, headers nginx, contrat `PivotModule` recopié) |
| Complexité cyclomatique / hotspots | 9/10 | Aucun hotspot ni fichier critique ; 8 fichiers "à surveiller" (300-800 lignes) |
| Contrat de plateforme Maven (`pivot-core-starter`) | 5/10 | `auth`/`team` non extraits ; `TenantContextHolder`/`@TenantAware` documentés mais inexistants |
| Contrat de plateforme npm (`@pivot-platform/ui-core`) | 4/10 | Scope documenté erroné, sous-chemins fictifs, composants documentés inexistants |
| Frontière de confiance multi-repo (isolation tenant) | 4/10 | Whiteboard (module le plus avancé) sans authentification réelle, en-têtes HTTP non signés |

---

## Plan d'action

### P0 — Bloquant maintenabilité, ROI immédiat (< 1 jour, zéro risque de régression)

- Corriger `pivot-core/CLAUDE.md` (lignes 9-19, 71, 86) pour ne plus décrire `fr.pivot.core.auth`/`fr.pivot.core.team` comme déjà exportés, et retirer "projet single-module" (obsolète depuis PR #167/#173) — mise à jour purement documentaire, aucun risque de régression.
- Corriger la Javadoc de `PivotCoreAutoConfiguration.java:21-31` pour ne plus lister `TenantContextHolder`/`@TenantAware`/`fr.pivot.core.auth`/`fr.pivot.core.team` comme exportés tant qu'ils n'existent pas.
- Aligner `pivot-ui/CLAUDE.md` et `pivot-platform/CLAUDE.md` sur le scope npm réel (`@pivot-platform/ui-core`, pas `@pivot/ui-core`) et retirer les sous-chemins d'export et composants (`TenantService`, `NavigationService`) qui n'existent pas dans `public-api.ts`.
- Mettre à jour la section "Statut actuel" de `pivot-collaboratif-core/CLAUDE.md` pour refléter les 5 US mergées (board CRUD, share token, join, membres, WebSocket STOMP) au lieu de "bootstrap, aucune feature".

### P1 — Dette architecturale majeure (effort élevé, coût du report croissant)

- Extraction réelle de `fr.pivot.core.auth` vers `pivot-core-starter` (issue `pivot-core#171`, point 3) — nécessite un tri architectural préalable (générique vs spécifique-app), pas un déplacement mécanique. Bloque toute authentification réelle pour les modules.
- **RÉALISÉ depuis l'audit initial** — Création de la feature `Team`/`TeamMember` (`fr.pivot.core.team`, tables `public.teams`/`team_members`) : livrée par EN17.1/`pivot-core#171` (entités + migration + repositories), débloquant la convention FK cross-schéma `public.teams(id)` documentée pour `pilotage`/`agilite`/`collaboratif`. Le concept est en cours de raffinage en modèle organisationnel (unités/équipes) — voir [ADR-027](pathname:///pivot-docs/adr/ADR-027-modele-organisationnel-unites-equipes).
- Une fois l'auth extraite : brancher `pivot-collaboratif-core` sur `pivot-core-starter` pour remplacer `RequestPrincipalResolver` (en-têtes HTTP non signés) par une extraction réelle depuis le token porteur — actuellement le module le plus avancé de la plateforme n'a aucune isolation tenant vérifiable.

### P2 — Amélioration architecture (planifiable, non urgent)

- Introduire un parent POM partagé (au-delà de `spring-boot-starter-parent`) pour centraliser `checkstyle.xml`/config plugins actuellement dupliqués à l'identique dans 3 repos module-core.
- Ajouter une vérification CI (diff automatisé ou génération depuis un template commun) garantissant la parité `nginx.conf`/`nginx.dev.conf` — la garantie actuelle repose uniquement sur un commentaire, déjà pris en défaut une fois (incident #175).
- Finaliser un layout Maven idiomatique pour `pivot-core-app` (actuellement sans `src/` propre, pointeur vers `src/` racine via `<sourceDirectory>`) une fois l'extraction du starter terminée.

### P3 — Qualité continue

- Nommer correctement `projects/design-system/package.json` (`"design-system"` → scope cohérent) avant toute publication réelle.
- Documenter une convention de layout Angular pour les repos `-ui` module (actuellement `pivot-collaboratif-ui` place `app/whiteboard/` en sibling de `app/core/`, sans consensus écrit avec le shell `core/features/shared`).
- Surveiller `ModuleActivationService.java` (322 lignes) si de nouvelles responsabilités s'y ajoutent — actuellement bien documenté, pas encore problématique.

### Externe — hors du contrôle direct de l'équipe

- Création effective du repo `pivot-design-system` (ADR-007, Enabler `EN17.2`, `Stage: Backlog`) — dépend d'un jalon de planning, pas d'un blocage technique ; l'incubation actuelle dans `pivot-ui` est une préparation saine en attendant.

---

## Conclusion

**Dette maîtrisée mais réelle — pas bloquant pour l'existant, bloquant pour la suite.** Le code déjà écrit est de bonne facture (couches propres, aucun hotspot, direction de dépendance Maven exemplaire) et ne nécessite pas de refonte. Ce qui manque n'est pas de la dette accumulée par négligence mais un contrat de plateforme inter-repo encore à moitié construit — connu côté backend (issue #171 déjà ouverte), pas encore tracé côté frontend (scope npm, sous-chemins fictifs) avant cet audit. Réserve principale : tant que `fr.pivot.core.auth` et la feature `Team` ne sont pas livrées, aucun module ne peut brancher une isolation tenant réelle — le module le plus avancé (whiteboard) fonctionne aujourd'hui sur des en-têtes HTTP non signés, un choix documenté et assumé mais qui doit rester temporaire. Aucun P0 ne porte sur du code applicatif — tous sont des corrections documentaires mécaniques et sans risque.

---

*Architecte Modules (coordination) + Architecte Java/Spring (pivot-core) + Architecte Angular (pivot-ui) — 2026-07-08 — indépendant — distribution restreinte*

---

## Historique des révisions

| Version | Date | Score | Évolutions principales |
|---------|------|-------|------------------------|
| v1 | 2026-06-20 | — | Initialisation |
| v2 | 2026-07-08 | 6.2/10 | Premier audit formel réel. Fondations Java/Angular saines confirmées (zéro God Class, couches propres, dépendance Maven exemplaire) ; écart majeur documenté entre le contrat de plateforme annoncé (`pivot-core-starter` : auth/team/TenantContextHolder/@TenantAware ; `@pivot-platform/ui-core` : scope npm, sous-chemins, composants) et son état réel, corroboré par `pivot-core#171` côté backend et complété côté frontend (non tracé jusqu'ici) ; frontière de confiance non sécurisée identifiée sur le module whiteboard (en-têtes HTTP non signés) ; plan d'action P0-P3 + Externe. |
