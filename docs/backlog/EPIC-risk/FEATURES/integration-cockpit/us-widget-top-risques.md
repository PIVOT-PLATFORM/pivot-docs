# US21.9.3 — Widget « Top risques » composable dans un cockpit

> Stub (Lot 2 · MoSCoW Should) — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** chef de projet (et autres rôles)
**Je veux** un widget « Top 3 risques » exposé par le module Risque, intégrable dans mon cockpit
**Afin de** voir mes risques majeurs sans quitter ma vue projet / portefeuille

## Contexte

Brique de composition des **cockpits** (ADR-008). Le module Risque expose un widget autonome (top risques par criticité pour un `project_ref` ou un portefeuille) que le shell (E16) compose dans le cockpit du rôle concerné. Le widget est alimenté par le bus / l'API Risque, jamais par accès direct au schéma.

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| Le module Risque expose un widget « Top 3 risques » paramétrable par `project_ref` (cockpit projet) ou par portefeuille (cockpit PMO) | ⬜ |
| Chaque item du widget est un deep-link vers le risque dans le module Risque | ⬜ |
| Le widget se met à jour sur `risk.raised` / `risk.threshold.exceeded` (bus PIVOT) | ⬜ |
| Error : source de risques indisponible → widget en état dégradé (message), pas d'erreur bloquante du cockpit | ⬜ |
| A11y : criticité non portée par la seule couleur (badge + libellé), WCAG 2.1 AA | ⬜ |

---
Item Type: US · Parent: F21.9 · Module: risk · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
Rôle: chef-de-projet
Dépendances: US21.9.1, US21.2.4
