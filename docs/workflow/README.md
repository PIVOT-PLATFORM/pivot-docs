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
| **Doc Agent** | Génère la SPEC technique figée post-merge | Gate 5 |

---

## Cycle complet

```text
PO Agent (autonome)
  └─ Lit SPRINTS.md → US Stage: Backlog + Phase MVP
       │
       ▼
  Gate 1 — READINESS (PO Agent self-challenge)
  ├─ ≥ 70 → ACs validés → Stage: Ready → procéder
  └─ < 70 → PO Agent réécrit ACs → recalculer

       │
       ▼
  Architect Agent + Security Agent + QA Agent
  └─ Revue AC : faisabilité, surface d'attaque, couverture

       │
       ▼
  Dev Agent — branche feat/us-{id}-{slug} → Stage: In progress
  ├─ Code + tests (un commit = Gate 2)
  ├─ Gate 2 — COVERAGE (par commit)
  │    ├─ ≥ 85 → continuer
  │    ├─ 70–84 → compléter les tests manquants
  │    └─ < 70 → stop + escalade
  └─ Qualité : ESLint / Checkstyle / SpotBugs → 0 warning

       │
       ▼
  PR Review Agent — autoloop × 10
  ├─ Gate 3 — QUALITY (CI verte, Gitleaks, Semgrep)
  │    └─ Hard blocks : secret, label security, breaking-change contrat module
  └─ Gate 4 — MERGE CONFIDENCE
       ├─ ≥ 85 → merge autonome → Stage: Review + signal mainteneur
       ├─ 60–84 → merge documenté (commentaire breakdown)
       └─ < 60 → Breaking Point 2 (escalade mainteneur)

       │ [merge mainteneur]
       ▼
  Stage: Done (mainteneur uniquement — jamais Claude)
       │
       ▼
  Doc Agent — Gate 5 SPEC FREEZE (autonome, non-bloquant)
  └─ Génère docs/specs/{epic}/{us-id}-{slug}.md (figé)
       └─ Contrat technique final + écarts vs ACs + liens US/PR/commit
```

---

## Gates ACDD

Scores continus 0–100 — postés en **commentaire de PR** (aucun fichier committé).

| Gate | Moment | Seuils |
|------|--------|--------|
| **1 — READINESS** | Avant implémentation | ≥ 70 → PO Agent valide → procéder · < 70 → PO Agent réécrit ACs |
| **2 — COVERAGE** | Par commit | ≥ 85 → continuer · 70–84 → compléter · < 70 → stop |
| **3 — QUALITY** | Après CI | Hard blocks : Gitleaks · `security` · `breaking-change` · contrat module |
| **4 — MERGE CONFIDENCE** | Avant merge | ≥ 85 → merge autonome · 60–84 → merge documenté · < 60 → escalade |
| **5 — SPEC FREEZE** | Après merge (Stage: Done) | Doc Agent génère la spec figée · non-bloquant, ne repasse jamais l'US en Done |

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
2. Gate 1 ≥ 70 → `Stage: Ready` → procéder immédiatement
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

## Gate 5 — SPEC technique figée

**Problème résolu :** une fois `Stage: Done`, le fichier US backlog continue de vivre (relecture,
reformulation, découpage en US enfants) et perd sa valeur de référence technique. Sans figeage,
aucune source de vérité stable ne décrit le contrat « tel que livré » — ce qui pénalise les US
futures qui en dépendent (ex. un contrat WebSocket de session dont dépend le canvas whiteboard).

**Déclencheur :** juste après que le mainteneur a posé `Stage: Done` (post-merge, asynchrone,
**non-bloquant** — un échec du Doc Agent n'affecte jamais le statut Done déjà posé par le
mainteneur).

**Agent :** Doc Agent — lit l'US mergée (ACs cochés, Stage: Done) + le diff de la PR, puis génère
un document figé :

```text
docs/specs/{EPIC}/{us-id}-{slug}.md
```

**Contenu :**

| Section | Détail |
|---------|--------|
| Contexte | Lien US source, PR, commit SHA de merge |
| Contrat technique final | Endpoints, payloads, schémas DB/migrations, événements socket — **tels qu'implémentés**, pas tels qu'imaginés dans les ACs initiaux |
| Écarts vs ACs | Différences entre AC et implémentation réelle, avec justification |
| Scores | Gate 2 (coverage) et Gate 4 (merge confidence) finaux |
| Statut | `Figé le {date}` |

**Règle d'immutabilité :** une spec figée n'est **jamais réécrite**. Un changement de comportement
ultérieur crée une nouvelle US qui référence la spec existante et ajoute un
`## Addendum {date} — US-{id}` en fin de fichier — jamais une édition silencieuse de la section
figée initiale.

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
- **Backlog** : SPRINTS.md mis à jour sur chaque branche (pas de conflit si US différentes)
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
| Portail web de dépôt | `pivot-docs` — backlog markdown + SPRINTS.md |
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
- Autocorrection CI → agents : partiel (autoloop × 10 push)

![IT4IT Vision cible](it4it-vision.png)

> Source PlantUML : [`it4it-vision.puml`](it4it-vision.puml)
