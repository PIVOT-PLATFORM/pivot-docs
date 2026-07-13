# US18.13.1 — Utiliser les filtres pour créer un portefeuille

**En tant que** gestionnaire de portefeuille
**Je veux** utiliser 13 filtres multi-sélection pour construire un portefeuille
**Afin de** cibler précisément les activités à regrouper avant de les enregistrer

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given la vue de création, when des filtres sont appliqués, then un indicateur « Filtre actif (NB) » affiche le nombre de filtres actifs | ⬜ |
| Given les filtres disponibles, when je les consulte, then les 13 filtres sont proposés, tous en multi-sélection : Nom de l'activité, Pilote (avec mail/NNI), Statut, Typologie, Type d'activité, Domaine métier, Sous-domaine métier, Sous-domaine métier N2, Département/mission, Produit(s) associé(s), Pôle/usine, Plan de production, Plan moyen terme (PMT), Météo | ⬜ |
| Given une sélection de filtres, when je l'applique, then la liste des activités correspondantes s'affiche pour validation avant enregistrement | ⬜ |
| Error : given une sélection ne retournant aucune activité, system affiche une liste vide sans erreur | ⬜ |
| Security/Gouvernance : seul un gestionnaire de portefeuille peut utiliser les filtres de portefeuille | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La réinitialisation des filtres (US dédiée) et l'enregistrement (US dédiée).

## Notes d'implémentation
- Module pilotage (OPDN), panneau de 13 filtres multi-sélection, logique ET entre filtres.
- Indicateur « Filtre actif (NB) » ; aperçu des activités avant enregistrement.

---
Item Type: US · Parent: F18.13 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Rôle: gestionnaire-de-portefeuille
Source: SPEC_OPDN — B.9 Portefeuilles — filtres & création
Dépendances: —
