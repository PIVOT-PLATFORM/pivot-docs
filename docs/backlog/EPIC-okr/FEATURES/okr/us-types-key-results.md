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
| Error : given une baseline égale à la cible (division par zéro) ou une somme de poids ≠ 100 %, when je sauvegarde le KR/l'objectif, then la sauvegarde est refusée avec un message explicite | ⬜ |
| Security : seul le owner de l'objectif (ou un contributeur habilité) peut créer/modifier un KR et sa pondération | ⬜ |
| A11y : le formulaire de création de KR (type, baseline, cible, unité, poids) est utilisable au clavier, avec libellés associés à chaque champ et messages d'erreur annoncés aux lecteurs d'écran | ⬜ |

## Hors périmètre
- Le calcul du score 0.0–1.0 et son code couleur (sweet spot) — couvert par US27.5.1, cette US ne couvre que l'avancement 0–100 %
- La saisie périodique de la valeur actuelle (check-in) — couverte par US27.1.2 (suivi des KR)
- Le raffinement engageant/aspirationnel du KR — porté au niveau de l'objectif par US27.1.4

## Notes d'implémentation
- Champs du KR conformes au modèle EN27.1 : type (métrique/jalon/booléen/%), baseline, actuel, cible, unité, poids
- La formule d'avancement métrique doit gérer le cas cible < baseline (progression décroissante, ex. réduire un délai) sans casser le bornage 0–100 %
- La validation "somme des poids = 100 %" s'applique au niveau de l'objectif, au moment où le dernier KR est ajouté/modifié — l'UI doit permettre un ajustement facile (ex. répartition égale par défaut)

---
Item Type: US · Parent: F27.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Profils: Tous
Justification: Raffinage OKR état de l'art (Doerr/Google ; Quantive/Workboard/Viva Goals/Perdoo)
Dépendances: US27.1.1
