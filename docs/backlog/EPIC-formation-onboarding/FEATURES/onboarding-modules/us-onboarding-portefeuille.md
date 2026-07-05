# US41.5.12 — Onboarding in-app — Portefeuille projets (E23)

**En tant que** nouvel utilisateur du module
**Je veux** un **parcours d'onboarding in-app propre au module Portefeuille projets** (tour guidé, points clés, checklist, empty states), branché sur le framework EN41.1
**Afin de** comprendre et adopter Portefeuille projets directement dans l'outil

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un premier accès au module **Portefeuille projets** ([E23](pathname:///pivot-docs/backlog/EPIC-portefeuille/)), when je l'ouvre, then un tour guidé présente ses fonctions clés — tableau de bord consolidé multi-projets, indicateurs RAG, rapports d'avancement, scénarios what-if et business cases dynamiques (US23.2.7/23.2.8, ex-E31) (via EN41.1) | ⬜ |
| Given le parcours, when je le complète/passe, then l'état est mémorisé et la complétion est mesurée (F41.6) | ⬜ |
| Given mon rôle (taxonomie) et le profil d'organisation (E40), when le contenu s'affiche, then il est adapté ; i18n FR/EN | ⬜ |
| Error : given le module Portefeuille désactivé sur le tenant après la mise en place du parcours, when un utilisateur y accède malgré tout, then le parcours ne se déclenche pas (pas de tour orphelin sur un module inaccessible) | ⬜ |
| Security : le parcours n'est proposé qu'aux utilisateurs ayant effectivement accès au module Portefeuille (RBAC), jamais un aperçu de contenu d'un module non activé sur le tenant | ⬜ |
| A11y : navigation clavier + lecteur d'écran (WCAG 2.1 AA) | ⬜ |

## Hors périmètre

- Documentation exhaustive du module Portefeuille — ce parcours reste un tour guidé d'introduction, pas un substitut au centre d'aide (F41.2) ou aux supports de formation (F41.3)

## Notes d'implémentation

- Le tour cible d'abord le PMO ou le sponsor consultant la vue consolidée, distinct du chef de projet déjà couvert par l'onboarding Roadmap (US41.5.11)
- Couvre désormais les scénarios what-if et business cases dynamiques, hérités de l'ex-EPIC E31 « Demande & arbitrage » (dissous, migré vers E23 — cf. `split/pilotage`) : pas de US41.5 dédiée pour un EPIC qui n'existe plus

---
Item Type: US · Parent: F41.5 · Module: core · Phase: phase-3 · Size: S · Priority: Medium
Stage: Backlog
Profils: Tous
Justification: Formation & onboarding — adoption de Pivot (in-app, supports, présentiel) ; cf. Insight I8 (réseau de référents)
Dépendances: EN41.1 · E23
