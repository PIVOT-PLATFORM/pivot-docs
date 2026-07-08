# Audit — cicd

**Statut :** 6.8/10 — v2 (premier audit formel)
**Dernière révision :** 2026-07-08
**Profil agent responsable :** Expert DevSecOps — passe unique (double-passe non requise pour ce
domaine, cf. `skill-audit-format.yaml`, `principes_generaux.double_passe_optionnelle`)
**Périmètre réellement couvert** :

- Les 9 repos de `pivot-platform/` : `pivot-core`, `pivot-ui`, `pivot-docs`, `pivot-agilite-core`,
  `pivot-agilite-ui`, `pivot-collaboratif-core`, `pivot-collaboratif-ui`, `pivot-pilotage-core`,
  `pivot-pilotage-ui`
- Tous les `.github/workflows/*.yml` de chacun (CI, release, deploy, security, sbom, scorecard,
  e2e, dast, lighthouse, mutation-testing, pr-preview, pr-image-cleanup, publish-ui-core,
  docs-checks, deploy-docs, plumber)
- Branch protection classique **et** rulesets réels via `gh api repos/PIVOT-PLATFORM/{repo}/...`
  (protection + rulesets détaillés, pas seulement la liste) sur les 9 repos
- `TODO-SETUP.md` (6 présents : agilite-core/ui, collaboratif-core/ui, pilotage-core/ui) et
  `SECURITY.md` (4 présents : pivot-core, pivot-ui, collaboratif-core/ui)
- État réel des permissions GHCR cross-repo (tentative d'appel direct de l'API Packages avec le
  token de cette session) + historique des runs GitHub Actions réels (`gh run list` / `gh run
  view --log-failed`) sur les workflows E2E, Release, CI, Publish ui-core
- Couples publisher/consumer : `fr.pivot:pivot-core` (pom.xml des 4 repos `-core`), `@pivot-platform/ui-core`
  (package.json des 4 repos `-ui`, workflow `publish-ui-core.yml`), images GHCR `-core` → E2E `-ui`
- Paramètres de repo (merge methods, delete-branch-on-merge) sur les 9 repos
- Config `.plumber.yaml` comparée entre les 9 repos

---

## Score global : 6.8/10 (premier audit formel — pas de tendance possible)

Ce rapport remplace un `Statut: À compléter` qui n'avait jamais reçu de passage réel (voir la
règle `principes_generaux.regle_historique` du gabarit d'audit — les révisions v1 à v5
précédemment observées sur d'autres domaines de `pivot-platform` avant tout audit réel ont été
corrigées ailleurs ; ce fichier restait, lui, honnêtement à v1/`À compléter`). Il n'y a donc
**aucune version antérieure à comparer** — le score ci-dessus est une mesure initiale, pas une
évolution.

La plateforme montre une discipline DevSecOps réelle et consistante à l'échelle des 9 repos :
scanning sécurité complet (Gitleaks/CodeQL/Semgrep/Trivy/SCA), provenance SLSA L2/L3 avec
séparation correcte des privilèges `id-token`, gate Trivy avant push Docker (fail-closed), et
surtout une **généralisation réelle** de la correction de l'incident de course de versioning du
2026-07-06 (règle `Release-Trigger: true` sur sa propre ligne) à l'ensemble des 8 workflows
`release.yml` de la plateforme, pas seulement au repo où l'incident a été détecté. C'est le signe
d'une gouvernance CI/CD qui capitalise correctement sur ses propres incidents.

En face de cela, ce premier audit révèle des angles morts concrets et vérifiés aujourd'hui,
pas de simples risques théoriques : un canal de divulgation de vulnérabilité mort sur les deux
repos les plus exposés (`pivot-core`, `pivot-ui`), une gouvernance des permissions cross-repo
GHCR qui a déjà cassé deux fois (`pivot-core→pivot-agilite-ui` le 2026-07-06, contourné plutôt que
corrigé ; `pivot-collaboratif-core→pivot-collaboratif-ui`, toujours rouge aujourd'hui avec une
cause racine qui a évolué depuis sa documentation initiale), et un workflow de publication npm
qui reproduit — sur un autre fichier — exactement la classe de bug que l'incident du 07-06 avait
pourtant fait corriger sur `release.yml`. Le détail est dans l'analyse par axe ci-dessous.

---

## I. Résumé exécutif

PIVOT Platform a mis en place, dès le bootstrap de chaque repo, une base CI/CD sérieuse : SAST
(CodeQL + Semgrep), secrets (Gitleaks), SCA, SBOM, scorecard OpenSSF, mutation testing non
bloquant, SLSA provenance, et un plan de convergence explicite et documenté (`TODO-SETUP.md`)
entre les repos matures (`pivot-core`, `pivot-ui`) et les 6 repos modules bootstrap. Ce plan de
convergence **fonctionne** : vérifié aujourd'hui, SonarCloud tourne au vert sur les 4 repos
modules contrôlés — mais l'étape suivante (étendre les checks requis maintenant que le blocage
est levé) n'a pas encore été exécutée, un pur retard d'exécution sur un plan par ailleurs sain.

À l'inverse, deux zones concentrent l'essentiel de la dette réelle : (1) la gouvernance des
permissions cross-repo GitHub Packages/GHCR, qui repose sur une action manuelle web-only d'un
admin d'organisation et qui a déjà cassé deux couples publisher/consumer sur trois tentés ; et
(2) une hygiène documentaire de sécurité incomplète — deux `SECURITY.md` avec un lien de
signalement mort, quatre repos sur neuf sans `SECURITY.md` du tout. Aucun de ces sujets ne
bloque aujourd'hui une release ou un merge sur les repos matures (les checks requis restent
verts), mais tous sont vérifiables, actifs, et corrigibles rapidement — exactement le type de
constat qu'un premier audit formel doit faire remonter avant qu'il ne devienne invisible sous la
routine.

