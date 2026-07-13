# US18.18.17 — Historique des modifications (logs) — Budget

**En tant que** contrôleur de gestion SI (profil budget)
**Je veux** consulter l'historique des modifications budgétaires en bas de chaque sous-onglet
**Afin de** tracer qui a modifié quoi, quand et pourquoi

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un sous-onglet Budget, when j'affiche les logs, then ils apparaissent en bas et sont spécifiques à chaque sous-onglet | ⬜ |
| Given la zone de logs, when elle s'affiche, then le dernier log est visible par défaut et un bouton « Voir plus » permet d'afficher les précédents | ⬜ |
| Given un log, when il s'affiche, then il indique l'utilisateur (qui), la date/heure (quand), le commentaire de modification, la LB modifiée (titre) et le champ modifié avec valeur précédente/actuelle, ainsi que l'année si le champ est un montant | ⬜ |
| Error : given un sous-onglet sans modification, system affiche la zone de logs vide sans erreur | ⬜ |
| Security/Gouvernance : les logs sont en consultation seule et ne peuvent pas être édités par l'utilisateur | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'information de dernier porteur de modification des onglets PDS/ELAB_PMT, couverte par l'US dédiée.

## Notes d'implémentation
- Module pilotage (OPDN), écran Budget, historique des modifications (logs) en bas de chaque sous-onglet.
- Dernier log visible par défaut, « Voir plus » ; informations : qui (utilisateur), quand (date/heure), commentaire, LB modifiée (titre) + champ modifié valeur précédente/actuelle + année si montant.

---
Item Type: US · Parent: F18.18 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Rôle: controleur-de-gestion-si
Source: SPEC_OPDN — B.15 Activité — écran Budget
Dépendances: —
