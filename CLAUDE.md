# CLAUDE.md — PIVOT-DOCS

## Projet

**PIVOT-DOCS** — documentation générale de la suite collaborative PIVOT. Rôle :

1. **Source de vérité du backlog** : fichiers markdown (`docs/backlog/`) + `docs/backlog/sprints/` (un fichier par sprint) — hiérarchie EPIC → FEATURE/ENABLER → US, état d'avancement.
2. **Documentation technique** : architecture cible, ADR, audits par domaine, pipelines CI/CD.
3. **Site publié** : [Docusaurus](https://docusaurus.io/) sur GitHub Pages — <https://pivot-platform.github.io/pivot-docs/>.

pivot-docs ne contient **aucun code applicatif** — backend dans `pivot-core`, frontend dans `pivot-ui`, modules métier dans les repos `pivot-xxx-core`/`pivot-xxx-ui`.

**Setup environnement complet (WSL, clone, Docker Compose, dev natif, commits signés)** → `docs/setup/` (publié : <https://pivot-platform.github.io/pivot-docs/setup/>).
**Modèle de `CLAUDE.md` racine multi-repo** (orchestration multi-repo uniquement, sans rien dupliquer des CLAUDE.md de repo) → `docs/setup/pivot-platform-claude-template.md`.

---

## Communication

Concise et directe. Techniquement précise. Pas de récapitulatifs inutiles.

**Exceptions (réponses complètes et structurées) :**
- Rédaction ou revue d'US / Epics
- Décisions d'architecture documentaire (structure backlog, ADR)
- Avis cybersécurité ou actions irréversibles — **confirmation obligatoire**
- Backlog et critères d'acceptation

---

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Site | Docusaurus 3.x · React 18 · MDX |
| Lint | markdownlint-cli2 · cspell (dictionnaire fr-fr) · script naming (`scripts/check-docs-naming.mjs`) |
| Diagrammes | PlantUML (`.puml`) — générés en PNG avant build prod |
| CI/CD | GitHub Actions · Plumber · OpenSSF Scorecard |
| Déploiement | GitHub Pages (`deploy-docs.yml`) |
| Backend / Frontend | → **pivot-core** (Java 25 · Spring Boot 4.x) / **pivot-ui** (Angular 22) |

---

## Structure du dépôt

```text
pivot-docs/
├── docs/
│   ├── setup/             # Setup environnement (WSL, clone, Docker Compose, commits signés)
│   │   └── pivot-platform-claude-template.md  # Modèle CLAUDE.md racine multi-repo
│   ├── backlog/          # Backlog opérationnel — un fichier par US/Enabler/Feature/Epic
│   │   └── README.md     # Source de vérité : hiérarchie, champs, templates, DoR
│   ├── architecture/      # Architecture cible (vue d'ensemble, modules, auth) + diagrammes
│   ├── adr/               # Architecture Decision Records
│   ├── audits/            # Audits par domaine (cyber, QA, RGPD, UX…) — jamais de fichiers datés
│   ├── cicd/              # Documentation pipelines CI/CD (pivot-core + pivot-ui)
│   └── workflow/          # Workflow agentique PIVOT (ACDD) — agents, gates, breaking points
├── .project/skills/       # Skills chargées contextuellement (index : _index.yaml)
├── src/                   # Composants React Docusaurus (thème, pages custom)
├── scripts/               # check-docs-naming.mjs — validation nomenclature fichiers
├── .github/workflows/
├── .plumber.yaml
└── docusaurus.config.js
```

---

## Équipe experte

Toute contribution mobilise les experts concernés — les mentionner explicitement dans la réponse.

| Expert | Domaine |
|--------|---------|
| **Product Owner** | Backlog markdown, Epics, US, critères d'acceptation, priorisation |
| **Scrum Master** | Coordination, sprints, impediments, backlog consistency |
| **Expert PR Review** | Relecture croisée neutre : cohérence backlog, traçabilité AC, qualité markdown |
| **Architecte Modules** | Cohérence du découpage domaines (pilotage/agilité/collaboratif) dans le backlog |
| **Expert RGPD** | Documentation conformité RGPD/CNIL, registre Art. 30 |
| **Experts Java / Angular / BDD / Sécurité / QA** | → **pivot-core** / **pivot-ui** (contenu technique détaillé) |

### Faire appel aux experts

| Type de tâche | Expert(s) |
|---------------|-----------|
| Rédaction/revue US, Epic, critères d'acceptation | **Product Owner** |
| Sprints (`docs/backlog/sprints/`), coordination multi-repo | **Scrum Master** |
| Review finale PR (après "prêt pour review") | **Expert PR Review** |
| ADR, architecture cible, diagrammes | **Architecte Modules** + expert du domaine concerné |
| Audit RGPD, registre traitements | **Expert RGPD** |

**Règles :**
- Mentionner l'expert explicitement quand son domaine est engagé.
- Changement de structure du backlog (hiérarchie, champs Project) = coordination **PO Agent + Scrum Master + tous les repos consommateurs**.

---

## Backlog — Fichiers markdown

> **pivot-docs est la source de vérité du backlog.**
> - Hiérarchie backlog + conventions : `docs/backlog/README.md`
> - Sprints, assignation US, état avancement : **`docs/backlog/sprints/`** (un fichier par sprint, index dans `sprints/README.md`)
> - Backlog opérationnel : un fichier par US/Enabler/Feature/Epic avec frontmatter (`Stage`, `Priority`, `Phase`, `Module`)
> - Protocole de lecture/mise à jour détaillé : skill `pivot-backlog-workflow` (`.project/skills/skill-backlog-workflow.yaml`)

### Hiérarchie
`EPIC → FEATURE (valeur) / ENABLER (technique) → US` · clé `E01 → F01.1 / EN01.1 → US01.1.1`.

### Champs du Project

| Champ | Valeurs |
|-------|---------|
| Item Type | Epic / Feature / Enabler / US |
| Parent | clé du parent (ex. `E01`, `F01.1`) |
| Stage | Backlog / Ready / In progress / Review / Done |
| Priority | Critical / High / Medium / Low |
| Module | core / auth / admin / oidc / pilotage / agilite / collaboratif (extensible par domaine) |
| Phase | Socle / v1-enterprise / phase-3 |
| Sprint | Sprint 1…N |
| Size | XS / S / M / L / XL |

Template US, Definition of Ready, vagues → `docs/backlog/README.md`.

> Le Project GitHub de l'organisation n'a pas encore ces champs custom configurés (encore le
> template par défaut) — le backlog opérationnel réel vit dans les fichiers markdown ci-dessus.

---

## Breaking Points

### Step 0 — Challenge PO avant implémentation

Avant tout code (dans `pivot-core`/`pivot-ui`), le **PO Agent** challenge les ACs de l'US :

1. Vérifier DoR (§8.2 `docs/backlog/README.md`) — story complète, ACs Given/When/Then, AC erreur + sécurité
2. Calculer Gate 1 : **≥ 70** → `Stage: Ready` → procéder · **< 70** → PO Agent réécrit ACs → recalculer
3. AC ambigus à l'implémentation → PO Agent clarifie, jamais d'interprétation unilatérale

Pas de blocage humain — Claude autonome de A à Z sur la validation des ACs.

### Breaking Point 2 : Gate 4 MERGE < 60 ou hard block

PR (pivot-docs ou tout autre repo) avec label `security`/`breaking-change`, secret Gitleaks, ou
changement de structure backlog non coordonné → label `needs-human-review` + score breakdown +
attendre le mainteneur.

---

## Workflow — Organisation par sprint

Travail organisé par sprint. Référence : **`docs/backlog/sprints/`** (un fichier par sprint).
Protocole complet de démarrage de session → skill `pivot-backlog-workflow`.

**Démarrage de session (full autonome) :** procédure multi-repo complète (synchronisation des
repos, lancement des agents en parallèle) → `docs/setup/pivot-platform-claude-template.md`.
Côté lecture du backlog spécifiquement :
1. Lire `docs/backlog/sprints/README.md` — identifier le sprint courant (pas de ✅ complet), ouvrir son `sprint-{N}.md`
2. Pour chaque US du sprint : lire le fichier markdown dans `docs/backlog/`
3. Filtrer : `Stage: Ready` ou `Stage: In progress` · Phase Socle uniquement
4. Pour chaque US `Stage: Backlog` éligible — PO Agent vérifie DoR + Gate 1 → `Stage: Ready` si ≥ 70

**Principes :**
- **Une branche par US / Enabler** — `feat/{us-id}-{slug}` ou `feat/{en-id}-{slug}`
- **Agents en parallèle** — un agent par item, branches séparées, pas de conflit inter-US
- **Mise à jour Stage + `sprints/sprint-{N}.md` committée sur la branche de l'US concernée** (pas de branche docs séparée)

## Workflow — Autoloop PR (docs)

Après modification (backlog, ADR, audit, workflow) sur une branche dédiée :

1. Ouvrir une PR (draft) vers `main`
2. **Autoloop** (20 itérations max) :
   - **En parallèle :**
     - **Review neutre** — Expert PR Review : cohérence backlog, traçabilité AC, qualité markdown (voir skill `pivot-pr-reviewer`)
     - **CI** — `npm run lint` (markdownlint + cspell + naming) = 0 erreur
   - **Corrections** — tous les findings résolus, commit `fix(docs): ...` ou `fix(backlog): ...`
   - **Convergence** — Gate 4 = 100/100 (ou convergence confirmée sans finding restant) ET CI verte → sortir
3. Gate 4 = 100/100 (ou convergence confirmée sans finding restant) → sortir la PR du mode draft (`gh pr ready`) · `Stage: Review` dans frontmatter US + `sprints/sprint-{N}.md` + signal mainteneur
4. Blocage 20 boucles → Breaking Point 2

---

## Workflow — Vérifications avant push autonome

**Condition absolue avant tout push autonome : 0 erreur, 0 warning.**

```bash
npm run lint    # markdownlint-cli2 + cspell + check-docs-naming
npm run build   # build Docusaurus (doit réussir, PNG PlantUML générés avant)
```

Rapporter ✅ ou stderr complet. Toute erreur non justifiée = **stop, corriger avant push**.

---

## Workflow — Branches

| Préfixe | Usage | Exemple |
|---------|-------|---------|
| `feat/{us-id}-{slug}` | Implémentation d'une US | `feat/us03-1-1-admin-active-module` |
| `feat/{en-id}-{slug}` | Implémentation d'un Enabler | `feat/en03-1-module-interface` |
| `fix/{id}-{slug}` | Correction bug hors sprint | `fix/67-lien-brise-adr` |
| `refactor/{id}-{slug}` | Refactoring hors sprint | `refactor/89-reorg-audits` |
| `chore/{slug}` | CI, deps, config | `chore/plumber-config` |
| `docs/{slug}` | Documentation hors sprint (ADR, audit ponctuel) | `docs/adr-oidc-decision` |

**Règles :**
- Jamais de travail direct sur `main`
- **Une branche = un item de sprint** (US ou Enabler) — sauf modification documentaire hors sprint (`docs/{slug}`)
- Rebase avant merge → squash WIP
- `git push --force-with-lease` uniquement sur branches de travail

**Création de branche — procédure obligatoire :**
```bash
git checkout main
git pull origin main
git checkout -b feat/{us-id}-{slug}
```
Branche existante → `git checkout feat/{us-id}-{slug}` directement.

---

## Workflow — Commits

Format **Conventional Commits** (`type(scope): message`).

| Commit | Contenu |
|--------|---------|
| `docs(backlog):` | nouvelle US/Enabler/Feature, mise à jour Stage, `sprints/sprint-{N}.md` |
| `fix(backlog):` | correction fichier backlog existant (lien brisé, frontmatter invalide) |
| `docs(adr):` | nouvel ADR ou mise à jour |
| `docs(audit):` | audit par domaine (mis à jour en place, jamais de fichier daté) |
| `docs(architecture):` | documentation architecture cible |
| `chore:` | CI, dépendances, config Docusaurus |
| `docs:` | README, CLAUDE.md, SETUP.md |
| `security:` | correctif sécurité — **hard block Gate 4, review humaine** |

Co-author sur chaque commit : `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>`

> Pas de `PATCH_NOTES.md` sur pivot-docs — repo sans impact utilisateur final direct.

---

## Gates ACDD — Confidence Gates

Score 0–100, jamais booléen. Scores/décisions consignés en **commentaire de PR**. Le statut vit
dans le champ **Stage** du frontmatter US.

| Gate | Moment | Seuils |
|------|--------|--------|
| **1 — READINESS** | Avant implémentation | PO Agent self-challenge · ≥ 70 → Stage: Ready → procéder · < 70 → PO Agent réécrit ACs |
| **2 — COVERAGE** | Par commit (pivot-core/pivot-ui) | ≥ 85 → continuer · 70–84 → compléter tests · < 70 → stop |
| **3 — QUALITY** | Après CI verte | Hard blocks : secret Gitleaks, label `security`/`breaking-change`, structure backlog non coordonnée |
| **4 — MERGE CONFIDENCE** | Avant merge | = 100/100 → sortie du mode draft (merge autonome) · 60–99 → merge documenté · < 60 → Breaking Point 2 |

Détail scoring Gate 3/4 pour pivot-docs → skill `pivot-pr-reviewer` (`.project/skills/skill-pr-reviewer.yaml`).

---

## Agents IA — Rôles et cycle ACDD

**ACDD (Acceptance Criteria Driven Development)** — gates de confiance continues. Vue d'ensemble
complète (diagrammes, cycle, traçabilité) → `docs/workflow/README.md`.

| Agent | Responsabilité |
|-------|---------------|
| **PO Agent** | Génère Epics et US, rédige AC, clarifie AC ambigus |
| **Architect Agent** | Valide AC techniques (backend + frontend), impact contrat de module |
| **Security Agent** | Challenge AC Red Team, valide fixes Blue Team |
| **Dev Agent** | Implémente sur la branche de l'US courante (pivot-core/pivot-ui), s'auto-évalue via gates |
| **QA Agent** | Rédige specs E2E, valide coverage, challenge A11y et gaps de tests |
| **PR Review Agent** | Exécute Gate 3 + Gate 4, merge ou escalade selon score |

### Format des AC

```markdown
- [ ] Given [contexte], when [action], then [résultat observable]
- [ ] Error case: given [input invalide], system retourne [erreur / status code]
- [ ] Security: [propriété de sécurité qui doit tenir]
```

Chaque AC mappe à au moins un test (pivot-core/pivot-ui). AC sans test = non implémenté.
AC ambigu à l'implémentation → **stopper, PO Agent clarifie, jamais d'interprétation unilatérale**.

### Labels PR

| Label | Signification |
|-------|--------------|
| `feat` | Nouvelle fonctionnalité |
| `fix` | Correction de bug |
| `security` | Impact sécurité — hard block Gate 4, review humaine |
| `breaking-change` | Changement de contrat — hard block Gate 4, review humaine |
| `needs-human-review` | Gate 4 < 60 ou hard block — décision humaine requise |
| `auto-approved` | Gate 4 = 100/100 — mergé automatiquement |
| `chore` | Maintenance, CI, dépendances |
| `docs` | Documentation uniquement |

### Post-merge

```bash
# 1. Mainteneur : passe Stage → Done dans le frontmatter US (recette humaine — jamais Claude)
# 2. Débloquer les US dépendantes
# 3. Nettoyer la branche
git push origin --delete feat/{us-id}-{slug}
```

---

## Standards de code

### Markdown / Docusaurus

- Nomenclature fichiers : kebab-case, préfixe `us-`/`en-`/`readme` selon `scripts/check-docs-naming.mjs`
- `markdownlint-cli2` clean (0 erreur) — config `.markdownlint-cli2.jsonc`
- `cspell` clean (0 erreur inconnue) — dictionnaire fr-fr, ajouter les termes techniques légitimes à `cspell.json` plutôt que d'ignorer une règle
- Pas de liens brisés entre fichiers backlog/ADR/audits
- Diagrammes PlantUML : PNG généré en CI avant le build prod, jamais committé manuellement en divergence du `.puml` source

### Général

- Pas de secrets dans le code — variables d'environnement
- **`// NOSONAR` / exclusions lint silencieuses : zéro, jamais.** Faux positif → correction du contenu ou exclusion centralisée dans la config de l'outil, jamais inline sans justification.

---

## Règles absolues

| Interdit | Raison |
|----------|--------|
| `--no-verify` | Contourne les hooks qualité |
| `git push origin main` (push direct) | Jamais — tout contenu passe par PR + review |
| `git push --force` sur `main` | Jamais — le mainteneur uniquement si nécessaire |
| `git add .` en bloc | Risque d'inclure fichiers non voulus |
| Merger avec label `security` sans revue humaine | Hard block Gate 4 |
| Fichiers datés dans `docs/audits/` | Un fichier par catégorie, mis à jour en place |
| Modifier la hiérarchie backlog (`docs/backlog/README.md`) sans coordination PO + Scrum Master | Casse la cohérence multi-repo |
| Committer des secrets, tokens, certificats | Exposition définitive |

---

## Boucles de problèmes — règle d'escalade

### Limite 10 commandes en échec successif

Si **10 commandes consécutives échouent** (lint, build, push...) sur une tâche :
1. **Stopper la tâche courante**
2. **Poster un commentaire de gate** avec `decision: ESCALATED`, liste des échecs, contexte
3. **Label `needs-human-review`** + signal mainteneur
4. **Proposer une alternative**

Le compteur se remet à zéro dès qu'une commande réussit.

### Limite 20 push — autoloop PR Review

Voir section **Workflow — Autoloop PR (docs)** — au-delà de 20 push correctifs → Breaking Point 2 automatique.

### Règle 2 tentatives (stratégie identique)

Après **2 tentatives** (même stratégie ou variantes proches) :
1. **Stopper**
2. **Poster un commentaire de gate sur la PR** avec `decision: ESCALATED`, contexte complet — **jamais committer un fichier de gate**
3. **Signaler** au mainteneur — label `needs-human-review`
4. **Proposer** une alternative

Ne jamais enchaîner plus de 2 tentatives sans informer le mainteneur.

---

## Skills — Knowledge Cards

Index : `.project/skills/_index.yaml`

| Skill | Fichier | Charger quand |
|-------|---------|---------------|
| `pivot-backlog-workflow` | `skill-backlog-workflow.yaml` | **Toujours** — démarrage de session, lecture `sprints/`, sélection US, mise à jour Stage |
| `pivot-ac-traceability` | `skill-ac-traceability.yaml` | **Toujours** — toute implémentation d'US, Gate 2, Gate 4 |
| `pivot-pr-reviewer` | `skill-pr-reviewer.yaml` | Gate 3 (qualité CI), Gate 4 (décision merge), review PR |

**Règle :** `pivot-backlog-workflow` est chargée à chaque démarrage de session ; les deux autres avant toute review de PR.

---

## Parallélisation

Lancer un maximum d'actions en parallèle dans chaque message.

| Actions parallélisables | Exemples |
|------------------------|---------|
| Lectures indépendantes | Plusieurs `Read` / `Grep` / `Glob` |
| Linters | markdownlint + cspell + naming lancés simultanément |
| Recherches codebase | Plusieurs `Grep` sur cibles différentes |

Ne séquencer que ce qui dépend du résultat d'une étape précédente.
