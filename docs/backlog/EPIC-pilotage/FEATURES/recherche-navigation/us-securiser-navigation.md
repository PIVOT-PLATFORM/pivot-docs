# US18.6.3 — Sécuriser la navigation

**En tant que** utilisateur final
**Je veux** que les annulations et validations partielles ne provoquent pas d'erreurs de navigation
**Afin de** naviguer de façon fiable dans l'application

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une saisie en cours, when j'annule une opération, then la navigation reste stable et sans erreur | ⬜ |
| Given une validation partielle, when je poursuis la navigation, then aucune erreur de navigation n'est déclenchée | ⬜ |
| Error : given une annulation ou une validation partielle, system préserve un état de navigation cohérent au lieu de lever une erreur | ⬜ |
| Security/Gouvernance : la sécurisation de la navigation n'affaiblit pas les contrôles d'habilitation existants | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Les fonctionnalités de recherche et de filtrage sont couvertes par des US dédiées.

## Notes d'implémentation
- Robustesse de la navigation (module pilotage) face aux annulations et validations partielles.

---
Item Type: US · Parent: F18.6 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Backlog OPPA (reconstitution v1–v2.1) — US-603
Dépendances: —
