# US18.13.2 — Réinitialisation des filtres

**En tant que** gestionnaire de portefeuille
**Je veux** réinitialiser les filtres via le bouton « Tout réinitialiser »
**Afin de** repartir d'un état propre selon que je crée ou modifie un portefeuille

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le mode création, when je clique sur « Tout réinitialiser », then tous les filtres sont remis à vide | ⬜ |
| Given le mode modification, when je clique sur « Tout réinitialiser », then tous les filtres reviennent à la version enregistrée du portefeuille | ⬜ |
| Given des filtres réinitialisés, when la réinitialisation est effectuée, then l'indicateur « Filtre actif (NB) » est mis à jour en conséquence | ⬜ |
| Error : given aucun filtre actif, system laisse l'état inchangé sans erreur | ⬜ |
| Security/Gouvernance : seul un gestionnaire de portefeuille peut réinitialiser les filtres | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'application initiale des filtres (US filtres dédiée).

## Notes d'implémentation
- Module pilotage (OPDN), bouton « Tout réinitialiser ».
- Comportement différencié : vide en création, version enregistrée en modification.

---
Item Type: US · Parent: F18.13 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: gestionnaire-de-portefeuille
Source: SPEC_OPDN — B.9 Portefeuilles — filtres & création
Dépendances: —
