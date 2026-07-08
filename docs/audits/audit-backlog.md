# Audit Backlog — PIVOT Platform

## Date : 2026-07-08 — v2
## Expert : Product Owner + Scrum Master
## Périmètre : `pivot-docs/docs/backlog/` (822 fichiers markdown, hors `sprints/`) croisé avec les
issues/PR GitHub réelles des 8 repos applicatifs (`pivot-core`, `pivot-ui`, `pivot-agilite-core/ui`,
`pivot-collaboratif-core/ui`, `pivot-pilotage-core/ui`) — 306 PR et 25 issues au total, toutes
états confondus (`gh pr/issue list --state all`). Vérification directe du frontmatter `Stage:` de
chaque fichier concerné (jamais une table de résumé), lecture de `docs/backlog/sprints/` en entier
(README + 12 sprints + `zones-ombre.md` + `backlog-post-s12.md`), et échantillon de 6 US/Enabler
`Stage: Done` avec lecture des fichiers de test réels dans `pivot-core`/`pivot-ui`.

---

## Score global : 7.2/10 (premier audit formel — pas de tendance)

Premier passage réel sur ce domaine — `v1` n'était qu'une initialisation de scaffolding sans score
(voir §Statut des findings historiques, N/A). Le score reflète une discipline de backlog globalement
solide (verrou de phase Socle respecté à 100% en dehors du sprint courant, zéro item fantôme/orphelin
sur les 8 repos, zéro violation de phase-3 détectée, resynchronisations historiques des sprints 1-4
vérifiées exactes PR par PR) — mais pénalisé par plusieurs désynchronisations **réelles et actives**
concentrées exactement là où le rythme est le plus rapide (Sprint 5 : E17 infra multi-repo + noyau
whiteboard), et par un échantillon AC→test qui descend jusqu'à 50% sur l'item le plus faible.

---

## I. Résumé exécutif

Le backlog markdown remplit son rôle de source de vérité de façon globalement fiable : sur 822
fichiers, 656 sont `Phase: phase-3` et **100% d'entre eux sont restés `Stage: Backlog`** — aucune
fuite de travail hors du périmètre Socle verrouillé n'a été trouvée nulle part, y compris dans
`pivot-agilite-core/ui` et `pivot-pilotage-core/ui`, deux repos créés par anticipation et vérifiés
vides de tout code métier (uniquement bootstrap/CI, confirmé par lecture directe de leurs PR
mergées et de leur `git log`). Sur les 135 fichiers `pivot-core`/`pivot-ui` audités contre les 202
PR de ces deux repos, **aucun orphelin** (`Stage: Done` sans preuve), **aucune complétion silencieuse**
(PR mergée sans progression de Stage) et **aucune violation de verrou phase-3** n'a été trouvée.

Le point faible réel de cet audit est concentré dans le périmètre du **Sprint 5 en cours** (E17
infrastructure multi-repo + noyau whiteboard E30/ex-E08) — précisément la zone où plusieurs agents
travaillent en parallèle et où les tableaux de synthèse (`sprints/README.md`,
`EPIC-collaboration/README.md`) doivent être réécrits plusieurs fois par jour. Deux documents de
resynchronisation, chacun explicitement présenté comme fraîchement remis à jour "depuis le
frontmatter, source de vérité", se sont avérés faux à la vérification directe du frontmatter :
`sprints/README.md` annonce "Vague 0 (E17) ✅ Terminé 8/8" alors que seuls 2 des 8 enablers sont
réellement `Stage: Done` (3 `In progress`, 2 `Ready`, 1 `Review`) ; le tableau de suivi du noyau
whiteboard dans `EPIC-collaboration/README.md` contredit son propre résumé chiffré en plus de
mal classer un item. Aucun des deux n'est catastrophique (le vrai état est documenté correctement
ailleurs — `sprint-6.md`, écrit le même jour, cite le bon chiffre), mais tous deux sont exactement
le type de document qu'un futur agent lit en premier au démarrage de session.

L'échantillon AC→test (6 US/Enabler `Stage: Done`, lecture directe des fichiers de test dans
`pivot-core`/`pivot-ui`) donne une couverture moyenne d'environ 76-78%, avec deux items
exemplaires (100%, 93%) et un point bas net à 50% (`US16.1.1` — navbar) où deux critères
d'acceptation cochés ✅ dans le fichier backlog n'ont strictement aucune assertion de test
correspondante dans le code réel.

