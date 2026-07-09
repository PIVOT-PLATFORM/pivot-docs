# E48 — Assistant IA (transverse)

## Objectif

Assistant conversationnel contextuel, disponible depuis le shell dans tous les modules PIVOT : widget flottant, réponses ancrées sur une base de connaissances produit, prompts suggérés selon la route/module courant. Fournisseur LLM interchangeable, gouverné (rate-limit, audit des échanges).

> **Distinct de [E34 — IA & agents (pilotage)](pathname:///pivot-docs/backlog/EPIC-pilotage-ia/)** : E48 est l'assistant d'aide transverse du shell, disponible dans tout PIVOT ; E34 est un module métier du domaine Pilotage (synthèse de statuts projet, agent exécutant), sans rapport avec l'aide contextuelle.
>
> **Distinct de [E29 — Workflows & Automatisation](pathname:///pivot-docs/backlog/EPIC-workflows/)** : E29 US29.9.4 « Chatbots connectés » et F29.5 « IA & agents » couvrent des agents/bots **déclenchés par un workflow métier** (ex. bot qui répond dans une messagerie suite à un événement) — E48 est un widget d'**aide à l'usage du produit**, initié par l'utilisateur, sans lien avec l'exécution d'un workflow. Un futur usage combiné (l'assistant E48 déclenchant un workflow E29) resterait une intégration explicite via le bus PIVOT, pas un chevauchement de périmètre.

## Hors périmètre

- **Agents/chatbots déclenchés par un workflow métier** (messagerie, automatisation) — portés par [E29](pathname:///pivot-docs/backlog/EPIC-workflows/) F29.5/US29.9.4.
- **Synthèse et agents IA de pilotage de projet** — portés par [E34](pathname:///pivot-docs/backlog/EPIC-pilotage-ia/).
- **Génération de contenu métier** (formulaire, fiche innovation) — chaque module porte sa propre feature IA (ex. E42 F42.6, E38 F38.11) ; E48 ne fait qu'orienter l'utilisateur vers ces fonctionnalités via ses prompts suggérés, il ne les exécute pas lui-même.

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

## Repères marché (benchmark POC)

Benchmark détaillé : `pivot-benchmarks/modules-poc-marche/` — cahier Intercom Fin, dossier de synthèse
(juillet 2026). Fin n'est pas un concurrent fonctionnel direct (support client externe vs aide contextuelle
interne) mais une référence méthodologique de gouvernance d'agent IA. Raffinements à qualifier au Gate 1
pour US48.1.1/EN48.1 :

- Mesure d'un taux de réponses jugées utiles (feedback pouce haut/bas en fin d'échange) — Fin publie ce type
  de métrique de façon inhabituellement transparente pour le marché
- Base de connaissances administrable sans redéploiement (contenu géré séparément du code)

Repère réaliste à ne pas sur-promettre au Gate 1 : même l'état de l'art (Fin) ne dépasse pas ~2/3 de
résolution autonome en conditions réelles documentées.

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
Stage: ⬜ · Priority: Medium