**Verdict :** pas de bloquant production, mais pas encore "prod-ready" au sens de la maturité
visée par l'ADR/CLAUDE.md — dette concentrée, actionnable, avec un plan clair ci-dessous.

---

## II. Analyse par axe

### Axe 1 — Rulesets et branch protection

**Score axe : 6.5/10**

Sur `pivot-core`, `main` est protégée par **trois mécanismes simultanés** :
classic branch protection (4 checks requis, 1 review), ruleset `protect-main` (id `17924228`,
créé 2026-06-20 : suppression/force-push/historique linéaire uniquement) et ruleset
`main-protection` (id `17948736`, créé 2026-06-21, mis à jour 2026-06-28 : 10 status checks +
règle PR avec `required_approving_review_count: 0`). GitHub applique l'union la plus stricte de
ces trois sources, donc le comportement effectif est correct aujourd'hui (12 checks uniques + 1
review, en comptant les 4 de la classic protection non repris dans `main-protection` : `Maven
deploy preview (PR)`, `Docker preview image (PR)` recoupent en fait le ruleset — vérifié, les 10
checks du ruleset + rien d'autre de nouveau côté classic). Mais la coexistence de deux rulesets
d'objet quasi identique, avec une valeur de `required_approving_review_count` incohérente entre
eux (0 sur le ruleset le plus récent, 1 sur la classic protection), n'est documentée nulle part
sur `pivot-core` lui-même — seule une remarque en aparté dans le `TODO-SETUP.md` de
`pivot-collaboratif-ui` la mentionne. `pivot-ui` et `pivot-docs`, eux, n'ont qu'un seul ruleset
complet chacun — modèle plus propre, à privilégier pour toute convergence future.

Les 6 repos modules bootstrap (`agilite-core/ui`, `collaboratif-core/ui`, `pilotage-core/ui`)
ont tous le même schéma minimal, créé le même jour (2026-07-06, ids `18566700`–`18566703` et
`18556608`–`18556617`) : ruleset `protect-main` réduit à
`deletion`/`non_fast_forward`/`required_linear_history`, la classic branch protection portant
les checks requis réels — cohérent avec le plan de convergence documenté dans leurs
`TODO-SETUP.md` respectifs. Ce plan est bien suivi, sans dérive constatée.

`pivot-docs` a en plus une règle `required_signatures` sur son ruleset — vérifiée active,
cohérente avec l'exigence de commits signés documentée dans le setup WSL.

**Finding CICD-005 (MEDIUM, P2)** — Double ruleset non documenté sur `pivot-core`
(`protect-main` et `main-protection`) avec incohérence de `required_approving_review_count`. Fonctionnel
aujourd'hui par effet d'union, mais source de confusion pour tout futur mainteneur qui listerait
un seul des deux rulesets et croirait avoir la vue complète. Recommandation : consolider en un
seul ruleset (modèle `pivot-ui`/`pivot-docs`) ou documenter explicitly la cohabitation sur
`pivot-core` lui-même (pas seulement en aparté ailleurs).

### Axe 2 — Convergence bootstrap → repos matures (required checks, SonarCloud)

**Score axe : 7/10**

Vérification réelle aujourd'hui (pas une supposition) : `SonarCloud Analysis` tourne et **réussit**
sur les 4 repos modules contrôlés en profondeur — `pivot-agilite-core` (run `28843750982`),
`pivot-agilite-ui` (run `28844001457`), `pivot-pilotage-core` (run `28844005930`),
`pivot-pilotage-ui` (run `28844008014`). Le blocage documenté dans chaque `TODO-SETUP.md`
("projet SonarCloud inexistant") est donc **résolu** — mais l'étape suivante que ces mêmes
fichiers décrivent ("une fois le projet créé et un run vert, ajouter SonarCloud aux checks
requis") n'a pas encore été exécutée : les rulesets/branch protection de ces 4 repos n'incluent
toujours pas `SonarCloud Analysis` dans leurs checks requis. `pivot-collaboratif-core/-ui`
avaient déjà `SonarCloud Analysis` dans leurs listes de checks requis dès le bootstrap (visible
dans leur classic branch protection), ce qui suggère que leur projet SonarCloud a été créé plus
tôt dans le processus que celui d'agilite/pilotage.

**Finding CICD-004 (MEDIUM, P1 — quick win)** — Le prérequis technique de la convergence
SonarCloud est levé sur les 4 repos vérifiés, mais l'extension des checks requis (dernière étape
du plan déjà écrit par l'équipe elle-même) ne l'a pas suivi. Aucun obstacle restant identifié —
un simple retard d'exécution sur un plan déjà correct.

Les secrets d'organisation (`SONAR_TOKEN`, `GITLEAKS_LICENCE_KEY`, `PLUMBER_TOKEN`,
`SEMANTIC_RELEASE_TOKEN`) sont bien hérités automatiquement par tout nouveau repo — vérifié
explicitement par chaque bootstrap via `gh api .../actions/organization-secrets` avant d'écrire
son propre `TODO-SETUP.md`, plutôt que supposé. Bonne pratique de bootstrap à retenir.

### Axe 3 — Scanning sécurité / supply chain

**Score axe : 8.5/10**

Le plus solide des axes. Constaté sur les 9 repos :

- Gitleaks, CodeQL (Java/JS-TS selon stack), Semgrep (`p/java`, `p/spring`, `p/owasp-top-ten`
  en fallback sans token, `SEMGREP_APP_TOKEN` absent partout mais dégradation gracieuse
  documentée et vérifiée), SCA (OWASP Dependency-Check côté `-core`, Trivy + npm audit côté
  `-ui`) — présents et cohérents partout.
