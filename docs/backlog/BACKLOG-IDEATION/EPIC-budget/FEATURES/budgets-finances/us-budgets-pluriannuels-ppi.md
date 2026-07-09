# US26.2.2 — Budgets pluriannuels (PPI)

**En tant que** contrôleur de gestion
**Je veux** gérer un budget de portefeuille pluriannuel avec prévisionnel/engagé/réalisé par exercice et des enveloppes par entité
**Afin de** suivre la logique PPI des collectivités sur plusieurs exercices

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un portefeuille, when le contrôleur définit un budget pluriannuel, then prévisionnel, engagé et réalisé sont suivis par exercice et des enveloppes budgétaires sont ventilées par entité | ⬜ |
| Error : given une consommation dépassant l'enveloppe d'une entité, system signale le dépassement sans bloquer la saisie | ⬜ |
| Security : seul le contrôleur de gestion (ou rôle admin du portefeuille) peut créer/modifier le budget pluriannuel et la ventilation par entité ; toute modification est tracée (auteur, date) et un utilisateur en lecture seule sur le portefeuille ne peut jamais écrire | ⬜ |
| A11y : la vue de répartition par exercice/entité (tableaux, enveloppes) est navigable au clavier et restituée par lecteur d'écran, conformément WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Projection de trésorerie et répartition en un clic sur les exercices (couvertes par US26.2.3)
- Simulation de scénarios AP/CP avec règles publiques (couverte par US26.2.6)
- Rapprochement avec un ERP financier externe (couvert par US26.2.4)

## Notes d'implémentation
- Portée portefeuille (multi-projets), pas projet unique — s'appuie sur la notion d'entité pour la ventilation des enveloppes
- Trois montants suivis par exercice budgétaire : prévisionnel, engagé, réalisé
- Traçabilité de la répartition par entité requise (qui a modifié quelle enveloppe, et quand) — nécessaire pour la logique PPI des collectivités
- Profils concernés : Grand groupe, Privée sous droit public, Publique, État (cf. frontmatter Profils)

---
Item Type: US · Parent: F26.2 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Source: PP-016 · MoSCoW: Must · Lot: Lot 2 · Origine: 2/3 (PM, Sciforma)
Profils: Grand groupe, Privée sous droit public, Publique, État
Justification: Dossier §5.1 ; logique PPI des collectivités
Dépendances: —
