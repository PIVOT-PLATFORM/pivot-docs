# Audit Dépendances / Supply Chain — PIVOT Platform

## Date : 2026-07-08 — v2

## Expert : Expert DevSecOps — passe unique (double-passe non requise pour ce domaine, cf. `skill-audit-format`)

## Périmètre : les 9 repos de `pivot-platform/` — tous les `pom.xml` (4 : `pivot-core` + 2 modules, `pivot-agilite-core`, `pivot-collaboratif-core`, `pivot-pilotage-core`) et tous les `package.json` (9 fichiers : `pivot-ui` + 2 sous-packages `design-system`/`ui-core`, `pivot-agilite-ui`, `pivot-collaboratif-ui`, `pivot-pilotage-ui`, `pivot-docs`) — CI SCA (`ci.yml`), SBOM (`sbom.yml`), Dependabot (`dependabot.yml`) de chaque repo

---

## Score global : 7.0/10 (premier audit formel)

Premier passage formel sur ce domaine (`Statut` précédent : "À compléter", `v1` = initialisation
sans score, cf. `docs/audits/README.md`). Aucun finding historique à confronter. Le score reflète
un outillage SCA/SBOM/Dependabot réellement en place et cohérent sur les 8 repos core/ui (pas
seulement déclaré) et une surface de dépendances de production réellement propre (vérifié par
exécution réelle, pas seulement lu), contrebalancé par des trous concrets : 4 repos sans fichier
`LICENSE`, aucun scan de licence automatisé malgré l'outil déjà présent, aucune exécution
planifiée (schedule) de la SCA, une dérive de lockfile réelle entre repos du même type, et un CVE
moderate non traité (scope test).

---

## I. Résumé exécutif

Contrairement à l'hypothèse de départ ("résultats dispersés, jamais consolidés"), l'outillage
sous-jacent est solide et homogène : les 8 repos core/ui déclarent un job CI `SCA - Dependency
Audit` (Trivy, `scanners: vuln`, `severity: HIGH,CRITICAL`, `exit-code: 1` — bloquant), un
workflow `SBOM` (CycloneDX, Maven ou npm selon le repo) déclenché à la publication d'une release,
et un `dependabot.yml` couvrant l'écosystème applicatif + `github-actions`. Ce qui manquait
réellement, et que cet audit comble pour la première fois, c'est la vue transverse : croiser les
versions entre repos du même type, exécuter réellement `mvn dependency:tree`/`npm audit` plutôt
que de se fier au *statut vert* du dernier run CI, et vérifier physiquement la présence des
fichiers `LICENSE`.

Résultat de cette vérification réelle : **aucun CVE critique ou high en dépendance de production**
(`npm audit --omit=dev` = 0 vulnérabilité sur les 4 repos Angular ; vérification OSV.dev sur les
207 coordonnées Maven résolues de `pivot-core` = 1 seul hit, en scope `test`). Les points faibles
identifiés sont réels mais tous corrigibles à faible effort : 2 findings HIGH liés à un même
paquet d'outillage build (`piscina`, via `@angular/build`, dev-only) présent dans le lockfile de
`pivot-ui` mais absent de ceux des 3 repos frontend sœurs malgré une déclaration `package.json`
identique — la preuve concrète de dérive demandée par ce premier audit — et 4 repos sur 8 sans
fichier `LICENSE` physique malgré une licence `AGPL-3.0-or-later` déclarée ou attendue partout.

**Avis production :** aucun blocage. La surface exposée en production (dépendances `compile`/
`runtime`/npm-prod) est propre. Les findings HIGH/MEDIUM concernent l'outillage de build/CI et la
gouvernance (licence, planification des scans), pas le runtime déployé.

---

## II. CRITIQUE

Aucun finding CRITIQUE identifié lors de ce premier audit.

---

## III. HIGH

### DEP-001 — `piscina` (Prototype Pollution Gadget → RCE) via `@angular/build`, scope dev uniquement