---

## II. Analyse par axe

### Axe 1 — Cohérence Stage/PR/issue (par repo)

**Score : 7/10**

#### 1.1 — `pivot-agilite-core/ui` + `pivot-pilotage-core/ui` — RAS

Audit complet des 4 repos (59 PR, 0 issue) : tous les titres de PR mergées sont du CI/process/scaffolding
pur (`chore(release): revert...`, `fix(ci): ...`) — aucune ne référence un identifiant US/EN
(regex `US[0-9]|EN[0-9]|EPIC|F[0-9]+\.[0-9]` : zéro résultat sur 306 titres de PR tous repos
confondus incluant ces 4). Diff des PR mergées : uniquement `CHANGELOG.md`, `pom.xml`/`package.json`,
`.github/workflows/*.yml`, `CLAUDE.md` — jamais de fichier `src/`. Les 36 fichiers `Module: agilite`
et 211 fichiers `Module: pilotage` sont tous `Stage: Backlog` / `Phase: phase-3`. **Conforme à
100%** à la décision documentée ("repos créés par anticipation, restent vides tant qu'E17 n'est pas
fait").

#### 1.2 — `pivot-core` / `pivot-ui` (11 epics, 135 fichiers) — RAS sur l'essentiel, un écart notable

Cross-référencement des 202 PR (110 core + 92 ui, toutes états) contre les Stage `Done`/`Review`/`In
progress` de `EPIC-auth-iam`, `EPIC-espace-compte`, `EPIC-administration`, `EPIC-shell-ux`,
`EPIC-module-system`, `EPIC-observabilite`, `EPIC-infrastructure`, `EPIC-cicd-supply-chain`,
`EPIC-securite`, `EPIC-equipes`, `EPIC-budget`. **Zéro orphelin, zéro complétion silencieuse, zéro
violation de phase-3.** Le pattern dominant ("~25 fichiers `Stage: Review` avec PR déjà mergée")
n'est **pas une anomalie** : c'est le comportement documenté (`Stage: Done` réservé à la recette
manuelle du mainteneur — jamais posé par un agent) et `sprint-6.md` §Axe 3 liste déjà explicitement
ces items en attente de recette groupée.

Un écart concret trouvé : **`us-accueil-grille.md` (US16.2.1, `Stage: Done`) et
`us-accueil-modules-avenir.md` (US16.2.2, `Stage: Review`) sont livrés par la même PR**
(`pivot-ui#47`, mergée 2026-07-01) — le fichier de US16.2.2 le dit lui-même explicitement
("même PR que US16.2.1"). La recette manuelle semble avoir été appliquée à l'un des deux
US et pas à son jumeau issu du même commit.

#### 1.3 — `pivot-collaboratif-core/ui` (whiteboard E30/ex-E08) — sain, mais c'est ici que ça bouge

6 issues ouvertes (2 `pivot-collaboratif-core` : #29, #32 · 4 `pivot-collaboratif-ui` : #22, #26,
\#27, #28) — toutes correspondent exactement à des US `Stage: Ready` avec dépendances déjà posées
dans le fichier backlog (`US08.3.3`, `US08.3.2b`, `US08.3.2c`, `US08.5.1`). Aucun item fantôme.
Point notable : l'issue `pivot-collaboratif-core#32` documente une **dette technique réelle et
auto-détectée** (deux mécanismes concurrents de diffusion de présence WebSocket sur le même topic
STOMP) avec une proposition de correctif détaillée — signe de maturité d'ingénierie, pas un défaut
de suivi.

En revanche, le fichier de suivi central de cette épique a un vrai problème de fraîcheur : voir
§EN17/whiteboard ci-dessous et le Finding HIGH-2.

#### Findings — Axe 1

**HIGH-1 — `sprints/README.md` surestime l'avancement E17 (Vague 0, Sprint 5).**
La ligne de synthèse Sprint 5 affiche *"Vague 0 (E17) ✅ Terminé 8/8"*. Vérification directe du
frontmatter des 8 fichiers `EPIC-infra-multi-repo/ENABLERS/en-*.md` :

| Enabler | `Stage:` réel | Preuve |
|---|---|---|
| EN17.2 (design-system npm) | **Done** | package publié, PR mergée |
| EN17.5 (template-repo-core) | **Done** | repo créé, contenu conforme |
| EN17.7 (nginx gateway) | Review | PR mergées (`ui#114`, `core#170`) mais Statut interne contradictoire (voir MEDIUM-1) |
| EN17.3 (ui-core npm) | Ready | Statut interne dit "Done" (voir MEDIUM-1) |
| EN17.6 (template-repo-ui) | Ready | Sous-estime la réalité (voir MEDIUM-2) |
| EN17.1 (pivot-core-starter) | **In progress** | Extraction réelle très incomplète — `pivot-core` **issue #171 toujours ouverte**, détail package par package (`fr.pivot.core.auth`/`.team` n'existent pas du tout) |
| EN17.4 (BDD multi-schéma) | **In progress** | — |
| EN17.8 (design-system incubation) | **In progress** | — |

Bilan réel : **2 Done / 1 Review / 2 Ready / 3 In progress — pas 8/8**. `sprint-6.md`, rédigé le
même jour, contredit déjà cette ligne ("E17 : 8/8 enablers Done — **reste : EN17.1**"). Risque
concret : `sprints/README.md` est le tout premier fichier lu à chaque démarrage de session — un
agent qui s'y fie pourrait considérer E17 clos et autoriser une dépendance `pivot-core-starter`
prématurée sur un repo module.

**HIGH-2 — `EPIC-collaboration/README.md` : le tableau de resync se contredit lui-même.**
La section "Suivi d'avancement — noyau F08.x/EN08.x", explicitement labellisée comme
"resynchronisé le 2026-07-08 (soir) depuis le frontmatter `Stage:` de chaque fichier (source de
vérité)", contient deux erreurs :
1. `US08.4.1` est affiché `Ready` dans le tableau — le fichier lui-même (`us-tableau-depuis-template.md`)
   dit `Stage: Review` (2 PR mergées à 100/100).
2. Le résumé chiffré juste en dessous du tableau ("12 Review · 2 In progress · 5 Ready · 0 Done")
   ne correspond même pas à son propre tableau (10 lignes `🔎 Review` visibles). Vérification
   frontmatter exhaustive des 17 items : **11 Review · 2 In progress · 4 Ready · 0 Done**.

Ironie relevée : ce même document avertit explicitement *"ce tableau était déjà repassé en désync
une première fois le même jour"* — la mécanique d'alerte anti-désync fonctionne, mais pas assez
vite pour rester exacte plus de quelques heures dans le sprint le plus actif de la plateforme.

---

### Axe 2 — Traçabilité AC → test (échantillon `Stage: Done`)

**Score : 7/10**

Échantillon de 6 US/Enabler `Stage: Done`, lecture directe des fichiers de test dans les repos
concernés (pas seulement la présence d'un fichier — vérification que les assertions couvrent
effectivement le comportement de l'AC) :

| Item | Repo | AC total | AC couverts (test réel) | % | Constat |
|---|---|---|---|---|---|
| `EN01.1` — Opaque tokens | pivot-core | 5 | 5 | **100%** | `TokenServiceTest`, `AccessTokenTest`, `CleanupSchedulerTest` — exemplaire. Seul écart : le nom de classe cité dans le backlog (`TokenCleanupJob`) diffère du nom réel (`CleanupScheduler`) — cosmétique |
| `US03.1.1` — Admin active module | pivot-core + ui | 15 | 14 | **93%** | `AdminModuleActivationIntegrationTest` + `admin-modules.component.spec.ts` solides. 1 AC (invalidation cache Redis EN03.3) explicitement `⬜` **et déjà tracée** comme dette S2 dans `sprint-6.md` — cas exemplaire de gap assumé et suivi |
| `US01.3.2` — Reset password | pivot-core + ui | 10 | 9 | 90% | 1 AC A11y (`role="alert"` + focus sur erreurs de validation) marquée `⬜`, aucun ticket de suivi dédié |
| `US01.1.1` — Login email/password | pivot-core + ui | 10 | ~7 | **70%** | Anti-énumération et token opaque bien testés. Non testé : autofocus champ email (admis), A11y `role="alert"`/focus-trap (admis), et flags cookie `SameSite=Strict`/`Secure` — asserté nulle part alors que `HttpOnly` seul est testé |
| i18n FR/EN | pivot-ui | 8 | ~5.5 | 69% | Bascule instantanée et persistance bien testées. Le contenu exact requis par l'AC ("legally binding in French only") n'est **jamais asserté littéralement** dans `legal.spec.ts` — l'AC est cochée ✅ sans test au niveau du contenu exact |
| `US16.1.1` — Navbar | pivot-ui | 7 | ~3.5 | **50%** | **Point le plus faible** : 2 AC cochées ✅ dans le fichier (liens de navigation + indicateur page active ; landmarks A11y `role="banner"`/`aria-label`) n'ont **aucune assertion dans `navbar.component.spec.ts`** — pas un gap admis, une divergence entre le ✅ déclaré et le code réel |

**Moyenne échantillon : ≈76-78%** — plage 50%-100%. Deux items (`EN01.1`, `US03.1.1`) sont des
exemples à suivre : gaps explicitement admis en texte, et pour `US03.1.1` déjà réconciliés avec le
suivi de dette du sprint. `US16.1.1` est le cas qui viole le plus directement la règle transverse
"AC sans test = non implémenté" : ici, ce n'est même pas un AC admis non couvert, c'est un AC
**déclaré fait** sans le test qui le prouve.

**Pattern transversal : l'A11y est la catégorie la plus systématiquement sous-couverte.** 3 des 6
échantillons ont un gap A11y explicite ou constaté (login : focus-trap/`role=alert` ; navbar :
`aria-current`/landmarks ; reset-password : `role=alert` sur erreurs) — aucun n'a de ticket de suivi
dédié comparable à celui existant pour le cache Redis d'`US03.1.1`.

#### Findings — Axe 2

**HIGH-3 — `US16.1.1` (navbar) : 50% de couverture réelle, 2 AC ✅ non prouvés par un test.**
Voir tableau ci-dessus. C'est l'écart le plus net entre déclaration et réalité de tout
l'échantillon — un AC coché "fait" dans le backlog doit avoir une preuve de test, pas seulement
une affirmation.

**MEDIUM-5 — Gaps A11y admis mais non trackés** (`US01.1.1`, `US01.3.2`) — notes en bas de fichier,
pas de ticket de suivi dédié, contrairement au traitement donné au cache Redis d'`US03.1.1`.

**MEDIUM-6 — AC i18n cochée ✅ sans vérification du contenu exact requis** (bannière légale EN) —
risque que le texte légal change silencieusement sans qu'un test ne le détecte.

**MEDIUM-7 — ~15 fichiers `EPIC-auth-iam` `Stage: Done` sans citation directe de PR.**
Tous les enablers `EN01.x`, plus `us-google-oauth.md`, `us-oidc-jit.md`, `us-oidc-login.md`,
`us-session-restore.md`, et un fichier `EPIC-module-system`, n'ont **aucun lien PR dans le fichier
lui-même** — la preuve n'existe que dans le corps de la description de `pivot-core` PR #67 (vérifié
en la lisant directement). Contraste net avec la convention "Gate 5" (numéro de PR exact + score
Gate 4 + lien vers la spec figée) systématiquement appliquée aux resynchronisations des Sprints 2-4 —
cette rigueur n'a pas encore été rétro-appliquée aux tout premiers items (Sprint 1).

**LOW-1 (information, pas un gap)** — `US03.1.1`/EN03.3 : l'AC d'invalidation cache Redis est
`⬜` sur un item `Stage: Done`, mais c'est le seul des 6 échantillons où ce gap est **déjà** une
ligne de dette trackée nommément dans `sprint-6.md` ("Dette S2 — Raccorder cache Redis EN03.3").
Cité ici uniquement pour compléter l'échantillon demandé — ce n'est pas un nouveau problème.

---

### Axe 3 — Hygiène sprint, doublons, dépendances

**Score : 7.5/10**

**Identification du sprint courant : correcte.** `sprints/README.md` identifie sans ambiguïté le
Sprint 5 comme sprint actif ("🚀 Démarré"), les Sprints 1-4 comme clos et les Sprints 6-12 comme
verrouillés post-Socle — vérifié cohérent avec le contenu réel de chacun des 12 fichiers de sprint,
de `zones-ombre.md` et de `backlog-post-s12.md`. Les resynchronisations historiques des sprints 1-4
citent des numéros de PR exacts — **10 numéros de PR vérifiés indépendamment sur Sprint 3 (`core#126-142`),
tous `MERGED`, dates cohérentes**. Aucun sprint clos n'a été laissé avec un item non coché par
oubli. `sprint-6.md` (Definition of Done Socle, rédigée le jour même de cet audit) est un exemple
de rigueur : elle cite l'état réel d'E17 (6/8, pas 8/8) et du noyau whiteboard (0/17 Done),
contredisant correctement les deux documents optimistes identifiés en Axe 1.

**Doublons/items fantômes : aucun trouvé** sur l'ensemble des 25 issues GitHub (8 repos) — chacune
correspond à un item backlog réel avec le bon Stage. **Dépendances déclarées entre US/Enablers** :
vérification manuelle des chaînes de dépendance du Sprint 5 (E17 : EN17.8‖EN17.4‖EN17.1 →
EN17.2 → EN17.5/17.6 → EN17.3 → EN17.7 ; whiteboard : EN08.1/EN08.2 → US08.3.1 → US08.3.2a →
US08.3.2b → {US08.3.2c, US08.3.3} et US08.5.1 → US08.3.2c) — **aucun cycle, aucune dépendance non
satisfaite bloquant silencieusement un item `Ready`**. Un chevauchement fonctionnel réel entre
`US08.5.1` et `US08.3.2c` (deux specs de panneau de présence) a été **identifié et tranché
explicitement en Gate 1** (2026-07-07), documenté des deux côtés — bon exemple de résolution de
conflit de backlog avant qu'il ne devienne un doublon de code.

#### Findings — Axe 3

**MEDIUM-1 — Deux fichiers `EN17.x` se contredisent en interne (`Statut` texte vs `Stage`
frontmatter).**
- `EN17.3` (ui-core npm) : `**Statut** : ✅ Done — PR pivot-ui #112 mergée` mais
  `Stage: Ready` juste en dessous.
- `EN17.7` (nginx gateway) : `**Statut** : ⬜ À faire` (checklist 0/9 cochée) mais
  `Stage: Review · Sprint: 5 · Done: 2026-07-07 (pivot-ui #114 + pivot-core #170)` — vérifié que
  ces deux PR sont bien mergées et touchent réellement `nginx.conf`/`Dockerfile`, donc le `Stage`
  est probablement le champ juste et le texte "À faire" est le résidu jamais nettoyé.

**MEDIUM-2 — `EN17.6` (template-repo-ui) sous-estime une réalité déjà livrée.**
`Stage: Ready`, checklist 0/10 cochée, `Statut: À faire` — mais le repo GitHub
`pivot-template-ui` (créé 2026-07-07) est **déjà scaffoldé conformément à presque tous les
critères listés** : dépendances `@pivot-platform/ui-core` + `@pivot-platform/design-system` réelles
dans `package.json`, module de feature avec lazy-loading et `moduleGuard`, composant d'exemple
utilisant un composant du design system, CI complète, `Dockerfile`+`nginx.conf`, `CLAUDE.md`,
`CODEOWNERS`, `.plumber.yaml` — vérifié directement via `gh api repos/.../contents`. Sens inverse
des findings HIGH-1/HIGH-2 (ici la doc est en retard sur le code, pas en avance dessus), mais même
symptôme : le frontmatter n'a pas suivi la réalité.

**MEDIUM-3 — Divergence de Stage entre deux US livrées par la même PR** (voir Axe 1.2 —
`US16.2.1`/`US16.2.2`, `pivot-ui#47`).

**MEDIUM-4 — Champ `Phase` obsolète sur 2 items `Stage: Done`.**
`us-oidc-login.md` (US01.7.1) et `us-oidc-jit.md` portent `Phase: v1-enterprise` alors qu'ils sont
`Stage: Done` depuis le Sprint 1 (`sprint-1.md` : "F01.7/F01.8 — OIDC enterprise + JIT... ✅").
Le verrou de phase (`docs/backlog/README.md` §6) prévoit que seuls les items `Phase: Socle` sont
éligibles à l'implémentation — ces deux US ont été livrées avant que leur label de phase ne soit
mis à jour, sans note explicative dans le fichier. Risque concret : un futur filtre
`Phase: Socle` ne les verra jamais, et un PO Agent pourrait croire ce travail non démarré.

---

## Statut des findings/dettes historiques

**N/A — premier audit formel.** La version `v1` (2026-07-08, score `—`) n'était qu'une
initialisation de scaffolding contenant une liste de points d'attention pré-audit, jamais un
passage noté — rien à confronter (conforme à la règle `regle_historique` de la skill
`pivot-audit-format`, déjà appliquée pour corriger un gonflement antérieur de versions sur
l'ensemble des audits `pivot-platform`).

---

## Bonnes pratiques confirmées / Points forts

1. **Verrou de phase Socle réellement respecté** — sur 656 fichiers `Phase: phase-3`, **100%**
   sont `Stage: Backlog` sans exception, y compris sur des repos déjà créés et accessibles
   (`pivot-agilite-*`, `pivot-pilotage-*`). Aucune fuite de travail hors périmètre trouvée nulle
   part sur les 822 fichiers audités.
2. **Resynchronisations historiques Sprints 1-4 exactes et vérifiables** — chaque affirmation
   "US mergée, PR #xxx" contrôlée indépendamment via `gh pr view` correspond à la réalité GitHub
   à 100% sur l'échantillon testé (10 PR Sprint 3 + 16 PR Sprint 4).
3. **Discipline de séparation Stage `Review`/`Done`** — le workflow "seul le mainteneur pose
   `Stage: Done`" est effectivement respecté : aucun agent n'a auto-promu un item en `Done` sans
   recette humaine documentée, et `sprint-6.md` §Axe 3 liste déjà nommément tous les items en
   attente de recette groupée plutôt que de laisser le sujet implicite.
4. **Chevauchements fonctionnels détectés et tranchés avant qu'ils ne deviennent des doublons de
   code** — `US08.5.1` vs `US08.3.2c` (panneau de présence vs overlay curseurs) : conflit identifié
   en Gate 1, décision documentée des deux côtés, aucune implémentation dupliquée constatée.
5. **Dette technique auto-détectée et proposée avant merge, pas découverte après coup** —
   `pivot-collaboratif-core` issue #32 (deux mécanismes de présence WebSocket concurrents) : trouvé
   en Gate 1 de `US08.5.1`, documenté avec diagnostic complet et plan de correction, avant tout
   incident en production.
6. **Gaps AC honnêtement admis en texte plutôt que masqués** — `US01.1.1`, `US16.1.1`,
   `US01.3.2`, `US03.1.1` marquent explicitement leurs critères non couverts (🟡/⬜) au lieu de
   cocher ✅ par optimisme — la seule vraie régression sur ce point est `US16.1.1` (voir HIGH-3).
7. **Repos module non prématurément câblés** — `pivot-agilite-*`/`pivot-pilotage-*` documentent
   honnêtement dans leur propre `CLAUDE.md` l'attente d'`EN17.1` plutôt que d'inventer une
   dépendance Maven/npm non prête (cohérent avec le finding MOD equivalent de l'audit Modules).

---

## Score par grille — Cohérence Stage/PR/issue · Traçabilité AC→test · Hygiène sprint

| Catégorie | Score | Findings/dette actifs |
|-----------|-------|------------------------|
| Cohérence Stage/PR/issue (par repo) | 7/10 | HIGH-1, HIGH-2, MEDIUM-1, MEDIUM-2, MEDIUM-3, MEDIUM-4 |
| Traçabilité AC → test (échantillon Done) | 7/10 | HIGH-3, MEDIUM-5, MEDIUM-6, MEDIUM-7, LOW-1 |
| Hygiène sprint / doublons / dépendances | 7.5/10 | HIGH-1, HIGH-2 (racine documentaire commune) — RAS sur doublons et cycles |

---

## Plan d'action

### P0 — Corriger avant la prochaine session (documents lus en premier)

- **HIGH-1** — Corriger la ligne Sprint 5 de `sprints/README.md` : remplacer "Vague 0 (E17) ✅
  Terminé 8/8" par l'état réel (2 Done / 1 Review / 2 Ready / 3 In progress, renvoi vers
  `pivot-core#171`). Effort : quelques minutes, risque de régression nul.
- **HIGH-2** — Corriger le tableau "Suivi d'avancement" d'`EPIC-collaboration/README.md` :
  `US08.4.1` Ready → Review, et réconcilier le résumé chiffré (11 Review · 2 In progress · 4 Ready ·
  0 Done, pas "12 Review... 5 Ready").

### P1 — Avant la prochaine décision de sprint / dette majeure

- **HIGH-3** — Ajouter au moins un test d'assertion réelle pour les liens de navigation +
  indicateur de page active et les landmarks A11y de `US16.1.1` (navbar) avant de considérer cet
  AC comme réellement couvert — ou repasser ces 2 lignes en 🟡 dans le fichier backlog en attendant.
- **MEDIUM-1** — Réconcilier `Statut` texte et `Stage` frontmatter sur `EN17.3` et `EN17.7`.
- **MEDIUM-2** — Mettre à jour `EN17.6` (Stage + checklist) pour refléter le scaffolding réellement
  livré dans `pivot-template-ui`.
- **MEDIUM-3** — Décision mainteneur : recette groupée `US16.2.1`/`US16.2.2` (même PR, Stage
  différent) plutôt que de laisser un des deux jumeaux en retard indéfiniment.

### P2 — Sprint suivant / amélioration planifiable

- **MEDIUM-4** — Corriger le champ `Phase` de `us-oidc-login.md`/`us-oidc-jit.md` (`v1-enterprise`
  → `Socle`, ou note explicite justifiant l'anticipation).
- **MEDIUM-5** — Créer un ticket de suivi dédié pour les 2 gaps A11y admis (login, reset-password)
  plutôt que des notes en bas de fichier sans suite.
- **MEDIUM-6** — Ajouter une assertion de contenu exact sur la bannière légale EN (i18n).
- **MEDIUM-7** — Rétro-appliquer la convention "Gate 5" (citation PR + score Gate 4 + lien spec)
  aux ~15 items `EPIC-auth-iam` Sprint 1 encore sans lien direct.

### P3 — Qualité continue

- Envisager de générer les tableaux de resync (`sprints/README.md`, "Suivi d'avancement" par
  épique) par un script lisant directement le frontmatter plutôt qu'une transcription manuelle —
  la vitesse de désynchronisation constatée (plusieurs resyncs erronés le même jour, sur deux
  documents différents) suggère que la transcription manuelle a atteint sa limite au rythme actuel
  de parallélisation.
- Ajouter un lien retour depuis `us-admin-active-module.md` (US03.1.1) vers la ligne "Dette S2" de
  `sprint-6.md` qui la référence déjà — cohérence bidirectionnelle.

### Externe

- Néant pour ce domaine — le backlog markdown est entièrement sous contrôle direct de l'équipe.

---

## Conclusion

**Dette de cohérence maîtrisée, pas bloquante.** Le backlog PIVOT remplit sa fonction de source de
vérité : le verrou de phase est respecté à 100% sur 822 fichiers, aucun item fantôme ni violation
de phase-3 n'existe sur les 8 repos applicatifs, et les resynchronisations historiques résistent à
une vérification indépendante PR par PR. Les écarts trouvés sont réels mais localisés : ils
touchent exactement le sprint le plus actif de la plateforme (E17 + noyau whiteboard), où plusieurs
agents committent en parallèle plus vite que les tableaux de synthèse manuels ne peuvent suivre —
un des deux documents en cause s'auto-corrige d'ailleurs en partie le jour même (`sprint-6.md`
contredit correctement `sprints/README.md`). La réserve principale est la fiabilité des documents
de synthèse à haute fréquence de mise à jour (P0 ci-dessus) et la couverture AC→test sur les
critères A11y, systématiquement le point faible de l'échantillon. Aucun finding ne remet en cause
l'intégrité du backlog dans son ensemble ; tous sont corrigibles en quelques heures d'effort combiné.

---

*Product Owner + Scrum Master — 2026-07-08 — indépendant — distribution restreinte*

---

## Historique des révisions

| Version | Date | Score | Évolutions principales |
|---|---|---|---|
| v1 | 2026-07-08 | — | Initialisation |
| v2 | 2026-07-08 | 7.2/10 | Premier audit formel réel. Verrou de phase Socle respecté à 100% (822 fichiers, 8 repos, 306 PR/25 issues croisés) — zéro item fantôme, zéro violation phase-3, resyncs Sprints 1-4 vérifiées exactes. Deux findings HIGH sur la fraîcheur des tableaux de synthèse Sprint 5 (`sprints/README.md` "8/8 Terminé" faux — 2/8 réel ; `EPIC-collaboration/README.md` auto-contredit son propre résumé). Échantillon AC→test (6 items Done) : ≈76-78% de couverture moyenne, point bas à 50% sur `US16.1.1` (navbar, 2 AC ✅ non prouvés par un test — HIGH-3). 7 findings MEDIUM (contradictions internes Statut/Stage sur EN17.3/17.7, EN17.6 sous-estimé, divergence Stage US16.2.1/US16.2.2 sur la même PR, Phase obsolète sur 2 US OIDC, gaps A11y non trackés, traçabilité PR manquante sur ~15 items Sprint 1). |
