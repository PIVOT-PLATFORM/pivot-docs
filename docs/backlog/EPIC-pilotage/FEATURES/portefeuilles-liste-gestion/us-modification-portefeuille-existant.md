# US18.12.2 — Modification d'un portefeuille existant

**En tant que** gestionnaire de portefeuille
**Je veux** modifier un portefeuille existant via l'icône « stylo » à côté de son nom
**Afin de** ajuster ses filtres et son nom sans avoir à le recréer

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un portefeuille de la liste, when je clique sur l'icône « stylo » à côté de son nom, then la même vue que la création s'ouvre avec les filtres du portefeuille | ⬜ |
| Given la vue de modification, when je modifie les filtres et clique sur « enregistrer », then une pop-up permet aussi de modifier le nom avant de confirmer l'enregistrement | ⬜ |
| Given la vue de modification, when je clique sur « annuler », then les modifications sont abandonnées et je reviens à la liste | ⬜ |
| Error : given un enregistrement en échec, system conserve la vue de modification et signale l'échec | ⬜ |
| Security/Gouvernance : seul un gestionnaire de portefeuille peut modifier un portefeuille | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La réinitialisation des filtres à la version enregistrée (US filtres dédiée).

## Notes d'implémentation
- Module pilotage (OPDN), écran de modification identique à l'écran de création.
- Icône « stylo » à côté du nom ; pop-up d'enregistrement incluant l'édition du nom.

---
Item Type: US · Parent: F18.12 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: gestionnaire-de-portefeuille
Source: SPEC_OPDN — B.8 Portefeuilles d'activités — liste & gestion
Dépendances: —
