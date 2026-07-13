---
slug: /
sidebar_position: 0
sidebar_label: "Vue d'ensemble"
---

# Workflow agentique PIVOT — ACDD

## Vue d'ensemble

PIVOT utilise un workflow **ACDD (Acceptance Criteria Driven Development)** piloté par agents IA.
Chaque User Story passe par une chaîne d'agents spécialisés avant, pendant et après l'implémentation.

Principes fondateurs :

| Principe | Règle |
|----------|-------|
| Review PR | **PR Review Agent** autonome (Gate 3 + 4) |
| Critères d'acceptation | **Obligatoires** — tout AC mappe à ≥ 1 test |
| Seuils de confiance | **Scores 0–100** continus (jamais booléens) |
| Sécurité | Security Agent bloquant **avant** implémentation et après |
| Trace backlog | **Obligatoire** — pas d'implémentation sans Issue tracée |

---

## Agents

| Agent | Rôle | Moment |
|-------|------|--------|
| **PO Agent** | Génère Epics / US / AC (Given/When/Then) | Avant tout |
| **Architect Agent** | Valide AC techniques, impact contrat module | Gate 1 |
| **Security Agent** | Challenge AC Red Team, valide fixes Blue Team | Gate 1 + Gate 3 |
| **QA Agent** | Rédige specs E2E, valide coverage, challenge A11y | Gate 1 + Gate 2 |
| **Dev Agent** | Implémente sur branche dédiée, auto-évalue via gates | Gate 2 |
| **PR Review Agent** | Exécute Gate 3 + Gate 4, merge ou escalade | Gate 3 + Gate 4 |
| **Doc Agent** | Génère la SPEC fonctionnelle et technique figée, dès Gate 4 = 100/100 (avant merge) | Gate 5 |

---

## Cycle complet

> Backlog/Ready/In progress/Review ci-dessous sont des **états de travail internes**, jamais
> persistés dans le frontmatter US — le champ `Stage` n'y porte que 2 valeurs : `⬜` (pas encore
> terminé, tout au long de ce cycle) et `✅` (Done, posé par le mainteneur). État réel entre
> sessions = branche/PR GitHub, pas le fichier (`docs/backlog/README.md` §2/§5).

```text
PO Agent (autonome)
  └─ Lit docs/backlog/sprints/ (sprint courant) → US Stage: ⬜ (état interne Backlog) + Phase Socle
       │
       ▼
  Gate 1 — READINESS (PO Agent self-challenge)
  ├─ ≥ 70 → ACs validés → état interne Ready → procéder
  └─ < 70 → PO Agent réécrit ACs → recalculer

       │
       ▼
  Architect Agent + Security Agent + QA Agent
  └─ Revue AC : faisabilité, surface d'attaque, couverture

       │
       ▼
  Dev Agent — branche feat/us-{id}-{slug} → état interne In progress
  ├─ Code + tests (un commit = Gate 2)
  ├─ Gate 2 — COVERAGE (par commit)
  │    ├─ ≥ 85 → continuer
  │    ├─ 70–84 → compléter les tests manquants
  │    └─ < 70 → stop + escalade
  └─ Qualité : ESLint / Checkstyle / SpotBugs → 0 warning

       │
       ▼
  PR Review Agent — autoloop × 20
  ├─ Gate 3 — QUALITY (CI verte, Gitleaks, Semgrep)
  │    └─ Hard blocks : secret, label security, breaking-change contrat module
  └─ Gate 4 — MERGE CONFIDENCE
       ├─ = 100/100 → sortie du mode draft + état interne Review + Gate 5 SPEC FREEZE + signal mainteneur
       ├─ 60–99 → merge documenté (commentaire breakdown)
       └─ < 60 → Breaking Point 2 (escalade mainteneur)

       │
       ▼
  Doc Agent — Gate 5 SPEC FREEZE (autonome, dans l'Autoloop, avant merge)
  └─ Génère docs/specs/{EPIC}/{us-id}-{slug}.md (figé) — branche/PR pivot-docs dédiée
       └─ Spec fonctionnelle + contrat technique final + écarts vs ACs + liens US/PR/commit

       │ [merge mainteneur]
       ▼
  Stage: ✅ (mainteneur uniquement — jamais Claude)
```

---

## Gates ACDD

Scores continus 0–100 — postés en **commentaire de PR** (aucun fichier committé).

| Gate | Moment | Seuils |
|------|--------|--------|
| **1 — READINESS** | Avant implémentation | ≥ 70 → PO Agent valide → procéder · < 70 → PO Agent réécrit ACs |
| **2 — COVERAGE** | Par commit | ≥ 85 → continuer · 70–84 → compléter · < 70 → stop |
| **3 — QUALITY** | Après CI | Hard blocks : Gitleaks · `security` · `breaking-change` · contrat module |
| **4 — MERGE CONFIDENCE** | Avant merge | = 100/100 → sortie du mode draft (merge autonome) · 60–99 → merge documenté · < 60 → Breaking Point 2 (escalade) |
| **5 — SPEC FREEZE** | Gate 4 = 100/100, dans l'Autoloop (avant merge) | Doc Agent génère la spec fonctionnelle et technique figée · indépendant de la recette humaine du mainteneur |
| **6 — RECETTE ACCEPTANCE** | Après déploiement recette (post-merge) | Playwright rejoue les AC contre `recette.pivot-platform.fr` réel · échec = alerte régression, pas blocage merge |

