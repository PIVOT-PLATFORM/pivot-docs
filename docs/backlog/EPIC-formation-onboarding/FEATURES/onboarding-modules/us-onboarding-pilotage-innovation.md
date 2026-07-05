# US41.5.27 — Onboarding in-app — Innovation / SMI (pilotage) (E38)

> ⚠️ **Renommage à réconcilier.** La branche `split/pilotage` a recentré E38 en **Système de Management de l'Innovation (SMI)** aligné ISO 56002 (commit `4735426`), avec redistribution des items secteur public vers E23/E25/E26/E35/E37. Le titre et le contenu ci-dessous sont mis à jour en conséquence ; à vérifier au moment du merge que le numéro E38 et le nom SMI sont toujours ceux retenus.

**En tant que** nouvel utilisateur du module
**Je veux** un **parcours d'onboarding in-app propre au module Innovation / SMI (pilotage)** (tour guidé, points clés, checklist, empty states), branché sur le framework EN41.1
**Afin de** comprendre et adopter le Système de Management de l'Innovation directement dans l'outil

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un premier accès au module **SMI** ([E38](pathname:///pivot-docs/backlog/EPIC-pilotage-innovation/)), when je l'ouvre, then un tour guidé présente ses fonctions clés — idéation, entonnoir stage-gate, portefeuille d'innovation par horizons H1/H2/H3 (via EN41.1) | ⬜ |
| Given le parcours, when je le complète/passe, then l'état est mémorisé et la complétion est mesurée (F41.6) | ⬜ |
| Given mon rôle (taxonomie) et le profil d'organisation (E40), when le contenu s'affiche, then il est adapté ; i18n FR/EN | ⬜ |
| Error : given le module SMI désactivé sur le tenant après la mise en place du parcours, when un utilisateur y accède malgré tout, then le parcours ne se déclenche pas (pas de tour orphelin sur un module inaccessible) | ⬜ |
| Security : le parcours n'est proposé qu'aux utilisateurs ayant effectivement accès au module (RBAC), jamais un aperçu de contenu d'un module non activé sur le tenant | ⬜ |
| A11y : navigation clavier + lecteur d'écran (WCAG 2.1 AA) | ⬜ |

## Hors périmètre

- Documentation exhaustive du module — ce parcours reste un tour guidé d'introduction, pas un substitut au centre d'aide (F41.2) ou aux supports de formation (F41.3)
- Formation à la norme ISO 56002 elle-même — le tour explique l'outil, pas le référentiel

## Notes d'implémentation

- **Action requise avant Gate 1** : confirmer avec le mainteneur que le renommage Innovation→SMI (split/pilotage) est acté avant d'implémenter ce tour, pour ne pas documenter un nom qui change entre-temps

---
Item Type: US · Parent: F41.5 · Module: core · Phase: phase-3 · Size: S · Priority: Medium
Stage: Backlog
Profils: Tous
Justification: Formation & onboarding — adoption de Pivot (in-app, supports, présentiel) ; cf. Insight I8 (réseau de référents)
Dépendances: EN41.1 · E38 (SMI — nom à reconfirmer au merge de split/pilotage)
