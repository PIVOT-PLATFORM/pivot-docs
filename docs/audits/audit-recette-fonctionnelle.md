# Audit — recette fonctionnelle (Socle)

**Statut :** 5/10 — v1 (score global Socle, non revérifié en v2 — voir v2 pour le scope E30/F08.x)
**Dernière révision :** 2026-07-14 (v2, scope E30/F08.x — Sprint 10/11)
**Profil agent responsable :** Expert QA + Product Owner + Architecte Temps Réel / WebSocket

## Date : 2026-07-13 — v1

## Expert : Expert QA (recette fonctionnelle bout-en-bout)

## Périmètre

Recette fonctionnelle **en conditions réelles** (application déployée qui tourne, pas seulement
lecture de code) de tous les items du **Socle déclarés « faits »** dans
[`STATUS.md`](pathname:///pivot-docs/backlog/STATUS) — c'est-à-dire `Stage: ✅` ou mergés « en attente de recette ».
Objectif : vérifier que ce qui est déclaré fait l'est **réellement au niveau utilisateur**, en
prenant le POC de référence [`PouetPouet/FEATURES.md`](https://github.com/PIVOT-PLATFORM/PouetPouet)
comme source de vérité fonctionnelle.

**Méthode** : 4 agents de validation en parallèle + reprise manuelle du parcours whiteboard, via
Playwright headless sur la stack Docker complète en marche (shell `pivot-ui` sur `:80`,
`pivot-collaboratif-ui` standalone sur `:8090`, backend `pivot-core` + 3 modules-core, postgres,
redis, activemq, mailpit). Comptes de test seed (`super_admin`/`admin`/`user@pivot.test`),
vérification des emails via l'API Mailpit, inspection réseau (statuts HTTP), détection automatique
des clés i18n brutes affichées à l'écran et dans les attributs `aria-label`/`title`.

| Domaine | Repos | Verdict |
|---------|-------|---------|
| Auth & IAM (E01) | pivot-core, pivot-ui | ⚠️ Partiel — 3 KO bloquants |
| Espace compte (E02) | pivot-core, pivot-ui | ⚠️ Partiel — RGPD/sécurité non découvrables |
| Système de modules (E03) | pivot-core, pivot-ui | ✅ Admin tenant OK · ⚠️ clé i18n brute au guard |
| Administration (E06) | pivot-core, pivot-ui | ⚠️ SUPER_ADMIN non recettable (bloqué par E01) |
| Shell & UX (E16) | pivot-ui | ⚠️ i18n connecté cassé |
| Collaboration — noyau whiteboard (E30/F08.x) | pivot-collaboratif-* | ❌ Éditeur i18n KO en intégration shell |
| Observabilité (E04) | pivot-core, modules-core | ❌ Prometheus non opérant (4/4 backends) |
| CI/CD (E05) | tous | ✅ Conforme et solide |
| Infra & multi-repo (E07/E17) | pivot-core, pivot-infra | ✅ Solide · ⚠️ prod 2/4 backends |

## Synthèse

Les **parcours nominaux** du Socle sont majoritairement solides (connexion, inscription,
vérification email, reset mot de passe, édition de profil texte, navigation, thème, contact,
administration tenant, CI/CD, gateway nginx multi-repo). **Mais plusieurs items déclarés `✅ Done`
présentent des défauts fonctionnels réels** — dont exactement le symptôme signalé par le mainteneur
(clés i18n brutes affichées en lieu et place des libellés). Deux causes transverses dominent :

1. **Bug i18n systémique** : des appels `transloco.translate()` **synchrones** exécutés avant le
   chargement du catalogue de traduction rendent des clés brutes à plusieurs endroits ; aggravé,
   pour le whiteboard, par une **dérive de version** entre la lib publiée consommée par le shell et
   les fichiers i18n.
2. **Écart « déclaré fait » vs « atteignable »** : plusieurs fonctionnalités codées et marquées
   `✅ Done` ne sont **branchées nulle part dans l'UI** (partage whiteboard, changement d'e-mail,
   sessions actives, suppression de compte RGPD) → inaccessibles à un utilisateur réel.

> **Aucun `Stage: ✅` n'est modifié par cet audit** (la recette reste une décision du mainteneur).
> Ce document liste les écarts à traiter **avant** de valider la recette des items concernés.

## Le symptôme signalé : `whiteboard.board.untitled` — REPRODUIT et expliqué

Le mainteneur signalait des titres de boutons KO du type `whiteboard.board.untitled`. **Reproduit**
en conditions réelles dans l'**éditeur de tableau blanc, à l'intérieur du shell `:80`** (chemin de
production réel, module lazy-loadé). En ouvrant un board, s'affichent en clés brutes :

- le **titre du board** : `whiteboard.board.untitled` ;
- `whiteboard.groups.title`, `whiteboard.board.reset` ;
- **toute la toolbar** en `aria-label`/`title` : `whiteboard.toolbar.{select,pan,sticky,text,rect,circle,diamond,triangle,line,star,draw,table,link,colorGroup,pickColor}`.

**Root cause (double)** :

1. `whiteboard.board.untitled` (et `whiteboard.groups.title`) **n'existent dans aucun fichier i18n**
   (ni `pivot-ui/public/assets/i18n/{fr,en}.json`, ni
   `pivot-collaboratif-ui/public/assets/i18n/{fr,en}.json` — sous `whiteboard.board` on ne trouve
   que `list`/`rename`/`delete`). Une clé référencée par le template mais absente du catalogue est
   rendue **littéralement** par Transloco.
2. **Dérive de version** : le shell consomme la lib publiée
   **`@pivot-platform/collaboratif-ui@0.2.0`** (`pivot-ui/package.json`), dont les templates
   utilisent les clés `whiteboard.toolbar.*` / `whiteboard.groups.title` / `whiteboard.board.untitled`,
   alors que la **source actuelle** du module a migré ces clés vers `whiteboard.canvas.toolbar.*`.
   Les fichiers i18n embarqués par le shell ne contiennent donc **ni l'ancien jeu ni le nouveau** →
   toolbar + titre + reset rendus bruts.

La **liste** des tableaux (« Mes tableaux », « Nouveau tableau ») est correctement traduite : le
défaut est concentré dans l'**éditeur**. C'est pourquoi une validation limitée à la page liste (ou au
standalone `:8090`) conclut à tort que « l'i18n est saine ».

> Portée : E30 noyau F08.x/EN08.x, déclaré « 17/17 mergés, en attente de recette ». La recette
> fonctionnelle de l'éditeur whiteboard **ne peut pas passer en l'état**.

## Findings par sévérité

### Bloquants

| # | Item déclaré | Constat | Localisation |
|---|--------------|---------|--------------|
| B1 | E30 F08.x — éditeur whiteboard (shell) | Titre + toolbar + groupes rendus en **clés i18n brutes** (cf. section dédiée) | lib `@pivot-platform/collaboratif-ui@0.2.0` + `pivot-ui`/`pivot-collaboratif-ui` i18n |
| B2 | US01.4.1 — OTP appareil inconnu (`✅`) | Un login depuis un contexte navigateur neuf réussit **directement en 200** avec token complet, sans jamais passer par `/auth/device-confirm` ; device auto-trusté silencieusement (seul un email d'alerte a posteriori). La protection MFA par appareil **n'a aucun effet réel**. | `pivot-core` auth device-confirm |
| B3 | US02.1.2 — préférence de langue, utilisateur **connecté** (`✅`) | La navbar envoie `PATCH /api/account/profile` avec seulement `{"preferredLanguage":...}` → **400 `INVALID_NAME`** (le backend exige toujours prénom/nom). Échec **silencieux** : le sélecteur FR/EN ne fait plus rien une fois connecté (fonctionne en anonyme). | `pivot-ui navbar.component.ts` `setLang()` + endpoint profil `pivot-core` |
| B4 | US02.1.1 — upload avatar (`✅`) | **HTTP 500** systématique : `AvatarStorageException` ← `AccessDeniedException: /app/data` (droits du volume Docker). Reproductible à 100 %. | `pivot-core AvatarStorageService.java:88` + infra volume |
| B5 | F03.3 / F06.2 — périmètre SUPER_ADMIN (`✅`) | Connexion `super_admin@pivot.test` **cassée en 500** : `NonUniqueResultException` dans `SessionService.verifyDeviceOtp` (fingerprint d'appareil trop grossier → doublons de lignes « pending OTP »). Bloque **en cascade** la recette de toute la gestion tenants/plans (E06). Effet de bord persistant en base à nettoyer. | `pivot-core SessionService.java:275` |
| B6 | EN04.3 — Micrometer → Prometheus (`✅`) | `/actuator/prometheus` **non opérant sur les 4 backends** : **403** sur pivot-core (règle `SecurityConfig` manquante), **404** sur les 3 modules-core (dépendance `micrometer-registry-prometheus` absente des `pom.xml` malgré `exposure.include: prometheus`). Aucun scraping possible. | `pivot-core SecurityConfig.java:106` + `pom.xml` des 3 modules-core |

### Majeurs

| # | Item déclaré | Constat | Localisation |
|---|--------------|---------|--------------|
| M1 | EN03.2/US03.2.2 — guard module désactivé (`✅`) | Le toast affiche la **clé brute** `modules.guard.names.whiteboard module not available` au lieu du libellé. Race condition : `translate()` synchrone avant chargement du catalogue. Même classe de bug que B1/B3. | `pivot-ui module.guard.ts:61` |
| M2 | US16.2.1/16.2.2 — grille des modules (`✅`) | Noms/descriptions de modules **jamais traduits** (codés en dur en français dans `module-metadata.ts`, affichés sans pipe `\| transloco`) ; les cartes « à venir » affichent leur **id brut** comme titre (`session`, `roadmap`, `survey`, `quiz`). | `pivot-ui module-metadata.ts`, `home.component.ts` |
| M3 | Clés i18n brutes en `aria-label`/`title` | `nav.theme_to_dark`, `nav.notifications` rendus littéralement (tooltip natif + lecteurs d'écran) tant qu'aucun changement de langue explicite n'a eu lieu — impact **accessibilité**. | `pivot-ui navbar.component.ts` ~l.260-288 |
| M4 | US08.2.3 — UI partage whiteboard (`✅ Done`) | Le composant `app-share-panel` **existe mais n'est branché dans aucun template** ; pas de bouton « Partager » dans l'éditeur → gestion de lien/rôles/membres **inaccessible**. | `pivot-collaboratif-ui` |
| M5 | US02.2.2 / US02.2.3 / US02.2.4 (`✅`) | Changer son e-mail, sessions actives, **suppression de compte RGPD** : routes fonctionnelles mais **reliées par aucun lien** dans le shell (menu utilisateur ne les expose pas) → non découvrables. | `pivot-ui navbar.component.ts` / `app.routes.ts` |
| M6 | EN07.1 — docker-compose.prod complet (`✅`) | `pivot-agilite-core` et `pivot-pilotage-core` sont **commentés/désactivés** dans `docker-compose.prod.yml` : la stack prod ne démarre que 2 des 4 backends, contrairement à la promesse « infra multi-repo » (E17). | `pivot-core docker-compose.prod.yml:218-287` |
| M7 | US01.1.1 — renvoi silencieux du lien d'activation (`✅`) | Aucun email envoyé après tentative de connexion sur `unverified@pivot.test` (vérifié Mailpit avant/après) — l'AC « renvoi silencieux du lien d'activation » ne se déclenche pas. | `pivot-core` auth |

### Mineurs

| # | Item | Constat |
|---|------|---------|
| m1 | Standalone `:8090` | 502 sur `/api/collaboratif` — nginx du standalone proxifie vers `backend:8083`, nom qui résout vers pivot-core (pas de listener 8083). Le **standalone n'est pas recettable** ; la recette whiteboard doit passer par le shell `:80`. |
| m2 | US06.1.3 — sélecteur de rôle admin | `<select>` **vide** pour la ligne SUPER_ADMIN (`ROLE_SUPER_ADMIN` ne correspond à aucune `<option>`). |
| m3 | Permissions admin | Le bouton « Désactiver » reste **actif** sur un compte SUPER_ADMIN pour un simple ADMIN tenant — refus backend **non vérifié** (à confirmer, risque d'escalade). |
| m4 | `/api/auth/refresh` | 401 systématique à quasiment chaque chargement de page (y compris avant auth) — bruit console à clarifier. |
| m5 | Éditeur whiteboard — activité Vote | 404 sur `/api/collaboratif/whiteboard/boards/{id}/vote/{current,last}` (endpoints non servis) — hors périmètre F08.x (Vote = F30.x `⬜`), mais appelé par la lib publiée. |
| m6 | Docs désynchronisées (positif) | E17 **sous-estime** sa propre avancée : `pivot-core-starter` est publié **et déjà consommé** par `pivot-collaboratif-core` + `pivot-agilite-core` (imports réels) — la note backlog « aucun module ne consomme encore » est obsolète. `pivot-core/CLAUDE.md` dit encore « single-module » (repo multi-module depuis EN17.1). |

## Ce qui est confirmé conforme (recette fonctionnelle OK)

- **Auth nominal** : connexion email/mdp, refus `blocked`/`unverified` (message générique
  anti-énumération), inscription + vérification email (Mailpit), mot de passe oublié + reset par
  token — bout en bout.
- **Espace compte** : édition prénom/nom persistée, export RGPD (`/account/export`) découvrable.
- **Administration tenant** : cycle activation → guard bloque → réactivation d'un module ;
  liste/filtres utilisateurs ; désactivation avec confirmation ; **contrôle d'accès robuste dans les
  deux sens** (ADMIN bloqué de `/superadmin/*`, USER bloqué de tout l'admin).
- **Shell** : navigation, menu utilisateur, bascule de thème (persistée), footer, pages légales,
  formulaire de contact (+ email de confirmation), dashboard.
- **CI/CD (E05)** : tous les workflows existent réellement (CodeQL, Semgrep, Gitleaks, Trivy, SBOM
  CycloneDX, SLSA L3, Scorecard, DAST ZAP), actions épinglées par SHA, branch protection vérifiée en
  live via l'API GitHub.
- **Infra/multi-repo (E07/E17)** : `pivot-core-starter` publié et **consommé** ; gateway nginx
  multi-backend vérifiée dans le conteneur en marche ; observabilité health/readiness OK.

## Écarts de parité vs POC — NON-KO (conformes au déclaré)

Les fonctionnalités whiteboard avancées du POC (Vote, Timer, Session, Import/Export Klaxoon,
post-it, cadres, connecteurs, formes avancées, favoris, corbeille, recherche, toolbar haute) sont
classées `⬜ Backlog` sous F30.x et **ne sont pas déclarées faites** — leur absence dans pivot n'est
donc **pas** un KO. Le noyau livré = CRUD tableaux + canvas temps réel (6 outils) + présence +
undo/redo + templates, conforme au périmètre annoncé.

## Recommandations (ordre de priorité)

1. **Corriger le bug i18n whiteboard (B1)** avant toute recette d'E30/F08.x : réaligner la version
   publiée de `@pivot-platform/collaboratif-ui` avec les clés i18n **et** ajouter les clés manquantes
   (`whiteboard.board.untitled`, `whiteboard.groups.title`). Envisager un **scope Transloco embarqué
   par la lib** (`provideTranslocoScope` + loader embarqué dans le package) pour supprimer la
   synchronisation manuelle des JSON à 3 endroits (dette structurelle identifiée).
2. **Corriger la classe de bug `translate()` synchrone** (B3, M1, M2, M3) : utiliser
   `selectTranslate()` (observable) ou garantir le chargement du catalogue avant résolution.
3. **Débloquer SUPER_ADMIN (B5)** : nettoyer les lignes « pending OTP » en base + affiner le
   fingerprint d'appareil / dédupliquer les pending — pré-requis pour recetter E06 (F06.2).
4. **B2/B4/B7** : rebrancher réellement l'OTP appareil inconnu, corriger les droits du volume
   `/app/data`, accepter un `PATCH` de langue seul.
5. **Rendre découvrables** les fonctions RGPD/sécurité (M5) et le partage whiteboard (M4).
6. **Observabilité (B6)** : ajouter `micrometer-registry-prometheus` aux 3 modules-core + `permitAll`
   sur `/actuator/prometheus` côté pivot-core.
7. **Prod (M6)** : réactiver `pivot-agilite-core`/`pivot-pilotage-core` dans `docker-compose.prod.yml`.

## Preuves

Rapports détaillés par domaine, tableaux Item/statut/preuve et captures d'écran (parcours réels)
produits lors de la campagne du 2026-07-13 (77 screenshots : préfixes `wb-`, `auth-`, `admin-`,
`shell-`). Détail des fichiers/lignes de code référencés dans chaque finding ci-dessus.

## Date : 2026-07-14 — v2 (Sprint 10/11, E30/F08.x uniquement)

## Expert : Expert QA + Architecte Temps Réel / WebSocket

### Périmètre

Recette fonctionnelle du **Sprint 10** (US08.1.6 favoris, US08.1.7 corbeille, US08.1.8 recherche,
US08.2.4 paramètres+reset) et du **Sprint 11** (EN08.4, modèle `Card` typé) — **pas** un nouveau
balayage du Socle entier (E01-E17 restent à l'état v1 ci-dessus, non revérifiés). Déclenchée par
une question directe du mainteneur (« as-tu bien fini le Sprint 10 ? ») après la découverte d'un
bug bloquant en recette manuelle sur EN08.4.

**Méthode** : E2E Playwright réels contre un backend `pivot-collaboratif-core` **réellement
déployé** (images GHCR successives `v0.1.2`→`v0.2.0`→`v0.2.1`→`v0.3.0`, pas un mock ni un
Testcontainers isolé) pour Sprint 10 ; recette manuelle bout-en-bout par le mainteneur (frontend
`@pivot-platform/collaboratif-ui@0.3.0` + backend `main`) pour EN08.4, complétée par des tests
d'intégration rejouant le vocabulaire wire réel sur une vraie connexion STOMP (Testcontainers) pour
la vérification post-fix.

### Constat central : les mocks encodaient la même hypothèse fausse que le code testé

Les 4 bugs ci-dessous ont un point commun : **chacun était couvert par des tests qui passaient**
(Vitest côté front avec des réponses HTTP mockées à la main, tests d'intégration backend appelant
les handlers avec les noms d'action « corrects » supposés) — mais le mock lui-même reproduisait la
mauvaise hypothèse (casse, nom de champ, nom wire) plutôt que le contrat réel de l'autre côté.
Aucun de ces bugs n'a été détecté avant qu'un test exerce **le vrai réseau contre le vrai backend**
(E2E réel, ou recette manuelle). Prévention proposée : voir Recommandations.

### Findings

| # | Item | Constat | Localisation | Fix |
|---|------|---------|---------------|-----|
| S1 | US08.2.4 — bouton Paramètres (settings) | `BoardResponse.role` sérialisé en **minuscules** (`"owner"`) côté REST, incohérent avec `MemberResponse`/le broadcast WS JOIN (**majuscules**, `"OWNER"`). Le frontend ne compare qu'en majuscules → `isOwner()` toujours faux via le chemin REST. Le mock Vitest du composant utilisait déjà `role: 'OWNER'` (majuscules) — jamais exercé contre la vraie réponse HTTP. | `pivot-collaboratif-core` `BoardResponse.java` | `pivot-collaboratif-core#70` (mergé, publié `v0.2.1`) |
| S2 | Page canvas — titre du board | `board.store.ts#loadBoard()` typait/lisait la réponse `GET /whiteboard/boards/{id}` comme ayant un champ `name`, alors que le backend renvoie `title`. Le H1 du canvas n'a donc jamais affiché de titre réel, repli permanent sur « Tableau sans titre » — bug préexistant au Sprint 10 (noyau Socle), jamais détecté car aucun test front ne comparait au vrai payload REST. | `pivot-collaboratif-ui` `board.store.ts` | Corrigé directement dans `pivot-collaboratif-ui#95` (mergé, publié `v0.4.0`) |
| S3 | US08.2.4 — reset board, notification temps réel | `WhiteboardBroadcastService#broadcastReset` diffusait le type wire `"RESET"` (nom d'enum Java brut) ; le front écoute `'board:resetted'` (participe passé, vocabulaire PouetPouet). L'appel REST réussissait toujours (204) et l'auteur du reset voyait sa modale se fermer, mais **aucun autre client déjà connecté ne voyait le canvas se vider en temps réel**. Couverture existante (`BoardParityControllerIT` MockMvc + broadcaster mocké, `WhiteboardBroadcastServiceTest` Mockito) vérifiait seulement que le broadcaster était *appelé*, jamais ce qu'un vrai client *recevait*. | `pivot-collaboratif-core` `WhiteboardBroadcastService.java` | `pivot-collaboratif-core#72` (mergé, publié `v0.3.0`) |
| S4 | EN08.4 — toutes les actions `CARD_*` + JOIN/LEAVE/CURSOR_MOVE | **Bloquant** — désync de contrat wire complet entre `board.store.ts` (vocabulaire PouetPouet `card:create`/`board:join`/`board:cursor`, minuscules deux-points) et `CanvasActionService` (résolution `CanvasEventType.valueOf(type.toUpperCase())`, majuscules). Toute action carte était **jetée silencieusement** côté serveur (`Unknown canvas action type … dropped`) ; `board:join`/`board:leave` envoient en plus un `data` **scalaire** (chaîne, pas objet) → `MessageConversionException` avant même la résolution du type. Symptôme utilisateur : impossible d'ajouter un post-it. Trouvé en creusant le même contrat : le rejeu d'état initial (`board:state`) partait sur `/queue/board-state` (queue STOMP par utilisateur), à laquelle le transport front ne s'abonne jamais. | `pivot-collaboratif-core` `CanvasEventType`/`CanvasActionService`/`CanvasActionMessage`/`WhiteboardBroadcastService.java` | `pivot-collaboratif-core#68` (mergé, publié `v0.3.0`) — voir correctif détaillé dans `en-modele-card-type.md` |

### Ce qui est confirmé conforme (Sprint 10, hors S1-S4)

- US08.1.6 (favoris), US08.1.7 (corbeille/restauration), US08.1.8 (recherche) : **purement REST**,
  aucun chemin WebSocket — vérifié qu'aucune de ces 3 US n'appelle `emit`/`on` du transport WS,
  hors du périmètre de la classe de bug S3/S4. 12/12 E2E réels verts.
- US08.2.4 (édition nom/description/activités, save-as-template) : vérifié bout-en-bout, y compris
  la persistance server-side après reload.

### Recommandations (complète les recommandations v1)

1. **Test de contrat wire partagé** (déjà suggéré par le mainteneur en recette sur `#68`, non
   traité) : `en-modele-card-type.md` comme source de vérité vivante du vocabulaire `card:*`/
   `board:*`, vérifiée par un test automatisé plutôt que redéfinie indépendamment de chaque côté.
   Devient plus urgent à mesure que F08.7 (connecteurs), F08.8 (cadres), F08.12 (facilitation)
   étendent le même contrat en Sprint 12-16.
2. **Mocks/tests unitaires front-back** : lors de la création d'un mock de réponse HTTP/WS, copier
   le payload réel observé (capture réseau ou fixture générée depuis le DTO backend réel), pas une
   reconstruction manuelle supposée — les 4 bugs S1-S4 auraient tous été détectés par un mock
   généré depuis la vraie réponse plutôt qu'écrit à la main.
3. **Étendre la classe de vérification E2E réel** (déjà en place pour Sprint 10 REST) **aux
   échanges WebSocket** — aucune des ITs backend existantes (avant `#68`/`#72`) n'exerçait le vrai
   chemin de désérialisation JSON → dispatch → rediffusion sur une vraie connexion STOMP.

## Historique des révisions

| Version | Date | Score | Note |
|---------|------|-------|------|
| v1 | 2026-07-13 | 5/10 | Première recette fonctionnelle bout-en-bout du Socle déclaré fait, contre le POC PouetPouet. 6 bloquants, 7 majeurs. |
| v2 | 2026-07-14 | — (scope E30/F08.x uniquement, pas un rescore Socle global) | Sprint 10 (US08.1.6/7/8, US08.2.4) + Sprint 11 (EN08.4) : 4 bugs réels trouvés et corrigés (S1-S4), tous invisibles aux tests unitaires/mocks existants, détectés uniquement par recette manuelle ou E2E contre le vrai backend. |
