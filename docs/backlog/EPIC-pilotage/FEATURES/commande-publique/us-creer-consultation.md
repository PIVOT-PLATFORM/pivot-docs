# US18.4.1 — Créer et gérer une consultation (appel d'offres)

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** responsable achats / pilotage
**Je veux** créer une consultation ou appel d'offres
**Afin de** suivre le processus de commande publique de bout en bout

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| POST `/api/pilotage/procurement/consultations` crée une consultation (référence, objet, type, datePublication, dateLimiteCandidature) | ⬜ |
| Types : APPEL_OFFRES · MARCHE_NEGOCIES · ACCORD_CADRE · CONSULTATION_SIMPLE | ⬜ |
| Statuts : DRAFT · PUBLIEE · EN_COURS_ANALYSE · ATTRIBUEE · INFRUCTUEUSE · ANNULEE | ⬜ |
| Consultation liée au tenant (isolation) · tenantId extrait du TenantContext | ⬜ |
| CRUD complet consultation | ⬜ |
| Test TI : consultation autre tenant → 404 | ⬜ |

---
Item Type: US · Parent: F18.4 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
