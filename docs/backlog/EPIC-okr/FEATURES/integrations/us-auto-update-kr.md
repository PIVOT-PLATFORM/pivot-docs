# US27.8.1 — Mise à jour automatique des KR (sources de données)

**En tant que** responsable pilotage
**Je veux** **mettre à jour automatiquement** la valeur d'un KR depuis une source de données (BI, base, Jira, tableur, **API/webhook**) préconfigurée
**Afin de** réduire la saisie manuelle et fiabiliser la mesure

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un KR relié à une source (API, requête BI, cellule tableur), when la synchro s'exécute, then sa valeur actuelle est mise à jour et historisée | ⬜ |
| Given une source indisponible, when la synchro échoue, then le dernier point est conservé et l'échec signalé | ⬜ |
| Security : les identifiants de connexion sont stockés chiffrés (coffre-fort) | ⬜ |

---
Item Type: US · Parent: F27.8 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Medium
Stage: Backlog
Rôle: officier-responsable-pmo
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Raffinage OKR état de l'art (Doerr/Google ; Quantive/Workboard/Viva Goals/Perdoo)
Dépendances: EN27.1 (modèle OKR & moteur)
