# US18.2.5 — Classer et filtrer les données budgétaires

**En tant que** contrôleur de gestion SI (responsable budgétaire)
**Je veux** que les lignes soient classées par phase projet et affichées de façon lisible
**Afin de** analyser le budget par étape du cycle de vie

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given la vue budgets, when je la consulte, then les lignes sont classées par phase projet dans l'ordre Opportunité → Cadrage → Conception → Réalisation → N/A → RUN → Suivi bénéfices | ⬜ |
| Given la vue budgets, when je l'ouvre, then elle s'affiche par défaut en mode déployé/développé | ⬜ |
| Given une ligne budgétaire, when je lis ses colonnes, then Phase et Nature sont affichées l'une sous l'autre pour la lisibilité | ⬜ |
| Error : given une ligne sans phase renseignée, system la classe en N/A sans provoquer d'erreur d'affichage | ⬜ |
| Security/Gouvernance : le classement et le filtrage respectent les habilitations d'accès aux données budgétaires | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La sélection des années est couverte par l'US Naviguer entre les années.

## Notes d'implémentation
- Vues budgets de l'activité (module pilotage).
- Ordre des phases imposé ; affichage déployé par défaut ; colonnes Phase et Nature empilées.

---
Item Type: US · Parent: F18.2 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: controleur-de-gestion-si
Source: Backlog OPPA (reconstitution v1–v2.1) — US-205
Dépendances: —
