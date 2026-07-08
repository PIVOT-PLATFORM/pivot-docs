# Audit — qa

**Statut :** 6.5/10 — v2
**Dernière révision :** 2026-07-08
**Profil agent responsable :** Expert QA

## Date : 2026-07-08 — v2

## Expert : Expert QA

## Périmètre

Les 8 dépôts de code applicatif de l'organisation, audités en profondeur (comptage réel des
fichiers de test, exécution locale `mvn test`/`mvn verify -Pcoverage`/`npm run test:ci` quand
possible, lecture des rapports JaCoCo/Vitest générés, `gh run list`/`gh run view --log` pour
l'historique CI réel) :

- `pivot-core` (backend Java/Spring, module `pivot-core-app` + `pivot-core-starter`)
- `pivot-ui` (frontend Angular, 3 sous-projets : `frontend`, `ui-core`, `design-system`)
- `pivot-agilite-core` / `pivot-agilite-ui`
- `pivot-collaboratif-core` / `pivot-collaboratif-ui`
- `pivot-pilotage-core` / `pivot-pilotage-ui`

`pivot-docs` (ce repo) est hors périmètre — pas de code applicatif, pas de couverture de test au
sens de cette grille.

---

## Score global : 6.5/10 →

Premier audit formel (v1 du 2026-06-20 n'avait publié aucun score — voir Historique). Pas de
tendance calculable, ce score constitue la référence de départ. Verdict de fond : là où du code
métier existe réellement, la couverture de test est **sincèrement bonne** (largement au-dessus
du seuil déclaré de 85% sur la quasi-totalité des métriques mesurées) et la CI est fiable. Le
score n'est pas plus haut à cause d'écarts structurels vérifiés pendant cet audit : seuil Gate 2
documenté (≥85%) qui ne correspond au seuil **réellement appliqué** dans aucun `pom.xml` inspecté
(80%, partout) ; un pipeline E2E cassé dont la cause racine documentée s'est révélée obsolète en
moins de 48h ; un bug d'isolation de tests réel détecté en exécutant la suite complète de
`pivot-core` ; et un mutation testing (Stryker,
pivot-ui) qui n'a **jamais abouti avec succès une seule fois** malgré son déplacement dédié en
cron hebdomadaire — le signal n'existe tout simplement pas aujourd'hui sur le repo le plus mature
de la plateforme.

---

## I. Pyramide de tests par repo — comptage réel

| Repo | Unitaires (fichiers) | Intégration/IT (fichiers) | E2E (scénarios) | Tests exécutés (réel) |
|------|----------------------|----------------------------|------------------|------------------------|
| pivot-core (app+starter) | 76 + 2 | 24 + 1 (Testcontainers) | N/A (backend) | **1045** (1034 app + 11 starter), 0 échec, 24 erreurs (voir IV) |
| pivot-ui | 88 fichiers (3 sous-projets) | — (Vitest seul, pas d'IT backend) | 17 scénarios Playwright | **1042** tests, 0 échec |
| pivot-agilite-core | **0** | **0** | N/A | 0 — `src/main` = 1 fichier (`PivotAgiliteApplication.java`, 16 lignes), aucun package métier |
| pivot-agilite-ui | 2 fichiers | — | 1 scénario (smoke, sans backend — volontaire, PR#12) | **2** tests, 0 échec |
| pivot-collaboratif-core | 1 unitaire + 6 IT (Testcontainers) | idem | N/A | **74** tests, 0 échec (run propre) |
| pivot-collaboratif-ui | 7 fichiers | — | 1 scénario (contre vrai backend GHCR — actuellement cassé, voir IV) | **83** tests, 0 échec |
| pivot-pilotage-core | **0** | **0** | N/A | 0 — `src/main` = 1 fichier (`PivotPilotageApplication.java`, 16 lignes) |
| pivot-pilotage-ui | 2 fichiers | — | 1 scénario (smoke pur, "shell charge la route placeholder") | **4** tests, 0 échec |

**Constat clé** : 2 des 6 modules `-core` (`agilite`, `pilotage`) sont des coquilles vides — un
seul fichier Java (la classe `@SpringBootApplication`, 16 lignes), sans package métier et donc
sans aucun test. Risque réel actuellement faible (rien à tester), mais le seuil JaCoCo/PITest
configuré dans leurs `pom.xml` reste vacueux (0 couvert / 0 total) tant qu'aucune US métier n'y
est implémentée — point de vigilance pour la première PR de code métier sur ces deux repos.

---

## II. Couverture réelle vs seuil Gate 2 déclaré — consolidé multi-repo

Seuil documenté dans `pivot-docs/CLAUDE.md` (Gate 2) : **≥85%**. Vérification faite dans
**chaque** `pom.xml` backend inspecté (profil `coverage`, plugin `jacoco-maven-plugin`, goal
`check`, règle `BUNDLE`/`LINE`/`COVEREDRATIO`) :

| Repo | Seuil déclaré (CLAUDE.md) | Seuil réellement appliqué (pom.xml) | Couverture réelle mesurée |
|------|---------------------------|--------------------------------------|----------------------------|
| pivot-core (app) | ≥85% | **0.80** (`pom.xml:217`) | **93.2%** LINE (14882/16037 instructions couvertes) |
| pivot-core (starter) | ≥85% | aucun seuil déclaré dans `pivot-core-starter/pom.xml` | 95.65% LINE |
| pivot-collaboratif-core | ≥85% | **0.80** (profil `coverage`, exclusion documentée de la classe `*Application`) | **85.7%** LINE (618/721) |
| pivot-agilite-core | ≥85% | **0.80** (`pom.xml:210`) | N/A (0 test) |
| pivot-pilotage-core | ≥85% | **0.80** | N/A (0 test) |

**Aucun** des `pom.xml` inspectés n'applique le seuil 85% documenté — tous convergent sur 80%
(sauf le starter, qui n'a pas de check du tout). C'est un écart doc/config réel et systémique,
jamais vérifié avant cet audit — heureusement sans conséquence pratique aujourd'hui puisque la
couverture réelle constatée dépasse les deux seuils partout où du code métier existe.

Côté `-ui` (Angular/Vitest) : **aucun seuil de couverture n'est appliqué mécaniquement en CI**.
`vitest.config.ts` (pivot-ui) ne déclare pas de bloc `coverage.thresholds`. Les workflows
(`ci.yml`) uploadent le rapport de couverture vers SonarCloud pour analyse, mais aucun step
`sonar.qualitygate.wait` ni équivalent n'attend/bloque sur un Quality Gate SonarCloud — impossible
de confirmer depuis cet audit si un Quality Gate distinct (%) est configuré côté SonarCloud
lui-même (hors périmètre d'accès de cet audit). En clair : le Gate 2 frontend repose aujourd'hui
sur l'auto-évaluation du Dev Agent au moment du commit (CLAUDE.md), pas sur un gate CI mécanique
— cohérent avec le process documenté, mais à ne pas confondre avec une vérification automatique.

Couverture réelle mesurée côté `-ui` (quasiment toutes les métriques au-dessus de 85%, malgré
l'absence de gate mécanique — **une exception notée** ci-dessous) :

| Repo | Tests | Statements | Branches | Functions | Lines |
|------|-------|------------|----------|-----------|-------|
| pivot-ui (frontend) | 953 | 94.19% | 93.12% | **84.69%** | 95.79% |
| pivot-ui (ui-core / design-system) | 45 + 44 | 96.33–100% | 90–91.66% | 89.47–100% | 96.75–100% |
| pivot-agilite-ui | 2 | 92.85% | 90% | 100% | 100% |
| pivot-collaboratif-ui | 83 | 97.3% | — | — | 98.75% |
| pivot-pilotage-ui | 4 | 100% | 100% | 100% | 100% (trivial — code minimal) |

**Exception à noter** : `pivot-ui (frontend)` — le sous-projet le plus volumineux et le plus
mature de toute la plateforme — est **sous** le seuil déclaré de 85% sur la métrique Functions
(84.69%). Sans conséquence pratique aujourd'hui (Statements/Branches/Lines largement au-dessus),
mais ça illustre concrètement pourquoi l'absence de gate mécanique (`coverage.thresholds` absent
de `vitest.config.ts`) n'est pas qu'un détail théorique : ce chiffre est passé sous silence dans
le process actuel, personne ne l'a détecté avant cet audit.

---

## III. Mutation testing (PITest / Stryker) — statut par repo

| Repo | Outil | Seuil configuré | Bloquant ? |
|------|-------|-------------------|------------|
| pivot-core | PITest 1.25.5 | `mutationThreshold=60`, `coverageThreshold=60`, ciblé sur `fr.pivot.auth.*` | Non — `continue-on-error`, job dédié PR |
| pivot-agilite-core | PITest 1.25.5 | `mutationThreshold=60`, `coverageThreshold=60`, ciblé sur des packages `service`/`util` **inexistants à ce jour** | Non — sans effet réel tant qu'aucun code métier n'existe |
| pivot-collaboratif-core | PITest (profil `mutation`, `pr-preview.yml`) | seuil non trouvé dans la config inspectée | Non — `continue-on-error: true` explicite |
| pivot-pilotage-core | PITest 1.25.5 | `mutationThreshold=0`, `coverageThreshold=0` — **volontairement nul**, commenté "pas de logique métier à muter aujourd'hui" | Non — le plus honnête des trois bootstraps sur ce point |
| pivot-ui | Stryker | `thresholds: {high:80, low:60, break:null}` — cron hebdomadaire (lundi 06h UTC) + `workflow_dispatch`, `timeout-minutes: 60`, sorti de `pr-checks.yml` pour cause de timeout 30min (pivot-ui#68) | Non (`break: null`) — **mais voir constat ci-dessous** |
| pivot-agilite-ui | Stryker (`stryker.conf.json`) | même mécanisme que pivot-ui (cron + dispatch) | Non |
| pivot-collaboratif-ui / pivot-pilotage-ui | — | non vérifié en détail (hors échantillon prioritaire) | — |

**Constat** : le principe "mutation testing non bloquant" (CLAUDE.md, Gate 3) est respecté
partout où il a été vérifié — aucune fausse alarme trouvée. En revanche, les seuils déclarés sont
incohérents d'un repo à l'autre (60/60 vs 0/0 vs seuil absent) sans politique écrite qui
justifie la différence — `pivot-pilotage-core` documente honnêtement pourquoi (pas de code à
muter), `pivot-agilite-core` en revanche déclare un seuil 60/60 qui ne s'applique à aucun package
réel — configuration copiée-collée sans adaptation.

**Finding additionnel — Stryker `pivot-ui` ne produit aucun résultat exploitable** : le dernier
run réel du workflow `mutation-testing.yml` (`gh run list --workflow=mutation-testing.yml`, run
`28786417641`, déclenché par le cron du 2026-07-06T10:54:52Z) s'est terminé en statut
**`cancelled` après 1h00m22s** — le timeout de 60 minutes (déjà doublé depuis les 30min de
pivot-ui#68) est de nouveau atteint. Le déplacement en cron hebdomadaire visait justement à
éliminer ce problème de timeout constaté sur les PR auth ; il ne l'a pas résolu, il l'a seulement
rendu moins visible (un `cancelled` en cron silencieux plutôt qu'un `continue-on-error` visible
sur chaque PR). **Concrètement : le mutation testing n'a jamais produit un score exploitable sur
`pivot-ui` à ce jour** — ce n'est pas seulement "non bloquant", c'est un signal qualité totalement
absent sur le repo le plus mature et le plus volumineux de la plateforme (953 tests unitaires
frontend à muter).

---

## IV. Cohérence et fiabilité E2E entre les repos `-ui`

| Repo | Backend E2E | Statut réel (derniers runs) | Détail |
|------|-------------|-------------------------------|--------|
| pivot-ui | Vrai backend (image GHCR `pivot-core`) | **8/8 runs verts** (derniers runs vérifiés du 2026-07-07/08) | 17 scénarios (auth, admin, superadmin, legal, modules, contact) — E2E le plus mature et le plus fiable de la plateforme |
| pivot-agilite-ui | Aucun (retiré par PR#12, "drop unneeded pivot-core backend dependency") | Vert (10/10) | Scénario unique, smoke test sans appel HTTP — choix produit assumé et documenté, pas un trou de couverture caché |
| pivot-collaboratif-ui | Vrai backend visé (image GHCR `pivot-collaboratif-core`) | **15/15 runs en échec** | Voir ci-dessous — cause racine a *dérivé* depuis la rédaction du contexte de cet audit |
| pivot-pilotage-ui | Aucun (bootstrap) | Vert (10/10) | Le pipeline E2E **existe et tourne** (contredit partiellement l'hypothèse de départ "pas encore d'E2E") mais le scénario unique est un smoke test pur ("le shell charge la route placeholder", aucune logique métier) — couverture E2E fonctionnelle réelle = zéro malgré un check vert |

**Détail pivot-collaboratif-ui — divergence doc/réalité constatée pendant cet audit** :
`TODO-SETUP.md` et le commentaire en tête de `.github/workflows/e2e.yml` affirment que l'échec
`manifest unknown` (image absente) du début de bootstrap a été remplacé par un échec `docker:
denied` (permissions cross-repo GHCR) depuis la release v1.0.0 de `pivot-collaboratif-core`
(2026-07-06). **Vérification sur les 4 runs les plus récents (`28905761639`, `28905485811`,
`28903367932`, `28900819674`, tous 2026-07-07 21h-23h UTC)** : les logs montrent `Login
Succeeded!` suivi de `docker: Error response from daemon: manifest unknown` — c'est-à-dire le
symptôme **d'avant** v1.0.0, pas celui documenté. `gh api orgs/PIVOT-PLATFORM/packages/container/
pivot-collaboratif-core%2Fpivot-collaboratif-core/versions` renvoie `404 Package not found`,
cohérent avec ce constat. **La documentation de ce blocage était déjà obsolète au moment de cet
audit** — le signal E2E de ce repo est non fiable, et la cause exacte doit être réinvestiguée
(image jamais republiée depuis, tag `latest` absent, ou rétention de package ayant supprimé la
version) plutôt que de supposer que la cause documentée (permissions) est toujours la bonne.

**Correction post-publication** : une première version de ce rapport affirmait, sur la foi du
`TODO-SETUP.md` de `pivot-collaboratif-ui` (BLOQUANT #1, daté), que ce repo n'avait "aucune
branch protection ni ruleset appliqué". Vérification live (`gh api .../branches/main/protection`
et `.../rulesets`) refaite le 2026-07-08 : **faux** — le repo a une classic branch protection
réelle (3 checks requis, 1 review) et un ruleset `protect-main` actif depuis le 2026-07-06,
cohérent avec ce que confirme indépendamment `audit-cicd.md`. Le blocage documenté dans
`TODO-SETUP.md` a donc été résolu depuis sa rédaction, sans mise à jour du fichier. Point réel et
non trouvé ici : `E2E - Playwright` n'est effectivement **pas** parmi les checks requis de ce
repo (contrairement à Vitest/build qui le sont) — un signal plus étroit que "aucune protection".

---

## V. Fiabilité CI — résultats réels (`gh run list`)

| Repo | CI récente (hors E2E) | Note |
|------|------------------------|------|
| pivot-core | 9/10 verts (1 échec isolé, non reproduit) | Stable |
| pivot-ui | Vert sur les derniers runs (seul `Publish @pivot-platform/ui-core` échoue — connu, voir `audit-cicd.md`, hors périmètre QA) | Stable |
| pivot-agilite-core / -ui | 10/10 et 10/10 | Stable |
| pivot-collaboratif-core | 10/10 | Stable |
| pivot-collaboratif-ui | Vert hors E2E | E2E seul cassé (voir IV) |
| pivot-pilotage-core / -ui | 10/10 et 10/10 (1 échec isolé "PR image cleanup", indépendant) | Stable |

La fiabilité CI globale (hors le cas E2E collaboratif déjà traité) est **haute et cohérente** sur
l'ensemble de la plateforme.

---

## VI. Réévaluation de la limitation Testcontainers en sandbox

Le contexte de départ de cet audit affirmait une limitation structurelle : Testcontainers non
vérifiable dans un sandbox agent Claude Code (Docker-in-Docker/Ryuk injoignable, documenté PR
pivot-core#173). **Constat de cet audit : cette limitation est spécifique à l'environnement de
la PR #173** (exécution `mvn` depuis l'intérieur d'un conteneur Maven imbriqué, sans accès au
démon Docker de l'hôte) — **pas une limitation universelle des sandbox Claude Code**. Dans
l'environnement de cet audit, Docker est directement accessible (`docker ps` fonctionne, Ryuk
démarre normalement) : `mvn verify -Pcoverage` a été exécuté avec succès sur `pivot-core` (1045
tests réels, Testcontainers Postgres démarrés normalement) et sur `pivot-collaboratif-core` (74
tests, Testcontainers Postgres + Redis), produisant des chiffres de couverture JaCoCo réels et
non déclaratifs. À noter : un deuxième `mvn verify` lancé immédiatement après le premier sur
`pivot-collaboratif-core` a échoué (conflit de ports/conteneurs) — signe que l'environnement
sandbox reste plus fragile que la CI GitHub Actions native pour des exécutions Testcontainers
répétées rapidement, mais un run propre isolé est parfaitement fiable.

**Découverte incidente** : l'exécution complète de la suite `pivot-core` a révélé un bug réel
d'isolation de tests — `SuperAdminTenantIntegrationTest.tearDown` (`src/test/java/fr/pivot/
tenant/api/SuperAdminTenantIntegrationTest.java:139-156`) supprime les tenants créés par le test
et leurs `audit_events` associés, mais **pas les `users` rattachés** à ces tenants
(`fk_users_tenant`) — sur ce run, 24 erreurs `DataIntegrityViolation` en tearDown (violation FK
`fk_users_tenant` sur la table `tenants`), pour 0 échec d'assertion (les tests eux-mêmes passent,
seul le nettoyage post-test échoue). La CI GitHub Actions récente est pourtant verte sur ce repo
(9/10) — ce qui suggère une dépendance à l'ordre d'exécution des tests (non déterministe selon
JVM/JUnit) qui n'a simplement pas encore été déclenchée en CI. Root cause précise et fix non
investigués plus loin (hors périmètre d'un audit QA, relève d'une correction de code) mais le
signal est réel et reproductible localement.

---

## Statut des findings/dettes historiques

| # | Item | Statut | Preuve |
|---|------|--------|--------|
| — | — | **N/A — premier audit formel** | v1 (2026-06-20) n'a publié aucun score ni finding formel, seulement des points d'attention à vérifier (repris et tranchés dans les sections ci-dessus) |

---

## Bonnes pratiques confirmées / Points forts

1. **Couverture réelle systématiquement au-dessus des seuils** partout où du code métier existe
   — 85.7% à 100% selon les repos, mesurée par exécution réelle des suites, pas déclarative.
2. **CI fiable à travers toute la plateforme** — 9 ou 10 des 10 derniers runs verts sur
   pratiquement chaque repo, seul `pivot-collaboratif-ui` E2E fait exception.
3. **pivot-ui E2E est un exemple à suivre** : 17 scénarios réels contre un vrai backend GHCR,
   8/8 runs récents verts — le niveau de maturité E2E le plus élevé de la plateforme.
4. **Mutation testing correctement traité comme un indicateur, jamais un gate** — `continue-on-
   error`/`break: null` documenté et respecté sur tous les repos vérifiés, aucune fausse alarme
   de merge (même si, côté `pivot-ui`, l'outil n'a lui-même jamais fini par produire de score —
   voir section III).
5. **Testcontainers bien architecturé** (`AbstractIntegrationTest`, `@ServiceConnection`) —
   fonctionne nativement dès qu'un vrai démon Docker est accessible, y compris dans cet audit.
6. **Transparence documentaire remarquable** sur les blocages externes connus (`TODO-SETUP.md`
   détaillé, commandes de correctif prêtes à l'emploi) — la dette est documentée, pas cachée.
7. **`pivot-pilotage-core` documente honnêtement** l'absence de seuil de mutation pertinent
   (`mutationThreshold=0`) plutôt que de copier un seuil arbitraire sans le justifier.

---

## Score par grille — Pyramide de tests / Couverture réelle / Fiabilité CI

| Catégorie | Score | Findings/dette actifs |
|-----------|-------|-------------------------|
| Pyramide de tests (répartition unit/IT/E2E) | 7/10 | 2 repos `-core` à 0 test (bootstrap, risque actuel faible) ; E2E fonctionnel réel sur seulement 2 des 4 repos `-ui` |
| Couverture réelle vs seuil Gate 2 | 6/10 | Seuil documenté (85%) ≠ seuil appliqué (80%) sur tous les `pom.xml` inspectés ; aucun gate mécanique côté `-ui` |
| Mutation testing (PITest/Stryker) | 5/10 | Seuils incohérents entre repos (60/60 vs 0/0 vs absent) ; PITest `pivot-core` restreint au seul package `fr.pivot.auth.*` ; Stryker `pivot-ui` n'a **jamais produit un résultat exploitable** (dernier run réel `cancelled` après timeout 60min, cron du 2026-07-06) |
| Cohérence E2E inter-repos `-ui` | 6/10 | 1 pipeline cassé avec cause racine documentée déjà obsolète (collaboratif-ui) ; 1 zéro-couverture fonctionnelle malgré check vert (pilotage-ui) |
| Fiabilité CI (résultats réels observés) | 8.5/10 | Très fiable partout sauf E2E collaboratif-ui |

---

## Plan d'action

### P0 — Bloquant

Aucun item P0 identifié à ce jour : la CI est verte sur tous les repos porteurs de code métier
réel, et le seul pipeline cassé (E2E `pivot-collaboratif-ui`) n'est pas un required check — il
ne bloque aucun merge actuellement, seulement la fiabilité du signal QA sur ce repo.

### P1 — Avant le prochain déploiement / dette majeure

- Réconcilier le seuil Gate 2 documenté (≥85%, `pivot-docs/CLAUDE.md`) avec le seuil réellement
  appliqué (80%, tous les `pom.xml` JaCoCo inspectés) — décider explicitement lequel est correct
  et aligner l'autre, plutôt que de laisser cet écart non intentionnel perdurer.
- Réinvestiguer la cause racine réelle de l'échec E2E `pivot-collaboratif-ui` — le run le plus
  récent échoue en `manifest unknown` (image absente), pas `denied` (permissions) comme
  documenté dans `TODO-SETUP.md` — mettre à jour la doc avec la cause actuelle avant de tenter un
  correctif basé sur l'ancien diagnostic.
- Ajouter `E2E - Playwright` aux checks requis de `pivot-collaboratif-ui` une fois sa cause racine
  réelle corrigée (voir ci-dessus) — la classic branch protection existe déjà, seul ce check
  manque à son périmètre requis.

### P2 — Sprint suivant

- Corriger le bug d'isolation `SuperAdminTenantIntegrationTest.tearDown` (`pivot-core`,
  `fk_users_tenant` non nettoyée avant suppression du tenant) — flakiness potentielle non
  détectée par l'ordre d'exécution actuel de la CI.
- Investiguer pourquoi Stryker (`pivot-ui`) atteint encore le timeout (60min) même en cron
  hebdomadaire isolé (pivot-ui#68 l'avait déjà porté de 30 à 60min sans résoudre le fond) —
  réduire le périmètre muté (auth/admin en priorité) plutôt que de continuer à repousser le
  timeout, sans quoi ce signal qualité restera durablement absent sur le repo le plus mature.
- Harmoniser la politique de seuils PITest entre repos (`pivot-agilite-core` déclare 60/60 sur
  des packages inexistants — soit les retirer, soit les aligner sur `pivot-pilotage-core`
  (0/0, honnête) jusqu'à l'arrivée de code métier réel.
- Documenter explicitement que `pivot-pilotage-ui` E2E est un smoke test infra-only (zéro
  couverture métier) pour éviter la fausse confiance d'un check vert sans contenu réel.

### P3 — Qualité continue

- Ajouter un premier test unitaire dès la première US métier sur `pivot-agilite-core` /
  `pivot-pilotage-core`, pour que le seuil JaCoCo cesse d'être vacueux dès que du code existe.
- Clarifier si un Quality Gate SonarCloud (%) est réellement configuré pour `pivot-core`/
  `pivot-ui` — actuellement aucune preuve locale que la couverture frontend soit gatée
  mécaniquement ailleurs que par auto-évaluation du Dev Agent.
- Ajouter un seuil `coverage.thresholds` dans `vitest.config.ts` (`pivot-ui`) ne serait-ce qu'à
  titre informatif — la métrique Functions du frontend (94.19/93.12/**84.69**/95.79) est déjà
  sous le seuil déclaré de 85% sans que personne ne l'ait détecté avant cet audit.
- Étendre le périmètre PITest de `pivot-core` au-delà de `fr.pivot.auth.*` (account, tenant,
  modules, plan, notification, contact n'ont aujourd'hui aucune mesure de mutation).

### Externe

- Accès cross-repo GHCR pour `pivot-collaboratif-ui` (rôle admin d'organisation requis) — cf.
  `audit-cicd.md`, BLOQUANT #2.

---

## Conclusion

**Dette maîtrisée, pas bloquant prod.** La qualité réelle des tests, là où ils existent, est
solide et dépasse largement les seuils déclarés sur la quasi-totalité des métriques mesurées. Les
réserves principales : un écart doc/config non intentionnel sur le seuil Gate 2 (85% documenté vs
80% appliqué, jamais vérifié avant cet audit) ; un pipeline E2E cassé dont le diagnostic documenté
était déjà faux au moment de cet audit (à réinvestiguer avant tout correctif) ; et un mutation
testing Stryker sur `pivot-ui` qui n'a jamais abouti (timeout systématique, y compris en cron
hebdomadaire dédié) —
un indicateur qualité absent plutôt que simplement non-bloquant, sur le repo le plus mature de la
plateforme. Aucun de ces points n'empêche un déploiement immédiat, mais tous méritent un
traitement avant que la plateforme ne s'étende davantage.

---

*Expert QA — 2026-07-08 — indépendant — distribution restreinte*

---

## Historique des révisions

| Version | Date | Score | Évolutions principales |
|---|---|---|---|
| v1 | 2026-06-20 | — | Initialisation |
| v2 | 2026-07-08 | 6.5/10 | Premier audit formel réel : comptage effectif des tests sur les 8 repos, exécution locale `mvn verify -Pcoverage`/`npm run test:ci` sur 6 repos (pivot-core, pivot-collaboratif-core, pivot-ui, pivot-agilite-ui, pivot-collaboratif-ui, pivot-pilotage-ui), vérification CI réelle via `gh run list`/`gh run view --log`. Findings clés : seuil Gate 2 documenté (85%) ≠ seuil réellement appliqué (80%, tous pom.xml) ; E2E `pivot-collaboratif-ui` cassé avec cause racine documentée déjà obsolète (dérive de "denied" vers "manifest unknown", vérifié par run réel + package 404) ; bug d'isolation de tests réel détecté (`SuperAdminTenantIntegrationTest.tearDown`, 24 erreurs FK reproductibles) ; limitation Testcontainers/sandbox réévaluée comme spécifique à un environnement Docker-in-Docker imbriqué, non universelle ; mutation testing Stryker (`pivot-ui`) n'a jamais produit de résultat exploitable (dernier run réel `cancelled` après timeout 60min) ; couverture Functions du frontend `pivot-ui` (84.69%) sous le seuil déclaré de 85%, jamais détecté faute de gate mécanique. |
