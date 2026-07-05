# US41.6.2 — Funnel d'activation & relances

**En tant que** responsable formation
**Je veux** visualiser le **funnel d'activation** (inscription → première action → adoption) et déclencher des **relances** ciblées
**Afin de** identifier et lever les points de décrochage

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le funnel, when je l'analyse, then les étapes de décrochage sont identifiées par cohorte | ⬜ |
| Given un décrochage, when une relance est configurée, then un rappel/onboarding ciblé est proposé (opt-out respecté) | ⬜ |
| Error : given un utilisateur ayant activé l'opt-out des relances, when un décrochage le concerne, then aucune relance ne lui est envoyée, sans exception ni contournement par un autre canal | ⬜ |
| Security/RGPD : le funnel par cohorte reste agrégé (même seuil minimal que US41.6.1) ; une relance individuelle est déclenchée par le système, pas par une liste nominative exportable et réutilisable hors de ce cadre | ⬜ |

## Hors périmètre

- Relances par canal externe (SMS, appel) — cette US couvre les relances in-app/e-mail, cohérentes avec le canal de notification existant de la plateforme

## Notes d'implémentation

- Le respect de l'opt-out doit être vérifié au moment de l'envoi (pas seulement à la configuration de la campagne de relance), pour rester valide si l'utilisateur se désinscrit après la mise en place de la relance

---
Item Type: US · Parent: F41.6 · Module: core · Phase: phase-3 · Size: M · Priority: Low
Stage: Backlog
Profils: Tous
Justification: Formation & onboarding — adoption de Pivot (in-app, supports, présentiel) ; cf. Insight I8 (réseau de référents)
Dépendances: EN41.1 (framework onboarding)
