# US21.6.3 — Simulation Monte Carlo

**En tant que** PMO
**Je veux** « Simulation Monte Carlo »
**Afin de** chiffrer les risques et garantir la conformité réglementaire

## Contexte

Distributions de dates de fin et de coûts pour les projets critiques.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet critique avec des risques quantifiables (probabilité, impact coût, impact délai renseignés), when le PMO lance une simulation Monte Carlo, then le système exécute N tirages aléatoires et restitue les percentiles de coût et de délai (ex. P50, P80, P95) sous forme de distribution consultable | ⬜ |
| Error : given un projet sans risque quantifiable suffisant (aucune donnée de probabilité/impact exploitable), system refuse le lancement de la simulation et affiche un message expliquant les données manquantes, plutôt que de produire une distribution non significative | ⬜ |
| Security : le lancement d'une simulation Monte Carlo et la consultation de ses résultats sont réservés aux rôles habilités du projet (PMO, chef de projet) ; les paramètres de simulation (nombre de tirages, distributions utilisées) ne sont pas modifiables par un contributeur standard | ⬜ |

## Hors périmètre
- Le calcul de l'EMV unitaire par risque (US21.6.1) et la provision agrégée (US21.6.2) restent des prérequis de données, pas des livrables de cette US.
- Le choix et la calibration fine des lois de probabilité par type de risque (triangulaire, PERT, normale, etc.) au-delà d'un jeu de lois par défaut documenté n'est pas couvert ici — traité comme évolution ultérieure si besoin.
- L'export/rapport détaillé des résultats de simulation est traité par F21.8 (Restitutions), pas par cette US qui couvre le calcul et l'affichage de la distribution.

## Notes d'implémentation
- Dépend de US21.6.1 pour disposer de risques quantifiables (probabilité, impact coût) comme entrées de la simulation ; l'impact délai (jours) doit également être disponible sur le risque.
- Le nombre de tirages (ex. 10 000) et la nature du calcul (Monte Carlo classique par échantillonnage aléatoire répété) doivent être documentés et fixés par défaut, sans configuration exposée à l'utilisateur dans cette première itération.
- Opération potentiellement coûteuse en calcul : prévoir un traitement asynchrone (job / file d'attente) plutôt qu'un calcul bloquant synchrone côté API, avec restitution du résultat une fois la simulation terminée.

---
Item Type: US · Parent: F21.6 · Module: risk · Phase: phase-3 · Size: L · Priority: Medium
Stage: ⬜
Rôle: officier-responsable-pmo
Dépendances: US21.6.1