- **Sévérité :** HIGH — CVSS 3.1 **8.1** — `CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:H`
- **Catégorie :** CVE npm — [GHSA-x9g3-xrwr-cwfg](https://github.com/advisories/GHSA-x9g3-xrwr-cwfg)
- **Fichier :** `pivot-ui/package.json:32` (`"@angular/build": "^22.0.3"`, devDependency) —
  vulnérabilité réelle dans `piscina` 5.0.0-alpha.0–5.1.4, dépendance transitive bundlée par
  `@angular/build` dans `pivot-ui/package-lock.json`
- **Preuve d'exécution réelle :** `npm audit --json` (2026-07-08) sur `pivot-ui` : 7
  vulnérabilités (0 critique / 2 high / 2 moderate / 3 low). `npm audit --omit=dev` sur le même
  repo : **0 vulnérabilité** — confirmé, `piscina` n'est jamais présent dans le bundle de
  production (`ng build --configuration production`), uniquement dans la chaîne d'outillage de
  build/dev-server.
- **Impact :** RCE par pollution de prototype, en théorie exploitable si un attaquant contrôle
  `options.filename` transmis à `piscina` — surface réelle limitée à la machine qui exécute
  `npm run build`/CI (runner GitHub Actions), jamais l'application servie.
- **Recommandation :**
  ```json
  // pivot-ui/package.json — ajouter un bloc "overrides" (pattern déjà utilisé dans
  // pivot-docs/package.json pour serialize-javascript/uuid — voir Bonnes pratiques)
  "overrides": {
    "piscina": "^5.1.5"
  }
  ```
  Puis `npm install && npm audit --omit=dev && npm audit` pour confirmer la disparition des 2
  findings HIGH avant de merger. Vérifier ensuite que `ng build --configuration production`
  passe toujours (pas de changement d'API `piscina` consommée par `@angular/build`).
- **Effort :** XS (1 ligne + réinstallation + vérif CI)
- **Priorité :** P1

### DEP-002 — Dérive de lockfile entre repos Angular du même type (`pivot-ui` vs les 3 modules)

- **Sévérité :** HIGH (conséquence directe de DEP-001, distincte en tant que problème de
  gouvernance) — pas de CVSS propre, finding de processus
- **Catégorie :** Fraîcheur/dérive de version — axe explicitement demandé par ce premier audit
- **Fichiers :** `pivot-ui/package-lock.json` vs `pivot-agilite-ui/package-lock.json`,
  `pivot-collaboratif-ui/package-lock.json`, `pivot-pilotage-ui/package-lock.json`
- **Preuve d'exécution réelle :** les 4 `package.json` déclarent des plages identiques
  (`@angular/build: ^22.0.3`, `@angular/core: ^22.0.0`, mêmes devDependencies à
  `@stomp/rx-stomp` près pour `pivot-collaboratif-ui`). `npm audit --json` exécuté sur les 4
  repos donne : `pivot-ui` = 7 vulnérabilités (2 HIGH), `pivot-agilite-ui`/
  `pivot-collaboratif-ui`/`pivot-pilotage-ui` = **5 vulnérabilités chacun (0 HIGH)** — les 2
  mêmes CVE HIGH (`piscina`, `@angular/build`) présentes uniquement dans le lockfile de
  `pivot-ui`. Même plage semver déclarée, résolution différente : preuve que les 4 lockfiles
  n'ont pas été régénérés au même moment/état de registre npm.
- **Impact :** un repo de la même famille (même plage de version, même équipe, même stack) est
  plus exposé que ses 3 sœurs sans raison fonctionnelle — dérive silencieuse, invisible tant
  qu'aucun audit consolidé ne compare les lockfiles entre eux (exactement le point mort identifié
  au départ de cette mission).
- **Recommandation :** corriger DEP-001 sur `pivot-ui` réaligne immédiatement les 4 lockfiles sur
  0 HIGH. Au-delà du correctif ponctuel, envisager une régénération groupée des 4 lockfiles
  Angular à échéance commune (ex. mensuelle, alignée sur le cron Dependabot) plutôt que
  dépendante du hasard des PR de chaque repo.
- **Effort :** S
- **Priorité :** P1

---

## IV. MEDIUM

### DEP-003 — 4 repos sur 8 sans fichier `LICENSE` physique

- **Sévérité :** MEDIUM — risque de conformité légale, pas un CVE
- **Catégorie :** Compatibilité/déclaration de licence
- **Fichiers concernés :** `pivot-agilite-core/`, `pivot-agilite-ui/`, `pivot-pilotage-core/`,
  `pivot-pilotage-ui/` — **aucun fichier `LICENSE` à la racine**, vérifié par recherche directe
  (`find … -iname "licen*"` = vide sur ces 4 repos). Comparer à `pivot-core/LICENSE`,
  `pivot-ui/LICENSE`, `pivot-collaboratif-core/LICENSE`, `pivot-collaboratif-ui/LICENSE`,
  `pivot-docs/LICENSE` — présents.
- **Détail :** `pivot-agilite-core/pom.xml:17-22` et `pivot-pilotage-core/pom.xml:17-22`
  déclarent bien `<licenses><license><name>AGPL-3.0-or-later</name>…</license></licenses>` dans
  les métadonnées Maven — mais rien ne matérialise cette licence dans le repo lui-même. Côté
  frontend, `pivot-agilite-ui/package.json` et `pivot-pilotage-ui/package.json` ne déclarent
  aucun champ `"license"` et n'ont pas de fichier `LICENSE` en compensation.
- **Impact :** ambiguïté légale réelle (un tiers clonant l'un de ces 4 repos ne trouve la licence
  nulle part), et risque concret sur le check "License" d'OpenSSF Scorecard — déjà actif dans
  chacun de ces repos (`scorecard.yml`, cf. `audit-cicd.md`) — qui vérifie justement la présence
  physique d'un fichier de licence détectable, indépendamment des métadonnées `pom.xml`.
- **Recommandation :** copier le fichier `LICENSE` (AGPL-3.0-or-later) de `pivot-core`/`pivot-ui`
  vers les 4 repos manquants ; ajouter `"license": "AGPL-3.0-or-later"` dans les 4 `package.json`
  concernés pour cohérence outillage (license-checker, `npm ls`).
- **Effort :** XS (copie de fichier × 4 + 1 ligne JSON × 2)
- **Priorité :** P1

### DEP-004 — Aucun scan de compatibilité de licence automatisé (outil déjà présent, non activé)

- **Sévérité :** MEDIUM
- **Catégorie :** Compatibilité de licence
- **Fichiers :** `*/.github/workflows/ci.yml` (job `sca`, ex. `pivot-core/.github/workflows/ci.yml:152-161`,
  `pivot-ui/.github/workflows/ci.yml:182-191`) — `aquasecurity/trivy-action` est déjà configuré
  avec `scanners: vuln` uniquement, jamais `license`, dans les 8 repos core/ui.
- **Détail :** Trivy supporte nativement un scanner de licence (`scanners: license`) qui peut
  détecter les licences déclarées de chaque dépendance directe/transitive et les comparer à une
  allowlist. Aucun repo ne l'active. Aucun autre outil (`license-maven-plugin`,
  `license-checker` npm) n'est présent non plus. La vérification de compatibilité avec
  `AGPL-3.0-or-later` réalisée dans cet audit (spot-check manuel des dépendances directes
  majeures — Spring Boot/Spring Security = Apache-2.0, Angular/RxJS = MIT/Apache-2.0,
  Testcontainers/Playwright = MIT/Apache-2.0, PostgreSQL JDBC = BSD-2-Clause, Hibernate ORM =
  LGPL-2.1, PrimeReact/Docusaurus = MIT — aucune incompatibilité identifiée) reste **manuelle et
  ponctuelle**, non reproductible en continu.
