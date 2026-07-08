# US45.3.1 — Fusionner, découper et transformer des documents PDF

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant qu'** utilisateur
**Je veux** fusionner plusieurs PDF, découper un document, réorganiser/pivoter ses pages, le compresser et y ajouter un filigrane
**Afin de** préparer mes documents sans outil externe

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| Fusion : sélection multi-PDF, ordre par glisser-déposer, nom du résultat | ⬜ |
| Découpe : par page, par plage, ou toutes les pages | ⬜ |
| Réorganisation de pages (glisser-déposer, suppression, duplication) et rotation | ⬜ |
| Compression (légère / standard / forte) avec aperçu du gain avant confirmation | ⬜ |
| Filigrane texte (position, opacité, taille) | ⬜ |
| Rédaction : masquage définitif et non réversible d'informations sensibles (zone sélectionnée) — benchmark Adobe Acrobat | ⬜ |
| Toute opération produit un **nouveau document** — le document source n'est jamais modifié | ⬜ |
| Sécurité : opérations réservées au propriétaire et aux éditeurs | ⬜ |

---
Item Type: US · Parent: F45.3 · Module: pdf · Repo: pivot-pdf-core/ui · Phase: phase-3 · Size: L · Priority: Medium
Stage: Backlog
Dépendances: US45.1.1 (bibliothèque)
