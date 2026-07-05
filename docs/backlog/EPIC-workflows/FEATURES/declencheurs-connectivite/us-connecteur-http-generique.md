# US29.2.3 — Connecteur HTTP générique

**En tant que** maker
**Je veux** appeler toute API REST (méthodes, en-têtes, authentifications standard) et émettre des webhooks sortants
**Afin de** compenser l'absence d'un connecteur dédié pour n'importe quel service

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une étape HTTP, when je configure méthode, URL, en-têtes et auth, then l'appel est exécuté et la réponse exploitable | ⬜ |
| Given une réponse JSON, when elle revient, then ses champs sont mappables dans les étapes suivantes | ⬜ |
| Error : given une réponse 4xx/5xx, system expose le statut et le corps pour gestion d'erreur | ⬜ |

---
Item Type: US · Parent: F29.2 · Module: automatisation · Phase: phase-3 · Size: M · Priority: Critical
Stage: Backlog
Source: WF-011 · MoSCoW: Must · Lot: Lot 1 · Origine: Quasi-socle (n8n, AP, Zapier, PA, IFTTT)
Justification: Cahiers : compense tout connecteur manquant
Dépendances: —