- **Impact :** une dépendance future sous licence copyleft incompatible (ex. GPL-2.0-only) ou
  propriétaire (BSL, SSPL, licence "non-commercial") pourrait être ajoutée sans détection avant
  le prochain audit manuel.
- **Recommandation :**
  ```yaml
  # ci.yml — job sca, étape "Trivy - Maven pom.xml" / "Trivy - Frontend"
  scanners: vuln,license   # au lieu de: vuln
  ```
  Ajouter une allowlist de licences compatibles (MIT, Apache-2.0, BSD-2/3-Clause, ISC,
  LGPL-2.1/3.0) dans la configuration Trivy (`trivy.yaml` ou `--severity`/`--license-full`) et
  faire échouer le job sur toute licence hors liste ou non résolue.
- **Effort :** S (par repo — candidat à factoriser dans une composite action réutilisable,
  cf. jurisprudence CI documentée dans `audit-cicd.md`)
- **Priorité :** P1

### DEP-005 — Aucune exécution planifiée (schedule) de la SCA + Dependabot ignore les patchs

- **Sévérité :** MEDIUM
- **Catégorie :** SCA (CVE connues) — continuité de surveillance
- **Fichiers :** `pivot-core/.github/workflows/ci.yml:3-15` et équivalent sur les 7 autres repos
  core/ui — déclencheurs `push`/`pull_request`/`workflow_dispatch` uniquement, **aucun
  `schedule:`**. `pivot-core/.github/dependabot.yml:13-15` (et son équivalent dans les 8 autres
  repos, y compris `pivot-docs/.github/dependabot.yml`) : `ignore: dependency-name: "*",
  update-types: ["version-update:semver-patch"]` — bloque toute PR Dependabot de *version
  update* sur des correctifs patch, alors qu'une part significative des correctifs CVE sort en
  version patch (convention semver).
