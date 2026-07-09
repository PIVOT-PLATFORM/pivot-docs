# ADR-024 — Stratégie Git des forks contributifs

**Date :** 2026-07-09
**Statut :** Accepté
**Décideurs :** Architecte plateforme, Lead intégration
**Contexte technique :** organisation `PIVOT-PLATFORM` — forks contributifs (ADR-009 §1/§6)

---

## Contexte

ADR-009 (§1) définit le mode **Fork contributif** : un fork éphémère, créé pour développer une fonctionnalité *générique* manquante en amont, suivi d'une PR upstream immédiate — jamais un patch interne conservé. Sa « Règle d'or anti-divergence » (§1) interdit tout code PIVOT-spécifique dans un fork. Son §6 esquisse une organisation cible illustrative :

```text
pivot-platform/
├── pivot-core/
├── pivot-plugins/
├── pivot-native/
└── forks/
    └── upstream-<brique>/
```

avec un cycle de vie déjà tranché — fork → branche `feature/<besoin>` → PR upstream → fusionnée = le fork meurt, refusée = documenté + adaptateur préféré à un rebase permanent — resynchronisation hebdomadaire minimum, et un `FORK.md` obligatoire par fork (PR, raison, condition de mort, responsable). §6 note un mécanisme provisoire (« subtree par défaut, submodule pour les très gros amonts »), mais renvoie explicitement à un ADR dédié pour trancher : le présent document.

**Deux faits changent la donne par rapport au croquis illustratif de §6 :**