- `release.yml` (les 8 repos qui en ont un) : scan Trivy **avant** le push Docker
  (`exit-code: '1'` sur CRITICAL/HIGH, `ignore-unfixed: true`) — une image vulnérable non
  corrigeable n'est jamais poussée sur le registre. Bon gate fail-closed, vérifié sur le code
  réel du job (`pivot-collaboratif-core/.github/workflows/release.yml:172-180`), pas seulement
  sur une déclaration d'intention.
- Provenance SLSA : L2 sur `pivot-core`/`pivot-ui` (JAR + image), **L3** sur les 6 repos modules
  (`id-token: write` scindé dans des jobs `provenance-jar`/`provenance-container` dédiés, jamais
  dans le job `release` qui produit le binaire — un build ne peut donc jamais forger sa propre
  attestation, ce qui est précisément la différence L2→L3).
- SBOM généré à chaque release (`sbom.yml`), OpenSSF Scorecard actif et vert sur les 9 repos à
  la dernière exécution sur `main`.
- Mutation testing (PITest côté `-core`, Stryker côté `-ui`) systématiquement en
  `continue-on-error: true` avec commentaire explicite justifiant le choix produit (indicateur
  qualité, jamais un gate de merge) — cohérent avec Gate 3 du `CLAUDE.md` sur les 9 repos, sans
  exception constatée.
- `.plumber.yaml` (contrôles de durcissement CI/CD propres à l'outil interne Plumber :
  SHA-pinning des actions, interdiction d'actions archivées/CVE connues, allowlist de sources
  autorisées) quasi identique sur les 9 repos — seule différence : `pivot-core` autorise en plus
  `appleboy/ssh-action`/`slackapi/slack-github-action` (utilisés par son `deploy.yml` réel),
  absents des 6 repos modules dont le `deploy.yml` est encore un stub `TODO`. Différence
  justifiée, pas une dérive.

Aucun `continue-on-error` détourné pour du confort a été trouvé en dehors du cas légitime déjà
documenté (mutation testing) — le point de vigilance du v1 précédent est donc vérifié négatif.

### Axe 4 — Gouvernance des packages inter-repos (Maven / npm / GHCR)

**Score axe : 4.5/10 — axe le plus faible de cet audit**

Table des couples publisher/consumer recensés, avec état réel vérifié aujourd'hui :

