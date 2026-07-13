# US18.2.8 — Consulter la dernière modification budgétaire

**En tant que** contrôleur de gestion SI (responsable budgétaire)
**Je veux** voir l'information de dernière modification dans les onglets budgétaires
**Afin de** tracer les mises à jour des données budgétaires

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'onglet Élaboration PMT, when je le consulte, then l'information de dernière modification (auteur et moment) est affichée | ⬜ |
| Given l'onglet Jalon et l'onglet PDS Pluriannuel, when je les consulte, then l'information de dernière modification y est également affichée | ⬜ |
| Error : given un onglet sans modification depuis la création, system affiche l'information de création sans provoquer d'erreur | ⬜ |
| Security/Gouvernance : l'information de dernière modification est en lecture seule et ne peut être altérée | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'historique complet des versions n'est pas couvert (seule la dernière modification est affichée).

## Notes d'implémentation
- Onglets Élaboration PMT, Jalon et PDS Pluriannuel (module pilotage).
- Complète US-104 (dernière modification activité/liste/jalon).

---
Item Type: US · Parent: F18.2 · Module: pilotage · Phase: phase-3 · Size: XS · Priority: Medium
Stage: ⬜
Rôle: controleur-de-gestion-si
Source: Backlog OPPA (reconstitution v1–v2.1) — US-208
Dépendances: —