- **Détail :** si aucune PR ne touche `pom.xml`/`package.json` d'un repo pendant plusieurs
  semaines (cas réel des 3 repos modules encore en bootstrap), un CVE publié entre-temps contre
  une version déjà mergée n'est détecté ni par Trivy (pas de run programmé) ni par Dependabot
  (patch ignoré) — seulement au prochain PR qui touche ce repo, sans délai garanti. **Nuance
  importante, non vérifiable depuis le système de fichiers** : les *Dependabot security updates*
  (déclenchées par la base d'advisories GitHub, distinctes des *version updates* réglées par
  `dependabot.yml`) ne sont pas nécessairement bloquées par cette règle `ignore` — mais leur
  activation est un réglage GitHub (Settings → Code security), pas un fichier committé ; à
  confirmer par le mainteneur pour les 9 repos.
- **Illustration concrète trouvée par cet audit** (voir DEP-006) : `commons-compress:1.24.0`
  porte 2 CVE moderate connues depuis 2024, jamais remontées par une PR Dependabot (patch ignoré)
  ni détectées entre deux runs CI (pas de schedule).
- **Recommandation :** ajouter un déclencheur `schedule:` hebdomadaire au job `sca` (ou un
  workflow dédié `scheduled-sca.yml`) sur les 8 repos core/ui ; revoir la règle `ignore` de
  `dependabot.yml` pour ne pas bloquer les patchs à connotation sécurité, ou a minima confirmer
  que les Dependabot security updates sont actives sur les 9 repos.
- **Effort :** S
- **Priorité :** P1

### DEP-006 — `org.apache.commons:commons-compress:1.24.0` (scope test) — 2 CVE moderate connues

- **Sévérité :** MEDIUM — CVSS non fourni par GHSA (classées `MODERATE` par GitHub Security
  Advisories)
- **Catégorie :** CVE Maven — [CVE-2024-26308](https://nvd.nist.gov/vuln/detail/CVE-2024-26308)
  (GHSA-4265-ccf5-phj5, CWE-770, OutOfMemoryError sur fichier Pack200 corrompu) et
  [CVE-2024-25710](https://nvd.nist.gov/vuln/detail/CVE-2024-25710) (GHSA-4g9r-vxhx-9pgx,
  CWE-835, boucle infinie sur fichier DUMP corrompu) — toutes deux corrigées en 1.26.0
- **Fichier :** résolu transitivement via `org.testcontainers:testcontainers:1.21.4` (scope
  `test`) — présent identiquement dans les 4 `-core` repos via l'import
  `testcontainers-bom:1.21.4` (`pivot-core/pom.xml:40`, et équivalent dans `pivot-agilite-core`,
  `pivot-collaboratif-core`, `pivot-pilotage-core`)
- **Preuve d'exécution réelle :** `mvn dependency:tree` exécuté sur `pivot-core` (2026-07-08),
  207 coordonnées Maven uniques résolues, vérifiées par lot contre l'API OSV.dev — seul hit du
  batch complet.
- **Impact :** scope `test` uniquement (non embarqué dans le jar applicatif exécutable), et les
  deux CVE sont des DoS déclenchés par un fichier d'archive spécifiquement corrompu (Pack200/DUMP)
  — surface d'attaque réaliste très faible dans ce contexte (extraction d'images Docker par
  Testcontainers en CI), mais non nulle et non traitée depuis 2024.
- **Recommandation :**
  ```xml
  <!-- pom.xml racine des 4 repos -core, dans <dependencyManagement> à côté du BOM testcontainers -->
  <dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-compress</artifactId>
    <version>1.27.1</version>
  </dependency>
  ```
  Ou attendre/forcer une mise à jour de `testcontainers.version` si une release plus récente du
  BOM embarque déjà un `commons-compress` corrigé — à vérifier avant d'ajouter l'override
  explicite (éviter la duplication de gestion de version).
