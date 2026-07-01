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
