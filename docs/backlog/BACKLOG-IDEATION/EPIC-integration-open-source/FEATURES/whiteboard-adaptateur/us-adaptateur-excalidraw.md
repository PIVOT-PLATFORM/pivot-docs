# US28.9.1 — Adaptateur Excalidraw (embed)

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant qu'** utilisateur PIVOT
**Je veux** pouvoir activer **Excalidraw** en embed comme tableau blanc
**Afin de** choisir, à l'instanciation, entre le whiteboard natif **PIVOT** (noyau F08.x/EN08.x, ex-E08, fusionné dans [E30](../../../../EPIC-collaboration/README.md)) et Excalidraw selon la maturité et les besoins de mon organisation — les deux peuvent coexister (ADR-009)

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| Adaptateur `adapter-excalidraw` (embed) conforme au contrat PivotAdapter (EN28.3) | ⬜ |
| Un tableau Excalidraw est exposé comme entité `Document` au catalogue | ⬜ |
| Une instance peut activer le Whiteboard natif (E08), Excalidraw, ou les deux simultanément — aucune exclusion mutuelle | ⬜ |

---
Item Type: US · Parent: F28.9 · Module: whiteboard-adaptateur · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Dépendances: EN28.3
