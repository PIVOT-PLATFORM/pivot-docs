# US18.2.7 — Distinguer numéro et libellé de contrat

**En tant que** contrôleur de gestion SI (responsable budgétaire)
**Je veux** voir le numéro de contrat et son libellé séparément dans toutes les vues Budget
**Afin de** identifier sans ambiguïté le contrat rattaché à une ligne

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une ligne budgétaire rattachée à un contrat, when je consulte une vue Budget, then le numéro de contrat et son libellé sont affichés séparément | ⬜ |
| Given toutes les vues Budget, when je consulte les colonnes, then les en-têtes de colonne Contrat sont mis à jour pour distinguer numéro et libellé | ⬜ |
| Error : given un contrat sans libellé renseigné, system affiche le numéro seul sans provoquer d'erreur | ⬜ |
| Security/Gouvernance : l'affichage numéro/libellé de contrat respecte les habilitations d'accès aux données budgétaires | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La gestion du référentiel des contrats n'est pas couverte par cette US.

## Notes d'implémentation
- Toutes les vues Budget (module pilotage) : en-têtes de colonne Contrat mis à jour pour séparer numéro et libellé.

---
Item Type: US · Parent: F18.2 · Module: pilotage · Phase: phase-3 · Size: XS · Priority: Medium
Stage: ⬜
Rôle: controleur-de-gestion-si
Source: Backlog OPPA (reconstitution v1–v2.1) — US-207
Dépendances: —
