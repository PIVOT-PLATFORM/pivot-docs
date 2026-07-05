# US41.5.29 — Onboarding in-app — Profil & adaptation (E40)

**En tant que** administrateur du tenant
**Je veux** un **parcours d'onboarding propre à la configuration du profil d'organisation** (E40 : taille, classe de souveraineté, niveau de rigueur), branché sur le framework EN41.1
**Afin de** configurer correctement le profil dès l'installation, puisqu'il conditionne l'adaptation du contenu de tous les autres parcours d'onboarding

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'installation initiale du tenant, when l'administrateur configure le profil d'organisation, then un tour guidé explique l'impact du profil (activation de modules, classe de souveraineté A/B/C, niveau de rigueur) avant validation (via EN41.1) | ⬜ |
| Given le parcours, when il est complété/passé, then l'état est mémorisé et la complétion est mesurée (F41.6) | ⬜ |
| Given un profil déjà configuré, when l'administrateur le modifie ultérieurement, then le tour rappelle les modules et parcours d'onboarding qui seront impactés par le changement | ⬜ |
| Error : given un profil d'organisation non configuré au terme de l'installation, when le tenant est utilisé, then un profil par défaut prudent (rigueur maximale) s'applique plutôt qu'un état indéfini | ⬜ |
| Security : seul un administrateur habilité peut configurer ou modifier le profil d'organisation (RBAC) — un changement de classe de souveraineté est tracé (qui, quand, ancienne/nouvelle valeur) | ⬜ |
| A11y : navigation clavier + lecteur d'écran (WCAG 2.1 AA) | ⬜ |

## Hors périmètre

- Documentation exhaustive du module Profil & adaptation — ce parcours reste un tour guidé d'introduction, pas un substitut au centre d'aide (F41.2) ou aux supports de formation (F41.3)

## Notes d'implémentation

- Cette US est distincte des 29 autres du catalogue F41.5 : elle ne peut pas elle-même s'appuyer sur « mon rôle et le profil d'organisation » pour adapter son contenu, puisqu'elle sert justement à définir ce profil — le tour doit rester générique côté profil (non conditionné par E40) tout en restant filtré par rôle (administrateur)

---
Item Type: US · Parent: F41.5 · Module: core · Phase: phase-3 · Size: S · Priority: Medium
Stage: Backlog
Profils: Tous
Justification: Formation & onboarding — adoption de Pivot (in-app, supports, présentiel) ; cf. Insight I8 (réseau de référents)
Dépendances: EN41.1 · E40
