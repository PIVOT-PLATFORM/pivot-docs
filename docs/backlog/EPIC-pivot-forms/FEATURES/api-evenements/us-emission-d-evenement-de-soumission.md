# US42.5.4 — Émission d'événement de soumission

**En tant que** développeur d'un module PIVOT consommateur (ex. Workflow, SMI)
**Je veux** que chaque soumission de formulaire publie un événement `form.submitted` sur le bus PIVOT
**Afin de** déclencher une orchestration aval (tâche, risque, contrat, dépôt d'idée) sans que Forms connaisse ses consommateurs

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une soumission de formulaire validée, when elle est enregistrée, then un événement `form.submitted` est publié sur le bus avec l'identifiant du formulaire, de la réponse et le `project_ref`/contexte le cas échéant | ⬜ |
| Given plusieurs consommateurs abonnés à `form.submitted`, when l'événement est publié, then chaque consommateur le reçoit indépendamment (pas de couplage entre Forms et un consommateur particulier) | ⬜ |
| Error : given une panne temporaire du bus au moment de la soumission, when la réponse est tout de même enregistrée en base, then l'événement est rejoué dès rétablissement (pas de perte silencieuse d'événement) | ⬜ |
| Security : l'événement ne transporte que l'identifiant de réponse et le contexte nécessaire au routage — pas le contenu complet de la réponse en clair sur le bus si le formulaire est classifié sensible (cf. US42.7.1) | ⬜ |

## Hors périmètre

- L'orchestration elle-même (créer une tâche, un risque, un contrat à partir de l'événement) — reste portée par le module Workflow (E29) ou le consommateur, jamais par Forms

## Notes d'implémentation

- Priorité relevée à **Critical** (initialement High) : `form.submitted` est le mécanisme qui fait de Forms une « brique transverse » au sens du README de l'EPIC — sans cet événement fiable, les intégrations SMI (F38.15) et Workflow n'ont pas de socle
- Cohérent avec ADR-006 (pas de FK inter-modules) et ADR-008 (bus + deep-links) — l'événement porte des identifiants logiques, jamais une jointure directe

---
Item Type: US · Parent: F42.5 · Module: forms · Phase: phase-3 · Size: S · Priority: Critical
Stage: ⬜
Source: FRM-404 · MoSCoW: Must · Origine: Contrat d'intégration PIVOT
Justification: Benchmark formulaires (Typeform/Jotform/Tally/Formbricks/Qualtrics/Google) — recentré PIVOT
Dépendances: EN42.1 (moteur & schéma de formulaire)
