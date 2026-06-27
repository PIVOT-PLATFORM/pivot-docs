# Workflow agentique PIVOT — ACDD

## Vue d'ensemble

PIVOT utilise un workflow **ACDD (Acceptance Criteria Driven Development)** piloté par agents IA.
Chaque User Story passe par une chaîne d'agents spécialisés avant, pendant et après l'implémentation.

Proche de [BMAD](https://github.com/bmad-method/bmad-method) dans l'esprit (décomposition en agents rôlés),
PIVOT va plus loin sur deux points :

| Dimension | BMAD | PIVOT ACDD |
|-----------|------|------------|
| Review PR | Humaine | **Agent PR Review** autonome (Gate 3 + 4) |
| Critères d'acceptation | Optionnels | **Obligatoires** — tout AC mappe à ≥ 1 test |
| Seuils de confiance | Booléens | **Scores 0–100** continus (gates ACDD) |
| Sécurité | Post-implémentation | **Agent Security** avant et après |
| Trace backlog | Recommandée | **Obligatoire** — pas d'implémentation sans Issue |

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

```
PO Agent
  └─ Génère US + AC (Given/When/Then + Security + A11y)
       │
       ▼
  Gate 1 — READINESS
  ├─ ≥ 70 → Breaking Point 1 (validation mainteneur)
  └─ < 70 → clarification PO Agent

       │ [human-validated]
       ▼
  Architect Agent + Security Agent + QA Agent
  └─ Revue AC : faisabilité, surface d'attaque, couverture

       │
       ▼
  Dev Agent — branche feat/us-{id}-{slug}
  ├─ Code + tests (un commit = Gate 2)
  ├─ Gate 2 — COVERAGE (par commit)
  │    ├─ ≥ 85 → continuer
  │    ├─ 70–84 → compléter les tests manquants
  │    └─ < 70 → stop
  └─ Qualité : ESLint / Checkstyle / SpotBugs → 0 warning

       │
       ▼
  PR Review Agent
  ├─ Gate 3 — QUALITY (CI verte, Gitleaks, Semgrep)
  │    └─ Hard blocks : secret, label security, breaking-change contrat module
  └─ Gate 4 — MERGE CONFIDENCE
       ├─ ≥ 85 → merge autonome
       ├─ 60–84 → merge documenté (commentaire breakdown)
       └─ < 60 → Breaking Point 2 (escalade mainteneur)

       │ [merge]
       ▼
  Mainteneur → Stage: Done (jamais Claude)
```

---

## Gates ACDD

Scores continus 0–100 — postés en **commentaire de PR** (aucun fichier committé).

| Gate | Moment | Seuils |
|------|--------|--------|
| **1 — READINESS** | Avant implémentation | ≥ 70 → Breaking Point 1 · < 70 → clarification PO |
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

## Breaking Points — validation humaine obligatoire

### Breaking Point 1 — avant implémentation

Le mainteneur valide **deux choses** avant toute ligne de code :

1. L'US elle-même (`human-validated` dans le Project GitHub org)
2. Les critères d'acceptation (liste Given/When/Then)

> Règle absolue : `Human Gate = needs-human-valid` → aucune implémentation.

### Breaking Point 2 — Gate 4 < 60 ou hard block

Label `needs-human-review` + score breakdown + attente mainteneur.
Déclenché aussi par : secret Gitleaks, label `security`, modif contrat module/OIDC.

---

## Human Gate (Project GitHub org)

| Valeur | Signification |
|--------|---------------|
| `needs-human-valid` | En attente de validation mainteneur — **aucune implémentation** |
| `human-validated` | Validation accordée — Dev Agent peut démarrer |
| `human-reject` | Rejeté — PO Agent recadre AC / périmètre, repasse à `needs-human-valid` |

> Claude **consomme** le Human Gate, ne le pose jamais.
> `Review → Done` : mainteneur uniquement.

---

## Traçabilité AC → test

Chaque AC mappe à au moins un test nommé avec son identifiant :

| AC | Implémentation | Test |
|----|----------------|------|
| `AC-42-01` | `ModuleService.activate()` | `ac42_01_activatesModuleForValidTenant()` |
| `AC-42-SEC-01` | `@PreAuthorize` | `ac42_sec01_returns403WhenModuleDisabled()` |

AC sans test = non implémenté, peu importe le code présent.

---

## Évolution — Orchestrator Loop _(non implémenté)_

Le workflow actuel est **séquentiel** : un Dev Agent par US, orchestration manuelle entre chaque étape.

Une évolution naturelle serait un **Orchestrator Agent** en boucle autonome :

```
Orchestrator Agent (loop)
  ├─ Lit le Project org (US human-validated + Phase MVP)
  ├─ Lance en parallèle :
  │    ├─ Dev Agent  → US-42  (branche feat/us-42-...)
  │    ├─ Dev Agent  → US-43  (branche feat/us-43-...)
  │    └─ QA Agent   → review Gate 2 sur PR ouverte US-41
  └─ PR Review Agent → déclenché sur chaque PR prête (Gate 3 + 4)
```

Différences clés vs BMAD :

| | BMAD | PIVOT avec Orchestrator |
|-|------|------------------------|
| Parallélisme | Non — séquentiel | US indépendantes en parallèle |
| Déclenchement | Humain entre chaque rôle | Loop sur état backlog |
| Review PR | Humaine | PR Review Agent autonome (Gate 4 ≥ 85) |

Points d'architecture à résoudre avant d'aller là :
- **Isolation** : exclusion mutuelle si deux US modifient les mêmes fichiers
- **Orchestrateur** : Claude Code `/loop`, GitHub Actions scheduled, ou runner dédié
- **Rollback** : stratégie si Gate 4 < 60 sur plusieurs US en vol simultanément

> Ce mode reste un chantier futur. Le workflow actuel (séquentiel, un agent à la fois) est la référence opérationnelle.

---

## Diagramme

→ [`acdd-workflow.puml`](acdd-workflow.puml) (PlantUML)
