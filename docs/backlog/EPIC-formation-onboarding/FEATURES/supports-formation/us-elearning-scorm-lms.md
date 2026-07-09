# US41.3.2 — Parcours e-learning & export SCORM/LMS

**En tant que** formateur / responsable formation
**Je veux** composer des **parcours e-learning** (modules, quiz) et les **exporter au format SCORM/xAPI** vers un LMS d'entreprise
**Afin de** intégrer la formation Pivot au dispositif de formation existant

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un parcours e-learning, when je le crée, then il enchaîne contenus + quiz avec suivi de complétion | ⬜ |
| Given un parcours, when je l'exporte en SCORM/xAPI, then il est importable dans un LMS tiers (Moodle, 360Learning…) | ⬜ |
| Error : given un LMS tiers qui rejette le paquet exporté (non-conformité SCORM), when l'import échoue côté LMS, then Pivot fournit un rapport de conformité SCORM pour diagnostiquer l'écart, plutôt qu'un export « boîte noire » | ⬜ |
| Security : les données de suivi de complétion exportées vers le LMS tiers se limitent au strict nécessaire SCORM (statut, score) — pas de données personnelles additionnelles non requises par le standard | ⬜ |

## Hors périmètre

- Hébergement d'un LMS complet par Pivot — cette US couvre la création et l'export du parcours, pas un LMS de substitution
- Suivi de complétion en retour depuis le LMS tiers vers Pivot (xAPI bidirectionnel) — hors périmètre, l'export est unidirectionnel dans cette itération

## Notes d'implémentation

- Le quiz du parcours e-learning peut réutiliser le moteur de scoring de Pivot Forms (E42, US42.2.2) plutôt qu'un moteur de quiz dédié et redondant

---
Item Type: US · Parent: F41.3 · Module: core · Phase: phase-3 · Size: L · Priority: Low
Stage: ⬜
Profils: Tous
Justification: Formation & onboarding — adoption de Pivot (in-app, supports, présentiel) ; cf. Insight I8 (réseau de référents)
Dépendances: EN41.1 (framework onboarding)
