# Audit Modules — PIVOT Platform

## Date : 2026-07-08 — v2
## Expert : Architecte Modules
## Périmètre : `pivot-core` (contrat `PivotModule`, `ModuleRegistry`, cache Redis, API REST `/api/modules`), `pivot-core-starter` (bibliothèque publiée), `pivot-agilite-core`/`pivot-collaboratif-core`/`pivot-pilotage-core` (consommation du contrat), `pivot-ui` (`@pivot-platform/ui-core` — `moduleGuard`/`ModuleStatusService`), `pivot-agilite-ui`/`pivot-collaboratif-ui`/`pivot-pilotage-ui` (guards de module). Vérification code réel + git log + issues GitHub + runs CI, pas seulement les `CLAUDE.md`

---

## Score global : 5.4/10 (premier audit formel — pas de tendance)

Premier audit formel du système de modules — aucune version antérieure notée (v1 restait à
`Statut: À compléter`, score `—`). Le score reflète une architecture centrale (pivot-core) solide
et bien pensée, mais un système de modules qui n'est **aujourd'hui consommable par aucun repo
module externe** : ni côté Java (le contrat `PivotModule` n'est pas physiquement dans l'artefact
publié) ni pleinement côté Angular (le package existe désormais, mais aucun repo module ne l'a
encore intégré). Le score n'est pas plus bas parce que rien de tout cela ne casse la promesse
« module désactivé = routes inaccessibles » : aucun module métier n'est encore exposé en
production, donc il n'y a aujourd'hui aucune brèche active — seulement une dette d'intégration
documentée et trackée (`pivot-core#171`).

---

## I. Résumé exécutif

Le cœur du système de modules — registre (`ModuleRegistry`), service d'activation par tenant
(`ModuleActivationService`, avec la sémantique override SUPER_ADMIN vs admin de tenant), cache
Redis cache-aside (`ModuleActivationCacheService`) et API REST (`ModuleController`) — est
**bien conçu, testé et cohérent** côté `pivot-core`. C'est le point fort central de cet audit.

Le problème n'est pas la conception mais l'**extraction/distribution** : l'Enabler EN17.1
(« publier `pivot-core-starter` en tant que bibliothèque Maven consommable ») est merged sur
`main` mais **partiellement fait** — seul `fr.pivot.core.db` (Flyway multi-schéma) a été
physiquement déplacé dans le module Maven `pivot-core-starter` ; `fr.pivot.core.modules`
(l'interface `PivotModule` elle-même, `ModuleRegistry`, le cache) reste dans l'ancien
`pivot-core/src` (compilé aujourd'hui dans `pivot-core-app`, l'application shell, pas dans la
bibliothèque). Résultat concret : **aucun repo `pivot-xxx-core` ne peut aujourd'hui déclarer un
bean `PivotModule`** — `grep -r "implements PivotModule"` sur l'ensemble de la plateforme ne
retourne aucun résultat en dehors de `pivot-core` lui-même. C'est documenté avec précision dans
`pivot-core` issue #171, mais contredit par une ligne de `sprint-5.md` qui affiche
« ✅ EN17.1 — pivot-core-starter publié... » sans nuance — voir finding MOD-002.

Côté Angular, la situation est meilleure qu'annoncée par la documentation la plus récente :
`@pivot-platform/ui-core` **a été publié avec succès** sur GitHub Packages npm le
2026-07-07T15:56 UTC (`@pivot-platform/ui-core@0.1.0`, vérifié par les logs du workflow
`publish-ui-core.yml`), avec un `moduleGuard`/`ModuleStatusService` réels, alignés sur le contrat
HTTP `GET /api/modules/{id}/status` exposé par `pivot-core`. Pourtant, **le stub
`whiteboardModuleGuard` de `pivot-collaboratif-ui` (`of(true)`, bypass total) n'a pas été
remplacé** — ni le `package.json` du repo ni le CLAUDE.md du repo n'ont été mis à jour depuis la
publication (le CLAUDE.md affirme encore, de façon désormais fausse, que le paquet retourne 404).
C'est une fenêtre de dérive documentaire fraîche (moins de 24h), mais concrète — voir MOD-001.

Aucune fuite d'isolation inter-module détectée : zéro import croisé entre `pivot-agilite-core`,
`pivot-collaboratif-core`, `pivot-pilotage-core` (les trois `-core` autres que `pivot-core`
lui-même sont d'ailleurs encore à l'état bootstrap, sans code métier). Côté UI, mêmes
constatations — aucune référence à un autre module que dans des commentaires bénins
(config nginx/port).

---

## II. Analyse par axe

### Axe 1 — Contrat `PivotModule` et registre (`pivot-core`)

**Score : 8/10**

Le contrat lui-même (`fr.pivot.core.modules.PivotModule` — `getId`/`getName`/`getVersion`/
`isEnabled(TenantContext)`) est simple, stable, et bien documenté (JavaDoc de classe précise
explicitement que tout changement est un hard block Gate 4). Le `ModuleRegistry` est immuable,
thread-safe, fail-fast sur collision d'id (`IllegalStateException` si deux modules déclarent le
même `getId()`), et découvert par auto-configuration Spring (`PivotModulesAutoConfiguration`,
`ObjectProvider<PivotModule>`) — un vrai registre ouvert à l'extension, pas un enum figé.

