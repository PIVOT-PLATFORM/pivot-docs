# US21.9.1 — Corréler un risque à son projet via le bus PIVOT

> Stub (Lot 2 · MoSCoW Must) — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** module Gestion des risques
**Je veux** rattacher chaque risque à un projet par un `project_ref` propagé via le bus PIVOT
**Afin de** relier risques et pilotage sans FK inter-modules (cf. ADR-006 / ADR-008)

## Contexte

Le chaînon d'intégration entre le domaine Pilotage (E18) et le module Risque (E21). Conformément à l'ADR-006 (« jamais de FK inter-modules »), la corrélation risque ↔ projet passe par un identifiant logique `project_ref` alimenté par les événements du bus, et non par une FK `risk → pilotage.projects`.

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| Un risque porte un `project_ref` (identifiant logique du projet), sans FK vers le schéma `pilotage` | ⬜ |
| Le module s'abonne à `project.created` / `project.archived` pour tenir à jour le référentiel local des projets | ⬜ |
| Error : événement portant un `project_ref` inconnu → risque conservé + marqué « projet non résolu », pas de rejet dur | ⬜ |
| Security : un risque n'est visible que pour les utilisateurs habilités sur le tenant du projet | ⬜ |

---
Item Type: US · Parent: F21.9 · Module: risk · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Dépendances: US21.1.6, US21.4.1