| Package | Publisher | Consumer(s) prévu(s) | État réel (2026-07-08) |
|---|---|---|---|
| `fr.pivot:pivot-core` (le `CLAUDE.md`/l'architecture cible l'appellent `pivot-core-starter`, mais **aucun artefact de ce nom n'existe** — voir ci-dessous) | `pivot-core` (`release.yml`, Maven → GitHub Packages) | `pivot-agilite-core`, `pivot-collaboratif-core`, `pivot-pilotage-core` | **Non consommé.** Confirmé par grep sur les 3 `pom.xml` (aucune référence) et par le contenu réel de `release.yml` : l'artefact publié est le jar applicatif complet `fr.pivot:pivot-core`, repackagé par `spring-boot-maven-plugin` — inutilisable comme dépendance de compilation. Bloque EN17.1. |
| `@pivot-platform/ui-core` (⚠️ nom réel — voir CICD-008) | `pivot-ui` (`publish-ui-core.yml`, npm → GitHub Packages) | `pivot-agilite-ui`, `pivot-collaboratif-ui`, `pivot-pilotage-ui` | Publié une seule fois avec succès (`0.1.0`, run `28880046735`, 2026-07-07T15:56) puis **cassé sur chaque push suivant** — voir CICD-003. Non consommé par aucun `-ui` module à ce jour (EN17.3, confirmé absent des 4 `package.json`). |
| `@pivot/design-system` | `pivot-design-system` (repo pas créé) | tous les `-ui` | N/A — repo inexistant (EN17.2, `Stage: Backlog`), rien à auditer côté CI/CD avant sa création. |
| `ghcr.io/pivot-platform/pivot-core/pivot-core` (image Docker) | `pivot-core` | `pivot-ui` E2E | **Fonctionne.** Vérifié : dernier run E2E `pivot-ui` (2026-07-08T06:25) réussit, pull + boot de l'image core réel — la seule preuve positive que le schéma de consommation cross-repo GHCR marche correctement sur cette plateforme quand la permission est bien accordée. |
| `ghcr.io/pivot-platform/pivot-core/pivot-core` | `pivot-core` | `pivot-agilite-ui` E2E (prévu) | **Cassé puis contourné, pas corrigé.** Le pull échouait avec `denied` (runs `28828158251`/`28828158230`, 2026-07-06) — accès Actions cross-repo jamais accordé à `pivot-agilite-ui`. Au lieu de demander le grant, la dépendance a été **retirée** du workflow E2E (justifié : la page bootstrap n'appelle de toute façon aucun backend) — pragmatique à court terme, mais le futur retour de cette dépendance (dès la première vraie feature, comme prévu dans le commentaire du fichier) rencontrera le même mur d'accès si personne n'accorde le grant entre-temps. |
| `ghcr.io/pivot-platform/pivot-collaboratif-core/pivot-collaboratif-core` | `pivot-collaboratif-core` | `pivot-collaboratif-ui` E2E | **Cassé, actif aujourd'hui.** Voir détail CICD-002 ci-dessous — root cause a changé depuis la documentation initiale (BLOQUANT #2 du `TODO-SETUP.md`). |

**Finding CICD-002 (HIGH, P1)** — Gouvernance GHCR cross-repo systémiquement fragile, déjà en
échec sur 2 couples sur 3 tentés :

1. **Cause structurelle confirmée** : accorder l'accès Actions cross-repo à un package GHCR
   privé ("Manage Actions access") n'est réalisable **que via l'UI web par un admin
   d'organisation** — confirmé à nouveau aujourd'hui, pas supposé : toute tentative d'appel
   direct de l'API Packages avec le token de cette session échoue en 403/404
   (`gh api orgs/PIVOT-PLATFORM/packages/container/...` → `Resource not accessible by personal
   access token`). Chaque nouveau couple `-core`→`-ui` qui commence à consommer une image
   nécessite donc une action manuelle non automatisable par un agent, et ce process n'a
   apparemment pas encore de checklist systématique au moment du premier
   `docker push` d'un nouveau module (les deux échecs ci-dessus l'illustrent).

2. **La cause racine documentée pour `pivot-collaboratif-ui` a évolué** — à re-vérifier avant
   toute action corrective, ne pas se fier au diagnostic du `TODO-SETUP.md` seul. Le
   `TODO-SETUP.md` documente un échec `docker: denied` (permission refusée) constaté le
   2026-07-07 (run `28843199918`). Le run le plus récent (`28905761639`, 2026-07-07T23:25,
   toujours en échec sur `main`) montre un message **différent** : `docker: Error response
   from daemon: manifest unknown` après un `docker login` réussi — c'est-à-dire que le pull
   échoue désormais parce que le tag `:latest` ne résout plus, pas (uniquement) parce que
   l'accès est refusé. Reconstitution de la cause à partir des preuves : la PR
   `pivot-collaboratif-core#17` ("revert premature v1.0.0 — reset to 0.0.0 pre-Socle", mergée
   2026-07-07T05:32:45Z) a annulé une release `v1.0.0` publiée par erreur ("le nettoyage
   GitHub Release/tag est géré séparément post-merge" — texte de la PR). Confirmé aujourd'hui :
   `pivot-collaboratif-core` n'a plus qu'un seul tag (`v0.0.0`) et **aucune** GitHub Release
   publiée. Le tag `:latest` de l'image GHCR issu de la release annulée ne semble donc plus
   exister, et aucune release réelle n'a été refaite depuis pour republier `:latest`.
3. **Conséquence pour la suite** : la commande de correctif déjà préparée dans le
   `TODO-SETUP.md` (grant cross-repo, ou passage du package en public) reste probablement
   nécessaire — le pull anonyme (`docker manifest inspect` sans authentification, testé
   aujourd'hui) échoue aussi en `manifest unknown`, ce qui ne permet pas de trancher seul si le
   package reste privé et non autorisé, ou si le tag est simplement absent. **Les deux
   hypothèses doivent être traitées, pas une seule** : (a) refaire une release réelle de
   `pivot-collaboratif-core` pour republier `:latest`, ET (b) accorder malgré tout le grant
   cross-repo (ou rendre le package public — aucune IP sensible dans un squelette bootstrap) pour
   éviter que le problème ne revienne identique à la prochaine release annulée.
4. **Recommandation structurelle** : ne plus faire reposer l'E2E cross-repo sur un tag flottant
   `:latest`. Une release annulée côté publisher ne devrait jamais pouvoir casser
   silencieusement et indéfiniment l'E2E du consumer — épingler sur un digest immuable ou le
   dernier tag semver connu-bon, avec un fallback explicite si absent, au lieu d'un échec brut
   `docker run`.

Impact retenu sur le score : `E2E - Playwright` n'est **pas** un check requis chez
`pivot-collaboratif-ui` (confirmé sur le ruleset et la classic protection) — les merges de
features (`#19`, `#21`, `#23`, `#27`, `#28`, `#31`, tous mergés entre le 2026-07-07 15h et 23h)
continuent donc sans être bloqués, mais **sans filet E2E réel** pendant tout ce développement
actif du whiteboard — le risque n'est pas un blocage, c'est une régression silencieuse.

**Finding CICD-003 (MEDIUM, P2)** — `publish-ui-core.yml` casse à chaque push sur `main` depuis
son premier succès. Preuve : run `28922295550` (2026-07-08T06:25, le plus récent) échoue avec
`npm error You cannot publish over the previously published versions: 0.1.0` ; seul le run
précédent `28880046735` (2026-07-07T15:56) a réussi. Cause : le workflow se déclenche sur
`push: branches: [main]` (pas seulement sur tag), mais ne bump la version que si
`startsWith(github.ref, 'refs/tags/v')` (`publish-ui-core.yml:32-36`) — sur un push ordinaire à
`main`, il republie donc systématiquement `0.1.0` (version statique dans
`projects/ui-core/package.json`), que npm refuse par immutabilité de version. C'est
**exactement la même classe de bug** que l'incident de course de versioning du 2026-07-06 sur
`release.yml` (plusieurs déclenchements republiant la même version faute de tag intermédiaire) —
la leçon n'a pas été généralisée à ce workflow frère. Non bloquant aujourd'hui (`Publish
@pivot-platform/ui-core` n'est pas dans les checks requis de `pivot-ui`), mais reproduit le même
"faux rouge" permanent que l'incident déjà corrigé une fois sur `deploy-docs.yml`
(`pivot-docs`, 2026-07-04) — un signal CI cassé en continu érode la confiance dans les checks
CI. Recommandation : gater sur push de tag uniquement (miroir de la discipline
`Release-Trigger`), ou reprendre le pattern idempotent déjà existant dans
`pivot-collaboratif-core/release.yml:202-237` (gestion explicite du 409 "already exists" avec
vérification de digest avant de continuer).

**Finding CICD-008 (LOW, P3)** — Dérive de nommage : le package réellement publié s'appelle
`@pivot-platform/ui-core` (`package.json` de `projects/ui-core`, titre du workflow
`publish-ui-core.yml`), alors que le `CLAUDE.md` racine, `pivot-ui/CLAUDE.md` et **les 3**
`TODO-SETUP.md` des repos `-ui` modules le documentent sous `@pivot/ui-core`. Risque concret :
toute dépendance ajoutée en copiant la documentation platform échouera à résoudre (mauvais nom
de package), et personne ne le détectera avant d'essayer réellement `npm install`.

**Finding CICD-009 (MEDIUM, P1)** — `fr.pivot:pivot-core-starter` toujours non publié (EN17.1),
confirmé aujourd'hui sur les 3 `pom.xml` modules (aucune référence) et sur `pivot-core/pom.xml`
(pas de profil `release` séparé). Bien documenté et honnêtement traité partout (aucune
dépendance fictive ajoutée nulle part, chaque repo l'explique dans son propre `CLAUDE.md`/
`TODO-SETUP.md`) — ce n'est pas une dérive de gouvernance, mais ça bloque toujours
concrètement l'implémentation de `PivotModule`/`TenantContext` dans les 3 domaines métier
simultanément tant que `pivot-core` ne livre pas cet enabler.

### Axe 5 — Politique de sécurité et divulgation (SECURITY.md)

**Score axe : 5/10**

**Finding CICD-001 (HIGH, P0)** — Les liens de signalement de vulnérabilité (Private
Vulnerability Reporting) de `pivot-core/SECURITY.md` et `pivot-ui/SECURITY.md` — les deux repos
les plus mûrs et les plus exposés de la plateforme (backend API + frontend) — pointent vers
`github.com/ApoSkunz/PIVOT` et `github.com/ApoSkunz/pivot-ui` respectivement. **Les deux URLs
retournent 404 aujourd'hui** (vérifié via `gh api repos/ApoSkunz/PIVOT` et
`repos/ApoSkunz/pivot-ui`) — ces repos n'existent pas sous ce compte, probablement un reliquat
d'avant le transfert vers l'organisation `PIVOT-PLATFORM`. `pivot-ui/SECURITY.md` référence même
un second lien mort (`github.com/ApoSkunz/pivot-core/...` pour rediriger vers le backend). À
titre de comparaison, `pivot-collaboratif-core/SECURITY.md` et
`pivot-collaboratif-ui/SECURITY.md` référencent correctement `PIVOT-PLATFORM/...` — les repos
bootstrap les plus récents ont le bon réflexe, les deux repos fondateurs non. Un chercheur en
sécurité externe suivant la procédure documentée aujourd'hui tomberait sur un 404 et n'aurait
aucun canal privé fonctionnel — ce qui invalide de fait le SLA CVSS annoncé dans le même document
(7j critique / 30j élevé) puisque le signalement ne peut jamais arriver. Correction triviale
(un lien par fichier) mais impact élevé et confirmé — classé P0 malgré l'absence de blocage CI
technique, car il s'agit d'un mécanisme de sécurité production actif et cassé, pas d'une dette
de pipeline.

**Finding CICD-007 (MEDIUM, P2)** — 4 des 9 repos (`pivot-agilite-core`, `pivot-agilite-ui`,
`pivot-pilotage-core`, `pivot-pilotage-ui`) n'ont **aucun** `SECURITY.md`. Seuls les modules
`collaboratif` en ont un parmi les 6 bootstrap. Risque faible tant qu'aucune feature métier
réelle n'existe (statut bootstrap confirmé dans leurs `CLAUDE.md`), mais à traiter avant le
premier sprint métier de ces deux domaines — même logique de convergence que le gate SonarCloud
déjà suivi par l'équipe.

Pour les `SECURITY.md` qui existent, le contenu est de bonne qualité et cohérent : SLA CVSS
identique verbatim partout (Critique ≥ 9.0 → 7j, Élevé 7.0–8.9 → 30j), périmètre "dans/hors
périmètre" correctement adapté par repo (ex. `pivot-collaboratif-ui` renvoie explicitement vers
`pivot-ui` pour l'auth qu'il ne gère pas lui-même), scanning CI listé correctement.

### Axe 6 — Santé globale de la CI (état réel des runs, pas déclaratif)

**Score axe : 8/10**

Snapshot réel du dernier run de chaque workflow sur `main`, sur les 9 repos, à la date de
l'audit :

| Repo | Workflows rouges sur `main` | Détail |
|---|---|---|
| `pivot-core` | 0 | Tout vert (CI, Release, Security, Scorecard) |
| `pivot-ui` | 1 | `Publish @pivot-platform/ui-core` — CICD-003 |
| `pivot-docs` | 0 | Tout vert |
| `pivot-agilite-core` | 0 | Tout vert |
| `pivot-agilite-ui` | 0 | Tout vert |
| `pivot-collaboratif-core` | 0 | Tout vert |
| `pivot-collaboratif-ui` | 1 | `E2E - Playwright` — CICD-002 |
| `pivot-pilotage-core` | 0 | Tout vert |
| `pivot-pilotage-ui` | 0 | Tout vert |

Seulement **2 signaux rouges sur l'ensemble de la plateforme**, tous deux déjà analysés
ci-dessus (CICD-002, CICD-003), tous deux non bloquants pour les merges (checks non requis), et
tous deux à blast radius contenu (un seul repo chacun). C'est un signal de bonne santé globale —
le socle CI de la plateforme n'est pas fragile, les deux incidents actifs sont identifiés
précisément, pas noyés dans du bruit généralisé.

**Finding CICD-006 (LOW, P2)** — Paramètres de merge divergents entre repos matures et modules :
`pivot-core`/`pivot-ui`/`pivot-docs` = squash uniquement + suppression automatique de branche
après merge (cohérent avec la convention `CLAUDE.md` "une branche = un item de sprint" +
nettoyage post-merge). Les **6** repos modules bootstrap autorisent au contraire les 3 méthodes
de merge (squash/merge/rebase) et **n'auto-suppriment pas** les branches après merge — non
documenté dans aucun `TODO-SETUP.md`, contrairement aux autres écarts bootstrap qui sont tous
explicitement tracés. Risque : historique non linéaire si un merge commit est utilisé par
erreur sur un module, et accumulation de branches orphelines (nettoyage manuel requis alors que
le `CLAUDE.md` de chaque repo décrit une étape post-merge "nettoyer la branche" qui suppose
l'un ou l'autre). Correction triviale (paramètre de repo, pas de workflow à toucher).

**Finding CICD-010 (LOW, INFO)** — `pivot-pilotage-ui/TODO-SETUP.md` §5 affirme "en lisant
`pivot-ui/.github/workflows/release.yml`, aucun step `npm publish` n'existe — seule une image
Docker est publiée". C'est inexact aujourd'hui : `publish-ui-core.yml` est un workflow séparé qui
fait bien un `npm publish` (voir CICD-003) — l'auteur de ce `TODO-SETUP.md` n'a visiblement
vérifié que `release.yml` et pas l'ensemble du dossier `workflows/`. Dérive documentaire mineure,
symptomatique d'un besoin plus large de re-vérifier les `TODO-SETUP.md` contre l'état réel plutôt
que de les considérer figés une fois écrits (même schéma que CICD-002 point 2 ci-dessus).

---

## Statut des findings/dettes historiques

N/A — premier audit formel. Le fichier ne portait jusqu'ici qu'un `Statut: À compléter` sans
score réel (voir règle `regle_historique` du gabarit) ; les points listés dans l'ancienne section
"Points d'attention" (jamais un audit formel) n'ont donc pas de statut à faire évoluer — ils ont
été ré-vérifiés en profondeur dans l'analyse par axe ci-dessus plutôt que reconduits tels quels :

- "Convergence rulesets bootstrap vs matures" → confirmé suivi correctement, un retard
  d'exécution identifié (CICD-004), pas une dérive.
- "SonarCloud inexistant sur pilotage" → **résolu**, vérifié vert aujourd'hui (Axe 2).
- "Incidents CI déjà rencontrés" (retry Pages, Stryker cron) → confirmés toujours en place et
  efficaces (voir Décisions notables, section conservée ci-dessous), aucune régression.
- "`continue-on-error` détourné" → vérifié négatif, seul le cas légitime (mutation testing)
  trouvé sur les 9 repos.

---

## Bonnes pratiques confirmées / Points forts

1. **Discipline `Release-Trigger` généralisée** — la correction de l'incident de course de
   versioning (2026-07-06) a été propagée aux **8** workflows `release.yml` de la plateforme
   (`grep -qxE 'Release-Trigger: true'`, match de ligne exacte), pas seulement patchée sur le
   repo où l'incident est apparu.
2. **Gate Trivy fail-closed avant push Docker** — une image avec une CVE critique/élevée non
   corrigeable n'est jamais poussée sur GHCR, vérifié sur le code réel du job.
3. **SLSA L3 avec séparation de privilèges correcte** — `id-token: write` isolé dans des jobs de
   provenance dédiés, jamais dans le job qui produit le binaire.
4. **Mutation testing traité en indicateur, jamais en gate** — `continue-on-error` documenté et
   cohérent sur les 9 repos, sans détournement constaté ailleurs.
5. **Bootstrap honnête** — aucune dépendance Maven/npm fictive ajoutée nulle part en attendant
   `pivot-core-starter`/`@pivot-platform/ui-core`/`@pivot/design-system` ; chaque repo documente
   explicitement le gap plutôt que de le contourner silencieusement.
6. **`pr-image-cleanup.yml` correctement scopé** — nettoie uniquement le package `-preview`,
   commentaire explicite dans le code avertissant de ne jamais toucher au package de prod, gère
   proprement la restriction GitHub des versions à plus de 5000 téléchargements.
7. **Vérification active plutôt que supposition** — chaque `TODO-SETUP.md` documente ses
   constats via des commandes `gh api` réellement exécutées (secrets d'organisation, contenu
   réel de `release.yml` d'un autre repo) plutôt que des suppositions non vérifiées.
8. **Santé CI globale réelle** — seulement 2 signaux rouges sur 9 repos à la date de l'audit,
   tous deux non bloquants et déjà identifiés précisément.
9. **`.plumber.yaml` convergé** — configuration de durcissement quasi identique sur les 9 repos,
   écarts résiduels tous justifiés (stub `deploy.yml`).
10. **Cas de consommation GHCR cross-repo qui fonctionne** — `pivot-core → pivot-ui` E2E prouve
    que le schéma marche quand la permission est correctement accordée ; les deux échecs
    (agilite, collaboratif) sont donc un problème de process d'exécution du grant, pas un défaut
    d'architecture.

---

## Score par grille — Maturité DevSecOps & gouvernance des packages inter-repos

| Catégorie | Score | Findings/dette actifs |
|---|---|---|
| Rulesets & branch protection | 6.5/10 | CICD-005 |
| Convergence bootstrap → matures (checks requis, SonarCloud) | 7/10 | CICD-004 |
| Scanning sécurité / supply chain (SAST/SCA/secrets/SLSA/SBOM/Scorecard) | 8.5/10 | Aucun actif |
| Gouvernance packages inter-repos (Maven/npm/GHCR) | 4.5/10 | CICD-002, CICD-003, CICD-008, CICD-009 |
| Politique de sécurité & divulgation (SECURITY.md) | 5/10 | CICD-001, CICD-007 |
| Santé globale CI (état réel des runs) | 8/10 | CICD-006, CICD-010 |
| **Moyenne pondérée (score global)** | **6.8/10** | 10 findings actifs (0 critique / 2 high / 5 medium / 3 low) |

---

## Plan d'action

### P0 — Bloquant (action immédiate, < 24h)

- **CICD-001** — Corriger les liens de Private Vulnerability Reporting cassés dans
  `pivot-core/SECURITY.md` (`ApoSkunz/PIVOT` → `PIVOT-PLATFORM/pivot-core`) et
  `pivot-ui/SECURITY.md` (`ApoSkunz/pivot-ui` → `PIVOT-PLATFORM/pivot-ui`, + le lien croisé vers
  le backend). Correction d'une ligne par fichier, impact sécurité réel et confirmé (404 vérifié
  aujourd'hui) sur le canal de divulgation des deux repos les plus exposés.

### P1 — Avant le prochain déploiement / dette majeure

- **CICD-002** — Gouvernance GHCR cross-repo : (a) refaire une release réelle de
  `pivot-collaboratif-core` pour republier un tag `:latest` valide ; (b) accorder malgré tout
  l'accès Actions cross-repo à `pivot-collaboratif-ui` (ou rendre le package public) — nécessite
  un rôle admin d'organisation, non exécutable par le token de cette session ; (c) traiter de la
  même façon `pivot-core → pivot-agilite-ui` avant que la dépendance Docker n'y soit réintroduite
  (prévu "dès la première vraie feature" selon le commentaire du workflow) pour ne pas
  reproduire l'échec du 2026-07-06.
- **CICD-004** — Étendre les checks requis (rulesets/branch protection) des 4 repos modules où
  `SonarCloud Analysis` tourne déjà vert (`agilite-core/ui`, `pilotage-core/ui`) — aucun
  obstacle restant, action purement administrative.
- **CICD-009** — Prioriser côté `pivot-core` la publication réelle de `fr.pivot:pivot-core-starter`
  (EN17.1) — bloque la consommation par les 3 domaines métier simultanément.

### P2 — Sprint suivant

- **CICD-003** — Corriger `publish-ui-core.yml` (gater sur push de tag uniquement, ou reprendre
  le pattern idempotent de gestion du 409 déjà existant dans `release.yml`) avant qu'un premier
  module `-ui` ne tente réellement de consommer `@pivot-platform/ui-core`.
- **CICD-005** — Consolider les deux rulesets de `pivot-core` en un seul (modèle
  `pivot-ui`/`pivot-docs`), ou documenter explicitement leur cohabitation et l'incohérence de
  `required_approving_review_count`.
- **CICD-006** — Aligner les paramètres de merge des 6 repos modules sur le modèle
  squash-only + auto-delete-branch des repos matures.
- **CICD-007** — Créer un `SECURITY.md` pour `pivot-agilite-core/ui` et `pivot-pilotage-core/ui`
  (modèle déjà disponible : `pivot-collaboratif-core/ui`) avant le premier sprint métier de ces
  deux domaines.

### P3 — Qualité continue

- **CICD-008** — Corriger la dérive de nommage `@pivot/ui-core` → `@pivot-platform/ui-core` dans
  `CLAUDE.md` (racine + `pivot-ui`) et les 3 `TODO-SETUP.md` qui la reproduisent.
- **CICD-010** — Corriger l'affirmation obsolète de `pivot-pilotage-ui/TODO-SETUP.md` §5 sur
  l'absence de step `npm publish` côté `pivot-ui`.

### Externe — hors contrôle direct de l'équipe

- `pivot-design-system` (EN17.2, `Stage: Backlog`) — repo pas encore créé, aucune CI/CD à auditer
  avant sa création ; mentionné ici uniquement pour compléter la table de gouvernance des
  packages (Axe 4). Décision produit assumée, pas un défaut CI/CD.
- L'octroi de permission cross-repo GHCR (CICD-002b) nécessite un rôle admin d'organisation via
  l'UI web GitHub — non automatisable par un agent avec un token de repo standard, quel que soit
  le repo. Listé aussi en P1 ci-dessus car c'est une action humaine à déclencher rapidement, pas
  une dépendance à un tiers.

---

## Conclusion

**Verdict : dette maîtrisée, pas de bloquant production.** Aucun des 10 findings de ce premier
audit ne casse aujourd'hui un merge ou une release sur les repos matures — les checks requis
restent verts, et les deux signaux rouges actifs (CICD-002, CICD-003) sont contenus à un repo
chacun, non requis, déjà diagnostiqués précisément. La plateforme n'est cependant pas encore
"prod-ready" au sens plein : un canal de divulgation de vulnérabilité mort sur les deux repos
les plus exposés (CICD-001) est une réserve sérieuse pour toute annonce publique de la
plateforme, et la gouvernance GHCR cross-repo (CICD-002) doit être systématisée avant l'ouverture
d'un quatrième couple publisher/consumer — sans quoi le prochain module rencontrera exactement
le même mur que les deux précédents. Réserves principales : CICD-001 (P0, sécurité), CICD-002
(P1, fiabilité E2E cross-repo), CICD-009 (P1, bloquant transverse aux 3 domaines métier).

---

*Expert DevSecOps — 2026-07-08 — indépendant — distribution restreinte*

---

## Décisions notables

- **2026-07-04 — Retry sur échec transitoire du déploiement GitHub Pages** :
  le job `actions/deploy-pages` échoue de façon intermittente avec
  `Deployment failed, try again later.` quand un déploiement précédent vient
  de se terminer (observé sur pivot-docs#26 et #27, check non-bloquant pour
  le merge mais générant un faux rouge sur chaque PR). Ajout d'un mécanisme
  de nouvelle tentative (jusqu'à 3 essais, backoff 20s/40s) sur
  `docs-checks.yml` (preview PR) et `deploy-docs.yml` (déploiement prod),
  factorisé dans un workflow réutilisable `_deploy-pages-retry.yml`,
  sans nouvelle dépendance externe (réutilise `actions/deploy-pages` déjà
  pinné SHA). **Effet de bord noté :** le passage en `workflow_call` renomme
  le check GitHub du job preview PR, qui passe de
  `Déployer l'aperçu PR sur GitHub Pages` à
  `preview-deploy / Déployer l'aperçu PR sur GitHub Pages` (format imposé
  par GitHub pour les jobs appelant un workflow réutilisable). Sans impact
  aujourd'hui car ce check n'est pas dans `required_status_checks` de
  `main` — mais si jamais ajouté aux checks requis, prévoir le nouveau nom.
  Voir pivot-docs#31.

- **2026-07-03 — Mutation testing (Stryker, pivot-ui) déplacé en exécution hebdomadaire** :
  le job `Mutation Testing (Stryker)` dans `pr-checks.yml` dépassait régulièrement le délai
  de 30min sur les PR touchant l'auth (gros volume de tests), affichant un "fail" trompeur alors que
  le score de mutation est un indicateur qualité non bloquant, jamais un gate de merge
  (`continue-on-error`, voir CLAUDE.md Gate 3). Déplacé dans un workflow dédié
  `mutation-testing.yml` — cron lundi 06:00 UTC + `workflow_dispatch` manuel, timeout porté
  à 60min. Voir pivot-ui#68.

## Sous-domaine — Gouvernance des packages inter-repos (GitHub Packages / GHCR)

**Profil agent responsable :** Expert DevSecOps

Sous-domaine ajouté suite à deux incidents réels déjà rencontrés, tous deux ré-vérifiés dans ce
premier audit formel (voir Axe 4 et Axe 1 ci-dessus pour le détail complet et l'état réel
aujourd'hui) :

1. **Incident connu #1 — Course de versioning (2026-07-06)** — plusieurs merges rapprochés
   déclenchaient chacun `release.yml`, calculant la même "prochaine version" avant qu'un tag ne
   soit créé entre eux ; le second à publier échouait en conflit sur GitHub Packages
   (`pivot-core` : versions 0.22.0 puis 0.25.0 restées orphelines sans tag). Corrigé par la règle
   `Release-Trigger: true` sur sa propre ligne, déclenchée uniquement au dernier item d'un
   sprint. **Statut vérifié aujourd'hui : résolu et généralisé** aux 8 workflows `release.yml`
   de la plateforme (voir Points forts #1) — mais la même classe de bug a réapparu, non corrigée
   cette fois, sur un workflow frère non couvert par la généralisation : voir CICD-003
   (`publish-ui-core.yml`, Axe 4).
2. **Incident connu #2 — Accès cross-repo GHCR refusé (2026-07-07/08)** — le package conteneur
   privé `ghcr.io/pivot-platform/pivot-collaboratif-core/pivot-collaboratif-core` n'accorde pas
   l'accès Actions à `pivot-collaboratif-ui`, qui en a besoin pour son E2E Playwright. **Statut
   vérifié aujourd'hui : toujours actif, mais la cause racine a évolué** depuis sa documentation
   initiale (`docker: denied` → `docker: manifest unknown`, probablement lié au revert de la
   release v1.0.0 du 2026-07-07, PR #17) — voir le détail complet et le plan de correction en
   deux volets dans CICD-002 (Axe 4). Un second cas structurellement identique
   (`pivot-core → pivot-agilite-ui`, 2026-07-06) a été découvert pendant cet audit et contourné
   par retrait de la dépendance plutôt que par correction du grant — même racine que
   l'incident #2, à traiter avec la même vigilance avant que la dépendance ne soit réintroduite.

Recensement des couples publisher/consumer package inter-repos (Maven, npm, GHCR) — table
complète avec état réel vérifié aujourd'hui : voir **Axe 4 — Gouvernance des packages
inter-repos** ci-dessus. Résumé : `fr.pivot:pivot-core-starter` toujours non publié (bloque 3
couples), `@pivot-platform/ui-core` publié une fois puis workflow cassé (bloque 3 couples),
`@pivot/design-system` repo pas créé (bloque 4 couples), images GHCR `-core`→`-ui` : 1 couple
fonctionnel (`pivot-core`→`pivot-ui`), 2 couples en échec (`pivot-core`→`pivot-agilite-ui`,
`pivot-collaboratif-core`→`pivot-collaboratif-ui`).

## Historique des révisions

| Version | Date | Score | Évolutions principales |
|---------|------|-------|------------------------|
| v1 | 2026-06-20 | — | Initialisation |
| v2 | 2026-07-08 | 6.8/10 | Premier audit formel réel. Rulesets/branch protection et required checks vérifiés en direct via l'API GitHub sur les 9 repos (pas déclaratif) ; confirmation que la convergence SonarCloud bootstrap est techniquement résolue mais pas encore répercutée sur les checks requis (CICD-004) ; ré-analyse de l'incident GHCR collaboratif avec une cause racine mise à jour et un second cas structurellement identique découvert (`pivot-core→pivot-agilite-ui`, CICD-002) ; découverte d'un canal de divulgation de vulnérabilité cassé sur `pivot-core`/`pivot-ui` (CICD-001) et d'un workflow de publication npm cassé de façon répétée (CICD-003) ; table complète des couples publisher/consumer inter-repos avec état réel. |
