# US21.2.1 — Webhooks entrants

**En tant que** maker
**Je veux** déclencher un workflow en temps réel par webhook avec une URL unique par workflow
**Afin de** réagir instantanément aux événements externes

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un workflow avec déclencheur webhook, when un appel HTTP arrive sur son URL unique, then le workflow s'exécute avec la charge utile reçue | ⬜ |
| Given plusieurs workflows, when chacun a son webhook, then leurs URLs sont distinctes et non devinables | ⬜ |
| Security/Gouvernance : les webhooks entrants supportent une vérification de signature/secret pour rejeter les appels non authentifiés | ⬜ |

---
Item Type: US · Parent: F21.2 · Module: automatisation · Phase: phase-3 · Size: M · Priority: Critical
Stage: Backlog
Source: WF-004 · MoSCoW: Must · Lot: Lot 1 · Origine: Socle 6/6
Justification: Dossier §4
Dépendances: —
