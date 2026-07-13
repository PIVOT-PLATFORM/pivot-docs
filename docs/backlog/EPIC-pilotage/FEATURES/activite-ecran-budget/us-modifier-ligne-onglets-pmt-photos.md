# US18.18.12 — Modifier une ligne budgétaire (onglets Élaboration PMT / Photos financières)

**En tant que** contrôleur de gestion SI (profil GPP-CGO)
**Je veux** modifier une ligne budgétaire des onglets Élaboration PMT ou Photos financières après activation du mode modification
**Afin de** mettre à jour des données de référence de façon contrôlée

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'onglet Élaboration PMT, when je veux modifier une ligne, then je dois d'abord actionner le bouton « modifier » global de l'onglet | ⬜ |
| Given l'onglet Photos financières, when je veux modifier une ligne, then je dois d'abord actionner le bouton « modifier » propre à chaque photo | ⬜ |
| Given le mode modification activé, when je clique sur une ligne, then le fonctionnement est identique à l'onglet PDS Pluriannuel | ⬜ |
| Error : given un utilisateur hors profil GPP-CGO, system laisse les onglets en lecture seule sans bouton « modifier » actif | ⬜ |
| Security/Gouvernance : seuls les profils GPP-CGO peuvent activer le mode modification et modifier les lignes de ces onglets | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Les onglets Élaboration PMT et Photos financières sont post-MVP.
- Le comportement du clic sur une ligne, identique à l'US Modifier (onglet PDS).

## Notes d'implémentation
- Module pilotage (OPDN), écran Budget, onglets Élaboration PMT et Photos financières (post-MVP).
- Bouton « modifier » préalable (global pour Élab PMT, propre à chaque photo) ; ensuite fonctionnement identique au PDS ; réservé GPP-CGO.

---
Item Type: US · Parent: F18.18 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Rôle: controleur-de-gestion-si
Source: SPEC_OPDN — B.15 Activité — écran Budget
Dépendances: —
