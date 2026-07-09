# US44.1.1 — Préparer un document et positionner les champs de signature

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** organisateur d'une signature
**Je veux** déposer un document PDF et positionner des champs (signature, initiales, date, case à cocher, texte libre) sur ses pages
**Afin de** préparer le document avant de l'envoyer en signature

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| Upload d'un PDF (drag & drop ou import depuis PDF Manager, E45) | ⬜ |
| Éditeur visuel : positionnement de champs par page (signature, initiales, date, case à cocher, texte libre) | ⬜ |
| Chaque champ est obligatoire ou optionnel | ⬜ |
| Document en statut `DRAFT` tant qu'il n'est pas envoyé | ⬜ |
| Sécurité : tenantId extrait du TenantContext, document accessible au seul organisateur en `DRAFT` | ⬜ |

---
Item Type: US · Parent: F44.1 · Module: signdoc · Repo: pivot-signdoc-core/ui · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
