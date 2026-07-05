# US42.5.4 — Émission d'événement de soumission

**En tant que** Dev
**Je veux** Publier form.submitted (capacité 'événements' du contrat d'intégration) ; l'orchestration aval est portée par le bus.
**Afin de** répondre au besoin « Émission d'événement de soumission » de la suite Forms

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Une soumission publie form.submitted sur le bus. | ⬜ |
| Given le module Forms, when la fonctionnalité est activée, then elle est utilisable sans code, intégrée au portail (thème `--pv-*`) et i18n FR/EN | ⬜ |

---
Item Type: US · Parent: F42.5 · Module: forms · Phase: phase-3 · Size: S · Priority: High
Stage: Backlog
Source: FRM-404 · MoSCoW: Must · Origine: Contrat d'intégration PIVOT
Justification: Benchmark formulaires (Typeform/Jotform/Tally/Formbricks/Qualtrics/Google) — recentré PIVOT
Dépendances: EN42.1 (moteur & schéma de formulaire)
