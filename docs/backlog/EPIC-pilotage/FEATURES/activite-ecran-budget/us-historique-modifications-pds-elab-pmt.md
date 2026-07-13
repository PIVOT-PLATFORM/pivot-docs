# US18.18.18 — Historique des modifications — onglets PDS / ELAB_PMT

**En tant que** contrôleur de gestion SI (profil budget)
**Je veux** voir en bas des onglets PDS et ELAB_PMT l'information du dernier porteur de modification
**Afin de** identifier rapidement le dernier auteur et la date de mise à jour

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'onglet PDS ou ELAB_PMT, when il s'affiche, then l'information du dernier porteur de modification apparaît en bas | ⬜ |
| Given cette information, when elle s'affiche, then elle est formulée « Modification par » + utilisateur + « le » + date + heure | ⬜ |
| Given l'information de dernière modification, when je souhaite le détail, then un bouton « Voir plus » permet d'accéder à l'historique | ⬜ |
| Error : given un onglet sans aucune modification, system n'affiche pas de porteur de modification sans erreur | ⬜ |
| Security/Gouvernance : cette information est en consultation seule et non modifiable par l'utilisateur | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le détail complet des logs d'un sous-onglet, couvert par l'US Historique des modifications (logs) — Budget.

## Notes d'implémentation
- Module pilotage (OPDN), écran Budget, onglets PDS et ELAB_PMT, information de dernière modification en bas.
- Format « Modification par » + utilisateur + « le » + date + heure ; bouton « Voir plus ».

---
Item Type: US · Parent: F18.18 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: controleur-de-gestion-si
Source: SPEC_OPDN — B.15 Activité — écran Budget
Dépendances: —
