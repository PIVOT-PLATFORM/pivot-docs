# US46.1.1 — Soumettre et voter pour un ticket de feedback

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant qu'** utilisateur de la plateforme
**Je veux** créer un ticket de feedback (bug ou idée) et voter pour les tickets existants
**Afin de** faire remonter mes besoins et prioriser collectivement les demandes

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| Création publique d'un ticket (titre, description, catégorie bug/idée) | ⬜ |
| Kanban 5 colonnes : Analyse → Backlog → Implémentation → Parking → Fait | ⬜ |
| Vote sur un ticket, rafraîchi via le mécanisme de notification in-app existant (un vote par utilisateur et par ticket) | ⬜ |
| Compteur de votes visible et tri du kanban par popularité — benchmark Slido (vote ascendant) | ⬜ |
| Protection anti-abus dès le socle sur la soumission publique (rate-limit ou équivalent) — benchmark Typeform : ne pas réserver cette protection à une option payante | ⬜ |
| Édition d'un ticket réservée à son auteur ou à un admin | ⬜ |
| Sécurité : tenantId extrait du TenantContext | ⬜ |

---
Item Type: US · Parent: F46.1 · Module: core · Phase: phase-3 · Size: M · Priority: Low
Stage: ⬜
Rôle: utilisateur-final
