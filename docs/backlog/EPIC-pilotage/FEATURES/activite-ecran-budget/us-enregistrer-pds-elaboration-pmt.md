# US18.18.14 — Enregistrer (onglets PDS Pluriannuel et Élaboration PMT)

**En tant que** contrôleur de gestion SI (profil budget)
**Je veux** enregistrer mes modifications budgétaires via un bouton et une pop-up de confirmation commentée
**Afin de** persister les modifications de façon tracée

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'onglet PDS Pluriannuel ou Élaboration PMT, when un enregistrement est possible, then le bouton « Enregistrer » est vert, sinon il est disabled | ⬜ |
| Given le clic sur « Enregistrer », when la pop-up « Modification des budgets » s'affiche, then elle propose un champ « commentaire modification » (200 caractères) et des boutons valider/annuler | ⬜ |
| Given des modifications non enregistrées, when l'utilisateur quitte, then une pop-up l'avertit qu'il quitte sans enregistrer | ⬜ |
| Error : given une tentative d'enregistrement sans modification, system garde le bouton « Enregistrer » disabled | ⬜ |
| Security/Gouvernance : l'enregistrement n'est accessible qu'aux utilisateurs autorisés à modifier le budget de l'onglet concerné | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'enregistrement de l'onglet Photo financière, couvert par l'US Enregistrer — onglet Photo financière.

## Notes d'implémentation
- Module pilotage (OPDN), écran Budget, onglets PDS Pluriannuel et Élaboration PMT, bouton Enregistrer.
- Bouton vert si enregistrement possible sinon disabled ; pop-up « Modification des budgets » + champ « commentaire modification » (200 car.) + valider/annuler ; pop-up si sortie sans enregistrer.

---
Item Type: US · Parent: F18.18 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: controleur-de-gestion-si
Source: SPEC_OPDN — B.15 Activité — écran Budget
Dépendances: —
