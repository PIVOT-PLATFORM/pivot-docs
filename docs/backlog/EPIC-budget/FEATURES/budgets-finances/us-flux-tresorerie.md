# US26.2.3 — Flux de trésorerie

**En tant que** contrôleur de gestion
**Je veux** projeter la trésorerie par portefeuille et répartir le budget pluriannuel en un clic
**Afin d'** anticiper les besoins de trésorerie et ajuster rapidement la répartition budgétaire

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un portefeuille budgété, when le contrôleur consulte la trésorerie, then une projection par période est produite | ⬜ |
| Given un budget pluriannuel existant, when le contrôleur applique la répartition en un clic, then les montants sont ventilés sur les exercices sans ressaisie manuelle | ⬜ |
| Error : given des données budgétaires incomplètes (exercice sans budget pluriannuel saisi), system indique que la projection est partielle et identifie les exercices manquants | ⬜ |
| Security : un utilisateur non membre du portefeuille ou d'un autre tenant reçoit 404 ; un membre sans le rôle requis (contrôleur de gestion ou admin du portefeuille) reçoit 403 en déclenchant la répartition en un clic (action d'écriture sur les exercices) ; la consultation de la projection reste soumise aux périmètres de visibilité par rôle | ⬜ |
| A11y : le graphique de projection de trésorerie par période est doublé d'une restitution tabulaire accessible au clavier et au lecteur d'écran, conformément WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Saisie initiale du budget pluriannuel et des enveloppes par entité (couverte par US26.2.2)
- Simulation de scénarios AP/CP (couverte par US26.2.6)
- Rapprochement des flux réels avec un ERP financier externe (couvert par US26.2.4)

## Notes d'implémentation
- Dépend fonctionnellement du budget pluriannuel (US26.2.2) : la projection de trésorerie et la répartition en un clic s'appuient sur les données prévisionnel/engagé/réalisé par exercice déjà saisies
- La projection doit signaler explicitement les périodes pour lesquelles les données sont incomplètes plutôt que d'afficher une valeur silencieusement erronée
- Fonctionnalité différenciante (origine Sciforma) réservée aux profils Grand groupe et État

---
Item Type: US · Parent: F26.2 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Medium
Stage: ⬜
Rôle: controleur-de-gestion-si
Source: PP-040 · MoSCoW: Could · Lot: Lot 3 · Origine: Différenciant Sciforma
Profils: Grand groupe, État
Justification: Dossier §6.2
Dépendances: —
