# US41.5.14 — Onboarding in-app — Commande publique (E25)

**En tant que** nouvel utilisateur du module
**Je veux** un **parcours d'onboarding in-app propre au module Commande publique** (tour guidé, points clés, checklist, empty states), branché sur le framework EN41.1
**Afin de** comprendre et adopter Commande publique directement dans l'outil

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un premier accès au module **Commande publique** ([E25](pathname:///pivot-docs/backlog/EPIC-commande-publique/)), when je l'ouvre, then un tour guidé présente ses fonctions clés — créer une consultation, suivi des candidats, grille pondérée et attribution (via EN41.1) | ⬜ |
| Given le parcours, when je le complète/passe, then l'état est mémorisé et la complétion est mesurée (F41.6) | ⬜ |
| Given mon rôle (taxonomie) et le profil d'organisation (E40), when le contenu s'affiche, then il est adapté ; i18n FR/EN | ⬜ |
| Error : given le module Commande publique désactivé sur le tenant après la mise en place du parcours, when un utilisateur y accède malgré tout, then le parcours ne se déclenche pas (pas de tour orphelin sur un module inaccessible) | ⬜ |
| Security : le parcours n'est proposé qu'aux utilisateurs ayant effectivement accès au module Commande publique (RBAC), jamais un aperçu de contenu d'un module non activé sur le tenant | ⬜ |
| A11y : navigation clavier + lecteur d'écran (WCAG 2.1 AA) | ⬜ |

## Hors périmètre

- Documentation exhaustive du module Commande publique — ce parcours reste un tour guidé d'introduction, pas un substitut au centre d'aide (F41.2) ou aux supports de formation (F41.3)
- Formation à la réglementation des marchés publics elle-même (Code de la commande publique) — le tour explique l'outil, pas le droit applicable

## Notes d'implémentation

- Module pertinent surtout pour le profil d'organisation publique (E40) — le tour peut s'appuyer sur ce ciblage pour ne pas être proposé hors de propos à un tenant privé

---
Item Type: US · Parent: F41.5 · Module: core · Phase: phase-3 · Size: S · Priority: Medium
Stage: Backlog
Profils: Tous
Justification: Formation & onboarding — adoption de Pivot (in-app, supports, présentiel) ; cf. Insight I8 (réseau de référents)
Dépendances: EN41.1 · E25
