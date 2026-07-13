# US18.12.4 — Sélection et affichage d'un portefeuille

**En tant que** gestionnaire de portefeuille
**Je veux** sélectionner un portefeuille et afficher ses activités dans un tableau structuré
**Afin de** consulter et gérer les activités regroupées dans ce portefeuille

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un portefeuille sélectionné, when il s'affiche, then le titre indique le nom du portefeuille suivi du nombre d'activités | ⬜ |
| Given le tableau des activités, when il s'affiche, then les colonnes apparaissent dans l'ordre : Météo (icônes), Nom de l'activité, Statut, Type d'activité, Pilote, Domaine métier, Pôle/usine/mission, Produit(s) associé(s), Typologie | ⬜ |
| Given une ligne d'activité, when je clique sur le menu « 3 points » en bout de ligne, then je peux archiver l'activité (statut passe à « Archive ») et, en option, « ouvrir dans un nouvel onglet » (Could) | ⬜ |
| Given une ligne d'activité, when je clique dessus, then l'activité s'ouvre en modification | ⬜ |
| Error : given une action d'archivage en échec, system conserve le statut initial et signale l'échec | ⬜ |
| Security/Gouvernance : seul un gestionnaire de portefeuille peut archiver une activité depuis le portefeuille | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La recherche d'une activité dans le portefeuille (US dédiée).
- L'option « ouvrir dans un nouvel onglet » est priorisée Could.

## Notes d'implémentation
- Module pilotage (OPDN), vue détaillée d'un portefeuille avec tableau d'activités.
- Météo affichée en icônes dans le tableau ; menu contextuel « 3 points » en fin de ligne.

---
Item Type: US · Parent: F18.12 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: gestionnaire-de-portefeuille
Source: SPEC_OPDN — B.8 Portefeuilles d'activités — liste & gestion
Dépendances: —