1. **`pivot-platform/` n'est pas un dépôt** (racine locale de convenance, cf. `CLAUDE.md` racine) — il n'existe donc aucun repo « parent » réel dans lequel `forks/` pourrait être un simple sous-dossier versionné au sens propre. Chaque brique de l'arborescence de §6 doit correspondre à un vrai repo GitHub de l'organisation `PIVOT-PLATFORM`, cloné en local à côté des autres (exactement comme `pivot-core`, `pivot-ui`, `pivot-docs` le sont déjà) — pas à un dossier interne à l'un d'eux.
2. **Les cibles réelles de §5 sont toutes de gros amonts** : OpenProject (GPL-3.0, ~15 ans d'historique Rails), Plane (AGPL-3.0), Formbricks (AGPL-3.0), n8n (fair-code), Kestra (Apache-2.0), Metabase (AGPL-3.0) sont des applications complètes, pas des libs. L'exception « submodule pour les très gros amonts » de §6 couvre donc en pratique *tous* les cas listés par §5 — le cas « subtree par défaut » ne s'applique, dans les faits, à aucune cible connue aujourd'hui.

Vérification faite (`find`/`ls` sur `pivot-core`, `pivot-ui`, `pivot-docs`, les repos `pivot-{pilotage,agilite,collaboratif}-{core,ui}`) : **aucun dossier `forks/` ni fichier `.gitmodules` n'existe encore nulle part** — rien n'a été construit, cet ADR précède l'implémentation.

ADR-006 a déjà tranché, pour les modules PIVOT natifs, en faveur du multi-repo par domaine plutôt que d'un monorepo — au nom de la CI indépendante, de cycles de release découplés et de l'autonomie d'équipe. La stratégie de fork doit être **cohérente avec cette philosophie**, pas la contredire en recréant, pour les forks, un couplage que ADR-006 a explicitement rejeté pour les modules.

ADR-002 fixe `pivot-core` en AGPL-3.0. Plusieurs cibles forkables (Plane, Formbricks, Metabase) sont elles-mêmes AGPL-3.0, OpenProject en GPL-3.0 — la mécanique Git retenue ne doit laisser aucune ambiguïté de frontière de licence entre le code PIVOT et le code amont forké.

## Décision

**Mécanisme retenu : `git submodule`, un submodule par fork, hébergé dans le repo module PIVOT propriétaire du domaine — jamais `git subtree`, jamais un paquet/vendoring.**

### 1. Chaque fork est un vrai fork GitHub, avec sa propre identité de repo

Un fork contributif est créé comme fork GitHub natif de l'amont, dans l'organisation `PIVOT-PLATFORM` — pas une copie, un vrai fork (ascendance Git partagée, requise par GitHub pour ouvrir une PR upstream) :

```bash
gh repo fork opf/openproject --org PIVOT-PLATFORM --fork-name fork-openproject --clone=false
```

Le repo `PIVOT-PLATFORM/fork-openproject` existe alors sur GitHub, avec l'historique complet d'OpenProject, son propre `LICENSE` (GPL-3.0) à la racine, son propre remote `upstream` pointant vers `opf/openproject`.

### 2. Rattachement : submodule dans le repo module propriétaire du domaine

Le fork est ensuite référencé, comme **submodule**, dans le repo PIVOT propriétaire fonctionnel de la brique (mapping direct sur ADR-009 §5) :

| Fork | Repo consommateur | Chemin local |
|---|---|---|
| `fork-openproject` (GPL-3.0) | `pivot-pilotage-core` | `forks/upstream-openproject/` |
| `fork-plane` (AGPL-3.0) | `pivot-agilite-core` | `forks/upstream-plane/` |
| `fork-formbricks` (AGPL-3.0) | `pivot-collaboratif-core` | `forks/upstream-formbricks/` |
| `fork-n8n`, `fork-kestra`, `fork-metabase` (transversaux, sans domaine propriétaire) | nouveau repo dédié `pivot-integrations` (créé au premier besoin réel, sur le même modèle que la création des repos module d'ADR-006) — **jamais** `pivot-core`, pour ne pas alourdir le socle | `forks/upstream-<brique>/` |

```bash
cd pivot-pilotage-core
git submodule add https://github.com/PIVOT-PLATFORM/fork-openproject.git forks/upstream-openproject
git commit -m "chore(forks): rattache fork-openproject (submodule, EN28.x)"
```

Le sous-dossier `forks/upstream-<brique>/` du croquis ADR-009 §6 est ainsi préservé littéralement, mais comme chemin de checkout d'un submodule à l'intérieur du repo module — pas comme dossier versionné du repo module lui-même. Le fork n'est **jamais** compilé/lié dans le build du repo module (pas de dépendance Maven/npm vers le contenu du submodule) : c'est une référence de suivi + de responsabilité d'équipe, le fork tournant comme service déployé indépendamment (image Docker propre à l'amont, wirée dans le portail via le contrat à six capacités d'ADR-009 §4 — jamais par liaison de code, même principe que les adaptateurs, ADR-009 §3).

### 3. Travail sur le fork

```bash
cd pivot-pilotage-core
git submodule update --init forks/upstream-openproject   # opt-in, une fois, seulement pour qui travaille le fork
cd forks/upstream-openproject
git checkout -b feature/<besoin> upstream/main
# ... développement ...
git push origin feature/<besoin>
gh pr create --repo opf/openproject --head PIVOT-PLATFORM:feature/<besoin>   # PR upstream immédiate
```

### 4. Resynchronisation hebdomadaire minimum

Automatisée **dans le repo du fork lui-même**, pas dans le repo module consommateur :

```yaml
# fork-openproject/.github/workflows/resync.yml
on:
  schedule: [{ cron: "0 6 * * 1" }]
jobs:
  resync:
    steps:
      - run: |
          git fetch upstream
          git checkout main && git merge --ff-only upstream/main && git push origin main
          git checkout feature/<besoin> && git rebase main
          git push --force-with-lease origin feature/<besoin>
```

Une seconde automatisation, découplée et à cadence plus lente, ouvre dans le repo module consommateur une PR de bump du pointeur de commit du submodule (mécanique identique à une PR Renovate/Dependabot de mise à jour de dépendance) — jamais synchrone avec le resync du fork.

### 5. `FORK.md` — contenu et enforcement

Vit **à la racine du repo du fork** (`fork-openproject/FORK.md`), pas dans le repo module consommateur — il doit voyager avec le fork et disparaître avec lui :

```markdown
# FORK.md — fork-openproject

- **PR upstream :** opf/openproject#XXXXX
- **Raison :** [fonctionnalité générique manquante — lien backlog EN28.x]
- **Condition de mort :** PR fusionnée upstream, ou refusée → adaptateur (jamais rebase permanent)
- **Responsable :** [nom, rôle upstream steward]
- **Dernière resync :** [date, commit amont]
```

Un check CI obligatoire (`fork-lifecycle-check.yml`, dans le repo du fork) bloque le workflow de resync hebdomadaire si `FORK.md` est absent ou si son champ PR est vide — pas de fork « orphelin » qui traîne sans PR déclarée.

### 6. Mort du fork

**PR fusionnée upstream :**

```bash
# dans le repo module consommateur (ex. pivot-pilotage-core)
git submodule deinit -f forks/upstream-openproject
git rm -f forks/upstream-openproject
rm -rf .git/modules/forks/upstream-openproject      # + retrait de l'entrée .gitmodules
git commit -m "chore(forks): retire fork-openproject — fusionné upstream (opf/openproject#XXXXX)"
gh repo archive PIVOT-PLATFORM/fork-openproject     # conservé archivé, traçabilité, jamais supprimé
```

Deux commandes, un commit — le retrait est un diff de deux lignes (entrée `.gitmodules` + pointeur de gitlink), pas une chirurgie d'historique.

**PR refusée :** mêmes commandes de retrait ; `FORK.md` et le backlog documentent le refus ; la fonctionnalité repart en **adaptateur** (ADR-009 §1) — jamais en rebase permanent du fork.

### 7. Isolation CI

`actions/checkout` sans `submodules: true` (défaut) ne récupère **pas** le contenu du submodule — la CI normale du repo module (build Maven/Java de `pivot-pilotage-core`, par exemple) ne touche jamais `forks/upstream-openproject/`, sans toolchain étrangère (Ruby/Rails, Node…) imposée au pipeline principal, sans coût de build ajouté. La CI du fork vit entièrement dans le repo du fork, héritée/adaptée de la CI amont, avec sa propre baseline supply-chain (SBOM/SCA/signature, ADR-016) — budget et gates strictement séparés de ceux de `pivot-core`/`pivot-ui` (E05).

### 8. Frontière de licence

Chaque fork reste un repo GitHub à part entière avec son propre `LICENSE` racine (GPL-3.0 OpenProject, AGPL-3.0 Plane/Formbricks/Metabase, Apache-2.0 Kestra, fair-code n8n) — jamais fusionné dans l'arborescence Git d'un repo PIVOT AGPL-3.0. Le submodule n'introduit qu'un pointeur de commit + une URL : aucun fichier source amont ne réside physiquement dans l'historique de `pivot-pilotage-core` ou `pivot-agilite-core`. SBOM et scan de provenance (ADR-016) s'attribuent donc proprement par repo, sans jamais avoir à trancher « ce sous-dossier GPL-3.0 fait-il partie du repo AGPL-3.0 qui l'héberge ». `pivot-core` lui-même (ADR-002) n'est jamais concerné : le fork tourne comme service indépendant, jamais lié en code à `pivot-core` (même principe de non-liaison qu'ADR-009 §3 pour les adaptateurs).

## Alternatives écartées

**`git subtree` (l'esquisse illustrative d'ADR-009 §6).**
- Clone unique : avantage réel (`git clone` du repo module suffit, pas d'étape supplémentaire) — mais ce gain se paie cash sur tout le reste.
- Mort du fork impossible à faire proprement : le contenu subtree est fusionné dans l'historique du repo module (avec `--squash`, un seul commit géant écrase l'historique fin du fork, rendant une PR upstream propre à partir de ce diff quasi impossible à reconstituer commit par commit ; sans `--squash`, c'est tout l'historique amont — des dizaines de milliers de commits pour OpenProject — qui pollue à jamais le log Git du repo module, même après retrait du contenu). Ceci contredit frontalement l'exigence ADR-009 : « le fork meurt » doit être un nettoyage net, pas une trace indélébile.
- CI non isolée par défaut : le contenu du subtree est présent dès le premier `git clone`, donc dans l'arbre de travail de tout contributeur et de tout run CI du repo module, sans opt-in — risque concret de bloat / toolchain étrangère embarquée dans le pipeline principal.
- Frontière de licence floue : le code amont GPL-3.0/AGPL-3.0 est physiquement dans l'arbre Git d'un repo dont le `LICENSE` racine dit AGPL-3.0 — ambiguïté d'attribution pour tout scan SBOM/SCA (ADR-016) qui raisonne par repo.
- Constat : puisque toutes les cibles réelles d'ADR-009 §5 sont de « très gros amonts » au sens de l'exception déjà prévue par §6, l'usage réel de subtree serait nul en pratique — cet ADR formalise donc submodule comme mécanisme unique, sans garder de cas d'usage résiduel pour subtree.

**Paquet / vendoring (image Docker patchée, artefact npm/Maven publié depuis le fork).**
- Incompatible avec la mécanique même de la PR upstream : GitHub exige une ascendance Git réelle (fork natif) pour ouvrir une PR contre l'amont ; un vendoring reconstruit un diff à la main à chaque publication, ce qui revient à abandonner « PR upstream immédiate » (ADR-009 §1) au profit d'un patch interne perpétuel — exactement ce qu'ADR-009 interdit.
- Ne correspond pas à la nature des cibles : OpenProject, Plane, Formbricks, n8n, Kestra, Metabase sont des applications déployables complètes, pas des librairies — la notion de « paquet » (artefact npm/Maven) s'applique à un **adaptateur** (dossier `pivot-plugins/adapter-<outil>/`, hors périmètre de cet ADR), pas à un fork de l'application entière.

## Conséquences

- **Positif :** mort de fork propre et rapide (deux commandes, un commit) — condition explicitement posée par ADR-009 est satisfaite mécaniquement, pas seulement par discipline d'équipe ; CI principale des repos module jamais alourdie (submodule non récursif par défaut) ; frontière de licence nette par repo, alignée avec les besoins SBOM/SCA d'ADR-016 ; historique Git du fork intact, donc PR upstream toujours propre à générer ; cohérent avec la philosophie multi-repo indépendante déjà actée par ADR-006 (le fork suit le même modèle que les repos module : repo autonome, CI autonome, cycle de vie autonome).
- **Négatif :** deuxième étape de clone pour qui travaille réellement le fork (`git submodule update --init`) — accepté comme coût d'opt-in délibéré plutôt que subi par tous les contributeurs ; nécessite la création d'un repo `pivot-integrations` pour les cibles transversales (n8n, Kestra, Metabase…) dès le premier besoin réel — prérequis à documenter au même titre que les prérequis de création de repo posés par ADR-006 ; la PR de bump du pointeur de submodule dans le repo module est une brique d'automatisation à construire (pas encore d'outillage Renovate custom pour ce cas).
- **Interdit :** ajouter un submodule de fork sans `FORK.md` valide (PR + condition de mort renseignées) ; laisser un fork fusionné/refusé référencé plus d'un sprint sans nettoyage (`git submodule deinit` + retrait `.gitmodules`) ; faire tourner la CI du repo module avec `submodules: recursive` par défaut (doit rester un choix explicite, jamais la config par défaut du pipeline principal).

## Points ouverts

- Repo d'accueil définitif des forks transversaux (n8n, Kestra, Metabase, Matomo, Documenso…) : `pivot-integrations` proposé ici, à confirmer au moment du premier fork réel de ce type (aucun aujourd'hui — pas de blocage immédiat).
- Outillage d'automatisation du bump de pointeur de submodule (règle Renovate custom ou Action dédiée) : à construire, pas encore spécifié en enabler backlog.
- Faut-il un lint centralisé (au niveau organisation) vérifiant que chaque entrée `.gitmodules` de type fork a bien un `FORK.md` vivant côté fork, plutôt que de compter sur le seul check CI local au repo du fork ? Différé faute de fork existant à ce jour pour objectiver le besoin.

## Historique

| Version | Date | Évolution |
|---------|------|-----------|
| v1 | 2026-07-09 | Décision initiale |
