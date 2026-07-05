# US27.5.2 — Clôture de cycle & grading

**En tant que** PMO
**Je veux** clôturer le cycle avec un **grading final** de chaque OKR et un récapitulatif de cycle
**Afin de** acter les résultats et alimenter la rétrospective

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une clôture de cycle, when elle est déclenchée, then le score final de chaque O/KR est figé et le cycle passe en lecture seule | ⬜ |
| Given le récapitulatif, when il est généré, then il synthétise scores, statuts, OKR reconduits/abandonnés | ⬜ |
| Error : given un cycle déjà clôturé, when une tentative de modification d'un KR/check-in est faite, then elle est refusée (cycle en lecture seule) | ⬜ |
| Security : seul un rôle habilité (PMO, admin gouvernance) peut déclencher la clôture d'un cycle ; l'opération est journalisée (qui, quand) | ⬜ |
| A11y : le récapitulatif de clôture (scores, statuts, OKR reconduits/abandonnés) est restituable en tableau structuré et navigable au clavier, pas seulement via une représentation graphique | ⬜ |

## Hors périmètre
- Le calcul du score lui-même (formule, agrégation pondérée) — couvert par US27.5.1
- La capture des learnings et décisions de reconduction/abandon en tant que telle — couverte par US27.5.2/US27.5.3 (la rétrospective consomme ce récapitulatif)
- La réouverture d'un cycle clôturé (correction a posteriori) — non prévue, un cycle clôturé reste figé

## Notes d'implémentation
- La clôture fige le score et le statut de chaque Objective/KeyResult au sens du moteur EN27.1 ; le cycle passe en lecture seule (plus de check-in ni de modification de KR possible)
- Dépend de US27.2.1 (existence du cycle) et US27.5.1 (formule de scoring) déjà listées en frontmatter
- Le récapitulatif de clôture sert d'entrée à la rétrospective (US27.5.3) : il doit exposer les OKR par statut final pour faciliter la décision reconduire/abandonner/reformuler

---
Item Type: US · Parent: F27.5 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
Profils: Tous
Justification: Raffinage OKR état de l'art (Doerr/Google ; Quantive/Workboard/Viva Goals/Perdoo)
Dépendances: US27.2.1 · US27.5.1
