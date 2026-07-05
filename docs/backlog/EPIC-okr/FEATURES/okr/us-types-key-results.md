# US27.1.3 — Types de Key Results (métrique, jalon, booléen)

**En tant que** responsable pilotage
**Je veux** définir des Key Results de type **métrique** (de X à Y), **jalon**/étape, **booléen** ou **% de complétion**, avec baseline, valeur actuelle, cible, unité et **pondération**
**Afin de** mesurer chaque résultat-clé de la façon adaptée à sa nature

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un KR métrique, when je le crée, then je saisis baseline, cible, unité ; l'avancement = (actuel − baseline) / (cible − baseline), borné 0–100 % | ⬜ |
| Given un KR jalon ou booléen, when il passe à « atteint », then son avancement = 100 % (0 sinon) | ⬜ |
| Given des KR pondérés, when l'objectif est calculé, then l'avancement de l'O est la **moyenne pondérée** des KR (somme des poids = 100 %) | ⬜ |

---
Item Type: US · Parent: F27.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Rôle: officier-responsable-pmo
Profils: Tous
Justification: Raffinage OKR état de l'art (Doerr/Google ; Quantive/Workboard/Viva Goals/Perdoo)
Dépendances: US27.1.1
