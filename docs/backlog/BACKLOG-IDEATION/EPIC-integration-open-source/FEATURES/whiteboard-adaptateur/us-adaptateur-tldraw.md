# US28.9.2 — Adaptateur tldraw (embed, alternative Excalidraw)

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.
> ⚠️ Licence tldraw à vérifier au dépôt avant industrialisation (licence à watermark selon usage — cf. règle générale ADR-009 §3).

**En tant qu'** utilisateur PIVOT
**Je veux** pouvoir activer **tldraw** en embed comme tableau blanc
**Afin de** disposer d'une alternative à Excalidraw, à choisir librement à l'instanciation selon les besoins

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| Adaptateur `adapter-tldraw` (embed) conforme au contrat PivotAdapter (EN28.3) | ⬜ |
| Licence tldraw vérifiée et documentée avant activation (clause watermark selon usage) | ⬜ |
| Une instance peut activer le Whiteboard natif (E08), Excalidraw, tldraw — coexistence, aucune exclusion mutuelle | ⬜ |

---
Item Type: US · Parent: F28.9 · Module: whiteboard-adaptateur · Phase: phase-3 · Size: M · Priority: Low
Stage: ⬜
Dépendances: EN28.3
