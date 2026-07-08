# US48.1.1 — Consulter l'assistant contextuel depuis n'importe quel module

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant qu'** utilisateur authentifié
**Je veux** ouvrir un widget d'assistant flottant depuis n'importe quel module, avec des prompts suggérés selon ma page courante, et discuter en flux continu
**Afin d'** obtenir de l'aide contextuelle sans quitter mon travail

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| Widget flottant accessible depuis toutes les pages du shell | ⬜ |
| Réponses en flux continu (SSE) | ⬜ |
| Prompts suggérés adaptés à la route/module courant | ⬜ |
| Réponses ancrées sur une base de connaissances produit (pas d'hallucination sur des fonctionnalités inexistantes) | ⬜ |
| Base de connaissances administrable sans redéploiement (contenu géré séparément du code) — benchmark Intercom Fin | ⬜ |
| Mesure d'un taux de réponses jugées utiles (feedback pouce haut/bas en fin d'échange) — benchmark Intercom Fin | ⬜ |
| Sécurité : rate-limit par utilisateur, échanges audités | ⬜ |
| A11y : widget navigable au clavier, annoncé aux lecteurs d'écran (WCAG 2.1 AA) | ⬜ |

---
Item Type: US · Parent: F48.1 · Module: core · Phase: phase-3 · Size: L · Priority: Medium
Stage: Backlog
Dépendances: EN48.1 (fournisseur LLM, rate-limit, audit)
