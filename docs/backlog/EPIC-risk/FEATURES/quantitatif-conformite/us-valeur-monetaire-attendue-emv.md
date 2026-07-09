# US21.6.1 — Valeur monétaire attendue (EMV)

**En tant que** PMO, Sponsor
**Je veux** « Valeur monétaire attendue (EMV) »
**Afin de** chiffrer les risques et garantir la conformité réglementaire

## Contexte

EMV = Probabilité(%) × Impact coût(€) par risque quantifiable.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un risque marqué quantifiable avec une probabilité (%) et un impact coût (€) renseignés, when le PMO ou le Sponsor consulte la fiche risque, then l'EMV (probabilité × impact coût) s'affiche en euros, recalculée automatiquement à chaque modification de l'un des deux facteurs | ⬜ |
| Error : given un risque marqué quantifiable dont la probabilité ou l'impact coût est absent, non numérique ou hors bornes (probabilité hors 0-100 %, coût négatif), system refuse le calcul et affiche un état « EMV non calculable » avec le champ manquant identifié, sans lever d'exception ni afficher de valeur erronée | ⬜ |
| Security : seul un utilisateur habilité sur le projet (chef de projet, PMO, sponsor) peut consulter l'EMV d'un risque ; la saisie/modification de l'impact coût (donnée financière sensible) est réservée aux rôles autorisés à éditer le risque, conformément aux permissions du profil de projet | ⬜ |

## Hors périmètre
- Le calcul de la provision pour risques agrégée au niveau projet (somme des EMV) est traité par US21.6.2.
- La simulation probabiliste multi-scénarios (Monte Carlo) est traitée par US21.6.3 ; l'EMV ici est un calcul déterministe simple par risque.
- La gravité multidimensionnelle (US21.2.2) reste hors périmètre de calcul : cette US consomme uniquement un impact coût en euros, pas les autres dimensions d'impact.

## Notes d'implémentation
- Dépend de US21.2.2 (gravité multidimensionnelle) pour la disponibilité d'un impact coût structuré sur le risque ; l'EMV ne doit pas dupliquer ce champ mais le référencer.
- Un champ « quantifiable » (booléen, ou dérivé de la présence d'un impact coût) détermine si l'EMV est calculée ; les risques non quantifiables n'affichent pas d'EMV.
- Le calcul (probabilité × impact coût) doit être dérivé à l'affichage ou recalculé à la sauvegarde — ne pas le stocker comme valeur figée modifiable indépendamment des deux facteurs, pour garantir la traçabilité du chiffrage.

---
Item Type: US · Parent: F21.6 · Module: risk · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Dépendances: US21.2.2
