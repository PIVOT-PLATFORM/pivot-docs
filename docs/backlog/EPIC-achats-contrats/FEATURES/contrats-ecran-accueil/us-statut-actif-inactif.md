# US25.5.10 — Statut « Actif »/« Inactif »

**En tant que** contract manager
**Je veux** définir un contrat comme « Actif » ou « Inactif »
**Afin de** contrôler sa disponibilité lors des créations de demandes d'achat

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un contrat au statut « Actif », when un utilisateur crée une DA sur contrat, then ce contrat apparaît dans la recherche de contrat de la DA | ⬜ |
| Given un contrat au statut « Inactif », when un utilisateur crée une DA sur contrat, then ce contrat n'apparaît pas dans la recherche de contrat de la DA | ⬜ |
| Error : given un contrat inactif, system l'exclut de la sélection des contrats disponibles à la création de DA | ⬜ |
| Security/Gouvernance : la bascule du statut relève des contract managers (CM) et administrateurs (A) sur leur périmètre (NON/NON/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La modification en masse du statut actif est couverte par l'US Modification des contrats en masse.

## Notes d'implémentation
- Écran d'accueil des contrats (module OPDN, B.5), statut « Actif »/« Inactif ».
- Règle : un contrat inactif est masqué dans la recherche de contrat des DA sur contrat.

---
Item Type: US · Parent: F25.5 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: contract-manager
Source: SPEC_OPDN — B.5 Contrats — écran d'accueil
Dépendances: —