Format commentaire :
```yaml
gate: COVERAGE
us_id: 42
commit: a3f9c12
score: 88/100
decision: CONTINUE
breakdown:
  ac_covered: 7/8
  no_untested_code: 29/30
  test_quality: 18/20
pending_ac:
  - "AC-42-03: token expiré → 401"
```

---

## Breaking Points

### Step 0 — Challenge PO (autonome, avant implémentation)

PO Agent valide les ACs de l'US avant toute ligne de code :

1. Vérifier DoR (story complète, ACs Given/When/Then, erreur + sécurité)
2. Gate 1 ≥ 70 → état interne `Ready` → procéder immédiatement (`Stage` frontmatter reste `⬜`)
3. Gate 1 < 70 → PO Agent réécrit/complète ACs → recalculer → procéder dès ≥ 70

Pas de blocage humain — Claude est autonome de A à Z sur la validation des ACs.

### Breaking Point 2 — Gate 4 < 60 ou hard block

Label `needs-human-review` + score breakdown + attente mainteneur.
Déclenché aussi par : secret Gitleaks, label `security`, modif contrat module/OIDC.

---

## Traçabilité AC → test

Chaque AC mappe à au moins un test nommé avec son identifiant :

| AC | Implémentation | Test |
|----|----------------|------|
| `AC-42-01` | `ModuleService.activate()` | `ac42_01_activatesModuleForValidTenant()` |
| `AC-42-SEC-01` | `@PreAuthorize` | `ac42_sec01_returns403WhenModuleDisabled()` |

AC sans test = non implémenté, peu importe le code présent.

---

## Gate 5 — SPEC fonctionnelle et technique figée

**Problème résolu :** une fois `Stage: ✅`, le fichier US backlog continue de vivre (relecture,
reformulation, découpage en US enfants) et perd sa valeur de référence technique. Sans figeage,
aucune source de vérité stable ne décrit le contrat « tel que livré » — ce qui pénalise les US
futures qui en dépendent (ex. un contrat WebSocket de session dont dépend le canvas whiteboard).

**Déclencheur :** dans l'Autoloop du repo qui implémente l'US (`pivot-core`/`pivot-ui`), dès que
Gate 4 atteint 100/100 — **avant merge**, au même moment que la sortie du mode draft et le passage
à l'état interne Review (`Stage` frontmatter reste `⬜`). Ne dépend pas de la recette humaine du
mainteneur (`Stage: ✅`) : la PR peut encore être en attente de review humaine (ex. Breaking Point 2)
alors que la spec est déjà figée.

**Agent :** Doc Agent — lit la PR à Gate 4 = 100/100 (ACs cochés, diff de la PR), puis génère un
document figé **dans une branche/PR dédiée sur `pivot-docs`** (jamais de commit cross-repo) :

```text
docs/specs/{EPIC}/{us-id}-{slug}.md
```

**Contenu :**

| Section | Détail |
|---------|--------|
| Contexte | Lien US source, PR, dernier commit au moment du figeage (Gate 4 = 100/100) |
| Spec fonctionnelle | Comportement et flux **tels qu'implémentés**, en langage clair — au-delà des ACs bruts : parcours utilisateur, cas d'erreur, effets de bord observables |
| Contrat technique final | Endpoints, payloads, schémas DB/migrations, événements socket — **tels qu'implémentés**, pas tels qu'imaginés dans les ACs initiaux |
| Écarts vs ACs | Différences entre AC et implémentation réelle, avec justification |
| Scores | Gate 2 (coverage) et Gate 4 (merge confidence) finaux |
| Statut | `Figé le {date}` |

**Règle d'immutabilité :** une spec figée n'est **jamais réécrite**. Un changement de comportement
ultérieur — y compris une modification demandée pendant une revue humaine post-figeage (ex. Breaking
Point 2) — crée une nouvelle US qui référence la spec existante et ajoute un
`## Addendum {date} — US-{id}` en fin de fichier — jamais une édition silencieuse de la section
figée initiale.

---

## Gate 6 — RECETTE ACCEPTANCE (post-déploiement)

Les Gates 1→5 sont **pré-merge** et s'appuient sur des tests **éphémères** : Gate 2 (coverage) et
`e2e.yml` montent une stack jetable dans le runner et **mockent** le backend (`page.route`). Rapide
et bloquant, mais ça ne prouve rien sur l'**infra réellement déployée** — le premier déploiement
réel de la recette a d'ailleurs révélé des bugs invisibles jusque-là (voir `EPIC-infrastructure`
EN07.6). **Gate 6** ferme cet écart : après chaque déploiement sur `recette.pivot-platform.fr`,
Playwright rejoue les critères d'acceptation contre le **site réel** — la recette qu'un PO ferait à
la main, automatisée.

