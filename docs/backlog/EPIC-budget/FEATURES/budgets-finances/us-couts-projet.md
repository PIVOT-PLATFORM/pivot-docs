# US26.2.1 — Coûts au niveau projet

**En tant que** contrôleur de gestion
**Je veux** suivre les coûts par projet en prévu, engagé et réalisé
**Afin de** piloter la consommation budgétaire du projet et anticiper les dépassements

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet, when le contrôleur saisit les coûts, then prévu, engagé et réalisé sont enregistrés et distingués, et l'écart entre ces trois valeurs est calculé et visualisable | ⬜ |
| Error : given un montant réalisé supérieur au prévu, system signale le dépassement sans bloquer la saisie | ⬜ |
| Security : seuls le contrôleur de gestion et le chef de projet affectés au projet peuvent saisir ou modifier les montants prévu/engagé/réalisé ; les autres profils (dont lecture seule) ont un accès en consultation uniquement, filtré par leur périmètre de visibilité par rôle | ⬜ |
| A11y : la vue de suivi des coûts (tableau prévu/engagé/réalisé, visualisation d'écart) est navigable au clavier et lisible par lecteur d'écran, conformément WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Rapprochement automatique avec un ERP financier externe (couvert par US26.2.4)
- Gestion des budgets pluriannuels et enveloppes par entité (couverte par US26.2.2)
- Simulation de scénarios budgétaires (AP/CP) (couverte par US26.2.6)

## Notes d'implémentation
- Trois montants distincts par projet et par poste : prévu, engagé, réalisé — stockés séparément pour permettre le calcul d'écart à tout moment
- Le dépassement (réalisé > prévu) est un signalement, pas un blocage de saisie
- Périmètres de visibilité par rôle déjà portés par le domaine Pilotage (EN18.1/EN18.2) — cette US applique le filtrage en écriture ET en lecture sur les données de coût

---
Item Type: US · Parent: F26.2 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Critical
Stage: Backlog
Source: PP-008 · MoSCoW: Must · Lot: Lot 1 · Origine: Socle 3/3
Profils: Tous
Justification: Dossier §4
Dépendances: —
