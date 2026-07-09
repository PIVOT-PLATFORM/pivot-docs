# US21.6.2 — Provision pour risques

**En tant que** Sponsor, DAF
**Je veux** « Provision pour risques »
**Afin de** chiffrer les risques et garantir la conformité réglementaire

## Contexte

Somme des EMV → réserve de contingence recommandée (logique AP/CP dans le public).

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un portefeuille de risques quantifiables avec EMV calculée (US21.6.1) sur un projet, when le Sponsor ou le DAF consulte la provision pour risques du projet, then le montant recommandé (somme des EMV des risques actifs) s'affiche, avec le détail des risques ayant contribué au calcul | ⬜ |
| Error : given un projet sans aucun risque quantifiable (EMV calculée), system affiche une provision à 0 € avec un message explicite (« aucun risque quantifiable actif »), plutôt qu'une erreur de calcul ou une valeur vide | ⬜ |
| Security : la provision pour risques (donnée budgétaire sensible) n'est visible que par les rôles habilités à consulter le budget du projet (sponsor, DAF, chef de projet) ; un contributeur standard ne peut pas y accéder | ⬜ |

## Hors périmètre
- Le calcul de l'EMV par risque est traité par US21.6.1 ; cette US ne fait que sommer les EMV existantes, elle ne recalcule pas la probabilité ni l'impact coût.
- La simulation Monte Carlo (distribution de coûts par percentile, US21.6.3) reste hors périmètre ; la provision ici est une somme déterministe simple, pas une valeur probabiliste (ex. P80).
- L'intégration comptable réelle (engagement de la provision dans un outil budgétaire externe, logique AP/CP) n'est pas couverte : cette US se limite à l'affichage d'un montant recommandé.

## Notes d'implémentation
- Dépend de US21.6.1 : la provision est recalculée dès qu'une EMV de risque change (ajout, clôture, mise à jour de probabilité/impact) — pas de recalcul manuel requis.
- Seuls les risques encore actifs (non clôturés, non traités comme évités) doivent entrer dans la somme, pour éviter de gonfler artificiellement la provision avec des risques déjà résolus.
- Le montant doit rester une recommandation affichée, non un champ modifiable manuellement, afin de garantir la cohérence avec le détail des EMV sous-jacentes.

---
Item Type: US · Parent: F21.6 · Module: risk · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Dépendances: US21.6.1