| Aspect | Gate 2 / `e2e.yml` (éphémère) | Gate 6 / `e2e-recette.yml` (réel) |
|--------|-------------------------------|-----------------------------------|
| Backend | stack jetable dans le runner | pivot-core déployé en recette |
| Données | mockées (`page.route`) | réelles, tenant de test dédié |
| baseURL | `localhost:4200` | `https://recette.pivot-platform.fr` |
| Moment | chaque PR/push (bloquant merge) | après déploiement recette |
| Détecte | régressions de code | contrat backend réel, config d'env, intégration inter-modules, seed |

**Déclencheur :** `e2e-recette.yml` se lance sur `workflow_run` du **Deploy** concluant `success`
(donc après le smoke test `/health` de `deploy.yml`) + `workflow_dispatch`. **Jamais sur PR**
(recette est partagée : éviter les courses de données).

**Portée :** un workflow **par repo UI**, chacun validant ses propres AC au plus près de l'US
(vision PO) — `pivot-ui` (shell : accès, login, grille modules, protection de route) +
`pivot-agilite-ui` / `pivot-collaboratif-ui` / `pivot-pilotage-ui` (parcours de leur module).

**Données :** les specs recette **agissent** via un **compte + tenant de test dédiés** (secrets
`RECETTE_E2E_*`) ; les AC destructifs créent leurs données sur le tenant de test et les nettoient
en `afterEach`/`afterAll` — jamais sur un tenant réel.

**Traçabilité :** convention inchangée — chaque spec recette porte l'identifiant de l'AC
(`AC-{module}-{n}`). La différence : la preuve vaut sur l'**infra réelle**, pas en mock.

**En cas d'échec :** régression sur la recette déployée (le code a mergé, mais le comportement réel
diverge de l'AC). Ce n'est **pas un blocage de merge** (le merge a déjà eu lieu) mais une **alerte
post-déploiement** — rapport Playwright en artefact, notification via Environments/Deployments,
puis ouverture d'une US/`fix` traçant l'écart. `deploy.yml` couvre déjà le rollback sur smoke test
`/health` KO ; Gate 6 couvre les régressions **fonctionnelles** que ce smoke test ne voit pas.

**Suivi backlog :** `EPIC-infrastructure` EN07.15.

---

## Mode parallèle — agents simultanés

Le workflow est **parallélisé par US** : un Dev Agent par US du sprint, lancés simultanément sur des branches séparées.

```text
Session start
  ├─ PO Agent → Gate 1 sur toutes les US Backlog éligibles
  └─ parallel() :
       ├─ Dev Agent → US-42 (feat/us-42-...) → PR → autoloop
       ├─ Dev Agent → US-43 (feat/us-43-...) → PR → autoloop
       └─ Dev Agent → US-44 (feat/us-44-...) → PR → autoloop
```

Contraintes :
- **Isolation** : une branche par US — pas de conflit inter-US
- **Backlog** : `docs/backlog/sprints/sprint-{N}.md` mis à jour sur chaque branche — un fichier par sprint limite la contention aux US du même sprint
- **Rollback** : Gate 4 < 60 → Breaking Point 2 sur l'US concernée uniquement

---

## Diagrammes

### Workflow agentique ACDD

![ACDD Workflow](acdd-workflow.png)

> Source PlantUML : [`acdd-workflow.puml`](acdd-workflow.puml)

### Pipeline CI/CD

![CI/CD Pipeline](cicd-pipeline.png)

> Source PlantUML : [`cicd-pipeline.puml`](cicd-pipeline.puml)

---

## Vision cible — Plateforme Agentique IT4IT

PIVOT s'inspire du modèle **IT4IT** (Information Technology for Information Technology) :
le backlog et les maquettes déposés par le PO et l'UX déclenchent **automatiquement** la chaîne
agentique — sans go humain intermédiaire. L'ingénieur intervient uniquement pour la review MR et
le RUN PROD.

| Élément du modèle IT4IT | Correspondance PIVOT |
|-------------------------|----------------------|
| Portail web de dépôt | `pivot-docs` — backlog markdown + `docs/backlog/sprints/` |
| Plateforme Agentique dev | Claude Code — agents ACDD (PO · Dev · QA · Security · PR Review) |
| Agents spécialisés | Skills PIVOT (skill-spring-architecture, skill-angular-architecture, …) |
| Moteurs agents | Claude Code (Sonnet 4.6 / Opus 4.8) |
| Forge | GitHub PR + CI GitHub Actions (quality, tests, build) |
| Briques communes | pivot-core / pivot-ui / pivot-docs (réutilisés, pas re-créés) |
| Ingénieur plateforme (supervision) | Mainteneur — reçoit escalades `needs-human-review` |
| Ingénieur logiciel (review + prod) | Mainteneur — merge PR + deploy |

**Limites actuelles vs vision cible :**
- Portail = fichiers markdown (pas encore un vrai portail web de dépôt)
- FinOps / monitoring coût-token : non implémenté (roadmap)
- Autocorrection CI → agents : partiel (autoloop × 20 push)

![IT4IT Vision cible](it4it-vision.png)

> Source PlantUML : [`it4it-vision.puml`](it4it-vision.puml)
