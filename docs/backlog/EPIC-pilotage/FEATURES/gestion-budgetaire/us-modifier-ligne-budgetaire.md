# US18.2.2 — Modifier une ligne budgétaire

**En tant que** contrôleur de gestion SI (responsable budgétaire)
**Je veux** éditer une ligne existante avec une saisie fiabilisée
**Afin de** corriger et mettre à jour les données budgétaires sans incohérence

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une ligne existante, when je vide un montant, then la valeur vide est correctement détectée et enregistrable | ⬜ |
| Given une modification du commentaire de ligne, when j'enregistre, then le commentaire affiche immédiatement la nouvelle valeur | ⬜ |
| Given l'édition du couple MO/HMO, when j'enregistre (y compris après une duplication), then la cohérence du couple est sécurisée pour éviter les incohérences (ex. APCO/MO) | ⬜ |
| Error : given un couple MO/HMO incohérent, system empêche l'enregistrement de l'incohérence | ⬜ |
| Security/Gouvernance : seul un contrôleur de gestion SI habilité peut modifier une ligne budgétaire | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La création initiale d'une ligne est couverte par l'US Créer une ligne budgétaire.

## Notes d'implémentation
- Écran budgets de l'activité (module pilotage), édition de ligne.
- Détection fiable d'un montant vidé ; rafraîchissement immédiat du commentaire ; contrôle de cohérence MO/HMO notamment après duplication.

---
Item Type: US · Parent: F18.2 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: controleur-de-gestion-si
Source: Backlog OPPA (reconstitution v1–v2.1) — US-202
Dépendances: —
