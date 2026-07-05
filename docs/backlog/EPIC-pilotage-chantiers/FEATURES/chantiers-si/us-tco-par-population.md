# US39.1.8 — TCO par population

**En tant que** acheteur
**Je veux** chiffrer le coût complet sur la durée du marché par population d'utilisateurs (consultation/terrain/pilotage/PMO), accompagnement inclus
**Afin de** décider sur un TCO réaliste et non sur le seul coût de licence

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given les populations d'utilisateurs, when le TCO est calculé, then le coût complet par population (consultation/terrain/pilotage/PMO) sur la durée du marché est établi | ⬜ |
| L'accompagnement est inclus dans le chiffrage du TCO | ⬜ |
| Error : given une population sans effectif ou tarif renseigné, le calcul le signale comme incomplet | ⬜ |
| Security/Gouvernance : les hypothèses et le calcul de TCO sont documentés (traçabilité de la décision) | ⬜ |

## Hors périmètre
- L'US ne couvre pas la négociation tarifaire avec les prestataires ni le choix final du produit — seulement le calcul du TCO qui alimente la décision et la grille de dépouillement.
- Le chiffrage détaillé du plan de conduite du changement (contenu de la formation, animation PMO) n'est pas fait ici — cette US n'en reprend que le coût pour l'inclure dans le TCO global (le détail du plan relève de US39.1.6).
- Le suivi budgétaire réel en cours de marché (consommation vs. TCO prévisionnel) n'est pas couvert — cette US porte sur le chiffrage initial, pas sur le pilotage budgétaire en exécution.

## Notes d'implémentation
- Cette US est un artefact de gouvernance financière (chiffrage), pas une fonctionnalité applicative : le livrable attendu est un tableau de TCO par population d'utilisateurs (consultation/terrain/pilotage/PMO) sur la durée du marché, accompagnement inclus.
- Le signalement d'une population sans effectif ou tarif renseigné doit être une validation bloquante du calcul (pas un simple avertissement silencieux), pour éviter un TCO sous-estimé faute de donnée.
- Les hypothèses de calcul (durée du marché, effectifs par population, coûts d'accompagnement issus de US39.1.6) doivent être documentées et versionnées pour permettre la traçabilité de la décision d'achat.

---
Item Type: US · Parent: F39.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Source: PP-068 · MoSCoW: Must · Lot: Lot 1 · Origine: Insight I8
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Dossier §8-I8
Dépendances: —