- **Effort :** XS
- **Priorité :** P2

### DEP-007 — Règle Dependabot `ignore semver-patch` identique sur les 9 repos, jamais reconsidérée

- **Sévérité :** MEDIUM (finding de gouvernance, distinct de DEP-005 qui porte sur la
  combinaison schedule+ignore — celui-ci porte sur la règle elle-même, dupliquée telle quelle
  depuis le premier repo sans jamais être affinée)
- **Catégorie :** SCA — processus de mise à jour
- **Fichiers :** `pivot-core/.github/dependabot.yml:13-15`, et la même règle mot pour mot dans
  les 8 autres `dependabot.yml` (`pivot-ui`, `pivot-agilite-core`, `pivot-agilite-ui`,
  `pivot-collaboratif-core`, `pivot-collaboratif-ui`, `pivot-pilotage-core`, `pivot-pilotage-ui`,
  `pivot-docs`)
- **Recommandation :** documenter explicitement, dans un `dependabot.yml` type ou dans
  `audit-cicd.md`, la justification de ce choix (bruit des patchs cosmétiques vs risque de
  retarder un correctif de sécurité) — aujourd'hui la règle est copiée telle quelle sans
  arbitrage visible. Si le choix reste "ignorer les patchs", documenter la compensation (Trivy +
  schedule, cf. DEP-005) comme filet de sécurité assumé plutôt que comme un simple oubli.
- **Effort :** XS (documentation) à S (ajustement de règle par écosystème)
- **Priorité :** P2

---

## V. LOW / INFO

### DEP-008 — SBOM jamais généré en pratique pour 6 des 8 repos core/ui (bootstrap, non bloquant)

- **Sévérité :** INFO
- **Fichiers :** `*/.github/workflows/sbom.yml` (ex. `pivot-core/.github/workflows/sbom.yml:1-6`,
  `pivot-ui/.github/workflows/sbom.yml:1-6`) — déclencheur `on: release: types: [published]` +
  `workflow_dispatch`, jamais sur push/merge ordinaire.
- **Détail :** `pivot-core` (tags jusqu'à `v0.26.0`) et `pivot-ui` (tags jusqu'à `v0.27.1`) ont
  de vraies releases publiées — leur SBOM CycloneDX a donc réellement été généré et attaché.
  `pivot-agilite-core/-ui`, `pivot-collaboratif-core/-ui`, `pivot-pilotage-core/-ui` n'ont qu'un
  tag `v0.0.0` (bootstrap, pas un vrai cycle semantic-release) — **aucun SBOM n'a donc jamais
  été concrètement produit pour ces 6 repos**, malgré un workflow correctement écrit et prêt.
- **Impact :** attendu et non bloquant à ce stade (aucune US métier livrée sur ces modules) — à
  surveiller : vérifier qu'un SBOM réel est bien attaché à la toute première release de chaque
  module, ne pas découvrir un défaut de configuration seulement à ce moment-là.
- **Recommandation :** aucune action immédiate ; ajouter ce point à la checklist de première
  release de chaque module (Gate 4/5 du premier sprint qui les concerne).
- **Effort :** — (suivi, pas de correctif)
- **Priorité :** P3

### DEP-009 — Sous-packages npm publiables sans champ `"license"`

- **Sévérité :** LOW
- **Fichiers :** `pivot-ui/projects/design-system/package.json:1-12`,
  `pivot-ui/projects/ui-core/package.json:1-17`
- **Détail :** ces deux packages sont destinés à être publiés séparément sur GitHub Packages
  (`@pivot/design-system`, `@pivot-platform/ui-core` — `ui-core/package.json` déclare déjà
  `publishConfig`) mais ne portent aucun champ `"license"` — un consommateur inspectant le
  tarball npm publié ne voit la licence nulle part (le `LICENSE` du repo racine `pivot-ui`
  n'est pas automatiquement inclus dans le tarball d'un sous-package `ng-packagr`).
- **Recommandation :** ajouter `"license": "AGPL-3.0-or-later"` dans les deux `package.json`.
- **Effort :** XS
- **Priorité :** P3

### DEP-010 — Pas de consolidation automatique multi-repo (corrigé manuellement par cet audit)

