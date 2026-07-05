# US41.1.3 — Checklist de démarrage & empty states pédagogiques

**En tant que** nouvel utilisateur
**Je veux** suivre une **checklist de démarrage** et voir des **empty states pédagogiques** guidant la première action
**Afin de** savoir par où commencer et franchir le cap de la page vide

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un compte/module neuf, when je l'ouvre, then une checklist des premières étapes s'affiche avec progression | ⬜ |
| Given un écran sans données, when il s'affiche, then un **empty state** explique quoi faire + action directe | ⬜ |
| Given la checklist terminée, when elle est complète, then elle se referme et la complétion est mesurée (F41.6) | ⬜ |
| Error : given une étape de la checklist devenue non réalisable (ex. droit retiré à l'utilisateur entre-temps), when la checklist s'affiche, then l'étape est marquée non disponible plutôt que de rester cochable sans effet | ⬜ |
| Security : la progression de la checklist n'expose jamais d'information sur d'autres utilisateurs du tenant (pas de classement ni de comparaison sans consentement) | ⬜ |

## Hors périmètre

- Gamification de la checklist (points, badges) — hors périmètre, cf. certification interne (US41.4.3) pour la reconnaissance formelle

## Notes d'implémentation

- La checklist doit rester réévaluable dynamiquement (droits, configuration du tenant) plutôt qu'une liste figée calculée une seule fois à l'ouverture

---
Item Type: US · Parent: F41.1 · Module: core · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Profils: Tous
Justification: Formation & onboarding — adoption de Pivot (in-app, supports, présentiel) ; cf. Insight I8 (réseau de référents)
Dépendances: EN41.1 (framework onboarding)
