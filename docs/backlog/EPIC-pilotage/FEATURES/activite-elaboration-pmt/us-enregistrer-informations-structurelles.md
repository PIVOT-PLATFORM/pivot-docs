# US18.17.19 — Enregistrer informations structurelles

**En tant que** chef de projet
**Je veux** enregistrer globalement les informations structurelles de l'activité via un bouton dédié
**Afin de** persister l'ensemble des champs de l'écran en une seule action

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'écran des informations structurelles sans modification, when je l'affiche, then le bouton « Enregistrer » est désactivé (disabled) | ⬜ |
| Given au moins une modification sur l'écran, when je modifie un champ, then le bouton « Enregistrer » devient actif et vert | ⬜ |
| Given le bouton « Enregistrer » actif, when je clique dessus, then l'ensemble des champs de l'écran est enregistré globalement | ⬜ |
| Error : given des modifications non enregistrées, when l'utilisateur quitte l'écran, system affiche une pop-up d'avertissement avant de quitter | ⬜ |
| Security/Gouvernance : seul un chef de projet habilité sur l'activité peut enregistrer les informations structurelles | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Les règles d'obligation par champ sont couvertes par les US de chaque champ.

## Notes d'implémentation
- Module pilotage (OPDN), écran Élaboration PMT — informations structurelles, bouton d'enregistrement global.
- État : disabled tant qu'aucune modif, vert dès modif ; pop-up si l'utilisateur quitte sans enregistrer.

---
Item Type: US · Parent: F18.17 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.13 Activité — champs Élaboration PMT (informations structurelles)
Dépendances: —
