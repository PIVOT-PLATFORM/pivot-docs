# US41.5.20 — Onboarding in-app — Demande & arbitrage (E31)

> ⚠️ **Item bloqué — à réconcilier avant Gate 1.** La branche `split/pilotage` a dissous l'EPIC E31 « Demande & arbitrage » (commit `14bc38e`) : ses items ont migré vers E23 Portefeuille (US23.2.7/23.2.8) ou ont été marqués hors v2 adaptative. `EPIC-demande-arbitrage` n'existe déjà plus sur `split/pilotage`. Cette US catalogue devient orpheline dès que `split/pilotage` fusionne — elle ne doit **pas** être implémentée telle quelle.

**En tant que** nouvel utilisateur du module
**Je veux** un **parcours d'onboarding in-app propre au module Demande & arbitrage** (tour guidé, points clés, checklist, empty states), branché sur le framework EN41.1
**Afin de** comprendre et adopter Demande & arbitrage directement dans l'outil

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un premier accès au module **Demande & arbitrage** ([E31](pathname:///pivot-docs/backlog/EPIC-demande-arbitrage/)), when je l'ouvre, then un tour guidé présente ses fonctions clés (via EN41.1) | ⬜ |
| Given le parcours, when je le complète/passe, then l'état est mémorisé et la complétion est mesurée (F41.6) | ⬜ |
| Given mon rôle (taxonomie) et le profil d'organisation (E40), when le contenu s'affiche, then il est adapté ; i18n FR/EN | ⬜ |
| Error : given le module Demande & arbitrage désactivé ou dissous, when un utilisateur y accède malgré tout, then le parcours ne se déclenche pas (pas de tour orphelin sur un module inaccessible) | ⬜ |
| Security : le parcours n'est proposé qu'aux utilisateurs ayant effectivement accès au module concerné (RBAC), jamais un aperçu de contenu d'un module non activé sur le tenant | ⬜ |

## Hors périmètre

- Toute implémentation avant réconciliation avec `split/pilotage` — cf. avertissement en tête de fichier

## Notes d'implémentation

- **Action requise avant Gate 1** : soit supprimer cette US et vérifier que le catalogue F41.5 couvre bien what-if/business cases via l'onboarding Portefeuille (US41.5.12, E23), soit la renommer si le mainteneur souhaite conserver un renvoi dédié — décision produit, pas une clarification PO Agent

---
Item Type: US · Parent: F41.5 · Module: core · Phase: phase-3 · Size: S · Priority: Medium
Stage: Backlog
Profils: Tous
Justification: Formation & onboarding — adoption de Pivot (in-app, supports, présentiel) ; cf. Insight I8 (réseau de référents)
Dépendances: EN41.1 · E31 (⚠️ dissous sur split/pilotage — voir avertissement)
