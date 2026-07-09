# US23.2.7 — Scénarios what-if

**En tant que** direction
**Je veux** simuler sur plusieurs portefeuilles des ajouts, reports ou abandons de projets avec leurs impacts charge, budget et trésorerie, et comparer les scénarios
**Afin de** disposer de la fonction reine de l'arbitrage et décider en connaissance des conséquences

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un portefeuille, when un utilisateur ajoute/reporte/abandonne un projet en simulation, then les impacts charge, budget et trésorerie sont recalculés | ⬜ |
| Plusieurs scénarios peuvent être créés et comparés côte à côte | ⬜ |
| Error : given un scénario incohérent (report au-delà de l'horizon), system signale l'erreur sans altérer les données réelles | ⬜ |
| Security/Gouvernance : les simulations n'impactent pas les données de référence tant qu'elles ne sont pas validées (traçabilité) ; seuls les rôles habilités (direction/PMO) peuvent valider un scénario pour l'appliquer aux données réelles | ⬜ |
| A11y : les vues de comparaison de scénarios (tableaux, graphiques d'impact) sont conformes RGAA 4 / WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'application effective d'un scénario validé sur les données réelles (bascule programme/projets) n'est pas détaillée ici au-delà du principe de non-altération avant validation — le workflow de validation formelle pourra être précisé en implémentation.
- Le calcul détaillé de charge/budget/trésorerie par projet repose sur les données déjà existantes (US22.1.1 et modules budgétaires) ; cette US ne réinvente pas ces calculs, elle les recompose en simulation.
- La génération de business cases à partir d'un scénario relève de US23.2.8.

## Notes d'implémentation
- "Fonction reine de l'arbitrage" (Dossier §6.2) — US complexe (XL) : les scénarios doivent être stockés comme des copies/deltas isolés des données de référence (pas de mutation directe des entités `Project` réelles) — pattern courant des outils PPM comparables (copy-on-write / chaîne de snapshots à partir d'un état de référence) ; **choix définitif entre copie complète et delta appliqué sur snapshot à valider par le mainteneur/Architecte Modules au Gate 1**, cette US ne tranche pas l'implémentation.
- Le recalcul des impacts (charge, budget, trésorerie) doit rester borné à l'horizon de planification du portefeuille — au-delà, l'AC erreur s'applique.
- Backend `pivot-pilotage-core`, schéma `pilotage` ; dépend implicitement des données de programmes (US23.2.5) si les scénarios portent sur des programmes entiers.

---
Item Type: US · Parent: F23.2 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: Medium
Stage: ⬜
Source: PP-036 · MoSCoW: Could · Lot: Lot 3 · Origine: Différenciant Sciforma
Profils: Grand groupe, État
Justification: Dossier §6.2 : la fonction reine de l'arbitrage
Dépendances: —
