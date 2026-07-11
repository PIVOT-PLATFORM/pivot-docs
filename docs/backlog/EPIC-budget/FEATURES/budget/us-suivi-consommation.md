# US26.1.2 — Suivre la consommation budgétaire en temps réel

**En tant que** chef de projet / responsable financier
**Je veux** enregistrer les dépenses réelles et voir l'écart prévu/réel
**Afin de** piloter le budget et détecter les dérives avant qu'elles deviennent critiques

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un budget saisi (US26.1.1), when une dépense est enregistrée via `POST .../projects/{id}/expenses` (poste, montant, date, description), then le tableau de bord affiche budget alloué, dépensé, restant et % consommé par poste, et une alerte est déclenchée si la consommation dépasse le seuil configurable (80% par défaut) | ⬜ |
| Error : given une dépense dont le poste ne correspond à aucun poste budgétaire existant, system retourne 400 sans enregistrer la dépense | ⬜ |
| Security : un utilisateur non membre du projet ou d'un autre tenant reçoit 404 sur les endpoints de dépenses ; un membre affecté sans le rôle requis (chef de projet ou responsable financier) reçoit 403 en enregistrement de dépense, et un membre en lecture seule n'a pas accès à l'écriture ni au détail des montants | ⬜ |
| A11y : le tableau de bord (indicateurs, graphique d'évolution, alertes) est consultable au clavier et les alertes de dérive sont annoncées aux lecteurs d'écran, conformément WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Saisie initiale du budget par poste (couverte par US26.1.1)
- Rapprochement avec un ERP financier externe (couvert par US26.2.4)
- Workflow de validation/approbation des dépenses avant enregistrement

## Notes d'implémentation
- Une dépense dépassant le budget total du poste ou du projet déclenche un warning non bloquant, pas un rejet
- Seuil d'alerte de dérive (80% par défaut) configurable au niveau projet ou tenant
- Graphique d'évolution : courbe prévu vs réel dans le temps, alimentée par l'historique des dépenses
- Export CSV des dépenses pour reporting externe
- Dépend de US26.1.1 (le budget par poste doit exister avant toute dépense)

---
Item Type: US · Parent: F26.1 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Rôle: responsable-financier-si-finops
Dépendances: US26.1.1
