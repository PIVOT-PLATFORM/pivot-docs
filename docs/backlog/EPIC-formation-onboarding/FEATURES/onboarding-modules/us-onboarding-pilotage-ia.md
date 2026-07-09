# US41.5.23 — Onboarding in-app — IA & agents (pilotage) (E34)

**En tant que** nouvel utilisateur du module
**Je veux** un **parcours d'onboarding in-app propre au module IA & agents (pilotage)** (tour guidé, points clés, checklist, empty states), branché sur le framework EN41.1
**Afin de** comprendre et adopter IA & agents (pilotage) directement dans l'outil

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un premier accès au module **IA & agents (pilotage)** ([E34](pathname:///pivot-docs/backlog/EPIC-pilotage-ia/)), when je l'ouvre, then un tour guidé présente ses fonctions clés — synthèse gouvernée, agent exécutant supervisé, réunions transformées en tâches (via EN41.1) | ⬜ |
| Given le parcours, when je le complète/passe, then l'état est mémorisé et la complétion est mesurée (F41.6) | ⬜ |
| Given mon rôle (taxonomie) et le profil d'organisation (E40), when le contenu s'affiche, then il est adapté ; i18n FR/EN | ⬜ |
| Error : given le module IA & agents désactivé sur le tenant après la mise en place du parcours, when un utilisateur y accède malgré tout, then le parcours ne se déclenche pas (pas de tour orphelin sur un module inaccessible) | ⬜ |
| Security : le parcours n'est proposé qu'aux utilisateurs ayant effectivement accès au module (RBAC), jamais un aperçu de contenu d'un module non activé sur le tenant | ⬜ |
| A11y : navigation clavier + lecteur d'écran (WCAG 2.1 AA) | ⬜ |

## Hors périmètre

- Documentation exhaustive du module — ce parcours reste un tour guidé d'introduction, pas un substitut au centre d'aide (F41.2) ou aux supports de formation (F41.3)

## Notes d'implémentation

- Le tour doit expliciter le principe de supervision humaine (agent exécutant, actions déléguées supervisées) dès la première utilisation, cohérent avec la gouvernance IA transverse PIVOT

---
Item Type: US · Parent: F41.5 · Module: core · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Profils: Tous
Justification: Formation & onboarding — adoption de Pivot (in-app, supports, présentiel) ; cf. Insight I8 (réseau de référents)
Dépendances: EN41.1 · E34