`ModuleActivationService` gère une sémantique à deux niveaux bien pensée : le choix de l'admin de
tenant (`module_activations`) et l'override plateforme SUPER_ADMIN (`module_overrides`), avec une
règle claire de priorité (override toujours gagnant) et publication d'événements uniquement sur
**transition effective** (pas de duplication d'événements sur no-op) — code à
`fr.pivot.core.modules.ModuleActivationService#publishIfTransition`. Neutralisation CRLF
systématique avant tout log (`sanitizeForLog`) — bonne hygiène anti log-forging (CWE-117).

Points négatifs mineurs : `@RequiresModule`, documenté comme annotation exportée dans **trois
endroits** (`pivot-core/CLAUDE.md`, `pivot-core-starter/README.md`, la JavaDoc de
`PivotCoreAutoConfiguration` elle-même), **n'existe nulle part dans le code**
(`grep -rn "class RequiresModule\|@interface RequiresModule"` → vide). C'est soit une annotation
prévue jamais implémentée, soit un vestige de doc jamais nettoyé — dans les deux cas, à corriger
avant qu'un repo module ne s'appuie dessus par erreur.

### Axe 2 — Cache Redis d'activation

**Score : 8.5/10**

`ModuleActivationCacheService` est un cache-aside classique bien exécuté : clé
`module:status:{tenantId}:{moduleId}`, TTL configurable (défaut 60s), write-through immédiat sur
`ModuleActivatedEvent`/`ModuleDeactivatedEvent` (donc invalidation réelle à chaque changement
d'état, pas seulement expiration passive), et **résilience Redis correcte** — toute
`DataAccessException` bascule sur un appel direct à `ModuleActivationService` plutôt que de
propager une 500 (`ModuleActivationCacheServiceRedisDownIntegrationTest` existe et couvre ce cas).
Métriques Micrometer hit/miss en place.

**Point de rigueur documentaire (LOW)** — la clé réelle est `module:status:{tenantId}:{moduleId}`
(vérifié dans `ModuleActivationCacheService.KEY_PREFIX`), alors que **quatre documents**
(`CLAUDE.md` racine, `pivot-core/CLAUDE.md` deux fois, l'énoncé de cette mission d'audit
elle-même) citent `module:{tenantId}:{moduleId}` sans le segment `status:`. Sans impact
fonctionnel (la clé est cohérente en interne, seule la doc diverge), mais à corriger pour éviter
qu'un futur audit ou une US ne parte d'une hypothèse fausse sur le nommage Redis en prod (conflit
de clé avec un autre usage `module:*` non prévu, par exemple).

### Axe 3 — API REST `/api/modules` (contrat consommé par Angular)

**Score : 8/10**

`ModuleController` (`GET /api/modules`, `GET /api/modules/{id}/status`) est propre : séparation
stricte controller/service, `TenantContext` reconstruit exclusivement depuis l'entité `User`
authentifiée (jamais depuis un paramètre client — conforme à la règle absolue isolation tenant de
`pivot-core/CLAUDE.md`), 401 si contexte d'authentification invalide, 404 (`UnknownModuleException`)
si le module n'existe pas dans le registre plutôt qu'un 200 mensonger. `Cache-Control: no-store`
explicite sur `/status` — cohérent avec le fait que le cache applicatif vit côté serveur (Redis),
jamais côté client. Sémantique HTTP bien documentée et suivie côté Angular (le TSDoc du
`moduleGuard` cite explicitement ce contrat).

Aucun défaut fonctionnel constaté sur cet axe — le seul écart est en amont (axe 4 : ce contrôleur
et ses dépendances ne sont, comme le reste de `fr.pivot.core.modules`, pas dans la bibliothèque
partagée, donc invisibles pour un module externe qui voudrait exposer un endpoint similaire pour
son propre domaine).

### Axe 4 — Extraction réelle vers `pivot-core-starter` (EN17.1)

**Score : 3/10 — axe le plus faible de cet audit**

Constat vérifié fichier par fichier (`pivot-core-starter/src/main/java` ne contient que 2
classes : `ModuleFlywayConfigurer` et `PivotCoreAutoConfiguration`) :

| Package promis (README `pivot-core-starter`, JavaDoc `PivotCoreAutoConfiguration`) | État réel au 2026-07-08 |
|---|---|
| `fr.pivot.core.db` | ✅ Réellement extrait dans `pivot-core-starter` |
| `fr.pivot.core.modules` (`PivotModule`, `ModuleRegistry`, cache, events) | 🔴 Existe (14 fichiers) mais physiquement toujours compilé via `pivot-core-app` (`pivot-core-app/pom.xml` pointe `<sourceDirectory>` vers l'ancien `../src/main/java` — aucune duplication, mais aucun déplacement non plus) |
| `fr.pivot.core.tenant` (`TenantContext`) | 🔴 Même situation — seul `TenantContext.java` existe, toujours dans l'arbre app |
| `fr.pivot.core.auth` | ❌ N'existe pas du tout sous ce package — `fr.pivot.auth.*` (app-only) mélange logique générique et logique spécifique app, nécessite un vrai tri architectural |
| `fr.pivot.core.team` (`Team`/`TeamMember`) | ❌ N'existe nulle part dans le codebase — pas une extraction en attente, une feature jamais commencée, bloquante pour toute FK cross-schéma `public.teams(id)` (convention déjà documentée dans EN17.4) |
| `@RequiresModule` | ❌ N'existe nulle part (voir Axe 1) |

Ce constat est déjà tracé avec précision dans `pivot-core` **issue #171** (ouverte, assignée,
`Stage: In progress`, parent EN17.1) — donc pas une découverte de cet audit, mais une
**confirmation indépendante** que le gap est réel et suffisamment sérieux pour bloquer toute
consommation du contrat de module par un repo externe aujourd'hui.

**MOD-002 (finding, sévérité HIGH — cohérence de suivi)** : `sprint-5.md` affiche en ligne 116
`✅ EN17.1 — pivot-core-starter publié sur GitHub Packages Maven (pivot-core PR #167)` sans
nuance, à quelques lignes du tableau Vague 0 (ligne 22) qui décrit correctement l'état
`🔄 Partiel` avec renvoi vers l'issue #171. Les deux lignes coexistent dans le même fichier,
rédigées à des moments différents de la même session — la ligne "Avancement" (session 2) est
optimiste et contredit le tableau plus rigoureux qui la précède. Risque concret : un agent qui lit
seulement la ligne 116 (ou le résumé en tête de section) croira EN17.1 clos et pourrait autoriser
une US `pivot-agilite-core`/`pivot-collaboratif-core`/`pivot-pilotage-core` à ajouter la
dépendance `fr.pivot:pivot-core-starter` en croyant le contrat de module disponible — alors que
seul `ModuleFlywayConfigurer` l'est réellement. Recommandation : corriger la ligne 116 pour
refléter l'état réel (🔄 Partiel, cf. #171), pas seulement se fier au tableau Vague 0.

Par ailleurs, **aucune release Maven n'a eu lieu depuis** le merge d'EN17.1 (`eacd8ed`) —
`gh release list` confirme que `v0.26.0` (dernière release) est **antérieure** à ce commit ; la
release suivante ne se déclenchera qu'à la fin du Sprint 5 courant (Vague 1+ whiteboard toujours
en cours), par construction du workflow `Release-Trigger: true` posé uniquement sur le dernier
item de sprint. Ce n'est pas un bug — c'est la règle de release documentée — mais cela signifie
concrètement qu'**aucune version de `fr.pivot:pivot-core-starter` n'est aujourd'hui installable**
par un repo externe même pour son seul contenu réellement extrait (`ModuleFlywayConfigurer`),
tant que le Sprint 5 n'est pas clos.

### Axe 5 — Consommation côté `-core` externes (agilite, collaboratif, pilotage)

**Score : 4/10**

`pivot-agilite-core` et `pivot-pilotage-core` sont à l'état bootstrap strict — un seul fichier
Java (`Pivot{X}Application.java`), aucune logique métier, aucune tentative de dépendance
`pivot-core-starter`. Leurs `CLAUDE.md` respectifs documentent le gap correctement et de façon
alignée avec le constat de cet audit (« gap vérifié, ne pas inventer de version ») — bonne
discipline anti-hallucination de dépendance.

`pivot-collaboratif-core` a du code métier réel (whiteboard : boards, membres, partage, présence
WebSocket) mais **contourne le contrat `PivotModule` par une interface locale ad hoc** :
`WhiteboardModuleCheck`/`DefaultWhiteboardModuleCheck` (package
`fr.pivot.collaboratif.whiteboard.board`) — signature `boolean isEnabled(UUID tenantId)`, sans
`getId()`/`getName()`/`getVersion()`, donc **structurellement incompatible** avec
`fr.pivot.core.modules.PivotModule` même une fois celui-ci consommable. L'implémentation par
défaut retourne **toujours `true`**, quel que soit le tenant — documentée comme volontairement
provisoire (JavaDoc : « until the pivot-core-starter module registry is available »).

C'est cohérent avec le gap réel de l'Axe 4 (impossible de faire autrement tant que
`fr.pivot.core.modules` n'est pas dans le starter), mais crée un **risque de double dette** : le
jour où `pivot-core-starter` exportera réellement `PivotModule`, il faudra (1) faire implémenter
`PivotModule` par un vrai bean whiteboard **et** (2) migrer tous les appelants de
`WhiteboardModuleCheck` vers ce nouveau contrat — pas un simple ajout de dépendance. Aucun
appelant de `WhiteboardModuleCheck` n'a été trouvé dans le contrôleur/service (`BoardController`,
`BoardService` ne l'injectent pas actuellement) — l'interface existe mais n'est **pas encore
branchée en frontière API**, donc aucun endpoint whiteboard n'est aujourd'hui protégé par une
vérification d'activation module côté backend. Risque réel mais non actif tant qu'aucun tenant
ne peut désactiver whiteboard en pratique (le flux SUPER_ADMIN existe côté `pivot-core`, mais
« whiteboard » n'est pas un module enregistré dans son `ModuleRegistry` puisque
`pivot-collaboratif-core` n'implémente pas encore `PivotModule`).

### Axe 6 — État réel des guards Angular (`-ui`)

**Score : 6/10**

`@pivot-platform/ui-core` (`pivot-ui/projects/ui-core/src/lib/modules/`) exporte un
`moduleGuard(moduleId)` et un `ModuleStatusService` **réels et fonctionnels** : appel
`GET /api/modules/{id}/status`, `Cache-Control: no-cache`, redirection `/home` sur module désactivé
ou toute erreur HTTP (fail-closed cohérent — pas de distinction 401/403/404 côté client, laissée
au backend comme documenté). **Vérification en direct** (logs du workflow GitHub Actions
`publish-ui-core.yml`) : `@pivot-platform/ui-core@0.1.0` a été **publié avec succès** sur
GitHub Packages npm le **2026-07-07T15:56:09Z** (run `28880046735`, `npm notice` confirmant le
tarball et la version). Les runs suivants (07-07 12:27, 07-08 06:25 — aujourd'hui) échouent tous
sur `npm error You cannot publish over the previously published versions: 0.1.0` : ce n'est
**pas** une indisponibilité du package, seulement l'absence de bump de version après le premier
succès — un défaut CI mineur (le workflow devrait no-op ou échouer proprement si la version est
inchangée), mais qui **masque** dans les logs le fait que le package est en réalité déjà
disponible depuis 24h.

**MOD-001 (finding, sévérité HIGH — dérive documentaire active)** : `pivot-collaboratif-ui/CLAUDE.md`
affirme encore, à la date de cet audit, que « `npm install @pivot-platform/ui-core@latest`
retourne 404 » et que le package « n'existe pas encore ». C'est **factuellement faux** depuis
2026-07-07 15:56 UTC. Le stub `whiteboardModuleGuard` (`of(true)`, dans
`pivot-collaboratif-ui/src/app/core/whiteboard/whiteboard-module.guard.ts`) reste branché tel
quel sur la route `/whiteboard` (`app.routes.ts`, `canActivate: [whiteboardModuleGuard]`) — la
route existe, le guard est bien appelé à chaque navigation, mais il laisse **tout** passer,
inconditionnellement. C'est exactement le point que cette mission d'audit demandait de vérifier
(« a-t-il été remplacé depuis ? ») : **non, pas remplacé**, et le gap documenté qui le justifiait
a disparu la veille de cet audit sans que quiconque ne le note. Contrairement au risque décrit en
Axe 5 (whiteboard non enregistré comme module PIVOT), celui-ci est **actif dès qu'un admin
désactiverait le module whiteboard** — sauf qu'aujourd'hui rien ne permet à un admin de le faire
(pas de module « whiteboard » enregistré côté `pivot-core`), donc le risque reste théorique tant
que l'Axe 5 n'est pas résolu. Les deux gaps se combinent : whiteboard n'est protégé **ni** côté
backend **ni** côté frontend, mais aucun admin ne peut aujourd'hui le désactiver de toute façon.

**Point positif notable** : `boardAccessGuard` (même dossier), qui vérifie l'accès *à un board
précis* (pas l'activation du module), est lui **correctement implémenté** — 403/404/erreur réseau
→ redirection + toast « Vous n'avez pas accès à ce tableau », fail-closed. La distinction entre
« module désactivé » (non appliqué) et « accès à une ressource » (bien appliqué) montre que
l'équipe sait faire du fail-closed correct — le gap whiteboard-module est spécifiquement un
problème d'attente de dépendance externe, pas une lacune de compétence sécurité.

**MOD-003 (finding, sévérité MEDIUM — duplication)** : `pivot-ui` maintient **deux**
implémentations divergentes du même concept de guard : `src/app/core/modules/module.guard.ts`
(usage interne shell — inclut `ModuleGuardLoadingService`, `ToastService`, i18n Transloco, lien
« gérer les modules » pour les admins) et `projects/ui-core/src/lib/modules/module.guard.ts`
(version exportée dans `@pivot-platform/ui-core`, consommée par les futurs repos module — plus
simple : ni toast, ni loading state, ni lien admin). Une fois `pivot-collaboratif-ui`/
`pivot-agilite-ui`/`pivot-pilotage-ui` migrés vers la version publiée, leurs utilisateurs finaux
auront une expérience dégradée (aucun feedback visuel) par rapport à celle du shell — divergence
probablement non intentionnelle (deux implémentations écrites à des moments différents,
jamais réconciliées).

### Axe 7 — Isolation inter-module

**Score : 10/10**

Aucun couplage direct détecté. `grep` exhaustif sur les trois repos `-core` externes pour toute
référence croisée (`fr.pivot.agilite`/`fr.pivot.collaboratif`/`fr.pivot.pilotage` en dehors de son
propre package) : zéro résultat. Même vérification côté `-ui` : les seules occurrences des noms
d'autres modules sont des commentaires bénins (routing nginx, ports de dev) dans
`pivot-agilite-ui`/`pivot-pilotage-ui`, pas des imports de code. La règle « aucune logique
inter-module directe, bus d'événements typés uniquement » est respectée — d'autant plus
facilement qu'aucun module n'a encore de logique métier suffisamment avancée pour être tenté de
tricher. À réévaluer une fois `EN08.x` (whiteboard) et les futurs modules agilité/pilotage seront
plus développés — ce score élevé reflète une situation encore jeune, pas une garantie durable.

---

## Statut des findings/dettes historiques

**N/A — premier audit formel.** Aucune version antérieure de ce rapport n'a noté de finding réel
(`v1 | 2026-06-20 | — | Initialisation` ne contenait qu'une liste de points d'attention pré-audit,
pas des findings scorés). Rien à confronter.

---

## Bonnes pratiques confirmées / Points forts

1. **Séparation override SUPER_ADMIN / activation admin-tenant** (`ModuleActivationService`) —
   modèle à deux niveaux clair, avec priorité explicite et documentée, jamais d'écrasement
   silencieux de l'un par l'autre.
2. **Cache-aside Redis avec résilience réelle** — un test dédié
   (`ModuleActivationCacheServiceRedisDownIntegrationTest`) prouve le comportement de repli quand
   Redis est indisponible, pas seulement une affirmation de JavaDoc.
3. **Invalidation par événement plutôt que par TTL seul** — `ModuleActivatedEvent`/
   `ModuleDeactivatedEvent` déclenchent une réécriture immédiate, limitant la fenêtre
   d'incohérence à la latence de l'event bus Spring, pas au TTL de 60s.
4. **Fail-closed cohérent côté Angular** — `moduleGuard`, `boardAccessGuard` et
   `whiteboardModuleGuard` (même en tant que stub, son TODO documente le comportement fail-closed
   *cible*) traitent systématiquement l'erreur réseau comme un refus, jamais comme un
   contournement.
5. **Discipline anti-dépendance-fictive exemplaire** — les trois `CLAUDE.md` des repos module
   externes (`agilite-core`, `collaboratif-core`, `pilotage-core`) documentent le gap
   `pivot-core-starter` avec une précision inhabituelle (jusqu'au message d'erreur exact d'un
   workflow cassé) plutôt que d'inventer une coordonnée Maven/npm en espérant qu'elle
   fonctionne — exactement le comportement qu'on veut d'agents autonomes face à une dépendance
   non prête.
6. **Traçabilité GitHub native de la dette d'extraction** — `pivot-core` issue #171 documente
   package par package ce qui est fait vs. non fait pour EN17.1, avec une décision explicite de
   ne pas tout migrer d'un coup (auth/team nécessitent un vrai tri, pas un déplacement mécanique)
   — signe de maturité architecturale plutôt que de précipitation.
7. **Log forging neutralisé systématiquement** — `sanitizeForLog` appliqué à toute donnée
   utilisateur avant journalisation, aussi bien dans `ModuleActivationService` que
   `ModuleController`.

---

## Score par grille — Contrat PivotModule + cohérence cross-repo

| Catégorie | Score | Findings/dette actifs |
|-----------|-------|------------------------|
| Conformité du contrat `PivotModule` par module `-core` | 4/10 | Seul `pivot-core` implémente réellement le contrat (pour lui-même) ; `pivot-collaboratif-core` utilise une interface locale structurellement incompatible ; `agilite-core`/`pilotage-core` n'ont encore aucune tentative (bootstrap) |
| Registre + cache Redis (côté `pivot-core`) | 8.5/10 | Doc à corriger (nom de clé Redis, `@RequiresModule` fantôme) — aucun défaut fonctionnel |
| Extraction bibliothèque partagée (`pivot-core-starter`) | 3/10 | MOD-002 — extraction 20% faite (`db` seulement), tracée par `pivot-core#171`, aucune release publiée depuis le merge |
| État réel des guards `-ui` (stub vs réel) | 6/10 | MOD-001 — package `@pivot-platform/ui-core` réellement publié depuis 24h, stub whiteboard non remplacé, doc du repo consommateur obsolète |
| Isolation inter-module (bus d'événements vs couplage direct) | 10/10 | Aucun couplage direct détecté sur l'ensemble de la plateforme |

---

## Plan d'action

### P0 — Bloquant maintenabilité

- **MOD-002** — Corriger `sprint-5.md` ligne 116 : remplacer l'affirmation non nuancée
  « ✅ EN17.1 — publié » par un renvoi explicite à l'état réel (`🔄 Partiel`, `pivot-core#171`) pour
  éviter qu'un futur agent n'autorise une dépendance `pivot-core-starter` en croyant le contrat de
  module disponible. Effort : quelques minutes, risque de régression nul.
- Nettoyer les **trois occurrences** de l'annotation fantôme `@RequiresModule`
  (`pivot-core/CLAUDE.md`, `pivot-core-starter/README.md`, JavaDoc `PivotCoreAutoConfiguration`) —
  soit l'implémenter réellement si elle est utile, soit la retirer de la documentation tant
  qu'elle n'existe pas.

### P1 — Dette architecturale majeure

- **MOD-001** — Mettre à jour `pivot-collaboratif-ui/CLAUDE.md` (le package est publié depuis
  2026-07-07) et planifier le remplacement de `whiteboardModuleGuard` par
  `moduleGuard('whiteboard')` réel dès que `pivot-collaboratif-core` peut exposer un module
  « whiteboard » enregistré côté `pivot-core` (dépend d'abord d'EN17.1 réel, voir P0/Axe 4-5).
- Finaliser l'extraction EN17.1 côté `pivot-core-starter` (issue #171, point 1 —
  `fr.pivot.core.modules`, qualifié « déplacement mécanique, faible risque » par l'issue
  elle-même) : c'est le seul morceau qui débloque immédiatement `PivotModule` pour tous les
  repos module externes, sans les risques de tri identifiés pour `auth`/`team`.
- Corriger le workflow `publish-ui-core.yml` pour échouer proprement (ou no-op) quand la version
  est inchangée plutôt que de logguer une erreur `npm publish` à chaque run qui masque l'état réel
  de publication.

### P2 — Amélioration architecture

- Une fois `fr.pivot.core.modules` extrait, faire migrer `pivot-collaboratif-core` de
  `WhiteboardModuleCheck`/`DefaultWhiteboardModuleCheck` (interface locale incompatible) vers un
  vrai bean `PivotModule` pour whiteboard — et supprimer l'interface locale plutôt que de la
  garder en parallèle.
- Réconcilier les deux implémentations de guard Angular (`pivot-ui/src/app/core/modules/
  module.guard.ts` vs `projects/ui-core/src/lib/modules/module.guard.ts`) — soit enrichir la
  version publiée (toast, loading state) pour que les futurs repos module bénéficient de la même
  UX que le shell, soit documenter explicitement pourquoi elles divergent.
- Corriger la documentation du nom de clé Redis (`module:{tenantId}:{moduleId}` →
  `module:status:{tenantId}:{moduleId}`) dans `CLAUDE.md` racine et `pivot-core/CLAUDE.md`.

### P3 — Qualité continue

- Ajouter un test structurel (ou une vérification CI) qui échoue si un futur repo module ajoute
  une classe `implements PivotModule` incompatible avec les autres (ex. deux modules avec le même
  `getId()`) — le `ModuleRegistry` le fait déjà à runtime (`IllegalStateException`), un test au
  build serait plus rapide à détecter en CI qu'au démarrage de l'application.

### Externe

- La feature `fr.pivot.core.team` (`Team`/`TeamMember`) est qualifiée par `pivot-core#171` comme
  « pas une extraction, une US/Enabler à part entière » — hors du périmètre mécanique d'EN17.1,
  nécessite une décision PO Agent/Architecte Java sur son découpage avant toute implémentation.
  Bloquant pour toute convention FK cross-schéma `public.teams(id)` documentée par EN17.4.

---

## Conclusion

Le système de modules PIVOT a une **fondation technique solide** côté `pivot-core` (registre,
cache, activation, API REST) — rien dans cet audit ne remet en cause la conception. Le verdict
prod est **NON APPLICABLE aujourd'hui** au sens strict : aucun module métier externe n'est encore
exposé en production, donc il n'existe **aucune brèche active** de la règle « module désactivé =
routes inaccessibles ». Mais le système n'est **pas encore un système multi-repo fonctionnel** :
sur les trois axes qui font la promesse de la plateforme (extraction Java, guards Angular,
consommation par les modules externes), un seul est vraiment terminé (isolation inter-module,
par absence de tentation plus que par garde-fou testé). Réserve principale : la vitesse à laquelle
la documentation (`sprint-5.md`, `pivot-collaboratif-ui/CLAUDE.md`) se déconnecte de l'état réel
du code — deux cas concrets trouvés en une seule session d'audit (MOD-001, MOD-002), dans les deux
sens (l'un trop optimiste, l'autre pas assez à jour). Un audit modules à la prochaine fin de
sprint (une fois EN17.1 réellement clos et un premier repo module ayant migré son guard) devrait
suffire à faire remonter le score significativement si le plan d'action P0/P1 est suivi.

---

*Architecte Modules — 2026-07-08 — indépendant — distribution restreinte*

---

## Historique des révisions

| Version | Date | Score | Évolutions principales |
|---|---|---|---|
| v1 | 2026-06-20 | — | Initialisation |
| v2 | 2026-07-08 | 5.4/10 | Premier audit formel réel. Contrat `PivotModule`/registre/cache Redis solides côté `pivot-core` (8-8.5/10). Extraction `pivot-core-starter` (EN17.1) seulement 20% faite malgré merge sur `main` — `fr.pivot.core.modules` reste dans `pivot-core-app`, `@RequiresModule` n'existe pas (MOD-002, tracé par `pivot-core#171`). `@pivot-platform/ui-core` réellement publié depuis le 2026-07-07 mais stub `whiteboardModuleGuard` non remplacé et doc `pivot-collaboratif-ui` désormais obsolète (MOD-001). Deux implémentations Angular divergentes du guard de module (MOD-003). Isolation inter-module parfaite (10/10) sur toute la plateforme. |
