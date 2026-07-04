# US21.9.2 — Ouvrir les risques depuis la fiche projet (onglet + deep-link)

> Stub (Lot 2 · MoSCoW Must) — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** chef de projet
**Je veux** un onglet « Risques » dans la fiche projet du domaine Pilotage qui ouvre le module Risque filtré sur mon projet
**Afin de** passer de mon cockpit projet à mes risques sans changer de contexte

## Contexte

Chaînon de navigation Pilotage → Risque. L'onglet « Risques » de la fiche projet (pivot-pilotage-ui) est un **deep-link** vers pivot-risk-ui pré-filtré sur le `project_ref` (ex. `/risk?project={project_ref}`). Aucune duplication de données côté pilotage : la vue vit dans le module Risque.

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| La fiche projet (pilotage) expose un onglet/lien « Risques » ouvrant le module Risque filtré sur le `project_ref` du projet | ⬜ |
| Le module Risque ouvert via ce lien affiche uniquement les risques du projet ciblé | ⬜ |
| Error : projet sans risque → état vide explicite + action « Ajouter un risque » | ⬜ |
| Security : le deep-link ne contourne pas les habilitations — accès refusé si l'utilisateur n'est pas habilité sur le projet | ⬜ |
| A11y : onglet et navigation clavier conformes WCAG 2.1 AA | ⬜ |

---
Item Type: US · Parent: F21.9 · Module: risk · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Dépendances: US21.9.1, US21.8.1