- **Sévérité :** INFO
- **Détail :** confirmé — chaque repo produit un résultat SCA/SBOM indépendant (SARIF dans
  l'onglet Security du repo, artifact CI, ou pièce jointe de release), sans agrégation
  automatique. Cet audit constitue la première consolidation, mais reste un instantané manuel.
- **Recommandation :** envisager un job planifié (mensuel) qui agrège le dernier statut SCA/SBOM
  de chaque repo dans ce document, réduisant la dépendance à un audit manuel complet pour
  détecter une dérive future.
- **Effort :** M
- **Priorité :** P3

### DEP-011 — `pivot-collaboratif-core` : pas de profil Maven `mutation`/`pitest-maven`, contrairement aux 3 autres `-core`

- **Sévérité :** LOW
- **Fichiers :** `pivot-collaboratif-core/pom.xml` (section `<profiles>`, ne contient qu'un
  profil `coverage` — comparer à `pivot-core/pom.xml:230-279`, `pivot-agilite-core/pom.xml:223-271`,
  `pivot-pilotage-core/pom.xml:241-285`, qui déclarent tous un profil `mutation` avec la
  dépendance `org.pitest:pitest-maven:1.25.5`)
- **Détail :** dérive de dépendances déclarées entre repos du même type — périmètre légitime de
  cet audit dépendances, même si l'impact fonctionnel (couverture de mutation testing) relève
  davantage d'`audit-qa`. Signalé ici pour traçabilité, pas dupliqué en détail.
- **Recommandation :** aligner `pivot-collaboratif-core/pom.xml` sur ses 3 repos sœurs (ajouter
  le profil `mutation` avec `pitest-maven:1.25.5`, seuils à 0 en attendant du code métier — même
  pattern que `pivot-pilotage-core`).
- **Effort :** XS
- **Priorité :** P3

---

## Statut des findings/dettes historiques

N/A — premier audit formel sur ce domaine. Le fichier existait déjà (`Statut: À compléter`,
`v1 | 2026-07-08 | — | Initialisation`) mais sans passage réel : aucun finding antérieur à
confronter.

---

## Bonnes pratiques confirmées / Points forts

| # | Point fort | Preuve |
|---|------------|--------|
| 1 | SCA Trivy bloquante (pas seulement informative) sur les 8 repos core/ui | `exit-code: 1` + `severity: HIGH,CRITICAL` identique dans chaque `ci.yml`, job `SCA - Dependency Audit` |
| 2 | SBOM CycloneDX réellement fonctionnel, avec diff automatique vs release précédente | `*/.github/workflows/sbom.yml` — génération Maven (`cyclonedx-maven-plugin`) ou npm (`npm sbom`), rapport de diff Python intégré au step summary |
| 3 | Dependabot configuré sur les 9 repos, écosystème applicatif **et** `github-actions` | `*/.github/dependabot.yml` — couverture supply-chain étendue à la CI elle-même |
| 4 | Zéro dérive de version sur les dépendances majeures déclarées entre repos du même type | Vérifié par lecture directe : Spring Boot `4.1.0`, Testcontainers `1.21.4`, Checkstyle `3.6.0`/`10.21.4`, SpotBugs `4.9.3.0` identiques sur les 4 `-core` ; Angular `^22.0.x`, Playwright `^1.50.0`, Vitest `^4.0.8`, TypeScript `~6.0.2`, Stryker `^9.0.0` identiques sur les 4 `-ui` |
| 5 | Surface de production réellement propre, vérifiée par exécution réelle (pas seulement déclarative) | `npm audit --omit=dev` = 0 vulnérabilité sur les 4 repos Angular ; 207 coordonnées Maven résolues de `pivot-core` vérifiées via OSV.dev = 1 seul hit, scope `test` (DEP-006) |
| 6 | Actions GitHub épinglées par SHA (pas de tag flottant) sur l'ensemble des workflows examinés | `actions/checkout@34e114876b...`, `aquasecurity/trivy-action@ed142fd0...`, etc. — réduit la surface d'attaque supply-chain de la CI elle-même |
| 7 | Pattern de remédiation `overrides` npm déjà connu et utilisé sur la plateforme | `pivot-docs/package.json:39-42` (`serialize-javascript`, `uuid`) — juste pas encore répliqué sur `pivot-ui` (DEP-001) |

---

## Score par grille — SCA / Licences / SBOM

| Catégorie | Score | Findings/dette actifs |
|-----------|-------|------------------------|
| SCA (CVE connues, consolidation multi-repo) | 7/10 | DEP-001, DEP-002, DEP-005, DEP-006 |
| Compatibilité de licence (AGPL-3.0-or-later) | 6/10 | DEP-003, DEP-004, DEP-009 |
| SBOM | 7.5/10 | DEP-008 |
| Fraîcheur / dérive de version inter-repos | 7/10 | DEP-001, DEP-002, DEP-011 |

---

## Plan d'action

### P0 — Bloquant prod

Aucun — aucun finding CRITIQUE, aucune dépendance de production vulnérable détectée lors de ce
premier audit.

### P1 — Avant le prochain déploiement / dette majeure

- DEP-001 — `overrides` npm sur `piscina` dans `pivot-ui/package.json`
- DEP-002 — réaligner les 4 lockfiles Angular (conséquence directe de DEP-001)
- DEP-003 — copier `LICENSE` dans les 4 repos qui en sont dépourvus + champ `"license"` npm
- DEP-004 — activer `scanners: vuln,license` sur le job Trivy des 8 repos core/ui
- DEP-005 — ajouter un `schedule:` au job SCA + clarifier le statut des Dependabot security updates

### P2 — Sprint suivant

- DEP-006 — pin `commons-compress` ≥ 1.27.1 dans les 4 `-core` (scope test)
- DEP-007 — documenter/arbitrer la règle Dependabot `ignore semver-patch`

### P3 — Qualité continue / mois

- DEP-008 — suivre la première génération réelle de SBOM sur les 6 repos modules (checklist Gate 5)
- DEP-009 — `"license"` sur les sous-packages `design-system`/`ui-core`
- DEP-010 — envisager une consolidation SCA/SBOM automatisée mensuelle
- DEP-011 — aligner `pivot-collaboratif-core` avec le profil `mutation`/pitest des 3 autres `-core`

### Externe

Aucun point identifié nécessitant un tiers hors du contrôle direct de l'équipe pour ce domaine à
ce stade (les correctifs upstream éventuels — ex. `@angular/build` bundlant une version corrigée
de `piscina` — ont un contournement immédiat via `overrides`, donc non bloquants en attendant).

---

## Conclusion

**Dette maîtrisée, aucun blocage production.** L'outillage SCA/SBOM/Dependabot est réellement en
place et cohérent sur toute la plateforme — le point de départ ("résultats dispersés, jamais
consolidés") était globalement vrai pour la *vue transverse*, pas pour la qualité de l'outillage
lui-même, qui s'avère plus mature qu'anticipé. Les réserves principales : (1) 4 repos sur 8 sans
fichier `LICENSE` physique malgré une licence attendue partout — correction triviale mais réelle
ambiguïté légale en l'état ; (2) aucune vérification de compatibilité de licence automatisée alors
que l'outil (Trivy) est déjà en place et qu'il suffit d'une ligne de configuration pour l'activer ;
(3) une dérive de lockfile bien réelle et mesurée entre `pivot-ui` et ses 3 repos frontend sœurs,
la preuve concrète que la consolidation multi-repo a une valeur réelle et pas seulement théorique.
Aucun de ces points ne bloque un déploiement immédiat, mais tous méritent traitement avant le
prochain cycle de release plutôt qu'un report indéfini.

---

*Expert DevSecOps — 2026-07-08 — indépendant (premier audit formel) — distribution restreinte*

---

## Historique des révisions

| Version | Date | Score | Évolutions principales |
|---|---|---|---|
| v1 | 2026-07-08 | — | Initialisation |
| v2 | 2026-07-08 | 7.0/10 | Premier audit formel réel : exécution effective de `mvn dependency:tree` (pivot-core, 207 coordonnées vérifiées via OSV.dev) et `npm audit` (les 4 repos Angular + pivot-docs) ; 0 CVE critique/high en production ; 2 findings HIGH liés à une dérive de lockfile `piscina`/`@angular/build` entre `pivot-ui` et ses 3 repos sœurs (DEP-001/DEP-002) ; 4 repos sur 8 sans fichier `LICENSE` (DEP-003) ; scanner de licence Trivy jamais activé malgré l'outil déjà présent (DEP-004) ; absence de schedule SCA + règle Dependabot ignore-patch non reconsidérée (DEP-005/DEP-007) ; CVE moderate historique sur `commons-compress` scope test (DEP-006) ; SBOM confirmé fonctionnel mais jamais exécuté en pratique sur 6 repos encore en bootstrap (DEP-008) |
