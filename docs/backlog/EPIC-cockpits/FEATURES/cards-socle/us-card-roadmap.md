# US51.1.4 — Card Roadmap

**En tant que** administrateur de la plateforme
**Je veux** une card « Roadmap » sur mon cockpit
**Afin de** voir la trajectoire (jalons, Now/Next/Later) sans ouvrir le module Pilotage

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le module Pilotage est activé et une roadmap existe, when la card se charge, then elle affiche un résumé Now/Next/Later et les prochains jalons stratégiques (source `RoadmapController`) | ⬜ |
| Given l'admin clique l'action contextuelle, when il l'active, then il est routé vers la roadmap complète (drill-down) | ⬜ |
| Given le module Pilotage **n'est pas activé** (ou WIP), when le cockpit se compose, then la card se rend en état `module-wip` (placeholder « bientôt », non-bloquant) | ⬜ |
| Empty : given le module est activé mais aucune roadmap créée, then l'état `empty` invite à en créer une | ⬜ |
| Error : given l'API roadmap échoue après réessais, then l'état `error` s'affiche avec réessai | ⬜ |
| Security : given une identité externe, when le cockpit se compose, then la card est `◑` limitée au scope d'engagement / `◐` agrégée selon la matrice (sensibilité 🟡) | ⬜ |
| A11y : jalons et échéances lisibles au clavier et annoncés (i18n FR/EN), contrastes AA | ⬜ |

## Hors périmètre

- L'édition de la roadmap (module Pilotage E22) — la card ne fait que **consulter** et router.

## Notes d'implémentation

- Source confirmée : `RoadmapController` + partage (`pivot-pilotage-core`, E22 mergé). Endpoints
  scopés `tenant/team/project`.
- **Card démonstratrice de l'état `module-wip`** : si Pilotage est désactivé, elle prouve qu'un
  cockpit reste composable et informatif sans le module.

---
Item Type: US · Parent: F51.1 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: administrateur-plateforme
Dépendances: EN51.1, EN51.2, EN51.4, EN51.5, E22
