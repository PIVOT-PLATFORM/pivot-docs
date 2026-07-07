# E48 — Assistant IA (transverse)

## Objectif

Assistant conversationnel contextuel, disponible depuis le shell dans tous les modules PIVOT : widget flottant, réponses ancrées sur une base de connaissances produit, prompts suggérés selon la route/module courant. Fournisseur LLM interchangeable, gouverné (rate-limit, audit des échanges).

> **Distinct de [E34 — IA & agents (pilotage)](pathname:///pivot-docs/backlog/EPIC-pilotage-ia/)** : E48 est l'assistant d'aide transverse du shell, disponible dans tout PIVOT ; E34 est un module métier du domaine Pilotage (synthèse de statuts projet, agent exécutant), sans rapport avec l'aide contextuelle.

## Repo cible (architecture multi-repo)

- Backend : **`pivot-core`** (module `core` — proxy LLM, rate-limit, audit)
- Frontend : **`pivot-ui`** (module `core` — widget flottant dans le shell)

## Phase

⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration "Socle terminé" par le mainteneur

## Périmètre (phase-3)

### Features

- **F48.1 — Chat contextuel**
  - US48.1.1 : Consulter l'assistant contextuel depuis n'importe quel module

### Enablers

- **EN48.1** — Fournisseur LLM interchangeable, rate-limit et audit des échanges

## Modules impactés

`core` (pivot-core + pivot-ui)

## Dépendances

- Dépend de : E03 Système de modules (activation par feature flag)
- Dépend de : E16 Shell applicatif & UX (widget flottant du shell)

## Statut global

⬜ Backlog — Gate 1 PO Agent à effectuer au démarrage du sprint

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **Enablers** | |
| EN48.1 — Fournisseur LLM, rate-limit et audit | ⬜ |
| **F48.1 — Chat contextuel** | |
| [US48.1.1 — Consulter l'assistant contextuel depuis n'importe quel module](FEATURES/chat-contextuel/us-assistant-contextuel.md) | ⬜ |

---
Item Type: Epic · Clé: E48 · Phase: phase-3 · Module: core
Stage: Backlog · Priority: Medium
